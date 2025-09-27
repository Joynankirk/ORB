// OrbitStack Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // BANNER FUNCTIONALITY
    // ======================
    const bannerClose = document.querySelector('.banner-close');
    const topBanner = document.querySelector('.top-banner');
    
    if (bannerClose && topBanner) {
        bannerClose.addEventListener('click', function() {
            topBanner.style.transform = 'translateY(-100%)';
            topBanner.style.opacity = '0';
            setTimeout(() => {
                topBanner.style.display = 'none';
            }, 300);
        });
    }

    // ======================
    // MOBILE MENU TOGGLE
    // ======================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                // Close menu
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Open menu
                navMenu.classList.add('active');
                navActions.classList.add('active');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ======================
    // HERO INPUT FUNCTIONALITY
    // ======================
    const heroInput = document.querySelector('.hero-input');
    const inputButtons = document.querySelectorAll('.input-btn');
    
    if (heroInput) {
        // Handle input focus
        heroInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--color-primary)';
            this.parentElement.style.boxShadow = '0 0 0 1px var(--color-primary)';
        });
        
        heroInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'var(--color-border)';
            this.parentElement.style.boxShadow = 'none';
        });

        // Handle enter key
        heroInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleHeroSubmit();
            }
        });
    }

    // Handle input buttons
    inputButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-paper-plane')) {
                handleHeroSubmit();
            } else if (icon.classList.contains('fa-image')) {
                handleImageUpload();
            }
        });
    });

    function handleHeroSubmit() {
        const inputValue = heroInput.value.trim();
        if (inputValue) {
            // Simulate processing
            showNotification('Processing your request...', 'info');
            heroInput.disabled = true;
            
            setTimeout(() => {
                showNotification('Feature coming soon! Thanks for your interest.', 'success');
                heroInput.disabled = false;
                heroInput.value = '';
            }, 2000);
        } else {
            showNotification('Please enter a description first.', 'warning');
        }
    }

    function handleImageUpload() {
        showNotification('Image upload feature coming soon!', 'info');
    }

    // ======================
    // TECH BADGES INTERACTION
    // ======================
    const techBadges = document.querySelectorAll('.tech-badge');
    
    techBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            // Remove active class from all badges
            techBadges.forEach(b => b.classList.remove('active'));
            // Add active class to clicked badge
            this.classList.add('active');
        });
    });

    // ======================
    // NEWSLETTER FUNCTIONALITY
    // ======================
    const newsletterForm = document.querySelector('.signup-form');
    const emailInput = document.querySelector('.email-input');
    const signupBtn = document.querySelector('.signup-btn');
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');

    if (newsletterForm && emailInput && signupBtn) {
        // Handle form submission
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });

        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSignup();
            }
        });
    }

    function handleNewsletterSignup() {
        const email = emailInput.value.trim();
        const selectedNewsletters = [];
        
        toggleSwitches.forEach(toggle => {
            if (toggle.checked) {
                const optionInfo = toggle.closest('.newsletter-option').querySelector('.option-info h4').textContent;
                selectedNewsletters.push(optionInfo);
            }
        });

        if (!email) {
            showNotification('Please enter your email address.', 'warning');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'warning');
            return;
        }

        if (selectedNewsletters.length === 0) {
            showNotification('Please select at least one newsletter.', 'warning');
            return;
        }

        // Simulate signup
        signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        emailInput.disabled = true;

        setTimeout(() => {
            showNotification(`Successfully subscribed to: ${selectedNewsletters.join(', ')}`, 'success');
            emailInput.value = '';
            emailInput.disabled = false;
            signupBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        }, 2000);
    }

    // ======================
    // SMOOTH SCROLLING
    // ======================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // NAVBAR SCROLL EFFECT
    // ======================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ======================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .integration-card, .product-card, .enterprise-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ======================
    // UTILITY FUNCTIONS
    // ======================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                removeNotification(notification);
            }
        }, 5000);
    }

    function removeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 300);
    }

    // ======================
    // LOGO SCROLL ANIMATION
    // ======================
    const logoScroll = document.querySelector('.logo-scroll');
    if (logoScroll) {
        // Duplicate logos for seamless loop
        const logoItems = logoScroll.innerHTML;
        logoScroll.innerHTML = logoItems + logoItems;
    }

    // ======================
    // FORM VALIDATION STYLES
    // ======================
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#EF4444';
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '';
            }
        });
    });

    // ======================
    // KEYBOARD ACCESSIBILITY
    // ======================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close banner with Escape key
        if (e.key === 'Escape' && topBanner && topBanner.style.display !== 'none') {
            bannerClose.click();
        }
    });

    // ======================
    // PERFORMANCE OPTIMIZATIONS
    // ======================
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ======================
    // BUTTON EVENT HANDLERS
    // ======================
    // Contact Sales buttons
    const contactButtons = document.querySelectorAll('.btn-outline');
    contactButtons.forEach(btn => {
        if (btn.textContent.includes('Contact Sales') || btn.textContent.includes('Talk to us')) {
            btn.addEventListener('click', () => {
                showNotification('Contact sales feature coming soon!', 'info');
            });
        }
    });

    // Sign Up buttons
    const signupButtons = document.querySelectorAll('.btn-primary');
    signupButtons.forEach(btn => {
        if (btn.textContent.includes('Sign Up') || btn.textContent.includes('Try it now')) {
            btn.addEventListener('click', () => {
                showNotification('Sign up feature coming soon!', 'info');
            });
        }
    });

    // Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.btn-outline');
    learnMoreButtons.forEach(btn => {
        if (btn.textContent.includes('Learn more')) {
            btn.addEventListener('click', () => {
                showNotification('More information coming soon!', 'info');
            });
        }
    });

    // ======================
    // INITIALIZATION COMPLETE
    // ======================
    console.log('OrbitStack website initialized successfully!');

    // Add mobile menu styles
    const mobileMenuStyles = document.createElement('style');
    mobileMenuStyles.textContent = `
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(0, 0, 0, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding: 2rem;
                gap: 2rem;
                z-index: 998;
            }
            
            .nav-actions.active {
                display: flex;
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                gap: 1rem;
                z-index: 999;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(mobileMenuStyles);
});
