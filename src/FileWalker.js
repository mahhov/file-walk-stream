const $tream = require('bs-better-stream');
const PromiseCreator = require('./PromiseCreator');
const fileRepo = require('./FileRepo');

let walk = root => {
    let pendingPromise = new PromiseCreator();
    let pending = 1;
    let changePending = delta => {
      pending += delta;
      if (!pending)
        pendingPromise.resolve();
    };

    root = fileRepo.getRoot(root);

    let dirs = $tream();

    dirs.write('.');

    let readsIfDir = dirs
        .wrap('localDir')
        .set('dir', ({localDir}) => fileRepo.getPath(root, localDir))
        .set('files', ({dir}) => fileRepo.readDir(dir).catch(() => []))
        .waitOn('files')
        .each(({files}) => changePending(files.length - 1))
        .flattenOn('files', 'file')
        .set('isDir', ({dir, file}) => fileRepo.isDir(dir, file))
        .waitOn('isDir')
        .if(({isDir}) => isDir);

    readsIfDir.then
        .map(({localDir, file}) => fileRepo.getPath(localDir, file))
        .to(dirs);

    readsIfDir.else
        .set('fullPath', ({dir}) => fileRepo.getFullPath(dir))
        .each(() => changePending(-1));

    readsIfDir.else.complete = pendingPromise.promise.then(() => readsIfDir.else);

    return readsIfDir.else;
};

let walkBig = (root, callback) => {
  root = fileRepo.getRoot(root);

  let helper = localDir => {
    let dir = fileRepo.getPath(root, localDir);
    fileRepo.readDir(dir).then(files => {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        fileRepo.isDir(dir, file).then(isDir => {
          if (isDir)
            helper(fileRepo.getPath(localDir, file));
          else {
            let fullPath = fileRepo.getFullPath(dir);
            callback({localDir, dir, file, isDir, fullPath});
          }
        }).catch(err => console.log('isDir err', err));
      }
    }).catch(err => console.log('readDir err', err));
  };

  helper('.');
};

module.exports = {walk, walkBig};
