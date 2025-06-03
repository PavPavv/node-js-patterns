'use strict';

import { fileURLToPath } from 'url';
import path from 'path';

import { Config } from './multi-config.js';
import { iniStrategy, jsonStrategy } from './strategies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const init = async () => {
    const iniConfig = new Config(iniStrategy);
    await iniConfig.load(path.join(__dirname, './files/conf.ini'));
    iniConfig.set('book.nodejs', 'design patterns');
    await iniConfig.save(path.join(__dirname, './files/conf_mod.ini'));

    const jsonConfig = new Config(jsonStrategy);
    await jsonConfig.load(path.join(__dirname, './files/conf.json'));
    jsonConfig.set('book.nodejs', 'design patterns');
    await jsonConfig.save(path.join(__dirname, './files/conf_mod.json'));
  }
  init();
}
main();