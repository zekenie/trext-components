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
  return this.nodes[n1].connect(this.nodes[n2],options);
}


module.exports = Tree;