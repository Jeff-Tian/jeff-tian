import {getDate} from "../src/get-date.js";

import assert from "assert";

describe('get date', () => {
  it('gets date', () => {
    const dateTime = new Date(2021, 10, 3, 15, 0, 0, 0)

    const date = getDate(dateTime)
    assert.deepStrictEqual(date, '2021-11-3')
  })
})
