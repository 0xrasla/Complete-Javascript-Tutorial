/**
 * ============================================================
 * PROJECT: Pomodoro Timer
 * ============================================================
 * 
 * A productivity timer based on the Pomodoro Technique.
 * Work for 25 minutes, take a 5-minute break, repeat.
 * After 4 pomodoros, take a longer 15-minute break.
 * 
 * Skills practiced: classes, setTimeout, setInterval,
 * date handling, state management.
 * ============================================================
 */

// ============================================================
// POMODORO TIMER CLASS
// ============================================================

class PomodoroTimer {
  constructor() {
    this.config = {
      workDuration: 25 * 60,      // 25 minutes in seconds
      shortBreakDuration: 5 * 60,  // 5 minutes
      longBreakDuration: 15 * 60,  // 15 minutes
      pomodorosBeforeLongBreak: 4
    };

    this.state = {
      mode: "work",          // "work", "shortBreak", "longBreak"
      timeRemaining: this.config.workDuration,
      isRunning: false,
      pomodorosCompleted: 0,
      totalFocusTime: 0,
      sessionHistory: []
    };

    this.intervalId = null;
    this.listeners = {};
  }

  // ============================================================
  // TIMER CONTROL
  // ============================================================

  /**
   * Start the timer.
   */
  start() {
    if (this.state.isRunning) {
      console.log("Timer is already running!");
      return;
    }

    this.state.isRunning = true;
    this.intervalId = setInterval(() => this.#tick(), 1000);
    
    this.#emit("start", { mode: this.state.mode });
    console.log(`⏱️  ${this.#getModeLabel()} started!`);
    this.displayStatus();
  }

  /**
   * Pause the timer.
   */
  pause() {
    if (!this.state.isRunning) {
      console.log("Timer is not running!");
      return;
    }

    this.state.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;

    this.#emit("pause", { mode: this.state.mode });
    console.log(`⏸️  Timer paused at ${this.#formatTime(this.state.timeRemaining)}`);
  }

  /**
   * Reset the timer to the beginning of the current mode.
   */
  reset() {
    this.pause();
    this.state.timeRemaining = this.#getModeDuration();
    this.state.mode = "work";

    this.#emit("reset", {});
    console.log("🔄 Timer reset!");
    this.displayStatus();
  }

  /**
   * Skip to the next mode.
   */
  skip() {
    this.pause();
    this.#nextMode();
  }

  // ============================================================
  // STATUS AND DISPLAY
  // ============================================================

  /**
   * Get the current timer status.
   * @returns {Object} Status object
   */
  getStatus() {
    return {
      ...this.state,
      modeLabel: this.#getModeLabel(),
      formattedTime: this.#formatTime(this.state.timeRemaining),
      progress: 1 - (this.state.timeRemaining / this.#getModeDuration())
    };
  }

  /**
   * Display the current status in the console.
   */
  displayStatus() {
    const status = this.getStatus();
    const progressBar = this.#createProgressBar(status.progress, 20);

    console.log("\n===== POMODORO TIMER =====");
    console.log(`  Mode: ${status.modeLabel}`);
    console.log(`  Time: ${status.formattedTime}`);
    console.log(`  Progress: ${progressBar}`);
    console.log(`  Pomodoros: ${status.pomodorosCompleted}/${this.config.pomodorosBeforeLongBreak}`);
    console.log(`  Focus time: ${this.#formatTime(status.totalFocusTime)}`);
    console.log("==========================\n");
  }

  /**
   * Get session history.
   * @returns {Object[]} Array of completed sessions
   */
  getSessionHistory() {
    return [...this.state.sessionHistory];
  }

  /**
   * Get productivity statistics.
   * @returns {Object} Stats object
   */
  getStats() {
    const workSessions = this.state.sessionHistory.filter(s => s.mode === "work");
    const totalWorkTime = workSessions.reduce((sum, s) => sum + s.duration, 0);
    const avgSessionLength = workSessions.length > 0 
      ? Math.round(totalWorkTime / workSessions.length) 
      : 0;

    return {
      totalPomodoros: this.state.pomodorosCompleted,
      totalWorkSessions: workSessions.length,
      totalFocusTime: totalWorkTime,
      averageSessionLength: avgSessionLength,
      sessions: this.state.sessionHistory
    };
  }

  // ============================================================
  // EVENT SYSTEM
  // ============================================================

  /**
   * Register an event listener.
   * @param {string} event - Event name
   * @param {Function} callback - Event handler
   * @returns {Function} Unsubscribe function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  #emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  // ============================================================
  // PRIVATE METHODS
  // ============================================================

  #tick() {
    if (this.state.timeRemaining <= 0) {
      this.#completeMode();
      return;
    }

    this.state.timeRemaining--;
    this.#emit("tick", { 
      timeRemaining: this.state.timeRemaining,
      mode: this.state.mode 
    });
  }

  #completeMode() {
    this.pause();

    // Record the session
    this.state.sessionHistory.push({
      mode: this.state.mode,
      duration: this.#getModeDuration(),
      completedAt: new Date().toISOString()
    });

    if (this.state.mode === "work") {
      this.state.pomodorosCompleted++;
      this.state.totalFocusTime += this.#getModeDuration();
      console.log("\n🎉 Pomodoro completed!");
    } else {
      console.log("\n☕ Break is over!");
    }

    this.#emit("complete", { mode: this.state.mode });
    this.#nextMode();
  }

  #nextMode() {
    if (this.state.mode === "work") {
      if (this.state.pomodorosCompleted % this.config.pomodorosBeforeLongBreak === 0 &&
          this.state.pomodorosCompleted > 0) {
        this.state.mode = "longBreak";
        console.log("🌟 Time for a long break!");
      } else {
        this.state.mode = "shortBreak";
        console.log("☕ Time for a short break!");
      }
    } else {
      this.state.mode = "work";
      console.log("💪 Back to work!");
    }

    this.state.timeRemaining = this.#getModeDuration();
    this.displayStatus();
  }

  #getModeDuration() {
    switch (this.state.mode) {
      case "work": return this.config.workDuration;
      case "shortBreak": return this.config.shortBreakDuration;
      case "longBreak": return this.config.longBreakDuration;
      default: return this.config.workDuration;
    }
  }

  #getModeLabel() {
    switch (this.state.mode) {
      case "work": return "Focus Time";
      case "shortBreak": return "Short Break";
      case "longBreak": return "Long Break";
      default: return "Focus Time";
    }
  }

  #formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  #createProgressBar(progress, length = 20) {
    const filled = Math.round(progress * length);
    const empty = length - filled;
    return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

// Create a timer with custom settings
const timer = new PomodoroTimer();

// Register event listeners
timer.on("start", (data) => {
  console.log(`  [Event] Timer started in ${data.mode} mode`);
});

timer.on("complete", (data) => {
  console.log(`  [Event] ${data.mode} session completed`);
});

timer.on("tick", (data) => {
  // In a real app, you would update the UI here
  // For demo purposes, we'll just log every 5 minutes
  if (data.timeRemaining % 300 === 0 && data.timeRemaining > 0) {
    const mins = Math.floor(data.timeRemaining / 60);
    console.log(`  [Tick] ${mins} minute(s) remaining`);
  }
});

// Simulate a short work session (5 seconds for demo)
console.log("===== POMODORO TIMER DEMO =====");
console.log("(Using 5-second intervals for demo purposes)\n");

// For a real 25-minute timer, use:
// const timer = new PomodoroTimer();
// timer.config.workDuration = 25 * 60;

// Demo: Simulate completing a few sessions
function simulateSession() {
  timer.displayStatus();
  
  // Simulate work session (in real app, use timer.start())
  console.log("Simulating work session...");
  
  // Manually trigger completion for demo
  timer.state.sessionHistory.push({
    mode: "work",
    duration: 25 * 60,
    completedAt: new Date().toISOString()
  });
  timer.state.pomodorosCompleted++;
  timer.state.totalFocusTime += 25 * 60;
  
  console.log("✅ Work session completed!");
  
  // Show stats
  const stats = timer.getStats();
  console.log("\n===== SESSION STATS =====");
  console.log(`  Pomodoros: ${stats.totalPomodoros}`);
  console.log(`  Focus time: ${Math.round(stats.totalFocusTime / 60)} minutes`);
  console.log("=========================\n");
}

// Run a few simulated sessions
simulateSession();
simulateSession();
simulateSession();
simulateSession();

// Show final stats
const finalStats = timer.getStats();
console.log("===== FINAL STATS =====");
console.log(`  Total pomodoros: ${finalStats.totalPomodoros}`);
console.log(`  Total focus time: ${Math.round(finalStats.totalFocusTime / 60)} minutes`);
console.log(`  Sessions: ${finalStats.sessions.length}`);
console.log("========================\n");

console.log("=== Pomodoro Timer Project Complete ===");
console.log("To use the real timer, uncomment the timer.start() call and run in a browser.");
