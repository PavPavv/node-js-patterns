import { createReadStream, createWriteStream } from 'fs';
import { Readable, Transform } from 'stream';

export const streamConcatFiles = (dest, files) => {
  return new Promise((res, rej) => {
    const destStream = createWriteStream(dest);

    Readable.from(files)
      .pipe(new Transform({
        objectMode: true,
        transform(filename, enc, done) {
          const src = createReadStream(filename);
          src.pipe(destStream, { end: false });
          src.on('error', done);
          src.on('end', done);
        }
      }))
      .on('error', rej)
      .on('finish', () => {
        destStream.end();
        res();
      });
  });
};