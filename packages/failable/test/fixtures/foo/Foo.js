const util = require('util')

class Foo {
  constructor() {
    this.hello = function() {
      console.log('hello')

      return "hello"
    }
  }

  bar() {
    throw new Error('foo-bar-error')
  }

  test() {
    return this.hello()
  }
}

Foo.mixin = function(obj) {
  for (var key in obj) {
    if (Foo.prototype.hasOwnProperty(key)) {
      throw new Error(
          'Don\'t allow override existed prototype method. method: ' + key)
    }
    Foo.prototype[key] = obj[key]
  }
}

module.exports = Foo
