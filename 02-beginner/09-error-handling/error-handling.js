/**
 * ============================================================
 * ERROR HANDLING — Catching and Managing Failures
 * ============================================================
 * 
 * Code will break. Error handling lets you anticipate
 * failures and respond gracefully instead of crashing.
 * ============================================================
 */

// ============================================================
// 1. What Happens Without Error Handling
// ============================================================
// When JavaScript hits an error, it THROWS an exception
// and stops executing.

function divide(a, b) {
  return a / b;
}

console.log(divide(10, 2));    // 5
console.log(divide(10, 0));    // Infinity (no error)
console.log(divide(10, "hi")); // NaN (no error, but wrong)

// This would crash the program:
// console.log(undeclaredVar);  // ReferenceError — stops here

console.log("---");

// ============================================================
// 2. try...catch — Catching Errors
// ============================================================
// Attempt risky code. Handle errors if they occur.

try {
  const data = JSON.parse('{"name": "Alice"}');
  console.log("Parsed:", data.name);  // Alice
} catch (error) {
  console.log("Parse failed:", error.message);
}

// Catching a parse error:
try {
  const bad = JSON.parse("not valid json");
} catch (error) {
  console.log("Parse failed:", error.message);
  // "Unexpected token n in JSON at position 0"
}

console.log("---");

// ============================================================
// 3. throw — Creating Your Own Errors
// ============================================================
// Signal that something went wrong with a clear message.

function setAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 0) {
    throw new RangeError("Age cannot be negative");
  }
  if (age > 150) {
    throw new RangeError("Age seems unrealistic");
  }
  return age;
}

// Handling different error types:
const testAges = [25, -5, 200, "old"];

testAges.forEach(function(input) {
  try {
    const age = setAge(input);
    console.log(`Age set to ${age}`);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(`Type error: ${e.message}`);
    } else if (e instanceof RangeError) {
      console.log(`Range error: ${e.message}`);
    } else {
      console.log(`Unexpected error: ${e.message}`);
    }
  }
});
// Output:
// Age set to 25
// Range error: Age cannot be negative
// Range error: Age seems unrealistic
// Type error: Age must be a number

console.log("---");

// ============================================================
// 4. Error Types
// ============================================================
// JavaScript has built-in error types for different problems.

// TypeError — wrong type
try {
  const obj = null;
  console.log(obj.name);
} catch (e) {
  console.log("TypeError?", e instanceof TypeError);  // true
}

// ReferenceError — variable doesn't exist
try {
  console.log(nonExistentVar);
} catch (e) {
  console.log("ReferenceError?", e instanceof ReferenceError);  // true
}

// RangeError — number out of range
try {
  const arr = new Array(-1);
} catch (e) {
  console.log("RangeError?", e instanceof RangeError);  // true
}

console.log("---");

// ============================================================
// 5. finally — Always Runs
// ============================================================
// finally runs whether try succeeds or catch handles an error.

function processFile(filename) {
  try {
    console.log(`Opening ${filename}`);
    if (!filename) throw new Error("No filename");
    console.log(`Processing ${filename}`);
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    console.log("Closing file handle");  // Always runs
  }
}

processFile("data.txt");
// Opening data.txt
// Processing data.txt
// Closing file handle

processFile("");
// Opening 
// Error: No filename
// Closing file handle

console.log("---");

// ============================================================
// 6. Practical Pattern — Input Validation
// ============================================================

function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log("10 / 2 =", divide(10, 2));       // 5
  console.log('"10" / 2 =', divide("10", 2));    // TypeError
  console.log("10 / 0 =", divide(10, 0));         // RangeError
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`);
}

console.log("---");

// ============================================================
// 7. Practical Pattern — Fail Gracefully
// ============================================================

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

function getUserName(id) {
  try {
    return users.find(function(u) { return u.id === id; }).name;
  } catch (e) {
    return "Unknown User";
  }
}

console.log(getUserName(1));   // Alice
console.log(getUserName(99));  // Unknown User (no crash)

console.log("---");

// ============================================================
// 8. Practical Pattern — Re-throw with Context
// ============================================================
// Catch an error, add context, and throw it again.

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
}

function registerUser(email) {
  try {
    validateEmail(email);
    console.log(`Registered: ${email}`);
  } catch (e) {
    throw new Error(`Registration failed: ${e.message}`);
  }
}

try {
  registerUser("alice@example.com");  // Registered: alice@example.com
  registerUser("not-an-email");       // Throws with context
} catch (e) {
  console.log(e.message);
  // "Registration failed: Invalid email format"
}

console.log("---");

// ============================================================
// 9. Real-World Example — Form Validator
// ============================================================

function validateForm(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !data.email.includes("@")) {
    errors.push("Valid email is required");
  }

  if (data.age !== undefined) {
    if (typeof data.age !== "number") {
      errors.push("Age must be a number");
    } else if (data.age < 18) {
      errors.push("Must be at least 18");
    } else if (data.age > 120) {
      errors.push("Age seems unrealistic");
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }

  return true;
}

// Valid submission:
try {
  validateForm({ name: "Alice", email: "alice@example.com", age: 25 });
  console.log("Form valid!");
} catch (e) {
  console.log("Validation error:", e.message);
}

// Invalid submission:
try {
  validateForm({ name: "", email: "bad", age: 15 });
  console.log("Form valid!");
} catch (e) {
  console.log("Validation error:", e.message);
  // "Name must be at least 2 characters; Valid email is required; Must be at least 18"
}
