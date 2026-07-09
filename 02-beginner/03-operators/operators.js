/**
 * ============================================================
 * OPERATORS — Combining and Comparing Values
 * ============================================================
 * 
 * Operators are symbols that tell JavaScript to do something
 * with values: add them, compare them, combine them, etc.
 * ============================================================
 */

// ============================================================
// 1. ARITHMETIC OPERATORS — Math
// ============================================================
// These work exactly like they do in math class.

const a = 10;
const b = 3;

console.log(a + b);   // Output: 13 (addition)
console.log(a - b);   // Output: 7  (subtraction)
console.log(a * b);   // Output: 30 (multiplication)
console.log(a / b);   // Output: 3.3333333333333335 (division)
console.log(a % b);   // Output: 1  (remainder: 10 divided by 3 leaves 1)
console.log(a ** b);  // Output: 1000 (exponentiation: 10 to the power of 3)


// ============================================================
// 2. ASSIGNMENT OPERATORS — Setting Values
// ============================================================
// The basic assignment operator is = (it means "give this
// variable this value"). There are also shorthand versions.

let score = 0;        // Basic assignment

score += 10;          // Same as: score = score + 10  → score is now 10
score -= 3;           // Same as: score = score - 3   → score is now 7
score *= 2;           // Same as: score = score * 2   → score is now 14
score /= 7;           // Same as: score = score / 7   → score is now 2

console.log(score);   // Output: 2


// ============================================================
// 3. COMPARISON OPERATORS — Checking Relationships
// ============================================================
// These operators compare two values and return a boolean
// (true or false).

console.log(5 > 3);      // Output: true  (5 is greater than 3)
console.log(5 < 3);      // Output: false (5 is not less than 3)
console.log(5 >= 5);     // Output: true  (5 is greater than or equal to 5)
console.log(5 <= 4);     // Output: false (5 is not less than or equal to 4)

// STRICT EQUALITY (===) — checks value AND type
console.log(5 === 5);        // Output: true  (same value, same type)
console.log(5 === "5");      // Output: false (same value, different type)
console.log("hello" === "hello"); // Output: true

// STRICT INEQUALITY (!==) — checks if value OR type is different
console.log(5 !== "5");      // Output: true  (different type)
console.log(5 !== 5);        // Output: false (same value and type)

// WARNING: Do NOT use == or != (loose equality)
// They do type conversion before comparing, which leads to
// confusing results:
console.log(5 == "5");       // Output: true  (confusing!)
console.log(0 == false);     // Output: true  (confusing!)
// Always use === and !== to avoid surprises.


// ============================================================
// 4. LOGICAL OPERATORS — Combining Conditions
// ============================================================
// Logical operators let you combine multiple boolean values.

// AND (&&) — returns true only if BOTH sides are true
console.log(true && true);    // Output: true
console.log(true && false);   // Output: false
console.log(false && true);   // Output: false
console.log(false && false);  // Output: false

// OR (||) — returns true if AT LEAST ONE side is true
console.log(true || true);    // Output: true
console.log(true || false);   // Output: true
console.log(false || true);   // Output: true
console.log(false || false);  // Output: false

// NOT (!) — flips true to false and false to true
console.log(!true);           // Output: false
console.log(!false);          // Output: true

// Practical example:
const age = 20;
const hasTicket = true;

// Can this person enter? They need to be 18+ AND have a ticket.
const canEnter = age >= 18 && hasTicket;
console.log(canEnter);       // Output: true

// Do they get a discount? They are a student OR a senior.
const isStudent = false;
const isSenior = true;
const getsDiscount = isStudent || isSenior;
console.log(getsDiscount);   // Output: true


// ============================================================
// 5. STRING CONCATENATION — Joining Text
// ============================================================
// The + operator also works with strings. It joins them together.

const firstName = "John";
const lastName = "Doe";
const fullName = firstName + " " + lastName;

console.log(fullName);        // Output: John Doe

// Or use template literals (the modern, cleaner way):
const greeting = `Hello, ${firstName} ${lastName}!`;
console.log(greeting);        // Output: Hello, John Doe!


// ============================================================
// 6. OPERATOR PRECEDENCE — Order of Operations
// ============================================================
// JavaScript follows the same rules as math:
// Parentheses → Exponents → Multiplication/Division → Addition/Subtraction

console.log(2 + 3 * 4);      // Output: 14 (multiplication first: 3*4=12, then 2+12=14)
console.log((2 + 3) * 4);    // Output: 20 (parentheses first: 2+3=5, then 5*4=20)


// ============================================================
// 7. PRACTICAL EXAMPLE — Simple Calculator
// ============================================================
// Let's build a simple calculator using everything we learned.

const num1 = 15;
const num2 = 4;

console.log(`${num1} + ${num2} = ${num1 + num2}`);   // Output: 15 + 4 = 19
console.log(`${num1} - ${num2} = ${num1 - num2}`);   // Output: 15 - 4 = 11
console.log(`${num1} * ${num2} = ${num1 * num2}`);   // Output: 15 * 4 = 60
console.log(`${num1} / ${num2} = ${num1 / num2}`);   // Output: 15 / 4 = 3.75
console.log(`${num1} % ${num2} = ${num1 % num2}`);   // Output: 15 % 4 = 3


// ============================================================
// 8. PRACTICAL EXAMPLE — Permission Check
// ============================================================
// Real-world code often uses logical operators to check
// permissions and conditions.

const userRole = "admin";
const userAge = 28;
const isVerified = true;

// Can the user delete a post? Must be admin, 18+, and verified.
const canDelete = userRole === "admin" && userAge >= 18 && isVerified;
console.log("Can delete posts:", canDelete);  // Output: Can delete posts: true

// Can the user edit? Must be admin OR editor.
const isEditor = false;
const canEdit = userRole === "admin" || isEditor;
console.log("Can edit posts:", canEdit);       // Output: Can edit posts: true

// Is the user banned?
const isBanned = false;
const isActive = !isBanned;
console.log("Is active:", isActive);          // Output: Is active: true


console.log("=== Operators Section Complete ===");
console.log("Move on to control-flow to learn how to make decisions in your code.");
