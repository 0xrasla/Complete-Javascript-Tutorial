# 09 — Error Handling

## Why Error Handling Matters

Code will break. Users will enter bad data, network requests will fail, files will be missing. Error handling lets you **anticipate** failures and **respond** gracefully instead of letting your program crash.

---

## What Happens Without Error Handling?

When JavaScript encounters an error, it throws an **exception** and stops executing the current function and everything that called it.

```javascript
function divide(a, b) {
  return a / b;
}

console.log(divide(10, 2));   // 5
console.log(divide(10, 0));   // Infinity
console.log(divide(10, "hi"));// NaN — no error, but wrong result
console.log(undeclaredVar);   // ReferenceError — crashes here
console.log("This never runs"); // Never reached
```

The program stops at the first error it encounters. Everything after is skipped.

---

## try...catch — Catching Errors

`try...catch` lets you **attempt** risky code and **handle** the error if one occurs.

```javascript
try {
  // Code that might fail
  const data = JSON.parse('{"name": "Alice"}');
  console.log(data.name);
} catch (error) {
  // Runs if an error occurs in the try block
  console.log("Something went wrong:", error.message);
}
```

You can have both `try` and `catch`, or either one alone:

```javascript
// try with catch
try {
  riskyOperation();
} catch (e) {
  handleError(e);
}

// catch only — runs if anything before it throws
try {
  firstThing();
  secondThing(); // if this throws, catch runs
  thirdThing();  // skipped if secondThing threw
} catch (e) {
  console.log("Caught:", e.message);
}
```

---

## throw — Creating Your Own Errors

Use `throw` to signal that something went wrong. You can throw any value, but custom `Error` objects are best practice.

```javascript
function setAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
  if (age > 150) {
    throw new Error("Age seems unrealistic");
  }
  return age;
}

try {
  console.log(setAge(25));    // 25
  console.log(setAge(-5));    // Throws: "Age cannot be negative"
  console.log(setAge(200));   // Never reached
} catch (e) {
  console.log("Error:", e.message);
}
```

---

## Error Types

JavaScript has several built-in error types. Knowing them helps you write precise error handling.

| Error Type | When It Happens |
|-----------|----------------|
| `Error` | General error (most common for custom errors) |
| `TypeError` | Wrong type (e.g., calling a non-function, accessing property of null) |
| `ReferenceError` | Variable does not exist |
| `RangeError` | Number is out of range (e.g., recursion too deep) |
| `SyntaxError` | Code cannot be parsed (e.g., missing bracket) |
| `URIError` | Invalid URI encoding |

```javascript
// TypeError
try {
  const obj = null;
  console.log(obj.name);
} catch (e) {
  console.log(e instanceof TypeError);  // true
}

// ReferenceError
try {
  console.log(nonExistentVar);
} catch (e) {
  console.log(e instanceof ReferenceError);  // true
}

// RangeError
try {
  function recurse() { recurse(); }
  recurse();
} catch (e) {
  console.log(e instanceof RangeError);  // true
}
```

---

## finally — Always Run This Code

`finally` runs **no matter what** — whether the try block succeeds or an error is caught.

```javascript
function readFile(filename) {
  try {
    console.log(`Reading ${filename}...`);
    if (!filename) throw new Error("No filename provided");
    console.log(`File content of ${filename}`);
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    console.log("Cleanup: closing file handle");
  }
}

readFile("data.txt");
// Output:
// Reading data.txt...
// File content of data.txt
// Cleanup: closing file handle

readFile("");
// Output:
// Reading ...
// Error: No filename provided
// Cleanup: closing file handle
```

Use `finally` for cleanup tasks: closing files, clearing timers, releasing resources.

---

## Practical Patterns

### Validate Input Early

```javascript
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
  console.log(divide(10, 2));     // 5
  console.log(divide("10", 2));   // TypeError
  console.log(divide(10, 0));     // RangeError
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`);
}
```

### Fail Gracefully in User Code

```javascript
function getUserName(users, id) {
  try {
    return users.find(u => u.id === id).name;
  } catch (e) {
    return "Unknown User";
  }
}
```

### Re-throw with Context

```javascript
function processPayment(amount) {
  try {
    validateAmount(amount);
    chargeCard(amount);
  } catch (e) {
    throw new Error(`Payment failed: ${e.message}`);
  }
}
```

---

## Key Takeaways

1. **Use `try...catch`** for operations that might fail (parsing, network requests, file access).
2. **`throw` your own errors** with clear messages — don't return magic values like `-1` or `null`.
3. **Use specific error types** (`TypeError`, `RangeError`) when they apply.
4. **`finally`** is for cleanup code that must run regardless of success or failure.
5. **Don't swallow errors** — at minimum, log them. Silently catching errors hides bugs.
