const localList = require('./lang.json').words;
const baseList = require('badwords-list').array;

class Filter {

  /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   */
  constructor(options = {}) {
    Object.assign(this, {
      list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g
    })
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    return this.list
      .filter((word) => {
        const W = word.replace(/(\W)/g, '\\$1');
        const wordExp = this.enhancedWordSep ?
          new RegExp(`(${b}${W}${b})|(^${W}${b})|(${b}${W}$)|(^${W}$)`, 'gi') :
          new RegExp(`\\b${W}\\b`, 'gi');

        return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
  }

  /**
   * Determine if a word contains profane language. Case insensitive,
   * but the word should be already isolated (ie. no phrase, only a word).
   * @param wordToCheck {string} - Word to evaluate for profanity.
   */
  isProfaneWord(wordToCheck) {
    for (const word of this.list) {
      if (!this.exclude.includes(word) && wordToCheck.toLowerCase() === word.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    const delimiter = " .,\n\r\t:;'\"()<>";
    const splitWithDelimiter = (delimiter, string) => string.match(new RegExp(`([${delimiter}]+|[^${delimiter}]+)`, "g"));
    const withDelimiter = delimiter => ({[Symbol.split]: string => splitWithDelimiter(delimiter, string)});

    return string.split(withDelimiter(delimiter)).map((word) => {
      return this.isProfaneWord(word) ? this.replaceWord(word) : word;
    }).join('');
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }
}

module.exports = Filter;
