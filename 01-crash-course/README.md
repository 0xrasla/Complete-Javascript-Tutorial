# 01 — Crash Course

A fast-paced, high-level overview of JavaScript. This is not a deep dive — it is a quick tour to give you a mental map of what JavaScript can do before you start learning in detail.

---

## What Is JavaScript?

JavaScript is a programming language. It is the language that makes websites interactive. When you click a button and a menu opens, when you submit a form and see a success message, when a page updates without refreshing — that is JavaScript working behind the scenes.

Every modern web browser has a built-in JavaScript engine, which means you do not need to install anything. You just need a browser and a text editor.

---

## What Will You Learn Here?

This crash course covers the big picture in one file:

### Variables — Storing Information

```javascript
const name = "Alice";   // "const" cannot be reassigned
let age = 25;           // "let" CAN be changed
age = 26;               // This works
```

### Functions — Reusable Blocks

```javascript
function greet(personName) {
  return "Hello, " + personName + "!";
}

console.log(greet("Bob"));  // Output: Hello, Bob!
```

### Arrays — Lists of Things

```javascript
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);     // Output: apple
fruits.push("date");        // Add to end
```

### Objects — Structured Data

```javascript
const person = {
  name: "Charlie",
  age: 30
};
console.log(person.name);  // Output: Charlie
```

### Control Flow — Making Decisions

```javascript
const temperature = 30;
if (temperature > 25) {
  console.log("It's hot outside!");  // This runs
}
```

### Events — Responding to Users

```javascript
button.addEventListener("click", function() {
  alert("You clicked the button!");
});
```

---

## How to Use

1. Open `overview.js` in the browser console (paste the contents directly).
2. Read the comments — they explain every line.
3. Do not worry about understanding everything. The goal is exposure, not mastery.
4. After this, go to [02-beginner](../02-beginner/) to learn each topic in depth.

---

## Files

| File | What It Covers |
|------|---------------|
| `overview.js` | Variables, data types, functions, arrays, objects, and events — all in one file |
