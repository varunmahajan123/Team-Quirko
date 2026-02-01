document.addEventListener('DOMContentLoaded', () => {
    // 1. Parallax Effect (Desktop Only)
    const overlay = document.querySelector('.center-overlay');
    if (overlay) {
        let ticking = false;

        function updatePosition() {
            // Disable parallax on mobile (use CSS position instead)
            if (window.innerWidth <= 768) {
                overlay.style.transform = ''; // Clear inline styles to let CSS !important take over or just reset
                ticking = false;
                return;
            }

            const scrollY = window.scrollY;
            const offset = scrollY * 0.15;
            overlay.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updatePosition);
                ticking = true;
            }
        }, { passive: true });

        // Handle resize to clear styles if switching to mobile
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                overlay.style.transform = '';
            }
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInUp = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const animateObserver = new IntersectionObserver(fadeInUp, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.device-mockup, .pill-label, .flow-card, .value-card, .funnel-step');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up-init');
        // Add slight delay based on index or type if needed, but CSS transition-delay is cleaner
        animateObserver.observe(el);
    });

    // Special handling for panels to fade in content
    const panels = document.querySelectorAll('.panel-content');
    panels.forEach(panel => {
        panel.classList.add('fade-in-init');
        animateObserver.observe(panel);
    });
});
