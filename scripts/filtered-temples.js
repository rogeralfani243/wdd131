// Array of Temple Objects
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples (3 more as required)
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-8878.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-2737.jpg"
  }
];

// DOM Elements
const templesContainer = document.getElementById('temples-container');
const filterTitle = document.getElementById('filter-title');
const filterDescription = document.getElementById('filter-description');
const templeCountElement = document.getElementById('temple-count');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Navigation filter elements
const homeFilter = document.getElementById('home');
const oldFilter = document.getElementById('old');
const newFilter = document.getElementById('new');
const largeFilter = document.getElementById('large');
const smallFilter = document.getElementById('small');
const navLinks = document.querySelectorAll('.nav-link');

// Helper Functions
function getDedicationYear(dedicatedString) {
  const yearPart = dedicatedString.split(',')[0].trim();
  return parseInt(yearPart);
}

function formatArea(area) {
  return area.toLocaleString('en-US');
}

// Create a temple card element
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';
  
  const year = getDedicationYear(temple.dedicated);
  
  card.innerHTML = `
    <div class="temple-image-container">
      <img 
        src="${temple.imageUrl}" 
        alt="${temple.templeName}" 
        class="temple-image"
        loading="lazy"
      >
    </div>
    <div class="temple-info">
      <h3 class="temple-name">${temple.templeName}</h3>
      <p class="temple-location"><i class="fas fa-map-marker-alt"></i> ${temple.location}</p>
      <div class="temple-details">
        <div class="temple-detail">
          <i class="fas fa-calendar-alt"></i>
          <span>Dedicated: ${temple.dedicated}</span>
        </div>
        <div class="temple-detail">
          <i class="fas fa-vector-square"></i>
          <span>Area: ${formatArea(temple.area)} sq ft</span>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// Display temples in the gallery
function displayTemples(templesArray) {
  templesContainer.innerHTML = '';
  
  if (templesArray.length === 0) {
    templesContainer.innerHTML = `
      <div class="no-results">
        <h3>No temples match this filter</h3>
        <p>Try another filter to see more temples.</p>
      </div>
    `;
    templeCountElement.textContent = `No temples found`;
    return;
  }
  
  templesArray.forEach(temple => {
    const templeCard = createTempleCard(temple);
    templesContainer.appendChild(templeCard);
  });
  
  templeCountElement.textContent = `${templesArray.length} temple(s) displayed`;
}

// Filtering Functions
function filterOldTemples() {
  return temples.filter(temple => {
    const year = getDedicationYear(temple.dedicated);
    return year < 1900;
  });
}

function filterNewTemples() {
  return temples.filter(temple => {
    const year = getDedicationYear(temple.dedicated);
    return year > 2000;
  });
}

function filterLargeTemples() {
  return temples.filter(temple => temple.area > 90000);
}

function filterSmallTemples() {
  return temples.filter(temple => temple.area < 10000);
}

// Handle filter clicks
function handleFilterClick(event, filterType) {
  event.preventDefault();
  
  // Update active state
  navLinks.forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
  
  // Close mobile menu if open
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
  
  // Apply the appropriate filter
  let filteredTemples = [];
  
  switch(filterType) {
    case 'home':
      filteredTemples = temples;
      filterTitle.textContent = 'All Temples';
      filterDescription.textContent = `Displaying all ${temples.length} temples`;
      break;
    case 'old':
      filteredTemples = filterOldTemples();
      filterTitle.textContent = 'Old Temples (before 1900)';
      filterDescription.textContent = 'Temples dedicated before the year 1900';
      break;
    case 'new':
      filteredTemples = filterNewTemples();
      filterTitle.textContent = 'New Temples (after 2000)';
      filterDescription.textContent = 'Temples dedicated after the year 2000';
      break;
    case 'large':
      filteredTemples = filterLargeTemples();
      filterTitle.textContent = 'Large Temples (>90,000 sq ft)';
      filterDescription.textContent = 'Temples with area greater than 90,000 square feet';
      break;
    case 'small':
      filteredTemples = filterSmallTemples();
      filterTitle.textContent = 'Small Temples (<10,000 sq ft)';
      filterDescription.textContent = 'Temples with area less than 10,000 square feet';
      break;
  }
  
  displayTemples(filteredTemples);
}

// Initialize the page
function init() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Set last modified date
  document.getElementById('lastModified').textContent = document.lastModified;
  
  // Display all temples initially
  displayTemples(temples);
  filterTitle.textContent = 'All Temples';
  filterDescription.textContent = `Displaying all ${temples.length} temples`;
  
  // Add event listeners for filter buttons
  homeFilter.addEventListener('click', (e) => handleFilterClick(e, 'home'));
  oldFilter.addEventListener('click', (e) => handleFilterClick(e, 'old'));
  newFilter.addEventListener('click', (e) => handleFilterClick(e, 'new'));
  largeFilter.addEventListener('click', (e) => handleFilterClick(e, 'large'));
  smallFilter.addEventListener('click', (e) => handleFilterClick(e, 'small'));
  
  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    if (navMenu.classList.contains('active')) {
      hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      hamburgerLines[1].style.opacity = '0';
      hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      hamburgerLines[0].style.transform = 'rotate(0) translate(0, 0)';
      hamburgerLines[1].style.opacity = '1';
      hamburgerLines[2].style.transform = 'rotate(0) translate(0, 0)';
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      const hamburgerLines = document.querySelectorAll('.hamburger-line');
      hamburgerLines[0].style.transform = 'rotate(0) translate(0, 0)';
      hamburgerLines[1].style.opacity = '1';
      hamburgerLines[2].style.transform = 'rotate(0) translate(0, 0)';
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);