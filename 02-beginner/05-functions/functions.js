/**
 * ============================================================
 * FUNCTIONS — Reusable Blocks of Code
 * ============================================================
 * 
 * A function is a named block of code that you can run
 * whenever you want. It can take inputs (parameters) and
 * give back outputs (return values).
 * ============================================================
 */

// ============================================================
// 1. DECLARING A FUNCTION
// ============================================================
// Use the "function" keyword, followed by a name, parentheses,
// and curly braces.

function greet() {
  console.log("Hello, world!");
}

// The function is now defined, but it has NOT run yet.
// You need to "call" it to make it run.

greet();  // Output: Hello, world!
greet();  // You can call it as many times as you want


// ============================================================
// 2. PARAMETERS AND ARGUMENTS
// ============================================================
// Parameters are placeholders in the function definition.
// Arguments are the actual values you pass when calling it.

function sayHello(name) {
  console.log("Hello, " + name + "!");
}

// "name" is the parameter.
// "Alice" is the argument.

sayHello("Alice");   // Output: Hello, Alice!
sayHello("Bob");     // Output: Hello, Bob!

// Multiple parameters:
function add(a, b) {
  console.log(a + b);
}

add(3, 5);    // Output: 8
add(10, 20);  // Output: 30


// ============================================================
// 3. RETURN VALUES
// ============================================================
// A function can give back a value using the "return" keyword.
// The returned value can be stored in a variable.

function multiply(a, b) {
  return a * b;
}

const result = multiply(4, 5);
console.log(result);  // Output: 20

// You can also use the returned value directly:
console.log(multiply(3, 7));  // Output: 21

// A function stops running as soon as it hits "return".
function checkAge(age) {
  if (age >= 18) {
    return "Adult";
  }
  return "Minor";  // This only runs if age < 18
}

console.log(checkAge(20));  // Output: Adult
console.log(checkAge(15));  // Output: Minor


// ============================================================
// 4. DEFAULT PARAMETERS
// ============================================================
// You can give parameters a default value that is used when
// no argument is provided.

function greetUser(name = "stranger") {
  console.log(`Hello, ${name}!`);
}

greetUser("Alice");  // Output: Hello, Alice!
greetUser();         // Output: Hello, stranger! (default value used)


// ============================================================
// 5. ARROW FUNCTIONS — Modern Syntax
// ============================================================
// Arrow functions are a shorter way to write functions.
// They are the modern standard in JavaScript.

// Traditional function:
function subtract(a, b) {
  return a - b;
}

// Arrow function (same thing, shorter):
const subtractArrow = (a, b) => {
  return a - b;
};

// Even shorter — if the function has one expression, you can
// remove the braces and "return" keyword:
const subtractShort = (a, b) => a - b;

console.log(subtract(10, 3));        // Output: 7
console.log(subtractArrow(10, 3));   // Output: 7
console.log(subtractShort(10, 3));   // Output: 7

// Single parameter — you can omit the parentheses:
const double = x => x * 2;
console.log(double(5));  // Output: 10

// No parameters — use empty parentheses:
const sayHi = () => console.log("Hi!");
sayHi();  // Output: Hi!


// ============================================================
// 6. SCOPE — Where Variables Live
// ============================================================
// Variables declared inside a function are "local" — they
// only exist inside that function. Variables declared outside
// are "global" — they exist everywhere.

const globalVar = "I am global";  // Can be accessed anywhere

function demonstrateScope() {
  const localVar = "I am local";  // Only exists inside this function
  console.log(globalVar);  // Works — global variables are accessible
  console.log(localVar);   // Works — we are inside the function
}

demonstrateScope();
// console.log(localVar);  // Error! localVar does not exist outside

// Why does this matter? It prevents naming conflicts.
// Two functions can use the same variable name without
// interfering with each other.


// ============================================================
// 7. CALLBACK FUNCTIONS
// ============================================================
// A callback is a function that you pass as an argument to
// another function. The receiving function "calls it back"
// when needed.

function processUserInput(callback) {
  const name = "Alice";
  const age = 25;
  callback(name, age);  // Calling the function that was passed in
}

// We are passing a function AS an argument:
processUserInput(function(userName, userAge) {
  console.log(`${userName} is ${userAge} years old.`);
});
// Output: Alice is 25 years old.

// You will see callbacks everywhere in JavaScript, especially
// with arrays and asynchronous code.


// ============================================================
// 8. FUNCTIONS AS EXPRESSIONS
// ============================================================
// You can assign a function to a variable without naming it
// (these are called "anonymous functions").

const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(6, 7));  // Output: 42

// This is similar to arrow functions, but arrow functions
// have some differences in behavior (covered in advanced topics).


// ============================================================
// 9. PRACTICAL EXAMPLE — Temperature Converter
// ============================================================
// Functions are perfect for reusable calculations.

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

console.log(`${0}°C = ${celsiusToFahrenheit(0)}°F`);     // Output: 0°C = 32°F
console.log(`${100}°C = ${celsiusToFahrenheit(100)}°F`); // Output: 100°C = 212°F
console.log(`${32}°F = ${fahrenheitToCelsius(32)}°C`);   // Output: 32°F = 0°C
console.log(`${72}°F = ${fahrenheitToCelsius(72)}°C`);   // Output: 72°F = 22.22...°C


// ============================================================
// 10. PRACTICAL EXAMPLE — Array Processing
// ============================================================
// Functions make it easy to work with lists of data.

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getEvenNumbers(arr) {
  const evens = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evens.push(arr[i]);
    }
  }
  return evens;
}

function getSum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

const evenNumbers = getEvenNumbers(numbers);
console.log("Even numbers:", evenNumbers);  // Output: [2, 4, 6, 8, 10]

const totalSum = getSum(numbers);
console.log("Sum of all numbers:", totalSum);  // Output: 55


console.log("=== Functions Section Complete ===");
console.log("Move on to dom-basics to learn how JavaScript interacts with web pages.");
