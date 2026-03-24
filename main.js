document.addEventListener('DOMContentLoaded', () => {
    // ── Mobile Menu Toggle ──
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Header scroll styling ──
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        });
        if (window.scrollY > 60) header.classList.add('scrolled');
    }

    // ── Scroll-reveal animation ──
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => observer.observe(el));
    }

    // ── Simple Cookie Banner ──
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        const banner = document.createElement('div');
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(11, 21, 41, 0.95); color: white; padding: 15px 25px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; z-index: 9999; box-shadow: 0 10px 30px rgba(0,0,0,0.3); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem;">
                <p style="margin: 0; padding-right: 20px;">🍪 Ce site utilise des cookies techniques pour améliorer votre expérience. <a href="mentions-legales.html" style="color: #FFD500; text-decoration: underline;">En savoir plus</a></p>
                <button id="acceptCookies" style="background: #00BFFF; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; transition: 0.3s;">Accepter</button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        });
    }
});
