// DOM Elements
const reviewDataElement = document.getElementById('reviewData');
const reviewCounterElement = document.getElementById('reviewCounter');

// Feature descriptions mapping
const featureDescriptions = {
    'easy-installation': 'Easy Installation',
    'good-performance': 'Good Performance',
    'energy-efficient': 'Energy Efficient',
    'durable': 'Durable Construction',
    'good-value': 'Good Value for Money'
};

// Product data for display
const products = [
    { id: "fc-1888", name: "flux capacitor" },
    { id: "fc-2050", name: "power laces" },
    { id: "fs-1987", name: "time circuits" },
    { id: "ac-2000", name: "low voltage reactor" },
    { id: "jj-1969", name: "warp equalizer" }
];

// Function to get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) {
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
    });
    
    return params;
}

// Function to format product name
function formatProductName(name) {
    return name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Function to get product name from ID
function getProductNameById(id) {
    const product = products.find(p => p.id === id);
    return product ? formatProductName(product.name) : id;
}

// Function to create star rating display
function createStarRating(rating) {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return `<span class="rating-stars">${fullStars}${emptyStars}</span>`;
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to display review data
function displayReviewData(params) {
    const reviewItems = [];
    
    // Product Name
    if (params.productName) {
        reviewItems.push(`
            <div class="review-item">
                <strong>Product Name</strong>
                <span>${getProductNameById(params.productName)}</span>
            </div>
        `);
    }
    
    // Overall Rating
    if (params.rating) {
        reviewItems.push(`
            <div class="review-item">
                <strong>Overall Rating</strong>
                <span>${createStarRating(parseInt(params.rating))} (${params.rating}/5)</span>
            </div>
        `);
    }
    
    // Date of Installation
    if (params.installationDate) {
        reviewItems.push(`
            <div class="review-item">
                <strong>Date of Installation</strong>
                <span>${formatDate(params.installationDate)}</span>
            </div>
        `);
    }
    
    // Useful Features
    if (params.features) {
        const features = Array.isArray(params.features) ? params.features : [params.features];
        const featureList = features
            .map(feature => featureDescriptions[feature] || feature)
            .join(', ');
        
        reviewItems.push(`
            <div class="review-item">
                <strong>Useful Features</strong>
                <span>${featureList || 'None selected'}</span>
            </div>
        `);
    }
    
    // Written Review
    if (params.writtenReview) {
        reviewItems.push(`
            <div class="review-item">
                <strong>Written Review</strong>
                <span>${params.writtenReview}</span>
            </div>
        `);
    }
    
    // User Name
    if (params.userName) {
        reviewItems.push(`
            <div class="review-item">
                <strong>Reviewer Name</strong>
                <span>${params.userName}</span>
            </div>
        `);
    }
    
    // Update the display
    if (reviewItems.length > 0) {
        reviewDataElement.innerHTML = reviewItems.join('');
    } else {
        reviewDataElement.innerHTML = `
            <div class="review-item">
                <strong>No review data available</strong>
                <span>Please submit a review through the form</span>
            </div>
        `;
    }
}

// Function to initialize or get review counter
function initializeReviewCounter() {
    let reviewCount = localStorage.getItem('reviewCount');
    
    if (reviewCount === null) {
        // Initialize counter if it doesn't exist
        reviewCount = 0;
        localStorage.setItem('reviewCount', reviewCount);
    }
    
    return parseInt(reviewCount);
}

// Function to update review counter ONLY when coming from form submission
function updateReviewCounter() {
    // Check if we have URL parameters (means we came from form submission)
    const params = getUrlParams();
    const hasFormData = Object.keys(params).length > 0;
    
    if (hasFormData) {
        // Get current count
        let reviewCount = initializeReviewCounter();
        
        // Increment the counter
        reviewCount++;
        localStorage.setItem('reviewCount', reviewCount);
        
        console.log(`Review counter updated: ${reviewCount}`);
    }
}

// Function to display current review counter
function displayReviewCounter() {
    const reviewCount = initializeReviewCounter();
    reviewCounterElement.textContent = reviewCount;
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Set last modified date in footer
function setLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

// Main initialization function
function initReviewPage() {
    const params = getUrlParams();
    
    // Update counter if we have form data
    updateReviewCounter();
    
    // Display the review data
    displayReviewData(params);
    
    // Display the current counter
    displayReviewCounter();
    
    // Set footer info
    setCurrentYear();
    setLastModified();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initReviewPage);