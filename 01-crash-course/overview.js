/**
 * ============================================================
 * CRASH COURSE: JavaScript in 30 Minutes
 * ============================================================
 * 
 * This file is a fast-paced tour of JavaScript. Every concept
 * is explained in comments. Copy this entire file into your
 * browser console (Right-click → Inspect → Console) and run it.
 * 
 * Do NOT worry about understanding everything. The goal is
 * to see what JavaScript looks like before you study it in depth.
 * ============================================================
 */

// ============================================================
// 1. VARIABLES — Storing Information
// ============================================================
// A variable is like a labeled box. You put a value inside,
// give it a name, and use that name to retrieve the value later.

const name = "Alice";       // "const" means this value cannot be reassigned
let age = 25;               // "let" means this value CAN be changed

console.log(name);          // Output: Alice
console.log(age);           // Output: 25

age = 26;                   // This is allowed because we used "let"
console.log(age);           // Output: 26


// ============================================================
// 2. DATA TYPES — The Kinds of Values JavaScript Understands
// ============================================================
// JavaScript has several built-in types. The most common ones:

const text = "Hello";       // String — text wrapped in quotes
const number = 42;          // Number — integers and decimals
const decimal = 3.14;       // Number — decimals are just numbers
const isHappy = true;       // Boolean — true or false
const empty = null;         // Null — an intentional "nothing"

console.log(typeof text);   // Output: string
console.log(typeof number); // Output: number
console.log(typeof isHappy);// Output: boolean


// ============================================================
// 3. FUNCTIONS — Reusable Blocks of Code
// ============================================================
// A function is a recipe. You define it once, and use it
// whenever you need it. It can take inputs and return outputs.

function greet(personName) {
  return "Hello, " + personName + "!";
}

console.log(greet("Bob"));  // Output: Hello, Bob!

// Arrow function (modern syntax, same thing, shorter)
const add = (a, b) => {
  return a + b;
};

console.log(add(3, 5));     // Output: 8


// ============================================================
// 4. ARRAYS — Lists of Things
// ============================================================
// An array is an ordered list. Think of it as a row of boxes,
// each holding a value, numbered starting from 0.

const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]);     // Output: apple (first item, index 0)
console.log(fruits[1]);     // Output: banana (second item, index 1)
console.log(fruits.length); // Output: 3 (total number of items)

// Adding to the end
fruits.push("date");
console.log(fruits);        // Output: ["apple", "banana", "cherry", "date"]


// ============================================================
// 5. OBJECTS — Structured Data with Labels
// ============================================================
// An object stores data in key-value pairs. Think of it as
// a form where each field has a name and a value.

const person = {
  name: "Charlie",
  age: 30,
  isStudent: false
};

console.log(person.name);   // Output: Charlie
console.log(person["age"]); // Output: 30 (alternate access syntax)


// ============================================================
// 6. CONTROL FLOW — Making Decisions
// ============================================================
// Programs make decisions based on conditions.

const temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");   // This runs because 30 > 25
} else if (temperature > 15) {
  console.log("It's nice outside.");
} else {
  console.log("It's cold outside.");
}

// Loop — repeating an action
for (let i = 0; i < 3; i++) {
  console.log("Loop iteration: " + i);
  // Output:
  // Loop iteration: 0
  // Loop iteration: 1
  // Loop iteration: 2
}


// ============================================================
// 7. DOM MANIPULATION — Changing the Webpage
// ============================================================
// The DOM (Document Object Model) is JavaScript's way of
// interacting with the HTML page. You can change what the
// user sees.

// Uncomment the lines below if you are running this in an
// HTML file (they will not work in a blank console page).

// document.body.innerHTML = "<h1>Hello from JavaScript!</h1>";
// document.body.style.backgroundColor = "lightblue";
// document.body.style.fontFamily = "Arial";


// ============================================================
// 8. EVENTS — Responding to User Actions
// ============================================================
// Events let JavaScript react when the user does something:
// clicks a button, types in a field, scrolls, etc.

// Uncomment to test in an HTML file:

// const button = document.createElement("button");
// button.textContent = "Click me!";
// button.addEventListener("click", function() {
//   alert("You clicked the button!");
// });
// document.body.appendChild(button);


// ============================================================
// 9. ASYNC JAVASCRIPT — Waiting for Things
// ============================================================
// Some operations take time (fetching data from a server).
// JavaScript handles this without freezing the page.

// This is a simple timeout — it waits 2 seconds then runs code.
console.log("Before timeout");

setTimeout(() => {
  console.log("2 seconds have passed!");  // This runs after 2 seconds
}, 2000);

console.log("After timeout (this runs immediately, not after 2 seconds)");

// The output order will be:
// Before timeout
// After timeout (this runs immediately, not after 2 seconds)
// 2 seconds have passed! (this comes last, even though it's listed second)


// ============================================================
// CONSOLE
// ============================================================
// console.log() is your best friend. It prints values to the
// browser console so you can see what your code is doing.
// Use it to debug and understand your programs.

console.log("=== Crash Course Complete ===");
console.log("Now go to 02-beginner to learn each topic in depth!");
