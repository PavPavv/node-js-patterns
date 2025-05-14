/*
The Revealing Constructor Pattern in Node.js (and JavaScript in general)
is a design pattern that combines the concepts of constructor functions
and the revealing module pattern to create objects with private data and
a clear, explicit interface.

```typescript
class Person {
  // Private fields
  private readonly _name: string;
  private age: number;

  constructor(name: string, age: number) {
    this._name = name; // private readonly, cannot be changed after construction
    this.age = age;
  }

  // Public methods to access private data
  public getName(): string {
    return this._name;
  }

  public setName(newName: string): void {
    // You could add validation here if needed
    // but since _name is readonly, this method can't modify it
    // For demonstration, let's assume name is immutable
  }

  public getAge(): number {
    return this.age;
  }

  public getBirthYear(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
}

// Usage:
const person1 = new Person("Alice", 30);

console.log(person1.getName()); // Alice
console.log(person1.getBirthYear()); // 1993 (assuming current year 2023)

// Cannot modify _name directly, as it is private and readonly
// person1._name = "Bob"; // Error

// Can modify age via setter (if provided)
```

*/

class Person {
  // Private fields
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  // Public methods to access private data
  getName() {
    return this.#name;
  }

  setName(newName) {
    this.#name = newName;
  }

  getAge() {
    return this.#age;
  }

  getBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.#age;
  }
}

// Usage
const person1 = new Person("Bob", 25);

console.log(person1.getName()); // Bob
console.log(person1.getBirthYear()); // 1998 (assuming current year 2023)

person1.setName("Robert");
console.log(person1.getName()); // Robert

// Trying to access private fields directly will result in error
// console.log(person1.#name); // SyntaxError


const MODIFIER_NAMES = ['swap', 'write', 'fill'];

export class ImmutableBuffer {
  constructor (size, executor) {
    const buffer = Buffer.alloc(size);
    const modifiers = {};

    for (const prop in buffer) {
      // skip if not method
      if (typeof buffer[prop] !== 'function') {
        continue;
      }

      if (MODIFIER_NAMES.some((m) => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer);
      } else {
        this[prop] = buffer[prop].bind(buffer);
      }
    }
    executor(modifiers);
  }
}