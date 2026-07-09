# 01 — Variables

## What Is a Variable?

A variable is a named container that holds a value. Think of it as a labeled box — you put something inside (a number, a word, a list), give the box a name, and use that name to retrieve or change what is inside later.

In programming, variables are how you store information that your code needs to use.

---

## Why Do We Need Variables?

Without variables, you would have to remember and retype every value manually. Variables let you:

- **Store data** for later use (a user's name, a score, a price)
- **Reuse values** without retyping them
- **Track changes** (a counter that goes up, a balance that changes)

---

## Creating Variables: `const` and `let`

JavaScript gives you two keywords to create variables:

### `const` — For Values That Never Change

```javascript
const pi = 3.14159;
const userName = "Alice";
const isLoggedIn = true;

console.log(pi);          // Output: 3.14159
console.log(userName);    // Output: Alice
console.log(isLoggedIn);  // Output: true
```

Use `const` when the value should stay the same throughout your code. If you try to change it, JavaScript will give you an error:

```javascript
const pi = 3.14;
pi = 3.14159;  // Error: Assignment to constant variable.
```

### `let` — For Values That Change

```javascript
let score = 0;
console.log(score);       // Output: 0

score = 10;               // This is allowed because we used "let"
console.log(score);       // Output: 10

score = score + 5;        // Adding 5 to the current score
console.log(score);       // Output: 15
```

Use `let` when the value will change over time (a counter, a toggle, user input).

---

## When to Use Which?

| Situation | Use |
|-----------|-----|
| The value should never change | `const` |
| The value will change later | `let` |
| Old code uses `var` | Avoid it — use `const` or `let` instead |

**Rule of thumb:** Start with `const` for everything. Only switch to `let` when you know the value will change.

---

## Naming Rules

Variable names must follow these rules:

- **Cannot** start with a number (`2name` is invalid)
- **Cannot** contain spaces (`user name` is invalid)
- **Cannot** be reserved words (`const`, `let`, `function`, etc.)
- **Are** case-sensitive (`name` and `Name` are different things)

**Convention:** Use camelCase (lowercase first word, capitalize subsequent words):

```javascript
const firstName = "John";      // Good
const userAge = 25;            // Good
const isActive = true;         // Good

// const first_name = "John";  // Works but not standard JavaScript style
// const userage = 25;         // Works but hard to read
```

---

## Code Examples

### Example 1: Storing Personal Information

```javascript
const name = "Alice";
const age = 25;
const isStudent = true;

console.log(name);       // Output: Alice
console.log(age);        // Output: 25
console.log(isStudent);  // Output: true
```

### Example 2: Reassigning with `let`

```javascript
let temperature = 20;
console.log("Morning: " + temperature);   // Output: Morning: 20

temperature = 28;
console.log("Afternoon: " + temperature); // Output: Afternoon: 28

temperature = temperature + 3;
console.log("Evening: " + temperature);   // Output: Evening: 31
```

### Example 3: Template Literals (Modern String Building)

Instead of concatenating strings with `+`, use backticks and `${}`:

```javascript
const userName = "Alice";
const userAge = 25;

// Old way (works but messy):
const oldGreeting = "Hello, " + userName + "! You are " + userAge + " years old.";

// Modern way (cleaner):
const newGreeting = `Hello, ${userName}! You are ${userAge} years old.`;

console.log(newGreeting);
// Output: Hello, Alice! You are 25 years old.
```

### Example 4: Practical — Shopping Cart Calculation

```javascript
const itemPrice = 9.99;
const quantity = 3;
const taxRate = 0.08;

let subtotal = itemPrice * quantity;
let tax = subtotal * taxRate;
let total = subtotal + tax;

console.log("Subtotal: " + subtotal);  // Output: Subtotal: 29.97
console.log("Tax: " + tax);            // Output: Tax: 2.3976
console.log("Total: " + total);        // Output: Total: 32.3676
```

---

## Files

| File | What It Covers |
|------|---------------|
| `variables.js` | Declaration, assignment, const vs let, naming, scope basics — all fully commented |
