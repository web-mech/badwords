import test from 'ava'
import { Filter } from '../src/index.js'

test('addWords: Should append words to the filter list.', (t) => {
  const filter: Filter = new Filter()
  filter.addWords('dog', 'go')
  t.is(filter.clean('Go dog go'), '** *** **')
})

test('addWords: Should append words to the filter using an array', (t) => {
  const addWords = ['go', 'dog']
  const filter = new Filter()
  filter.addWords(...addWords)
  t.is(filter.clean('Go dog go'), '** *** **')
})

test('addWords: Should allow a list to be passed to the constructor', (t) => {
  const filter = new Filter({
    list: ['dog'],
  })

  t.is(filter.clean('Go dog go'), 'Go *** go')
})
