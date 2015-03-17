require('assert');
var Filter = require('../lib/badwords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('isProfane',function(){
		it("Should detect a bad word and return a boolean value",function(){
			assert(filter.isProfane("ash0le"));
		});

		it("Should return false when no bad word is detected",function(){
			assert(filter.isProfane("wife") === false);
		});

		it("Should be able to detect a bad word in a sentence",function(){
			assert(filter.isProfane("that person is an ash0le"));
		});

		it('Filters out special characters appropriately', function() {
			assert(filter.isProfane("You're an asshole^ you are"));
		});

		it('Should detect filtered words from badwords-list', function(){
			assert(filter.isProfane('willies'));
		});
	});
});
