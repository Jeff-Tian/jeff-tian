require('chai').should();

const mp = require('..');

describe('fetching temp media', ()=>{
    it('fetches temp media by media id', async () =>{
        // arrange
        const mediaId = 1234;

        // act
        const result = await mp.fetchTempMedia(mediaId);

        // assert
        result.should.be.an('string','hello')
    })
})
