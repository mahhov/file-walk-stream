const {walk} = require('./index');

let a = walk('.');

let print = prefix => console.log(prefix, a.length, a.complete);

print('immediate:')

let x = setInterval(() => {
  print('interval:');
}, 1);

a.complete.then(() => {
  print('resolved:');
  clearInterval(x)
});

// find . -type f | wc -l
