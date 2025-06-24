'use strict';

import split from 'split';

async function main() {
  const stream = process.stdin.pipe(split());
  for await (const line of stream) {
    console.log(`You wrote: ${line}`);
  }
}
main();