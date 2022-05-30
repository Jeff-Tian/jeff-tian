'use strict';

Math.isNumber = isFinite
Math.error = (message, v) => {
    throw new Error(message + ' regarding to ' + v)
}
Math.isVariable = x => !Math.isNumber(x)
Math.isSameVariable = (x, y) => Math.isVariable(x) && Math.isVariable(y) && x === y

module.exports = math;

function math() {
    // TODO
}
