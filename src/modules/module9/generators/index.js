'use strict';

import { CheckUrls } from './async-generator.js';

async function main() {
  const checkUrls = new CheckUrls([
    'https://google.com',
    'https://ya.ru',
    'https://vk.com',
  ]);

  for await (const status of checkUrls) {
    console.log(status);
  }
}
main();