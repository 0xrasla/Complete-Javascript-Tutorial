# 02 — Data Types

## What Are Data Types?

Data types describe what kind of value a variable holds. JavaScript has several built-in types, and understanding them helps you predict how your code will behave and avoid bugs.

---

## Why Do Data Types Matter?

JavaScript treats different types of values differently. The string `"42"` and the number `42` are not the same thing:

```javascript
console.log("42" + 8);   // Output: "428" (string concatenation)
console.log(42 + 8);     // Output: 50   (math)
```

If you do not understand types, you will encounter confusing bugs.

---

## The Main Data Types

| Type | Example | What It Is |
|------|---------|------------|
| **String** | `"Hello"` | Text — any sequence of characters wrapped in quotes |
| **Number** | `42`, `3.14` | Integers and decimals (JavaScript treats them the same) |
| **Boolean** | `true`, `false` | A simple yes/no or on/off value |
| **Null** | `null` | An intentional absence of value ("nothing") |
| **Undefined** | `undefined` | A variable that has been declared but not yet assigned a value |
| **Object** | `{ name: "Alice" }` | A collection of key-value pairs |
| **Array** | `[1, 2, 3]` | An ordered list of values (technically a special kind of object) |

---

## Code Examples

### Strings

Strings are text wrapped in quotes. You can use single quotes, double quotes, or backticks:

```javascript
const single = 'Hello';
const double = "Hello";
const backtick = `Hello`;

// All three are identical.

// Backticks also let you embed variables:
const name = "Alice";
console.log(`Hello, ${name}!`);  // Output: Hello, Alice!

// Strings have useful properties:
const word = "JavaScript";
console.log(word.length);  // Output: 10
```

### Numbers

JavaScript has one type for all numbers — no difference between integers and decimals:

```javascript
const age = 25;
const price = 9.99;
const negative = -10;

// Basic math:
console.log(10 + 5);   // Output: 15
console.log(10 - 5);   // Output: 5
console.log(10 * 5);   // Output: 50
console.log(10 / 5);   // Output: 2
console.log(10 % 3);   // Output: 1 (remainder)
console.log(2 ** 3);   // Output: 8 (2 to the power of 3)
```

### Booleans

Booleans are `true` or `false`. They come from comparisons:

```javascript
console.log(10 > 5);     // Output: true
console.log(10 < 5);     // Output: false
console.log(10 === 10);  // Output: true
console.log(10 === 20);  // Output: false
```

### Null vs Undefined

Both represent "no value," but in different ways:

```javascript
// null = You intentionally set it to "nothing"
const emptyValue = null;

// undefined = JavaScript set it to "nothing" because you did not
let notAssigned;
console.log(notAssigned);  // Output: undefined
```

### Checking Types with `typeof`

```javascript
console.log(typeof "Hello");    // Output: string
console.log(typeof 42);         // Output: number
console.log(typeof true);       // Output: boolean
console.log(typeof undefined);  // Output: undefined
console.log(typeof null);       // Output: object (a known bug in JS)
```

---

## Truthy and Falsy Values

JavaScript treats some values as `true` and others as `false` when used in conditions, even if they are not actual booleans:

```javascript
// Falsy values (treated as false):
Boolean(0);         // Output: false
Boolean("");        // Output: false
Boolean(null);      // Output: false
Boolean(undefined); // Output: false

// Truthy values (treated as true):
Boolean(1);         // Output: true
Boolean("Hello");   // Output: true
Boolean([]);        // Output: true
Boolean({});        // Output: true

// Why does this matter?
const username = "Alice";
if (username) {
  console.log("User is logged in");  // This runs because "Alice" is truthy
}
```

---

## Files

| File | What It Covers |
|------|---------------|
| `data-types.js` | All primitive types, type checking, type conversion, and common gotchas |
