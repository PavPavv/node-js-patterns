import { fork } from 'child_process';
import net from 'net';

export const multiplexChannels = (sourceStreams, destChannel) => {
  let openChannels = sourceStreams.length;

  for (let i = 0; i < sourceStreams.length; i++) {
    sourceStreams[i]
      .on('readable', function() {
          let chunk;
          while ((chunk = this.read()) !== null) {
            const outBuff = Buffer.alloc(1 + 4 + chunk.length);
            outBuff.writeUInt8(i, 0);
            outBuff.writeUInt32BE(chunk.length, 1);
            chunk.copy(outBuff, 5);
            console.log(`Sending packet to channel: ${i}`);
            destChannel.write(outBuff);
          }
      })
      .on('end', () => {
        if (--openChannels === 0) {
          destChannel.end();
        }
      });
  }
};

const socket = net.connect(3000, () => {
  const child = fork(
    process.argv[2],
    process.argv.slice(3),
    { silent: true }
  );

  multiplexChannels([child.stdout, child.stderr], socket);
});
