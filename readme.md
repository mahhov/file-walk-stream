## about

recursively search a directory for files

## usage

### `walk` - returns async stream with a completion promise (recommended)

```js
const {walk, walkArray, walkBig} = require('file-walk-stream');

let myDir = walk('./myDir');
myDir.each(file => console.log(`uve got a file, ${file.file}`))
myDir.complete.then(() => console.log(`total # ${myDir.length}`));
```

### `walkArray` - returns async array

```js
const {walk, walkArray, walkBig} = require('file-walk-stream');

let myDirArray = walkArray('./myDir');
setTimeout(() => {
  myDirArray.forEach(file => console.log(`uve got a file, ${file.file}`));
  console.log(`total # ${myDirArray.length}`);
}, 1000);
```

### `walkBig` - invokes callback (recommended for traversing large directory structures)

```js
const {walk, walkArray, walkBig} = require('file-walk-stream');

let  i = 0;
walkBig('./myDir', file => {
    i++;
    console.log(`uve got a file, ${file.file}`);
  });
setTimeout(() => console.log(`total # ${i}`), 1000);
```

## output

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

## async completion

the stream returned by `walk` will have a promise field `complete` that will resolve when the search directory has been completely searched.

```js
const {walk} = require('./src/FileWalker');

let myFiles = walk('mySearchPath');

myFiles.complete.then(() => {
  console.log(`found ${myFiles.length} files`);
});
```

For convenience, the promise resolves with itself. I.e., the above is equivalent to:

```js
const {walk} = require('./src/FileWalker');

walk('mySearchPath').complete.complete.then((myFiles) => {
  console.log(`found ${myFiles.length} files`);
});
```

## about paths

`localDir` is relative to search path provided.

`fullPath` is absolute system path.

`dir` is usually (always?) the same as `fullPath`, and is not meant for external use.

If a script invokes `walk('mySearchPath');`, and the script is located in `myScriptPath`, then `localDir` will be relative to `mySearchPath`.

## streams

streams allow elegant handling of asynchronous segmented data

see `bs-better-stream` for more information on the stream structure
