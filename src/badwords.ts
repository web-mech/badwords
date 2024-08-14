import { localList } from './lang.js'
import { array as baseList } from 'badwords-list'

/**
 * Constructor options for Filter class.
 *
 * @property {boolean} emptyList - Instantiate filter with no blocklist
 * @property {array} list - Instantiate filter with custom list
 * @property {string} placeHolder - Character used to replace profane words.
 * @property {string} regex - Regular expression used to sanitize words before comparing them to blocklist.
 * @property {string} replaceRegex - Regular expression used to replace profane words with placeHolder.
 * @property {string} splitRegex - Regular expression used to split a string into words.
 */
export interface FilterOptions {
  emptyList?: boolean
  list?: string[]
  exclude?: string[]
  placeHolder?: string
  regex?: RegExp
  replaceRegex?: RegExp
  splitRegex?: RegExp
}

/**
 * Local list of profane words.
 *
 * @property {array} words - List of profane words.
 */
export type LocalList = {
  words: string[]
}

/**
 * Profanity Filter class.
 * @public
 */
export class Filter {
  /**
   * List of words to filter.
   * @type {array} list - List of words to filter.
   */
  list: string[] = []
  /**
   * List of words to exclude from filter.
   * @type {array} exclude - List of words to exclude from filter.
   */
  exclude: string[] = []
  /**
   * Character used to replace profane words.
   * @type {string} placeHolder - Character used to replace profane words.
   */
  placeHolder: string = '*'
  /**
   * Regular expression used to sanitize words before comparing them to blocklist.
   * @type {string} regex - Regular expression used to sanitize words before comparing them to blocklist.
   */
  regex: RegExp = /[^a-zA-Z0-9|$|@]|\^/g
  /**
   * Regular expression used to replace profane words with placeHolder.
   * @type {string} replaceRegex - Regular expression used to replace profane words with placeHolder.
   */
  replaceRegex: RegExp = /\w/g
  /**
   * Regular expression used to split a string into words.
   * @type {string} splitRegex - Regular expression used to split a string into words.
   */
  splitRegex: RegExp = /\b|_/g

  /**
   * Filter constructor.
   *
   * @param {FilterOptions} options - Constructor options for Filter class.
   */
  constructor(options: FilterOptions = {}) {
    Object.assign(this, {
      list:
        (options.emptyList && []) ||
        Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\b|_/g,
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|$|@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g,
    })
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string: string): boolean {
    return (
      this.list.filter((word) => {
        const wordExp = new RegExp(
          `\\b${word.replace(/(\W)/g, '\\$1')}\\b`,
          'gi',
        )
        return (
          !this.exclude.includes(word.toLowerCase()) && wordExp.test(string)
        )
      }).length > 0 || false
    )
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string: string): string {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder)
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} input - String to filter.
   */
  clean(input: string): string {
    const delimiter = this.splitRegex.exec(input)

    if (!input || !delimiter) {
      return input
    }

    return input
      .split(this.splitRegex)
      .map((word) => {
        return this.isProfane(word) ? this.replaceWord(word) : word
      })
      .join(delimiter[0])
  }

  /**
   * Add word(s) to blocklist filter / remove words from whitelist filter
   * @param {...string} words - Word(s) to add to blocklist
   */
  addWords(...words: string[]): void {
    this.list.push(...words)

    words
      .map((word) => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1)
        }
      })
  }

  /**
   * Add words to allowlist filter
   * @param {...string} words - Word(s) to add to allowlist.
   */
  removeWords(...words: string[]): void {
    this.exclude.push(...words.map((word) => word.toLowerCase()))
  }
}
