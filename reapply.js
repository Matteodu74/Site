const fs = require('fs');
const files = fs.readdirSync('c:/Site/').filter(f => f.endsWith('.html'));

const append_str = `
            <!-- TikTok -->
            <a href="#" class="social-icon" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
              </svg>
            </a>
            <!-- LinkedIn -->
            <a href="#" class="social-icon" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
              </svg>
            </a>`;

const formsubmit_str = `<form class="footer-form" id="contactForm" action="https://formsubmit.co/padelcotiere@gmail.com" method="POST">
            <!-- FormSubmit config -->
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_subject" value="Nouveau message - Padel Côtière">`;

const formsubmit_str2 = `<form class="footer-form" id="contactForm" action="https://formsubmit.co/padelcotiere@gmail.com" method="POST">
                        <!-- FormSubmit config -->
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_subject" value="Nouveau message - Padel Côtière">`;


files.forEach(f => {
    let c = fs.readFileSync('c:/Site/' + f, 'utf-8');

    // Replace the mailto form action
    const mailtoRegex1 = /<form class="footer-form" id="contactForm" action="mailto:padelcotiere@gmail\.com" method="POST"\s*enctype="text\/plain">/;
    const mailtoRegex2 = /<form class="footer-form" id="contactForm" action="mailto:padelcotiere@gmail\.com" method="POST">/;

    if (c.match(mailtoRegex1)) {
        c = c.replace(mailtoRegex1, (m) => m.includes('                        ') ? formsubmit_str2 : formsubmit_str);
    } else if (c.match(mailtoRegex2)) {
        c = c.replace(mailtoRegex2, (m) => m.includes('                        ') ? formsubmit_str2 : formsubmit_str);
    }

    // Inject TikTok & LinkedIn
    if (!c.includes('TikTok')) {
        const p = /<!-- Instagram -->[\s\S]*?<\/a>/;
        const m = c.match(p);
        if (m) {
            c = c.replace(m[0], m[0] + append_str);
        } else {
            const fallbackP = /<div class="footer-socials">[\s\S]*?<\/div>/;
            const m2 = c.match(fallbackP);
            if (m2 && m2[0].includes('Instagram')) {
                let inner = m2[0];
                inner = inner.replace('</div>', append_str + '\n          </div>');
                c = c.replace(m2[0], inner);
            }
        }
    }

    fs.writeFileSync('c:/Site/' + f, c, 'utf-8');
});
console.log('Update complete!');
