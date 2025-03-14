import fs from 'fs';
import zlib from 'zlib';

/*
Gzip Compression

Gzip compression is commonly used in Node.js applications to reduce the size
of data transmitted over the network, which can lead to faster load times and
reduced bandwidth usage. Here are some of the key scenarios and advantages of
using Gzip compression in Node.js:

- Web Server Response Compression:
  Serving Static Assets: You can compress responses for static files like HTML,
  CSS, JavaScript, and images sent from a Node.js server. This is particularly
  useful when delivering content over HTTP, as smaller file sizes result in
  quicker downloads and reduced latency for users.
  Dynamic Content: Gzip can also be applied to dynamic responses (e.g., JSON
  responses from APIs), which can significantly reduce payload sizes.
- API Responses:
  RESTful APIs often send and receive JSON data. Compressing these responses
  can lower the amount of data transferred over the network, improving
  performance and user experience.
- Compression Middleware:
  Using middleware like compression in Express.js to automatically compress
  all outgoing responses. This way, you ensure that all assets served by your
  application benefit from Gzip compression without having to manually set it
  up for each route.
- Performance Optimization:
  Lower bandwidth usage translates to improved loading times, which can enhance
  the user experience, especially in environments with limited bandwidth.
- Resource Sharing:
  For applications that serve many clients or manage multiple resources,
  Gzip can help in compressing responses in a more efficient manner, resulting in
  reduced server load and lower data transfer costs.

Brotli Compression

Brotli is commonly used for compressing web assets like HTML, CSS, and JavaScript,
but it's also suitable for general file compression. The following extensions
are often used for Brotli-compressed files:
- .br: This is the most common extension for Brotli-compressed files.
  For example, file.txt.br indicates that file.txt has been compressed
  using Brotli.

Deflate Compression

Deflate is a compression algorithm that is often used in the context of ZIP files
but can also be applied to individual files. Common file extensions for files
compressed with Deflate include:

- .zz: This extension is sometimes used for files compressed with the Deflate algorithm, though it's less common.
- .deflate: Explicitly indicates that the file has been compressed using
  the Deflate algorithm; however, it's not as widely used as other formats.
- .zip: While this is not exclusive to Deflate (as ZIP files may also contain
  files compressed with different algorithms), it's commonly associated with
  Deflate compression since many ZIP files use it.
- .gz: This extension is specifically for files compressed with Gzip, which
  utilizes the Deflate algorithm. For example, file.txt.gz indicates that
  file.txt has been compressed with Gzip (which relies on Deflate).

*/

function isOptName(name) {
  if (name === 'brotli' || name === 'deflate' || name === 'gzip') {
    return true;
  }
  return false;
}

function main() {
  const OPT_TYPE_STR = '--type';
  const start = Date.now();
  const filePath = process.argv[2];
  const flag = process.argv[3];
  const optName = process.argv[4];
  const ALGORITHMS = [
    {
      name: 'gzip',
      method: zlib.createGzip(),
      outputName: 'archive.gz'
    },
    {
      name: 'brotli',
      method: zlib.createBrotliCompress(),
      outputName: 'archive.br'
    },
    {
      name: 'deflate',
      method: zlib.createDeflate(),
      outputName: 'archive.zip'
    }
  ];
  let algorithmName = ALGORITHMS[0].name;

  if (!filePath) {
    console.error('Error: no file provided');
    process.exit(1);
  }
  if (!flag || flag && flag !== OPT_TYPE_STR) {
    console.log('Compression algorithm type to default');
  }
  if (flag && flag === OPT_TYPE_STR && !isOptName(optName)) {
    console.log('Compression algorithm type to default');
  }
  if (flag && flag === OPT_TYPE_STR && isOptName(optName)) {
    if (optName !== 'gzip') {
      algorithmName = optName;
    }
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.error(`An error occurred while checking file size`);
      process.exit(1);
    }

    console.log(`Input file size: ${stat.size}`);
    console.log(`Chosen algorithm: ${algorithmName}`);

    const chosenAlgorithm = ALGORITHMS.find((a) => a.name === algorithmName);
    const inputStream = fs.createReadStream(filePath);
    // Compression begins
    inputStream
      .pipe(chosenAlgorithm.method)
      .pipe(fs.createWriteStream(chosenAlgorithm.outputName))
      .on('error', () => {
        console.error('An error occurred while compression or writing file');
      })
      .on('finish', () => {
        console.log(`File successfully compressed with ${algorithmName} compression algorithm!`);
      })
  
    const end = Date.now();
    console.log(`Compression done in >>> ${end - start} ms.`)
  });
}
main();