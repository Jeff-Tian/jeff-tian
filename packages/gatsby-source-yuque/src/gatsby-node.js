const path = require(`path`)
const process = require(`process`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { escapeSpecialCharacters } = require('./escape-special-characters')

const cwd = process.cwd()
const token = process.env.YUQUE_TOKEN
const yuquePath = process.env.YUQUE_PATH

const getAllArticles = require(`./download`)
const { formatDate, formatArray } = require(`./utils`)
const { getDate } = require('./get-date')

const getYuqueConfig = pluginOptions => {
	const {
		baseUrl = `https://www.yuque.com/api/v2/`,
		login = ``,
		repo = ``,
		mdNameFormat = `title`,
		timeout = 10000
	} = pluginOptions

	delete pluginOptions.plugins

	assert.ok(login, 'login in option is required')
	assert.ok(repo, 'repo in option is required')
	assert.ok(token, 'TOKEN of yuque (YUQUE_TOKEN in env) is required.')

	const yuqueConfig = {
		namespace: `${login}/${repo}`,
		yuquePath: yuquePath || path.join(cwd, `yuque-${getDate(new Date())}.json`),
		baseUrl,
		timeout,
		token
	}

	return yuqueConfig
}

exports.sourceNode = async (context, pluginOptions, slug) => {
	const { reporter } = context

	try {
		const yuqueConfig = getYuqueConfig(pluginOptions)
		const yuqueClient = new getAllArticles.YuqueClient(yuqueConfig)

		return yuqueClient.getArticle(slug)
	} catch (ex) {
		reporter.error(ex)

		return {}
	}
}

exports.sourceNodes = async (context, pluginOptions) => {
	const {
		actions: { createNode },
		createNodeId,
		createContentDigest,
		reporter
	} = context

	try {
		const yuqueConfig = getYuqueConfig(pluginOptions)
		const articles = await getAllArticles(context, yuqueConfig)

		articles.forEach(createArticle(mdNameFormat, createNodeId, createContentDigest, createNode))

		return articles
	} catch (ex) {
		reporter.error(ex)

		return []
	}
}

exports.createResolvers = async ({
	actions: { createNode },
	cache,
	createNodeId,
	createResolvers,
	store,
	reporter,
}) => {
	createResolvers({
		YuqueDoc: {
			coverImg: {
				type: `File`,
				resolve(source) {
					if (source.cover && !source.cover.includes(`svg`)) {
						return createRemoteFileNode({
							url: source.cover,
							store,
							cache,
							createNode,
							createNodeId,
							reporter,
						})
					} else {
						return createRemoteFileNode({
							url: 'https://images.ctfassets.net/qixg1o8tujmf/7m0jrKYaDBwEvlc5lo8nt6/6d50a5050d9cdc0d4d2047e35feac292/10648733_696750647079056_2800539603462658695_o.jpg',
							store,
							cache,
							createNode,
							createNodeId,
							reporter,
						})
					}
				},
			},
		},
	})
}

function createArticle(mdNameFormat, createNodeId, createContentDigest, createNode) {
	return article => {
		const slug = mdNameFormat === `title` ? article.title : article.slug

		const template = `---
stackbit_url_path: posts/${slug}
title: '${escapeSpecialCharacters(article.title.replace(/^@/, ``))}'
date: '${article.date || formatDate(article.created_at)}'
excerpt: >-
	${escapeSpecialCharacters(article.excerpt)}
tags: ${formatArray(article.tags)}
categories: ${formatArray(article.categories)}
template: post
---

${escapeSpecialCharacters(article.body)}`

		const yuqueDocNode = {
			...article,
			excerpt: escapeSpecialCharacters(article.excerpt),
			title: escapeSpecialCharacters(article.title),
			body: escapeSpecialCharacters(article.body),
			id: createNodeId(`yuque-doc-${article.id}`),
			slug,
			parent: null,
			children: [],
			internal: {
				type: `YuqueDoc`,
				mediaType: `text/markdown`,
				content: template,
				contentDigest: createContentDigest(article)
			}
		}
		createNode(yuqueDocNode)
	}
}