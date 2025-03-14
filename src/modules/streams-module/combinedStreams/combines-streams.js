import { createGzip, createGunzip } from 'zlib';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

import pumpify from 'pumpify';

const createKey = (pass) => {
  return scryptSync(pass, 'salt', 24);
};

export const createCompressAndEncrypt = (pass, iv) => {
  const key = createKey(pass);
  console.log('key: ', key);

  const combinedStream = pumpify(
    createGzip(),
    createCipheriv('aes192', key, iv)
  );
  combinedStream.iv = iv;
  return combinedStream;
};

export const createDecryptAndDecompress = (pass, iv) => {
  const key = createKey(pass);
  return pumpify(
    createDecipheriv('aes192', key, iv),
    createGunzip()
  );
};