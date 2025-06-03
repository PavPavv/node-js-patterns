'use strict';

function main() {
  const ESCAPE_CODE = '\x1b[';
  const VALUE_PLACEHOLDER = '%s';
  const RESET_CODE = '\x1b[0m';
  const RED = '31m';
  const GREEN = '32m';
  const YELLOW = '33m';

  function textColor(color) {
    return ESCAPE_CODE + color + VALUE_PLACEHOLDER + RESET_CODE;
  }

  const consoleHandler = {
    get: (target, property) => {
      if (property === 'log') {
        return function(val) {
          return target.log(`${new Date().toISOString()} ${val}`);
        }
      }
      if (property === 'error') {
        return function(val) {
          return target.error(`${new Date().toISOString()} ${val}`);
        }
      }
      if (property === 'debug') {
        return function(val) {
          return target.debug(`${new Date().toISOString()} ${val}`);
        }
      }
      if (property === 'info') {
        return function(val) {
          return target.info(`${new Date().toISOString()} ${val}`);
        }
      }

      if (property === 'red') {
        return function(val) {
          return target.info(textColor(RED), val);
        }
      }
      if (property === 'yellow') {
        return function(val) {
          return target.info(textColor(YELLOW), val);
        }
      }
      if (property === 'green') {
        return function(val) {
          return target.info(textColor(GREEN), val);
        }
      }
      return target[property];
    },
  };
  const consoleProxy = new Proxy(console, consoleHandler);
  consoleProxy.log('Hello!');
  consoleProxy.error('What?!');
  consoleProxy.red('Error!');
  consoleProxy.green('Success!');
  consoleProxy.yellow('Loading...');
}
main();