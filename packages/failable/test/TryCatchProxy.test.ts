import {tryCatchProxy} from "../src/TryCatchProxy"
import assert = require("assert")
import Foo = require('./fixtures/foo')

describe("TryCatchProxy", () => {
    const errors = []
    tryCatchProxy(Foo, (error) => {
        errors.push(error.message)
    })

    beforeEach(() => {
        errors.splice(0)
    })

    it("injects error handler", () => {
        const sut = new Foo()

        try {
            sut.bar()
        } catch (error) {
            assert(error.message === 'foo-bar-error')
        }

        assert(errors.length === 1)
    })

    it("works with mixin", () => {
        const sut = new Foo()

        try {
            // @ts-ignore
            sut.baz()
        } catch (error) {
            assert(error.message === 'foo-bar-error')
        }

        // bar error caught by error handler, and bar was called by baz
        // and baz error caught again by error handler
        assert.deepStrictEqual(errors, ['foo-bar-error', 'foo-bar-error'])
        assert(errors.length === 2)
    })

    it("works with constructor defined methods", () => {
        const sut = new Foo()

        // @ts-ignore
        assert(sut.testFromOutside() === 'hello')
    })
})
