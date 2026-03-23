const fs = require('fs');
const path = require('path');

const dir = 'c:/Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const ulFixRegex = /<ul class="footer-contact-list">[\s\S]*?<\/ul>/;
    
    // Depending on whether it's contact.html or others, we restore the phone number
    // But wait, the user said they ONLY wanted it removed from the contact page.
    // They said "remet le numero de telephone dans le formulaire stp je fvoulais juste enlkever celui dans la page contact".
    // This could mean they want the footer phone number back everywhere too! (Except the specific one in contact page which is the "Nous joindre" card) Let me restore the full footer in ALL pages including contact.html.
    
    // Let's use the exact original standard HTML chunk. The indentation varies mildly but we can just use 24 spaces or so.
    let standardFooterUl = `<ul class="footer-contact-list">
                        <li class="footer-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            <span>Chem. de Halage, 01700 Neyron, France</span>
                        </li>
                        <li class="footer-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <a href="tel:+33688383652">06 88 38 36 52</a>
                        </li>
                        <li class="footer-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <a href="mailto:padelcotiere@gmail.com">padelcotiere@gmail.com</a>
                        </li>
                    </ul>`;

    if (ulFixRegex.test(content)) {
        content = content.replace(ulFixRegex, standardFooterUl);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Restored footer in ${file}`);
    }
});
