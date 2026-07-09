/**
 * ============================================================
 * MEMORY & JAVASCRIPT ENGINE — How It All Works Under the Hood
 * ============================================================
 * 
 * Understanding how JavaScript manages memory and executes
 * code helps you write better, faster programs.
 * 
 * Prerequisites: You should be comfortable with functions,
 * objects, closures, and async/await.
 * ============================================================
 */

// ============================================================
// 1. THE CALL STACK — Tracking What Is Running
// ============================================================
// JavaScript has ONE call stack. It tracks which function
// is currently executing. When you call a function, it is
// "pushed" onto the stack. When it returns, it is "popped" off.

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

// The call stack looks like this at each step:
//
// Step 1: first() is called
//   ┌─────────┐
//   │ first() │
//   └─────────┘
//
// Step 2: second() is called from first()
//   ┌──────────┐
//   │ second() │
//   │ first()  │
//   └──────────┘
//
// Step 3: third() is called from second()
//   ┌──────────┐
//   │ third()  │
//   │ second() │
//   │ first()  │
//   └──────────┘
//
// Step 4: third() finishes, popped off
//   ┌──────────┐
//   │ second() │
//   │ first()  │
//   └──────────┘
//
// Step 5: second() finishes, popped off
//   ┌─────────┐
//   │ first() │
//   └─────────┘
//
// Step 6: first() finishes, stack is empty

// Output:
// first start
// second start
// third
// second end
// first end


// ============================================================
// 2. STACK OVERFLOW — When the Stack Gets Too Deep
// ============================================================
// The call stack has a limit. If you add too many frames
// (usually through infinite recursion), you get a "stack
// overflow" error.

function infiniteRecursion() {
  return infiniteRecursion();  // Calls itself forever
}

// Uncomment to see the error:
// infiniteRecursion();
// RangeError: Maximum call stack size exceeded

// This is why recursion needs a base case (a condition
// to stop).


// ============================================================
// 3. THE MEMORY HEAP — Where Objects Live
// ============================================================
// While the call stack tracks function execution, the
// memory heap is where all objects, arrays, and functions
// are stored in memory.

const object1 = { name: "Alice" };   // Stored in the heap
const object2 = { name: "Bob" };     // Stored in the heap
const array = [1, 2, 3];            // Stored in the heap

// Variables (object1, object2, array) are stored on the stack.
// They POINT TO the actual data in the heap.


// ============================================================
// 4. GARBAGE COLLECTION — Automatic Memory Management
// ============================================================
// JavaScript automatically frees memory that is no longer
// needed. This is called "garbage collection" (GC).

// The GC works by finding objects that are no longer
// reachable (nothing points to them anymore).

let user = { name: "Alice" };
console.log(user.name);  // Output: Alice

// Now we reassign user to something else:
user = null;

// The original { name: "Alice" } object is now unreachable.
// The garbage collector will eventually free this memory.

// Common causes of memory leaks (things that PREVENT GC):

// LEAK 1: Forgotten event listeners
// If you add an event listener and never remove it,
// the callback and its closure stay in memory.

// LEAK 2: Closures holding large data
// If a closure references a large object, that object
// stays in memory as long as the closure exists.

// LEAK 3: Detached DOM elements
// If you remove an element from the page but still
// reference it in JavaScript, it stays in memory.


// ============================================================
// 5. MEMORY MANAGEMENT IN PRACTICE
// ============================================================
// Here is how to avoid common memory issues.

// BEST PRACTICE 1: Nullify references when done
function processData() {
  const largeData = new Array(1000000).fill("data");
  // Process the data...
  const result = largeData.filter(item => item !== "data");
  
  // When done, nullify the reference so GC can free it
  largeData.length = 0;  // Clear the array
  return result;
}

// BEST PRACTICE 2: Use WeakMap and WeakSet for object references
// These allow garbage collection of their entries when the
// key object is no longer referenced elsewhere.

const weakMap = new WeakMap();
let temporaryObject = { id: 1, data: "important" };

weakMap.set(temporaryObject, "some metadata");

console.log(weakMap.get(temporaryObject));  // Output: some metadata

// Now if we remove the reference to the object:
temporaryObject = null;

// The entry in weakMap will be garbage collected automatically.
// (Regular Map would keep the object alive.)


