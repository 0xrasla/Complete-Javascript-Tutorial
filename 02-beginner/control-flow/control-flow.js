/**
 * ============================================================
 * CONTROL FLOW — Making Decisions and Repeating Actions
 * ============================================================
 * 
 * Control flow lets your code branch into different paths
 * based on conditions, or repeat actions multiple times.
 * ============================================================
 */

// ============================================================
// 1. IF STATEMENT — Making a Decision
// ============================================================
// An if statement checks a condition. If the condition is
// true, the code inside the braces { } runs. If not, it
// is skipped.

const temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");  // This runs because 30 > 25
}

// The condition inside the parentheses must evaluate to true or false.
// "temperature > 25" is true, so the code runs.
// If temperature were 20, this block would be skipped entirely.


// ============================================================
// 2. IF...ELSE — Two Paths
// ============================================================
// "else" provides an alternative path when the condition is false.

const age = 16;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");  // This runs because 16 < 18
}

// Exactly one path will run — either the if block or the else block, never both.


// ============================================================
// 3. IF...ELSE IF...ELSE — Multiple Paths
// ============================================================
// When you have more than two options, chain else if conditions.

const score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");  // This runs because 75 >= 70
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// JavaScript checks each condition from top to bottom.
// It runs the FIRST one that is true and skips the rest.


// ============================================================
// 4. NESTED IF — Decisions Inside Decisions
// ============================================================
// You can put if statements inside other if statements.

const isLoggedIn = true;
const userRole = "admin";

if (isLoggedIn) {
  if (userRole === "admin") {
    console.log("Welcome, admin!");
  } else {
    console.log("Welcome, user!");
  }
} else {
  console.log("Please log in.");
}

// Output: Welcome, admin!
// First we check if logged in (true), then check the role.


// ============================================================
// 5. SWITCH STATEMENT — Choosing From Many Options
// ============================================================
// When you have many possible values for one variable, a
// switch statement is cleaner than a long chain of if/else if.

const day = "Wednesday";

switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Wednesday":
    console.log("Middle of the week");  // This runs
    break;
  case "Friday":
    console.log("Almost the weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");  // This runs for both Saturday and Sunday
    break;
  default:
    console.log("Just another day");
}

// "break" is required. Without it, code will "fall through"
// to the next case and keep running.


// ============================================================
// 6. TERNARY OPERATOR — Quick Decisions
// ============================================================
// For simple if/else situations, you can use a shorter syntax:
// condition ? valueIfTrue : valueIfFalse

const userAge = 20;
const status = userAge >= 18 ? "Adult" : "Minor";
console.log(status);  // Output: Adult

// This is the same as:
// if (userAge >= 18) {
//   status = "Adult";
// } else {
//   status = "Minor";
// }

// Use ternary for short, simple decisions. Use if/else for complex ones.


// ============================================================
// 7. FOR LOOP — Repeating a Specific Number of Times
// ============================================================
// A for loop runs a block of code multiple times.

// Syntax: for (start; condition; update) { code }
// - start: where to begin counting
// - condition: keep running while this is true
// - update: what to do after each iteration

for (let i = 0; i < 5; i++) {
  console.log("Iteration: " + i);
}
// Output:
// Iteration: 0
// Iteration: 1
// Iteration: 2
// Iteration: 3
// Iteration: 4

// How it works:
// 1. i starts at 0
// 2. Check: is 0 < 5? Yes → run the code
// 3. i becomes 1 (i++)
// 4. Check: is 1 < 5? Yes → run the code
// 5. This continues until i is 5, then 5 < 5 is false → stop


// ============================================================
// 8. WHILE LOOP — Repeating Until a Condition Is Met
// ============================================================
// A while loop keeps running as long as its condition is true.
// Use it when you don't know how many times you need to loop.

let count = 0;

while (count < 5) {
  console.log("Count: " + count);
  count++;  // Important! Without this, the loop runs forever.
}
// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4

// WARNING: If you forget to update the variable, you get an
// infinite loop and your browser will freeze.
// while (true) { }  ← NEVER DO THIS (unless you have a break)


// ============================================================
// 9. DO...WHILE LOOP — Runs At Least Once
// ============================================================
// A do...while loop is like a while loop, but it always runs
// the code at least once before checking the condition.

let number = 10;

do {
  console.log("Number: " + number);  // This runs once even though 10 > 5
  number++;
} while (number < 5);

// Output: Number: 10
// The condition (10 < 5) is false, but the code still ran once.


// ============================================================
// 10. BREAK — Exiting a Loop Early
// ============================================================
// "break" immediately stops the loop and moves to the code
// after it.

for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;  // Stop the loop when i reaches 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
// The loop stops at 5 and never reaches 6, 7, 8, or 9.


// ============================================================
// 11. CONTINUE — Skipping an Iteration
// ============================================================
// "continue" skips the current iteration and moves to the
// next one. The loop does NOT stop — it just skips.

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue;  // Skip even numbers
  }
  console.log(i);
}
// Output: 1, 3, 5, 7, 9
// Even numbers (0, 2, 4, 6, 8) are skipped.


// ============================================================
// 12. PRACTICAL EXAMPLE — Number Guessing Game Logic
// ============================================================
// A simple game where the code checks guesses.

const secretNumber = 7;
const guesses = [3, 7, 5, 10, 7];

for (let i = 0; i < guesses.length; i++) {
  const guess = guesses[i];
  
  if (guess === secretNumber) {
    console.log(`Attempt ${i + 1}: Correct! The number was ${secretNumber}.`);
    break;  // Stop once we find it
  } else if (guess < secretNumber) {
    console.log(`Attempt ${i + 1}: ${guess} is too low.`);
  } else {
    console.log(`Attempt ${i + 1}: ${guess} is too high.`);
  }
}
// Output:
// Attempt 1: 3 is too low.
// Attempt 2: Correct! The number was 7.


// ============================================================
// 13. PRACTICAL EXAMPLE — Filtering Data
// ============================================================
// Loops are commonly used to filter lists of data.

const prices = [29.99, 5.00, 149.99, 9.99, 200.00, 3.50];
const budget = 20;

console.log(`Items within $${budget} budget:`);

for (let i = 0; i < prices.length; i++) {
  if (prices[i] <= budget) {
    console.log(`  $${prices[i]}`);
  }
}
// Output:
// Items within $20 budget:
//   $5
//   $9.99
//   $3.5


console.log("=== Control Flow Section Complete ===");
console.log("Move on to functions to learn how to write reusable code.");
