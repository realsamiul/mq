// ===================================
// M0NARQ - Interactive Animations
// ExoApe-Style Smooth Transitions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Smooth Scroll Animations
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const animateElements = document.querySelectorAll('.intro-item, .engine-card, .demo-card, .metric-item, .capability-card, .stage-card, .use-case-card, .credential-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(el);
    });

    // ===================================
    // Parallax Effects on Hero Images
    // ===================================
    
    const heroImages = document.querySelectorAll('.hero-image, .demo-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroImages.forEach(img => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ===================================
    // Navigation Active State
    // ===================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === '/')) {
            link.classList.add('is-active');
        }
    });

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===================================
    // Cursor Follow Effect for CTA Buttons
    // ===================================
    
    const ctaLinks = document.querySelectorAll('.link');
    
    ctaLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const circle = this.querySelector('.circle');
            if (circle) {
                circle.style.width = '300px';
                circle.style.height = '300px';
                circle.style.opacity = '0.15';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const circle = this.querySelector('.circle');
            if (circle) {
                circle.style.width = '0';
                circle.style.height = '0';
                circle.style.opacity = '0.1';
            }
        });
    });

    // ===================================
    // Stats Counter Animation
    // ===================================
    
    const stats = document.querySelectorAll('.metric-value, .stat-value, .credential-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        
        // Skip if not a number
        if (isNaN(parseFloat(target))) return;
        
        const duration = 2000;
        const increment = parseFloat(target) / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < parseFloat(target)) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===================================
    // Image Overlay Effects
    // ===================================
    
    const demoImages = document.querySelectorAll('.demo-image');
    
    demoImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        img.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });

    // ===================================
    // Card Hover 3D Tilt Effect
    // ===================================
    
    const cards = document.querySelectorAll('.engine-card, .capability-card, .use-case-card, .credential-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ===================================
    // Progress Bar on Scroll
    // ===================================
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ===================================
    // Typing Effect for Taglines
    // ===================================
    
    const typeEffect = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    const taglines = document.querySelectorAll('.hero-description');
    
    const taglineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const text = entry.target.textContent;
                typeEffect(entry.target, text, 30);
                entry.target.classList.add('typed');
            }
        });
    }, { threshold: 0.5 });

    taglines.forEach(tagline => {
        taglineObserver.observe(tagline);
    });

    // ===================================
    // Navigation Star Rotation Speed Control
    // ===================================
    
    const navStar = document.querySelector('.icon-star');
    
    if (navStar) {
        window.addEventListener('scroll', function() {
            const scrollSpeed = window.pageYOffset;
            navStar.style.animationDuration = Math.max(5, 20 - scrollSpeed / 100) + 's';
        });
    }

    // ===================================
    // Performance Optimization: Lazy Load Images
    // ===================================
    
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===================================
    // Console Easter Egg
    // ===================================
    
    console.log('%c🚀 M0NARQ Decision OS', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cFrom data to decisions. Defensibly.', 'font-size: 14px; color: #764ba2;');
    console.log('%c\nInterested in the tech stack? Check out our GitHub:', 'font-size: 12px;');
    console.log('%chttps://github.com/realsamiul', 'font-size: 12px; color: #667eea;');

});

// ===================================
// Viewport Height Fix for Mobile
// ===================================

function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ===================================
// Loading Animation
// ===================================

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});