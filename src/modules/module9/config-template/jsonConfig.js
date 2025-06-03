'use strict';

import { ConfigTemplate } from './configTemplate.js';

export class JsonConfig extends ConfigTemplate {
  _serialize(data) {
    return JSON.stringify(data, null, '  ');
  }
  
  _deserialize(data) {
    return JSON.parse(data);
  }
}