import { unlink, rmdir, lstat } from 'fs'
import readDirStructure from '@wrote/read-dir-structure'
import makePromise from 'makepromise'
import { join } from 'path'

const removeFile = async (path) => {
  await makePromise(unlink, path)
}

/**
 * Removes files and directories.
 * @param {string} path Path to remove.
 */
const removeDir = async (path) => {
  const { content } = await readDirStructure(path)
  const files = Object.keys(/** @type {!Object} */ (content))
    .filter((k) => {
      const { type } = content[k]
      if (type == 'File' || type == 'SymbolicLink') return true
    })
  const dirs = Object.keys(/** @type {!Object} */ (content))
    .filter((k) => {
      const { type } = content[k]
      if (type == 'Directory') return true
    })
  const filesFullPaths = files.map(file => join(path, file))
  await Promise.all(
    filesFullPaths.map(removeFile)
  )
  const dirsFullPaths = dirs.map(dir => join(path, dir))
  await Promise.all(
    dirsFullPaths.map(removeDir)
  )
  await makePromise(rmdir, path)
}

/**
 * Removes a path from the filesystem.
 * @param {string} path Path to the file or directory to remove.
 */
const rm = async (path) => {
  const s = /** @type {!fs.Stats} */ (
    await makePromise(lstat, path)
  )
  if (s.isDirectory()) {
    await removeDir(path)
  } else {
    await removeFile(path)
  }
}

export default rm

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').Stats} fs.Stats
 */

/* documentary types/index.xml */
