// ========================================
// FINAL WORKING VERSION
// Fixed: Preserves video wrapper dimensions when adding iframe
// ========================================

let currentTestimonialIndex = 0;
const packagePrices = {
    basic: 150,
    professional: 250,
    premium: 400
};

// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                navMenu.classList.remove('active');
            }
        }
    });
});

// ========================================
// Portfolio Filtering
// ========================================
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// YouTube Video Player Configuration
// ========================================

const youtubeVideos = [
    {
        videoId: 'G-XMiVMlLRI',
        title: 'Dance Meri Rani',
        artist: 'Nora Fatehi',
        category: 'production'
    },
    {
        videoId: 'qutnNui6Jzc',
        title: 'Sin Denim X Hardik Pandya',
        artist: 'Hardik Pandya',
        category: 'production'
    },
    {
        videoId: 'a8dzL0rXRKE',
        title: 'Skoda',
        artist: 'Jubin Nautiyal',
        category: 'production'
    },
    {
        videoId: 'dH4ArcqAL3Y',
        title: 'Lakeerein',
        artist: 'Ashutosh Rana',
        category: 'mixing'
    },
    {
        videoId: 'oEBC1Or8teQ',
        title: 'Jind Mahiya',
        artist: 'Saaj Bhatt',
        category: 'production'
    },
    {
        videoId: 'qO_facOiG14',
        title: 'Mita Do',
        artist: 'Rohini Garg',
        category: 'production'
    },
    {
        videoId: 'p7IaOANvMOc',  // REPLACE THIS with your actual video ID
        title: 'Kripayale ',
        artist: 'Jijo Ganesan Attingal',
        category: 'production'
    },
	 {
        videoId: 'wL_gLi4KLtg',  // REPLACE THIS with your actual video ID
        title: 'JHOOM BABA ',
        artist: 'Bhaswati Sengupta',
        category: 'production'
    },
	 {
        videoId: 'iV5rNXgQySg',  // REPLACE THIS with your actual video ID
        title: 'Teri Baaton Mein ',
        artist: 'Benny John',
        category: 'production'
    },
];

function createVideoElement(video) {
    return `
        <div class="portfolio-item video-item" data-category="${video.category}">
            <div class="portfolio-image video-container">
                <div class="video-wrapper" data-video-id="${video.videoId}">
                    <img src="https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg" 
                         alt="${video.title}" 
                         class="video-thumbnail"
                         onerror="this.src='https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg'">
                    <div class="video-play-overlay">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            </div>
            <div class="portfolio-info">
                <h3 class="portfolio-title">${video.title}</h3>
                <p class="portfolio-artist">${video.artist}</p>
                <span class="portfolio-category">${video.category === 'production' ? 'Music Production' : 'Mixing'}</span>
            </div>
        </div>
    `;
}

// ========================================
// VIDEO PLAYER - FIXED VERSION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (portfolioGrid) {
        // Clear loading message and add videos
        portfolioGrid.innerHTML = '';
        youtubeVideos.forEach(video => {
            portfolioGrid.innerHTML += createVideoElement(video);
        });
        
        // Use event delegation for clicks
        portfolioGrid.addEventListener('click', function(e) {
            const videoWrapper = e.target.closest('.video-wrapper');
            
            if (videoWrapper && !videoWrapper.querySelector('iframe')) {
                const videoId = videoWrapper.getAttribute('data-video-id');
                
                // Don't play placeholder videos
                if (videoId && !videoId.startsWith('YOUR_VIDEO_ID')) {
                    // Create iframe
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    
                    // IMPORTANT: Set inline styles to ensure proper sizing
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0';
                    iframe.style.left = '0';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    
                    // Clear wrapper content and add iframe
                    videoWrapper.innerHTML = '';
                    videoWrapper.appendChild(iframe);
                    
                    // Also ensure the wrapper maintains its styling
                    videoWrapper.style.position = 'relative';
                    videoWrapper.style.width = '100%';
                    videoWrapper.style.paddingBottom = '56.25%';
                    videoWrapper.style.height = '0';
                    videoWrapper.style.overflow = 'hidden';
                }
            }
        });
    }
});

