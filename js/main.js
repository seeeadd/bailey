// ============================================
// BAILEY VANN - CREATIVE AI EMPIRE
// Main JavaScript for Landing Page
// ============================================

// ============================================
// COUNTDOWN TIMER
// ============================================

function initCountdown() {
    // Target: December 2, 2025 at 7PM EST
    const targetDate = new Date('2025-12-02T19:00:00-05:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Update sticky counter
        const daysUntil = document.getElementById('daysUntil');
        if (daysUntil) {
            daysUntil.textContent = days;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
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

            // Here you would integrate with your email service provider
            // For now, just show success message
            console.log('Form submitted:', { firstName, email });

            showMessage('✓ Success! Check your email for workshop details.', 'success');
            form.reset();
        });
    }
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
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        ${type === 'success'
            ? 'background: rgba(123, 159, 140, 0.1); color: #7B9F8C;'
            : 'background: rgba(229, 62, 62, 0.1); color: #E53E3E;'}
    `;
    messageDiv.textContent = message;

    form.appendChild(messageDiv);

    if (type === 'success') {
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// ============================================
// SCROLL TO FORM
// ============================================

function scrollToForm() {
    const formCard = document.getElementById('formCard');
    if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const firstInput = document.getElementById('firstName');
            if (firstInput) firstInput.focus();
        }, 500);
    }
}

// Make scrollToForm globally available
window.scrollToForm = scrollToForm;

// ============================================
// SCROLL ANIMATIONS (AOS-like)
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// TESTIMONIAL FILTERING
// ============================================

function initTestimonialFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const filter = pill.getAttribute('data-filter');

            // Update active pill
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Filter testimonials
            testimonialCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// STICKY COUNTER
// ============================================

function initStickyCounter() {
    const stickyCounter = document.getElementById('stickyCounter');
    const challengeSection = document.getElementById('challenge');

    if (!stickyCounter || !challengeSection) return;

    window.addEventListener('scroll', () => {
        const challengeRect = challengeSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Show sticky counter when challenge section is out of view
        if (challengeRect.bottom < 0) {
            stickyCounter.classList.add('visible');
        } else {
            stickyCounter.classList.remove('visible');
        }
    });
}

// ============================================
// SPOTS REMAINING ANIMATION
// ============================================

function initSpotsAnimation() {
    const spotsElement = document.getElementById('spotsRemaining');
    if (!spotsElement) return;

    let spots = parseInt(spotsElement.textContent);

    // Simulate spots decreasing occasionally
    setInterval(() => {
        if (spots > 100 && Math.random() > 0.7) {
            spots--;
            spotsElement.textContent = spots;

            // Animate the change
            spotsElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                spotsElement.style.transform = 'scale(1)';
            }, 300);

            // Update progress bar
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                const percentage = ((420 - spots) / 420) * 100;
                progressFill.style.width = percentage + '%';
            }
        }
    }, 20000); // Check every 20 seconds
}

// ============================================
// VIDEO PLAYER
// ============================================

function initVideoPlayer() {
    const vslThumbnail = document.querySelector('.vsl-thumbnail');

    if (vslThumbnail) {
        vslThumbnail.addEventListener('click', () => {
            // Here you would replace with actual video embed
            // For now, just show an alert
            alert('VSL video would play here. Replace this with your actual video embed code.');

            // Example of embedding a video:
            // const vslPlayer = document.querySelector('.vsl-player');
            // vslPlayer.innerHTML = `
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
// SMOOTH SCROLL FOR HASH LINKS
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
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg-wash');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function observeElements() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe key sections
    document.querySelectorAll('.qual-card, .milestone, .day-card, .outcome-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// LOADING ANIMATION
// ============================================

function initPageLoad() {
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// ============================================
// INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Bailey Vann Workshop Page - Initialized');

    // Initialize all features
    initPageLoad();
    initCountdown();
    initFAQ();
    initFormHandling();
    initScrollAnimations();
    initTestimonialFilters();
    initStickyCounter();
    initSpotsAnimation();
    initVideoPlayer();
    initSmoothScroll();
    initParallax();
    observeElements();

    // Log scroll depth for analytics (optional)
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            // Could send to analytics here
            if (maxScroll > 25 && maxScroll < 26) console.log('User scrolled 25%');
            if (maxScroll > 50 && maxScroll < 51) console.log('User scrolled 50%');
            if (maxScroll > 75 && maxScroll < 76) console.log('User scrolled 75%');
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

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
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if you add them later
function lazyLoadImages() {
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
}
