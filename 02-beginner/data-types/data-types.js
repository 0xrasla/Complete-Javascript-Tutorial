/**
 * ============================================================
 * DATA TYPES — The Kinds of Values JavaScript Understands
 * ============================================================
 * 
 * Every value in JavaScript has a type. Understanding types
 * helps you predict how your code will behave and catch bugs
 * early.
 * ============================================================
 */

// ============================================================
// 1. STRING — Text
// ============================================================
// A string is a sequence of characters wrapped in quotes.
// You can use single quotes, double quotes, or backticks.

const singleQuoted = 'Hello';
const doubleQuoted = "Hello";
const backtickQuoted = `Hello`;

// All three are the same value. Backticks also let you
// embed variables directly (template literals).

console.log(singleQuoted);   // Output: Hello
console.log(doubleQuoted);   // Output: Hello
console.log(backtickQuoted); // Output: Hello

// Strings can contain numbers, spaces, and symbols:
const message = "My phone number is 555-1234";
console.log(message);        // Output: My phone number is 555-1234

// Useful string properties:
const word = "JavaScript";
console.log(word.length);    // Output: 10 (number of characters)


// ============================================================
// 2. NUMBER — Integers and Decimals
// ============================================================
// JavaScript has one type for all numbers: "number".
// There is no difference between integers and decimals.

const age = 25;           // Integer
const price = 9.99;       // Decimal
const negative = -10;     // Negative number
const zero = 0;           // Zero is a number too

console.log(age);         // Output: 25
console.log(price);       // Output: 9.99
console.log(negative);    // Output: -10

// Basic math:
console.log(10 + 5);     // Output: 15 (addition)
console.log(10 - 5);     // Output: 5  (subtraction)
console.log(10 * 5);     // Output: 50 (multiplication)
console.log(10 / 5);     // Output: 2  (division)
console.log(10 % 3);     // Output: 1  (remainder/modulo)
console.log(2 ** 3);     // Output: 8  (exponentiation: 2 to the power of 3)


// ============================================================
// 3. BOOLEAN — True or False
// ============================================================
// A boolean is one of two values: true or false.
// It is used for decisions and comparisons.

const isRaining = true;
const isSunny = false;

console.log(isRaining);   // Output: true
console.log(isSunny);     // Output: false

// Comparisons produce booleans:
console.log(10 > 5);     // Output: true (10 is greater than 5)
console.log(10 < 5);     // Output: false (10 is not less than 5)
console.log(10 === 10);  // Output: true (10 is equal to 10)
console.log(10 === 20);  // Output: false (10 is not equal to 20)


// ============================================================
// 4. NULL — Intentional Nothing
// ============================================================
// null represents an intentional absence of value.
// You assign it when you mean "this has no value."

const emptyValue = null;
console.log(emptyValue);        // Output: null
console.log(typeof emptyValue); // Output: object (this is a known bug in JavaScript, do not worry about it)


// ============================================================
// 5. UNDEFINED — Not Yet Assigned
// ============================================================
// undefined means a variable has been declared but has no
// value yet. JavaScript gives this to you automatically.

let notAssigned;
console.log(notAssigned);        // Output: undefined
console.log(typeof notAssigned); // Output: undefined

// null vs undefined:
// - null = You intentionally set it to "nothing"
// - undefined = JavaScript set it to "nothing" because you did not


// ============================================================
// 6. typeof — Checking the Type of a Value
// ============================================================
// Use typeof to find out what type a value is.

console.log(typeof "Hello");    // Output: string
console.log(typeof 42);         // Output: number
console.log(typeof true);       // Output: boolean
console.log(typeof undefined);  // Output: undefined
console.log(typeof null);       // Output: object (a long-standing bug in JS)


// ============================================================
// 7. TYPE CONVERSION — Changing Types
// ============================================================
// Sometimes you need to convert one type to another.

// Number to String:
const num = 42;
const numAsString = String(num);
console.log(numAsString);        // Output: "42"
console.log(typeof numAsString); // Output: string

// String to Number:
const text = "100";
const textAsNumber = Number(text);
console.log(textAsNumber);        // Output: 100
console.log(typeof textAsNumber); // Output: number

// Boolean to String:
const flag = true;
const flagAsString = String(flag);
console.log(flagAsString);        // Output: "true"

// String to Boolean:
const truthy = Boolean("Hello");   // Any non-empty string is "truthy"
const falsy = Boolean("");         // Empty string is "falsy"
console.log(truthy);               // Output: true
console.log(falsy);                // Output: false


// ============================================================
// 8. TRUTHY AND FALSY VALUES
// ============================================================
// JavaScript treats some values as "true" and others as "false"
// when used in conditions, even if they are not actual booleans.

// Falsy values (treated as false):
console.log(Boolean(0));         // Output: false
console.log(Boolean(""));        // Output: false
console.log(Boolean(null));      // Output: false
console.log(Boolean(undefined)); // Output: false
console.log(Boolean(NaN));       // Output: false

// Truthy values (treated as true):
console.log(Boolean(1));         // Output: true
console.log(Boolean("Hello"));   // Output: true
console.log(Boolean([]));        // Output: true
console.log(Boolean({}));        // Output: true

// Why does this matter? Because you can write shorter conditions:
const username = "Alice";
if (username) {
  console.log("User is logged in");  // This runs because "Alice" is truthy
}


// ============================================================
// 9. COMMON GOTCHA — typeof with null
// ============================================================
// typeof null returns "object" — this is a bug in JavaScript
// that has existed since the language was created. It will
// never be fixed because too much code depends on this behavior.

console.log(typeof null); // Output: object (yes, this is wrong, but it is how JS works)


// ============================================================
// 10. PRACTICAL EXAMPLE
// ============================================================
// Let's combine everything we learned.

const productName = "Wireless Mouse";
const productPrice = 29.99;
const inStock = true;
const rating = 4.5;

const review = `${productName} costs $${productPrice}. In stock: ${inStock}. Rating: ${rating}/5.`;
console.log(review);
// Output: Wireless Mouse costs $29.99. In stock: true. Rating: 4.5/5.


console.log("=== Data Types Section Complete ===");
console.log("Move on to operators to learn how to combine and compare values.");
