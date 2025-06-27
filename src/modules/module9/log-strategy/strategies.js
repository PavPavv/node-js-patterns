'use strict';

import fs from 'fs';

export class ConsoleStrategy {
  debug(data) {
    console.debug('debug: ', data);
  }

  info(data) {
    console.info('info: ', data);
  }

  warn(data) {
    console.warn('warn: ', data);
  }

  error(data) {
    console.error('error ', data);
  }
};

export class FileStrategy {
  prefix = 'FILE ';
  
  constructor(fileName) {
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
};