import * as util from "util"

export class Failable {
    value: any

    static of(x: any) {
        return new Ok(x)
    }

    constructor(x: any) {
        this.value = x
    }

    isOk() {
        return this.value instanceof Ok
    }

    static dontThrow(f: Function, ...args: any[]) {
        try {
            return new Ok(f(...args))
        } catch (ex) {
            return new Err(ex)
        }
    }

    static async dontThrowAsync(f: Function, ...args: any[]) {
        try {
            return new Ok(await f(...args))
        } catch (ex) {
            return new Err(ex)
        }
    }
}

export class Err extends Failable {
    map(_f: Function) {
        return this
    }

    toString() {
        return `Err(${util.inspect(this.value)})`
    }
}

export class Ok extends Failable {
    map(f: Function) {
        return Failable.of(f(this.value))
    }

    toString() {
        return `Ok(${util.inspect(this.value)})`
    }
}
