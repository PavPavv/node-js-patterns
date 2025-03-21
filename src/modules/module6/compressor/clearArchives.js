import path from 'path';
import { unlink } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function main() {
  const TARGET_PATHS = [
    path.join(__dirname, './archive.gz'),
    path.join(__dirname, './archive.br'),
    path.join(__dirname, './archive.zip')
  ];

  async function clear(path) {
    try {
      await unlink(path);
    } catch (err) {
      console.error(`Delete error: ${err}`);
    }
  }

  const targets = [];
  for (const path of TARGET_PATHS) {
    targets.push(clear(path));
  }

  Promise.all([targets])
    .then(() => {
      console.log('All the boring files has been successfully removed!');
    })
    .catch(() => {
      console.error(`Delete files error occurred: ${err}`);
    })
    .finally(() => {
      console.log('Done!');
    })
}
main();