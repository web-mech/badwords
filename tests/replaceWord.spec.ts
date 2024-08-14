import test from 'ava'
import { Filter } from '../src/badwords.js'

test('replaceWord: Should replace a bad word with asterisks (******)', (t) => {
  const filter = new Filter()

  t.is(filter.replaceWord('ash0le'), '******')
})
