'use strict';

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import htm from 'htm';
import { createElement } from 'react';
// import { StaticRouter } from 'react-router-dom/server';
// import reactServer from 'react-dom/server.js';
// import { App } from '../client/src/app';

function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const html = htm.bind(createElement);
  const PORT = 4800;
  const ADDRESS = '127.0.0.1';
  const staticDir = path.join(__dirname, '../client/build');
  
  const template = ({ content }) => {
    return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>ssr-test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="root">${content}</div>
          <script type="text/javascript" src="/build/build.js"></script>
        </body>
      </html>
    `;
  };

  const hoku1 = http.createServer((req, res) => {
    console.log('Request URL: ', req.url);
    // Map the request URL to a file in the static directory
    let filePath = path.join(staticDir, req.url);

    // Handle root URL separately to serve index.html
    if (req.url === '/' || req.url === '') {
      filePath = path.join(staticDir, 'index.html');
    }

    // fs.stat(filePath, (err, stats) => {
    //   if (err || !stats.isFile()) {
    //     // If file doesn't exist, respond with 404
    //     res.statusCode = 404;
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('Not Found');
    //     return;
    //   }

    //   // Set correct Content-Type based on file extension
    //   const ext = path.extname(filePath).toLowerCase();
    //   const mimeTypes = {
    //     '.html': 'text/html',
    //     '.js': 'application/javascript',
    //     '.css': 'text/css',
    //     '.json': 'application/json',
    //     '.png': 'image/png',
    //     '.jpg': 'image/jpeg',
    //     '.jpeg': 'image/jpeg',
    //     '.gif': 'image/gif',
    //     '.svg': 'image/svg+xml',
    //     // add more mime types if needed
    //   };
    //   const contentType = mimeTypes[ext] || 'application/octet-stream';

    //   // Read and serve the file
    //   fs.readFile(filePath, (err, data) => {
    //     if (err) {
    //       res.statusCode = 500;
    //       res.setHeader('Content-Type', 'text/plain');
    //       res.end('Internal Server Error');
    //       return;
    //     }
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', contentType);
    //     res.end(data);
    //   });
    // });

    // handle any GET request
    if (req.method === 'GET') {
      console.log('GET request, ', req.method);
      
      // const serverApp = html`
      //   <${StaticRouter} location=${req.url}>
      //     <${App}/>
      //   </>
      // `;
      // const preparedContent = reactServer.renderToString(serverApp);
      // const responseHtml = template({ content: preparedContent });
      // // send response with prepared html
      // res.writeHead(200, {
      //   'Content-Type': 'text/html',
      //   'x-custom-header': 'hello from Hoku-1',
      // });
      // res.end(responseHtml);

    } else {
      res.statusCode = 500;
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(defaultHtml);
    }
  });

  hoku1.on('error', (err) => {
    res.statusCode = 500;
    console.error('\x1b[31m', `Server error: ${err}`, '\x1b[0m');
  });

  hoku1.listen(PORT, ADDRESS, () => {
    console.log('\x1b[45m', '\x1b[33m', 'HOKU-3 welcomes you!', '\x1b[0m')
    console.log('\x1b[33m', `HOKU-3 server now is running on: ${ADDRESS}:${PORT}`, '\x1b[0m');
  });
}
main();