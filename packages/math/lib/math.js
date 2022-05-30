'use strict';

Math.isNumber = isFinite
Math.error = (message, v) => {
    throw new Error(message + ' regarding to ' + v)
}
Math.isVariable = x => !Math.isNumber(x)
Math.isSameVariable = (x, y) => Math.isVariable(x) && Math.isVariable(y) && x === y
Math.isTheNumber = (exp, x) => Math.isNumber(exp) && exp.toString() === x.toString()
Math.makeSum = (x, y) => {
    if (Math.isTheNumber(x, 0)) {
        return y;
    }

    if (Math.isTheNumber(y, 0)) {
        return x;
    }

    if (Math.isNumber(x) && Math.isNumber(y)) {
        return (Number(x) + Number(y)).toString();
    }

    return x + ' + ' + y
}
Math.makeProduct = (x, y) => {
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

    return x + ' * ' + y
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

Math.isProduct = (list) => {
    const [_arg1, operator, _arg2] = list
    return operator === '*'
}

Math.multiplier = Math.car
Math.multiplicand = Math.caddr

Math.addend = Math.car
Math.augend = Math.caddr

Math.isExponentiation = (list) => {
    const [_arg1, operator, _arg2] = list
    return operator === '**'
}
Math.base = Math.car
Math.exponent = Math.caddr
Math.makeExponentiation = (base, exponent) => {
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

Math.deriv = (exp, v) => {
    return '1';
}

module.exports = math;

function math() {
    // TODO
}
