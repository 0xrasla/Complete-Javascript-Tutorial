/**
 * ============================================================
 * REGULAR EXPRESSIONS — Pattern Matching in Strings
 * ============================================================
 * 
 * Regex lets you search, match, and manipulate text
 * with patterns. Essential for validation, parsing,
 * and text processing.
 * ============================================================
 */

// ============================================================
// 1. Creating a Regex
// ============================================================
// Two ways: literal syntax (preferred) or constructor.

const literal = /hello/;
const constructed = new RegExp("hello");

console.log(literal.test("hello world"));  // true

console.log("---");

// ============================================================
// 2. Testing Matches
// ============================================================

const pattern = /hello/;

// test() — returns true or false
console.log(pattern.test("hello world"));  // true
console.log(pattern.test("Hello World"));  // false (case-sensitive)
console.log(pattern.test("say hello"));    // true

// match() — returns the match details
const match = "hello world".match(/hello/);
console.log(match);        // ["hello"]
console.log(match.index);  // 0

const noMatch = "hello world".match(/goodbye/);
console.log(noMatch);      // null

console.log("---");

// ============================================================
// 3. Special Characters
// ============================================================

// . = any single character
console.log(/h.llo/.test("hello"));  // true
console.log(/h.llo/.test("hallo"));  // true
console.log(/h.llo/.test("hllo"));   // false

// \d = digit (0-9)
console.log(/\d/.test("a1b"));  // true
console.log(/\d/.test("abc"));  // false

// \w = word character (letter, digit, underscore)
console.log(/\w/.test("a1"));   // true
console.log(/\w/.test("@!"));   // false

// \s = whitespace
console.log(/\s/.test("a b"));  // true
console.log(/\s/.test("ab"));   // false

console.log("---");

// ============================================================
// 4. Quantifiers
// ============================================================

// * = zero or more
console.log(/a*/.test(""));  // true

// + = one or more
console.log(/a+/.test("a"));    // true
console.log(/a+/.test(""));     // false

// ? = zero or one
console.log(/colou?r/.test("color"));   // true
console.log(/colou?r/.test("colour"));  // true

// {n} = exactly n times
console.log(/\d{3}/.test("123"));    // true
console.log(/\d{3}/.test("12"));     // false

// {n,m} = between n and m times
console.log(/\d{2,4}/.test("12"));     // true
console.log(/\d{2,4}/.test("1234"));   // true
console.log(/\d{2,4}/.test("12345"));  // true (matches first 4)

console.log("---");

// ============================================================
// 5. Anchors
// ============================================================

// ^ = start of string
console.log(/^hello/.test("hello world"));  // true
console.log(/^hello/.test("say hello"));    // false

// $ = end of string
console.log(/world$/.test("hello world"));  // true
console.log(/world$/.test("world!"));       // false

// Exact match:
console.log(/^hello$/.test("hello"));  // true
console.log(/^hello$/.test("hello!")); // false

console.log("---");

// ============================================================
// 6. Character Classes
// ============================================================

// [abc] = matches a, b, or c
console.log(/[aeiou]/.test("hello"));  // true (has vowels)

// [^abc] = NOT a, b, or c
console.log(/[^aeiou]/.test("hello"));  // true (has consonants)

// [a-z] = lowercase letters
console.log(/[a-z]/.test("Hello"));  // true

// [A-Z] = uppercase letters
console.log(/[A-Z]/.test("Hello"));  // true

// [0-9] = digits
console.log(/[0-9]/.test("123"));  // true

// Combined:
console.log(/[a-zA-Z]{3}/.test("abc"));  // true (3 letters)
console.log(/[a-zA-Z]{3}/.test("ab"));     // false (only 2)

console.log("---");

// ============================================================
// 7. Flags
// ============================================================

const text = "hello HELLO hello";

// No flag — first match only:
console.log(text.match(/hello/));    // ["hello"]

// g — all matches:
console.log(text.match(/hello/g));   // ["hello", "hello"]

// i — case-insensitive:
console.log(text.match(/hello/gi));  // ["hello", "HELLO", "hello"]

console.log("---");

// ============================================================
// 8. Practical Patterns
// ============================================================

// Email validation:
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("alice@example.com"));  // true
console.log(email.test("not-an-email"));       // false

// Phone number (10 digits with dashes):
const phone = /^\d{3}-\d{3}-\d{4}$/;
console.log(phone.test("123-456-7890"));  // true
console.log(phone.test("1234567890"));    // false

// Password strength (8+ chars, upper, lower, digit):
const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
console.log(strong.test("Pass1234"));   // true
console.log(strong.test("pass1234"));   // false
console.log(strong.test("PASS1234"));   // false

// URL (starts with http/https):
const url = /^https?:\/\/.+/;
console.log(url.test("https://example.com"));  // true
console.log(url.test("http://example.com"));   // true
console.log(url.test("ftp://example.com"));    // false

console.log("---");

// ============================================================
// 9. String Methods with Regex
// ============================================================

// replace() — replace matches:
const greeting = "Hello World! Hello Universe!";
console.log(greeting.replace(/hello/gi, "Hi"));
// "Hi World! Hi Universe!"

// Remove non-alphanumeric:
const dirty = "User@#$Name123!@#";
const clean = dirty.replace(/[^a-zA-Z0-9]/g, "");
console.log(clean);  // "UserName123"

// split() — split by pattern:
const csv = "apple,banana,cherry";
console.log(csv.split(/,/));  // ["apple", "banana", "cherry"]

const words = "hello   world   foo".split(/\s+/);
console.log(words);  // ["hello", "world", "foo"]

console.log("---");

// ============================================================
// 10. Capture Groups
// ============================================================

// Basic groups:
const date = "2024-12-25";
const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(match[0]);  // "2024-12-25" (full match)
console.log(match[1]);  // "2024" (year)
console.log(match[2]);  // "12" (month)
console.log(match[3]);  // "25" (day)

// Named groups:
const match2 = date.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(match2.groups.year);   // "2024"
console.log(match2.groups.month);  // "12"
console.log(match2.groups.day);    // "25"

// Replace with groups ($1, $2, etc.):
const name = "Alice Smith";
const formatted = name.replace(/(\w+) (\w+)/, "$2, $1");
console.log(formatted);  // "Smith, Alice"

console.log("---");

// ============================================================
// 11. Practical Example — Form Validation
// ============================================================

function validateForm(data) {
  const errors = [];

  if (!/^[a-zA-Z\s]{2,}$/.test(data.name)) {
    errors.push("Name must be at least 2 letters");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email address");
  }

  if (!/^\d{10,}$/.test(data.phone)) {
    errors.push("Phone must be at least 10 digits");
  }

  return errors;
}

const valid = validateForm({
  name: "Alice Smith",
  email: "alice@example.com",
  phone: "1234567890"
});
console.log("Valid:", valid);  // []

const invalid = validateForm({
  name: "",
  email: "not-email",
  phone: "123"
});
console.log("Invalid:", invalid);
// ["Name must be at least 2 letters", "Invalid email address", "Phone must be at least 10 digits"]
