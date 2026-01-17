// temples.js - JavaScript for Temple Album Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Update copyright year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // 2. Update last modified date
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
    
    // 3. Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger
            this.classList.toggle('active');
            
            // Toggle active class on navigation
            nav.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a nav link (for mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside (for mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 768) {
                const isClickInsideNav = nav.contains(event.target);
                const isClickOnHamburger = hamburger.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                // Ensure menu is visible on desktop
                hamburger.classList.remove('active');
                nav.classList.add('active');
                document.body.style.overflow = '';
            } else {
                // Ensure menu is hidden by default on mobile
                nav.classList.remove('active');
            }
        });
        
        // Initialize menu state based on screen width
        if (window.innerWidth >= 768) {
            nav.classList.add('active');
        }
    }
    
    // 4. Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 5. Add loading animation for images
    const figures = document.querySelectorAll('figure');
    
    figures.forEach(figure => {
        const img = figure.querySelector('img');
        
        if (img) {
            // Add loading class
            figure.classList.add('loading');
            
            img.addEventListener('load', function() {
                figure.classList.remove('loading');
                figure.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                figure.classList.remove('loading');
                figure.classList.add('error');
                console.warn('Failed to load image:', img.src);
            });
        }
    });
    
    // 6. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 7. Add keyboard navigation for hamburger menu
    if (hamburger) {
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make hamburger focusable
        hamburger.setAttribute('tabindex', '0');
    }
    
    // Console greeting (for development)
    console.log('Temple Album page loaded successfully!');
    console.log('Current year:', new Date().getFullYear());
    console.log('Last modified:', document.lastModified);
});