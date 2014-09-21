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

  // console.log(defaultConf)


  config = _.merge(defaultConf,config) || defaultConf;

  this.connections.push(new Connection(config));
}

Node.prototype.next = function(input) {
  for(var i = 0; i < this.connections.length; i++) {
    if(this.connections[i].match(input)) {
      return this.connections[i].next;
    }
  }
}

module.exports = Node;
