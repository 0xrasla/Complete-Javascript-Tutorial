/**
 * ============================================================
 * PROJECT: Simple State Manager
 * ============================================================
 * 
 * A simple state management system inspired by Redux and
 * Vuex. This demonstrates how design patterns (Observer,
 * Module, Strategy) come together in a real-world scenario.
 * 
 * Skills practiced: closures, Observer pattern, immutability,
 * classes, higher-order functions.
 * ============================================================
 */

// ============================================================
// STATE MANAGER CLASS
// ============================================================

class StateManager {
  #state;
  #reducers;
  #subscribers;
  #history;

  constructor(initialState = {}) {
    this.#state = this.#deepFreeze({ ...initialState });
    this.#reducers = {};
    this.#subscribers = new Map();
    this.#history = [this.#state];
  }

  /**
   * Get the current state (returns a copy to prevent mutation).
   * @returns {Object} Current state
   */
  getState() {
    return { ...this.#state };
  }

  /**
   * Register a reducer for a specific action type.
   * @param {string} actionType - The action name
   * @param {Function} reducer - Function that returns new state
   */
  registerReducer(actionType, reducer) {
    if (typeof reducer !== "function") {
      throw new TypeError("Reducer must be a function");
    }
    this.#reducers[actionType] = reducer;
  }

  /**
   * Dispatch an action to update state.
   * @param {string} actionType - The action name
   * @param {Object} payload - Data for the action
   * @returns {Object} The new state
   */
  dispatch(actionType, payload = {}) {
    const reducer = this.#reducers[actionType];
    if (!reducer) {
      console.warn(`No reducer registered for action: "${actionType}"`);
      return this.getState();
    }

    // Run the reducer with current state and payload
    const newState = reducer(this.#state, payload);

    // Freeze the new state to prevent external mutation
    this.#state = this.#deepFreeze(newState);

    // Add to history
    this.#history.push(this.#state);

    // Notify all subscribers
    this.#notifySubscribers(actionType, payload);

    return this.getState();
  }

  /**
   * Subscribe to state changes.
   * @param {Function} callback - Called whenever state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Subscriber must be a function");
    }

    const id = Symbol("subscriber");
    this.#subscribers.set(id, callback);

    // Return unsubscribe function
    return () => this.#subscribers.delete(id);
  }

  /**
   * Get the state history.
   * @returns {Object[]} Array of previous states
   */
  getHistory() {
    return [...this.#history];
  }

  /**
   * Undo the last state change.
   * @returns {Object} The restored state
   */
  undo() {
    if (this.#history.length <= 1) {
      console.log("Nothing to undo");
      return this.getState();
    }

    // Remove the current state
    this.#history.pop();
    
    // Restore the previous state
    this.#state = this.#history[this.#history.length - 1];
    
    this.#notifySubscribers("undo", {});
    return this.getState();
  }

  /**
   * Notify all subscribers of a state change.
   * @private
   */
  #notifySubscribers(actionType, payload) {
    this.#subscribers.forEach(callback => {
      try {
        callback({
          state: this.getState(),
          action: actionType,
          payload
        });
      } catch (error) {
        console.error("Error in subscriber:", error);
      }
    });
  }

  /**
   * Deep freeze an object (makes all properties read-only).
   * @private
   */
  #deepFreeze(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === "object" && obj[key] !== null && !Object.isFrozen(obj[key])) {
        this.#deepFreeze(obj[key]);
      }
    });
    return obj;
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

// Create a state manager with initial state
const store = new StateManager({
  count: 0,
  user: null,
  todos: []
});

// Register reducers (how state changes for each action)
store.registerReducer("INCREMENT", (state, payload) => ({
  ...state,
  count: state.count + (payload.amount || 1)
}));

store.registerReducer("DECREMENT", (state, payload) => ({
  ...state,
  count: state.count - (payload.amount || 1)
}));

store.registerReducer("SET_USER", (state, payload) => ({
  ...state,
  user: payload.user
}));

store.registerReducer("ADD_TODO", (state, payload) => ({
  ...state,
  todos: [...state.todos, {
    id: Date.now(),
    text: payload.text,
    completed: false
  }]
}));

store.registerReducer("TOGGLE_TODO", (state, payload) => ({
  ...state,
  todos: state.todos.map(todo =>
    todo.id === payload.id
      ? { ...todo, completed: !todo.completed }
      : todo
  )
}));

// Subscribe to state changes
const unsubscribe = store.subscribe(({ state, action, payload }) => {
  console.log(`  [${action}] Count: ${state.count}, Todos: ${state.todos.length}`);
});

// Use the store
console.log("--- Dispatching Actions ---");
store.dispatch("INCREMENT");
store.dispatch("INCREMENT", { amount: 5 });
store.dispatch("DECREMENT");
store.dispatch("SET_USER", { user: { name: "Alice", email: "alice@example.com" } });
store.dispatch("ADD_TODO", { text: "Learn JavaScript" });
store.dispatch("ADD_TODO", { text: "Build a project" });

console.log("\n--- Current State ---");
console.log(store.getState());

// Output:
// {
//   count: 5,
//   user: { name: "Alice", email: "alice@example.com" },
//   todos: [
//     { id: ..., text: "Learn JavaScript", completed: false },
//     { id: ..., text: "Build a project", completed: false }
//   ]
// }

// Undo
console.log("\n--- Undo ---");
store.undo();
console.log(store.getState());

// Check history
console.log("\n--- History ---");
console.log(`State changes: ${store.getHistory().length}`);

// Unsubscribe
unsubscribe();
console.log("\n--- After Unsubscribing ---");
store.dispatch("INCREMENT");  // No console output from subscriber


// ============================================================
// PRACTICAL EXAMPLE: Shopping Cart State
// ============================================================

const cartStore = new StateManager({
  items: [],
  total: 0
});

cartStore.registerReducer("ADD_ITEM", (state, payload) => {
  const newItems = [...state.items, payload.item];
  const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
  return { ...state, items: newItems, total: newTotal };
});

cartStore.registerReducer("REMOVE_ITEM", (state, payload) => {
  const newItems = state.items.filter(item => item.id !== payload.id);
  const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
  return { ...state, items: newItems, total: newTotal };
});

cartStore.registerReducer("CLEAR_CART", () => ({
  items: [],
  total: 0
}));

console.log("\n--- Shopping Cart ---");
cartStore.dispatch("ADD_ITEM", { item: { id: 1, name: "Laptop", price: 999 } });
cartStore.dispatch("ADD_ITEM", { item: { id: 2, name: "Mouse", price: 29 } });
cartStore.dispatch("ADD_ITEM", { item: { id: 3, name: "Keyboard", price: 79 } });
console.log("Cart:", cartStore.getState());

cartStore.dispatch("REMOVE_ITEM", { id: 2 });
console.log("After removing mouse:", cartStore.getState());

cartStore.dispatch("CLEAR_CART");
console.log("After clearing:", cartStore.getState());


console.log("\n=== State Manager Project Complete ===");
