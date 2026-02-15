// ===== DATA OBJECTS =====
const musicData = {
  catalog: [
    { id: 1, title: "Neural Pathways", artist: "Win Music All Stars", streams: 2400000, year: 2025, gradient: "linear-gradient(145deg, #7928b0, #ff0080)", featured: false, image: "neural-pathways.jpg" },
    { id: 2, title: "Midnight Code", artist: "Luna Ray", streams: 5100000, year: 2025, gradient: "linear-gradient(145deg, #0080ff, #00ffb3)", featured: true, image: "midnight-code.jpg" },
    { id: 3, title: "Urban Flow", artist: "DJ Kitsuné", streams: 1800000, year: 2024, gradient: "linear-gradient(145deg, #ff512f, #dd2476)", featured: false, image: "urban-flow.jpg" },
    { id: 4, title: "Electric Soul", artist: "The Vectors", streams: 3200000, year: 2024, gradient: "linear-gradient(145deg, #ff0080, #7928b0)", featured: false, image: "electric-soul.jpg" }
  ],
  
  artists: [
    { id: 1, name: "Luna Ray", genre: "Electronic", monthlyListeners: 1200000, image: "luna-ray.jpg" },
    { id: 2, name: "DJ Kitsuné", genre: "House", monthlyListeners: 890000, image: "dj-kitsune.jpg" },
    { id: 3, name: "The Vectors", genre: "Indie Rock", monthlyListeners: 750000, image: "vectors.jpg" },
    { id: 4, name: "Win Music All Stars", genre: "Various", monthlyListeners: 2500000, image: "all-stars.jpg" }
  ],
  
  platforms: [
    { name: "Spotify", description: "Weekly playlist", icon: "fab fa-spotify", url: "#", color: "#1DB954" },
    { name: "YouTube", description: "Official channel", icon: "fab fa-youtube", url: "#", color: "#FF0000" },
    { name: "Apple Music", description: "Featured artist", icon: "fab fa-apple", url: "#", color: "#FA243C" },
    { name: "Amazon Music", description: "New releases", icon: "fab fa-amazon", url: "#", color: "#FF9900" },
    { name: "Tidal", description: "Hi-fi audio", icon: "fab fa-tidal", url: "#", color: "#000000" },
    { name: "Deezer", description: "Flow", icon: "fab fa-deezer", url: "#", color: "#A238FF" }
  ],
  
  shop: [
    { id: 1, name: "Limited Edition Hoodie", description: "Black / Gold foil logo", price: 79.99, category: "Apparel", icon: "fas fa-tshirt", inStock: true },
    { id: 2, name: "Neural Pathways Vinyl", description: "Limited colored vinyl", price: 34.99, category: "Vinyl", icon: "fas fa-record-vinyl", inStock: true },
    { id: 3, name: "Win Music Cap", description: "Black / embroidered", price: 39.99, category: "Accessories", icon: "fas fa-headphones", inStock: false },
    { id: 4, name: "Tour Poster Set", description: "3 posters / A2 size", price: 24.99, category: "Poster", icon: "fas fa-poster", inStock: true }
  ]
};

// ===== ARRAY METHODS USAGE =====
// Using map() to create arrays of just names
const catalogNames = musicData.catalog.map(item => item.title);
console.log('Catalog names (map):', catalogNames);

// Using filter() to find featured items
const featuredItems = musicData.catalog.filter(item => item.featured === true);
console.log('Featured items (filter):', featuredItems);

// Using reduce() to calculate total streams
const totalStreams = musicData.catalog.reduce((acc, item) => acc + item.streams, 0);
console.log('Total streams (reduce):', totalStreams);

// Using sort() to order by streams
const topStreamed = [...musicData.catalog].sort((a, b) => b.streams - a.streams);
console.log('Top streamed (sort):', topStreamed[0].title);

// ===== LOCALSTORAGE FUNCTIONS =====
const StorageManager = {
  // Save to localStorage
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  // Load from localStorage
  loadFromStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  
  // Clear storage
  clearStorage(key) {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  }
};

