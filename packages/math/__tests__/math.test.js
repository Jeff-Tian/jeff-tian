'use strict';

const math = require('..');
const assert = require("power-assert").customize({});

describe('math', () => {
    describe('isNumber', () => {
        it('is a number', () => {
            assert(Math.isNumber('1') === true);
        });

        it('is not a number', () => {
            assert(Math.isNumber('a') === false);
        });
    });

    describe('error', () => {
        it('throws error', () => {
            assert.throws(() => {
                Math.error('message', 'a')
            }, /message regarding to a/)
        })
    })

    describe('variable', () => {
        it('is a variable', () => {
            assert(Math.isVariable('x') === true);
        })

        it('is not a variable', () => {
            assert(Math.isVariable('123') === false);
        })
    });

    describe('sameVariable?', () => {
        it('is the same variable', () => {
            assert(Math.isSameVariable('x', 'x') === true)
        })

        it('is not the same variable', () => {
            assert(Math.isSameVariable('x', 'y') === false)
        })
    })

    describe('isTheNumber', () => {
        it('is the number 0', () => {
            assert(Math.isTheNumber('0', 0) === true)
        })

        it('is NOT the number 0 as it is 1', () => {
            assert(Math.isTheNumber('1', 0) === false)
        })

        it("is NOT the number 0 as it is a variable", () => {
            assert(Math.isTheNumber('x', 0) === false)
        })
    })

    describe('make sum', () => {
        it('makes a sum expression for a1 is 0', () => {
            assert(Math.makeSum('0', 'a2') === 'a2')
        })

        it('makes a sum expression for a2 is 0', () => {
            assert(Math.makeSum('a1', '0') === 'a1')
        })

        it('makes a sum expression for 2 numbers', () => {
            assert(Math.makeSum('2', '3') === '5')
        })

        it('makes a sum expression for 2 variables', () => {
            assert(Math.makeSum('x', 'y') === 'x + y')
        })
    })

    describe('make product', () => {
        it('makes a product for a1 is 0', () => {
            assert(Math.makeProduct('0', 'a2') === '0')
        })

        it('makes a product for a1 is 1', () => {
            assert(Math.makeProduct('1', 'a2') === 'a2')
        })

        it('makes a product for a2 is 0', () => {
            assert(Math.makeProduct('a1', '0') === '0')
        })

        it('makes a product for a2 is 1', () => {
            assert(Math.makeProduct('a1', '1') === 'a1')
        })

        it('makes a product for 2 numbers', () => {
            assert(Math.makeProduct('2', '3') === '6')
        })

        it('makes a product for 2 variables', () => {
            assert(Math.makeProduct('a1', 'a2') === 'a1 * a2')
        })
    })
});
