import { EventEmitter } from 'events';

const TICK = 500;

function runTimeouts(res, count, totalTime, callback, em) {
  res++;
  count += TICK;
  const timestamp = Date.now();
  const timeStr = timestamp.toString().split('');
  const lastTwoDigits = `${timeStr[timeStr.length - 2]}${timeStr[timeStr.length - 1]}`;

  console.log('lastTwoDigits', lastTwoDigits)
  if (Number(lastTwoDigits) % 2 === 0) {
    em.emit('error', res);
  } else {
    em.emit('tick', res);
  }

  setTimeout(() => {
    if (count < totalTime) {
      runTimeouts(res, count, totalTime, callback, em);
    } else {
      callback(res);
      return;
    }
  }, TICK);
}

export function ticker(ms, cb) {
  const emitter = new EventEmitter();
  let result = 0;
  let counter = 0;

  setTimeout(() => {
    runTimeouts(result, counter, ms, cb, emitter);
  }, 0);

  return emitter;
}