// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});

// ===== PRODUCT FILTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('[data-category]');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter products with smooth animation
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.animation = 'fadeIn 0.5s ease';
                        card.style.display = 'grid';
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just '#' or links to external pages
            if (href === '#' || href.includes('http')) return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current FAQ
                item.classList.toggle('active');
            });
        }
    });
});

// ===== CONTACT FORM VALIDATION & SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Invio in corso...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Show success message
                showFormMessage('success', 'Messaggio inviato con successo! Ti risponderemo entro 24 ore.');

                // Reset form
                contactForm.reset();

                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;

                // Hide message after 5 seconds
                setTimeout(function() {
                    hideFormMessage();
                }, 5000);
            }, 1500);
        });
    }

    function validateForm(data) {
        // Check required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('error', 'Per favore, compila tutti i campi obbligatori.');
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('error', 'Per favore, inserisci un indirizzo email valido.');
            return false;
        }

        // Check privacy policy
        if (!data.privacy) {
            showFormMessage('error', 'Devi accettare la Privacy Policy per continuare.');
            return false;
        }

        return true;
    }

    function showFormMessage(type, message) {
        if (formMessage) {
            formMessage.className = 'form-message ' + type;
            formMessage.textContent = message;
            formMessage.style.display = 'block';

            // Smooth scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function hideFormMessage() {
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    }
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member, .process-step');

    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;

        // Observe element
        observer.observe(element);
    });
});

// ===== STATS COUNTER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    }

    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/\D/g, ''));

        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(function() {
            current += increment;

            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current).toLocaleString('it-IT');

            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                displayValue += '+';
            }

            element.textContent = displayValue;
        }, stepTime);
    }
});

// ===== PRODUCT CARD HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card, .product-card-detailed');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// ===== LAZY LOADING FOR IMAGES (if added later) =====
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ===== FORM INPUT ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Add filled class when input has value
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
});

// ===== BACK TO TOP BUTTON (Optional) =====
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Torna su');

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            background-color: #FF5722;
            transform: translateY(-5px);
        }

        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎸 SoundWave Amplifiers', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cWebsite by Claude Code', 'font-size: 14px; color: #666;');
console.log('%cPer informazioni: corniolafederico07@gmail.com', 'font-size: 12px; color: #999;');