// ===== CART OBJECT =====
const Cart = {
  items: StorageManager.loadFromStorage('winMusicCart') || [],
  
  add(item) {
    // Check if item already exists
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    
    // Save to localStorage
    StorageManager.saveToStorage('winMusicCart', this.items);
    
    // Update UI
    this.updateCartCount();
    this.showNotification(`${item.name} added to cart`);
  },
  
  remove(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    StorageManager.saveToStorage('winMusicCart', this.items);
    this.updateCartCount();
  },
  
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  },
  
  updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
      const count = this.items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
  },
  
  showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> ${message}`;
    
    // Style with template literals
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
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// ===== DOM MANIPULATION FUNCTIONS =====
function loadCatalogItems() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  
  // Différentes icônes pour varier le design
  const getIconForIndex = (index) => {
    const icons = [
      'fa-compact-disc',
      'fa-microphone-alt',
      'fa-drum',
      'fa-guitar',
      'fa-headphones',
      'fa-music',
      'fa-record-vinyl',
      'fa-radio'
    ];
    return icons[index % icons.length];
  };
  
  grid.innerHTML = musicData.catalog.map((item, index) => {
    const iconClass = getIconForIndex(index);
    
    return `
      <article class="catalog-card ${item.featured ? 'featured' : ''}" data-id="${item.id}">
        <div class="card-image" style="background: ${item.gradient}">
          <div class="card-overlay">
            <button class="play-btn" data-track='${JSON.stringify(item)}' aria-label="Play ${item.title}">
              <i class="fas fa-play" aria-hidden="true"></i>
            </button>
          </div>
          ${item.featured ? '<span class="featured-badge">Featured</span>' : ''}
          <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
            <i class="fas ${iconClass}" style="font-size: 5rem; color: rgba(255,255,255,0.3);"></i>
          </div>
        </div>
        <div class="card-content">
          <div>
            <h3>${item.title}</h3>
            <p>${item.artist}</p>
          </div>
          <div class="card-stats">
            <span><i class="fas fa-headphones" aria-hidden="true"></i> ${(item.streams / 1000000).toFixed(1)}M</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="streaming-links">
            <a href="#" aria-label="Listen on Spotify"><i class="fab fa-spotify"></i></a>
            <a href="#" aria-label="Listen on YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" aria-label="Listen on Apple Music"><i class="fab fa-apple"></i></a>
          </div>
          <time class="release-date" datetime="${item.year}">${item.year}</time>
        </div>
      </article>
    `;
  }).join('');
}
// Dans votre JS, vérifiez que c'est cohérent :
function loadArtists() {
  const grid = document.getElementById('artistsGrid');
  if (!grid) {
    console.log('Artists grid not found');
    return;
  }
  
  // Mapping des icônes par genre
  const getIconByGenre = (genre) => {
    const icons = {
      'Electronic': 'fa-headphones',
      'House': 'fa-drum',
      'Indie Rock': 'fa-guitar',
      'Various': 'fa-music',
      'default': 'fa-user'
    };
    return icons[genre] || icons.default;
  };
  
  grid.innerHTML = musicData.artists.map(artist => {
    const iconClass = getIconByGenre(artist.genre);
    
    return `
      <article class="artist-card">
        <div class="artist-image" style="background: linear-gradient(145deg, #ff0050, #7928b0); display: flex; align-items: center; justify-content: center;">
          <i class="fas ${iconClass}" style="font-size: 4rem; color: rgba(255,255,255,0.3);"></i>
        </div>
        <div class="artist-info">
          <h3>${artist.name}</h3>
          <p>${artist.genre}</p>
          <span class="listener-count">${(artist.monthlyListeners / 1000000).toFixed(1)}M monthly listeners</span>
        </div>
      </article>
    `;
  }).join('');
}

function loadPlatforms() {
  const grid = document.getElementById('platformsGrid');
  if (!grid) return;
  
  grid.innerHTML = musicData.platforms.map(platform => {
    return `
      <a href="${platform.url}" class="platform-item">
        <i class="${platform.icon}" style="color: ${platform.color}" aria-hidden="true"></i>
        <div>
          <h4>${platform.name}</h4>
          <span>${platform.description}</span>
        </div>
      </a>
    `;
  }).join('');
}

function loadShop() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  
  grid.innerHTML = musicData.shop.map(item => {
    return `
      <article class="shop-card" data-id="${item.id}">
        <div class="shop-image" style="background: #2a2a2a;">
          <i class="${item.icon}" aria-hidden="true"></i>
          <span class="shop-category">${item.category}</span>
        </div>
        <div class="shop-details">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <div class="shop-footer">
            <span class="shop-price">$${item.price.toFixed(2)}</span>
            ${item.inStock 
              ? `<button class="shop-btn" data-item='${JSON.stringify(item)}'>Add to cart</button>` 
              : '<span class="out-of-stock">Out of stock</span>'}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ===== EVENT HANDLERS =====
