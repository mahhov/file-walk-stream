const $tream = require('bs-better-stream');
const fileRepo = require('./FileRepo');

let walk = root => {
    let dirs = $tream();

    dirs.write('.');

    let readsIfDir = dirs
        .wrap('localDir')
        .set('dir', ({localDir}) => fileRepo.getPath(root, localDir))
        .set('files', ({dir}) => fileRepo.readDir(dir))
        .waitOn('files')
        .flattenOn('files', 'file')
        .set('isDir', ({dir, file}) => fileRepo.isDir(dir, file))
        .waitOn('isDir')
        .if(({isDir}) => isDir);

    readsIfDir.then
        .map(({localDir, file}) => fileRepo.getPath(localDir, file))
        .to(dirs);

    return readsIfDir.else
        .set('fullPath', ({dir}) => fileRepo.getFullPath(dir));
};

module.exports = {walk};
