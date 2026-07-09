# 04 — Modules

## Why Modules Matter

As your code grows, putting everything in one file becomes unmanageable. Modules let you **split code into separate files** and **share functionality** between them. Each module has its own scope — variables and functions don't leak into other files.

---

## The Problem Without Modules

Without modules, all scripts share the global scope:

```javascript
// script1.js
var name = "Alice";

// script2.js
var name = "Bob";  // Overwrites script1's variable!
```

There's no way to isolate code. Naming conflicts are inevitable.

---

## ES Modules — The Modern Way

ES modules use `import` and `export` to share code between files.

### Creating a Module

Any JavaScript file is a module if it uses `export`:

```javascript
// math.js — this is a module

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

### Using a Module

Import what you need from another file:

```javascript
// app.js — this is a module

import { add, subtract, PI } from './math.js';

console.log(add(2, 3));       // 5
console.log(subtract(10, 4)); // 6
console.log(PI);              // 3.14159
```

---

## Exporting

### Named Exports

Export multiple things by name:

```javascript
// utils.js
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function lowercase(str) {
  return str.toLowerCase();
}

export const MAX_LENGTH = 100;
```

### Default Export

Each module can have **one** default export. The name is chosen by the importer:

```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}`;
  }
}
```

```javascript
// app.js
import User from './User.js';

const alice = new User("Alice");
console.log(alice.greet());  // Hello, Alice
```

### Exporting Everything

Re-export all named exports from another module:

```javascript
// index.js — re-export everything
export { add, subtract, PI } from './math.js';
export { capitalize, lowercase } from './utils.js';
```

---

## Importing

### Named Imports

```javascript
import { add, PI } from './math.js';
```

### Renaming Imports

```javascript
import { add as addition, PI as pi } from './math.js';
```

### Default Import

```javascript
import User from './User.js';
```

### Import Everything

```javascript
import * as Math from './math.js';

console.log(Math.add(2, 3));  // 5
console.log(Math.PI);          // 3.14159
```

---

## How to Run ES Modules

ES modules require a **module context**. You cannot use `import`/`export` in a regular `<script>` tag.

### Option 1: HTML with type="module"

```html
<!-- index.html -->
<script type="module" src="app.js"></script>
```

### Option 2: Node.js (v14+)

```bash
# Add to package.json or use .mjs extension
node --experimental-modules app.mjs
```

### Option 3: Live Server

Use VS Code's Live Server extension or any local server — modules work over HTTP.

**Important:** Opening the HTML file directly (`file://`) will **not** work with modules due to CORS restrictions.

---

## Practical Example — Organizing a Project

### File Structure

```
project/
  utils.js
  api.js
  app.js
  index.html
```

### utils.js

```javascript
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export const API_BASE = "https://api.example.com";
```

### api.js

```javascript
import { API_BASE } from './utils.js';

export async function getUsers() {
  const response = await fetch(`${API_BASE}/users`);
  return response.json();
}

export async function getUser(id) {
  const response = await fetch(`${API_BASE}/users/${id}`);
  return response.json();
}
```

### app.js

```javascript
import { formatDate, debounce } from './utils.js';
import { getUsers } from './api.js';

async function displayUsers() {
  const users = await getUsers();
  users.forEach(user => {
    console.log(`${user.name} (since ${formatDate(new Date(user.joinDate))})`);
  });
}

displayUsers();
```

### index.html

```html
<!DOCTYPE html>
<html>
<head><title>Module Demo</title></head>
<body>
  <h1>Users</h1>
  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## Dynamic Imports

Load a module only when you need it (code splitting):

```javascript
async function loadFeature() {
  const module = await import('./heavy-feature.js');
  module.init();
}

// Load on button click:
button.addEventListener('click', loadFeature);
```

---

## Quick Reference

| Syntax | Purpose |
|--------|---------|
| `export function fn()` | Named export |
| `export default class Foo` | Default export |
| `import { fn } from './file.js'` | Named import |
| `import Foo from './file.js'` | Default import |
| `import * as lib from './file.js'` | Import everything |
| `import('./file.js')` | Dynamic import |

---

## Key Takeaways

1. **Every `.js` file is a module** if it uses `import` or `export`.
2. **Use named exports** for utilities, **default exports** for main classes/functions.
3. **Modules run in strict mode** automatically — no need to add `"use strict"`.
4. **Modules have their own scope** — variables don't leak to other files.
5. **Use `<script type="module">`** in HTML — regular scripts cannot use imports.
