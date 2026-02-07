// Product data array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// DOM Elements
const productSelect = document.getElementById('productName');
const ratingRadios = document.querySelectorAll('input[name="rating"]');
const ratingText = document.querySelector('.rating-text');
const form = document.getElementById('reviewForm');

// Function to format product name (capitalize first letter of each word)
function formatProductName(name) {
    return name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Populate product select options
function populateProductSelect() {
    // Clear any existing options except the first placeholder
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Add product options
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${formatProductName(product.name)} (${product.averagerating}★)`;
        productSelect.appendChild(option);
    });
}

// Update rating text based on selection
function updateRatingText() {
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const rating = parseInt(e.target.value);
            let text = '';
            
            switch(rating) {
                case 5:
                    text = 'Excellent - Perfect product!';
                    break;
                case 4:
                    text = 'Good - Very satisfied';
                    break;
                case 3:
                    text = 'Average - Met expectations';
                    break;
                case 2:
                    text = 'Poor - Needs improvement';
                    break;
                case 1:
                    text = 'Terrible - Very disappointed';
                    break;
                default:
                    text = 'Select your rating';
            }
            
            ratingText.textContent = text;
            ratingText.style.color = '#495057';
            ratingText.style.fontStyle = 'normal';
        });
    });
}

// Set default date to today
function setDefaultDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    
    document.getElementById('installationDate').value = formattedDate;
    document.getElementById('installationDate').max = formattedDate;
}

// Set max date to today
function setMaxDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    
    document.getElementById('installationDate').max = formattedDate;
}

// Form validation
function setupFormValidation() {
    form.addEventListener('submit', (e) => {
        let isValid = true;
        
        // Clear previous error states
        clearErrors();
        
        // Validate product selection
        if (!productSelect.value) {
            showError(productSelect, 'Please select a product');
            isValid = false;
        }
        
        // Validate rating
        const ratingSelected = Array.from(ratingRadios).some(radio => radio.checked);
        if (!ratingSelected) {
            showError(document.querySelector('.rating-container'), 'Please select a rating');
            isValid = false;
        }
        
        // Validate installation date
        const dateInput = document.getElementById('installationDate');
        if (!dateInput.value) {
            showError(dateInput, 'Please select an installation date');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    element.parentNode.appendChild(errorDiv);
    element.style.borderColor = '#dc3545';
}

function clearErrors() {
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Reset border colors
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
        el.style.borderColor = '#e9ecef';
    });
    
    document.querySelector('.rating-container').style.borderColor = '#e9ecef';
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

// Initialize the form
function initForm() {
    populateProductSelect();
    updateRatingText();
    setDefaultDate();
    setMaxDate();
    setupFormValidation();
    setCurrentYear();
    setLastModified();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initForm);