const fs = require('fs');
const path = require('path');
const PromiseCreator = require('./PromiseCreator');

let readDir = dir => {
    let proimse = new PromiseCreator();
    fs.readdir(dir, (err, list) =>
        err ? proimse.reject(err) : proimse.resolve(list));
    return proimse.promise;
};

let isDir = (dir, file) => {
    let proimse = new PromiseCreator();
    let filePath = getPath(dir, file);
    fs.lstat(filePath, (err, stat) =>
        err ? proimse.reject(err) : proimse.resolve(stat && stat.isDirectory()));
    return proimse.promise;
};

let getPath = (dir, file) =>
    path.join(dir, file);

let getRoot = root =>
    path.resolve(path.dirname(process.argv[1]), root);

let getFullPath = dir => path.resolve(dir);

module.exports = {readDir, isDir, getPath, getRoot, getFullPath};
