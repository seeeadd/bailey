// ============================================================================
// BAILEY'S AI ETSY WORKSHOP - RADICAL DESIGN V2
// Interactive JavaScript
// ============================================================================

// ============================================================================
// COUNTDOWN TIMER SYSTEM
// Multiple countdown instances across the page
// ============================================================================
function initCountdownTimers() {
    // Target: December 2, 2025 at 7PM EST
    const workshopDate = new Date('2025-12-02T19:00:00-05:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = workshopDate - now;

        if (distance < 0) {
            // Workshop has started
            updateElement('days', '00');
            updateElement('hours', '00');
            updateElement('minutes', '00');
            updateElement('days-urgency', '00');
            updateElement('hours-urgency', '00');
            updateElement('minutes-urgency', '00');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update hero countdown
        updateElement('days', String(days).padStart(2, '0'));
        updateElement('hours', String(hours).padStart(2, '0'));
        updateElement('minutes', String(minutes).padStart(2, '0'));

        // Update urgency section countdown
        updateElement('days-urgency', String(days).padStart(2, '0'));
        updateElement('hours-urgency', String(hours).padStart(2, '0'));
        updateElement('minutes-urgency', String(minutes).padStart(2, '0'));
    }

    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Initial update
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

// ============================================================================
// MONEY CONFETTI SYSTEM
// Signature visual element - floating dollar signs
// ============================================================================
function initMoneyConfetti() {
    const confettiContainer = document.getElementById('moneyConfetti');
    if (!confettiContainer) return;

    function createMoneySymbol() {
        const money = document.createElement('div');
        money.className = 'money-symbol';
        money.textContent = '$';
        money.style.left = Math.random() * 100 + '%';
        money.style.animationDelay = Math.random() * 8 + 's';
        money.style.fontSize = (Math.random() * 16 + 16) + 'px';
        money.style.opacity = Math.random() * 0.3 + 0.1;

        confettiContainer.appendChild(money);

        // Remove after animation completes
        setTimeout(() => {
            money.remove();
        }, 8000);
    }

    // Create initial batch
    for (let i = 0; i < 10; i++) {
        setTimeout(createMoneySymbol, i * 1000);
    }

    // Continuously create new confetti
    setInterval(createMoneySymbol, 3000);

    // Add confetti burst on CTA hover
    const ctaButtons = document.querySelectorAll('.cta-morphing, .cta-morphing-large, .cta-blob');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(createMoneySymbol, i * 100);
            }
        });
    });
}

// ============================================================================
// SCROLL TO FORM FUNCTIONALITY
// Smooth scroll to the opt-in form
// ============================================================================
function scrollToForm() {
    const formCard = document.querySelector('.form-card-warped');
    if (formCard) {
        formCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Focus first input after scroll
        setTimeout(() => {
            const firstInput = document.getElementById('firstName');
            if (firstInput) {
                firstInput.focus();
            }
        }, 800);
    }
}

// Make scrollToForm globally available
window.scrollToForm = scrollToForm;

