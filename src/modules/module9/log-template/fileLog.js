'use strict';
import fs from 'fs';

import { MultiLogTemplate } from './multiLog.js';

export class FileLog extends MultiLogTemplate {
  prefix = 'FILE ';
  
  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.writeStream = fs.createWriteStream(this.fileName);

    this.writeStream.on('finish', () => {
      console.log('Large file written using streams!');
      this.writeStream.end();
    });

    this.writeStream.on('error', (err) => {
      console.error('Error writing large file:', err);
    });
  }

  debug(data) {
    this.writeStream.write(this.prefix + 'debug: ' + data + '\n');
  }

  info(data) {
    this.writeStream.write(this.prefix + 'info: ' + data + '\n');
  }

  warn(data) {
    this.writeStream.write(this.prefix + 'warn: ' + data + '\n');
  }

  error(data) {
    this.writeStream.write(this.prefix + 'error: ' + data + '\n');
  }
}