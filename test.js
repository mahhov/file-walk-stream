const {walk} = require('./src/FileWalker');

let a = walk('.');

setTimeout(() => console.log(a), 1000);