// ========================================
// Testimonials Slider
// ========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    testimonialDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    currentTestimonialIndex = index;
}

if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonialIndex);
    });

    testimonialNext.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(currentTestimonialIndex);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

setInterval(() => {
    if (testimonialCards.length > 0) {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(currentTestimonialIndex);
    }
}, 5000);

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('.btn-submit');
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            formMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            console.log('Contact form submitted:', data);
        }, 2000);
    });
}

// ========================================
// Booking Form
// ========================================
const bookingForm = document.getElementById('bookingForm');
const bookingFormMessage = document.getElementById('bookingFormMessage');
const bookingPackageSelect = document.getElementById('bookingPackage');
const bookingDurationSelect = document.getElementById('bookingDuration');

const packageButtons = document.querySelectorAll('.package-select');
packageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const packageType = button.getAttribute('data-package');
        if (bookingPackageSelect) {
            bookingPackageSelect.value = packageType;
        }
        const bookingFormWrapper = document.querySelector('.booking-form-wrapper');
        if (bookingFormWrapper) {
            const offsetTop = bookingFormWrapper.offsetTop - 100;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        updateBookingSummary();
    });
});

function updateBookingSummary() {
    const packageValue = bookingPackageSelect?.value;
    const durationValue = bookingDurationSelect?.value;
    const summaryPackage = document.getElementById('summaryPackage');
    const summaryDuration = document.getElementById('summaryDuration');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (packageValue && durationValue && summaryPackage && summaryDuration && summaryTotal) {
        const packageName = packageValue.charAt(0).toUpperCase() + packageValue.slice(1);
        const price = packagePrices[packageValue];
        const total = price * parseInt(durationValue);
        summaryPackage.textContent = `${packageName} Package - $${price}/hour`;
        summaryDuration.textContent = `${durationValue} hours`;
        summaryTotal.textContent = `$${total}`;
    } else if (summaryPackage && summaryDuration && summaryTotal) {
        summaryPackage.textContent = '-';
        summaryDuration.textContent = '-';
        summaryTotal.textContent = '$0';
    }
}

if (bookingPackageSelect) {
    bookingPackageSelect.addEventListener('change', updateBookingSummary);
}
if (bookingDurationSelect) {
    bookingDurationSelect.addEventListener('change', updateBookingSummary);
}

const bookingDateInput = document.getElementById('bookingDate');
if (bookingDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', minDate);
}

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = bookingForm.querySelector('.btn-submit');
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        if (bookingFormMessage) {
            bookingFormMessage.style.display = 'none';
        }
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            const packageName = data.bookingPackage.charAt(0).toUpperCase() + data.bookingPackage.slice(1);
            const total = packagePrices[data.bookingPackage] * parseInt(data.bookingDuration);
            if (bookingFormMessage) {
                bookingFormMessage.innerHTML = `
                    <strong>Booking Confirmed!</strong><br>
                    Thank you for booking the ${packageName} Package.<br>
                    We've sent a confirmation email to ${data.bookingEmail}.<br>
                    Total: $${total} | Date: ${data.bookingDate} | Time: ${data.bookingTime}<br>
                    We'll contact you shortly to confirm your session details.
                `;
                bookingFormMessage.className = 'form-message success';
            }
            bookingForm.reset();
            updateBookingSummary();
            setTimeout(() => {
                if (bookingFormMessage) {
                    bookingFormMessage.style.display = 'none';
                }
            }, 8000);
            console.log('Booking form submitted:', data);
        }, 2000);
    });
}

// ========================================
// Back to Top Button
// ========================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-feature, .contact-item, .package-card');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }
    updateActiveNavLink();
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    console.log('🎵 Wide Spectrum Productions loaded!');
});

// ========================================
// Utility Functions
// ========================================
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

const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#f87171';
        } else {
            input.style.borderColor = '';
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
});

document.querySelectorAll('form input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});
