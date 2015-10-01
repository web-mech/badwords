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

    it('Should allow a list to be passed to the constructor', function() {
      var filter = new Filter({
        list: ['dog']
      });

      assert(filter.clean('Go dog go') === 'Go *** go');
    });
  });
});