import test from 'ava'
import { Filter } from '../src/badwords.js'

test('isProfane: Should detect a bad word and return a boolean value', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane('ash0le'), true)
})

test('isProfane: Should return false when no bad word is detected', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane('wife'), false)
})

test('isProfane: Should be able to detect a bad word in a sentence', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane('that person is an ash0le'), true)
})

test('isProfane: Filters out special characters appropriately', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane("You're an asshole^ you are"), true)
})

test('isProfane: Should detect filtered words from badwords-list', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane('willies'), true)
})

test('isProfane: Should detect filtered words regardless of type case', (t) => {
  const filter = new Filter({
    list: ['Test'],
  })
  t.is(filter.isProfane('test'), true)
})

test('isProfane: Should tokenize words according to regex word boundaries', (t) => {
  const filter = new Filter()
  t.is(filter.isProfane('that person is an\nasshole'), true)
})

test('isProfane: Should detect bad word phrases', (t) => {
  const filter = new Filter()
  filter.addWords('oh no')
  t.is(filter.isProfane('oh no! this is profane!'), true)
})
