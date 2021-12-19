const assert = require('assert');
const download = require("../src/download")
const path = require("path");

describe('Downloader', () => {
    it('has getArticle method', async () => {
        const res = new download.YuqueClient({})

        assert.deepStrictEqual(typeof res.getArticle, 'function')
    })

    describe('cache', () => {
        const config = { login: 'fake', repo: 'fake' }
        const yuquePath = path.resolve(__dirname, './fixtures/yuque.json');

        it('reads cache from path', async () => {
            const length = require(yuquePath).length

            const res = await download(config, { yuquePath, token: '1234' })
            assert.equal(res.length, length)
        })

        it('reads cache from customized function', async () => {
            const readCache = async () => [{}]
            const res = await download(config, { yuquePath, readCache, token: '1234' })
            assert.equal(res.length, 1)
        })
    })
})