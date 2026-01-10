// Get the current year for copyright
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Get last modified date
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;

// Optional: Add current date and time to console
// console.log(`Page loaded on: ${new Date().toLocaleString()}`);
 // console.log(`Document last modified: ${document.lastModified}`);