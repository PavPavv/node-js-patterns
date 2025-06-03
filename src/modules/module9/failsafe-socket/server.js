'use strict';

import fs from 'fs';
import path from 'path';
import net from 'net';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function main() {
  const PORT = 9000;

  const TCPServer = net.createServer((socket) => {
    socket.on('data', (data) => {
      console.log('Client data: ', data.toString());
    });

    socket.on('error', (err) => {
      console.error(`An error occurred while TCP connection: `, err);
    });
  });

  TCPServer.listen(PORT, () => {
    console.log(`TCP connection established on a port ${PORT}`);
  });
}
main();