# 11 — Regular Expressions

## Why Regular Expressions Matter

Regular expressions (regex) let you **search, match, and manipulate text** with patterns. Validating emails, extracting phone numbers, replacing text — regex handles all of it. It's one of the most powerful tools in JavaScript.

---

## Creating a Regex

Two ways to create a regex:

```javascript
// Literal syntax (preferred):
const pattern = /hello/;

// Constructor syntax:
const pattern2 = new RegExp("hello");
```

Literal syntax is faster and more common. Use the constructor only when building patterns from variables.

---

## Testing a Match

### test() — Returns true or false

```javascript
const pattern = /hello/;

console.log(pattern.test("hello world"));  // true
console.log(pattern.test("Hello World"));  // false (case-sensitive)
console.log(pattern.test("say hello"));    // true
```

### match() — Returns matches from a string

```javascript
const result = "hello world".match(/hello/);
console.log(result);  // ["hello"]

const noMatch = "hello world".match(/goodbye/);
console.log(noMatch);  // null
```

---

## Pattern Syntax

### Special Characters

| Character | Meaning |
|-----------|---------|
| `.` | Any single character (except newline) |
| `\d` | Digit (0-9) |
| `\w` | Word character (letter, digit, underscore) |
| `\s` | Whitespace (space, tab, newline) |
| `\D` | Not a digit |
| `\W` | Not a word character |
| `\S` | Not whitespace |

```javascript
console.log(/\d/.test("a1b"));  // true — contains a digit
console.log(/\d/.test("abc"));  // false — no digit
console.log(/\w/.test("a1"));   // true — contains a word character
console.log(/\s/.test("a b"));  // true — contains a space
```

### Quantifiers

| Quantifier | Meaning |
|------------|---------|
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one |
| `{n}` | Exactly n times |
| `{n,}` | n or more times |
| `{n,m}` | Between n and m times |

```javascript
console.log(/a+/.test("a"));       // true
console.log(/a+/.test(""));        // false (needs at least one)
console.log(/\d{3}/.test("123"));  // true (exactly 3 digits)
console.log(/\d{2,4}/.test("12")); // true (2-4 digits)
```

### Anchors

| Anchor | Meaning |
|--------|---------|
| `^` | Start of string |
| `$` | End of string |

```javascript
console.log(/^hello/.test("hello world"));  // true (starts with "hello")
console.log(/^hello/.test("say hello"));    // false
console.log(/world$/.test("hello world"));  // true (ends with "world")
console.log(/^hello$/.test("hello"));        // true (exact match)
```

### Character Classes

| Class | Meaning |
|-------|---------|
| `[abc]` | Matches a, b, or c |
| `[^abc]` | Matches anything except a, b, or c |
| `[a-z]` | Matches any lowercase letter |
| `[A-Z]` | Matches any uppercase letter |
| `[0-9]` | Matches any digit |

```javascript
console.log(/[aeiou]/.test("hello"));  // true (contains a vowel)
console.log(/[^aeiou]/.test("hello")); // true (contains consonants)
console.log(/[a-z]{3}/.test("abc"));   // true (3 lowercase letters)
```

---

## Flags

Flags modify how the pattern works:

| Flag | Meaning |
|------|---------|
| `g` | Global — find all matches, not just the first |
| `i` | Case-insensitive |
| `m` | Multiline — `^` and `$` match line starts/ends |

```javascript
// Without global flag — returns first match only:
"hello hello hello".match(/hello/);     // ["hello"]

// With global flag — returns all matches:
"hello hello hello".match(/hello/g);    // ["hello", "hello", "hello"]

// Case-insensitive:
"Hello HELLO hello".match(/hello/gi);   // ["Hello", "HELLO", "hello"]
```

---

## Practical Patterns

### Email Validation

```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailPattern.test("alice@example.com"));   // true
console.log(emailPattern.test("not-an-email"));        // false
console.log(emailPattern.test("alice@.com"));          // false
console.log(emailPattern.test("@example.com"));        // false
```

### Phone Number (10 digits)

```javascript
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

console.log(phonePattern.test("123-456-7890"));  // true
console.log(phonePattern.test("1234567890"));    // false
console.log(phonePattern.test("12-345-6789"));   // false
```

### URL Validation (simple)

```javascript
const urlPattern = /^https?:\/\/.+/;

console.log(urlPattern.test("https://example.com"));  // true
console.log(urlPattern.test("http://example.com"));   // true
console.log(urlPattern.test("ftp://example.com"));    // false
console.log(urlPattern.test("example.com"));          // false
```

### Password Strength (8+ chars, uppercase, lowercase, number)

```javascript
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

console.log(strongPassword.test("Pass1234"));   // true
console.log(strongPassword.test("pass1234"));   // false (no uppercase)
console.log(strongPassword.test("PASSWORD"));   // false (no lowercase)
console.log(strongPassword.test("Pass123"));    // false (too short)
```

---

## String Methods with Regex

### replace() — Replace matches

```javascript
const text = "Hello World! hello universe!";

// Replace first match:
console.log(text.replace(/hello/i, "Hi"));
// "Hi World! hello universe!"

// Replace all matches:
console.log(text.replace(/hello/gi, "Hi"));
// "Hi World! Hi universe!"

// Remove non-alphanumeric characters:
const cleaned = "User@#$Name123".replace(/[^a-zA-Z0-9]/g, "");
console.log(cleaned);  // "UserName123"
```

### split() — Split by pattern

```javascript
const csv = "apple,banana,cherry";
console.log(csv.split(/,/));  // ["apple", "banana", "cherry"]

const words = "hello   world   foo".split(/\s+/);
console.log(words);  // ["hello", "world", "foo"]
```

---

## Capture Groups

Parentheses `()` capture parts of a match:

```javascript
const date = "2024-12-25";
const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);

console.log(match[0]);  // "2024-12-25" (full match)
console.log(match[1]);  // "2024" (year)
console.log(match[2]);  // "12" (month)
console.log(match[3]);  // "25" (day)
```

### Named Groups

```javascript
const date2 = "2024-12-25";
const match2 = date2.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);

console.log(match2.groups.year);   // "2024"
console.log(match2.groups.month);  // "12"
console.log(match2.groups.day);    // "25"
```

### Replace with Capture Groups

```javascript
const name = "Alice Smith";
const formatted = name.replace(/(\w+) (\w+)/, "$2, $1");
console.log(formatted);  // "Smith, Alice"
```

---

## Quick Reference

| Pattern | Matches |
|---------|---------|
| `.` | Any character |
| `\d` | Digit |
| `\w` | Word character |
| `\s` | Whitespace |
| `^` | Start of string |
| `$` | End of string |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one |
| `{n}` | Exactly n |
| `[abc]` | Any of a, b, c |
| `[^abc]` | Not a, b, or c |
| `(group)` | Capture group |

---

## Key Takeaways

1. **Use literal syntax** (`/pattern/`) unless you need dynamic patterns.
2. **`test()`** returns true/false; **`match()`** returns the match details.
3. **Use the `g` flag** to find all matches, not just the first.
4. **Start simple** — most real-world patterns are short and specific.
5. **Test your regex** — use browser console or an online tool to verify patterns.
