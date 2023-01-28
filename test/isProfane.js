require('assert');
var Filter = require('../lib/badwords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function () {
	describe('isProfane', function () {
		it("Should detect a bad word and return a boolean value", function () {
			assert(filter.isProfane("ash0le"));
		});

		it("Should return false when no bad word is detected", function () {
			assert(filter.isProfane("wife") === false);
		});

		it("Should be able to detect a bad word in a sentence", function () {
			assert(filter.isProfane("that person is an ash0le"));
		});

		it('Filters out special characters appropriately', function () {
			assert(filter.isProfane("You're an asshole^ you are"));
		});

		it('Should detect filtered words from badwords-list', function () {
			assert(filter.isProfane('willies'));
		});

		it('Should detect filtered words regardless of type case', function () {
			var filter = new Filter({
				list: ['Test']
			});
			assert(filter.isProfane('test'));
		});

		it('Should tokenize words according to regex word boundaries', function () {
			assert(filter.isProfane("that person is an\nasshole"));
		});

		it('Should detect bad word phrases', function () {
			filter.addWords('oh no');
			assert(filter.isProfane("oh no! this is profane!"));
		});

		it('Should not detect bad word when remove the bad word', function () {
			filter.removeWords('willies');
			assert(filter.isProfane("willies! this is not a profane!") == false);
		});

		it('Should detect bad word regardless remove the bad word isAnyProfane function', function () {
			filter.removeWords('willies');
			assert(filter.isAnyProfane("willies! this is not a profane!"));
		});

	});
});
