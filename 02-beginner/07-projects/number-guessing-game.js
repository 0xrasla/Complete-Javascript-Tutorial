/**
 * ============================================================
 * PROJECT: Number Guessing Game
 * ============================================================
 * 
 * A simple game where the computer picks a random number
 * between 1 and 100, and the player tries to guess it.
 * After each guess, the game tells the player if they are
 * too high, too low, or correct.
 * 
 * Skills practiced: Math.random, loops, conditionals, functions,
 * variables.
 * ============================================================
 */

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} A random integer between min and max
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Compares the guess to the secret number and returns feedback.
 * @param {number} guess - The player's guess
 * @param {number} secret - The secret number
 * @returns {string} Feedback: "correct", "too high", or "too low"
 */
function checkGuess(guess, secret) {
  if (guess === secret) {
    return "correct";
  } else if (guess > secret) {
    return "too high";
  } else {
    return "too low";
  }
}


// ============================================================
// GAME SIMULATION
// ============================================================

// In a real game, you would use user input (like prompt()).
// Here, we simulate a player guessing intelligently using
// a binary search strategy (always guess the middle of the
// remaining range).

function simulateGame() {
  const secretNumber = getRandomInt(1, 100);
  let min = 1;
  let max = 100;
  let attempts = 0;
  
  console.log("=== NUMBER GUESSING GAME ===");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("");
  
  while (true) {
    // Binary search: guess the middle of the range
    const guess = Math.floor((min + max) / 2);
    attempts++;
    
    const feedback = checkGuess(guess, secretNumber);
    
    console.log(`Attempt ${attempts}: Guessing ${guess}... ${feedback}`);
    
    if (feedback === "correct") {
      console.log("");
      console.log(`Got it! The number was ${secretNumber}.`);
      console.log(`It took ${attempts} attempts.`);
      break;
    } else if (feedback === "too high") {
      max = guess - 1;
    } else {
      min = guess + 1;
    }
  }
}

// Run the game
simulateGame();

// Sample output:
// === NUMBER GUESSING GAME ===
// I'm thinking of a number between 1 and 100.
//
// Attempt 1: Guessing 50... too high
// Attempt 2: Guessing 25... too low
// Attempt 3: Guessing 37... too high
// Attempt 4: Guessing 31... too high
// Attempt 5: Guessing 28... too low
// Attempt 6: Guessing 29... correct
//
// Got it! The number was 29.
// It took 6 attempts.


// ============================================================
// BONUS: Interactive version (runs in browser)
// ============================================================
// Uncomment this section to play in a browser with prompt().

/*
function playInteractive() {
  const secretNumber = getRandomInt(1, 100);
  let attempts = 0;
  
  console.log("=== INTERACTIVE NUMBER GUESSING GAME ===");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("Type your guesses in the console.");
  
  // Note: prompt() is a browser function that shows a popup.
  // It will not work in Node.js or a pure console environment.
  
  while (true) {
    const input = prompt("Enter your guess (1-100):");
    const guess = parseInt(input);
    
    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      continue;
    }
    
    attempts++;
    const feedback = checkGuess(guess, secretNumber);
    
    if (feedback === "correct") {
      alert(`Correct! The number was ${secretNumber}. It took you ${attempts} attempts.`);
      break;
    } else if (feedback === "too high") {
      console.log(`${guess} is too high. Try again.`);
    } else {
      console.log(`${guess} is too low. Try again.`);
    }
  }
}

// playInteractive();
*/
