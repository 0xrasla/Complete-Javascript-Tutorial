# Complete JavaScript Tutorial

A comprehensive, beginner-friendly JavaScript course that takes you from zero programming knowledge to advanced concepts. Every file is self-contained, fully commented, and designed to be run directly in the browser console.

---

## Who Is This Course For?

| Level | Who It's For |
|-------|-------------|
| **Beginner** | Absolute beginners with zero programming experience. No coding background needed. |
| **Intermediate** | Developers who have completed the beginner section or have equivalent knowledge. |
| **Advanced** | Developers who are comfortable with OOP, async JS, and core JS fundamentals. |

---

## Prerequisites

- **Beginner:** Nothing. Just a browser and a willingness to learn.
- **Intermediate:** You should understand variables, data types, functions, control flow, and basic DOM manipulation. Complete the [Beginner section](./02-beginner/) first.
- **Advanced:** You should be comfortable with classes, async/await, Promises, and the event loop. Complete the [Intermediate section](./03-intermediate-oop/) first.

---

## Course Structure

```
├── 01-crash-course/              # Fast-paced overview for quick learners
├── 02-beginner/                  # Core fundamentals
│   ├── 01-variables/             # var, let, const, naming rules
│   ├── 02-data-types/            # Strings, numbers, booleans, arrays, objects
│   ├── 03-operators/             # Arithmetic, comparison, logical operators
│   ├── 04-control-flow/          # if/else, switch, for, while
│   ├── 05-functions/             # Declarations, arrow functions, scope
│   ├── 06-dom-basics/            # Selecting and manipulating elements
│   ├── 07-projects/              # Tip calculator, number game, palindrome
│   ├── 08-array-methods/         # map, filter, reduce, find, sort
│   ├── 09-error-handling/        # try/catch, throw, error types
│   ├── 10-es6-features/          # Destructuring, spread/rest, optional chaining
│   └── 11-regular-expressions/   # Pattern matching, validation
├── 03-intermediate-oop/          # OOP and async patterns
│   ├── 01-classes-and-oop/       # Classes, inheritance, encapsulation
│   ├── 02-async-js/              # Callbacks, Promises, async/await
│   ├── 03-projects/              # Todo app, weather dashboard
│   └── 04-modules/               # import/export, organizing code
├── 04-advanced/                  # Deep dives
│   ├── 01-closures/              # Lexical scope, practical uses
│   ├── 02-memory-and-engine/     # Memory management, garbage collection
│   ├── 03-design-patterns/       # Singleton, Factory, Observer, etc.
│   └── 04-projects/              # Event emitter, state manager
├── 05-common-projects/           # Calculator, todo list, quiz, pomodoro
└── README.md                     # You are here
```

---

## Curriculum Overview

### Beginner (02-beginner) — ~15-20 hours

| # | Topic | Difficulty | Est. Time | What You'll Learn |
|---|-------|------------|-----------|-------------------|
| 01 | Variables | Easy | 1-2h | `var`, `let`, `const`, naming rules, hoisting |
| 02 | Data Types | Easy | 1-2h | Strings, numbers, booleans, null, undefined, objects, arrays |
| 03 | Operators | Easy | 1-2h | Arithmetic, comparison, logical, assignment operators |
| 04 | Control Flow | Easy | 2-3h | `if/else`, `switch`, `for`, `while`, `break`/`continue` |
| 05 | Functions | Easy | 2-3h | Declarations, expressions, arrow functions, scope, closures preview |
| 06 | DOM Basics | Medium | 2-3h | Selecting elements, events, modifying content and styles |
| 07 | Projects | Medium | 3-4h | Tip calculator, number guessing game, palindrome checker |
| 08 | Array Methods | Medium | 2-3h | `map`, `filter`, `reduce`, `find`, `sort`, chaining |
| 09 | Error Handling | Medium | 1-2h | `try/catch`, `throw`, error types, validation patterns |
| 10 | ES6+ Features | Medium | 2-3h | Destructuring, spread/rest, optional chaining, template literals |
| 11 | Regular Expressions | Medium | 2-3h | Pattern syntax, quantifiers, anchors, capture groups |

### Intermediate (03-intermediate-oop) — ~10-15 hours

| # | Topic | Difficulty | Est. Time | What You'll Learn |
|---|-------|------------|-----------|-------------------|
| 01 | Classes & OOP | Medium | 3-4h | Classes, constructors, inheritance, `this`, encapsulation |
| 02 | Async JS | Hard | 4-5h | Callbacks, Promises, async/await, the event loop |
| 03 | Projects | Hard | 3-4h | Todo app with localStorage, weather dashboard |
| 04 | Modules | Medium | 1-2h | `import`/`export`, organizing code, dynamic imports |

### Advanced (04-advanced) — ~8-12 hours

| # | Topic | Difficulty | Est. Time | What You'll Learn |
|---|-------|------------|-----------|-------------------|
| 01 | Closures | Hard | 2-3h | Lexical scope, data privacy, factories, currying |
| 02 | Memory & Engine | Hard | 2-3h | Call stack, heap, garbage collection, memory leaks |
| 03 | Design Patterns | Hard | 3-4h | Singleton, Factory, Observer, Module, Strategy, Decorator |
| 04 | Projects | Hard | 2-3h | Event emitter, state manager |

### Common Projects (05-common-projects) — ~8-10 hours

| Project | Difficulty | Est. Time | Concepts Practiced |
|---------|------------|-----------|-------------------|
| Calculator | Medium | 2-3h | Classes, error handling, method chaining |
| Todo List | Hard | 3-4h | Private fields, localStorage, DOM manipulation |
| Quiz App | Medium | 2-3h | Data structures, classes, event handling |
| Pomodoro Timer | Medium | 1-2h | Timers, DOM updates, state management |

**Total estimated time: ~40-55 hours**

---

## How to Use This Course

> **Note:** Some sections (04-modules) require a local server due to ES module restrictions. See [How to Run the Code](#how-to-run-the-code) below.

### Step 1: Start at the Right Level
If you have never coded before, start with **01-crash-course** for a quick overview, then move to **02-beginner** for detailed learning. If you already know the basics, skip ahead.

### Step 2: Read the README First
Each folder contains a `README.md` that explains the concept in plain language with code examples. Read it before looking at the `.js` file.

### Step 3: Run the Code
Open the `.js` files in the browser console (Right-click → Inspect → Console tab) or create an HTML file that links to them. Every snippet is fully runnable.

### Step 4: Modify and Experiment
Do not just read — change values, break things, and see what happens. That is how real learning happens.

---

## How to Run the Code

Since this course is browser-based, you have two options:

### Option A: Browser Console
1. Open any browser (Chrome, Firefox, Edge).
2. Right-click anywhere → **Inspect** → **Console** tab.
3. Copy and paste any `.js` file content directly into the console.
4. Press Enter to run.

### Option B: HTML + Script Tag
1. Create a new file called `index.html`.
2. Add this content:

```html
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Practice</title>
</head>
<body>
  <script src="path-to-the-file.js"></script>
</body>
</html>
```

3. Open the HTML file in your browser.
4. Open the console to see the output.

### Option C: Local Server (Required for Modules)
For the **04-modules** section, you need a local server because ES modules don't work over `file://`.

```bash
# Option 1: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 2: npx serve
npx serve .

# Option 3: Python
python3 -m http.server
```

---

## Resources

- [Beginner DOM Tutorial](https://github.com/0xrasla/Beginner-DOM-Tutorial) — Detailed explanations of DOM manipulation for beginners.

---

## License

This course is open source. Use it, share it, build with it.
