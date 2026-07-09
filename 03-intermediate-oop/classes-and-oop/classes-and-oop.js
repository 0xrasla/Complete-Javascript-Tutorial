/**
 * ============================================================
 * CLASSES & OOP — Organizing Code with Objects
 * ============================================================
 * 
 * Object-Oriented Programming (OOP) is a way of structuring
 * your code around objects that bundle data and behavior.
 * 
 * Prerequisites: You should be comfortable with functions,
 * variables, and basic JavaScript syntax.
 * ============================================================
 */

// ============================================================
// 1. YOUR FIRST CLASS
// ============================================================
// A class is a blueprint. It defines what properties and
// methods an object will have, but it is not the object itself.

class Dog {
  // The constructor runs when you create a new Dog object.
  // It sets up the initial properties.
  constructor(name, breed, age) {
    this.name = name;      // "this" refers to the new object being created
    this.breed = breed;
    this.age = age;
    this.isGoodBoy = true;  // Default value
  }

  // Methods are functions that belong to the class.
  bark() {
    return `${this.name} says: Woof! Woof!`;
  }

  introduce() {
    return `Hi, I'm ${this.name}, a ${this.age}-year-old ${this.breed}.`;
  }
}

// Creating objects (instances) from the class:
const dog1 = new Dog("Buddy", "Golden Retriever", 3);
const dog2 = new Dog("Max", "German Shepherd", 5);

console.log(dog1.introduce());  // Output: Hi, I'm Buddy, a 3-year-old Golden Retriever.
console.log(dog2.bark());       // Output: Max says: Woof! Woof!
console.log(dog1.isGoodBoy);    // Output: true

// Each object has its own copy of the properties.
console.log(dog1.name);  // Output: Buddy
console.log(dog2.name);  // Output: Max


// ============================================================
// 2. UNDERSTANDING `this`
// ============================================================
// "this" is a special keyword that refers to the current
// object — the object that is calling the method.

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // "this.name" here refers to the specific person's name.
  sayHello() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.sayHello());  // Output: Hello, my name is Alice and I am 25 years old.

// Common mistake: losing "this"
// If you assign a method to a variable, "this" can break:
const helloFunction = alice.sayHello;
// console.log(helloFunction());  // Error! "this" is undefined here.
// We will learn how to fix this with arrow functions and bind later.


// ============================================================
// 3. GETTERS AND SETTERS
// ============================================================
// Getters let you read a property like a value (no parentheses).
// Setters let you set a property like a value (with validation).

class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this._balance = balance;  // The underscore is a convention meaning "private"
  }

  // Getter — read the balance like a property: account.balance
  get balance() {
    return `Current balance: $${this._balance.toFixed(2)}`;
  }

  // Setter — set the balance with validation: account.balance = 100
  set balance(newBalance) {
    if (newBalance < 0) {
      console.log("Error: Balance cannot be negative.");
      return;
    }
    this._balance = newBalance;
  }

  // Regular method
  deposit(amount) {
    if (amount <= 0) {
      console.log("Error: Deposit amount must be positive.");
      return;
    }
    this._balance += amount;
    console.log(`Deposited $${amount.toFixed(2)}. ${this.balance}`);
  }

  withdraw(amount) {
    if (amount > this._balance) {
      console.log("Error: Insufficient funds.");
      return;
    }
    this._balance -= amount;
    console.log(`Withdrew $${amount.toFixed(2)}. ${this.balance}`);
  }
}

const account = new BankAccount("Alice", 1000);
console.log(account.balance);       // Output: Current balance: $1000.00

account.deposit(500);               // Output: Deposited $500.00. Current balance: $1500.00
account.withdraw(200);              // Output: Withdrew $200.00. Current balance: $1300.00

account.balance = -100;             // Output: Error: Balance cannot be negative.
console.log(account.balance);       // Output: Current balance: $1300.00 (unchanged)


// ============================================================
// 4. INHERITANCE — Building on Existing Classes
// ============================================================
// Inheritance lets you create a new class that reuses
// everything from an existing class and adds its own features.

