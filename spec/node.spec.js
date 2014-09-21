var Node = require('../models/node')

describe("Node",function() {
  it('should have no connections by default', function() {
    var n = new Node();
    expect(n.connections.length).toBe(0);
  })

  it('should use defaults for connecting',function() {
    var node1 = new Node();
    var node2 = new Node();

    node1.connect(node2,{
      case: "yes"
    })

    expect(node1.connections.length).toBe(1);
    expect(node1.connections[0].comparator).toBe('=')
    expect(node1.connections[0].next).toBe(node2)
  })

  it('should handle being passed just a node and a case',function() {
    var node1 = new Node();
    var node2 = new Node();
    node1.connect(node2,"yes")
    expect(node1.connections[0].case).toBe('yes');
  })

  it('should find the next properly',function() {
    var node1 = new Node();
    var node2 = new Node({name:'2'});
    var node3 = new Node({name:'3'});

    node1.connect(node2,"yes")
    node1.connect(node3,"no")
    expect(node1.next('yes').name).toBe('2');
    expect(node1.next('no').name).toBe('3');
  })

  it('should work with otherwise',function() {
    var node1 = new Node();
    var node2 = new Node({name:'2'});

    node1.connect(node2,{
      comparator: 'otherwise'
    })

    expect(node1.next('sflkjkdj').name).toBe('2')
  })

  it('should generate an options str',function() {
    var node1 = new Node();
    var node2 = new Node({name:'2'});
    var node3 = new Node({name:'3'});

    node1.connect(node2,"yes")
    node1.connect(node3,"no")

    expect(node1.optionsStr()).toBe('yes, no')
  })

})