import { resolve } from 'path'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import cloneDir from '../../clone'

const FIXTURE = resolve(__dirname, '../fixture')
const TEMP = resolve(__dirname, '../temp')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    await cloneDir(this.TEMP_FIXTURE, this.TEMP)
  }
  async _destroy() {
    // remove TEMP dir which this package and `temp-context` is implemented
  }
  get TEMP_DIR() {
    return resolve(TEMP, 'dir')
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
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get TEMP_FIXTURE() {
    return resolve(FIXTURE, 'dir')
  }
  get TEMP() {
    return TEMP
  }
}