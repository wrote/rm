import ensurePath from '@wrote/ensure-path'
import readDirStructure from '@wrote/read-dir-structure'
import { createReadStream, createWriteStream } from 'fs'
import { join, basename } from 'path'

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

export default cloneDir