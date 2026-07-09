/**
 * ============================================================
 * MODULES — Organizing Code Across Files
 * ============================================================
 * 
 * Modules let you split code into separate files and share
 * functionality between them. Each module has its own scope.
 * 
 * NOTE: To run this code, you need:
 * 1. An HTML file with <script type="module" src="app.js">
 * 2. All imported files in the same directory
 * 3. A local server (not file://)
 * ============================================================
 */

// ============================================================
// 1. Named Exports
// ============================================================
// Export multiple things by name.

// --- math.js (this would be a separate file) ---
// export function add(a, b) {
//   return a + b;
// }
//
// export function subtract(a, b) {
//   return a - b;
// }
//
// export const PI = 3.14159;

// --- app.js (importing) ---
// import { add, subtract, PI } from './math.js';
//
// console.log(add(2, 3));       // 5
// console.log(subtract(10, 4)); // 6
// console.log(PI);              // 3.14159


// ============================================================
// 2. Default Exports
// ============================================================
// Each module can have ONE default export.
// The name is chosen by the importer.

// --- User.js ---
// export default class User {
//   constructor(name) {
//     this.name = name;
//   }
//   greet() {
//     return `Hello, ${this.name}`;
//   }
// }

// --- app.js ---
// import User from './User.js';
//
// const alice = new User("Alice");
// console.log(alice.greet());  // Hello, Alice


// ============================================================
// 3. Importing Everything
// ============================================================
// Import all named exports as an object.

// --- app.js ---
// import * as Math from './math.js';
//
// console.log(Math.add(2, 3));  // 5
// console.log(Math.PI);          // 3.14159


// ============================================================
// 4. Renaming Imports
// ============================================================
// Give imported names different local names.

// import { add as addition, PI as pi } from './math.js';
//
// console.log(addition(2, 3));  // 5
// console.log(pi);              // 3.14159


// ============================================================
// 5. Re-exporting
// ============================================================
// Export everything from another module.

// --- index.js (barrel file) ---
// export { add, subtract, PI } from './math.js';
// export { capitalize, lowercase } from './utils.js';


// ============================================================
// 6. Practical Example — Organized Project
// ============================================================

// --- utils.js ---
// export function formatDate(date) {
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// }
//
// export function debounce(fn, delay) {
//   let timer;
//   return function(...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn.apply(this, args), delay);
//   };
// }
//
// export const API_BASE = "https://api.example.com";


// --- api.js ---
// import { API_BASE } from './utils.js';
//
// export async function getUsers() {
//   const response = await fetch(`${API_BASE}/users`);
//   return response.json();
// }
//
// export async function getUser(id) {
//   const response = await fetch(`${API_BASE}/users/${id}`);
//   return response.json();
// }


// --- app.js ---
// import { formatDate, debounce } from './utils.js';
// import { getUsers } from './api.js';
//
// async function displayUsers() {
//   const users = await getUsers();
//   users.forEach(user => {
//     console.log(`${user.name} (since ${formatDate(new Date(user.joinDate))})`);
//   });
// }
//
// displayUsers();


// ============================================================
// 7. Dynamic Imports
// ============================================================
// Load a module only when needed (code splitting).

async function loadFeature() {
  // This loads the module on demand:
  const module = await import('./heavy-feature.js');
  module.init();
}

// Trigger on user action:
// button.addEventListener('click', loadFeature);


// ============================================================
// HOW TO RUN
// ============================================================
//
// 1. Create an index.html file:
//
//    <!DOCTYPE html>
//    <html>
//    <head><title>Modules Demo</title></head>
//    <body>
//      <h1>Modules Work!</h1>
//      <script type="module" src="modules.js"></script>
//    </body>
//    </html>
//
// 2. Start a local server:
//    - VS Code: Install "Live Server" extension, right-click index.html → "Open with Live Server"
//    - Terminal: npx serve . (or python3 -m http.server)
//
// 3. Open http://localhost:5500 (or whatever port the server uses)
//
// 4. Open the browser console to see the output.
//
// NOTE: Opening index.html directly as a file (file://) will NOT work
// with modules due to browser security restrictions.
