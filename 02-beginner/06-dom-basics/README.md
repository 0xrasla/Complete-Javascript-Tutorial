# 06 — DOM Basics

## What Is the DOM?

The DOM (Document Object Model) is JavaScript's way of interacting with the web page. When a browser loads an HTML file, it creates a tree-like structure of objects representing every element on the page. JavaScript can read, create, modify, and delete these elements.

Think of the DOM as a bridge between your JavaScript code and the HTML the user sees.

---

## Important Note

This section covers only the fundamentals of DOM manipulation. For a much more detailed guide with step-by-step explanations, see the [Beginner DOM Tutorial](https://github.com/0xrasla/Begginer-DOM-Tutorial).

---

## Selecting Elements

Before you can change an element, you need to find it:

```javascript
// Find by ID (returns one element):
const title = document.getElementById("title");

// Find first match using CSS selector:
const firstParagraph = document.querySelector("p");

// Find ALL matches using CSS selector:
const allListItems = document.querySelectorAll("li");
```

## Changing Content

```javascript
// Change text (safe, no HTML interpretation):
element.textContent = "New text here";

// Change HTML (can include tags, but use carefully):
element.innerHTML = "<strong>Bold text</strong>";
```

## Changing Styles

```javascript
element.style.backgroundColor = "lightblue";
element.style.padding = "20px";
element.style.borderRadius = "8px";
```

## Creating Elements

```javascript
const newParagraph = document.createElement("p");
newParagraph.textContent = "Created by JavaScript!";
document.body.appendChild(newParagraph);
```

## Event Listeners

```javascript
button.addEventListener("click", function() {
  alert("Button clicked!");
});
```

---

## Files

| File | What It Covers |
|------|---------------|
| `dom-basics.js` | Selecting elements, modifying content, creating elements, event listeners |