function initEventListeners() {
  // Play buttons (event delegation)
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.play-btn');
    if (playBtn && playBtn.dataset.track) {
      const track = JSON.parse(playBtn.dataset.track);
      // Conditional branching
      if (track) {
        alert(`🎵 Now playing: ${track.title} by ${track.artist}`);
        Cart.showNotification(`Playing: ${track.title}`);
      }
    }
  });
  
  // Add to cart buttons (event delegation)
  document.addEventListener('click', (e) => {
    const shopBtn = e.target.closest('.shop-btn');
    if (shopBtn && shopBtn.dataset.item) {
      const item = JSON.parse(shopBtn.dataset.item);
      Cart.add(item);
    }
  });
  
  // Newsletter form
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const consent = document.getElementById('consent')?.checked;
      const messageEl = document.getElementById('newsletterMessage');
      
      // Conditional branching
      if (!email) {
        messageEl.textContent = 'Please enter your email address';
        messageEl.style.color = '#ff6b6b';
        return;
      }
      
      // Using regex (another form of conditional)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        messageEl.textContent = 'Please enter a valid email address';
        messageEl.style.color = '#ff6b6b';
        return;
      }
      
      if (!consent) {
        messageEl.textContent = 'Please agree to receive marketing emails';
        messageEl.style.color = '#ff6b6b';
        return;
      }
      
      // Success - save to localStorage
      const subscribers = StorageManager.loadFromStorage('newsletterSubscribers') || [];
      subscribers.push({ firstName, email, date: new Date().toISOString() });
      StorageManager.saveToStorage('newsletterSubscribers', subscribers);
      
      messageEl.textContent = `✓ Thanks${firstName ? ' ' + firstName : ''}! Check your inbox to confirm.`;
      messageEl.style.color = '#4caf50';
      
      form.reset();
    });
  }
  
  // Mobile menu
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? false : true;
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', expanded);
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', !expanded);
      document.body.classList.toggle('menu-open');
    });
    
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
      });
    });
  }
}

// ===== LAZY LOADING INIT =====
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('.lazy-image').forEach(img => imageObserver.observe(img));
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Load all dynamic content
  loadCatalogItems();
  loadArtists();
  loadPlatforms();
  loadShop();
  
  // Initialize event listeners
  initEventListeners();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Add cart count element
  const navActions = document.querySelector('.nav-actions') || document.querySelector('.nav-wrapper nav');
  if (navActions) {
    const cartCount = document.createElement('span');
    cartCount.id = 'cartCount';
    cartCount.style.cssText = `
      display: none;
      background: #ff0050;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -5px;
      right: -5px;
    `;
    
    const cartIcon = document.createElement('a');
    cartIcon.href = '#';
    cartIcon.className = 'icon-link cart-icon';
    cartIcon.setAttribute('aria-label', 'Shopping cart');
    cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    cartIcon.style.position = 'relative';
    cartIcon.appendChild(cartCount);
    
    navActions.appendChild(cartIcon);
  }
  
  // Update cart count from localStorage
  Cart.updateCartCount();
  
  console.log('Site initialized with objects, arrays, localStorage, and template literals!');
});