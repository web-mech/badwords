require('assert');
var Filter = require('../lib/badwords.js'),
assert = require('better-assert');

describe('accents', function() {
  it('should accept accented characters', () => {
    filter = new Filter();
    console.log('foo', filter.clean('assécher'));
    assert(filter.clean('assécher') === 'assécher');
  });

  it('should respect misc blanks', () => {
    filter = new Filter({enhancedWordSep: true});
    const cleanText = "Bonjour,\nces cheveux sont asséchés.";
    assert(filter.clean(cleanText) === cleanText);
  });
});
