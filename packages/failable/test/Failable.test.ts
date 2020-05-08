import {Failable} from "../src"
import {Err} from "../src"
import assert = require('assert')
import {sleepAtLeast} from '@jeff-tian/sleep'

describe("Failable", () => {
    it("ok", () => {
        assert(
            Failable.of("ok")
                .map((x: any) => x)
                .toString()
            === "Ok('ok')")
    })

    it("err", () => {
        assert(new Err("error").map((x: any) => x).toString() === "Err('error')")
    })
})

describe("wrap throwable functions", () => {
    const sut = (x: number) => {
        if (x > 100) {
            throw new Error("too big!")
        }

        return x
    }

    it("ok", () => {
        assert(Failable.dontThrow(sut, 5).toString() === "Ok(5)")
    })

    it("err", () => {
        const res = Failable.dontThrow(sut, 101)
        assert(res instanceof Err)
        assert(res.value.message === "too big!")
    })
})

describe("Async", () => {
    const sut = async (x: number) => {
        await sleepAtLeast(1)

        if (x > 100) {
            throw new Error("too big!")
        }

        return x
    }

    it("ok", async () => {
        let res = await Failable.dontThrowAsync(sut, 5)
        assert(res.value === 5)
    })

    it("err", async () => {
        const res = await Failable.dontThrowAsync(sut, 101)
        assert(res instanceof Err)
        assert(res.value.message === "too big!")

        return "err"
    })
})
