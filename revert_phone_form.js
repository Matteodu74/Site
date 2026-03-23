const fs = require('fs');
const path = require('path');

const dir = 'c:/Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Contact form
    const messageLabelRegex = /([\t ]*)<div class="form-group">\s*<label for="form-message">Message<\/label>/;
    if (messageLabelRegex.test(content) && !content.includes('form-phone')) {
        const match = content.match(messageLabelRegex);
        const indent = match[1];
        
        let newField = `${indent}<div class="form-group">
${indent}    <label for="form-phone">Numéro de téléphone</label>
${indent}    <input type="tel" id="form-phone" name="phone" placeholder="06 00 00 00 00" required>
${indent}</div>\n`;

        content = content.replace(messageLabelRegex, newField + match[0]);
        changed = true;
    }

    // Footer Phone Number
    const ulRegex = /(<li class="footer-contact-item">\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<span>Chem\. de Halage, 01700 Neyron, France<\/span>\s*<\/li>)/;
    if (ulRegex.test(content) && !content.includes('06 88 38 36 52') && file !== 'contact.html') {
        const match = content.match(ulRegex);
        const toAdd = `
                        <li class="footer-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <a href="tel:+33688383652">06 88 38 36 52</a>
                        </li>`;
        content = content.replace(match[0], match[0] + toAdd);
        changed = true;
    }
    
    // In contact page, should I put the footer phone back?
    // User: "je fvoulais juste enlkever celui dans la page contact". It likely implies the phone number displayed on the contact page, but maybe they want it removed from the contact footer as well... actually let's restore it everywhere except the "Nous Joindre" block of the contact page.
    if (file === 'contact.html' && ulRegex.test(content) && !content.includes('06 88 38 36 52')) {
        const match = content.match(ulRegex);
        const toAdd = `
                        <li class="footer-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <a href="tel:+33688383652">06 88 38 36 52</a>
                        </li>`;
        content = content.replace(match[0], match[0] + toAdd);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Reverted all in ${file}`);
    }
});
