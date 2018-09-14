import { resolve } from 'path'
import ensurePath from '@wrote/ensure-path'
import readDirStructure from '@wrote/read-dir-structure'
import { createReadStream, createWriteStream, lstat } from 'fs'
import { join, basename } from 'path'
import makePromise from 'makepromise'

const FIXTURE = resolve(__dirname, '../fixture')
const TEMP = resolve(__dirname, '../temp')

/**
 * Clone a file.
 * @param {string} from Path to the file which to clone.
 * @param {string} to Path to the file where to clone.
 */
const cloneFile = async (from, to) => {
  const rs = createReadStream(from)
  const ws = createWriteStream(to)
  rs.pipe(ws)
  await Promise.all([
    new Promise((r, j) => {
      rs.on('close', r).on('error', j)
    }),
    new Promise((r, j) => {
      ws.on('close', r).on('error', j)
    }),
  ])
}

/**
 * Clones a directory.
 * @param {string} from Path from directory.
 * @param {string} to Path to directory.
 */
const cloneDir = async (from, to) => {
  const b = basename(from)
  const t = join(to, b)
  await ensurePath(join(t, 'path'))
  const { content } = await readDirStructure(from)
  const files = Object.keys(content).filter((k) => {
    const { type } = content[k]
    if (type == 'File') return true
  })
  const dirs = Object.keys(content).filter((k) => {
    const { type } = content[k]
    if (type == 'Directory') return true
  })
  await Promise.all([
    ...files.map(async (f) => {
      const p = join(from, f)
      const pt = join(t, f)
      await cloneFile(p, pt)
    }),
    ...dirs.map(async (d) => {
      const p = join(from, d)
      await cloneDir(p, t)
    }),
  ])
}

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