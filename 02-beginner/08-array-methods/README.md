# 08 — Array Methods

## Why Array Methods Matter

Arrays store lists of data. But storing data is only useful if you can work with it — filtering, transforming, searching, and summarizing. JavaScript gives you powerful built-in methods for this. Mastering them is essential for writing clean, modern code.

---

## forEach — Run Something for Each Element

`forEach` executes a function once for each element in the array. It does **not** return a new array.

```javascript
const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(fruit, index) {
  console.log(`${index}: ${fruit}`);
});
// Output:
// 0: apple
// 1: banana
// 2: cherry
```

Use `forEach` when you want to perform a side effect (like logging or updating something) for each element.

---

## map — Transform Every Element

`map` creates a **new array** by applying a function to each element. The original array is not changed.

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled);  // Output: [2, 4, 6, 8, 10]
console.log(numbers);  // Output: [1, 2, 3, 4, 5] (unchanged)
```

Use `map` when you want to transform a list of values into a new list.

---

## filter — Keep Elements That Match a Condition

`filter` creates a **new array** containing only the elements that pass a test (return `true`).

```javascript
const scores = [85, 42, 93, 67, 71, 55];

const passing = scores.filter(function(score) {
  return score >= 70;
});

console.log(passing);  // Output: [85, 93, 71]
```

Use `filter` when you need a subset of your data.

---

## find — Get the First Match

`find` returns the **first element** that matches a condition, or `undefined` if nothing matches.

```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 }
];

const adult = users.find(function(user) {
  return user.age >= 18;
});

console.log(adult);  // Output: { name: "Alice", age: 25 }
```

Use `find` when you need a single element from a list.

---

## reduce — Combine Into a Single Value

`reduce` processes each element and accumulates a single result. It takes two arguments: a reducer function and an initial value.

```javascript
const numbers = [10, 20, 30, 40, 50];

const sum = numbers.reduce(function(accumulator, current) {
  return accumulator + current;
}, 0);

console.log(sum);  // Output: 150
```

How it works step by step:
- Start with `accumulator = 0`
- Add `10` → `accumulator = 10`
- Add `20` → `accumulator = 30`
- Add `30` → `accumulator = 60`
- Add `40` → `accumulator = 100`
- Add `50` → `accumulator = 150`

Use `reduce` when you need to boil an array down to a single value (sum, average, object, etc.).

---

## sort — Arrange Elements

`sort` rearranges elements **in place** (it changes the original array). By default, it sorts alphabetically as strings.

```javascript
const names = ["Charlie", "Alice", "Bob"];
names.sort();
console.log(names);  // Output: ["Alice", "Bob", "Charlie"]

// For numbers, provide a comparison function:
const numbers = [100, 1, 20, 5];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);  // Output: [1, 5, 20, 100]
```

---

## chaining — Combine Methods Together

You can call methods one after another. This is called **method chaining**.

```javascript
const people = [
  { name: "Alice", age: 25, score: 88 },
  { name: "Bob", age: 17, score: 92 },
  { name: "Charlie", age: 32, score: 75 },
  { name: "Diana", age: 29, score: 95 }
];

const result = people
  .filter(function(person) { return person.age >= 25; })   // Keep adults
  .map(function(person) { return person.name; })            // Get names only
  .sort();                                                   // Alphabetical order

console.log(result);  // Output: ["Alice", "Charlie", "Diana"]
```

Each method receives the output of the previous one. This keeps code clean and readable.

---

## Arrow Functions (Shorthand)

You will often see these methods written with arrow functions:

```javascript
const numbers = [1, 2, 3, 4, 5];

// These are equivalent:
const doubled1 = numbers.map(function(num) { return num * 2; });
const doubled2 = numbers.map(num => num * 2);
```

Arrow functions are shorter to write. We will cover them in more detail in the ES6+ section.

---

## Quick Reference

| Method | Returns | Mutates Original? | Use When |
|--------|---------|-------------------|----------|
| `forEach` | `undefined` | No | Running a side effect for each element |
| `map` | New array | No | Transforming every element |
| `filter` | New array | No | Keeping elements that match a condition |
| `find` | Single element | No | Getting the first match |
| `reduce` | Any value | No | Accumulating into a single result |
| `sort` | Same array | **Yes** | Arranging elements in order |

---

## Key Takeaways

1. **`map`, `filter`, `find`, and `reduce`** are the most important methods to learn — they cover the vast majority of array operations.
2. **Never mutate** when you can create a new array — it prevents hard-to-find bugs.
3. **Chain methods** together for clean, readable transformations.
4. **`sort` mutates** the original array — use it carefully.
