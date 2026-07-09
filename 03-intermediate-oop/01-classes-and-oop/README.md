# 01 — Classes & Object-Oriented Programming (OOP)

## What Is OOP?

Object-Oriented Programming (OOP) is a way of organizing code around "objects" — bundles of related data and behavior. Instead of writing loose functions and variables, you group them into classes that represent real-world concepts.

Think of a class as a blueprint, and an object as something built from that blueprint. A `Car` class is the blueprint; a specific car (red, 2020, Toyota) is the object.

---

## Key Concepts

### Classes and Constructors

A class is a template for creating objects. The constructor is a special method that runs when you create a new object:

```javascript
class Dog {
  constructor(name, breed, age) {
    this.name = name;    // "this" refers to the new object being created
    this.breed = breed;
    this.age = age;
  }

  bark() {
    return `${this.name} says: Woof! Woof!`;
  }
}

const buddy = new Dog("Buddy", "Golden Retriever", 3);
console.log(buddy.bark());  // Output: Buddy says: Woof! Woof!
```

### Understanding `this`

The `this` keyword refers to the current object — the object that is calling the method:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, my name is ${this.name}!`;
  }
}

const alice = new Person("Alice");
console.log(alice.sayHello());  // Output: Hello, my name is Alice!
```

### Getters and Setters

Getters let you read a property like a value. Setters let you set a property with validation:

```javascript
class BankAccount {
  constructor(balance) {
    this._balance = balance;
  }

  get balance() {
    return `Current balance: $${this._balance.toFixed(2)}`;
  }

  set balance(newBalance) {
    if (newBalance < 0) {
      console.log("Error: Balance cannot be negative.");
      return;
    }
    this._balance = newBalance;
  }
}

const account = new BankAccount(1000);
console.log(account.balance);     // Output: Current balance: $1000.00
account.balance = -100;           // Output: Error: Balance cannot be negative.
```

### Inheritance

Inheritance lets you create a new class that reuses everything from an existing class:

```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} makes a ${this.sound} sound.`;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "meow");  // Call the parent constructor
  }

  purr() {
    return `${this.name} purrs: Prrrr...`;
  }
}

const cat = new Cat("Whiskers");
console.log(cat.speak());  // Output: Whiskers makes a meow sound.
console.log(cat.purr());   // Output: Whiskers purrs: Prrrr...
```

### Static Methods

Static methods belong to the class itself, not to objects:

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static isEven(num) {
    return num % 2 === 0;
  }
}

// No "new" needed:
console.log(MathHelper.add(3, 5));      // Output: 8
console.log(MathHelper.isEven(10));     // Output: true
```

---

## Files

| File | What It Covers |
|------|---------------|
| `classes-and-oop.js` | Classes, constructors, methods, inheritance, `this`, encapsulation, getters/setters |
