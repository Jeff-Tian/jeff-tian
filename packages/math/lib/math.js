'use strict';

Math.isNumber = isFinite
Math.error = (message, v) => {
    throw new Error(message + ' regarding to ' + v)
}

module.exports = math;

function math() {
    // TODO
}