// ============================================================
// 6. THE EVENT LOOP — DEEP DIVE
// ============================================================
// The event loop is what makes async JavaScript possible.
// Let's trace exactly what happens.

console.log("\n--- Event Loop Deep Dive ---");

console.log("1. Synchronous code starts");

// Macrotask (setTimeout)
setTimeout(() => {
  console.log("5. setTimeout callback (macrotask)");
}, 0);

// Microtask (Promise)
Promise.resolve().then(() => {
  console.log("4. Promise callback (microtask)");
});

// Microtask (queueMicrotask)
queueMicrotask(() => {
  console.log("4.5. queueMicrotask callback");
});

console.log("2. Synchronous code continues");
console.log("3. Synchronous code ends");

// Output:
// 1. Synchronous code starts
// 2. Synchronous code continues
// 3. Synchronous code ends
// 4. Promise callback (microtask)
// 4.5. queueMicrotask callback
// 5. setTimeout callback (macrotask)

// THE RULE:
// 1. Run all synchronous code
// 2. Run ALL microtasks (Promises, queueMicrotask)
// 3. Run ONE macrotask (setTimeout, setInterval, etc.)
// 4. Repeat from step 2


// ============================================================
// 7. WHY THIS MATTERS — Practical Implications
// ============================================================

// Example 1: UI updates should be batched
function updateUIExpensive() {
  // BAD: This causes multiple re-renders
  for (let i = 0; i < 1000; i++) {
    document.body.innerHTML += `<div>Item ${i}</div>`;
  }
}

// BETTER: Build the string first, then update once
function updateUIBetter() {
  let html = "";
  for (let i = 0; i < 1000; i++) {
    html += `<div>Item ${i}</div>`;
  }
  document.body.innerHTML = html;
}

// Example 2: Long-running code blocks the main thread
function heavyComputation() {
  // This blocks the UI for the duration
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Busy wait for 3 seconds
  }
  console.log("Computation done!");
}

// The browser freezes during heavyComputation().
// This is why Web Workers exist — they run code in a
// separate thread.


// ============================================================
// 8. PERFORMANCE TIPS
// ============================================================

// TIP 1: Avoid creating objects in tight loops
// BAD:
// for (let i = 0; i < 1000000; i++) {
//   const obj = { value: i };  // Creates 1 million objects
// }

// BETTER: Reuse objects
const reusableObj = { value: 0 };
for (let i = 0; i < 1000000; i++) {
  reusableObj.value = i;
}

// TIP 2: Use primitive types when possible
// Primitives (string, number, boolean) are stored on the stack
// and are faster to access than objects on the heap.

// TIP 3: Minimize DOM manipulation
// DOM operations are expensive. Batch them together.

// TIP 4: Use requestAnimationFrame for animations
// It ensures your code runs at the right time (60fps).

function animate() {
  // Update animation here
  requestAnimationFrame(animate);
}
// requestAnimationFrame(animate);  // Uncomment to start

// TIP 5: Avoid memory leaks
// - Remove event listeners when elements are removed
// - Nullify references to large objects when done
// - Be careful with closures holding large data


// ============================================================
// 9. TOOLS FOR PROFILING
// ============================================================
// Browser DevTools provide powerful profiling tools:

// 1. Performance tab — Records and visualizes your code's
//    execution over time. Shows where time is spent.

// 2. Memory tab — Shows heap snapshots and helps you find
//    memory leaks. Look for objects that keep growing.

// 3. Console tab — Use console.time() and console.timeEnd()
//    to measure how long operations take.

console.log("\n--- Performance Measurement ---");

console.time("Array creation");
const bigArray = new Array(1000000).fill(0).map((_, i) => i);
console.timeEnd("Array creation");

console.time("Array filtering");
const filtered = bigArray.filter(n => n % 2 === 0);
console.timeEnd("Array filtering");

console.time("Array reduce");
const sum = bigArray.reduce((acc, n) => acc + n, 0);
console.timeEnd("Array reduce");

// Example output:
// Array creation: 45.234ms
// Array filtering: 12.567ms
// Array reduce: 3.891ms


console.log("\n=== Memory & Engine Section Complete ===");
console.log("Move on to design-patterns to learn common solutions to design problems.");
