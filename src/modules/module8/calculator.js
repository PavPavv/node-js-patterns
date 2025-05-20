class StackCalculator {
  constructor() {
    this.stack = [];
  }

  putValue(value) {
    this.stack.push(value);
  }

  getValue() {
    return this.stack.pop();
  }

  peekValue() {
    return this.stack[this.stack.length - 1];
  }

  clear() {
    this.stack = [];
  }

  divide() {
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }

  multiply() {
    const multiplicand = this.getValue();
    const multiplier = this.getValue();
    const result = multiplier * multiplicand;
    this.putValue(result);
    return result;
  }
}

const calculator = new StackCalculator();
// calculator.putValue(3);
// calculator.putValue(2);
// console.log(calculator.multiply());
// calculator.putValue(2);
// console.log(calculator.multiply());

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  // delegated methods
  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue() {
    return this.calculator.getValue();
  }

  peekValue() {
    return this.calculator.peekValue();
  }

  clear() {
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }

  // proxied method
  divide() {
    const divisor = this.calculator.peekValue();
    if (!divisor) {
      throw Error('Division by 0');
    }
    return this.calculator.divide();
  }
}
const safeCalculator = new SafeCalculator(calculator);

// calculator.putValue(3);
// calculator.putValue(2);
// console.log(calculator.multiply());

// safeCalculator.putValue(2);
// console.log(safeCalculator.multiply());

// calculator.putValue(0);
// console.log(calculator.divide());

// safeCalculator.clear();
// safeCalculator.putValue(4);
// safeCalculator.putValue(0);
// console.log(safeCalculator.divide());
// -------------------------------------------------------------

// Monkey patching
function patchToSafeCalc(calc) {
  const divideOrig = calc.divide;
  calc.divide = () => {
    const divisor = calc.peekValue();
    if (!divisor) {
      throw Error('Division by 0');
    }
    return divideOrig.apply(calc);
  };
}

// const patchedCalculator = patchToSafeCalc(calculator);
//---------------------------------------------------------------

// native ES6 Proxy
// const proxy = new Proxy(target, handler);
const safeCalcHandler = {
  get: (target, property) => {
    // proxy certain method
    if (property === 'divide') {
      return function() {
        const divisor = target.peekValue();
        if (!divisor) {
          throw Error('Division by 0');
        }
        return target.divide();
      }
    }
    // delegated all the rest methods and properties
    return target[property];
  },
};
// const safeProxyCalculator = new Proxy(calculator, safeCalcHandler);

//
const evenHandler = {
  get: (target, idx) => idx * 2,
  has: (target, number) => number % 2 === 0,
};
const evenNumbers = new Proxy([], evenHandler);
console.log(2 in evenNumbers);
console.log(5 in evenNumbers);
console.log(evenNumbers[7]);




