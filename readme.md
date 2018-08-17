### useage

```js
const {walk, walkArray} = require('file-walk-stream');

let myDir = walk('./myDir');
let myDirArray = walkArray('./myDir');
```

`myDir` will be a stream, and `myDirArray` will be an array.

they will be filled asynchronously

```js
[{
  dir: '.',
  file: '.gitignore',
  fullPath: '/usr/local/.../fileWalkStream'
}, {
  dir: '.',
  file: 'index.js',
  fullPath: '/usr/local/.../fileWalkStream'
}, {
  dir: '.',
  file: 'package-lock.json',
  fullPath: '/usr/local/.../fileWalkStream'
}, {
  dir: '.',
  file: 'package.json',
  fullPath: '/usr/local/.../fileWalkStream'
}, {
  dir: '.',
  file: 'readme.md',
  fullPath: '/usr/local/.../fileWalkStream'
}, {
  dir: '.git',
  file: 'COMMIT_EDITMSG',
  fullPath: '/usr/local/.../fileWalkStream/.git'
}, {
  dir: '.git',
  file: 'HEAD',
  fullPath: '/usr/local/.../fileWalkStream/.git'
}, {
  dir: '.git',
  file: 'config',
  fullPath: '/usr/local/.../fileWalkStream/.git'
}, {
  dir: '.git',
  file: 'description',
  fullPath: '/usr/local/.../fileWalkStream/.git'
}]
```

see `bs-better-stream` for more information on the stream structure.
