import { join } from 'path'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import clone from '@wrote/clone'
import TempContext from 'temp-context'

const FIXTURE = 'test/fixture'

/**
 * A testing context for the package.
 */
export default class Context extends TempContext {
  async _init() {
    await super._init()
    await clone(this.FIXTURE_DIR, this.TEMP)
  }
  /**
   * Check if the path exists on the filesystem.
   * @param {string} path Path to check.
   */
  async exists(path) {
    try {
      await makePromise(lstat, path)
      return true
    } catch (err) {
      return false
    }
  }
  get FIXTURE_DIR() {
    return join(FIXTURE, 'dir')
  }
}