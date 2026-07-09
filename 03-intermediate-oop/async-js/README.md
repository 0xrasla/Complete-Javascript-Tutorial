# Async JavaScript

## What Is Asynchronous Programming?

JavaScript is single-threaded — it can only do one thing at a time. But many operations (like fetching data from a server, reading a file, or waiting for a timer) take time. If JavaScript waited for each operation to finish before moving on, the page would freeze.

Asynchronous programming lets JavaScript start a long-running task, move on to other work, and come back when the task is finished.

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Callback** | A function passed as an argument, to be called later |
| **Promise** | An object representing a future value (success or failure) |
| **async/await** | Modern syntax for working with Promises |
| **Event Loop** | The mechanism that lets JavaScript handle async operations |
| **Fetch API** | The built-in way to make HTTP requests |

---

## Files

| File | What It Covers |
|------|---------------|
| `async-js.js` | Callbacks, Promises, async/await, the event loop, fetch API |
