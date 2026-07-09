/**
 * ============================================================
 * PROJECT: Palindrome Checker
 * ============================================================
 * 
 * A palindrome is a word, phrase, or number that reads the
 * same forwards and backwards. Examples: "racecar", "madam",
 * "level". This program checks if a given string is a
 * palindrome.
 * 
 * Skills practiced: strings, loops, conditionals, functions,
 * string manipulation.
 * ============================================================
 */

// ============================================================
// METHOD 1: Using a Loop (Beginner-Friendly)
// ============================================================
// This is the most straightforward approach: reverse the string
// by looping through it backwards, then compare.

function isPalindrome(str) {
  // Convert to lowercase and remove spaces for a fair comparison
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  
  // Build the reversed string
  let reversed = "";
  for (let i = cleaned.length - 1; i >= 0; i--) {
    reversed += cleaned[i];
  }
  
  // Compare original to reversed
  return cleaned === reversed;
}

// Test cases
console.log("===== METHOD 1: Loop =====");
console.log(`"racecar" → ${isPalindrome("racecar")}`);   // Output: true
console.log(`"hello"   → ${isPalindrome("hello")}`);     // Output: false
console.log(`"Madam"   → ${isPalindrome("Madam")}`);     // Output: true
console.log(`"A man a plan a canal Panama" → ${isPalindrome("A man a plan a canal Panama")}`);  // Output: true
console.log("");


// ============================================================
// METHOD 2: Using Built-in Methods (More Idiomatic)
// ============================================================
// JavaScript strings have methods like split(), reverse(),
// and join() that make this very concise.

function isPalindromeConcise(str) {
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

console.log("===== METHOD 2: Built-in Methods =====");
console.log(`"racecar" → ${isPalindromeConcise("racecar")}`);   // Output: true
console.log(`"world"   → ${isPalindromeConcise("world")}`);     // Output: false
console.log("");


// ============================================================
// METHOD 3: Two-Pointer Technique (Most Efficient)
// ============================================================
// Instead of reversing the whole string, compare characters
// from both ends moving inward. This is faster because it
// stops as soon as it finds a mismatch.

function isPalindromeEfficient(str) {
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  
  let left = 0;                        // Start from the beginning
  let right = cleaned.length - 1;      // Start from the end
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;  // Mismatch found — not a palindrome
    }
    left++;    // Move the left pointer forward
    right--;   // Move the right pointer backward
  }
  
  return true;  // All characters matched
}

console.log("===== METHOD 3: Two-Pointer =====");
console.log(`"racecar" → ${isPalindromeEfficient("racecar")}`);   // Output: true
console.log(`"hello"   → ${isPalindromeEfficient("hello")}`);     // Output: false
console.log(`"Was it a car or a cat I saw" → ${isPalindromeEfficient("Was it a car or a cat I saw")}`);  // Output: true
console.log("");


// ============================================================
// PRACTICAL EXAMPLE: Finding All Palindromes in a List
// ============================================================

function findPalindromes(words) {
  const palindromes = [];
  
  for (let i = 0; i < words.length; i++) {
    if (isPalindrome(words[i])) {
      palindromes.push(words[i]);
    }
  }
  
  return palindromes;
}

const wordList = [
  "racecar", "hello", "madam", "world", "level",
  "python", "civic", "javascript", "radar", "deed"
];

const found = findPalindromes(wordList);
console.log("===== FINDING PALINDROMES =====");
console.log("Word list:", wordList.join(", "));
console.log("Palindromes found:", found.join(", "));
// Output: Palindromes found: racecar, madam, level, civic, radar, deed


// ============================================================
// BONUS: Check a Number (Not Just Strings)
// ============================================================

function isPalindromeNumber(num) {
  const str = String(num);
  return isPalindrome(str);
}

console.log("");
console.log("===== NUMBER PALINDROMES =====");
console.log(`121 → ${isPalindromeNumber(121)}`);     // Output: true
console.log(`123 → ${isPalindromeNumber(123)}`);     // Output: false
console.log(`1221 → ${isPalindromeNumber(1221)}`);   // Output: true
console.log(`123454321 → ${isPalindromeNumber(123454321)}`);  // Output: true
