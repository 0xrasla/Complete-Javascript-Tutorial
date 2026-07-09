/**
 * ============================================================
 * PROJECT: Weather Dashboard
 * ============================================================
 * 
 * A weather dashboard that fetches data from an API and
 * displays it in a formatted way. This project demonstrates
 * async/await, fetch API, error handling, and class-based
 * architecture.
 * 
 * Skills practiced: async/await, fetch API, Promises, classes,
 * error handling, template literals.
 * 
 * Note: This uses a mock API for learning purposes.
 * To use a real API, sign up at https://openweathermap.org/api
 * ============================================================
 */

// ============================================================
// MOCK API — Simulates real network requests
// ============================================================
// In a real application, you would use fetch() to get data
// from a server. This mock simulates that behavior for
// learning purposes.

const mockWeatherData = {
  "london": {
    city: "London",
    country: "GB",
    temperature: 18,
    feelsLike: 16,
    humidity: 72,
    description: "partly cloudy",
    windSpeed: 12,
    icon: "⛅"
  },
  "new york": {
    city: "New York",
    country: "US",
    temperature: 25,
    feelsLike: 27,
    humidity: 65,
    description: "clear sky",
    windSpeed: 8,
    icon: "☀️"
  },
  "tokyo": {
    city: "Tokyo",
    country: "JP",
    temperature: 30,
    feelsLike: 33,
    humidity: 80,
    description: "humid",
    windSpeed: 5,
    icon: "🌤️"
  },
  "paris": {
    city: "Paris",
    country: "FR",
    temperature: 22,
    feelsLike: 21,
    humidity: 55,
    description: "light rain",
    windSpeed: 15,
    icon: "🌧️"
  }
};

/**
 * Simulates fetching weather data from an API.
 * Returns a Promise that resolves after a fake network delay.
 * @param {string} city - The city name to search for
 * @returns {Promise<Object>} Weather data for the city
 */
function mockFetchWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const key = city.toLowerCase();
      if (mockWeatherData[key]) {
        resolve(mockWeatherData[key]);
      } else {
        reject(new Error(`City "${city}" not found. Try: London, New York, Tokyo, or Paris.`));
      }
    }, 800);  // Simulate 800ms network delay
  });
}


// ============================================================
// WEATHER SERVICE CLASS — Handles API communication
// ============================================================

class WeatherService {
  constructor() {
    this.cache = new Map();  // Simple cache to avoid duplicate requests
  }

  /**
   * Fetches weather data for a city.
   * Uses cache if available, otherwise fetches fresh data.
   * @param {string} city - The city name
   * @returns {Promise<Object>} Weather data
   */
  async getWeather(city) {
    // Check cache first
    if (this.cache.has(city.toLowerCase())) {
      console.log(`  (Using cached data for ${city})`);
      return this.cache.get(city.toLowerCase());
    }

    // Fetch fresh data
    const data = await mockFetchWeather(city);
    
    // Store in cache
    this.cache.set(city.toLowerCase(), data);
    
    return data;
  }

  /**
   * Fetches weather for multiple cities.
   * Uses Promise.all to fetch in parallel.
   * @param {string[]} cities - Array of city names
   * @returns {Promise<Object[]>} Array of weather data
   */
  async getMultipleWeather(cities) {
    const promises = cities.map(city => this.getWeather(city));
    return Promise.all(promises);
  }

  /**
   * Clears the cache.
   */
  clearCache() {
    this.cache.clear();
    console.log("Cache cleared.");
  }
}


// ============================================================
// WEATHER DISPLAY CLASS — Formats and displays weather data
// ============================================================

class WeatherDisplay {
  /**
   * Formats a single weather report.
   * @param {Object} data - Weather data object
   * @returns {string} Formatted weather report
   */
  static formatReport(data) {
    return `
  ${data.icon} ${data.city}, ${data.country}
  ─────────────────────────────
  Temperature:  ${data.temperature}°C (feels like ${data.feelsLike}°C)
  Conditions:   ${data.description}
  Humidity:     ${data.humidity}%
  Wind:         ${data.windSpeed} km/h
    `;
  }

