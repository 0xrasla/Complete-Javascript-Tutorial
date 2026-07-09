# 02 — Async JavaScript

## What Is Asynchronous Programming?

JavaScript is single-threaded — it can only do one thing at a time. But many operations (like fetching data from a server) take time. If JavaScript waited for each operation to finish before moving on, the page would freeze.

Asynchronous programming lets JavaScript start a long-running task, move on to other work, and come back when the task is finished.

---

## Callbacks — The Old Way

A callback is a function you pass to another function, to be called later:

```javascript
console.log("Before setTimeout");

setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("After setTimeout");
// Output:
// Before setTimeout
// After setTimeout
// (2 seconds later) This runs after 2 seconds
```

---

## Promises — A Better Way

A Promise represents a future value. It can succeed (resolve) or fail (reject):

```javascript
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Alice" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(user => console.log("User:", user.name))
  .catch(error => console.error("Error:", error.message));
// Output (after 1 second): User: Alice
```

---

## Async/Await — The Modern Way

`async/await` makes async code look like regular synchronous code:

```javascript
async function getUser(userId) {
  try {
    const user = await fetchUser(userId);
    console.log("User:", user.name);
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

getUser(1);  // Output: User: Alice
```

---

## Parallel Operations

Run multiple async operations at the same time:

```javascript
// Sequential (slow — takes 3 seconds):
const post1 = await fetchPost(1);
const post2 = await fetchPost(2);
const post3 = await fetchPost(3);

// Parallel (fast — takes 1 second):
const [p1, p2, p3] = await Promise.all([
  fetchPost(1),
  fetchPost(2),
  fetchPost(3)
]);
```

---

## Files

| File | What It Covers |
|------|---------------|
| `async-js.js` | Callbacks, Promises, async/await, the event loop, fetch API |
