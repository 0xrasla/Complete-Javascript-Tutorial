/**
 * ============================================================
 * PROJECT: Todo List (Full-Featured)
 * ============================================================
 * 
 * A complete to-do list application with categories,
 * priorities, due dates, and local storage persistence.
 * 
 * Skills practiced: classes, arrays, local storage, DOM
 * manipulation, event handling, date handling.
 * ============================================================
 */

// ============================================================
// TODO LIST CLASS
// ============================================================

class TodoList {
  constructor(storageKey = "myTodoList") {
    this.storageKey = storageKey;
    this.todos = this.#loadFromStorage();
    this.categories = ["General", "Work", "Personal", "Shopping"];
    this.currentFilter = "all";
    this.currentCategory = "all";
  }

  // ============================================================
  // CRUD OPERATIONS
  // ============================================================

  /**
   * Add a new todo item.
   * @param {string} text - The todo text
   * @param {Object} options - Optional settings
   * @returns {Object} The created todo
   */
  addTodo(text, options = {}) {
    const todo = {
      id: this.#generateId(),
      text: text.trim(),
      completed: false,
      category: options.category || "General",
      priority: options.priority || "medium",
      dueDate: options.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.todos.push(todo);
    this.#saveToStorage();
    console.log(`Added: "${todo.text}"`);
    return todo;
  }

  /**
   * Remove a todo by ID.
   * @param {string} id - The todo ID
   * @returns {boolean} True if removed
   */
  removeTodo(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      console.log("Todo not found");
      return false;
    }

    const removed = this.todos.splice(index, 1)[0];
    this.#saveToStorage();
    console.log(`Removed: "${removed.text}"`);
    return true;
  }

  /**
   * Toggle a todo's completed status.
   * @param {string} id - The todo ID
   * @returns {Object|null} The updated todo
   */
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      console.log("Todo not found");
      return null;
    }

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : null;
    this.#saveToStorage();
    return todo;
  }

  /**
   * Update a todo's text.
   * @param {string} id - The todo ID
   * @param {string} newText - The new text
   * @returns {Object|null} The updated todo
   */
  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      console.log("Todo not found");
      return null;
    }

    todo.text = newText.trim();
    this.#saveToStorage();
    return todo;
  }

  // ============================================================
  // FILTERING AND SORTING
  // ============================================================

  /**
   * Get todos filtered by current settings.
   * @returns {Object[]} Filtered todos
   */
  getFilteredTodos() {
    let filtered = [...this.todos];

    // Filter by completion status
    if (this.currentFilter === "active") {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.currentFilter === "completed") {
      filtered = filtered.filter(t => t.completed);
    }

    // Filter by category
    if (this.currentCategory !== "all") {
      filtered = filtered.filter(t => t.category === this.currentCategory);
    }

    return filtered;
  }

  /**
   * Sort todos by priority, due date, or creation date.
   * @param {string} sortBy - "priority", "dueDate", or "created"
   * @returns {Object[]} Sorted todos
   */
  sortTodos(sortBy = "created") {
    const filtered = this.getFilteredTodos();
    
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "created":
        default:
          return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  }

  /**
   * Set the current filter.
   * @param {string} filter - "all", "active", or "completed"
   */
  setFilter(filter) {
    if (["all", "active", "completed"].includes(filter)) {
      this.currentFilter = filter;
    }
  }

  /**
   * Set the current category filter.
   * @param {string} category - Category name or "all"
   */
  setCategory(category) {
    this.currentCategory = category;
  }

  // ============================================================
  // STATISTICS
  // ============================================================

  /**
   * Get statistics about the todo list.
   * @returns {Object} Statistics object
   */
  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = this.todos.filter(t => t.priority === "high" && !t.completed).length;
    const overdue = this.todos.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    return {
      total,
      completed,
      active,
      highPriority,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  // ============================================================
  // DISPLAY
  // ============================================================

  /**
   * Display all todos in a formatted list.
   */
  displayTodos() {
    const todos = this.sortTodos();
    
    console.log("\n===== TODO LIST =====");
    console.log(`Filter: ${this.currentFilter} | Category: ${this.currentCategory}`);
    console.log("");

    if (todos.length === 0) {
      console.log("  No todos found.");
    } else {
      todos.forEach((todo, index) => {
        const status = todo.completed ? "✅" : "⬜";
        const priority = todo.priority === "high" ? "🔴" :
                         todo.priority === "medium" ? "🟡" : "🟢";
        const dueDate = todo.dueDate ? ` (due: ${todo.dueDate})` : "";
        const overdue = !todo.completed && todo.dueDate && 
                        new Date(todo.dueDate) < new Date() ? " ⚠️ OVERDUE" : "";

        console.log(`  ${index + 1}. ${status} ${priority} [${todo.category}] ${todo.text}${dueDate}${overdue}`);
      });
    }

    console.log("");
    this.displayStats();
    console.log("======================\n");
  }

  /**
   * Display statistics.
   */
  displayStats() {
    const stats = this.getStats();
    console.log(`  📊 Total: ${stats.total} | Active: ${stats.active} | Completed: ${stats.completed}`);
    console.log(`  🔴 High priority: ${stats.highPriority} | ⚠️ Overdue: ${stats.overdue}`);
    console.log(`  📈 Completion: ${stats.completionRate}%`);
  }

  // ============================================================
  // PRIVATE METHODS
  // ============================================================

  #generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  #saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    } catch (e) {
      console.warn("Could not save to localStorage:", e.message);
    }
  }

  #loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load from localStorage:", e.message);
      return [];
    }
  }

  /**
   * Clear all completed todos.
   */
  clearCompleted() {
    const count = this.todos.filter(t => t.completed).length;
    this.todos = this.todos.filter(t => !t.completed);
    this.#saveToStorage();
    console.log(`Cleared ${count} completed todos`);
  }

  /**
   * Export todos to a JSON string.
   * @returns {string} JSON string
   */
  exportTodos() {
    return JSON.stringify(this.todos, null, 2);
  }

  /**
   * Import todos from a JSON string.
   * @param {string} jsonString - JSON string to import
   */
  importTodos(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        this.todos = imported;
        this.#saveToStorage();
        console.log(`Imported ${imported.length} todos`);
      } else {
        console.log("Invalid format: expected an array");
      }
    } catch (e) {
      console.log("Invalid JSON string");
    }
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

const myTodos = new TodoList();

// Add some todos
myTodos.addTodo("Learn JavaScript", { category: "Work", priority: "high" });
myTodos.addTodo("Buy groceries", { category: "Shopping", priority: "medium", dueDate: "2024-12-20" });
myTodos.addTodo("Read a book", { category: "Personal", priority: "low" });
myTodos.addTodo("Complete project", { category: "Work", priority: "high", dueDate: "2024-12-15" });
myTodos.addTodo("Call dentist", { category: "Personal", priority: "medium" });

// Complete some todos
myTodos.toggleTodo(myTodos.todos[0].id);

// Display all todos
myTodos.displayTodos();

// Filter by category
myTodos.setCategory("Work");
myTodos.displayTodos();

// Filter by status
myTodos.setFilter("active");
myTodos.displayTodos();

// Sort by priority
const sorted = myTodos.sortTodos("priority");
console.log("Sorted by priority:");
sorted.forEach(todo => {
  console.log(`  - [${todo.priority}] ${todo.text}`);
});

// Show stats
console.log("\nFinal Statistics:");
myTodos.displayStats();

// Export (for backup)
const backup = myTodos.exportTodos();
console.log("\nExported data:", backup.substring(0, 100) + "...");


console.log("=== Todo List Project Complete ===");
