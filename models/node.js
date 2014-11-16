
var async = require('async')
var Connection = require('./connection')
var _ = require('lodash')
/*
  assume
  - name
  - text
  - media (optional)
 */

var Node = function(config) {
  this.connections = [];
  for(k in config) {
    this[k] = config[k]
  }
}

Node.prototype.getText = function(cb) {
  var self = this;
  process.nextTick(function() {
    cb(null, self.text)
  })
}

Node.prototype.optionsStr = function() {
  return _.pluck(this.connections,'case').join(', ');
}

Node.prototype.connect = function(otherNode,config) {


  var defaultConf = {
    comparator: '=',
    next: otherNode,
  }

  if(typeof config === 'string') {
    defaultConf.case = config;
    config = defaultConf;
  }

  config = _.merge(defaultConf,config) || defaultConf;

  this.connections.push(new Connection(config));
}

Node.prototype.next = function(input,cb) {
  async.detect(this.connections,function(c,done) {
    c.match(input, function(err, isMatch) {
      done(isMatch);
    })
  }, function(connection) {
    cb(null,connection.next);
  });
}

module.exports = Node;
