'use strict';

import { MultiLogTemplate } from './multiLog.js';

export class ConsoleLog extends MultiLogTemplate {
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
}