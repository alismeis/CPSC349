const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const scrollTopBtn = document.createElement('div');

// Initialize scroll to top button
scrollTopBtn.classList.add('scroll-top');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Toggle Navigation
function toggleNav() {
    // Toggle navigation menu
    navLinks.classList.toggle('active');
    
    // Toggle burger animation
    burger.classList.toggle('active');
    
    // Animate nav items
    navLinksItems.forEach((link, index) => {
        // If animation exists
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            // Stagger animation for each link
            link.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

// Burger menu click event
burger.addEventListener('click', toggleNav);

// Close menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleNav();
        }
    });
});

// Header scroll effect
function headerScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.3rem 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    }
}

// Scroll to top button visibility
function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle active nav links based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinksItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // If we're on the homepage or root
    if (currentPage === '' || currentPage === '/' || currentPage === 'homepage.html' || currentPage === 'index.html') {
        navLinksItems[0].querySelector('a').classList.add('active');
    }
}

// Add burger menu animation styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .burger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .burger.active .bar:nth-child(2) {
            opacity: 0;
        }
        .burger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    </style>
`);

// Event Listeners
window.addEventListener('scroll', () => {
    headerScroll();
    scrollFunction();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initial header and scroll button state
    headerScroll();
    scrollFunction();
    
    // AOS Animation Library initialization if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
});
