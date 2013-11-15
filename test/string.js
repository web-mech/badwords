require('assert');
require('../lib/badwords.js');
var assert = require('better-assert');

describe('String', function(){
	
	it("Should have the prototype method clean",function(){
		assert(typeof String.prototype.clean == 'function');
	});

	describe('clean',function(){
		it("Should replace a bad word within a sentence asterisks (******)",function(){
			assert("Don't be an ash0le".clean() == "Don't be an ******");
		});

		it("Should replace multiple instances of any bad words within a sentence asterisks (******)",function(){
			assert("cnts ash0le knob xxx".clean() == "**** ****** **** ***");
		});

		it("Should not replace anything within a sentence if there are no bad words",function(){
			assert("The cat ran fast".clean() == "The cat ran fast");
		});
	});
});