# 03 — Operators

## What Are Operators?

Operators are symbols that perform operations on values. You use them to do math, compare values, combine conditions, and more.

---

## Types of Operators

### Arithmetic Operators — Math

These work exactly like they do in math class:

```javascript
console.log(10 + 5);   // Output: 15 (addition)
console.log(10 - 5);   // Output: 5  (subtraction)
console.log(10 * 5);   // Output: 50 (multiplication)
console.log(10 / 5);   // Output: 2  (division)
console.log(10 % 3);   // Output: 1  (remainder: 10 ÷ 3 leaves 1)
console.log(2 ** 3);   // Output: 8  (exponentiation: 2³)
```

### Comparison Operators — Checking Relationships

These compare two values and return `true` or `false`:

```javascript
console.log(5 > 3);      // Output: true  (5 is greater than 3)
console.log(5 < 3);      // Output: false (5 is not less than 3)
console.log(5 >= 5);     // Output: true  (5 is greater than or equal to 5)
console.log(5 <= 4);     // Output: false (5 is not less than or equal to 4)

// STRICT EQUALITY (===) — checks value AND type
console.log(5 === 5);        // Output: true
console.log(5 === "5");      // Output: false (different type!)

// Always use === and !== instead of == and !=
// because == does type conversion, leading to confusing results:
console.log(5 == "5");       // Output: true  (confusing!)
console.log(0 == false);     // Output: true  (confusing!)
```

### Logical Operators — Combining Conditions

```javascript
// AND (&&) — true only if BOTH sides are true
console.log(true && true);    // Output: true
console.log(true && false);   // Output: false

// OR (||) — true if AT LEAST ONE side is true
console.log(true || false);   // Output: true
console.log(false || false);  // Output: false

// NOT (!) — flips true to false and false to true
console.log(!true);           // Output: false
console.log(!false);          // Output: true
```

### Practical Example: Permission Check

```javascript
const userRole = "admin";
const userAge = 28;
const isVerified = true;

// Must be admin, 18+, AND verified:
const canDelete = userRole === "admin" && userAge >= 18 && isVerified;
console.log("Can delete posts:", canDelete);  // Output: true

// Must be admin OR editor:
const isEditor = false;
const canEdit = userRole === "admin" || isEditor;
console.log("Can edit posts:", canEdit);       // Output: true
```

### Assignment Operators — Updating Values

```javascript
let score = 0;

score += 10;   // Same as: score = score + 10  → 10
score -= 3;    // Same as: score = score - 3   → 7
score *= 2;    // Same as: score = score * 2   → 14
score /= 7;    // Same as: score = score / 7   → 2

console.log(score);  // Output: 2
```

### String Concatenation — Joining Text

```javascript
const firstName = "John";
const lastName = "Doe";

// Using + operator:
const fullName = firstName + " " + lastName;
console.log(fullName);  // Output: John Doe

// Using template literals (modern, cleaner):
const greeting = `Hello, ${firstName} ${lastName}!`;
console.log(greeting);  // Output: Hello, John Doe!
```

---

## Operator Precedence

JavaScript follows the same rules as math — parentheses first:

```javascript
console.log(2 + 3 * 4);      // Output: 14 (multiplication first)
console.log((2 + 3) * 4);    // Output: 20 (parentheses first)
```

---

## Files

| File | What It Covers |
|------|---------------|
| `operators.js` | All operator types with practical examples — fully commented |
