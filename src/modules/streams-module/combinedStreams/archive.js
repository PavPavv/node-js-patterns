import { createReadStream, createWriteStream } from 'fs';
import stream from 'stream';
import crypto from 'crypto';

import { createCompressAndEncrypt } from './combines-streams.js';

function main() {
  const [,, pass, source] = process.argv;
  const iv = crypto.randomBytes(16);
  const dest = `${source}.gz.enc`;

  console.log('IV: ', iv);

  stream.pipeline(
    createReadStream(source),
    createCompressAndEncrypt(pass, iv),
    createWriteStream(dest),
    (err) => {
      if (err) {
        console.error(`An error occurred while ${err}`);
        process.exit(1);
      }
      console.log(`${dest} created with iv: ${iv.toString('hex')}`);
    }
  );
}
main();