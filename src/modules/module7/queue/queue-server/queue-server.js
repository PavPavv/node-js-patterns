import { createServer } from 'http';

import { Queue } from '../tamper-free-queue.js';

function main() {
  const PORT = 5400;
  const textType = { 'content-type': 'text/plain' };
  
  const queue = new Queue(({ enqueue }) => {
    const serve = (request, response) => {
      const route = request.url;
      const method = request.method;
  
      if (route === '/') {
        if (method === 'POST') {
          let receivedData = '';
          request.on('data', (chunk) => {
            console.log('Chunk of data on the server from client: ',convertBinaryStr(chunk));
            receivedData += convertBinaryStr(chunk);
          });
          request.on('end', () => {
            try {
              enqueue(receivedData);
              response.statusCode(200);
              response.end('SUCCESS!!!:-)');
            } catch {
              response.writeHead(400, textType);
              response.end('Server could not complete request!:(');
            }
          });
        }
      } else if (route === '/admin') {
        // 
      } else {
        response.writeHead(404, textType);
        response.end('Not found.');
      }
    }
  
    const server = createServer(serve);
  
    server.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);

      while (true) {
        const msg = await queue.dequeue();
        console.log(`Dequeued message "${msg}"`);
      }
    });
  });

  function convertBinaryStr(data) {
    const decoder = new TextDecoder('utf-8');
    const str = decoder.decode(data);
    return str;
  }
}
main();