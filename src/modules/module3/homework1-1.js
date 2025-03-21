import { EventEmitter } from 'events';
import { readFile } from 'fs';

export class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.emit('start', this.files);
    for (const file of this.files) {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileread', file);
        const matchArr = data.match(this.regex);
        if (matchArr) {
          matchArr.forEach((item) => {
            this.emit('found', file, item);
          });
        }
      });
    }
    return this;
  }
}