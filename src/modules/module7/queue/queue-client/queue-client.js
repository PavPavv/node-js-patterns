'use strict';

import { request } from 'http';
import readline from 'readline';

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const requestOptions = {
    hostname: '127.0.0.1',
    port: 5400,
    path: '/',
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // Crucial for POST
  };
  
  function promptInput() {
    rl.question('>', (input) => {
      if (input.trim() === "") {
        console.log("No input provided. Exiting.");
        promptInput();
        return;
      }
  
      sendRequest(input, () => {
        promptInput();
      });
    });
  }
  
  function sendRequest(data, cb) {
    const req = request(requestOptions, (response) => {
      let responseData = '';
      response.setEncoding('utf8');
  
      response.on('data', (chunk) => {
        // console.log('chunk from the server ', chunk);
        responseData += chunk;
      });
  
      response.on('end', () => {
        console.log('Answer from the server: ', responseData);
        cb();
      });
    });
  
    req.on('error', (err) => {
      console.error('Error occurred while getting answer from the server ', err);
      cb();
    });
    
    // SEND DATA!
    req.write(data);
    req.end();
  }

  function handleExit() {
    process.on('SIGINT', () => {
      console.log('\nExiting...');
      rl.close();
      process.exit(0);
    });
  }
  
  console.log('Enter text you want to send to the server. Press Ctrl+C to exit.');
  promptInput();
  handleExit();
}
main();