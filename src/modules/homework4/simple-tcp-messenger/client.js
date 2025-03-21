import path from 'path';
import fs from 'fs';
import readline from 'readline';
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
  be converted to a string using .toString().
  
  A string that specifies the character
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

function colorPrint(color, text) {
  if (!color) console.log(text);

  if (color === 'purple') {
    console.log('\x1b[35m', text, '\x1b[0m');
  }
  if (color === 'blue') {
    console.log('\x1b[34m', text, '\x1b[0m');
  }
  if (color === 'yellow') {
    console.log('\x1b[33m', text, '\x1b[0m');
  }
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const SOCKET_PORT = 5000;
  let name = 'Anonymous';

  async function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(`\n\x1b[35m${question}\x1b[0m\n`, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  // if (!process.argv[2]) {
  //   console.error('Error: need to provide a picture name /w extension!');
  //   process.exit(1);
  // }

  (async () => {
    const input = await askQuestion('Здаров! Кем будешь?');
    if (input) {
      name = input;
    }
    colorPrint('purple', `Добро пожаловать в быстрый чат, ${name}!`);
    startClient();
  })();

  function startClient() {
    const client = net.createConnection({ port: SOCKET_PORT, host: "localhost" }, () => {
      colorPrint('purple', `Client started at port ${SOCKET_PORT}!`);
    });
  
    client.on('connect', () => {
      colorPrint('purple', 'Погнали!!!\n\n');
      // Start send metadata + data here!
      // client.write(metadata1);
      // client.write(metadata2);
      rl.on('line', (line) => {
        if (line !== '' && line !== 'exit now') {
          process.stdout.write('\x1B[1A\x1B[2K');
          client.write(line.trim().replace(/[^a-zA-Zа-яА-Я0-9!?:\)\(\)\s]/g, ''));
        } else if (line === 'exit now') {
          colorPrint('purple', 'Бывай!');
          rl.close();
          client.end();
          process.exit(0);
        }
      });
    });
    client.on('data', (data) => {
      colorPrint('yellow', data.toString() + '\n');
    });
  }
}
main();