const fs = require('fs');
const path = require('path');

const dir = 'c:/Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Remove footer contact item with phone number
    const footerPhoneRegex = /[\s]*<li class="footer-contact-item">\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<a href="tel:\+33688383652">06 88 38 36 52<\/a>\s*<\/li>/;
    if (footerPhoneRegex.test(content)) {
        content = content.replace(footerPhoneRegex, '');
        changed = true;
    }

    if (file === 'contact.html') {
        const joinPhoneRegex = /<a href="tel:\+33688383652">06 88 38 36 52<\/a><br>/;
        if (joinPhoneRegex.test(content)) {
             content = content.replace(joinPhoneRegex, '');
             changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated phone info in ${file}`);
    }
});
