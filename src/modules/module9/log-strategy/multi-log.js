'use strict';

export class Log {
  constructor(logStrategy, data) {
    this.logStrategy = logStrategy;
    this.data = data;
  }

  debug() {
    this.logStrategy.debug(this.data);
  }

  info() {
    this.logStrategy.info(this.data);
  }

  warn() {
    this.logStrategy.warn(this.data); 
  }

  error() {
    this.logStrategy.error(this.data);
  }
}