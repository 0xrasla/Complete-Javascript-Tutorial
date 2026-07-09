# 04 — Advanced Projects

## Master Advanced Concepts

These projects combine closures, design patterns, memory management, and advanced JavaScript concepts into practical applications.

---

## Projects

| # | Project | Description | Skills Practiced |
|---|---------|-------------|-----------------|
| 01 | Event Emitter | Build a custom event system | Observer pattern, closures, classes |
| 02 | State Manager | Build a simple state management system | Observer pattern, closures, immutability |

---

## Project 01: Custom Event Emitter

Build a custom event system from scratch — the same concept used by Node.js and browser DOM events:

```javascript
class EventEmitter {
  constructor() { this._listeners = {}; }

  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
    return () => this.off(event, callback);  // Unsubscribe function
  }

  off(event, callback) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this._listeners[event]) return;
    this._listeners[event].forEach(cb => cb(...args));
  }
}

const emitter = new EventEmitter();
const unsub = emitter.on("data", (msg) => console.log(msg));
emitter.emit("data", "Hello!");  // Output: Hello!
unsub();  // Remove the listener
```

---

## Project 02: State Manager

A simple state management system inspired by Redux:

```javascript
class StateManager {
  constructor(initialState = {}) {
    this._state = { ...initialState };
    this._reducers = {};
    this._subscribers = [];
  }

  registerReducer(action, reducer) {
    this._reducers[action] = reducer;
  }

  dispatch(action, payload) {
    if (this._reducers[action]) {
      this._state = this._reducers[action](this._state, payload);
      this._subscribers.forEach(cb => cb(this._state));
    }
  }

  subscribe(callback) {
    this._subscribers.push(callback);
    return () => {
      this._subscribers = this._subscribers.filter(cb => cb !== callback);
    };
  }

  getState() { return { ...this._state }; }
}

const store = new StateManager({ count: 0 });
store.registerReducer("INCREMENT", (state) => ({ count: state.count + 1 }));
store.dispatch("INCREMENT");
console.log(store.getState());  // Output: { count: 1 }
```

---

## Files

| File | What It Covers |
|------|---------------|
| `event-emitter.js` | Complete event emitter with once, removeAllListeners, and error handling |
| `state-manager.js` | State manager with undo/redo, history, and deep freezing |