// ============================================================================
// FORM SUBMISSION HANDLING
// ============================================================================
function initFormHandling() {
    const form = document.getElementById('optinForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!firstName || !email) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // TODO: Integrate with email service provider
        // For now, simulate success
        console.log('Form submitted:', { firstName, email });

        // Show success message
        showMessage('🎉 Success! Check your email for workshop details.', 'success');

        // Trigger confetti burst
        triggerConfettiBurst();

        // Reset form
        form.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const form = document.getElementById('optinForm');
    const existingMsg = form.querySelector('.form-message');

    if (existingMsg) {
        existingMsg.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-family: var(--font-sohne);
        ${type === 'success'
            ? 'background: rgba(123, 159, 140, 0.15); color: #2C6B5F; border: 2px solid #7B9F8C;'
            : 'background: rgba(229, 62, 62, 0.1); color: #E53E3E; border: 2px solid #E53E3E;'}
    `;
    messageDiv.textContent = message;

    form.appendChild(messageDiv);

    if (type === 'success') {
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

function triggerConfettiBurst() {
    const confettiContainer = document.getElementById('moneyConfetti');
    if (!confettiContainer) return;

    // Create burst of 20 confetti
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const money = document.createElement('div');
            money.className = 'money-symbol';
            money.textContent = '$';
            money.style.left = (40 + Math.random() * 20) + '%';
            money.style.animationDelay = '0s';
            money.style.fontSize = (Math.random() * 24 + 20) + 'px';
            money.style.opacity = Math.random() * 0.5 + 0.3;
            money.style.color = '#D4AF37';

            confettiContainer.appendChild(money);

            setTimeout(() => money.remove(), 8000);
        }, i * 50);
    }
}

// ============================================================================
// SMOOTH SCROLL FOR HASH LINKS
// ============================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================================================
// PARALLAX EFFECTS
// Subtle parallax on scroll
// ============================================================================
function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax on floating money symbols
        const floatingMoney = document.querySelectorAll('.money-float');
        floatingMoney.forEach((money, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            money.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });

        // Parallax on blob shapes
        const blobs = document.querySelectorAll('.blob-shape');
        blobs.forEach((blob, index) => {
            const speed = 0.2;
            const yPos = scrolled * speed;
            blob.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ============================================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// Reveal elements as they come into view
// ============================================================================
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animations
    const elementsToObserve = document.querySelectorAll(`
        .qual-item,
        .ticket-card,
        .polaroid-card,
        .speech-bubble,
        .sticky-note
    `);

    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// CURSOR FOLLOW EFFECT
// Money symbols follow cursor on hover over CTAs
// ============================================================================
function initCursorEffect() {
    let mouseX = 0;
    let mouseY = 0;
    let isOverCTA = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const ctaButtons = document.querySelectorAll('.cta-morphing, .cta-morphing-large, .cta-blob');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            isOverCTA = true;
        });
        button.addEventListener('mouseleave', () => {
            isOverCTA = false;
        });
    });

    // Create floating money that follows cursor when over CTA
    setInterval(() => {
        if (isOverCTA) {
            const confettiContainer = document.getElementById('moneyConfetti');
            if (!confettiContainer) return;

            const money = document.createElement('div');
            money.textContent = '$';
            money.style.position = 'fixed';
            money.style.left = mouseX + 'px';
            money.style.top = mouseY + 'px';
            money.style.fontSize = '20px';
            money.style.fontFamily = 'JetBrains Mono, monospace';
            money.style.fontWeight = 'bold';
            money.style.color = '#D4AF37';
            money.style.pointerEvents = 'none';
            money.style.zIndex = '99999';
            money.style.transition = 'all 0.5s ease-out';
            money.style.opacity = '0.6';

            confettiContainer.appendChild(money);

            // Animate away
            setTimeout(() => {
                money.style.transform = 'translateY(-100px) scale(2)';
                money.style.opacity = '0';
            }, 50);

            setTimeout(() => money.remove(), 600);
        }
    }, 200);
}

// ============================================================================
// PAGE LOAD ANIMATION
// Fade in page content smoothly
// ============================================================================
function initPageLoad() {
    // Set initial opacity
    document.body.style.opacity = '0';

    // Fade in after a brief delay
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// ============================================================================
// BLOB MORPHING ANIMATION ENHANCEMENT
// Add random morphing to organic blob shapes
// ============================================================================
function enhanceBlobMorphing() {
    const blobs = document.querySelectorAll('.blob-shape');

    blobs.forEach(blob => {
        setInterval(() => {
            const borderRadius = generateRandomBorderRadius();
            blob.style.transition = 'border-radius 3s ease-in-out';
            blob.style.borderRadius = borderRadius;
        }, 3000);
    });

    function generateRandomBorderRadius() {
        const values = [];
        for (let i = 0; i < 8; i++) {
            values.push(Math.random() * 20 + 40);
        }
        return `${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${values[6]}% ${values[7]}%`;
    }
}

// ============================================================================
// TICKET CARDS ROTATION ENHANCEMENT
// Add subtle rotation animation on ticket cards
// ============================================================================
function enhanceTicketCards() {
    const ticketCards = document.querySelectorAll('.ticket-card');

    ticketCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        card.addEventListener('mouseleave', () => {
            // Return to original rotation
            const rotation = card.style.rotate;
            card.style.rotate = rotation;
        });
    });
}

// ============================================================================
// FORM INPUT ENHANCEMENT
// Add floating labels and better UX
// ============================================================================
function enhanceFormInputs() {
    const inputs = document.querySelectorAll('.form-group-modern input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.transform = 'translateY(0)';
            }
        });

        // Add ripple effect on input
        input.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = 'rgba(232, 155, 160, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple-expand 0.6s ease-out';

            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-expand {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// CONSOLE SIGNATURE
// Bailey's signature in console
// ============================================================================
function showConsoleSignature() {
    console.log('%c🎨 Bailey Vann AI Etsy Workshop', 'font-size: 24px; font-weight: bold; color: #E89BA0;');
    console.log('%c✨ Radical Design System V2', 'font-size: 16px; color: #7B9F8C;');
    console.log('%c📐 Anti-Grid Manifesto • Typography Revolution', 'font-size: 12px; color: #2C6B5F; font-style: italic;');
    console.log('\n');
    console.log('%cDesigned with:', 'font-weight: bold;');
    console.log('• Ogg (Playfair Display) - High-contrast serif');
    console.log('• Tan Pearl (Cormorant Garamond) - Elegant serif');
    console.log('• Sohne (Inter) - Sophisticated sans');
    console.log('• Magnolia Sky (Dancing Script) - Organic handwritten');
    console.log('• JetBrains Mono - For data/numbers');
    console.log('\n');
    console.log('%c🎯 Ready to build your Dream Etsy Shop?', 'font-size: 14px; color: #D4AF37; font-weight: bold;');
}

// ============================================================================
// INITIALIZE ALL FEATURES
// Run when DOM is fully loaded
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Bailey Vann Workshop Page - Initializing...');

    // Initialize all features
    initPageLoad();
    initCountdownTimers();
    initMoneyConfetti();
    initFormHandling();
    initSmoothScroll();
    initParallax();
    initScrollObserver();
    initCursorEffect();
    enhanceBlobMorphing();
    enhanceTicketCards();
    enhanceFormInputs();
    showConsoleSignature();

    console.log('✅ All features initialized successfully!');

    // Log scroll depth for analytics (optional)
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            // Milestones
            if (maxScroll > 25 && maxScroll < 26) console.log('📊 User scrolled 25%');
            if (maxScroll > 50 && maxScroll < 51) console.log('📊 User scrolled 50%');
            if (maxScroll > 75 && maxScroll < 76) console.log('📊 User scrolled 75%');
            if (maxScroll > 95) console.log('📊 User reached bottom - highly engaged!');
        }
    });
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Random number generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// ============================================================================
// EASTER EGG: Konami Code
// Trigger extra confetti with Konami code
// ============================================================================
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Konami code completed!
                console.log('🎮 KONAMI CODE ACTIVATED! 💰💰💰');
                triggerMassiveConfetti();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function triggerMassiveConfetti() {
        const confettiContainer = document.getElementById('moneyConfetti');
        if (!confettiContainer) return;

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const money = document.createElement('div');
                money.className = 'money-symbol';
                money.textContent = ['$', '💰', '💵', '💸'][Math.floor(Math.random() * 4)];
                money.style.left = Math.random() * 100 + '%';
                money.style.animationDelay = '0s';
                money.style.fontSize = (Math.random() * 32 + 20) + 'px';
                money.style.opacity = Math.random() * 0.8 + 0.2;

                confettiContainer.appendChild(money);

                setTimeout(() => money.remove(), 8000);
            }, i * 50);
        }
    }
})();
