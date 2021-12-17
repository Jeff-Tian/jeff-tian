const assert = require('assert');
const download = require("../src/download")
const path = require("path");

describe('Downloader', () => {
    it('has getArticle method', async () => {
        const res = new download.YuqueClient({})

        assert.deepStrictEqual(typeof res.getArticle, 'function')
    })

    it('reads cache from path', async () => {
        const yuquePath = path.resolve(__dirname, './fixtures/yuque.json');
        const length = require(yuquePath).length

        const res = await download({login: 'fake', repo: 'fake'}, {yuquePath, token: '1234'})
        assert.equal(res.length, length)
    })
})