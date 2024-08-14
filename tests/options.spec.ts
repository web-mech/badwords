import test from 'ava'
import { Filter } from '../src/badwords.js'

test('options: default value', (t) => {
  const filter = new Filter()
  filter.addWords('français')
  t.is(filter.clean('fucking asshole'), '******* *******')
  t.is(filter.clean('mot en français'), 'mot en français')
})

test('options: override value', (t) => {
  const filter = new Filter({ splitRegex: / / })
  filter.addWords('français')
  t.is(filter.clean('fucking asshole'), '******* *******')
  t.is(filter.clean('mot en français'), 'mot en *******')
})
