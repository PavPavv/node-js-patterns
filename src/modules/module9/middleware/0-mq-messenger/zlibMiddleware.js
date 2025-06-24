'use strict';

import { inflateRaw, deflateRaw } from 'zlib';
import { promisify } from 'util';

const inflateRawAsync = promisify(inflateRaw);
const deflateRawAsync = promisify(deflateRaw);

export const zlibMiddleware = () => {
  return {
    inbound(message) {
      return inflateRawAsync(Buffer.from(message));
    },
    outbound(message) {
      return deflateRawAsync(message);
    },
  };
};
