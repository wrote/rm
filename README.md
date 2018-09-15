# @wrote/rm

[![npm version](https://badge.fury.io/js/%40wrote%2Frm.svg)](https://npmjs.org/package/@wrote/rm)

`@wrote/rm` is a package to remove files and directories.

```sh
yarn add -E @wrote/rm
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`rm(path: string)`](#rmpath-string-void)
- [TODO](#todo)
- [Copyright](#copyright)
## API

The package is available by importing its default function:

```js
import rm from '@wrote/rm'
```

## `rm(`<br/>&nbsp;&nbsp;`path: string,`<br/>`): void`

Removes a path to either a file or directory.

```js
/* yarn example/ */
import rm from '@wrote/rm'
import clone from '@wrote/clone'
import readDirStructure from '@wrote/read-dir-structure'

const printContent = async (p) => {
  const { content } = await readDirStructure(p)
  console.log(JSON.stringify(content, null, 2))
}

(async () => {
  // 0. SETUP: create a temp directory to remove.
  await clone('example/dir', 'example/temp')
  console.log('Content before:')
  await printContent('example/temp')

  // 1. REMOVE the directory.
  await rm('example/temp/dir')

  // 2. VALIDATE the removal.
  console.log('Content after:')
  await printContent('example/temp')
})()
```

```
Content before:
{
  "dir": {
    "content": {
      "example.txt": {
        "type": "File"
      }
    },
    "type": "Directory"
  }
}
Content after:
{}
```
## TODO

- [ ] Test and unlink symbolic links when necessary.

## Copyright

(c) [Wrote][1] 2018

[1]: https://wrote.cc