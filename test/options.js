require('assert');
var Filter = require('../lib/badwords.js'),
assert = require('better-assert');

describe('options', function() {
  describe('split regex', function() {

    it('default value', function() {
      filter = new Filter();
      filter.addWords('français');
      assert(filter.clean('fucking asshole') == '******* *******');
      assert(filter.clean('mot en français') == 'mot en français');
    });

    it('override value', function() {
      filter = new Filter({splitRegex: / /});
      filter.addWords('français');
      assert(filter.clean('fucking asshole') == '******* *******');
      assert(filter.clean('mot en français') == 'mot en *******');
    });


  });
});
