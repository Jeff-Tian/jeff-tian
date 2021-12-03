const assert = require('assert');
const download = require("../src/download")

describe('Downloader', ()=>{
    it('has getArticle method', async ()=>{
        const res = new download.YuqueClient({}, {})

        assert.deepStrictEqual(typeof res.getArticle, 'function')
    })
})