const {walk, walkBig} = require('./src/FileWalker');

const walkArray = dir => walk(dir).outValues;

module.exports = {walk, walkArray, walkBig};
