import fs from 'fs';

export const listNestedFiles = (dir, cb) => {
  fs.readdir(dir, { recursive: true }, (err, data) => {
    if (err) return cb(err);
    if (data) {
      cb(null, data);
      return;
    }
  });
};