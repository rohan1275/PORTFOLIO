// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme handling
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

function updateThemeToggleLabel() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.theme-icon');
    const label = themeToggle.querySelector('.theme-label');
    const isLight = body.classList.contains('light-theme');

    if (isLight) {
        if (icon) icon.className = 'fas fa-sun theme-icon';
        if (label) label.textContent = 'Light';
    } else {
        if (icon) icon.className = 'fas fa-moon theme-icon';
        if (label) label.textContent = 'Dark';
    }
}

if (themeToggle) {
    updateThemeToggleLabel();
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeToggleLabel();
    });
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.2)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-text, .about-image, .contact-info, .contact-form');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 50);
});

// Skill bars animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Parallax effect for hero section (disabled to prevent overlap issues)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "cU4ImATK7r799K1cf",
    SERVICE_ID: "service_b2stsjq",
    TEMPLATE_ID: "template_ub2y1en"
};

// Initialize EmailJS if configured
if (EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    (function() {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    })();
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const heading = formData.get('heading');
        const body = formData.get('body');
        
        // Basic validation
        if (!name || !heading || !body) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY" || 
            EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" || 
            EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            // Fallback: Use mailto link if EmailJS is not configured
            const mailtoLink = `mailto:mishrarohan1275@gmail.com?subject=${encodeURIComponent(heading)}&body=${encodeURIComponent(`From: ${name}\n\n${body}`)}`;
            window.location.href = mailtoLink;
            showNotification('Opening email client...', 'info');
            contactForm.reset();
            return;
        }
        
        // Prepare email parameters
        const emailParams = {
            to_email: 'mishrarohan1275@gmail.com',
            from_name: name,
            subject: heading,
            message: body
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
            .then(function(response) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Failed to send message. Please try again later.', 'error');
                console.error('EmailJS Error:', error);
            });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
        item.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Listen for scroll events to update active nav link
window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #6366f1 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
});

// Add floating animation to hero elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-card');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating animations
addFloatingAnimation();

// Add particle effect to hero section (simple CSS-based)
function addParticleEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.innerHTML = `
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
        `;
        hero.appendChild(particleContainer);
        
        // Add particle styles
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }
            
            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float-particle 8s infinite linear;
            }
            
            .particle:nth-child(1) {
                left: 10%;
                animation-delay: 0s;
            }
            
            .particle:nth-child(2) {
                left: 30%;
                animation-delay: 2s;
            }
            
            .particle:nth-child(3) {
                left: 50%;
                animation-delay: 4s;
            }
            
            .particle:nth-child(4) {
                left: 70%;
                animation-delay: 6s;
            }
            
            .particle:nth-child(5) {
                left: 90%;
                animation-delay: 8s;
            }
            
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

// Initialize particle effect
addParticleEffect();

// Certifications Carousel
class CertificationsCarousel {
    constructor() {
        this.carousel = document.getElementById('certCarousel');
        this.track = this.carousel;
        this.prevBtn = document.getElementById('certPrev');
        this.nextBtn = document.getElementById('certNext');
        this.indicatorsContainer = document.getElementById('certIndicators');
        this.cards = this.carousel.querySelectorAll('.cert-card');
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.cardsPerView = this.getCardsPerView();
        
        if (!this.carousel || this.cards.length === 0) return;
        
        this.init();
    }
    
    getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        return 3;
    }
    
    init() {
        this.createIndicators();
        this.updateCarousel();
        this.attachEventListeners();
        this.handleResize();
    }
    
    createIndicators() {
        const totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    updateCarousel() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Ensure cards are rendered before calculating width
        if (this.cards.length === 0 || this.cards[0].offsetWidth === 0) {
            setTimeout(() => this.updateCarousel(), 100);
            this.isTransitioning = false;
            return;
        }
        
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(this.currentIndex * (cardWidth + gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateIndicators();
        this.updateButtons();
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600); // Match CSS transition duration
    }
    
    updateIndicators() {
        const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
        const activeIndicatorIndex = Math.floor(this.currentIndex / this.cardsPerView);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndicatorIndex);
        });
    }
    
    updateButtons() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        this.currentIndex = Math.max(0, Math.min(index * this.cardsPerView, maxIndex));
        this.updateCarousel();
    }
    
    next() {
        if (this.isTransitioning) return;
        
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex = Math.min(this.currentIndex + this.cardsPerView, maxIndex);
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        if (this.currentIndex > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - this.cardsPerView);
            this.updateCarousel();
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    attachEventListeners() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            touchStartX = 0;
            touchEndX = 0;
        }, { passive: true });
        
        // Trackpad gesture support (wheel events)
        let wheelDeltaX = 0;
        let wheelTimeout;
        
        this.carousel.addEventListener('wheel', (e) => {
            // Check if horizontal scrolling (trackpad swipe gesture)
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                wheelDeltaX += e.deltaX;
                
                // Clear existing timeout
                clearTimeout(wheelTimeout);
                
                // Set threshold for trackpad gesture
                const threshold = 50;
                
                if (Math.abs(wheelDeltaX) > threshold) {
                    if (wheelDeltaX > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                    wheelDeltaX = 0;
                }
                
                // Reset delta after a short delay (for continuous scrolling)
                wheelTimeout = setTimeout(() => {
                    wheelDeltaX = 0;
                }, 150);
            }
        }, { passive: false });
        
        // Mouse drag support for desktop
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        this.carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            this.carousel.style.cursor = 'grabbing';
            this.carousel.style.userSelect = 'none';
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                this.carousel.style.cursor = 'grab';
                this.carousel.style.userSelect = '';
            }
        });
        
        this.carousel.addEventListener('mouseup', () => {
            if (isDragging) {
                const diff = startX - currentX;
                const swipeThreshold = 50;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
                
                isDragging = false;
                this.carousel.style.cursor = 'grab';
                this.carousel.style.userSelect = '';
            }
        });
        
        this.carousel.addEventListener('mousemove', (e) => {
            if (isDragging) {
                currentX = e.clientX;
            }
        });
        
        // Set initial cursor style
        this.carousel.style.cursor = 'grab';
        
        // Keyboard navigation
        const certificationsSection = document.getElementById('certifications');
        if (certificationsSection) {
            certificationsSection.setAttribute('tabindex', '0');
            certificationsSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                }
            });
        }
    }
    
    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.currentIndex = Math.min(this.currentIndex, Math.max(0, this.cards.length - this.cardsPerView));
                    this.createIndicators();
                    this.updateCarousel();
                }
            }, 250);
        });
    }
}

// Initialize carousel when DOM is loaded
let certificationsCarousel;
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all styles are applied
    setTimeout(() => {
        certificationsCarousel = new CertificationsCarousel();
    }, 100);
});

// Also initialize on window load as fallback
window.addEventListener('load', () => {
    if (!certificationsCarousel) {
        setTimeout(() => {
            certificationsCarousel = new CertificationsCarousel();
        }, 100);
    }
});

// Certificate Modal Functions
function openCertModal(imageSrc) {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCertModal();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('certModal');
        if (modal && modal.classList.contains('show')) {
            closeCertModal();
        }
    }
});