const {walk} = require('../index');

let myDir = walk('x');

myDir.each(file => console.log(`file, ${file.file}`))
myDir.complete.then(() => console.log(`total # ${myDir.length}`));
myDir.complete.catch(() => console.log(`err`));

setTimeout(() => {console.log('nothing')}, 1000);
