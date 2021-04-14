const localList = require('./lang.json').words;
const baseList = require('badwords-list').array;

const b = `[0-9_\\-+ \t\r\n,\.;:()!^?[\\]'"{}${'`'}]`;
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
   * @param {string} options.enhancedWordSep - Activate a smarter word-sep than \b, for support for accented chars.
   */
  constructor(options = {}) {
    Object.assign(this, {
      list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      enhancedWordSep: options.enhancedWordSep || false,
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
    const wordSep = this.enhancedWordSep ? /`${b}`/ : /\b/;
    return string.split(wordSep).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join(/\b/.exec(string)[0]);
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