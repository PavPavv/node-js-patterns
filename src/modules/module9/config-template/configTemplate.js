'use strict';

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import objectPath from 'object-path';

const __filename = fileURLToPath(import.meta.url);

export class ConfigTemplate {
  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    return objectPath.set(this.data, path, value);
  }

  async load(file) {
    console.log(`Deserializing from ${file}`);
    this.data = this._deserialize(
      await fs.promises.readFile(file, 'utf-8')
    );
  }

  async save(file) {
    console.log(`Serializing to ${file}`);
    await fs.promises.writeFile(
      file,
      this._serialize(this.data)
    );
  }

  _serialize() {
    throw new Error('_serialize() must be implemented');
  }

  _deserialize() {
    throw new Error('_deserialize() must be implemented');
  }
}