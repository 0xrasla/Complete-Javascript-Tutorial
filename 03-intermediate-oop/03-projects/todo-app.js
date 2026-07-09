/**
 * ============================================================
 * PROJECT: Todo App (OOP Version)
 * ============================================================
 * 
 * A complete to-do application built with classes. This
 * demonstrates how to organize code using OOP principles
 * in a practical scenario.
 * 
 * Skills practiced: classes, constructors, methods, encapsulation,
 * arrays, string manipulation, date handling.
 * ============================================================
 */

// ============================================================
// TASK CLASS — Represents a single to-do item
// ============================================================

class Task {
  #id;
  #createdAt;

  constructor(title, priority = "medium") {
    this.#id = Task.generateId();
    this.title = title;
    this.priority = priority;
    this.completed = false;
    this.#createdAt = new Date();
  }

  // Static method to generate unique IDs
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Getter for the creation date (formatted nicely)
  get createdAt() {
    return this.#createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // Getter for the ID
  get id() {
    return this.#id;
  }

  // Mark the task as completed
  complete() {
    this.completed = true;
  }

  // Mark the task as incomplete
  uncomplete() {
    this.completed = false;
  }

  // Get a display-friendly string
  toString() {
    const status = this.completed ? "✅" : "⬜";
    const priorityIcon = this.priority === "high" ? "🔴" :
                         this.priority === "medium" ? "🟡" : "🟢";
    return `${status} ${priorityIcon} [${this.priority.toUpperCase()}] ${this.title}`;
  }
}


// ============================================================
// TODO LIST CLASS — Manages a collection of tasks
// ============================================================

class TodoList {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // Add a new task
  addTask(title, priority) {
    const task = new Task(title, priority);
    this.tasks.push(task);
    console.log(`Added: "${title}"`);
    return task;
  }

  // Remove a task by its ID
  removeTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      console.log("Task not found.");
      return false;
    }
    const removed = this.tasks.splice(index, 1)[0];
    console.log(`Removed: "${removed.title}"`);
    return true;
  }

  // Complete a task by its ID
  completeTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      console.log("Task not found.");
      return false;
    }
    task.complete();
    console.log(`Completed: "${task.title}"`);
    return true;
  }

  // Get all tasks filtered by status
  getPending() {
    return this.tasks.filter(task => !task.completed);
  }

  getCompleted() {
    return this.tasks.filter(task => task.completed);
  }

  // Get tasks filtered by priority
  getByPriority(priority) {
    return this.tasks.filter(task => task.priority === priority);
  }

  // Get statistics
  getStats() {
    const total = this.tasks.length;
    const completed = this.getCompleted().length;
    const pending = this.getPending().length;
    const highPriority = this.getByPriority("high").length;

    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  // Display all tasks
  displayAll() {
    console.log(`\n===== ${this.name} =====`);
    if (this.tasks.length === 0) {
      console.log("  No tasks yet. Add one!");
    } else {
      this.tasks.forEach((task, index) => {
        console.log(`  ${index + 1}. ${task.toString()}`);
      });
    }
    console.log("========================\n");
  }

  // Display tasks grouped by priority
  displayByPriority() {
    console.log(`\n===== ${this.name} (by priority) =====`);

    const high = this.getByPriority("high");
    const medium = this.getByPriority("medium");
    const low = this.getByPriority("low");

    if (high.length > 0) {
      console.log("\n  🔴 HIGH PRIORITY:");
      high.forEach(task => console.log(`    - ${task.toString()}`));
    }

    if (medium.length > 0) {
      console.log("\n  🟡 MEDIUM PRIORITY:");
      medium.forEach(task => console.log(`    - ${task.toString()}`));
    }

    if (low.length > 0) {
      console.log("\n  🟢 LOW PRIORITY:");
      low.forEach(task => console.log(`    - ${task.toString()}`));
    }

    console.log("========================\n");
  }

  // Display statistics
  displayStats() {
    const stats = this.getStats();
    console.log("\n===== STATISTICS =====");
    console.log(`  Total tasks:     ${stats.total}`);
    console.log(`  Completed:       ${stats.completed}`);
    console.log(`  Pending:         ${stats.pending}`);
    console.log(`  High priority:   ${stats.highPriority}`);
    console.log(`  Completion rate: ${stats.completionRate}%`);
    console.log("======================\n");
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

// Create a new todo list
const myTodos = new TodoList("My Tasks");

// Add tasks with different priorities
const task1 = myTodos.addTask("Learn JavaScript classes", "high");
const task2 = myTodos.addTask("Build a project", "high");
const task3 = myTodos.addTask("Review async/await", "medium");
const task4 = myTodos.addTask("Practice DOM manipulation", "medium");
const task5 = myTodos.addTask("Read documentation", "low");
const task6 = myTodos.addTask("Write blog post", "low");

// Display all tasks
myTodos.displayAll();
// Output:
// ===== My Tasks =====
//   1. ⬜ 🔴 [HIGH] Learn JavaScript classes
//   2. ⬜ 🔴 [HIGH] Build a project
//   3. ⬜ 🟡 [MEDIUM] Review async/await
//   4. ⬜ 🟡 [MEDIUM] Practice DOM manipulation
//   5. ⬜ 🟢 [LOW] Read documentation
//   6. ⬜ 🟢 [LOW] Write blog post
// ========================

// Complete some tasks
myTodos.completeTask(task1.id);
myTodos.completeTask(task3.id);

// Display updated list
myTodos.displayAll();
// Output:
// ===== My Tasks =====
//   1. ✅ 🔴 [HIGH] Learn JavaScript classes
//   2. ⬜ 🔴 [HIGH] Build a project
//   3. ✅ 🟡 [MEDIUM] Review async/await
//   4. ⬜ 🟡 [MEDIUM] Practice DOM manipulation
//   5. ⬜ 🟢 [LOW] Read documentation
//   6. ⬜ 🟢 [LOW] Write blog post
// ========================

// Display by priority
myTodos.displayByPriority();

// Display stats
myTodos.displayStats();
// Output:
// ===== STATISTICS =====
//   Total tasks:     6
//   Completed:       2
//   Pending:         4
//   High priority:   2
//   Completion rate: 33%
// ======================

// Remove a task
myTodos.removeTask(task6.id);
myTodos.displayStats();
