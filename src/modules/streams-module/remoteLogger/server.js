import { createWriteStream } from 'fs';
import net from 'net';

export const demultiplexChannel = (sourceStream, destChannels) => {
  let currentChannel = null;
  let currentLength = null;

  sourceStream
    .on('readable', () => {
      let chunk;
      if (!currentChannel) {
        chunk = sourceStream.read(1);
        currentChannel = chunk && chunk.readUInt8(0);
      }
      if (currentLength === null) {
        chunk = sourceStream.read(4);
        currentLength = chunk && chunk.readUInt32BE(0);
        if (currentLength === null) {
          return null;
        }
      }

      chunk = sourceStream.read(currentLength);
      if (chunk == null) {
        return null;
      }

      console.log(`Received packet from: ${currentChannel}`);
      destChannels[currentChannel].write(chunk);
      currentChannel = null;
      currentLength = null;
    })
    .on('end', () => {
      destChannels.forEach((channel) => channel.end());
      console.log('Source channel closed');
    });
};

const server = net.createServer((socket) => {
  const stdoutStream = createWriteStream('stdout.log');
  const stderrStream = createWriteStream('stderr.log');
  demultiplexChannel(socket, [stdoutStream, stderrStream]);
});
server.listen(3000, () => console.log(`Server started on a port ${3000}`));
