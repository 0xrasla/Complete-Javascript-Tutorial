# Memory & JavaScript Engine

## What Is This About?

JavaScript does not run in a vacuum. It runs inside an engine (like V8 in Chrome, or SpiderMonkey in Firefox) that manages how your code is parsed, compiled, and executed. Understanding how the engine works helps you write faster, more efficient code.

This section covers how JavaScript manages memory, how the event loop really works, and how the engine optimizes your code.

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Call Stack** | Where JavaScript tracks which function is currently running |
| **Memory Heap** | Where objects and functions are stored in memory |
| **Garbage Collection** | How the engine automatically frees unused memory |
| **Event Loop** | The mechanism that lets JavaScript handle async operations |
| **Microtasks vs Macrotasks** | The priority order of async callbacks |

---

## Files

| File | What It Covers |
|------|---------------|
| `memory-and-engine.js` | Memory management, garbage collection, call stack, event loop deep dive, performance tips |
