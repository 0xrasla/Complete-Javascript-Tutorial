# 10 — ES6+ Features

## Why ES6+ Matters

ECMAScript 2015 (ES6) introduced major improvements to JavaScript. Many features that look "new" in modern code are actually from 2015. Understanding them is essential for reading and writing modern JavaScript.

---

## Template Literals — String Interpolation

Template literals use backticks (`` ` ``) instead of quotes. They support **embedded expressions** and **multi-line strings**.

```javascript
const name = "Alice";
const age = 25;

// Old way:
const greeting1 = "Hello, " + name + ". You are " + age + " years old.";

// Template literal:
const greeting2 = `Hello, ${name}. You are ${age} years old.`;

// Multi-line strings:
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;
```

Use `${expression}` inside backticks to embed any JavaScript expression.

---

## Destructuring — Unpack Values

Destructuring extracts values from arrays or objects into distinct variables.

### Object Destructuring

```javascript
const user = { name: "Alice", age: 25, city: "Paris" };

// Old way:
const name1 = user.name;
const age1 = user.age;

// Destructuring:
const { name, age } = user;
console.log(name);  // Alice
console.log(age);   // 25

// Rename variables:
const { name: userName, age: userAge } = user;

// Default values:
const { name, age, country = "Unknown" } = user;
console.log(country);  // Unknown
```

### Array Destructuring

```javascript
const colors = ["red", "green", "blue"];

// Old way:
const first = colors[0];
const second = colors[1];

// Destructuring:
const [red, green, blue] = colors;
console.log(red);   // red
console.log(green); // green

// Skip elements:
const [firstColor] = colors;       // "red"
const [, , thirdColor] = colors;   // "blue"

// Rest pattern:
const [primary, ...rest] = colors;
console.log(primary); // red
console.log(rest);    // ["green", "blue"]
```

### Function Parameter Destructuring

```javascript
function greet({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

greet({ name: "Alice", age: 25 });

// With defaults:
function createPoint({ x = 0, y = 0 } = {}) {
  return { x, y };
}

console.log(createPoint());              // { x: 0, y: 0 }
console.log(createPoint({ x: 10 }));     // { x: 10, y: 0 }
```

---

## Spread & Rest — Expand or Collect

### Spread (`...`) — Expands an iterable

```javascript
// Array spread:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Copy an array:
const copy = [...arr1];

// Object spread:
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings);  // { theme: "dark", lang: "en" }
// Last value wins — userPrefs overrides defaults
```

### Rest (`...`) — Collects into an array

```javascript
// Rest in function parameters:
function sum(...numbers) {
  return numbers.reduce(function(total, n) {
    return total + n;
  }, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(10, 20, 30, 40)); // 100

// Rest in destructuring:
const [first, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);      // 1
console.log(remaining);  // [2, 3, 4, 5]
```

---

## Default Parameters

Function parameters can have default values that are used when no argument is provided.

```javascript
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));  // Hello, Alice!
console.log(greet());          // Hello, stranger!

// Defaults can be expressions:
function timestamp(date = new Date()) {
  return date.toISOString();
}

console.log(timestamp());  // Current timestamp
```

---

## Optional Chaining (`?.`) — Safe Property Access

Access nested properties without worrying if an intermediate value is `null` or `undefined`.

```javascript
const user = {
  name: "Alice",
  address: {
    city: "Paris"
  }
};

// Without optional chaining:
const city1 = user.address && user.address.city;

// With optional chaining:
const city2 = user?.address?.city;
console.log(city2);  // Paris

// If address doesn't exist:
const zip = user?.address?.zip;
console.log(zip);  // undefined (no error)

// Works with methods and arrays:
const result = user?.getName?.();  // undefined (no error)
const item = arr?.[0];              // First element or undefined
```

Without `?.`, accessing `user.nonexistent.city` would throw a `TypeError`.

---

## Nullish Coalescing (`??`) — Fallback for Null/Undefined

`??` returns the right side only when the left side is `null` or `undefined` (not for `0`, `""`, or `false`).

```javascript
const input = null;
const value1 = input ?? "default";  // "default"

const input2 = 0;
const value2 = input2 ?? "default";  // 0 (kept — not null/undefined)

const input3 = "";
const value3 = input3 ?? "default";  // "" (kept — not null/undefined)

// Compare with ||:
const value4 = input2 || "default";  // "default" (0 is falsy)
const value5 = input2 ?? "default";  // 0 (only null/undefined trigger ??)

// Practical use:
function getConfig(config) {
  return {
    host: config.host ?? "localhost",
    port: config.port ?? 3000,
    debug: config.debug ?? false
  };
}
```

Use `??` when `0`, `""`, or `false` are valid values you want to keep.

---

## Shorthand Properties and Methods

When a variable name matches the property name, you can skip the repetition.

```javascript
const name = "Alice";
const age = 25;

// Old way:
const user1 = { name: name, age: age };

// Shorthand:
const user2 = { name, age };

// Shorthand methods:
const calculator = {
  // Old: add: function(a, b) { ... }
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; }
};
```

---

## for...of — Iterate Over Values

`for...of` loops over iterable values (arrays, strings, maps, sets).

```javascript
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}

// With index:
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// Strings are iterable:
for (const char of "hello") {
  console.log(char);  // h, e, l, l, o
}
```

Compare with `for...in`, which iterates over **keys/indices**:

```javascript
const arr = ["a", "b", "c"];
for (const i in arr) {
  console.log(i);  // "0", "1", "2" (strings!)
}

for (const val of arr) {
  console.log(val);  // "a", "b", "c"
}
```

---

## Quick Reference

| Feature | Syntax | Use When |
|---------|--------|----------|
| Template literals | `` `Hello, ${name}` `` | Building strings with variables |
| Destructuring | `const { a, b } = obj` | Extracting values from objects/arrays |
| Spread | `[...arr]`, `{...obj}` | Combining or copying arrays/objects |
| Rest | `function(...args)` | Collecting remaining values |
| Default params | `function(x = 5)` | Providing fallback values |
| Optional chaining | `user?.address?.city` | Safe nested property access |
| Nullish coalescing | `value ?? "default"` | Fallback only for null/undefined |
| Shorthand | `{ name, age }` | Variables matching property names |
| for...of | `for (const x of arr)` | Iterating over values |

---

## Key Takeaways

1. **Template literals** replace string concatenation — use them everywhere.
2. **Destructuring** makes code shorter and more readable.
3. **Spread/rest** (`...`) are extremely versatile — learn both uses.
4. **Optional chaining** (`?.`) prevents `TypeError` on nested access.
5. **Nullish coalescing** (`??`) is safer than `||` when `0` or `""` are valid.
