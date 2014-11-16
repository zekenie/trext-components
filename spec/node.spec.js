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

  it('should find the next properly',function(done) {
    var node1 = new Node();
    var node2 = new Node({name:'2'});
    var node3 = new Node({name:'3'});

    node1.connect(node2,"yes")
    node1.connect(node3,"no")

    node1.next('yes', function(err,oneRes) {
      node1.next('no', function(err, twoRes) {
        expect(oneRes.name).toBe('2')
        expect(twoRes.name).toBe('3')
        done()
      })
    })
  })

  it('should work with otherwise',function(done) {
    var node1 = new Node();
    var node2 = new Node({name:'2'});

    node1.connect(node2,{
      comparator: 'otherwise'
    })

    node1.next('asdf', function(err, next) {
      expect(next.name).toBe('2')
      done();
    })

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