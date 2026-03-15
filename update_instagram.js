const fs = require('fs');
const path = require('path');

const directoryPath = 'c:/Site';
const files = fs.readdirSync(directoryPath);

const target = 'href="#" class="social-icon" aria-label="Instagram"';
const replacement = 'href="https://www.instagram.com/padelcotiere/" class="social-icon" target="_blank" aria-label="Instagram"';

let updatedCount = 0;

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        if (content.includes(target)) {
            content = content.replace(target, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`Updated Instagram link in ${file}`);
        } else {
            // In case there are slight variations in how the `href="#" class="social-icon" aria-label="Instagram"` is formatted 
            const regex = /href="#"\s+class="social-icon"\s+aria-label="Instagram"/g;
            if (regex.test(content)) {
                content = content.replace(regex, replacement);
                fs.writeFileSync(filePath, content, 'utf8');
                updatedCount++;
                console.log(`Updated Instagram link in ${file} using regex`);
            }
        }
    }
});

console.log(`Total files updated: ${updatedCount}`);
