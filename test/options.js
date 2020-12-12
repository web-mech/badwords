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

    it('should discard empty string from personalized list, if present', function() {
      var personalized = "kafir,,hello";
      var myList = personalized.split(",");
      filter = new Filter({ emptyList: true });
      filter.addWords(...myList);
      assert(filter.clean('nice try') == 'nice try');
      assert(filter.clean('hello mister') == '***** mister');
    })

  });
});
