'use strict';

(function (global, Math) {
    Math.isNumber = isFinite
    Math.error = (message, v) => {
        throw new Error(message + ' regarding to ' + v)
    }
    Math.isVariable = x => !Math.isNumber(x) && !(x instanceof Array)
    Math.isSameVariable = (x, y) => Math.isVariable(x) && Math.isVariable(y) && x === y
    Math.isTheNumber = (exp, x) => Math.isNumber(exp) && exp.toString() === x.toString()

    const makeSumOf2 = (x, y) => {
        if (Math.isTheNumber(x, 0)) {
            return y;
        }

        if (Math.isTheNumber(y, 0)) {
            return x;
        }

        if (Math.isNumber(x) && Math.isNumber(y)) {
            return (Number(x) + Number(y)).toString();
        }

        return [x, '+', y]
    }

    Math.makeSum = (x, y, ...rest) => {
        const sumOfTwo = makeSumOf2(x, y)

        if (rest.length <= 0) {
            return sumOfTwo
        }

        return Math.makeSum(sumOfTwo, ...rest)
    }

    const makeProductOfTwo = (x, y) => {
        if (Math.isTheNumber(x, 0)) {
            return '0'
        }
        if (Math.isTheNumber(x, 1)) {
            return y
        }
        if (Math.isTheNumber(y, 0)) {
            return '0'
        }
        if (Math.isTheNumber(y, 1)) {
            return x
        }
        if (Math.isNumber(x) && Math.isNumber(y)) {
            return (Number(x) * Number(y)).toString()
        }

        return [x, '*', y]
    }
    Math.makeProduct = (x, y, ...rest) => {
        const productOfTwo = makeProductOfTwo(x, y)

        if (rest.length <= 0) {
            return productOfTwo
        }

        return Math.makeProduct(productOfTwo, ...rest)
    }

    Math.isSum = (list) => {
        const [_arg1, operator, _arg2] = list
        return operator === '+'
    }

    Math.car = (list) => {
        const [car] = list
        return car
    }
    Math.cdr = (list) => {
        const [_car, ...cdr] = list
        return cdr;
    }
    Math.caddr = (list) => {
        return Math.car(Math.cdr(Math.cdr(list)))
    }
    Math.cddr = (list) => {
        const [_car, _2nd, ...cddr] = list
        return cddr
    }

    Math.isProduct = (list) => {
        const [_arg1, operator, _arg2] = list
        return operator === '*'
    }

    const getCddrOrCaddr = (list) => {
        const cddr = Math.cddr(list);

        if (cddr.length <= 1) {
            return Math.caddr(list);
        }

        return cddr;
    }

    Math.multiplier = Math.car
    Math.multiplicand = getCddrOrCaddr

    Math.addend = Math.car
    Math.augend = getCddrOrCaddr

    Math.isExponentiation = (list) => {
        const [_arg1, operator, _arg2] = list
        return operator === '**'
    }
    Math.base = Math.car
    Math.exponent = Math.caddr

    const makeExponentiationForBaseAndExponent = (base, exponent) => {
        if (Math.isTheNumber(base, 0) || Math.isTheNumber(base, 1) || Math.isTheNumber(exponent, 1)) {
            return base
        }

        if (Math.isTheNumber(exponent, 0)) {
            return '1'
        }

        if (Math.isNumber(base) && Math.isNumber(exponent)) {
            return (Math.pow(Number(base), Number(exponent))).toString()
        }

        return [base, '**', exponent];
    }

    Math.makeExponentiation = (...args) => {
        const [exponent, base, ...rest] = args.reverse();
        const exponentiationOfBaseAndExponent = makeExponentiationForBaseAndExponent(base, exponent);

        if (rest.length <= 0) {
            return exponentiationOfBaseAndExponent
        }

        return Math.makeExponentiation(...[exponentiationOfBaseAndExponent, ...rest].reverse())
    }

    Math.isExpressionWithOnly1Variable = (exp) => {
        return exp instanceof Array && exp.length === 1 && Math.isVariable(exp[0])
    }

    Math.deriv = (exp, v) => {
        if (Math.isNumber(exp)) {
            return '0'
        }

        if (Math.isVariable(exp)) {
            return Math.isSameVariable(exp, v) ? '1' : '0'
        }

        if (Math.isSum(exp)) {
            return Math.makeSum(
                Math.deriv(Math.addend(exp), v),
                Math.deriv(Math.augend(exp), v)
            )
        }

        if (Math.isProduct(exp)) {
            return Math.makeSum(
                Math.makeProduct(
                    Math.multiplier(exp),
                    Math.deriv(Math.multiplicand(exp), v)
                ),
                Math.makeProduct(
                    Math.deriv(Math.multiplier(exp), v),
                    Math.multiplicand(exp)
                )
            )
        }

        if (Math.isExponentiation(exp)) {
            const exponent = Math.exponent(exp);

            if (Math.isTheNumber(exponent, 0)) {
                return '0'
            }

            const base = Math.base(exp)
            if (Math.isTheNumber(exponent, 1)) {
                return Math.deriv(base, v)
            }

            return Math.makeProduct(
                exponent,
                Math.makeExponentiation(
                    base,
                    Math.makeSum(exponent, -1)
                )
            )
        }

        if (Math.isExpressionWithOnly1Variable(exp)) {
            return Math.deriv(exp[0], v)
        }

        return Math.error('unknown expression type -- deriv', exp)
    }

    if (typeof global.module === 'undefined') {
        global.module = {exports: {}}
    }

    global.module.exports = math;

    function math() {
        // TODO
    }
})(this, this['math'] ?? Math);
