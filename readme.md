### useage

```js
const {walk, walkArray walkBig} = require('file-walk-stream');

let myDir = walk('./myDir');
let myDirArray = walkArray('./myDir');
walkBig('./myDir', callback);
```

`myDir` will be a stream, and `myDirArray` will be an array. `walkBig(...)` does not return anything, but will instead invoke the callback with each file found. `walkBig` is recommended when traversing big file systems.

outputs will be filled asynchronously and look as follows

```js
[{
  localDir: '.',
  dir: 'personal/fileWalkStream',
  file: '.gitignore',
  isDir: false,
  fullPath: '/usr/local/.../personal/fileWalkStream'
},
  {
    localDir: '.',
    dir: 'personal/fileWalkStream',
    file: 'index.js',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream'
  },
  {
    localDir: '.',
    dir: 'personal/fileWalkStream',
    file: 'package-lock.json',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream'
  },
  {
    localDir: '.',
    dir: 'personal/fileWalkStream',
    file: 'package.json',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream'
  },
  {
    localDir: '.',
    dir: 'personal/fileWalkStream',
    file: 'readme.md',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream'
  },
  {
    localDir: '.',
    dir: 'personal/fileWalkStream',
    file: 'test.js',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream'
  },
  {
    localDir: '.git',
    dir: 'personal/fileWalkStream/.git',
    file: 'COMMIT_EDITMSG',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream/.git'
  },
  {
    localDir: '.git',
    dir: 'personal/fileWalkStream/.git',
    file: 'HEAD',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream/.git'
  },
  {
    localDir: '.git',
    dir: 'personal/fileWalkStream/.git',
    file: 'config',
    isDir: false,
    fullPath: '/usr/local/.../personal/fileWalkStream/.git'
  }]
```

### about paths

`localDir` is relative to search path provided.

`dir` is relative to path of invocation.

`fullPath` is absolute system path.

If a script invokes `walk('mySearchPath');`, and the script is located in `myScriptPath`, then `localDir` will be relative to `mySearchPath`, and `dir` will be relative to `myScriptPath`.

### walk v walkArray

see `bs-better-stream` for more information on the stream structure.
