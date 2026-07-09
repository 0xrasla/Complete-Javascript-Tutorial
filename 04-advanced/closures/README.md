# Closures

## What Is a Closure?

A closure is a function that remembers the variables from the place where it was defined, even after that place no longer exists. It "closes over" the variables it needs, keeping them alive.

This is one of the most powerful and confusing features in JavaScript. Once you understand closures, many other concepts (modules, data privacy, function factories) become clear.

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Lexical Scope** | Variables are looked up based on where they are written in the code |
| **Closure** | A function that retains access to its lexical scope |
| **Encapsulation** | Using closures to hide data from the outside world |
| **Function Factory** | Creating functions that produce other functions |
| **Module Pattern** | Using closures to create private state |

---

## Files

| File | What It Covers |
|------|---------------|
| `closures.js` | Lexical scope, closure mechanics, practical patterns, common pitfalls |
