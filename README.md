# @wrote/rm

[![npm version](https://badge.fury.io/js/@wrote/rm.svg)](https://npmjs.org/package/@wrote/rm)

`@wrote/rm` is A package to remove files and directories.

```sh
yarn add -E @wrote/rm
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`rm(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
- [TODO](#todo)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import rm from '@wrote/rm'
```

### `rm(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example/ */
import rm from '@wrote/rm'

(async () => {
  await rm()
})()
```

## TODO

- [ ] Add a new item to the todo list.

## Copyright

(c) [Wrote][1] 2018

[1]: https://wrote.cc
