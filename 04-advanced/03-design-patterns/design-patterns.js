/**
 * ============================================================
 * DESIGN PATTERNS — Reusable Solutions to Common Problems
 * ============================================================
 * 
 * Design patterns are templates for solving recurring design
 * problems. They make your code more organized, reusable,
 * and easier to understand.
 * 
 * Prerequisites: You should be comfortable with classes,
 * closures, and object-oriented programming.
 * ============================================================
 */

// ============================================================
// 1. SINGLETON PATTERN — One Instance Only
// ============================================================
// The Singleton ensures a class has only ONE instance and
// provides a global point of access to it.

// Use case: Database connection, configuration manager,
// logging service — things where you only want one copy.

class Database {
  static #instance = null;  // Private static field

  constructor() {
    if (Database.#instance) {
      // If an instance already exists, return it
      return Database.#instance;
    }

    // Initialize the database (simulated)
    this.connected = true;
    this.tables = ["users", "posts", "comments"];
    console.log("Database connected!");

    // Store this instance
    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  query(table) {
    if (!this.connected) {
      console.log("Error: Not connected to database");
      return [];
    }
    console.log(`Querying table: ${table}`);
    return [];
  }
}

// Both variables point to the SAME instance:
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2);  // Output: true (same object)
db1.query("users");         // Output: Querying table: users
db2.query("posts");         // Output: Querying table: posts


// ============================================================
// 2. FACTORY PATTERN — Creating Objects Without new
// ============================================================
// A Factory is a function or method that creates objects
// without specifying the exact class. The factory decides
// which class to use based on the input.

// Use case: Creating different types of notifications,
// payments, or UI elements based on user input.

class EmailNotification {
  constructor(to, subject, body) {
    this.type = "email";
    this.to = to;
    this.subject = subject;
    this.body = body;
  }

  send() {
    console.log(`📧 Email to ${this.to}: "${this.subject}"`);
  }
}

class SMSNotification {
  constructor(phone, message) {
    this.type = "sms";
    this.phone = phone;
    this.message = message;
  }

  send() {
    console.log(`📱 SMS to ${this.phone}: "${this.message}"`);
  }
}

class PushNotification {
  constructor(device, title, body) {
    this.type = "push";
    this.device = device;
    this.title = title;
    this.body = body;
  }

  send() {
    console.log(`🔔 Push to ${this.device}: "${this.title}"`);
  }
}

// The Factory function:
function createNotification(type, data) {
  switch (type) {
    case "email":
      return new EmailNotification(data.to, data.subject, data.body);
    case "sms":
      return new SMSNotification(data.phone, data.message);
    case "push":
      return new PushNotification(data.device, data.title, data.body);
    default:
      throw new Error(`Unknown notification type: ${type}`);
  }
}

// Using the factory:
const email = createNotification("email", {
  to: "alice@example.com",
  subject: "Welcome!",
  body: "Thanks for signing up."
});

const sms = createNotification("sms", {
  phone: "+1234567890",
  message: "Your code is 1234"
});

const push = createNotification("push", {
  device: "iPhone",
  title: "New message",
  body: "You have a new message!"
});

email.send();  // Output: 📧 Email to alice@example.com: "Welcome!"
sms.send();    // Output: 📱 SMS to +1234567890: "Your code is 1234"
push.send();   // Output: 🔔 Push to iPhone: "New message"


// ============================================================
// 3. OBSERVER PATTERN — Notifying Multiple Objects
// ============================================================
// The Observer pattern defines a one-to-many dependency:
// when one object changes state, all its dependents are
// notified and updated automatically.

// Use case: Event systems, data binding, real-time updates,
// any scenario where one thing needs to tell many things.

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => this.off(event, callback);  // Return unsubscribe function
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

// Using the observer pattern:
const eventBus = new EventEmitter();

// Subscribe to events
const unsubscribe1 = eventBus.on("userLogin", (user) => {
  console.log(`  Observer 1: Welcome, ${user.name}!`);
});

const unsubscribe2 = eventBus.on("userLogin", (user) => {
  console.log(`  Observer 2: Logging login for ${user.name}`);
});

const unsubscribe3 = eventBus.on("userLogin", (user) => {
  console.log(`  Observer 3: Sending email to ${user.email}`);
});

// Emit the event (notifies all observers)
console.log("--- User Login Event ---");
eventBus.emit("userLogin", { name: "Alice", email: "alice@example.com" });
// Output:
// Observer 1: Welcome, Alice!
// Observer 2: Logging login for Alice
// Observer 3: Sending email to alice@example.com

// Unsubscribe one observer
unsubscribe2();

