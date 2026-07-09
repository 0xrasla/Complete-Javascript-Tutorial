/**
 * ============================================================
 * VARIABLES — Storing Data in JavaScript
 * ============================================================
 * 
 * A variable is a named container for a value. You create one,
 * give it a name, and use that name to work with the value.
 * ============================================================
 */

// ============================================================
// 1. DECLARING VARIABLES WITH const
// ============================================================
// "const" creates a variable that CANNOT be reassigned.
// Use it when the value should stay the same.

const pi = 3.14159;
const userName = "Alice";
const isLoggedIn = true;

console.log(pi);          // Output: 3.14159
console.log(userName);    // Output: Alice
console.log(isLoggedIn);  // Output: true

// This would cause an ERROR (uncomment to test):
// pi = 3.14;  // TypeError: Assignment to constant variable.


// ============================================================
// 2. DECLARING VARIABLES WITH let
// ============================================================
// "let" creates a variable that CAN be reassigned.
// Use it when the value will change over time.

let score = 0;
console.log(score);       // Output: 0

score = 10;               // This is allowed because we used "let"
console.log(score);       // Output: 10

score = score + 5;        // Adding 5 to the current score
console.log(score);       // Output: 15


// ============================================================
// 3. CONST vs LET — When to Use Which
// ============================================================
// Rule of thumb:
// - Start with const for everything.
// - Only use let when you know the value will change.
// - Never use var (it is the old way and has confusing behavior).

const MAX_LIVES = 3;      // This should never change — use const
let currentLives = 3;     // This will decrease as the player takes damage — use let

currentLives = currentLives - 1;  // Player took damage
console.log(currentLives);        // Output: 2

// MAX_LIVES = 5;  // Error! This is const, cannot be changed.


// ============================================================
// 4. NAMING VARIABLES
// ============================================================
// Good names make code readable. Bad names make it confusing.

// Bad names (avoid these):
// const x = 10;        // What is x? Nobody knows.
// const data = "Bob";  // What kind of data?

// Good names (be descriptive):
const userAge = 25;
const maximumRetries = 3;
const isEmailValid = true;

console.log(userAge);         // Output: 25
console.log(maximumRetries);  // Output: 3
console.log(isEmailValid);    // Output: true


// ============================================================
// 5. VARIABLE REASSIGNMENT
// ============================================================
// With let, you can change the value at any time.

let temperature = 20;
console.log("Morning: " + temperature);   // Output: Morning: 20

temperature = 28;
console.log("Afternoon: " + temperature); // Output: Afternoon: 28

temperature = temperature + 3;            // Adding 3 to current value
console.log("Evening: " + temperature);   // Output: Evening: 31


// ============================================================
// 6. DECLARING WITHOUT ASSIGNING
// ============================================================
// You can declare a variable without giving it a value.
// It will hold the value "undefined" until you assign one.

let username;
console.log(username);    // Output: undefined

username = "Charlie";
console.log(username);    // Output: Charlie


// ============================================================
// 7. MULTIPLE DECLARATIONS
// ============================================================
// You can declare multiple variables in one line, but it is
// usually more readable to put each on its own line.

let a = 1, b = 2, c = 3;
console.log(a, b, c);    // Output: 1 2 3

// Better (more readable):
let firstName = "John";
let lastName = "Doe";


// ============================================================
// 8. PRACTICAL EXAMPLE
// ============================================================
// Let's simulate a simple shopping cart.

const itemPrice = 9.99;
const quantity = 3;
const taxRate = 0.08;

let subtotal = itemPrice * quantity;         // 29.97
let tax = subtotal * taxRate;                // 2.3976
let total = subtotal + tax;                  // 32.3676

console.log("Subtotal: " + subtotal);       // Output: Subtotal: 29.97
console.log("Tax: " + tax);                 // Output: Tax: 2.3976
console.log("Total: " + total);             // Output: Total: 32.3676


// ============================================================
// 9. TEMPLATE LITERALS — A Better Way to Build Strings
// ============================================================
// Instead of "Hello, " + name + "!", you can use backticks
// and ${} to insert values directly into strings.

const greeting = `Hello, ${userName}! You are ${userAge} years old.`;
console.log(greeting);
// Output: Hello, Alice! You are 25 years old.

// This is called a "template literal" and is the modern way
// to combine strings and variables.


// ============================================================
// 10. SCOPE — Where Variables Are Accessible
// ============================================================
// "Scope" means where a variable can be seen from.

const globalVar = "I can be seen everywhere";  // Global scope

function demonstrateScope() {
  const localVar = "I can only be seen inside this function";
  console.log(globalVar);   // Works — global variables are accessible everywhere
  console.log(localVar);    // Works — we are inside the function
}

demonstrateScope();

// console.log(localVar);  // Error! localVar is not accessible outside the function

// This is a preview. You will learn more about scope in the Functions section.


console.log("=== Variables Section Complete ===");
console.log("Move on to data-types to learn about the different kinds of values.");
