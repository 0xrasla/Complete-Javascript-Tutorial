/**
 * ============================================================
 * ES6+ FEATURES — Modern JavaScript Syntax
 * ============================================================
 * 
 * ES6 (2015) introduced major improvements. These features
 * are now standard in modern JavaScript.
 * ============================================================
 */

// ============================================================
// 1. Template Literals
// ============================================================
// Use backticks for strings with embedded expressions.

const name = "Alice";
const age = 25;

const greeting = `Hello, ${name}. You are ${age} years old.`;
console.log(greeting);

// Expressions inside ${}:
const price = 9.99;
console.log(`Total: $${(price * 3).toFixed(2)}`);  // Total: $29.97

// Multi-line strings:
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;
console.log(html);

console.log("---");

// ============================================================
// 2. Object Destructuring
// ============================================================
// Extract values from objects into variables.

const user = { name: "Alice", age: 25, city: "Paris" };

// Basic destructuring:
const { name: userName, age: userAge } = user;
console.log(userName);  // Alice
console.log(userAge);   // 25

// Rename variables:
const { name: n, age: a } = user;
console.log(n, a);  // Alice 25

// Default values:
const { name: uname, country = "Unknown" } = user;
console.log(country);  // Unknown

// Nesting:
const data = { user: { profile: { bio: "Developer" } } };
const { user: { profile: { bio } } } = data;
console.log(bio);  // Developer

console.log("---");

// ============================================================
// 3. Array Destructuring
// ============================================================
// Extract values from arrays into variables.

const colors = ["red", "green", "blue"];

const [first, second, third] = colors;
console.log(first, second, third);  // red green blue

// Skip elements:
const [red] = colors;           // red
const [, , blue] = colors;      // blue

// Rest pattern:
const [primary, ...rest] = colors;
console.log(primary);  // red
console.log(rest);     // ["green", "blue"]

// Swap variables:
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);  // 2 1

console.log("---");

// ============================================================
// 4. Function Parameter Destructuring
// ============================================================

function greet({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

greet({ name: "Alice", age: 25 });

// With defaults:
function createPoint({ x = 0, y = 0 } = {}) {
  return { x, y };
}

console.log(createPoint());             // { x: 0, y: 0 }
console.log(createPoint({ x: 10 }));    // { x: 10, y: 0 }

console.log("---");

// ============================================================
// 5. Spread Operator (...)
// ============================================================
// Expands an iterable into individual elements.

// Array spread:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Copy an array:
const copy = [...arr1];
console.log(copy);  // [1, 2, 3]

// Add to array:
const more = [0, ...arr1, 4];
console.log(more);  // [0, 1, 2, 3, 4]

// Object spread:
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings);  // { theme: "dark", lang: "en" }

console.log("---");

// ============================================================
// 6. Rest Parameters (...)
// ============================================================
// Collects remaining arguments into an array.

function sum(...numbers) {
  return numbers.reduce(function(total, n) {
    return total + n;
  }, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(10, 20, 30, 40)); // 100

// Rest with other parameters:
function log(level, ...messages) {
  messages.forEach(function(msg) {
    console.log(`[${level}] ${msg}`);
  });
}

log("INFO", "Server started", "Listening on port 3000");

console.log("---");

// ============================================================
// 7. Default Parameters
// ============================================================

function greet2(name = "stranger") {
  return `Hello, ${name}!`;
}

console.log(greet2("Alice"));  // Hello, Alice!
console.log(greet2());          // Hello, stranger!

// Defaults can be expressions:
function timestamp(date = new Date()) {
  return date.toISOString();
}

console.log(timestamp());

// Multiple defaults:
function createUser(name, role = "viewer", active = true) {
  return { name, role, active };
}

console.log(createUser("Alice"));                  // Alice, viewer, true
console.log(createUser("Bob", "admin"));           // Bob, admin, true
console.log(createUser("Charlie", "editor", false)); // Charlie, editor, false

console.log("---");

// ============================================================
// 8. Optional Chaining (?.)
// ============================================================
// Safely access nested properties without errors.

const user2 = {
  name: "Alice",
  address: { city: "Paris" }
};

// Safe property access:
console.log(user2?.address?.city);   // Paris
console.log(user2?.address?.zip);    // undefined (no error)
console.log(user2?.phone?.number);   // undefined (no error)

// Safe method call:
console.log(user2.getName?.());      // undefined (no error)

// Safe array access:
const arr = [1, 2, 3];
console.log(arr?.[0]);               // 1
console.log(arr?.[10]);              // undefined (no error)

// Without optional chaining, this would throw TypeError:
// const zip = user2.nonexistent.city;  // CRASH!

console.log("---");

// ============================================================
// 9. Nullish Coalescing (??)
// ============================================================
// Returns right side only when left is null or undefined.

const input1 = null;
const input2 = 0;
const input3 = "";
const input4 = false;

console.log(input1 ?? "default");  // "default" (null)
console.log(input2 ?? "default");  // 0 (kept)
console.log(input3 ?? "default");  // "" (kept)
console.log(input4 ?? "default");  // false (kept)

// Compare with || (falsy check):
console.log(input2 || "default");  // "default" (0 is falsy)
console.log(input2 ?? "default");  // 0 (only null/undefined)

// Practical use:
function getConfig(config = {}) {
  return {
    host: config.host ?? "localhost",
    port: config.port ?? 3000,
    debug: config.debug ?? false
  };
}

console.log(getConfig());                    // { host: "localhost", port: 3000, debug: false }
console.log(getConfig({ port: 8080 }));     // { host: "localhost", port: 8080, debug: false }

console.log("---");

// ============================================================
// 10. Shorthand Properties and Methods
// ============================================================

const x = 10, y = 20;

// Old way:
const point1 = { x: x, y: y };

// Shorthand:
const point2 = { x, y };
console.log(point2);  // { x: 10, y: 20 }

// Shorthand methods:
const calculator = {
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; },
  multiply(a, b) { return a * b; }
};

console.log(calculator.add(2, 3));       // 5
console.log(calculator.multiply(4, 5));  // 20

console.log("---");

// ============================================================
// 11. for...of — Iterate Over Values
// ============================================================

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
  console.log(char);
}

console.log("---");

// ============================================================
// 12. Practical Example — Combining ES6+ Features
// ============================================================

const products = [
  { name: "Laptop", price: 999, stock: 5 },
  { name: "Phone", price: 699, stock: 0 },
  { name: "Tablet", price: 449, stock: 12 },
  { name: "Watch", price: 299, stock: 3 }
];

// Destructuring in loops:
const inStock = products
  .filter(({ stock }) => stock > 0)
  .map(({ name, price }) => ({ name, price: `$${price}` }));

console.log("In stock:", inStock);
// [{ name: "Laptop", price: "$999" }, ...]

// Spread to create a summary:
const summary = {
  total: products.length,
  inStock: products.filter(p => p.stock > 0).length,
  ...products.reduce((acc, { price }) => {
    acc.totalValue = (acc.totalValue || 0) + price;
    return acc;
  }, {})
};

console.log("Summary:", summary);
