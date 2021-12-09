const axios = require(`axios`)
const debug = require(`./debug`)
const UpstreamError = require("./upstream-error");

class YuqueClient {
    constructor(config) {
        this.config = config
    }

    async _fetch(api) {
        const {baseUrl, namespace, timeout, token} = this.config
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

module.exports = YuqueClient
