var _ = require('lodash')
var Connection = function(config) {
  for(k in config) {
    this[k] = config[k]
  }
}

Connection.prototype.otherwise = function() {
  return true
};

Connection.prototype["="] = function(input) {
  return input.toLowerCase() === this.case.toLowerCase()
};

Connection.prototype[">"] = function(input) {
  return parseInt(input) > this.case
};

Connection.prototype["<"] = function(input) {
  return parseInt(input) < this.case
};

Connection.prototype[">="] =  function(input) {
  return parseInt(input) >= this.case
};

Connection.prototype["<="] = function(input) {
  return parseInt(input) <= this.case
};

//todo regex

Connection.prototype.contains =  function(input) {
  return input.toLowerCase().indexOf(this.case.toLowerCase()) !== -1
}

Connection.prototype.match = function(input,cb) {
  var self = this;
  process.nextTick(function() {
    cb(null, self[self.comparator](input))
  })
}


module.exports = Connection;