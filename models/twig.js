var Node = require('./node')
var _ = require('lodash')

var Twig = function(config) {
  this.nodes = [];
  for(k in config) {
    this[k] = config[k]
  }
}

Twig.prototype.addNode = function(node) {
  if(this.nodes.length === 0) {
    this.head = node;
  }
  this.tail.connect(node, {
    comparator: 'otherwise'
  })
  this.tail = node;
  this.nodes.push(node);
}


module.exports = Twig;