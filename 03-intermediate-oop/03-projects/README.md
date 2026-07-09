# 03 — Intermediate Projects

## Apply What You Learned

These projects combine OOP and async concepts into practical applications. Try building them yourself before looking at the solutions.

---

## Projects

| # | Project | Description | Skills Practiced |
|---|---------|-------------|-----------------|
| 01 | Todo App (OOP) | A command-line-style to-do app with classes | Classes, OOP, arrays, methods |
| 02 | Weather Dashboard | Fetch and display weather data | async/await, fetch API, error handling |

---

## Project 01: Todo App

A complete to-do application built with classes:

```javascript
class Task {
  constructor(title, priority = "medium") {
    this.title = title;
    this.priority = priority;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

class TodoList {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(title, priority) {
    const task = new Task(title, priority);
    this.tasks.push(task);
    return task;
  }
}

const myTodos = new TodoList("My Tasks");
myTodos.addTask("Learn JavaScript", "high");
myTodos.addTask("Build a project", "medium");
```

---

## Project 02: Weather Dashboard

Fetches and displays weather data using async/await:

```javascript
async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY`
  );
  const data = await response.json();
  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description
  };
}

const weather = await getWeather("London");
console.log(`${weather.city}: ${weather.temperature}°C`);
```

---

## Files

| File | What It Covers |
|------|---------------|
| `todo-app.js` | Complete OOP to-do application with filtering and statistics |
| `weather-dashboard.js` | Weather dashboard with mock API and caching |
