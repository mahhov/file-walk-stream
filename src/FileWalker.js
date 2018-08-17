const $tream = require('bs-better-stream');
const fileRepo = require('./FileRepo');

let walk = dir => {
    let dirs = $tream();

    dirs.write(dir);

    let readsIfDir = dirs
        .wrap('dir')
        .set('files', ({dir}) => fileRepo.readDir(dir))
        .waitOn('files')
        .flattenOn('files', 'file')
        .set('isDir', ({dir, file}) => fileRepo.isDir(dir, file))
        .waitOn('isDir')
        .if(({isDir}) => isDir);

    readsIfDir.then
        .map(({dir, file}) => fileRepo.getPath(dir, file))
        .to(dirs);

    return readsIfDir.else
        .map(({dir, file}) => {dir, file}); // todo replace with .pluck('dir', 'file'), when bs-better-stream supports multi-argument pluck
};

module.exports = {walk};
