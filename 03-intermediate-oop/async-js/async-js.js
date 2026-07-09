/**
 * ============================================================
 * ASYNC JAVASCRIPT — Handling Operations That Take Time
 * ============================================================
 * 
 * JavaScript is single-threaded (one thing at a time), but
 * many real-world operations take time: fetching data, reading
 * files, waiting for timers. Async JavaScript lets us handle
 * these without freezing the page.
 * 
 * Prerequisites: You should be comfortable with functions,
 * callbacks, and basic JavaScript syntax.
 * ============================================================
 */

// ============================================================
// 1. THE PROBLEM: SYNCHRONOUS CODE
// ============================================================
// Normal code runs line by line, top to bottom. Each line
// waits for the previous one to finish.

console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
// Output:
// Step 1
// Step 2
// Step 3
// This is predictable and easy to understand.

// But what if one step takes 5 seconds? Everything after it
// would have to wait 5 seconds too. That is unacceptable
// for a web page.


// ============================================================
// 2. CALLBACKS — The Old Way
// ============================================================
// A callback is a function you pass to another function,
// to be called later (when the operation finishes).

// setTimeout is the simplest example: it runs code after a delay.

console.log("Before setTimeout");

setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("After setTimeout (runs immediately, not after 2 seconds)");

// Output order:
// Before setTimeout
// After setTimeout (runs immediately, not after 2 seconds)
// This runs after 2 seconds (comes last, even though it's listed second)

// The callback pattern works, but it gets messy with multiple
// async operations (this is called "callback hell").


// ============================================================
// 3. PROMISES — A Better Way
// ============================================================
// A Promise is an object that represents a future value.
// It can be in one of three states:
// - pending: the operation is still running
// - fulfilled: the operation succeeded
// - rejected: the operation failed

// Creating a Promise:
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    // Simulate a network request (takes 1 second)
    setTimeout(() => {
      if (userId > 0) {
        // Success — resolve with the user data
        resolve({
          id: userId,
          name: "Alice",
          email: "alice@example.com"
        });
      } else {
        // Failure — reject with an error
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

// Using a Promise with .then() and .catch():
console.log("Fetching user...");

fetchUser(1)
  .then(user => {
    // This runs when the Promise is fulfilled (success)
    console.log("User found:", user);
    console.log("User name:", user.name);
  })
  .catch(error => {
    // This runs when the Promise is rejected (failure)
    console.error("Error:", error.message);
  })
  .finally(() => {
    // This runs regardless of success or failure
    console.log("Fetch complete.");
  });

// Output (after 1 second):
// Fetching user...
// User found: { id: 1, name: 'Alice', email: 'alice@example.com' }
// User name: Alice
// Fetch complete.


// ============================================================
// 4. CHAINING PROMISES
// ============================================================
// You can chain multiple .then() calls to handle sequential
// async operations without callback hell.

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("\nStarting sequential operations...");

delay(1000)
  .then(() => {
    console.log("Step 1: Waited 1 second");
    return delay(1000);  // Return a new Promise for the next step
  })
  .then(() => {
    console.log("Step 2: Waited another second");
    return delay(1000);
  })
  .then(() => {
    console.log("Step 3: Waited a third second");
    console.log("All done!");
  });

// Output (over 3 seconds):
// Starting sequential operations...
// Step 1: Waited 1 second (after 1s)
// Step 2: Waited another second (after 2s)
// Step 3: Waited a third second (after 3s)
// All done!


// ============================================================
// 5. ASYNC/AWAIT — The Modern Way
// ============================================================
// async/await is syntactic sugar over Promises. It makes
// async code look and feel like regular synchronous code.

// "async" before a function means it returns a Promise.
// "await" inside an async function pauses execution until
// a Promise resolves.

async function getUserData(userId) {
  console.log("\nFetching user data...");
  
  try {
    // "await" pauses here until fetchUser resolves
    const user = await fetchUser(userId);
    console.log("User:", user.name);
    return user;
  } catch (error) {
    // This catches any error from the Promise
    console.error("Failed to fetch user:", error.message);
    return null;
  }
}

// Call the async function
getUserData(1);
// Output (after 1 second):
// Fetching user data...
// User: Alice


// ============================================================
// 6. HANDLING ERRORS WITH ASYNC/AWAIT
// ============================================================
// Always wrap await calls in try/catch to handle failures.

async function riskyOperation() {
  try {
    const user = await fetchUser(-1);  // This will reject
    console.log("This line never runs");
  } catch (error) {
    console.error("Caught error:", error.message);
  }
}

riskyOperation();
// Output (after 1 second):
// Caught error: Invalid user ID


// ============================================================
// 7. PARALLEL OPERATIONS — Running Things at the Same Time
// ============================================================
// Sometimes you want to run multiple async operations at the
// same time (not one after another). Use Promise.all() for this.

function fetchPost(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: postId, title: `Post ${postId}`, body: "..." });
    }, 1000);
  });
}

