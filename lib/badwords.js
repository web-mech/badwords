var detector = (function(){
	function Filter(){
		this.list = require('./lang.json').words;
	}

	Filter.prototype.isProfane = function isProfane(string){
		var foundProfane = false;
		for(var i = 0; i < this.list.length; i++) {
			var words = string.split(" ");
			for (var j = 0; j < words.length; j++) {
				if (words[j].toLowerCase() == this.list[i].toLowerCase()) {
					return true;
				}
			}
		}
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
