const util = require('util')

class Foo {
  bar() {
    throw new Error('foo-bar-error')
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
