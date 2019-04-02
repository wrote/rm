import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import rm from '../../src'

export default makeTestSuite('test/result', {
  /**
   * Get results.
   * @param {string} input
   * @param {Context} context
   */
  async getResults(input, { exists }) {
    await rm(input)
    const res2 = await exists(input)
    if (res2) throw new Error('The path still exists.')
  },
  getThrowsConfig(input) {
    return {
      fn: rm,
      args: input,
    }
  },
  context: Context,
})