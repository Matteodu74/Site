const fs = require('fs');
const path = require('path');
const directoryPath = 'c:\\Site';
const link = 'https://www.linkedin.com/company/padel-c%C3%B4ti%C3%A8re/';

fs.readdirSync(directoryPath).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find LinkedIn link blocks and replace them with the correct link and attributes
        const regex = /<a href="[^"]*"[^>]*aria-label="LinkedIn"[^>]*>/g;
        const newLink = `<a href="${link}" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">`;
        
        content = content.replace(regex, newLink);
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
