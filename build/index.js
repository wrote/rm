const { unlink, rmdir, lstat } = require('fs');
let readDirStructure = require('@wrote/read-dir-structure'); if (readDirStructure && readDirStructure.__esModule) readDirStructure = readDirStructure.default;
let makePromise = require('makepromise'); if (makePromise && makePromise.__esModule) makePromise = makePromise.default;
const { join } = require('path');

const removeFile = async (path) => {
  await makePromise(unlink, path)
}

/**
 * Removes files and directories.
 * @param {string} path Path to remove.
 */
const removeDir = async (path) => {
  const { content } = await readDirStructure(path)
  const files = Object.keys(content).filter((k) => {
    const { type } = content[k]
    if (type == 'File') return true
  })
  const dirs = Object.keys(content).filter((k) => {
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
  const s = await makePromise(lstat, path)
  if (s.isDirectory()) {
    await removeDir(path)
  } else {
    await removeFile(path)
  }
}

module.exports=rm

/* documentary types/index.xml */

//# sourceMappingURL=index.js.map