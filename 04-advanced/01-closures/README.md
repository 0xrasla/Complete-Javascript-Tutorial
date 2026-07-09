# 01 — Closures

## What Is a Closure?

A closure is a function that remembers the variables from the place where it was defined, even after that place no longer exists. It "closes over" the variables it needs, keeping them alive.

This is one of the most powerful and confusing features in JavaScript. Once you understand closures, many other concepts (modules, data privacy, function factories) become clear.

---

## Lexical Scope — Where Variables Are Found

Before understanding closures, you need to understand lexical scope. JavaScript looks for variables by going up the scope chain — from the current scope to the parent scope, to the grandparent scope, and so on:

```javascript
const global = "I am global";

function outer() {
  const outerVar = "I am in outer";

  function inner() {
    const innerVar = "I am in inner";
    console.log(global);   // Found in global scope
    console.log(outerVar); // Found in parent (outer) scope
    console.log(innerVar); // Found in current (inner) scope
  }

  inner();
}

outer();
// Output: I am global, I am in outer, I am in inner
```

---

## Your First Closure

A closure is created when a function is defined inside another function, and the inner function is returned:

```javascript
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const hello = createGreeter("Hello");
const howdy = createGreeter("Howdy");

console.log(hello("Alice"));   // Output: Hello, Alice!
console.log(howdy("Charlie")); // Output: Howdy, Charlie!
```

Even after `createGreeter("Hello")` finishes running, the returned function still remembers `greeting = "Hello"`.

---

## Closures for Data Privacy

One of the most common uses of closures is to hide data from the outside world:

```javascript
function createCounter() {
  let count = 0;  // Hidden from the outside

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment());  // Output: 1
console.log(counter.increment());  // Output: 2
console.log(counter.getCount());   // Output: 2
// console.log(counter.count);     // undefined — hidden!
```

---

## Function Factories

Closures let you create functions that generate other functions:

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // Output: 10
console.log(triple(5));  // Output: 15
```

---

## Files

| File | What It Covers |
|------|---------------|
| `closures.js` | Lexical scope, closure mechanics, practical patterns, common pitfalls |
