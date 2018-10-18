require('assert');
var Filter = require('../lib/badwords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', function(){
  describe('removeWords', function(){
    it("Should allow you to remove words from the filter blacklist and no longer filter them", function(){
      filter.removeWords('hells');
      assert(filter.clean('This is a hells good test') === 'This is a hells good test');
      filter.addWords('hells');
      assert(filter.clean('This is a hells good test') === 'This is a ***** good test');
    });

    it("Should allow you to add an array of bad words to filter", function(){
      filter.removeWords(['hells','crap']);
      assert(filter.clean('This is a hells a crap test') === 'This is a hells a crap test');
    });
  });
});