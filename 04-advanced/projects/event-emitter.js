/**
 * ============================================================
 * PROJECT: Custom Event Emitter
 * ============================================================
 * 
 * Build a custom event system from scratch. This is the same
 * concept used by Node.js, browser DOM events, and many
 * JavaScript frameworks.
 * 
 * Skills practiced: Observer pattern, closures, classes,
 * higher-order functions.
 * ============================================================
 */

// ============================================================
// EVENT EMITTER CLASS
// ============================================================

class EventEmitter {
  constructor() {
    // Store listeners organized by event name
    // Each event name maps to an array of callback functions
    this._listeners = {};
    
    // Track the total number of listeners for debugging
    this._listenerCount = 0;
  }

  /**
   * Register a listener for an event.
   * @param {string} event - The event name
   * @param {Function} callback - The function to call when event fires
   * @returns {Function} Unsubscribe function (call to remove the listener)
   */
  on(event, callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Create the array for this event if it doesn't exist
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    // Add the callback to the array
    this._listeners[event].push(callback);
    this._listenerCount++;

    // Return an unsubscribe function (closure over event and callback)
    return () => this.off(event, callback);
  }

  /**
   * Register a listener that fires only once.
   * @param {string} event - The event name
   * @param {Function} callback - The function to call
   * @returns {Function} Unsubscribe function
   */
  once(event, callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Create a wrapper that removes itself after firing
    const wrapper = (...args) => {
      this.off(event, wrapper);
      callback(...args);
    };

    // Store reference to the original callback for removal
    wrapper._original = callback;

    return this.on(event, wrapper);
  }

  /**
   * Remove a specific listener for an event.
   * @param {string} event - The event name
   * @param {Function} callback - The specific function to remove
   */
  off(event, callback) {
    if (!this._listeners[event]) return;

    this._listeners[event] = this._listeners[event].filter(
      cb => cb !== callback && cb._original !== callback
    );

    this._listenerCount--;

    // Clean up empty arrays
    if (this._listeners[event].length === 0) {
      delete this._listeners[event];
    }
  }

  /**
   * Remove all listeners for an event, or all listeners entirely.
   * @param {string} [event] - Optional event name. If omitted, removes all listeners.
   */
  removeAllListeners(event) {
    if (event) {
      const count = this._listeners[event]?.length || 0;
      this._listenerCount -= count;
      delete this._listeners[event];
    } else {
      this._listenerCount = 0;
      this._listeners = {};
    }
  }

  /**
   * Emit an event, calling all registered listeners.
   * @param {string} event - The event name
   * @param  {...any} args - Arguments to pass to listeners
   * @returns {boolean} True if listeners were called, false otherwise
   */
  emit(event, ...args) {
    if (!this._listeners[event]) {
      return false;
    }

    // Create a copy of the array in case a listener modifies it
    const listeners = [...this._listeners[event]];

    listeners.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in listener for "${event}":`, error);
      }
    });

    return true;
  }

  /**
   * Get the number of listeners for an event.
   * @param {string} event - The event name
   * @returns {number} The count
   */
  listenerCount(event) {
    return this._listeners[event]?.length || 0;
  }

  /**
   * Get all event names that have listeners.
   * @returns {string[]} Array of event names
   */
  eventNames() {
    return Object.keys(this._listeners);
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

// Create an event emitter instance
const emitter = new EventEmitter();

// Register listeners
const unsub1 = emitter.on("message", (text) => {
  console.log(`  Listener 1: ${text}`);
});

const unsub2 = emitter.on("message", (text) => {
  console.log(`  Listener 2: ${text.toUpperCase()}`);
});

// Emit the event
console.log("--- Emitting 'message' event ---");
emitter.emit("message", "Hello, world!");
// Output:
//   Listener 1: Hello, world!
//   Listener 2: HELLO, WORLD!

// Unsubscribe one listener
console.log("\n--- After unsubscribing Listener 1 ---");
unsub1();
emitter.emit("message", "Goodbye!");
// Output:
//   Listener 2: GOODBYE!

// Use "once" for a listener that fires only once
console.log("\n--- Using 'once' ---");
emitter.once("data", (info) => {
  console.log(`  Once listener: ${info}`);
});

emitter.emit("data", "First time");  // Fires
emitter.emit("data", "Second time"); // Does NOT fire (already removed)


// ============================================================
// PRACTICAL EXAMPLE: Chat Application
// ============================================================

class ChatRoom {
  constructor(name) {
    this.name = name;
    this.events = new EventEmitter();
    this.messages = [];
  }

  join(userName) {
    this.events.emit("userJoin", { user: userName, room: this.name });
  }

  leave(userName) {
    this.events.emit("userLeave", { user: userName, room: this.name });
  }

  sendMessage(userName, text) {
    const message = {
      user: userName,
      text,
      timestamp: new Date()
    };
    this.messages.push(message);
    this.events.emit("message", message);
  }
}

// Set up the chat room
const chat = new ChatRoom("General");

// Register event handlers
chat.events.on("userJoin", (data) => {
  console.log(`  📢 ${data.user} joined ${data.room}`);
});

chat.events.on("userLeave", (data) => {
  console.log(`  👋 ${data.user} left ${data.room}`);
});

chat.events.on("message", (msg) => {
  console.log(`  💬 [${msg.user}]: ${msg.text}`);
});

// Simulate a chat session
console.log("\n--- Chat Room Demo ---");
chat.join("Alice");
chat.join("Bob");
chat.sendMessage("Alice", "Hey everyone!");
chat.sendMessage("Bob", "Hi Alice!");
chat.leave("Alice");

// Check event stats
console.log(`\nEvent names: ${chat.events.eventNames().join(", ")}`);
console.log(`Message listeners: ${chat.events.listenerCount("message")}`);


console.log("\n=== Event Emitter Project Complete ===");
