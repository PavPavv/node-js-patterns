import { createWriteStream } from 'fs';

export const createLoggingWriteable = (writable) => {
  const proxyHandler = {
    get (target, propKey, receiver) {
      if (propKey === 'write') {
        return function(...args) {
          const [chunk] = args;
          console.log('Writing', chunk);
          return writable.write(...args);
        }
      }
      return target[propKey];
    },
  };
  return new Proxy(writable, proxyHandler);
};

const writeable = createWriteStream('test.txt');
const writableProxy = createLoggingWriteable(writeable);
writableProxy.write('First chunk\n');
writableProxy.write('Second chunk\n');
writeable.write('This is not logged\n');
writableProxy.end();