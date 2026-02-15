// Newsletter form handler
function handleNewsletter(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstName')?.value || '';
  const email = document.getElementById('email').value.trim();
  const consent = document.getElementById('consent').checked;
  const messageEl = document.getElementById('newsletterMessage');
  
  if (!email) {
    messageEl.textContent = 'Please enter your email address';
    messageEl.style.color = '#ff6b6b';
    return;
  }
  
  if (!isValidEmail(email)) {
    messageEl.textContent = 'Please enter a valid email address';
    messageEl.style.color = '#ff6b6b';
    return;
  }
  
  if (!consent) {
    messageEl.textContent = 'Please agree to receive marketing emails';
    messageEl.style.color = '#ff6b6b';
    return;
  }
  
  // Simulate successful subscription
  messageEl.textContent = `✓ Thanks${firstName ? ' ' + firstName : ''}! Check your inbox to confirm.`;
  messageEl.style.color = '#4caf50';
  
  // Clear form
  document.getElementById('firstName').value = '';
  document.getElementById('email').value = '';
  
  // Here you would typically send to your API
  console.log('Newsletter signup:', { firstName, email });
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Add to cart function
function addToCart(itemName) {
  // Create a professional toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #0a0a0a, #3c0a0a, #b41414);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    border-left: 4px solid #ff0050;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;
  
  toast.innerHTML = `
    <i class="fas fa-check-circle" style="color: #ff0050; margin-right: 10px;"></i>
    ${itemName} added to cart
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
  
  console.log('Added to cart:', itemName);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Interactive hover effects for catalog cards
document.querySelectorAll('.catalog-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Play button simulation
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create mini player notification
    const card = btn.closest('.catalog-card');
    const trackName = card.querySelector('h3').textContent;
    const artist = card.querySelector('p').textContent;
    
    alert(`🎵 Now playing: ${trackName} - ${artist}\n(This is a demo player)`);
  });
});


// ===== DATA ARRAYS =====

// Catalog items array
const catalogItems = [
  {
    id: 1,
    title: "Neural Pathways",
    artist: "Win Music All Stars",
    streams: "2.4M",
    year: "2025",
    gradient: "linear-gradient(145deg, #7928b0, #ff0080)",
    featured: false
  },
  {
    id: 2,
    title: "Midnight Code",
    artist: "Luna Ray",
    streams: "5.1M",
    year: "2025",
    gradient: "linear-gradient(145deg, #0080ff, #00ffb3)",
    featured: true
  },
  {
    id: 3,
    title: "Urban Flow",
    artist: "DJ Kitsuné",
    streams: "1.8M",
    year: "2024",
    gradient: "linear-gradient(145deg, #ff512f, #dd2476)",
    featured: false
  },
  {
    id: 4,
    title: "Electric Soul",
    artist: "The Vectors",
    streams: "3.2M",
    year: "2024",
    gradient: "linear-gradient(145deg, #ff0080, #7928b0)",
    featured: false
  }
];

// Platform items array
const platformItems = [
  { name: "Spotify", description: "Weekly playlist", icon: "fab fa-spotify" },
  { name: "YouTube", description: "Official channel", icon: "fab fa-youtube" },
  { name: "Apple Music", description: "Featured artist", icon: "fab fa-apple" },
  { name: "Amazon Music", description: "New releases", icon: "fab fa-amazon" },
  { name: "Tidal", description: "Hi-fi audio", icon: "fab fa-tidal" },
  { name: "Deezer", description: "Flow", icon: "fab fa-deezer" }
];

// Shop items array
const shopItems = [
  {
    id: 1,
    name: "Limited Edition Hoodie",
    description: "Black / Gold foil logo",
    price: "$79.99",
    category: "Apparel",
    icon: "fas fa-tshirt"
  },
  {
    id: 2,
    name: "Neural Pathways Vinyl",
    description: "Limited colored vinyl",
    price: "$34.99",
    category: "Vinyl",
    icon: "fas fa-record-vinyl"
  },
  {
    id: 3,
    name: "Win Music Cap",
    description: "Black / embroidered",
    price: "$39.99",
    category: "Accessories",
    icon: "fas fa-headphones"
  },
  {
    id: 4,
    name: "Tour Poster Set",
    description: "3 posters / A2 size",
    price: "$24.99",
    category: "Poster",
    icon: "fas fa-poster"
  }
];

// Cart array
let cart = [];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
  // Load all dynamic content
  loadCatalogItems();
  loadPlatformItems();
  loadShopItems();
  
  // Initialize menu functionality
  initMobileMenu();
  
  // Initialize newsletter form
  initNewsletterForm();
  
  // Initialize play buttons
  initPlayButtons();
});

// ===== CATALOG FUNCTIONS =====
function loadCatalogItems() {
  const catalogGrid = document.getElementById('catalogGrid');
  if (!catalogGrid) return;
  
  catalogGrid.innerHTML = ''; // Clear existing content
  
  catalogItems.forEach(item => {
    const card = createCatalogCard(item);
    catalogGrid.appendChild(card);
  });
}

function createCatalogCard(item) {
  const card = document.createElement('div');
  card.className = `catalog-card ${item.featured ? 'featured' : ''}`;
  card.setAttribute('data-id', item.id);
  
  // Card image
  const cardImage = document.createElement('div');
  cardImage.className = 'card-image';
  cardImage.style.background = item.gradient;
  
  const cardOverlay = document.createElement('div');
  cardOverlay.className = 'card-overlay';
  
  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBtn.setAttribute('data-track', item.title);
  
  cardOverlay.appendChild(playBtn);
  cardImage.appendChild(cardOverlay);
  
  if (item.featured) {
    const featuredBadge = document.createElement('span');
    featuredBadge.className = 'featured-badge';
    featuredBadge.textContent = 'Featured';
    cardImage.appendChild(featuredBadge);
  }
  
  // Card content
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.innerHTML = `
    <div>
      <h3>${item.title}</h3>
      <p>${item.artist}</p>
    </div>
    <div class="card-stats">
      <span><i class="fas fa-headphones"></i> ${item.streams}</span>
    </div>
  `;
  
  // Card footer
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  cardFooter.innerHTML = `
    <div class="streaming-links">
      <a href="#"><i class="fab fa-spotify"></i></a>
      <a href="#"><i class="fab fa-youtube"></i></a>
      <a href="#"><i class="fab fa-apple"></i></a>
    </div>
    <span class="release-date">${item.year}</span>
  `;
  
  card.appendChild(cardImage);
  card.appendChild(cardContent);
  card.appendChild(cardFooter);
  
  return card;
}

// ===== PLATFORM FUNCTIONS =====
function loadPlatformItems() {
  const platformsGrid = document.getElementById('platformsGrid');
  if (!platformsGrid) return;
  
  platformsGrid.innerHTML = ''; // Clear existing content
  
  platformItems.forEach(platform => {
    const platformLink = document.createElement('a');
    platformLink.href = '#';
    platformLink.className = 'platform-item';
    platformLink.innerHTML = `
      <i class="${platform.icon}"></i>
      <div>
        <h4>${platform.name}</h4>
        <span>${platform.description}</span>
      </div>
    `;
    
    platformsGrid.appendChild(platformLink);
  });
}

// ===== SHOP FUNCTIONS =====
function loadShopItems() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return;
  
  shopGrid.innerHTML = ''; // Clear existing content
  
  shopItems.forEach(item => {
    const card = createShopCard(item);
    shopGrid.appendChild(card);
  });
}

function createShopCard(item) {
  const card = document.createElement('div');
  card.className = 'shop-card';
  card.setAttribute('data-id', item.id);
  
  card.innerHTML = `
    <div class="shop-image" style="background: #2a2a2a;">
      <i class="${item.icon}"></i>
      <span class="shop-category">${item.category}</span>
    </div>
    <div class="shop-details">
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <div class="shop-footer">
        <span class="shop-price">${item.price}</span>
        <button class="shop-btn" data-item='${JSON.stringify(item)}'>Add to cart</button>
      </div>
    </div>
  `;
  
  // Add event listener to the button
  const btn = card.querySelector('.shop-btn');
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const itemData = JSON.parse(this.getAttribute('data-item'));
    addToCart(itemData);
  });
  
  return card;
}

// ===== CART FUNCTIONS =====
function addToCart(item) {
  cart.push(item);
  
  // Create toast notification
  showToast(`✓ ${item.name} added to cart`);
  
  // Update cart count if you have a cart icon
  updateCartCount();
  
  console.log('Cart:', cart);
}

function updateCartCount() {
  // If you add a cart icon with a badge later
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i class="fas fa-check-circle" style="color: #ff0050; margin-right: 10px;"></i>
    ${message}
  `;
  
  // Add styles dynamically
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #0a0a0a, #3c0a0a, #b41414);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    border-left: 4px solid #ff0050;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// ===== NEWSLETTER FUNCTIONS =====
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName')?.value || '';
    const email = document.getElementById('email')?.value.trim();
    const consent = document.getElementById('consent')?.checked;
    const messageEl = document.getElementById('newsletterMessage');
    
    // Validation
    if (!email) {
      messageEl.textContent = 'Please enter your email address';
      messageEl.style.color = '#ff6b6b';
      return;
    }
    
    if (!isValidEmail(email)) {
      messageEl.textContent = 'Please enter a valid email address';
      messageEl.style.color = '#ff6b6b';
      return;
    }
    
    if (!consent) {
      messageEl.textContent = 'Please agree to receive marketing emails';
      messageEl.style.color = '#ff6b6b';
      return;
    }
    
    // Success
    messageEl.textContent = `✓ Thanks${firstName ? ' ' + firstName : ''}! Check your inbox to confirm.`;
    messageEl.style.color = '#4caf50';
    
    // Clear form
    document.getElementById('firstName').value = '';
    document.getElementById('email').value = '';
    
    console.log('Newsletter signup:', { firstName, email });
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// ===== MOBILE MENU FUNCTIONS =====
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;
  
  if (!hamburger || !mobileMenu) return;
  
  // Add animation styles if not present
  addAnimationStyles();
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
  
  // Close menu when clicking outside
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

function addAnimationStyles() {
  if (document.getElementById('menuAnimationStyles')) return;
  
  const style = document.createElement('style');
  style.id = 'menuAnimationStyles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes slideInLink {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .mobile-menu-links a {
      opacity: 0;
      transform: translateX(20px);
      animation: slideInLink 0.4s ease forwards;
    }
    
    .mobile-menu-links a:nth-child(1) { animation-delay: 0.1s; }
    .mobile-menu-links a:nth-child(2) { animation-delay: 0.15s; }
    .mobile-menu-links a:nth-child(3) { animation-delay: 0.2s; }
    .mobile-menu-links a:nth-child(4) { animation-delay: 0.25s; }
    .mobile-menu-links a:nth-child(5) { animation-delay: 0.3s; }
    
    body.menu-open {
      overflow: hidden;
    }
  `;
  
  document.head.appendChild(style);
}

// ===== PLAY BUTTON FUNCTIONS =====
function initPlayButtons() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.play-btn')) {
      const btn = e.target.closest('.play-btn');
      const card = btn.closest('.catalog-card');
      
      if (card) {
        const trackName = card.querySelector('h3')?.textContent || 'Unknown track';
        const artist = card.querySelector('p')?.textContent || 'Unknown artist';
        
        showToast(`🎵 Now playing: ${trackName} - ${artist}`);
      }
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    catalogItems,
    platformItems,
    shopItems,
    addToCart,
    isValidEmail
  };
}