/**
 * ============================================================
 * CLOSURES — Understanding How Functions Remember
 * ============================================================
 * 
 * A closure is a function that remembers the variables from
 * where it was defined, even after that scope is gone.
 * 
 * Prerequisites: You should be comfortable with functions,
 * scope, and basic JavaScript.
 * ============================================================
 */

// ============================================================
// 1. LEXICAL SCOPE — Where Variables Are Found
// ============================================================
// Before understanding closures, you need to understand
// lexical scope. "Lexical" means "based on where the code
// is written." JavaScript looks for variables by going up
// the scope chain — from the current scope to the parent
// scope, to the grandparent scope, and so on.

const global = "I am global";

function outer() {
  const outerVar = "I am in outer";

  function inner() {
    const innerVar = "I am in inner";
    console.log(global);   // Found in global scope
    console.log(outerVar); // Found in parent (outer) scope
    console.log(innerVar); // Found in current (inner) scope
  }

  inner();
}

outer();
// Output:
// I am global
// I am in outer
// I am in inner

// "inner" can access variables from "outer" because it is
// defined inside "outer". This is lexical scope.


// ============================================================
// 2. YOUR FIRST CLOSURE
// ============================================================
// A closure is created when a function is defined inside
// another function, and the inner function is returned.

function createGreeter(greeting) {
  // "greeting" is a variable in this function's scope.

  return function(name) {
    // This inner function "closes over" the "greeting" variable.
    // Even after createGreeter() finishes running, this function
    // still has access to "greeting".
    return `${greeting}, ${name}!`;
  };
}

const hello = createGreeter("Hello");
const howdy = createGreeter("Howdy");

// createGreeter("Hello") has finished running. Its scope is gone.
// But the function we returned still remembers "greeting" = "Hello".

console.log(hello("Alice"));  // Output: Hello, Alice!
console.log(hello("Bob"));    // Output: Hello, Bob!
console.log(howdy("Charlie")); // Output: Howdy, Charlie!

// Each call to createGreeter creates a new closure with
// its own "greeting" variable.


// ============================================================
// 3. CLOSURES FOR DATA PRIVACY
// ============================================================
// One of the most common uses of closures is to hide data
// from the outside world, similar to private fields in classes.

function createCounter() {
  let count = 0;  // This variable is hidden from the outside

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();

console.log(counter.increment());  // Output: 1
console.log(counter.increment());  // Output: 2
console.log(counter.increment());  // Output: 3
console.log(counter.decrement());  // Output: 2
console.log(counter.getCount());   // Output: 2

// console.log(counter.count);  // undefined — it is hidden!
// count is only accessible through the returned methods.
// This is encapsulation using closures.


// ============================================================
// 4. FUNCTION FACTORIES
// ============================================================
// Closures let you create functions that generate other
// functions with pre-configured behavior.

function createMultiplier(multiplier) {
  // The returned function closes over "multiplier"
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log(double(5));    // Output: 10
console.log(triple(5));    // Output: 15
console.log(tenTimes(5));  // Output: 50

// Each function has its own closure with its own "multiplier" value.


// ============================================================
// 5. CLOSURES IN LOOPS — The Classic Gotcha
// ============================================================
// This is a famous interview question and a common bug.

// THE PROBLEM:
// Using "var" in a for loop creates a single variable that
// all callbacks share.

console.log("\n--- The var Problem ---");

function varProblem() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log("var: " + i);
    }, 100);
  }
}

varProblem();
// Output (after 100ms):
// var: 3
// var: 3
// var: 3
// All three callbacks see i = 3 because "var" is function-scoped
// and the loop finished before the callbacks ran.

// THE FIX 1: Use "let" (block-scoped, creates a new variable each iteration)
console.log("\n--- The let Fix ---");

function letFix() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log("let: " + i);
    }, 100);
  }
}

letFix();
// Output (after 100ms):
// let: 0
// let: 1
// let: 2

