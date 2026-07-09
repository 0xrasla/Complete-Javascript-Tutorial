/**
 * ============================================================
 * PROJECT: Tip Calculator
 * ============================================================
 * 
 * A simple program that calculates the tip amount and total
 * bill based on the bill amount, tip percentage, and number
 * of people splitting the bill.
 * 
 * Skills practiced: variables, functions, arithmetic, template
 * literals, conditionals.
 * ============================================================
 */

// ============================================================
// CONFIGURATION
// ============================================================
// These are the values the user would normally enter.

const billAmount = 85.50;       // The total before tip
const tipPercentage = 18;       // The tip percentage (18%)
const numberOfPeople = 4;       // How many people are splitting


// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Calculates the tip amount based on bill and percentage.
 * @param {number} bill - The bill amount
 * @param {number} percentage - The tip percentage (e.g., 18 for 18%)
 * @returns {number} The tip amount
 */
function calculateTip(bill, percentage) {
  return bill * (percentage / 100);
}

/**
 * Calculates the total bill including tip.
 * @param {number} bill - The bill amount
 * @param {number} tip - The tip amount
 * @returns {number} The total bill
 */
function calculateTotal(bill, tip) {
  return bill + tip;
}

/**
 * Calculates how much each person pays.
 * @param {number} total - The total bill
 * @param {number} people - The number of people
 * @returns {number} The amount per person
 */
function calculatePerPerson(total, people) {
  return total / people;
}


// ============================================================
// CALCULATIONS
// ============================================================

const tip = calculateTip(billAmount, tipPercentage);
const total = calculateTotal(billAmount, tip);
const perPerson = calculatePerPerson(total, numberOfPeople);


// ============================================================
// OUTPUT
// ============================================================

console.log("===== TIP CALCULATOR =====");
console.log(`Bill amount:   $${billAmount.toFixed(2)}`);
console.log(`Tip percentage: ${tipPercentage}%`);
console.log(`Tip amount:    $${tip.toFixed(2)}`);
console.log(`Total bill:    $${total.toFixed(2)}`);
console.log(`Split between: ${numberOfPeople} people`);
console.log(`Each person pays: $${perPerson.toFixed(2)}`);
console.log("===========================");

// Sample output:
// ===== TIP CALCULATOR =====
// Bill amount:   $85.50
// Tip percentage: 18%
// Tip amount:    $15.39
// Total bill:    $100.89
// Split between: 4 people
// Each person pays: $25.22
// ===========================


// ============================================================
// BONUS: What if tipPercentage is missing?
// ============================================================
// Use a default parameter to handle this case.

function calculateTipSafe(bill, percentage = 15) {
  return bill * (percentage / 100);
}

const tipDefault = calculateTipSafe(billAmount);  // No percentage provided
console.log(`\nDefault tip (15%): $${tipDefault.toFixed(2)}`);
// Output: Default tip (15%): $12.83
