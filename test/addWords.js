require('assert');
var Filter = require('../lib/badwords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', function(){
  describe('addWords',function(){
    it('Should append words to the filter list.', function(){
      filter.addWords('dog');
      assert(filter.clean('Go dog go') === 'Go *** go');
    });
  });
});