const util = require('util')

exports.baz = function() {
  console.log('baz ', util.inspect(this), this.bar)

  this.bar()
}
