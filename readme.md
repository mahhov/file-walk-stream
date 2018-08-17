### useage

```js
const {walk, walkArray} = require('file-walk-stream');

let myDir = walk('./myDir');
let myDirArray = walkArray('./myDir');
```

`myDir` will be a stream, and `myDirArray` will be an array.

they will be filled asynchronously

```js
[ { dir: '.', file: '.gitignore' },
  { dir: '.', file: 'index.js' },
  { dir: '.', file: 'package-lock.json' },
  { dir: '.', file: 'package.json' },
  { dir: '.', file: 'readme.md' },
  { dir: 'somePath/.git', file: 'config' },
  { dir: 'somePath/.git', file: 'HEAD' },
  ...
]
```

see `bs-better-stream` for more information on the stream structure.
