import assert from "assert";

import {getDate} from "./get-date.js";

import path from "path";

import process from "process";

import {getAllArticles} from "./download.js";

const cwd = process.cwd()

export const getYuqueConfig = pluginOptions => {
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


const source = (sourcing, emptyResult, ...args) => async (context, pluginOptions) => {
    const {reporter} = context

    try {
        const yuqueConfig = getYuqueConfig(pluginOptions)
        const yuqueClient = new getAllArticles.YuqueClient(yuqueConfig)

        return yuqueClient[sourcing](...args)
    } catch (ex) {
        reporter.error(ex)

        return emptyResult
    }
}

export const sourceNode = (context, pluginOptions, slug) => source('getArticle', {}, slug)(context, pluginOptions)
export const sourceAllNodes = source('getArticles', [])
