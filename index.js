const {walk} = require('./src/FileWalker');

const walkArray = dir => walk(dir).outValues;

module.exports = {walk, walkArray};
