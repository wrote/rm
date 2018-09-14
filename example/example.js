/* yarn example/ */
import rm from '../src'
import clone from '../clone'
import readDirStructure from '@wrote/read-dir-structure'

const printContent = async (p) => {
  const { content } = await readDirStructure(p)
  console.log(JSON.stringify(content, null, 2))
}

(async () => {
  // 0. SETUP: create a temp directory to remove
  await clone('example/dir', 'example/temp')
  console.log('Content before:')
  await printContent('example/temp')

  // 1. REMOVE the directory
  await rm('example/temp/dir')

  // 2. VALIDATE the removal
  console.log('Content after:')
  await printContent('example/temp')
})()