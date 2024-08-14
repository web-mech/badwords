import test from 'ava'
import { Filter } from '../src/badwords.js'

test('removeWords: Should allow you to remove words from the filter blacklist and no longer filter them (case-insensitive)', (t) => {
  const filter = new Filter()
  filter.removeWords('Hells')
  t.is(filter.clean('This is a hells good test'), 'This is a hells good test')
})

test('removeWords: Should allow you to remove an array of words from the filter blacklist and no longer filter them', (t) => {
  const filter = new Filter()
  const removingWords = ['hells', 'sadist']

  filter.removeWords(...removingWords)
  t.is(
    filter.clean('This is a hells sadist test'),
    'This is a hells sadist test',
  )
})
