/**
 * ============================================================
 * PROJECT: Quiz Application
 * ============================================================
 * 
 * An interactive quiz application with scoring, timer, and
 * results tracking. This project demonstrates classes,
 * arrays, object manipulation, and async concepts.
 * 
 * Skills practiced: classes, arrays, objects, conditionals,
 * functions, timer handling.
 * ============================================================
 */

// ============================================================
// QUIZ QUESTION CLASS
// ============================================================

class QuizQuestion {
  constructor(question, options, correctIndex, explanation) {
    this.question = question;
    this.options = options;
    this.correctIndex = correctIndex;
    this.explanation = explanation;
  }

  /**
   * Check if an answer is correct.
   * @param {number} selectedIndex - The index of the selected answer
   * @returns {Object} Result with isCorrect flag and explanation
   */
  checkAnswer(selectedIndex) {
    const isCorrect = selectedIndex === this.correctIndex;
    return {
      isCorrect,
      correctAnswer: this.options[this.correctIndex],
      explanation: this.explanation
    };
  }

  /**
   * Display the question and options.
   */
  display() {
    console.log(`\n📝 ${this.question}\n`);
    this.options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`);
    });
  }
}


// ============================================================
// QUIZ CLASS
// ============================================================

class Quiz {
  constructor(title, questions) {
    this.title = title;
    this.questions = questions;
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = null;
    this.endTime = null;
    this.timePerQuestion = 30;  // seconds
  }

  /**
   * Start the quiz.
   */
  start() {
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = Date.now();
    console.log(`\n===== ${this.title} =====`);
    console.log(`Questions: ${this.questions.length}`);
    console.log(`Time per question: ${this.timePerQuestion} seconds`);
    console.log("Let's begin!\n");
  }

  /**
   * Get the current question.
   * @returns {QuizQuestion|null}
   */
  getCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      return null;
    }
    return this.questions[this.currentIndex];
  }

  /**
   * Submit an answer for the current question.
   * @param {number} answerIndex - The selected answer index
   * @returns {Object} Result of the answer
   */
  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    if (!question) {
      console.log("Quiz is already finished!");
      return null;
    }

    const result = question.checkAnswer(answerIndex);
    
    this.answers.push({
      questionIndex: this.currentIndex,
      selectedIndex: answerIndex,
      ...result
    });

    this.currentIndex++;

    return result;
  }

  /**
   * Move to the next question without answering.
   * @returns {boolean} True if moved, false if at end
   */
  skipQuestion() {
    if (this.currentIndex >= this.questions.length) {
      return false;
    }

    this.answers.push({
      questionIndex: this.currentIndex,
      selectedIndex: -1,
      isCorrect: false,
      correctAnswer: this.questions[this.currentIndex].options[this.questions[this.currentIndex].correctIndex],
      explanation: "Skipped"
    });

    this.currentIndex++;
    return true;
  }

  /**
   * Finish the quiz and calculate results.
   * @returns {Object} Quiz results
   */
  finish() {
    this.endTime = Date.now();
    return this.getResults();
  }

  /**
   * Get the quiz results.
   * @returns {Object} Results object
   */
  getResults() {
    const totalTime = this.endTime ? (this.endTime - this.startTime) / 1000 : 0;
    const correct = this.answers.filter(a => a.isCorrect).length;
    const total = this.questions.length;
    const skipped = this.answers.filter(a => a.selectedIndex === -1).length;
    const incorrect = total - correct - skipped;

    // Calculate grade
    const percentage = Math.round((correct / total) * 100);
    let grade;
    if (percentage >= 90) grade = "A";
    else if (percentage >= 80) grade = "B";
    else if (percentage >= 70) grade = "C";
    else if (percentage >= 60) grade = "D";
    else grade = "F";

    return {
      title: this.title,
      score: correct,
      total,
      percentage,
      grade,
      correct,
      incorrect,
      skipped,
      totalTime: Math.round(totalTime),
      averageTimePerQuestion: Math.round(totalTime / total),
      answers: this.answers
    };
  }

  /**
   * Display the results.
   */
  displayResults() {
    const results = this.getResults();

    console.log("\n===== QUIZ RESULTS =====");
    console.log(`  📋 ${results.title}`);
    console.log(`  📊 Score: ${results.score}/${results.total} (${results.percentage}%)`);
    console.log(`  📝 Grade: ${results.grade}`);
    console.log(`  ✅ Correct: ${results.correct}`);
    console.log(`  ❌ Incorrect: ${results.incorrect}`);
    console.log(`  ⏭️  Skipped: ${results.skipped}`);
    console.log(`  ⏱️  Total time: ${results.totalTime} seconds`);
    console.log(`  ⏱️  Average per question: ${results.averageTimePerQuestion} seconds`);
    console.log("");

    // Show detailed answers
    console.log("  Detailed Answers:");
    results.answers.forEach((answer, index) => {
      const status = answer.isCorrect ? "✅" : "❌";
      const question = this.questions[answer.questionIndex];
      console.log(`\n  ${index + 1}. ${status} ${question.question}`);
      if (answer.isCorrect) {
        console.log(`     Your answer: ${question.options[answer.selectedIndex]}`);
      } else {
        console.log(`     Your answer: ${question.options[answer.selectedIndex] || "Skipped"}`);
        console.log(`     Correct answer: ${answer.correctAnswer}`);
      }
      console.log(`     Explanation: ${answer.explanation}`);
    });

    console.log("\n========================\n");
    return results;
  }
}


// ============================================================
// QUIZ DATA
// ============================================================

const javascriptQuiz = new Quiz("JavaScript Fundamentals Quiz", [
  new QuizQuestion(
    "What keyword is used to declare a variable that cannot be reassigned?",
    ["var", "let", "const", "static"],
    2,
    "const declares a constant variable that cannot be reassigned after initialization."
  ),
  new QuizQuestion(
    "What does 'typeof null' return in JavaScript?",
    ["null", "undefined", "object", "boolean"],
    2,
    "This is a long-standing bug in JavaScript. typeof null returns 'object' even though null is not an object."
  ),
  new QuizQuestion(
    "Which method adds an element to the end of an array?",
    ["unshift()", "push()", "pop()", "shift()"],
    1,
    "push() adds elements to the end of an array. unshift() adds to the beginning."
  ),
  new QuizQuestion(
    "What is a closure in JavaScript?",
    [
      "A way to close browser windows",
      "A function that has access to its outer scope",
      "A method to end a loop",
      "A type of loop"
    ],
    1,
    "A closure is a function that retains access to variables from its lexical scope, even after the outer function has returned."
  ),
  new QuizQuestion(
    "Which of the following is NOT a primitive type in JavaScript?",
    ["string", "number", "object", "boolean"],
    2,
    "Object is not a primitive type. Primitives are: string, number, boolean, null, undefined, symbol, and bigint."
  ),
  new QuizQuestion(
    "What does the 'await' keyword do?",
    [
      "Pauses the entire program",
      "Pauses execution until a Promise resolves",
      "Creates a new Promise",
      "Catches errors"
    ],
    1,
    "await pauses execution of an async function until a Promise resolves, without blocking the main thread."
  ),
  new QuizQuestion(
    "Which array method creates a new array with elements that pass a test?",
    ["forEach()", "map()", "filter()", "reduce()"],
    2,
    "filter() creates a new array with elements that pass the test implemented by the provided function."
  ),
  new QuizQuestion(
    "What is the output of: console.log(2 + '2')?",
    ["4", "22", "NaN", "Error"],
    1,
    "When you add a number to a string, JavaScript performs string concatenation. 2 + '2' = '22'."
  ),
  new QuizQuestion(
    "Which keyword is used to create a class in JavaScript?",
    ["function", "class", "object", "prototype"],
    1,
    "The 'class' keyword is used to define a class in ES6+ JavaScript."
  ),
  new QuizQuestion(
    "What does Promise.all() do?",
    [
      "Runs promises sequentially",
      "Runs promises in parallel and waits for all to resolve",
      "Runs only the first promise",
      "Catches promise errors"
    ],
    1,
    "Promise.all() takes an array of Promises and returns a single Promise that resolves when all input Promises resolve."
  )
]);


// ============================================================
// USAGE DEMO
// ============================================================

// Start the quiz
javascriptQuiz.start();

// Simulate answering questions (in a real app, this would be user input)
const answers = [2, 2, 1, 1, 2, 1, 2, 1, 1, 1];  // Correct answers

answers.forEach((answer, index) => {
  const question = javascriptQuiz.getCurrentQuestion();
  if (question) {
    question.display();
    const result = javascriptQuiz.submitAnswer(answer);
    console.log(result.isCorrect ? "  ✅ Correct!" : "  ❌ Incorrect!");
  }
});

// Finish and display results
const results = javascriptQuiz.finish();
javascriptQuiz.displayResults();


console.log("=== Quiz Application Project Complete ===");
