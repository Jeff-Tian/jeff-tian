import assert from "assert";

import Downloader, {getAllArticles, YuqueClient} from "../src/download.js";

import path from "path";

import fs from "fs";
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

describe('Downloader', () => {
    it('has getArticle method', async () => {
        const res = new YuqueClient({})

        assert.deepStrictEqual(typeof res.getArticle, 'function')
    })

    describe('cache', () => {
        const context = {login: 'fake', repo: 'fake', reporter: {info: console.log}}
        const yuquePath = path.resolve(__dirname, './fixtures/yuque.json');

        it('reads cache from path', async () => {
            const length = 0

            const res = await getAllArticles(context, {yuquePath, token: '1234'})
            assert.equal(res.length, length)
        })

        it('reads cache from customized function', async () => {
            const readCache = async () => [{}]
            const res = await getAllArticles(context, {yuquePath, readCache, token: '1234'})
            assert.equal(res.length, 1)
        })

        it('writes cache', async () => {
            const yuquePath = path.resolve(__dirname, './fixtures/yuque-test.json');
            const sut = new Downloader(context, {yuquePath, token: '1234'})
            sut._needUpdate = true
            await sut.writeYuqueCache()
            assert.equal(true, fs.existsSync(yuquePath))
            const length = 0
            assert.equal(sut._cachedArticles.length, length)
        })

        it('writes cache using customized function', async () => {
            const cache = []
            const sut = new Downloader(context, {
                yuquePath, token: '1234', writeCache: async () => {
                    cache.push('something')
                }
            })
            sut._needUpdate = true
            await sut.writeYuqueCache()
            assert.equal(cache.length, 1)
        })
    })
})
