const {walk} = require('./src/FileWalker');

let a = walk('personal/fileWalkStream');

setTimeout(() => console.log(a), 1000);
