require('chai').should();

const mp = require('..');
const nock = require("nock");

describe('fetching temp media', () => {
    it('should return 200 with token error when token is invalid', async () => {
        // arrange
        const scope = nock('https://api.weixin.qq.com');

        scope.post('/cgi-bin/stable_token')
            .reply(200, {
                access_token: 'undefined'
            });

        scope
            .get('/cgi-bin/media/get?access_token=undefined&media_id=1234')
            .reply(200, {
                errcode: 40001,
                errmsg: 'invalid credential, access_token is invalid or not latest, could get access_token by getStableAccessToken, more details at https://mmbizurl.cn/s/JtxxFh33r rid: 65ffe934-2355113d-79ef0b31'
            });

        // act
        const result = await mp.fetchTempMedia('1234');

        // assert
        result.status.should.be.an('number');
        result.status.should.equal(200);
        result.data.should.be.an('object');
        result.data.errcode.should.equal(40001);
        result.data.errmsg.should.equal('invalid credential, access_token is invalid or not latest, could get access_token by getStableAccessToken, more details at https://mmbizurl.cn/s/JtxxFh33r rid: 65ffe934-2355113d-79ef0b31');
    })

    it('fetches temp media by media id', async () => {
        // arrange
        const scope = nock('https://api.weixin.qq.com');
        scope.post('/cgi-bin/stable_token').reply(200, {access_token: '1234'});
        scope.get('/cgi-bin/media/get?access_token=1234&media_id=1234').reply(200, {
            "video_url": 'download url'
        });

        const mediaId = 1234;

        // act
        const result = await mp.fetchTempMedia(mediaId);

        // assert
        result.status.should.equal(200);
        result.data.should.be.an('object');
        result.data.should.not.haveOwnProperty('errcode');
    })
})
