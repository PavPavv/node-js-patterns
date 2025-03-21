import fs from 'fs';
import path from 'path';
import net from 'net';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function main() {
  const PORT = 5000;
  const clients = [];

  const serverTCP = net.createServer((socket) => {

    clients.push(socket);
    socket.on('data', (data) => {
      clients.forEach((client) => {
        client.write(data);
      });
    });
    socket.on('close', () => {
      console.log('Closed.');
    });
    socket.on('error', (err) => {
      console.error(`Server error while getting data from client: ${err}`);
    });
  });

  serverTCP.setMaxListeners(2);
  serverTCP.on('error', (err) => {
    console.error(`Server error: ${err}`);
  });
  serverTCP.listen(PORT, () => {
    console.log(`Server started on a port ${PORT}`);
  });
}
main();