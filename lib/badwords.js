var detector = (function(){
	function Filter(){
		this.list = require('./lang.json').words;
	}

	Filter.prototype.isProfane = function isProfane(string){
		for(var i = 0; i < this.list.length; i++)
			if(string.toLowerCase() == this.list[i].toLowerCase())
				return true;

		return false;
	};

	Filter.prototype.replaceWord = function replaceWord(string){
		return string.split("").map(function(c){
			return "*";
		}).join("");
	};

	Filter.prototype.clean = function clean(string){
		return string.split(" ").map(function(word){
			return this.isProfane(word) ? this.replaceWord(word) : word;
		}.bind(this)).join(" ");
	};

	return Filter;
})();

String.prototype.clean = function clean(){
	var filter = new detector();
	return filter.clean(this);
};

module.exports = new detector();