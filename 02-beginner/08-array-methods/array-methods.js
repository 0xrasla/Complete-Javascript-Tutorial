/**
 * ============================================================
 * ARRAY METHODS — Working with Lists of Data
 * ============================================================
 * 
 * Arrays store lists. These methods let you transform,
 * filter, search, and summarize those lists.
 * ============================================================
 */

// ============================================================
// 1. forEach — Run Something for Each Element
// ============================================================
// Executes a function once per element. Returns undefined.

const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(fruit, index) {
  console.log(`${index}: ${fruit}`);
});
// Output:
// 0: apple
// 1: banana
// 2: cherry

console.log("---");

// ============================================================
// 2. map — Transform Every Element
// ============================================================
// Creates a NEW array with the results of calling a function
// on every element. Original array is unchanged.

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log("Original:", numbers);   // [1, 2, 3, 4, 5]
console.log("Doubled:", doubled);     // [2, 4, 6, 8, 10]

// Transform objects:
const users = ["alice", "bob", "charlie"];
const capitalized = users.map(function(name) {
  return name[0].toUpperCase() + name.slice(1);
});
console.log(capitalized);  // ["Alice", "Bob", "Charlie"]

console.log("---");

// ============================================================
// 3. filter — Keep Elements That Match a Condition
// ============================================================
// Creates a NEW array with elements that return true
// from the test function.

const scores = [85, 42, 93, 67, 71, 55];

const passing = scores.filter(function(score) {
  return score >= 70;
});
console.log("Passing scores:", passing);  // [85, 93, 71]

// Filter objects:
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 }
];
const adults = people.filter(function(person) {
  return person.age >= 18;
});
console.log("Adults:", adults);
// [{ name: "Alice", age: 25 }, { name: "Charlie", age: 32 }]

console.log("---");

// ============================================================
// 4. find — Get the First Match
// ============================================================
// Returns the FIRST element that passes the test.
// Returns undefined if nothing matches.

const product = people.find(function(person) {
  return person.age > 30;
});
console.log("First person over 30:", product);
// { name: "Charlie", age: 32 }

const notFound = people.find(function(person) {
  return person.age > 100;
});
console.log("Person over 100:", notFound);  // undefined

console.log("---");

// ============================================================
// 5. reduce — Combine Into a Single Value
// ============================================================
// Processes elements and accumulates a single result.
// Takes a reducer function and an initial value.

const prices = [10, 20, 30, 40, 50];

const total = prices.reduce(function(accumulator, current) {
  return accumulator + current;
}, 0);

console.log("Total:", total);  // 150

// Step by step:
// accumulator=0  + 10 = 10
// accumulator=10 + 20 = 30
// accumulator=30 + 30 = 60
// accumulator=60 + 40 = 100
// accumulator=100 + 50 = 150

// More practical example — count occurrences:
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const wordCount = words.reduce(function(counts, word) {
  counts[word] = (counts[word] || 0) + 1;
  return counts;
}, {});
console.log("Word counts:", wordCount);
// { apple: 3, banana: 2, cherry: 1 }

console.log("---");

// ============================================================
// 6. sort — Arrange Elements
// ============================================================
// Sorts the array IN PLACE (mutates the original).
// Default: sorts as strings (alphabetically).

const names = ["Charlie", "Alice", "Bob"];
names.sort();
console.log("Sorted names:", names);  // ["Alice", "Bob", "Charlie"]

// For numbers, you MUST provide a comparison function:
const unsorted = [100, 1, 20, 5];
unsorted.sort(function(a, b) {
  return a - b;  // ascending order
});
console.log("Sorted numbers:", unsorted);  // [1, 5, 20, 100]

// Sort objects by a property:
const products = [
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 699 },
  { name: "Tablet", price: 449 }
];
products.sort(function(a, b) {
  return a.price - b.price;
});
console.log("Products by price:");
products.forEach(function(p) {
  console.log(`  ${p.name}: $${p.price}`);
});

console.log("---");

// ============================================================
// 7. Chaining — Combine Methods Together
// ============================================================
// Call multiple methods in sequence. Each receives
// the output of the previous one.

const data = [
  { name: "Alice", age: 25, score: 88 },
  { name: "Bob", age: 17, score: 92 },
  { name: "Charlie", age: 32, score: 75 },
  { name: "Diana", age: 29, score: 95 }
];

// Get names of adults with high scores, sorted alphabetically:
const result = data
  .filter(function(person) {
    return person.age >= 25 && person.score >= 80;
  })
  .map(function(person) {
    return person.name;
  })
  .sort();

console.log("High-scoring adults:", result);
// ["Alice", "Diana"]

// Calculate average score of adults:
const adultScores = data
  .filter(function(person) { return person.age >= 25; })
  .map(function(person) { return person.score; });

const average = adultScores.reduce(function(sum, score) {
  return sum + score;
}, 0) / adultScores.length;

console.log("Average adult score:", average);  // 86

console.log("---");

// ============================================================
// 8. Arrow Functions (Shorthand)
// ============================================================
// Arrow functions make the syntax shorter.

const nums = [1, 2, 3, 4, 5];

// Traditional:
const squared1 = nums.map(function(n) { return n * n; });

// Arrow:
const squared2 = nums.map(n => n * n);

// With filter:
const evens1 = nums.filter(function(n) { return n % 2 === 0; });
const evens2 = nums.filter(n => n % 2 === 0);

console.log("Squared:", squared2);  // [1, 4, 9, 16, 25]
console.log("Evens:", evens2);      // [2, 4]

console.log("---");

// ============================================================
// 9. Practical Example — Processing Sales Data
// ============================================================

const sales = [
  { product: "Laptop", amount: 1200, region: "North" },
  { product: "Phone", amount: 800, region: "South" },
  { product: "Tablet", amount: 500, region: "North" },
  { product: "Laptop", amount: 900, region: "South" },
  { product: "Phone", amount: 750, region: "North" }
];

// Total revenue:
const totalRevenue = sales.reduce(function(sum, sale) {
  return sum + sale.amount;
}, 0);
console.log("Total revenue:", totalRevenue);  // 4150

// North region sales:
const northSales = sales.filter(sale => sale.region === "North");
console.log("North region sales:", northSales.length);  // 3

// Average sale amount:
const avgSale = totalRevenue / sales.length;
console.log("Average sale:", avgSale);  // 830

// Products sold (unique):
const products = [...new Set(sales.map(sale => sale.product))];
console.log("Products sold:", products);  // ["Laptop", "Phone", "Tablet"]
