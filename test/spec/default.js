import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import rm from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rm, 'function')
  },
  async 'calls package without error'() {
    await rm()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await rm({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T