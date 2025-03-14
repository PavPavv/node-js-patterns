import fs from 'fs/promises';
import path from 'path';

const getSearch = async (dir, searchText) => {
  const targetFiles = [];

  try {
    const names = await fs.readdir(dir);

    for (const name of names) {
      const namePath = path.join(dir, name);
      const stats = await fs.stat(namePath);

      if (stats.isFile()) {
        const content = await fs.readFile(namePath, { encoding: 'utf8' });
        if (content.includes(searchText)) {
          targetFiles.push(namePath);
        }
      } else if (stats.isDirectory()) {
        const subDirFiles = await getSearch(namePath, searchText);
        targetFiles.push(...subDirFiles);
      }
    }
  } catch (err) {
    console.error(`Error while search files with pattern: ${err}`);
    throw err;
  }
  return targetFiles;
}

export const asyncRecursiveFind = async (dir, searchText) => {
  return getSearch(dir, searchText)
};