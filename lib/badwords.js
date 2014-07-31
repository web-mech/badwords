var Filter = (function() {
  function Filter(options) {
    options = options || {};
    this.list = Array.prototype.concat.apply( require('./lang.json').words, require('badwords-list').array );
    this.placeHolder = options.placeHolder || '*';
    this.Factory = Filter;
  }

  Filter.prototype.isProfane = function isProfane(string) {
      var words = string.split(' ');
      for (var j = 0; j < words.length; j++) {
        var word = words[j].toLowerCase().replace(/\*|\+|\-|\./g, '');
        if(~this.list.indexOf(word)) {
          return true;
        }
      }
    return false;
  };

  Filter.prototype.replaceWord = function replaceWord(string) {
    return string.replace(/\*|\+|\-|\./g, '').replace(/\w/g, this.placeHolder);
  };

  Filter.prototype.clean = function clean(string) {
    return string.split(' ').map(function(word) {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }.bind(this)).join(' ');
  };

  Filter.prototype.addWords = function addWords(words) {
    words = (words instanceof Array) ? words : [words];
    this.list = this.list.concat(words);
  };
  return Filter;
})();

String.prototype.clean = String.prototype.clean || function(){};

module.exports = new Filter();
