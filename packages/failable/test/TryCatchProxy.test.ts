import {tryCatchProxy} from "../src/TryCatchProxy"
import assert = require("assert")

describe("TryCatchProxy", () => {
    it("injects error handler", () => {
        class Foo {
            bar() {
                throw new Error("foo-bar-error")
            }
        }

        const errors = []

        tryCatchProxy(Foo, (error) => {
            errors.push(error)
        })

        const sut = new Foo()

        try {
            sut.bar()
        } catch (error) {
            assert(error.message === 'foo-bar-error')
        }

        assert(errors.length > 0)
    })
})
