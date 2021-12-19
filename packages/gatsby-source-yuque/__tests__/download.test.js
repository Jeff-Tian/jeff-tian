const assert = require('assert');
const download = require("../src/download")
const path = require("path");
const fs = require('fs');

describe('Downloader', () => {
    it('has getArticle method', async () => {
        const res = new download.YuqueClient({})

        assert.deepStrictEqual(typeof res.getArticle, 'function')
    })

    describe('cache', () => {
        const context = { login: 'fake', repo: 'fake', reporter: { info: console.log } }
        const yuquePath = path.resolve(__dirname, './fixtures/yuque.json');

        it('reads cache from path', async () => {
            const length = require(yuquePath).length

            const res = await download(context, { yuquePath, token: '1234' })
            assert.equal(res.length, length)
        })

        it('reads cache from customized function', async () => {
            const readCache = async () => [{}]
            const res = await download(context, { yuquePath, readCache, token: '1234' })
            assert.equal(res.length, 1)
        })

        it('writes cache', async () => {
            const yuquePath = path.resolve(__dirname, './fixtures/yuque-test.json');
            const sut = new download.Downloader(context, { yuquePath, token: '1234' })
            sut._needUpdate = true
            await sut.writeYuqueCache()
            assert.equal(true, fs.existsSync(yuquePath))
            const length = require(yuquePath).length
            assert.equal(sut._cachedArticles.length, length)
        })
    })
})