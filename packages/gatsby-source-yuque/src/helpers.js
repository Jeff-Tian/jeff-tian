const assert = require("assert");
const {getDate} = require("./get-date");
const path = require("path");
const process = require(`process`)
const {YuqueClient} = require("./download");

const cwd = process.cwd()

const getYuqueConfig = pluginOptions => {
    const token = process.env.YUQUE_TOKEN
    const yuquePath = process.env.YUQUE_PATH
    const {
        baseUrl = `https://www.yuque.com/api/v2/`,
        login = ``,
        repo = ``,
        mdNameFormat = `title`,
        timeout = 10000,
        readCache = undefined,
        writeCache = undefined,
    } = pluginOptions

    delete pluginOptions.plugins

    assert.ok(login, 'login in option is required')
    assert.ok(repo, 'repo in option is required')
    assert.ok(token, 'TOKEN of yuque (YUQUE_TOKEN in env) is required.')

    return {
        namespace: `${login}/${repo}`,
        yuquePath: yuquePath || path.join(cwd, `yuque-${getDate(new Date())}.json`),
        baseUrl,
        timeout,
        token,
        readCache,
        writeCache,
        mdNameFormat
    }
}

exports.getYuqueConfig = getYuqueConfig


const source = (sourcing, emptyResult, ...args) => async (context, pluginOptions) => {
    const {reporter} = context

    try {
        const yuqueConfig = getYuqueConfig(pluginOptions)
        const yuqueClient = new YuqueClient(yuqueConfig)

        return yuqueClient[sourcing](...args)
    } catch (ex) {
        reporter.error(ex)

        return emptyResult
    }
}

exports.sourceNode = (context, pluginOptions, slug) => source('getArticle', {}, slug)(context, pluginOptions)
exports.sourceAllNodes = source('getArticles', [])
