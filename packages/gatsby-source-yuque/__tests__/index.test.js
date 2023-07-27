import assert from "assert";

import {escapeSpecialCharacters} from "../src/escape-special-characters.js";


describe("escape special characters", () => {
    it("escapes for undefined", () => {
        const actual = escapeSpecialCharacters(undefined)
        assert(actual === '');
    })

    it('escapes single quote', ()=>{
        const actual = escapeSpecialCharacters("Hello ' World")
        assert(actual === 'Hello  World');
    })
})