  /**
   * Formats a comparison table for multiple cities.
   * @param {Object[]} dataArray - Array of weather data
   * @returns {string} Formatted comparison table
   */
  static formatComparison(dataArray) {
    let output = "\n===== WEATHER COMPARISON =====\n\n";
    
    output += "  City          Temp    Humidity   Conditions\n";
    output += "  ───────────   ────    ────────   ──────────\n";

    for (const data of dataArray) {
      const city = data.city.padEnd(12);
      const temp = `${data.temperature}°C`.padEnd(7);
      const humidity = `${data.humidity}%`.padEnd(9);
      output += `  ${city}   ${temp}   ${humidity}   ${data.description}\n`;
    }

    output += "\n=============================\n";
    return output;
  }

  /**
   * Finds the warmest and coldest cities.
   * @param {Object[]} dataArray - Array of weather data
   * @returns {Object} Object with warmest and coldest
   */
  static findExtremes(dataArray) {
    if (dataArray.length === 0) return null;

    let warmest = dataArray[0];
    let coldest = dataArray[0];

    for (const data of dataArray) {
      if (data.temperature > warmest.temperature) {
        warmest = data;
      }
      if (data.temperature < coldest.temperature) {
        coldest = data;
      }
    }

    return { warmest, coldest };
  }
}


// ============================================================
// WEATHER DASHBOARD CLASS — Ties everything together
// ============================================================

class WeatherDashboard {
  constructor() {
    this.service = new WeatherService();
    this.history = [];  // Track all fetched cities
  }

  /**
   * Fetches and displays weather for a single city.
   * @param {string} city - The city name
   */
  async showWeather(city) {
    try {
      console.log(`\nFetching weather for ${city}...`);
      const data = await this.service.getWeather(city);
      console.log(WeatherDisplay.formatReport(data));
      this.history.push(data);
      return data;
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      return null;
    }
  }

  /**
   * Fetches and displays weather for multiple cities.
   * @param {string[]} cities - Array of city names
   */
  async showComparison(cities) {
    try {
      console.log(`\nFetching weather for ${cities.join(", ")}...`);
      const dataArray = await this.service.getMultipleWeather(cities);
      console.log(WeatherDisplay.formatComparison(dataArray));
      
      const extremes = WeatherDisplay.findExtremes(dataArray);
      if (extremes) {
        console.log(`  🌡️  Warmest: ${extremes.warmest.city} at ${extremes.warmest.temperature}°C`);
        console.log(`  🧊 Coldest: ${extremes.coldest.city} at ${extremes.coldest.temperature}°C`);
      }
      
      return dataArray;
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      return [];
    }
  }

  /**
   * Shows the history of all fetched cities.
   */
  showHistory() {
    console.log("\n===== FETCH HISTORY =====");
    if (this.history.length === 0) {
      console.log("  No cities fetched yet.");
    } else {
      this.history.forEach((data, index) => {
        console.log(`  ${index + 1}. ${data.city}: ${data.temperature}°C`);
      });
    }
    console.log("=========================\n");
  }
}


// ============================================================
// USAGE DEMO
// ============================================================

async function main() {
  const dashboard = new WeatherDashboard();

  // Fetch and display a single city
  await dashboard.showWeather("London");

  // Fetch and compare multiple cities
  await dashboard.showComparison(["London", "New York", "Tokyo", "Paris"]);

  // Show fetch history
  dashboard.showHistory();

  // Try a city that doesn't exist
  await dashboard.showWeather("Atlantis");
}

// Run the dashboard
main();


console.log("=== Weather Dashboard Project Complete ===");
console.log("Try modifying the mockWeatherData to add your own cities!");
