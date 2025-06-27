'use strict';

import { Log } from './multi-log.js';
import { ConsoleStrategy, FileStrategy } from './strategies.js';

function main() {
  const init = async () => {
    const consoleLog = new Log(new ConsoleStrategy(), 'test data');
    consoleLog.debug();
    consoleLog.info();
    consoleLog.warn();
    consoleLog.error();

    const fileLog = new Log(new FileStrategy('logs.txt'), 'File test data');
    fileLog.debug();
    fileLog.info();
    fileLog.warn();
    fileLog.error();
  };
  init();
}
main();