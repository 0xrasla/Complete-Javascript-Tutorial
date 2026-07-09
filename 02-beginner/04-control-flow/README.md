# 04 — Control Flow

## What Is Control Flow?

Control flow is the order in which your code runs. By default, JavaScript runs code from top to bottom, line by line. Control flow statements let you change that — they let your code make decisions and repeat actions.

---

## Conditionals — Making Decisions

### `if` Statement

```javascript
const temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");  // This runs because 30 > 25
}
```

### `if...else` — Two Paths

```javascript
const age = 16;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");  // This runs because 16 < 18
}
```

### `if...else if...else` — Multiple Paths

```javascript
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
```

### `switch` — Choosing From Many Options

```javascript
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
    console.log("Weekend!");  // Runs for both Saturday and Sunday
    break;
  default:
    console.log("Just another day");
}
```

### Ternary Operator — Quick Decisions

```javascript
const userAge = 20;
const status = userAge >= 18 ? "Adult" : "Minor";
console.log(status);  // Output: Adult
```

---

## Loops — Repeating Actions

### `for` Loop

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Iteration: " + i);
}
// Output: 0, 1, 2, 3, 4
```

### `while` Loop

```javascript
let count = 0;
while (count < 5) {
  console.log("Count: " + count);
  count++;
}
// Output: 0, 1, 2, 3, 4
```

### `break` and `continue`

```javascript
// break — exit the loop early
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);  // Output: 0, 1, 2, 3, 4
}

// continue — skip this iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i);  // Output: 1, 3, 5, 7, 9
}
```

---

## Files

| File | What It Covers |
|------|---------------|
| `control-flow.js` | Conditionals, loops, and loop control with practical examples |
