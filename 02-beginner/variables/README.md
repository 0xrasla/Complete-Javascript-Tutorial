# Variables

## What Is a Variable?

A variable is a named container that holds a value. Think of it as a labeled box — you put something inside (a number, a word, a list), give the box a name, and use that name to retrieve or change what is inside later.

In JavaScript, you create variables using the `const` or `let` keywords.

---

## `const` vs `let`

| Keyword | Can Reassign? | When to Use |
|---------|--------------|-------------|
| `const` | No | When the value should never change (e.g., a mathematical constant, a configuration value) |
| `let` | Yes | When the value needs to change later (e.g., a counter, a score, user input) |

---

## Naming Rules

- Variable names **cannot** start with a number (`2name` is invalid).
- Variable names **cannot** contain spaces (`user name` is invalid).
- Variable names **cannot** be reserved words (`const`, `let`, `function`, etc.).
- Variable names **are** case-sensitive (`name` and `Name` are different things).
- Use camelCase by convention: `firstName`, `userAge`, `isActive`.

---

## Files

| File | What It Covers |
|------|---------------|
| `variables.js` | Declaration, assignment, const vs let, naming, scope basics |
