'use strict';

import { ConsoleLog } from './consoleLog.js';
import { FileLog } from './fileLog.js';

function main() {
  const consoleLogs = new ConsoleLog();
  consoleLogs.debug('test data!');
  consoleLogs.info('test data!');
  consoleLogs.warn('test data!');
  consoleLogs.error('test data!');

  const fileLogs = new FileLog('logs.txt');
  fileLogs.debug('test data!');
  fileLogs.info('test data!');
  fileLogs.warn('test data!');
  fileLogs.error('test data!');
}
main();