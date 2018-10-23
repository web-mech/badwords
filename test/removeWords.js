require('assert');
var Filter = require('../lib/badwords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', () => {
  describe('removeWords',() => {
    it('Should allow you to remove words from the filter blacklist and no longer filter them', () => {
      filter.removeWords('hells');
      assert(filter.clean('This is a hells good test') === 'This is a hells good test');
    });

    it ('Should allow you to remove an array of words from the filter blacklist and no longer filter them', () => {
      let removingWords = ['hells', 'sadist'];
      
      filter = new Filter();
      filter.removeWords(...removingWords);
      assert(filter.clean('This is a hells sadist test') === 'This is a hells sadist test');
    });
  });
});