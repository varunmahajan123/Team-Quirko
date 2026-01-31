// Parallax effect for Center Overlay
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.center-overlay');

    if (!overlay) return;

    let ticking = false;

    function updatePosition() {
        const scrollY = window.scrollY;
        // Factor of 0.15 provides subtle movement (approx 15px per 100px scroll)
        // Range will automatically stay within reasonable bounds due to page length
        const offset = scrollY * 0.15;

        // Maintain the centering translate(-50%, -50%) and add the offset
        overlay.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updatePosition);
            ticking = true;
        }
    }, { passive: true });
});
