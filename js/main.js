(function() {
    'use strict';

    // -- Theme Toggle --
    var themeToggle = document.getElementById('theme-toggle');
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // -- Mobile Menu --
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // -- Sticky Navbar --
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // -- Smooth Scroll --
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // -- Menu Category Tabs --
    var tabs = document.querySelectorAll('.menu-tab');
    var categories = document.querySelectorAll('.menu-category');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var category = this.getAttribute('data-category');

            // Update active tab
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');

            // Show selected category
            categories.forEach(function(cat) { cat.classList.remove('active'); });
            var target = document.getElementById('cat-' + category);
            if (target) {
                target.classList.add('active');
                // Re-trigger animations for newly visible items
                target.querySelectorAll('[data-animate]').forEach(function(el) {
                    el.classList.remove('visible');
                    void el.offsetWidth; // Force reflow
                    el.classList.add('visible');
                });
            }
        });
    });

    // -- Scroll Animations --
    var animElements = document.querySelectorAll('[data-animate]');
    if (animElements.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        animElements.forEach(function(el) { observer.observe(el); });
    }

    // -- Contact Form --
    var form = document.querySelector('[data-wz-contact]');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var origText = btn.textContent;
            btn.textContent = 'Odesilani...';
            btn.disabled = true;
            // Simulated — actual submission handled by portal script injection
            setTimeout(function() {
                btn.textContent = 'Odeslano!';
                btn.style.background = '#16a34a';
                btn.style.borderColor = '#16a34a';
                form.reset();
                setTimeout(function() {
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 2500);
            }, 1000);
        });
    }

    // -- Cookie Banner --
    var banner = document.getElementById('cookie-banner');
    if (banner && !localStorage.getItem('cookies-consent')) {
        banner.hidden = false;
    }
    var acceptBtn = document.getElementById('cookie-accept');
    var rejectBtn = document.getElementById('cookie-reject');
    if (acceptBtn) acceptBtn.addEventListener('click', function() { localStorage.setItem('cookies-consent', 'accepted'); banner.hidden = true; });
    if (rejectBtn) rejectBtn.addEventListener('click', function() { localStorage.setItem('cookies-consent', 'rejected'); banner.hidden = true; });


    // ── Scroll to Top ──
    var scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