// Sequential (slow — takes 3 seconds):
async function fetchSequential() {
  console.log("\nFetching sequentially...");
  const start = Date.now();

  const post1 = await fetchPost(1);
  const post2 = await fetchPost(2);
  const post3 = await fetchPost(3);

  console.log(`Sequential: ${(Date.now() - start) / 1000}s`);
  return [post1, post2, post3];
}

// Parallel (fast — takes 1 second):
async function fetchParallel() {
  console.log("\nFetching in parallel...");
  const start = Date.now();

  // Promise.all() runs all promises at the same time
  const [post1, post2, post3] = await Promise.all([
    fetchPost(1),
    fetchPost(2),
    fetchPost(3)
  ]);

  console.log(`Parallel: ${(Date.now() - start) / 1000}s`);
  return [post1, post2, post3];
}

// Run both to see the difference:
fetchSequential().then(() => fetchParallel());


// ============================================================
// 8. THE EVENT LOOP — How It All Works
// ============================================================
// JavaScript has a single thread, but it can handle async
// operations thanks to the event loop.

// Here is the simplified mental model:
// 1. Your code runs synchronously (line by line).
// 2. When an async operation starts (setTimeout, fetch, etc.),
//    it is handed off to the browser's Web APIs.
// 3. Your code continues running (does not wait).
// 4. When the async operation finishes, its callback is placed
//    in the "callback queue."
// 5. The event loop checks: is the call stack empty?
//    If yes, it takes the next callback from the queue and runs it.

// This is why "After setTimeout" prints before "This runs
// after 2 seconds" — the setTimeout callback waits in the
// queue until the synchronous code finishes.

console.log("\n--- Event Loop Demo ---");
console.log("1. Synchronous code starts");

setTimeout(() => {
  console.log("3. setTimeout callback (async)");
}, 0);  // Even with 0ms delay, this runs after synchronous code

Promise.resolve().then(() => {
  console.log("2. Promise callback (microtask — runs before setTimeout)");
});

console.log("1. Synchronous code ends");

// Output:
// 1. Synchronous code starts
// 1. Synchronous code ends
// 2. Promise callback (microtask — runs before setTimeout)
// 3. setTimeout callback (async)

// Promises (microtasks) run before setTimeout (macrotasks).


// ============================================================
// 9. FETCH API — Getting Data from the Internet
// ============================================================
// fetch() is the built-in way to make HTTP requests.
// It returns a Promise.

async function fetchTodos() {
  try {
    console.log("\nFetching todos...");
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const todo = await response.json();  // Parse JSON response
    console.log("Todo:", todo);
    return todo;
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

// Uncomment to test (requires internet connection):
// fetchTodos();


// ============================================================
// 10. PRACTICAL EXAMPLE — Weather App Logic
// ============================================================
// A realistic example combining classes, async/await, and fetch.

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
  }

  async getWeather(city) {
    try {
      // Note: This is a real API call. You need a valid API key.
      // For learning, use the mock version below instead.
      const response = await fetch(
        `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity
      };
    } catch (error) {
      throw new Error(`Failed to get weather: ${error.message}`);
    }
  }
}

// Mock version for learning (no API key needed):
function getMockWeather(city) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5,
        description: "partly cloudy",
        humidity: Math.floor(Math.random() * 40) + 40
      });
    }, 1000);
  });
}

async function displayWeather(city) {
  console.log(`\nFetching weather for ${city}...`);
  const weather = await getMockWeather(city);
  console.log(`
    📍 ${weather.city}
    🌡️  Temperature: ${weather.temperature}°C
    ☁️  Conditions: ${weather.description}
    💧 Humidity: ${weather.humidity}%
  `);
}

displayWeather("London");


console.log("\n=== Async JavaScript Section Complete ===");
console.log("Move on to projects to practice what you learned!");
