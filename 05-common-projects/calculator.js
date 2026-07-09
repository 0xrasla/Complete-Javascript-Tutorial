/**
 * ============================================================
 * PROJECT: Calculator
 * ============================================================
 * 
 * A functional calculator that handles basic and advanced
 * operations. This project demonstrates clean code
 * organization, error handling, and user input processing.
 * 
 * Skills practiced: functions, operators, conditionals,
 * error handling, string parsing.
 * ============================================================
 */

// ============================================================
// CALCULATOR CLASS
// ============================================================

class Calculator {
  constructor() {
    this.result = 0;
    this.history = [];
    this.memory = 0;
  }

  // ============================================================
  // BASIC OPERATIONS
  // ============================================================

  add(a, b) {
    const result = a + b;
    this.#record(`${a} + ${b}`, result);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.#record(`${a} - ${b}`, result);
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.#record(`${a} * ${b}`, result);
    return result;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    const result = a / b;
    this.#record(`${a} / ${b}`, result);
    return result;
  }

  power(base, exponent) {
    const result = Math.pow(base, exponent);
    this.#record(`${base} ^ ${exponent}`, result);
    return result;
  }

  squareRoot(n) {
    if (n < 0) {
      throw new Error("Cannot calculate square root of negative number");
    }
    const result = Math.sqrt(n);
    this.#record(`√${n}`, result);
    return result;
  }

  // ============================================================
  // ADVANCED OPERATIONS
  // ============================================================

  percentage(value, percent) {
    const result = (value * percent) / 100;
    this.#record(`${percent}% of ${value}`, result);
    return result;
  }

  factorial(n) {
    if (n < 0) {
      throw new Error("Factorial is not defined for negative numbers");
    }
    if (!Number.isInteger(n)) {
      throw new Error("Factorial is only defined for integers");
    }
    if (n > 170) {
      throw new Error("Number too large for factorial");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    this.#record(`${n}!`, result);
    return result;
  }

  fibonacci(n) {
    if (n < 0) {
      throw new Error("Fibonacci is not defined for negative numbers");
    }
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    this.#record(`fib(${n})`, b);
    return b;
  }

  // ============================================================
  // MEMORY OPERATIONS
  // ============================================================

  memoryStore(value) {
    this.memory = value;
    console.log(`Memory stored: ${value}`);
  }

  memoryRecall() {
    console.log(`Memory recalled: ${this.memory}`);
    return this.memory;
  }

  memoryClear() {
    this.memory = 0;
    console.log("Memory cleared");
  }

  memoryAdd(value) {
    this.memory += value;
    console.log(`Memory updated: ${this.memory}`);
  }

  // ============================================================
  // HISTORY
  // ============================================================

  #record(operation, result) {
    this.history.push({
      operation,
      result,
      timestamp: new Date()
    });
    this.result = result;
  }

  showHistory() {
    console.log("\n===== CALCULATION HISTORY =====");
    if (this.history.length === 0) {
      console.log("  No calculations yet.");
    } else {
      this.history.forEach((entry, index) => {
        const time = entry.timestamp.toLocaleTimeString();
        console.log(`  ${index + 1}. [${time}] ${entry.operation} = ${entry.result}`);
      });
    }
    console.log("===============================\n");
  }

  clearHistory() {
    this.history = [];
    console.log("History cleared");
  }

  // ============================================================
  // CHAINING OPERATIONS
  // ============================================================

  // Start a chain with a value
  start(value) {
    this.result = value;
    return this;
  }

  // Chain methods
  then(fn) {
    this.result = fn(this.result);
    return this;
  }

  // Get the final result
  getResult() {
    return this.result;
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

const calc = new Calculator();

// Basic operations
console.log("===== BASIC OPERATIONS =====");
console.log(`5 + 3 = ${calc.add(5, 3)}`);         // Output: 8
console.log(`10 - 4 = ${calc.subtract(10, 4)}`);   // Output: 6
console.log(`6 * 7 = ${calc.multiply(6, 7)}`);     // Output: 42
console.log(`20 / 4 = ${calc.divide(20, 4)}`);     // Output: 5
console.log(`2 ^ 8 = ${calc.power(2, 8)}`);        // Output: 256
console.log(`√144 = ${calc.squareRoot(144)}`);     // Output: 12

// Advanced operations
console.log("\n===== ADVANCED OPERATIONS =====");
console.log(`25% of 200 = ${calc.percentage(200, 25)}`);  // Output: 50
console.log(`5! = ${calc.factorial(5)}`);                  // Output: 120
console.log(`fib(10) = ${calc.fibonacci(10)}`);            // Output: 55

// Error handling
console.log("\n===== ERROR HANDLING =====");
try {
  calc.divide(10, 0);
} catch (error) {
  console.log(`Error: ${error.message}`);  // Output: Cannot divide by zero
}

try {
  calc.squareRoot(-4);
} catch (error) {
  console.log(`Error: ${error.message}`);  // Output: Cannot calculate square root of negative number
}

// Memory operations
console.log("\n===== MEMORY OPERATIONS =====");
calc.memoryStore(42);
calc.memoryRecall();       // Output: Memory recalled: 42
calc.memoryAdd(8);
calc.memoryRecall();       // Output: Memory recalled: 50

// Method chaining
console.log("\n===== METHOD CHAINING =====");
const result = calc.start(10)
  .then(x => x * 2)    // 20
  .then(x => x + 5)    // 25
  .then(x => x / 5)    // 5
  .getResult();
console.log(`Chained result: ${result}`);  // Output: 5

// Show history
calc.showHistory();


// ============================================================
// CONSOLE CALCULATOR INTERFACE
// ============================================================
// Run this in the browser console for an interactive experience.

function runCalculator() {
  const calc = new Calculator();
  
  console.log("\n===== CONSOLE CALCULATOR =====");
  console.log("Available operations:");
  console.log("  calc.add(a, b)       — Addition");
  console.log("  calc.subtract(a, b)  — Subtraction");
  console.log("  calc.multiply(a, b)  — Multiplication");
  console.log("  calc.divide(a, b)    — Division");
  console.log("  calc.power(a, b)     — Power");
  console.log("  calc.squareRoot(a)   — Square root");
  console.log("  calc.percentage(a, b)— b% of a");
  console.log("  calc.factorial(n)    — n!");
  console.log("  calc.fibonacci(n)    — nth Fibonacci number");
  console.log("  calc.showHistory()   — View calculation history");
  console.log("==============================\n");
  
  return calc;
}

// Uncomment to run the interactive calculator:
// const myCalc = runCalculator();
