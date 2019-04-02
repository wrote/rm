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

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://wrote.cc">Wrote</a> 2019</th>
    <th>
      <a href="https://wrote.cc">
        <img src="https://avatars3.githubusercontent.com/u/40831417?s=100" width="100" alt="Wrote" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>