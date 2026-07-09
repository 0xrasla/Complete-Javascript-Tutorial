# 02 — Memory & JavaScript Engine

## What Is This About?

JavaScript does not run in a vacuum. It runs inside an engine (like V8 in Chrome) that manages how your code is parsed, compiled, and executed. Understanding how the engine works helps you write faster, more efficient code.

---

## The Call Stack — Tracking What Is Running

JavaScript has ONE call stack. It tracks which function is currently executing:

```javascript
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third");
}

first();
// Output: first start → second start → third → second end → first end
```

When `second()` is called from `first()`, it is pushed onto the stack. When it finishes, it is popped off.

---

## Garbage Collection — Automatic Memory Management

JavaScript automatically frees memory that is no longer needed:

```javascript
let user = { name: "Alice" };
console.log(user.name);  // Output: Alice

user = null;  // The original object is now unreachable
// The garbage collector will eventually free this memory
```

**Common memory leaks to avoid:**
- Forgotten event listeners
- Closures holding large data
- Detached DOM elements

---

## The Event Loop — Deep Dive

The event loop is what makes async JavaScript possible:

```javascript
console.log("1. Synchronous");

setTimeout(() => console.log("4. setTimeout"), 0);

Promise.resolve().then(() => console.log("3. Promise"));

console.log("2. Synchronous");

// Output: 1 → 2 → 3 → 4
```

**The rule:**
1. Run all synchronous code
2. Run ALL microtasks (Promises)
3. Run ONE macrotask (setTimeout)

---

## Performance Tips

```javascript
// BAD: Multiple DOM updates
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += `<div>Item ${i}</div>`;
}

// BETTER: Build string first, update once
let html = "";
for (let i = 0; i < 1000; i++) {
  html += `<div>Item ${i}</div>`;
}
document.body.innerHTML = html;
```

---

## Files

| File | What It Covers |
|------|---------------|
| `memory-and-engine.js` | Memory management, garbage collection, call stack, event loop deep dive, performance tips |
