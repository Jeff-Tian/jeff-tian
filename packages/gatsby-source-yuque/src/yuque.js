import axios from "axios";
import UpstreamError from "./upstream-error.js";

import assert from "assert";

import debug from './debug.js'

export class YuqueClient {
    constructor(config) {
        this.config = config
    }

    async _fetch(api) {
        const {baseUrl, namespace, timeout = 10000, token} = this.config

        assert.ok(token, 'token for config must be present')

        const path = `${baseUrl}repos/${namespace}${api}`
        const options = {
            url: path,
            headers: {
                'X-Auth-Token': token,
                timeout
            }
        }
        debug(`request data: api: ${path}`)
        try {
            const result = await axios(options)
            return result.data
        } catch (error) {
            const upstreamError = new UpstreamError(`请求数据失败: ${error.message}`, error)

            debug(`请求数据失败${error.message}： ${upstreamError.cURL}`)

            throw upstreamError
        }
    }

    async getArticles() {
        const api = `/docs`
        return await this._fetch(api)
    }

    async getArticle(slug) {
        const api = `/docs/${slug}?raw=1`
        return await this._fetch(api)
    }
}

export default YuqueClient;
