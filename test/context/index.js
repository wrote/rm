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
  get FIXTURE_DIR() {
    return join(FIXTURE, 'dir')
  }
}