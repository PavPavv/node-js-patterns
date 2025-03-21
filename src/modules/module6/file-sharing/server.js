import fs from 'fs';
import path from 'path';
import { Server } from 'net';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function main() {
  const PORT = 5000;
  const serverTCP = new Server((socket) => {
    socket.on('data', (data) => {
      const file = data.toString();
      const filePath = path.join(__dirname, '/received/data.txt')
      console.log(file + '\n');
      fs.createWriteStream(filePath).write(data);
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