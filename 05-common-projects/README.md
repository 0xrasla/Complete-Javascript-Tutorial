# 05 — Common Projects

These are practical, real-world projects that can be built at any level. They combine concepts from across the course and are great for practice.

---

## Projects

| # | Project | Description | Difficulty |
|---|---------|-------------|------------|
| 01 | Calculator | A functional calculator with a clean interface | Beginner |
| 02 | Todo List | A full-featured to-do list with persistence | Beginner-Intermediate |
| 03 | Quiz App | An interactive quiz application | Intermediate |
| 04 | Pomodoro Timer | A productivity timer based on the Pomodoro technique | Intermediate |

---

## How to Use

1. Pick a project that interests you.
2. Try to build it yourself first (even if it is messy).
3. Then read the solution to compare approaches.
4. Modify the solution — add features, fix bugs, make it yours.

---

## Project 01: Calculator

A calculator that handles basic and advanced operations:

```javascript
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3));       // Output: 8
console.log(calc.divide(10, 2));   // Output: 5
```

---

## Project 02: Todo List

A complete to-do application with categories and priorities:

```javascript
class TodoList {
  constructor() { this.todos = []; }

  add(text, priority = "medium") {
    this.todos.push({ id: Date.now(), text, priority, completed: false });
  }

  complete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = true;
  }
}

const todos = new TodoList();
todos.add("Learn JavaScript", "high");
todos.add("Build a project", "medium");
```

---

## Project 03: Quiz App

An interactive quiz with scoring and timer:

```javascript
class Quiz {
  constructor(questions) { this.questions = questions; this.score = 0; }

  answer(questionIndex, answerIndex) {
    const correct = this.questions[questionIndex].correctIndex === answerIndex;
    if (correct) this.score++;
    return correct;
  }
}
```

---

## Project 04: Pomodoro Timer

A productivity timer (25 min work, 5 min break):

```javascript
class PomodoroTimer {
  constructor() {
    this.workDuration = 25 * 60;
    this.breakDuration = 5 * 60;
    this.isWorkSession = true;
  }
}
```

---

## Files

| File | What It Covers |
|------|---------------|
| `calculator.js` | Full calculator with chaining, memory, and history |
| `todo-list.js` | Complete todo app with localStorage persistence |
| `quiz-app.js` | Interactive quiz with detailed results |
| `pomodoro-timer.js` | Productivity timer with statistics |
