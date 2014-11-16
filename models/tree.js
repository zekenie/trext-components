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

Tree.prototype.connect = function(n1,n2,options) {
  node1 = this.nodes[n1]
  node2 = this.nodes[n2]
  if(typeof node1 === 'undefined') {
    throw new ReferenceError(n1 + ' is not a node name')
  }
  if(typeof node2 === 'undefined') {
    throw new ReferenceError(n2 + ' is not a node name')
  }
  return node1.connect(node2,options);
}


module.exports = Tree;