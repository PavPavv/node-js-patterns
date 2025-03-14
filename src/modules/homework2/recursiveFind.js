import fs from 'fs';
import path from 'path';

const getSearch = (dir, searchText, cb) => {
  const targetFiles = [];

  fs.readdir(dir, undefined, (err, names) => {
    if (err) return cb(`Error while reading dir: ${err}`);

    let pending = names.length;
    if (!pending) return cb(null, targetFiles);

    if (names) {
      for (const name of names) {
        const namePath = path.join(dir, name);

        fs.stat(namePath, (err, stats) => {
          if (err) {
            if (--pending === 0) cb(null, targetFiles);
            return cb('Error retrieving stats:', err);
          }
          if (stats.isFile()) {
            fs.readFile(namePath, { encoding: 'utf8' }, (err, content) => {
              if (err) {
                if (--pending === 0) cb(null, targetFiles);
                return cb(`Error while reading file: ${err}`);
              } else if (content && content.includes(searchText)) {
                targetFiles.push(namePath);
              }
              if (--pending === 0) cb(null, targetFiles);
            });
          } else if (stats.isDirectory()) {
            getSearch(namePath, searchText, (err, res) => {
              if (err) {
                if (--pending === 0) cb(null, targetFiles);
                return cb(`Error in recursive search for ${namePath}: ${err}`);
              } else {
                targetFiles.push(...res);
              }
              if (--pending === 0) cb(null, targetFiles);
            });
          } else {
            if (--pending === 0) cb(null, targetFiles);
          }
        });
      }
    }
  });
};

export const recursiveFind = (dir, searchText, cb) => {
  getSearch(dir, searchText, cb);
};