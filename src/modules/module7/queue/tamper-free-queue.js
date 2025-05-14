export class Queue {
  constructor(executor) {
    this._queue = [];
    this._resolvers = [];

    // Bind methods to ensure correct context
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);

    // Call the executor with the enqueue method
    executor({ enqueue: this.enqueue });
  }

  enqueue(item) {
    if (this._resolvers.length) {
      const resolver = this._resolvers.shift();
      resolver(item);
    } else {
      this._queue.push(item);
    }
  }

  async dequeue() {
    if (this._queue.length) {
      const firstItemInQueue = this._queue.shift();
      return Promise.resolve(firstItemInQueue);
    } else {
      console.warn('Queue is empty! Waiting for an element...');
      return new Promise((resolve) => {
        this._resolvers.push(resolve);
      });
    }
  }
}