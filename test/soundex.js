require('assert');
var Filter = require('../lib/badwords.js'),
  filter = new Filter(),
  Soundex = require('soundex'),
  assert = require('better-assert');

describe('Soundex', function(){
  it('Should find words that are not in the list but are similar', function() {
    assert(filter.clean('Well aint that a biotch') === 'Well aint that a *****');
  });
});