console.log("\n--- After unsubscribing Observer 2 ---");
eventBus.emit("userLogin", { name: "Bob", email: "bob@example.com" });
// Output:
// Observer 1: Welcome, Bob!
// Observer 3: Sending email to bob@example.com
// (Observer 2 is no longer notified)


// ============================================================
// 4. MODULE PATTERN — Organizing Code with Closures
// ============================================================
// The Module pattern uses closures to create private scope
// and expose only what is necessary.

// Note: Modern JavaScript has native ES6 modules (import/export).
// The Module pattern is still useful for understanding closures
// and for environments without module support.

const UserModule = (function() {
  // Private state
  const users = [];
  let currentUser = null;

  // Private functions
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Public API
  return {
    register: function(name, email) {
      const user = {
        id: generateId(),
        name,
        email,
        createdAt: new Date()
      };
      users.push(user);
      console.log(`Registered: ${user.name}`);
      return user;
    },

    login: function(email) {
      const user = users.find(u => u.email === email);
      if (user) {
        currentUser = user;
        console.log(`Logged in: ${user.name}`);
        return user;
      }
      console.log("User not found");
      return null;
    },

    getCurrentUser: function() {
      return currentUser ? { ...currentUser } : null;  // Return copy
    },

    listUsers: function() {
      return users.map(u => ({ ...u }));  // Return copies
    }
  };
})();

UserModule.register("Alice", "alice@example.com");
UserModule.register("Bob", "bob@example.com");
UserModule.login("alice@example.com");
console.log("Current user:", UserModule.getCurrentUser());
console.log("All users:", UserModule.listUsers());


// ============================================================
// 5. STRATEGY PATTERN — Swapping Algorithms
// ============================================================
// The Strategy pattern defines a family of algorithms,
// encapsulates each one, and makes them interchangeable.

// Use case: Different sorting algorithms, payment methods,
// validation rules, or any situation where you want to
// swap behavior at runtime.

// Define different strategies (algorithms)
const sortingStrategies = {
  bubble: function(arr) {
    const result = [...arr];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }
    return result;
  },

  quick: function(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...sortingStrategies.quick(left), ...middle, ...sortingStrategies.quick(right)];
  },

  insertion: function(arr) {
    const result = [...arr];
    for (let i = 1; i < result.length; i++) {
      const current = result[i];
      let j = i - 1;
      while (j >= 0 && result[j] > current) {
        result[j + 1] = result[j];
        j--;
      }
      result[j + 1] = current;
    }
    return result;
  }
};

// The context that uses a strategy
class Sorter {
  constructor(strategy = "bubble") {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(arr) {
    const strategyFn = sortingStrategies[this.strategy];
    if (!strategyFn) {
      throw new Error(`Unknown strategy: ${this.strategy}`);
    }
    console.log(`Sorting with ${this.strategy}...`);
    return strategyFn(arr);
  }
}

// Using the strategy pattern:
const sorter = new Sorter("bubble");
const data = [64, 34, 25, 12, 22, 11, 90];

console.log("Original:", data);
console.log("Bubble:", sorter.sort(data));

sorter.setStrategy("quick");
console.log("Quick:", sorter.sort(data));

sorter.setStrategy("insertion");
console.log("Insertion:", sorter.sort(data));


// ============================================================
// 6. DECORATOR PATTERN — Adding Behavior Dynamically
// ============================================================
// The Decorator pattern adds new behavior to objects without
// modifying their structure. It is like wrapping an object
// with another object that adds extra features.

// Use case: Adding logging, caching, validation, or any
// cross-cutting concern to existing functionality.

function withLogging(fn) {
  return function(...args) {
    console.log(`  Calling ${fn.name} with args:`, args);
    const result = fn(...args);
    console.log(`  ${fn.name} returned:`, result);
    return result;
  };
}

function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`  ${fn.name} took ${(end - start).toFixed(4)}ms`);
    return result;
  };
}

// Original functions
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Decorate the functions (add logging and timing)
const addWithLogging = withLogging(add);
const multiplyWithTiming = withTiming(multiply);

console.log("\n--- Decorated Functions ---");
addWithLogging(3, 5);
// Output:
//   Calling add with args: [3, 5]
//   add returned: 8

multiplyWithTiming(4, 7);
// Output:
//   multiply took 0.0123ms
//   multiply returned: 28


// ============================================================
// 7. WHEN TO USE WHICH PATTERN
// ============================================================
// There is no single "best" pattern. Use the right tool
// for the job:

// Singleton: You need exactly one instance (database, config)
// Factory: You need to create objects without specifying class
// Observer: Many things need to react to one thing's changes
// Module: You need to organize code into private/public parts
// Strategy: You need to swap algorithms at runtime
// Decorator: You need to add behavior without changing code

console.log("\n=== Design Patterns Section Complete ===");
console.log("Move on to projects to practice what you learned!");
