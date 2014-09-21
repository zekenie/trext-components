var Node = require('./node')
var _ = require('lodash')

var Tree = function(config) {
  this.nodes = {};
  for(k in config) {
    this[k] = config[k]
  }
}

Tree.prototype.addNode = function(node,startingPoint) {
  if(startingPoint)
    this.startingPoint = node;
  this.nodes[node.name] = node;
}


module.exports = Tree;