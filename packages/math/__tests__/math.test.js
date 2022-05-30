'use strict';

const math = require('..');
const assert = require("assert");

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
});
