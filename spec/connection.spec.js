var Connection = require('../models/connection')

describe("connection",function() {
  it('should match =',function() {
    var c = new Connection({
      'case': 'yes',
      comparator:'='
    })

    expect(c.match('yes')).toBe(true);
  })
})