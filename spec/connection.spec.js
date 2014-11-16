var Connection = require('../models/connection')

describe("connection",function() {
  it('should match =',function(done) {
    var c = new Connection({
      'case': 'yes',
      comparator:'='
    })

    c.match('yes', function(err, match) {
      expect(match).toBe(true)
      done()
    })

  })
})