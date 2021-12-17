const util = require("util");

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
    var ctor, prot;

    if (isObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
};

const curlirize = config => {
    try {
        const {headers: rawHeaders, method = 'GET', baseURL = '', url, params: rawParams = {}, data} = config
        const headers = {
            ...rawHeaders?.common,
            ...(isPlainObject(data)
                ? {'Content-Type': 'application/json'}
                : rawHeaders
                    ? rawHeaders[method.toLowerCase()]
                    : {}),
            ...rawHeaders?.get,
            ...rawHeaders?.post,
            ...rawHeaders?.put,
            ...rawHeaders?.delete
        }

        const query = Array.from(Object.entries(rawParams)).reduce((query, [key, value]) => {
            if (value === undefined) return query

            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    value.forEach((item) => query.append(key, item))
                } else {
                    // undefined behavior
                }
            } else {
                query.append(key, `${value}`)
            }

            return query
        }, new URLSearchParams())

        const serializedHeaders = headers ? Object.keys(headers).map((key) => `--header "${key}: ${headers[key]}"`) : []

        const cmd = `cURL to replay: curl -X ${method.toUpperCase()} "${baseURL}${url}${
            query ? `?${query.toString()}` : ''
        }" ${serializedHeaders.join(' ')} `

        if (isPlainObject(data)) {
            return cmd + `--data '${JSON.stringify(data)}'`
        } else {
            return cmd
        }
    } catch (ex) {
        console.error('curlirizing config error: ', config, ex)
        return `curlirizing config error: , config = ${util.inspect(config)}, ex = ${util.inspect(ex)}`;
    }
};

class UpstreamError extends Error {
    constructor(message, upstreamError) {
        super(message);

        this.upstreamError = upstreamError;

        this.cURL = curlirize(upstreamError.config)
    }
}

module.exports = UpstreamError;