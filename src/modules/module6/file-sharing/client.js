import path from 'path';
import fs from 'fs';
import { fork } from 'child_process';
import net from 'net';
import { fileURLToPath } from 'url';

/*
  In Node.js, both net.createConnection and net.connect are used to create a
  TCP connection to a server, but they are essentially the same and offer the same
  functionality with slight differences in usage. The presence of both functions
  is primarily for backward compatibility and code readability. Some developers
  prefer net.createConnection as it might be more descriptive, while others might
  opt for net.connect as it is shorter.
  The write() method is used to send data from this socket to the remote server.
  This can be a string, Buffer, or an ArrayBuffer. If you send an object, it will
  be converted to a string using .toString(). A string that specifies the character
  encoding of the data, such as 'utf8', 'ascii', etc. The default encoding is 'utf8'.
*/

/*
  MOTP (My Own Transfer Protocol) over TCP protocol packet semantics:
  - Name (?? bytes)
  - Data length (?? bytes)
  - Data (the rest bytes)
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const SOCKET_PORT = 5000;
  let name = 'Anonymous';
  if (!process.argv[2]) {
    console.error('Error: need to provide a picture name /w extension!');
    process.exit(1);
  }
  const filePath = path.join(__dirname, `/${process.argv[2]}`);
  console.log(filePath);

  const client = new net.Socket();

  client.connect({ port: SOCKET_PORT, host: "localhost" }, () => {
    console.log(`Client started at port ${SOCKET_PORT}!`);
  });
  client.on('connect', () => {
    console.log('Successfully connected!!!');
    // Start send metadata + data here!
    // client.write(metadata1);
    // client.write(metadata2);
    fs.createReadStream(filePath)
      .on('data', (chunk) => {
        client.write(chunk);
      })
      .on('error', (err) => {
        console.error(`Error while reading data: ${err}`);
        process.exit(1);
      })
      .on('end', () => {
        console.log(`File ${process.argv[2]} been sent!`);
        process.exit(0);
      });
  });
  client.on('data', () => {
    console.log('Data has been successfully received!');
  });
}
main();