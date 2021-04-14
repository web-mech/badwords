require('assert');
var Filter = require('../lib/badwords.js'),
assert = require('better-assert');

describe('options', function() {
  describe('enhancedWordSep', () => {

    it('enhancedWordSep for accented characters', () => {
      defaultFilter = new Filter();
      accentsFilter = new Filter({enhancedWordSep: true});
      assert(defaultFilter.clean('assécher') == '***écher');
      assert(accentsFilter.clean('assécher') == 'assécher');
    });

  });
});
