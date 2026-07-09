/**
 * ============================================================
 * DOM BASICS — Interacting with the Web Page
 * ============================================================
 * 
 * The DOM (Document Object Model) is a tree of objects that
 * represents the HTML page. JavaScript uses the DOM to read
 * and change what the user sees.
 * 
 * IMPORTANT: This file must be run in an HTML page, not just
 * the console. Create an index.html file that links to this
 * script:
 * 
 *   <script src="dom-basics.js"></script>
 * 
 * For a more detailed DOM tutorial, visit:
 * https://github.com/0xrasla/Begginer-DOM-Tutorial
 * ============================================================
 */

// ============================================================
// 1. SELECTING ELEMENTS — Finding HTML Elements
// ============================================================
// Before you can change an element, you need to find it.
// JavaScript provides several ways to select elements.

// getElementById — finds a single element by its id attribute
const title = document.getElementById("title");
console.log(title);  // Output: the <h1 id="title"> element (or null if not found)

// querySelector — finds the FIRST element matching a CSS selector
const firstParagraph = document.querySelector("p");
console.log(firstParagraph);  // Output: the first <p> element

// querySelectorAll — finds ALL elements matching a CSS selector
// Returns a NodeList (similar to an array)
const allListItems = document.querySelectorAll("li");
console.log(allListItems);  // Output: NodeList of all <li> elements


// ============================================================
// 2. CHANGING CONTENT — What the User Sees
// ============================================================
// You can change the text and HTML inside an element.

// textContent — changes the plain text (safe, no HTML interpretation)
const subtitle = document.getElementById("subtitle");
if (subtitle) {
  subtitle.textContent = "This text was changed by JavaScript!";
}

// innerHTML — changes the HTML content (can include tags)
const contentDiv = document.getElementById("content");
if (contentDiv) {
  contentDiv.innerHTML = "<strong>Bold text</strong> and <em>italic text</em>";
}

// WARNING: Never use innerHTML with user input. It can lead to
// security vulnerabilities (XSS attacks). Use textContent instead.


// ============================================================
// 3. CHANGING STYLES — Making Things Look Different
// ============================================================
// You can change the CSS properties of elements using JavaScript.

const box = document.getElementById("box");
if (box) {
  box.style.backgroundColor = "lightblue";
  box.style.padding = "20px";
  box.style.borderRadius = "8px";
  box.style.fontFamily = "Arial, sans-serif";
}


// ============================================================
// 4. CHANGING ATTRIBUTES — Modifying Element Properties
// ============================================================
// You can read and change HTML attributes like src, href, class, etc.

const image = document.getElementById("myImage");
if (image) {
  image.src = "new-image.jpg";       // Change the image source
  image.alt = "New image description"; // Change the alt text
}


// ============================================================
// 5. CREATING ELEMENTS — Building New HTML
// ============================================================
// You can create entirely new elements and add them to the page.

// Create a new paragraph element
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created by JavaScript!";
newParagraph.style.color = "green";
newParagraph.style.fontWeight = "bold";

// Add it to the page (appending to the body in this example)
document.body.appendChild(newParagraph);

// Create a list
const newList = document.createElement("ul");
const items = ["First item", "Second item", "Third item"];

for (let i = 0; i < items.length; i++) {
  const listItem = document.createElement("li");
  listItem.textContent = items[i];
  newList.appendChild(listItem);
}

document.body.appendChild(newList);


// ============================================================
// 6. REMOVING ELEMENTS — Taking Things Off the Page
// ============================================================
// You can remove elements from the page.

const removable = document.getElementById("removable");
if (removable) {
  removable.remove();  // Removes the element from the page entirely
}


// ============================================================
// 7. EVENT LISTENERS — Responding to User Actions
// ============================================================
// Events let JavaScript react when the user does something:
// clicks, hovers, types, submits, etc.

// Click event
const clickButton = document.getElementById("clickButton");
if (clickButton) {
  clickButton.addEventListener("click", function() {
    alert("Button clicked!");
  });
}

// Change event (when input value changes)
const nameInput = document.getElementById("nameInput");
if (nameInput) {
  nameInput.addEventListener("input", function(event) {
    console.log("User typed: " + event.target.value);
  });
}

// Mouseover event (when user hovers over an element)
const hoverBox = document.getElementById("hoverBox");
if (hoverBox) {
  hoverBox.addEventListener("mouseover", function() {
    hoverBox.style.backgroundColor = "yellow";
  });
  
  hoverBox.addEventListener("mouseout", function() {
    hoverBox.style.backgroundColor = "white";
  });
}


// ============================================================
// 8. PRACTICAL EXAMPLE — Simple To-Do List
// ============================================================
// Let's combine everything we learned to build a mini to-do list.

function createToDoList() {
  const toDoList = document.getElementById("toDoList");
  const toDoInput = document.getElementById("toDoInput");
  const addToDoButton = document.getElementById("addToDoButton");
  
  if (!toDoList || !toDoInput || !addToDoButton) {
    console.log("To-do list elements not found in HTML.");
    return;
  }
  
  addToDoButton.addEventListener("click", function() {
    const text = toDoInput.value.trim();
    
    if (text === "") {
      return;  // Don't add empty items
    }
    
    // Create the list item
    const listItem = document.createElement("li");
    listItem.textContent = text;
    
    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", function() {
      listItem.remove();
    });
    
    listItem.appendChild(deleteButton);
    toDoList.appendChild(listItem);
    
    toDoInput.value = "";  // Clear the input
  });
}

createToDoList();


console.log("=== DOM Basics Section Complete ===");
console.log("For more detailed DOM tutorials, visit:");
console.log("https://github.com/0xrasla/Begginer-DOM-Tutorial");
console.log("Now move on to projects to practice what you learned!");
