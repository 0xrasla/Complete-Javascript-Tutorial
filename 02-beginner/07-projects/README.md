# 07 — Beginner Projects

## Practice Makes Permanent

The best way to learn is by doing. These projects let you apply everything you learned in the beginner section. Each project includes a complete, working solution with comments explaining every decision.

---

## Projects

| # | Project | Description | Skills Practiced |
|---|---------|-------------|-----------------|
| 01 | Tip Calculator | Calculate tips and split bills | Variables, functions, arithmetic, template literals |
| 02 | Number Guessing Game | Guess a random number between 1-100 | Math, loops, conditionals, random numbers |
| 03 | Palindrome Checker | Check if a word reads the same forwards and backwards | Strings, loops, conditionals, functions |

---

## How to Use

1. **Try first:** Attempt to build the project yourself before looking at the solution. Even a messy first attempt is valuable.
2. **Compare:** Read the solution to see how an experienced developer approaches the problem.
3. **Modify:** Change the solution — add features, fix bugs, make it yours.
4. **Repeat:** Build it again from memory a few days later.

---

## Project 01: Tip Calculator

Calculates the tip amount and total bill based on the bill amount, tip percentage, and number of people splitting the bill.

```javascript
function calculateTip(bill, percentage) {
  return bill * (percentage / 100);
}

function calculatePerPerson(total, people) {
  return total / people;
}

const bill = 85.50;
const tip = calculateTip(bill, 18);
const total = bill + tip;
const perPerson = calculatePerPerson(total, 4);

console.log(`Each person pays: $${perPerson.toFixed(2)}`);
// Output: Each person pays: $25.22
```

---

## Project 02: Number Guessing Game

A game where the computer picks a random number and you try to guess it.

```javascript
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const secret = getRandomInt(1, 100);
console.log(`I'm thinking of a number between 1 and 100.`);
// In a real game, you would use prompt() to get user guesses.
```

---

## Project 03: Palindrome Checker

Checks if a word or phrase reads the same forwards and backwards.

```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

console.log(isPalindrome("racecar"));  // Output: true
console.log(isPalindrome("hello"));    // Output: false
```

---

## Files

| File | What It Covers |
|------|---------------|
| `tip-calculator.js` | Complete tip calculator with functions and formatting |
| `number-guessing-game.js` | Number guessing game with binary search strategy |
| `palindrome-checker.js` | Three different approaches to checking palindromes |
