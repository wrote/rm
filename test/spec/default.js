import { equal } from 'zoroaster/assert'
import Context from '../context'
import rm from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rm, 'function')
  },
}

export default T