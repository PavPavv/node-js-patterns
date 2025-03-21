export class Profiler {
  _startTime = 0;
  _finishTime = '';

  constructor(label) {
    this.label = label;
  }

  start() {
    this.startTime = process.hrtime.bigint();
  }

  end() {
    const diff = process.hrtime(this._startTime);
    this._finishTime = `${diff[0]}s and ${diff[1]}ns`
  }

  // end() {
  //   const endTime = process.hrtime.bigint();
  //   const diff = endTime - this._startTime;
  //   this._finishTime = diff / BigInt(1000000);
  // }

  get result() {
    return this._finishTime;
  }

  printResult() {
    console.log(`${this.label} done in ${this._finishTime}ms`);
  }
}

const noopProfiler = {
  start() {},
  end() {},
  get result() {
    return '';
  }
}

// Factory:
export function createProfiler(label) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler;
  }
  return new Profiler(label);
  // or some branched logic for creating new Profiler
}

// const profiler = createProfiler('some title')

