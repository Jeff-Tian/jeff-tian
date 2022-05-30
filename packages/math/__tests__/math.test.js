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
            assert(Math.makeSum('x', 'y').join(' ') === 'x + y')
        })

        it('makes a sum expression for 3 numbers', () => {
            assert(Math.makeSum('1', '2', '3') === '6')
        })

        it('makes a sum expression for numbers with another expression', () => {
            assert(Math.makeSum('1', Math.makeProduct('2', '3')) === '7')
        })

        it('makes a sum expression for variables with another expression', () => {
            assert.deepStrictEqual(
                Math.makeSum('x', Math.makeProduct('2', '3')),
                ['x', '+', '6']
            )
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
            assert(Math.makeProduct('a1', 'a2').join(' ') === 'a1 * a2')
        })

        it('makes a product for 3 numbers', () => {
            assert(Math.makeProduct('2', '3', '4') === '24')
        })

        it('makes a product for number with another expression', () => {
            assert.deepStrictEqual(Math.makeProduct('2', Math.makeSum('5', '6')), '22')
        })

        it('makes a product for another expression and a number', () => {
            assert.deepStrictEqual(
                Math.makeProduct(Math.makeSum('5', '6'), '2'),
                '22'
            )
        })

        it('makes a product for another expression and a variable', () => {
            assert.deepStrictEqual(
                Math.makeProduct(
                    Math.makeSum('5', 'x'),
                    'y'
                ),
                [['5', '+', 'x'], '*', 'y']
            )
        })

        it('makes a product for nested expressions', () => {
            assert.deepStrictEqual(
                Math.makeProduct(
                    'x',
                    Math.makeProduct('y', Math.makeSum('x', 3))
                ),
                [
                    "x",
                    "*",
                    [
                        "y",
                        "*",
                        [
                            "x",
                            "+",
                            3
                        ]
                    ]
                ]
            )
        })
    })

    describe('isSum', () => {
        it('is a sum expression', () => {
            assert(Math.isSum(['a', '+', 'b']) === true)
        })

        it('is not a sum expression', () => {
            assert(Math.isSum(['a', '*', 'b']) === false)
        })
    })

    describe('car', () => {
        it('gets the first element of a list', () => {
            assert(Math.car([1, 2, 3, 4]) === 1)
        })
    })

    describe('cdr', () => {
        it('gets the rest elements of a list', () => {
            assert.deepStrictEqual(Math.cdr([1, 2, 3, 4]), [2, 3, 4])
        })
    })

    describe('addend', () => {
        it('gets the addend from a sum expression', () => {
            assert(Math.addend(['1', '+', 'a2']) === '1')
        })

        it('gets the addend which is another expression from a sum expression', () => {
            assert.deepStrictEqual(Math.addend([['2', '**', 'x'], '+', '3']), ['2', '**', 'x'])
        })
    })

    describe('caddr', () => {
        it('gets the 3rd elements of a list', () => {
            assert.deepStrictEqual(Math.caddr([1, 2, 3, 4, 5]), 3)
        })
    })

    describe('augend', () => {
        it('gets the augend from a sum expression', () => {
            assert(Math.augend(['1', '+', 'a2']) === 'a2')
        })

        it('gets the augend which is another expression from a sum expression', () => {
            assert.deepStrictEqual(Math.augend(['1', '+', ['a2', '+', 'a3']]), ['a2', '+', 'a3'])
        })

        it('gets the augend which are multiple items', () => {
            assert.deepStrictEqual(Math.augend(['1', '+', '2', '+', '3']), ['2', '+', '3'])
        })
    })

    describe('is expression a product?', () => {
        it('is a product expression', () => {
            assert(Math.isProduct(['1', '*', '2']) === true)
        })

        it("is NOT a product expression", () => {
            assert(Math.isProduct(['1', '+', '2']) === false)
        })
    })

    describe('multiplier', () => {
        it('gets the multiplier from a product expression', () => {
            assert(Math.multiplier(['1', '*', '2']) === '1')
        })
    })

    describe('multiplicand', () => {
        it("gets the multiplicand from a product expression", () => {
            assert(Math.multiplicand(['1', '*', '2']) === '2')
        })

        it('gets the multiplicand which is multiple items from a product expression', () => {
            assert.deepStrictEqual(Math.multiplicand(['1', '*', '2', '*', '3']), ['2', '*', '3'])
        })

        it('gets the multiplicand which is another expression from a product expression', () => {
            assert.deepStrictEqual(Math.multiplicand(['1', '*', ['2', '+', '3']]), ['2', '+', '3'])
        })
    })

    describe('exponentiation', () => {
        it('detects exponentiation expression', () => {
            assert(Math.isExponentiation(['x', '**', '3']) === true)
        })

        it('is NOT an exponentiation expression', () => {
            assert(Math.isExponentiation(['x', '*', '3']) === false)
        })
    })

    describe('base', () => {
        it('gets the base from an exponentiation expression', () => {
            assert(Math.base(['x', '**', '3']) === 'x')
        })
    })

    describe('exponent', () => {
        it('gets the exponent from an exponentiation expression', () => {
            assert(Math.exponent(['x', '**', '3']) === '3')
        })
    })

    describe('make exponentiation', () => {
        it('makes exponentiation for base is 0', () => {
            assert(Math.makeExponentiation('0', 'a2') === '0')
        })

        it('makes exponentiation for base is 1', () => {
            assert(Math.makeExponentiation('1', 'a2') === '1')
        })

        it('makes exponentiation for exponent is 0', () => {
            assert(Math.makeExponentiation('a1', '0') === '1')
        })

        it('makes exponentiation for exponent is 1', () => {
            assert(Math.makeExponentiation('a1', '1') === 'a1')
        })

        it('makes exponentiation for both base and exponent are numbers', () => {
            assert(Math.makeExponentiation('5', '2') === '25')
        })

        it('makes exponentiation of x ** 3', () => {
            assert.deepStrictEqual(Math.makeExponentiation('x', '3'), ['x', '**', '3'])
        })
    })

    describe('cddr', () => {
        it("gets the rest of the elements of a list after the 2nd element", () => {
            assert.deepStrictEqual(Math.cddr([1, 2, 3, 4, 5]), [3, 4, 5])
        })
    })

    describe('deriv', () => {
        it('calculates the derivation of x + 3, which results to 1', () => {
            assert(Math.deriv(['x', '+', '3'], 'x') === '1')
        })

        it('calculates the derivation of x**0, which results to 0', () => {
            assert(Math.deriv(['x', '**', '0'], 'x') === '0')
        })

        it('calculates the derivation of x**3, which results to 3*x**2', () => {
            assert.deepStrictEqual(Math.deriv(['x', '**', '3'], 'x'), ['3', '*', ['x', '**', 2]])
        })

        it('calculates the derivation of x + (3 * (x + (y+2))), which results to 4', () => {
            assert(Math.deriv(['3', '+', ['x', '+', ['y', '+', '2']]], 'x') === '4')
        })
    })
});
