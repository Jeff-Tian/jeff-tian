const YuqueClient = require("../src/yuque");
const assert = require("assert");
const nock = require("nock");

describe('yuque', () => {
    it('displays cURL for failed fetching', async () => {
        const baseUrl = 'https://example.com/';

        nock(baseUrl).get(/.+/).replyWithError('Socket hang up');

        const sut = new YuqueClient({baseUrl, namespace: '/jeff', token: '1234', timeout: 5000});

        await assert.rejects(async () => await sut._fetch('1234'), err => {
            assert.strictEqual(err.name, 'Error')
            assert.strictEqual(err.message, '请求数据失败: Socket hang up')
            assert.strictEqual(err.cURL, 'cURL to replay: curl -X GET "https://example.com/repos//jeff1234?"  ')

            return true
        });
    })
})