export class Profiler {
  startTime = 0;
  finishTime = 0;

  constructor(label) {
    this.label = label;
  }

  start() {
    this.startTime = process.hrtime.bigint();
  }

  end() {
    const endTime = process.hrtime.bigint();
    const diff = endTime - this.startTime;
    this.finishTime = diff / BigInt(1000000);
  }

  get result() {
    return this.finishTime;
  }

  printResult() {
    console.log(`${this.label} done in ${this.finishTime}ms`);
  }
}