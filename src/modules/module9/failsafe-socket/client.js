'use strict';

import { FailsafeSocket } from './failsafeSocket.js';

function main() {
  const tid = Date.now();
  const failsafeSocket = new FailsafeSocket({ port: 9000 });
  
  setInterval(() => {
    failsafeSocket.send(`Test + ${tid}`);
  }, 1000);
}
main();