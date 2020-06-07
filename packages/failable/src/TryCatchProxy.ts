export const tryCatchProxy = (superClass, errorHandler) => {
    const prototype = superClass.prototype

    if (Object.getOwnPropertyNames(prototype).length < 2) {
        return superClass
    }

    const handler = function (fn) {
        const self = this

        return function (...args: any[]) {
            try {
                return fn.apply(self ?? this, args)
            } catch (error) {
                errorHandler(error)

                throw  error
            }
        }
    }

    for (const property in Object.getOwnPropertyDescriptors(prototype)) {
        if (prototype.hasOwnProperty(property) && property !== 'constructor' && typeof prototype[property] === 'function') {
            superClass.prototype[property] = handler(superClass.prototype[property])
        }
    }

    return superClass
}
