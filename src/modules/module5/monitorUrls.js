import { pipeline, Transform } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import split from 'split';
import superagent from 'superagent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ParallelStream extends Transform {
  constructor(userTransform, options) {
    super({
      objectMode: true,
      ...options
    });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCb = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    );
    done();
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    if (this.running === 0) {
      this.terminateCb && this.terminateCb();
    }
  }
}

const userTransformFn = async (url, enc, pushCb, doneCb) => {
  if (!url) {
    return doneCb();
  }
  try {
    await superagent.head(url, { timeout: 5000 });
    pushCb(`${url} is up\n`);
  } catch(err) {
    pushCb(`${url} is down\n`)
  }
  doneCb();
};

const handleError = (err) => {
  if (err) {
    console.error('An error occurred while monitor: ', err);
    process.exit(1);
  }
  console.log('All the urls have been checked!');
};

export const monitorUrls = (urlsFile) => {
  pipeline(
    createReadStream(urlsFile),
    split(),
    new ParallelStream(userTransformFn),
    createWriteStream(path.join(__dirname, './data/result.txt')),
    handleError
  );
};