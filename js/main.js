// ============================================
// BAILEY VANN CREATIVE AI EMPIRE
// Workshop Opt-in Page JavaScript
// ============================================

// ============================================
// COUNTDOWN TIMER
// ============================================

function initCountdown() {
    // Set target date: December 2, 2025, 7:00 PM EST
    const targetDate = new Date('2025-12-02T19:00:00-05:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initFormHandling() {
    const form = document.getElementById('optinForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;

            // Basic validation
            if (!firstName || !email) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Here you would normally send the data to your email service provider
            // For now, we'll just show a success message
            console.log('Form submitted:', { firstName, email });

            // Show success message
            showSuccessMessage(form);

            // Reset form
            form.reset();
        });
    }

    // Add form handling to all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button:not([type="submit"])');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to the form
            const formCard = document.querySelector('.form-card');
            if (formCard) {
                formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Focus the first input
                setTimeout(() => {
                    const firstInput = document.getElementById('firstName');
                    if (firstInput) firstInput.focus();
                }, 500);
            }
        });
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showSuccessMessage(form) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p style="color: #7B9F8C; font-weight: 600; text-align: center; padding: 16px; background: rgba(123, 159, 140, 0.1); border-radius: 8px; margin-top: 16px;">
            ✓ Success! Check your email for workshop details.
        </p>
    `;

    form.appendChild(successMsg);

    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.qualification-card, .milestone-card, .outcome-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// SPOTS REMAINING ANIMATION
// ============================================

function initSpotsAnimation() {
    const spotsElement = document.getElementById('spotsRemaining');
    if (!spotsElement) return;

    // Simulate spots decreasing
    let spots = parseInt(spotsElement.textContent);

    setInterval(() => {
        if (spots > 100 && Math.random() > 0.7) {
            spots--;
            spotsElement.textContent = spots;

            // Animate the number change
            spotsElement.style.transform = 'scale(1.2)';
            spotsElement.style.color = '#E53E3E';

            setTimeout(() => {
                spotsElement.style.transform = 'scale(1)';
            }, 300);
        }
    }, 15000); // Check every 15 seconds
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// VIDEO PLACEHOLDER CLICK HANDLER
// ============================================

function initVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // Here you would replace the placeholder with an actual video embed
            // For now, we'll just show an alert
            alert('Video would play here. In production, this would embed your actual VSL video.');

            // Example of how you might embed a video:
            // const videoWrapper = document.querySelector('.video-wrapper');
            // videoWrapper.innerHTML = `
            //     <iframe
            //         width="100%"
            //         height="100%"
            //         src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
            //         frameborder="0"
            //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //         allowfullscreen>
            //     </iframe>
            // `;
        });
    }
}

// ============================================
// STICKY FORM CARD ON SCROLL
// ============================================

function initStickyForm() {
    const formCard = document.querySelector('.form-card');
    if (!formCard) return;

    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    let isSticky = true;

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > heroBottom && isSticky) {
            formCard.style.position = 'relative';
            formCard.style.top = '0';
            isSticky = false;
        } else if (scrollPosition <= heroBottom && !isSticky) {
            formCard.style.position = 'sticky';
            formCard.style.top = 'var(--space-md)';
            isSticky = true;
        }
    });
}

// ============================================
// PARALLAX EFFECT FOR BACKGROUND ELEMENTS
// ============================================

function initParallax() {
    const watercolorBg = document.querySelector('.watercolor-background');

    if (watercolorBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            watercolorBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
}

// ============================================
// ANIMATE NUMBERS ON SCROLL
// ============================================

function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Bailey Vann Workshop Page Loaded');

    // Initialize all features
    initCountdown();
    initFAQ();
    initFormHandling();
    initScrollAnimations();
    initSpotsAnimation();
    initSmoothScroll();
    initVideoPlaceholder();
    initStickyForm();
    initParallax();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Track scroll depth for analytics (optional)
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            // You could send this to your analytics platform
            console.log(`Max scroll depth: ${Math.round(maxScroll)}%`);
        }
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

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

// ============================================
// EXPORT FOR TESTING (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCountdown,
        initFAQ,
        initFormHandling,
        isValidEmail
    };
}
