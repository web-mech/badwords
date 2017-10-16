var Filter = (function() {
  function Filter(options) {
    options = options || {};
    this.list = options.emptyList && [] || Array.prototype.concat.apply(require('./lang.json').words, [require('badwords-list').array, options.list || []]);
    this.exclude = options.exclude || [];
    this.placeHolder = options.placeHolder || '*';
    this.regex = options.regex || /[^a-zA-z0-9|\$|\@]|\^/g;
    this.replaceRegex = options.replaceRegex || /\w/g;
  }

  Filter.prototype.isProfane = function isProfane(string) {
    return string
      .split(' ')
      .map(function(w) {
        return w.toLowerCase().replace(this.regex, '');
      }, this)
      .map(this.isProfaneLike, this)
      .filter(function(profane) {
        return profane;
      })
      .shift() || false;
  };

  Filter.prototype.isProfaneLike = function profaneLike(word) {
    return !!~this.exclude.indexOf(word) ? false : !!~this.list.indexOf(word) || this.list
      .map(function(w) {
        return new RegExp(w.replace(/(\W)/g, '\\$1'));
      }, this)
      .reduce(function(outcome, wordExp) {
        if (wordExp.test(word)) {
          return true;
        }
        return outcome;
      }, false);
  };

  Filter.prototype.replaceWord = function replaceWord(string) {
    return string.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
  };

  Filter.prototype.clean = function clean(string) {
    return string.split(/\b/).map(function(word) {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }.bind(this)).join('');
  };

  Filter.prototype.addWords = function addWords(words) {
    words = (words instanceof Array) ? words : [words];
    this.list = this.list.concat(words);

    words.forEach(function(word) {
      if(!!~this.exclude.indexOf(word)) {
        this.exclude.splice(this.exclude.indexOf(word), 1);
      }
    }, this);
  };

  Filter.prototype.removeWords = function removeWords() {
    var words = Array.prototype.slice.call(arguments);
    this.exclude.push.apply(this.exclude, words);
  };

  return Filter;
})();

module.exports = Filter;