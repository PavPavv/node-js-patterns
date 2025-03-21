import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Transform, Writable, pipeline } from 'stream';
import { parse } from 'csv-parse';

/*
  Answers try to ask exploring dataset with NodeJS:
    - average sleep duration of Software Engineers
    - average quality of sleep of Software Engineers

  Every question is a Transform stream
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createCsvParser = () => {
  return parse({
    columns: (header) => header.map(h => h.trim().replace(/"/g, '')),
    trim: true,
    skip_records_with_error: true,
  });
};

class FilterByOccupation extends Transform {
  constructor(occupation, options = {}) {
    options.objectMode = true;
    super(options);
    this.occupation = occupation;
  }

  _transform(record, enc, cb) {
    if (record.Occupation === this.occupation) {
      this.push(record);
    }
    cb();
  }
}

class AverageValueByCol extends Transform {
  constructor(col, options = {}) {
    options.objectMode = true;
    super(options);
    this.col = col;
    this.total = 0;
    this.counter = 0;
  }

  _transform(record, enc, cb) {
    this.counter++;
    this.total += parseInt(record[this.col]);
    cb();
  }

  _flush(cb) {
    const result = parseInt(Math.floor(this.total / this.counter));
    this.push(result.toString());
    cb();
  }
}

class OutputHandler extends Writable {
  constructor(message = '', options = {}) {
    super({
      ...options,
      objectMode: true,
    });
    this.message = message;
  }

  _write(chunk, enc, cb) {
    console.log(`Result is ready! ${this.message} ${chunk.toString()}`);
    cb();
  }
}

export const sleepAnalyzer1 = (role) => {
  const filePath = path.join(__dirname, './Sleep_health_and_lifestyle_dataset.csv');
  const readDataStream = fs.createReadStream(filePath);
  const csvParser = createCsvParser();
  csvParser.setMaxListeners(20);
  const cb = (err) => {
    if (err) {
      console.error(`Pipeline failed with an error: ${err}`);
      process.exit(1);
    }
  };

  // What average sleep duration of Software Engineers?
  pipeline(
    readDataStream,
    csvParser,
    new FilterByOccupation(role),
    new AverageValueByCol('Sleep Duration'),
    new OutputHandler(`${role}s average sleep duration in hours is: `),
    cb,
  );

  // What average quality of sleep of Software Engineers?
  pipeline(
    readDataStream,
    csvParser,
    new FilterByOccupation(role),
    new AverageValueByCol('Quality of Sleep'),
    new OutputHandler(`${role}s quality of sleeping (scale: 1-10) is: `),
    cb,
  );

};