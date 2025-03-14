import fs from 'fs';

export const concatFiles = (dest, files, cb) => {
  console.log('dest', dest);
  fs.writeFile(dest, '', { flag: 'w' }, (err) => {
    if (err) {
      return cb(`An error while cleaning up the bundle ${err}`);
    }
  });

  for (const file of files) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return cb(`An error while reading ${err}`);
      }
      fs.writeFile(dest, data + '\n\n', { flag: 'a' }, (err) => {
        if (err) {
          return cb(`An error while writing ${err}`);
        }
      });
    });
  }
  return cb(null, 'Bundle file has been successfully generated!');
};