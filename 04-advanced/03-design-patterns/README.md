# 03 — Design Patterns

## What Are Design Patterns?

Design patterns are reusable solutions to common problems in software design. They are not code you copy and paste — they are templates that help you organize your code in ways that are easier to understand, maintain, and extend.

---

## Key Patterns

### Singleton — One Instance Only

Ensures a class has only ONE instance:

```javascript
class Database {
  static #instance = null;

  constructor() {
    if (Database.#instance) return Database.#instance;
    this.connected = true;
    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) Database.#instance = new Database();
    return Database.#instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);  // Output: true (same object)
```

### Factory — Creating Objects

Creates objects without specifying the exact class:

```javascript
function createNotification(type, data) {
  switch (type) {
    case "email":
      return { type: "email", to: data.to, subject: data.subject };
    case "sms":
      return { type: "sms", phone: data.phone, message: data.message };
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

const email = createNotification("email", { to: "alice@example.com", subject: "Hi" });
```

### Observer — Notifying Multiple Objects

When one object changes, all its dependents are notified:

```javascript
class EventEmitter {
  constructor() { this.listeners = {}; }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("message", (text) => console.log(`Received: ${text}`));
emitter.emit("message", "Hello!");  // Output: Received: Hello!
```

### Strategy — Swapping Algorithms

Define a family of algorithms and make them interchangeable:

```javascript
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

function calculate(strategy, a, b) {
  return strategies[strategy](a, b);
}

console.log(calculate("add", 3, 5));       // Output: 8
console.log(calculate("multiply", 3, 5));  // Output: 15
```

---

## Files

| File | What It Covers |
|------|---------------|
| `design-patterns.js` | Singleton, Factory, Observer, Module, Strategy, and Decorator patterns |
