import path from 'path';
import { fileURLToPath } from 'url';

import {
  FirstModule,
  FindRegex,
  ticker,
  concatFiles,
  listNestedFiles,
  recursiveFind,
  asyncRecursiveFind,
  streamConcatFiles,
  monitorUrls,
  sleepAnalyzer
} from './modules/index.js';

function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // const first = new FirstModule();
  // first.hi();

  const findRegexInText = new FindRegex(/hello\w+/);
  const fileA = path.join(__dirname, './modules/homework1/data/text1.txt');
  const fileB = path.join(__dirname, './modules/homework1/data/text2.txt');
  const fileC = path.join(__dirname, './modules/homework1/data/text3.txt');

  // findRegexInText
  //   .addFile(fileA)
  //   .addFile(fileB)
  //   .addFile(fileC)
  //   .on('start', (files) => {
  //     console.log(`Search just started for the following files: ${files.join(', ')}!`)
  //   })
  //   .find()
  //   .on('found', (file, match) => {
  //     console.log(`Matched "${match}" in a file ${file}`);
  //   })
  //   .on('error', (err) => {
  //     console.error(`Error emitted ${err.message}`);
  //   });
  // ticker(10000, (result) => console.log(`The result is ${result}`))
  //   .on('tick', (t) => console.log(`Current tick number is: ${t}`))
  //   .on('error', (err) => console.error(`\x1b[31mAn error emitted: ${err}\x1b[0m`));
  
  const filePathA = path.join(__dirname, './modules/homework2/data/text1.txt');
  const filePathB = path.join(__dirname, './modules/homework2/data/text2.txt');
  const filePathC = path.join(__dirname, './modules/homework2/data/text3.txt');
  const filePathResult = path.join(__dirname, './modules/homework2/data/bundle.js');
  const files = [filePathA, filePathB, filePathC];
  // concatFiles(filePathResult, files, (err, data) => {
  //   if (err) {
  //     console.error(`An error occurred while the concatenation: ${err}`);
  //     return;
  //   }
  //   if (data) {
  //     console.log('Success!!! ', data);
  //   }
  // });

  const testDirPath = path.join(__dirname, './modules/homework2/testDir');
  // listNestedFiles(testDirPath, (err, data) => {
  //   if (err) {
  //     console.error(`An error occurred while the inspecting ${dir} dir: ${err}`);
  //     return;
  //   }
  //   if (data) {
  //     console.log('Success!', data);
  //   }
  // });

  // recursiveFind(testDirPath, 'block', (err, data) => {
  //   if (err) {
  //     console.error(`An error occurred while the inspecting ${testDirPath} dir: ${err}`);
  //     return;
  //   }
  //   if (data) {
  //     console.log('Operation successfully completed. The result is: ', data);
  //   }
  // });
  // recursiveFind(testDirPath, 'Jack', (err, data) => {
  //   if (err) {
  //     console.error(`An error occurred while the inspecting ${testDirPath} dir: ${err}`);
  //     return;
  //   }
  //   if (data) {
  //     console.log('Success!', data);
  //   }
  // });
  // recursiveFind(testDirPath, 'Maggy', (err, data) => {
  //   if (err) {
  //     console.error(`An error occurred while the inspecting ${testDirPath} dir: ${err}`);
  //     return;
  //   }
  //   if (data) {
  //     console.log('Success!', data);
  //   }
  // });

  // asyncRecursiveFind(testDirPath, 'Jack')
  //   .then((data) => {
  //     console.log('DATA: ', data);
  //   });
  // (async () => {
  //   const result = await asyncRecursiveFind(testDirPath, 'Jack');
  //   console.log('Result is: ', result);
  // })();

  const filePath3A = path.join(__dirname, './modules/homework3/data/text1.txt');
  const filePath3B = path.join(__dirname, './modules/homework3/data/text2.txt');
  const filePath3C = path.join(__dirname, './modules/homework3/data/text3.txt');
  const filePath3Result = path.join(__dirname, './modules/homework3/data/bundle.js');

  // streamConcatFiles(filePath3Result, [filePath3A, filePath3B, filePath3C])
  //   .then(() => {
  //     console.log('All the files concatenated successfully');
  //   })
  //   .catch((err) => {
  //     console.error('An error occurred while streamConcatFiles execution: ', err);
  //   });

  // monitorUrls(path.join(__dirname, './modules/homework3/data/urls.txt'));

  sleepAnalyzer('Software Engineer');
  // sleepAnalyzer('Engineer');
}
main();