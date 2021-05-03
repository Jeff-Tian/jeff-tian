const assert = require('assert');
const { escapeSpecialCharacters } = require('../src/escape-special-characters')

describe("it works", () => {
    it("escape for undefined", () => {
        const actual = escapeSpecialCharacters(undefined)
        assert(actual === '');
    })
})