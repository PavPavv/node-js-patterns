'use strict';

function main() {
  function test(a) {
    console.log(a);
  }

  function createTask(target, ...args) {
    return () => {
      target(...args);
    }
  }
  const ct = createTask(test, 'some str');
  console.log(ct);
};