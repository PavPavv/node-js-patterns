class ColorConsole {
  log() {}
}

class RedConsole extends ColorConsole {
  log(str) {
    console.log('\x1b[31m', str, '\x1b[0m');
  }
}

class BlueConsole extends ColorConsole {
  log(str) {
    console.log('\x1b[34m', str, '\x1b[0m');
  }
}

class GreenConsole extends ColorConsole {
  log(str) {
    console.log('\x1b[32m', str, '\x1b[0m');
  }
}

export function createColorConsole(color) {
  if (color === 'red') {
    return new RedConsole();
  }
  if (color === 'blue') {
    return new BlueConsole();
  }
  if (color === 'green') {
    return new GreenConsole();
  }
}