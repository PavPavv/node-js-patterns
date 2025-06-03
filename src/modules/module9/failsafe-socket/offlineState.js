'use strict';

import net from 'net';

export class OfflineState {
  SOCKET_PORT = 9000;
  client = null;

  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
  }

  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 1000);
    };

    console.log('Trying to connect...');
    
    this.client = new net.Socket();

    this.failsafeSocket.socket =
      this.client.connect(
        this.failsafeSocket.options,
        () => {
          console.log('Connection established!');
          this.failsafeSocket.socket.removeListener('error', retry);
          this.failsafeSocket.changeState('online');
        }
      );
    
    this.failsafeSocket.socket.once('error', retry);
  }
}