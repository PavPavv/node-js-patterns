'use strict';

import { Buffer } from 'node:buffer';

function main() {
  const createLazyBuffer = (size) => {
    const PLACEHOLDER = {};
    let actualBuffer = null;
    let initialized = false;
    
    return new Proxy(PLACEHOLDER, {
      get: (target, prop) => {
        if (prop === 'write' && !initialized) {
          actualBuffer = Buffer.alloc(size);
          initialized = true;
        }
        if (!initialized) {
          return () => {
            throw new Error(`${prop} method cannot be called. Buffer not initialized yet! Call write method first!`);
          };
        }

        return (...args) => actualBuffer[prop](...args);
      },
    });
  }

  const lazyBuffer = createLazyBuffer(256);
  
  // lazyBuffer.alloc(29);
  // lazyBuffer.read(29);
  // lazyBuffer.of(29);

  lazyBuffer.write("test");
  console.log(lazyBuffer.toString());
}
main();