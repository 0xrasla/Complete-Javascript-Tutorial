# 05 — Functions

## What Is a Function?

A function is a reusable block of code that performs a specific task. You define it once, give it a name, and then "call" it whenever you need it. Functions help you avoid repeating yourself and keep your code organized.

Think of a function as a recipe: it has instructions (the code inside), it can take ingredients (parameters), and it can give you a result (return value).

---

## Why Do We Need Functions?

Without functions, you would have to copy and paste the same code every time you need it. Functions let you:

- **Reuse code** — write once, use many times
- **Organize logic** — break complex problems into small, manageable pieces
- **Accept input** — the same function can work with different values

---

## Declaring a Function

```javascript
function greet() {
  console.log("Hello, world!");
}

// The function is defined but NOT running yet.
// You need to "call" it:
greet();  // Output: Hello, world!
greet();  // You can call it as many times as you want
```

---

## Parameters and Arguments

Parameters are placeholders in the function definition. Arguments are the actual values you pass when calling it:

```javascript
function sayHello(name) {
  console.log("Hello, " + name + "!");
}

sayHello("Alice");   // Output: Hello, Alice!
sayHello("Bob");     // Output: Hello, Bob!

// Multiple parameters:
function add(a, b) {
  console.log(a + b);
}

add(3, 5);    // Output: 8
add(10, 20);  // Output: 30
```

---

## Return Values

A function can give back a value using `return`:

```javascript
function multiply(a, b) {
  return a * b;
}

const result = multiply(4, 5);
console.log(result);  // Output: 20

// You can use the returned value directly:
console.log(multiply(3, 7));  // Output: 21
```

---

## Arrow Functions (Modern Syntax)

Arrow functions are a shorter way to write functions:

```javascript
// Traditional:
function subtract(a, b) {
  return a - b;
}

// Arrow function:
const subtractArrow = (a, b) => {
  return a - b;
};

// Even shorter (single expression):
const subtractShort = (a, b) => a - b;

// Single parameter (parentheses optional):
const double = x => x * 2;
console.log(double(5));  // Output: 10
```

---

## Code Examples

### Example 1: Temperature Converter

```javascript
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

console.log(`${0}°C = ${celsiusToFahrenheit(0)}°F`);     // Output: 0°C = 32°F
console.log(`${100}°C = ${celsiusToFahrenheit(100)}°F`); // Output: 100°C = 212°F
```

### Example 2: Filtering Data

```javascript
function getEvenNumbers(arr) {
  const evens = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evens.push(arr[i]);
    }
  }
  return evens;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(getEvenNumbers(numbers));  // Output: [2, 4, 6, 8, 10]
```

### Example 3: Default Parameters

```javascript
function greetUser(name = "stranger") {
  console.log(`Hello, ${name}!`);
}

greetUser("Alice");  // Output: Hello, Alice!
greetUser();         // Output: Hello, stranger! (default value used)
```

---

## Files

| File | What It Covers |
|------|---------------|
| `functions.js` | Function declarations, parameters, return values, arrow functions, scope, callbacks |