// Parent class (also called "base" or "super" class)
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} makes a ${this.sound} sound.`;
  }
}

// Child class (also called "derived" or "sub" class)
class Cat extends Animal {
  constructor(name) {
    super(name, "meow");  // Call the parent constructor with specific values
    this.isIndoor = true;
  }

  // Cat has its own unique method
  purr() {
    return `${this.name} purrs: Prrrr...`;
  }
}

class Duck extends Animal {
  constructor(name) {
    super(name, "quack");
  }

  swim() {
    return `${this.name} is swimming!`;
  }
}

const cat = new Cat("Whiskers");
console.log(cat.speak());   // Output: Whiskers makes a meow sound. (from Animal)
console.log(cat.purr());    // Output: Whiskers purrs: Prrrr... (from Cat)
console.log(cat.isIndoor);  // Output: true (from Cat)

const duck = new Duck("Donald");
console.log(duck.speak());  // Output: Donald makes a quack sound. (from Animal)
console.log(duck.swim());   // Output: Donald is swimming! (from Duck)


// ============================================================
// 5. METHOD OVERRIDING
// ============================================================
// A child class can replace a parent method with its own
// version. This is called "overriding."

class Vehicle {
  constructor(type) {
    this.type = type;
  }

  describe() {
    return `This is a ${this.type}.`;
  }
}

class ElectricCar extends Vehicle {
  constructor(brand, range) {
    super("Electric Car");
    this.brand = brand;
    this.range = range;
  }

  // Override the parent's describe method
  describe() {
    return `This is a ${this.brand} electric car with ${this.range} miles of range.`;
  }
}

const tesla = new ElectricCar("Tesla", 350);
console.log(tesla.describe());  // Output: This is a Tesla electric car with 350 miles of range.
// The child's describe() replaces the parent's describe().


// ============================================================
// 6. STATIC METHODS
// ============================================================
// Static methods belong to the class itself, not to objects.
// You call them on the class, not on an instance.

class MathHelper {
  // Static method — called on the class, not on objects
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static isEven(num) {
    return num % 2 === 0;
  }
}

// You do NOT need "new" to use static methods:
console.log(MathHelper.add(3, 5));        // Output: 8
console.log(MathHelper.multiply(4, 7));   // Output: 28
console.log(MathHelper.isEven(10));       // Output: true
console.log(MathHelper.isEven(7));        // Output: false

// const helper = new MathHelper();
// helper.add(3, 5);  // Error! add is a static method.


// ============================================================
// 7. PRIVATE FIELDS (Modern JavaScript)
// ============================================================
// You can make properties truly private using # prefix.
// This is a newer feature (2022+) and is the proper way
// to hide internal data.

class Temperature {
  #celsius;  // Private field — cannot be accessed from outside

  constructor(celsius) {
    this.#celsius = celsius;
  }

  // Public getter
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }

  // Public method
  setFromFahrenheit(f) {
    this.#celsius = (f - 32) * 5/9;
  }

  // Public method
  display() {
    return `${this.#celsius.toFixed(1)}°C / ${this.fahrenheit.toFixed(1)}°F`;
  }
}

const temp = new Temperature(25);
console.log(temp.display());      // Output: 25.0°C / 77.0°F
console.log(temp.fahrenheit);     // Output: 77 (via getter)

temp.setFromFahrenheit(32);
console.log(temp.display());      // Output: 0.0°C / 32.0°F

// console.log(temp.#celsius);    // Error! Cannot access private field.


// ============================================================
// 8. PRACTICAL EXAMPLE — Building a Library System
// ============================================================
// Let's combine everything into a realistic example.

class Book {
  #isAvailable;

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.#isAvailable = true;
  }

  get availability() {
    return this.#isAvailable ? "Available" : "Checked out";
  }

  checkout() {
    if (!this.#isAvailable) {
      return `"${this.title}" is already checked out.`;
    }
    this.#isAvailable = false;
    return `You checked out "${this.title}". Enjoy!`;
  }

  returnBook() {
    if (this.#isAvailable) {
      return `"${this.title}" is already available.`;
    }
    this.#isAvailable = true;
    return `You returned "${this.title}". Thank you!`;
  }

  getInfo() {
    return `"${this.title}" by ${this.author} (${this.availability})`;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    return `Added "${book.title}" to ${this.name}.`;
  }

  findBook(title) {
    return this.books.find(book => book.title === title);
  }

  listBooks() {
    console.log(`\n📚 ${this.name} Collection:`);
    this.books.forEach(book => {
      console.log(`  - ${book.getInfo()}`);
    });
  }
}

// Using the library system:
const library = new Library("City Library");

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
const book2 = new Book("1984", "George Orwell", "978-0451524935");
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.listBooks();
// Output:
// 📚 City Library Collection:
//   - "The Great Gatsby" by F. Scott Fitzgerald (Available)
//   - "1984" by George Orwell (Available)
//   - "To Kill a Mockingbird" by Harper Lee (Available)

console.log("");
console.log(book1.checkout());   // Output: You checked out "The Great Gatsby". Enjoy!
console.log(book1.checkout());   // Output: "The Great Gatsby" is already checked out.
console.log(book1.returnBook()); // Output: You returned "The Great Gatsby". Thank you!

library.listBooks();
// Output:
// 📚 City Library Collection:
//   - "The Great Gatsby" by F. Scott Fitzgerald (Available)
//   - "1984" by George Orwell (Available)
//   - "To Kill a Mockingbird" by Harper Lee (Available)


console.log("\n=== Classes & OOP Section Complete ===");
console.log("Move on to async-js to learn about Promises and async/await.");