// THE FIX 2: Use an IIFE (Immediately Invoked Function Expression)
// to create a new scope for each iteration
console.log("\n--- The IIFE Fix ---");

function iifeFix() {
  for (var i = 0; i < 3; i++) {
    (function(j) {
      setTimeout(function() {
        console.log("iife: " + j);
      }, 100);
    })(i);  // Pass "i" as argument "j" to the IIFE
  }
}

iifeFix();
// Output (after 100ms):
// iife: 0
// iife: 1
// iife: 2


// ============================================================
// 6. CLOSURES AND MEMORY
// ============================================================
// Closures keep references to the variables they close over.
// This means those variables cannot be garbage collected
// (freed from memory) as long as the closure exists.

function createHeavyClosure() {
  const largeArray = new Array(1000000).fill("data");
  
  return function() {
    // This function closes over "largeArray"
    // As long as this function exists, "largeArray" stays in memory
    return largeArray.length;
  };
}

const getLength = createHeavyClosure();
console.log(getLength());  // Output: 1000000

// "largeArray" is NOT garbage collected because getLength
// still has a reference to it.

// If you no longer need the closure, set it to null:
// const getLength = null;  // Now largeArray can be garbage collected


// ============================================================
// 7. MODULE PATTERN — Organizing Code with Closures
// ============================================================
// Before ES6 modules, closures were the primary way to
// organize code into private and public parts.

const ShoppingCart = (function() {
  // Private variables (hidden from outside)
  const items = [];
  let discount = 0;

  // Private functions
  function calculateTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  // Public API (returned object)
  return {
    addItem: function(name, price) {
      items.push({ name, price });
      console.log(`Added "${name}" ($${price})`);
    },

    removeItem: function(name) {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(`Removed "${name}"`);
      }
    },

    setDiscount: function(percentage) {
      discount = percentage;
      console.log(`Discount set to ${percentage}%`);
    },

    getTotal: function() {
      const total = calculateTotal();
      const discountAmount = total * (discount / 100);
      return total - discountAmount;
    },

    getItems: function() {
      // Return a copy to prevent external modification
      return [...items];
    },

    displayCart: function() {
      const items = this.getItems();
      console.log("\n🛒 Shopping Cart:");
      items.forEach(item => {
        console.log(`  - ${item.name}: $${item.price}`);
      });
      console.log(`\n  Subtotal: $${calculateTotal()}`);
      if (discount > 0) {
        console.log(`  Discount: ${discount}%`);
        console.log(`  Total:    $${this.getTotal()}`);
      }
      console.log("");
    }
  };
})();

// Using the module:
ShoppingCart.addItem("Laptop", 999);
ShoppingCart.addItem("Mouse", 29);
ShoppingCart.addItem("Keyboard", 79);
ShoppingCart.displayCart();

ShoppingCart.setDiscount(10);
ShoppingCart.displayCart();

// console.log(ShoppingCart.items);  // undefined — private!


// ============================================================
// 8. CLOSURES IN PRACTICAL SCENARIOS
// ============================================================

// Scenario 1: Event handler with state
function createClickTracker() {
  let clickCount = 0;

  return function() {
    clickCount++;
    console.log(`Button clicked ${clickCount} time(s)`);
  };
}

// In a browser, you would do:
// document.getElementById("myButton").addEventListener("click", createClickTracker());

// Scenario 2: Memoization (caching results)
function createMemoizedFunction(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key] !== undefined) {
      console.log(`  Cache hit for: ${key}`);
      return cache[key];
    }

    console.log(`  Computing for: ${key}`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveSquare = createMemoizedFunction(function(n) {
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += n * n;
  }
  return n * n;
});

console.log(expensiveSquare(5));  // Computing for: [5] → 25
console.log(expensiveSquare(5));  // Cache hit for: [5] → 25 (instant)
console.log(expensiveSquare(10)); // Computing for: [10] → 100


console.log("=== Closures Section Complete ===");
console.log("Move on to memory-and-engine to learn how JavaScript manages resources.");
