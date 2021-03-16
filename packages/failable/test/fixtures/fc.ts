import * as util from "util"

const reducer = (prev: any, next: Function) => next(prev)
const asyncReducer = async (prev: Promise<any>, next: Function) => next(await prev)
const combinator = (reduceFn: any) => (...fns: Array<Function>) => (arg?: any) => fns.reduceRight(reduceFn, arg)

export const combine = combinator(reducer)
export const prop = (p: string) => combine(...p.split(".").reverse().map((k: string) => (o: Record<string, any>) => o[k]))
export const combineAsync = combinator(asyncReducer)
export const fork = (fn: Function) => (fork1: Function, fork2: Function) => (input: any) => fn(fork1(input), fork2(input))()

export const debugAsync = async (res: Promise<any>) => {
    const ret = await (res)

    console.log("last async step is ", (util.inspect(ret)).toString().substr(0, 50))

    return ret
}

export const debugAsyncWith = (message: string) => async (res: Promise<any>) => {
    console.log(`>>>>>> ${message}`)
    const ret = await debugAsync(res)
    console.log(`<<<<<< ${message}`)

    return ret
}
export const debug = (res: any) => {
    console.log("last step is ", (res ?? "").toString().substr(0, 50))
    return res
}
export const defer = (fn: Function) => (...args: any[]) => () => fn(...args)
