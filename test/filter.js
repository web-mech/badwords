require('assert');
var Filter = require('../lib/badwords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('clean',function(){
		it('Should replace a bad word within a sentence asterisks (******)',function(){
			assert(filter.clean('Don\'t be an ash0le') === 'Don\'t be an ******');
		});

		it('Should replace multiple instances of any bad words within a sentence asterisks (******)',function(){
			assert(filter.clean('cnts ash0le knob xxx') === '**** ****** **** ***');
		});

		it('Should not replace anything within a sentence if there are no bad words',function(){
			assert(filter.clean('The cat ran fast') === 'The cat ran fast');
		});

		it('Should replace a string with proper placeholder when overridden', function(){
			var customFilter = new Filter({ placeHolder: 'x'});
			assert(customFilter.clean('This is a hells good test') === 'This is a xxxxx good test');
		});
	});
});