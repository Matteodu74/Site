const fs = require('fs');
const path = require('path');

const dir = 'c:/Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Use a non-greedy approach carefully: 
    // We only want the li that contains the phone link.
    // Let's use string operations instead of regex to be 100% safe.
    
    const lines = content.split('\n');
    let newLines = [];
    let inPhoneLi = false;
    let skipLines = 0;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<li class="footer-contact-item">')) {
            // check ahead if it's the phone one
            let isPhone = false;
            for (let j = i; j < i + 10 && j < lines.length; j++) {
                if (lines[j].includes('06 88 38 36 52')) {
                    isPhone = true;
                    break;
                }
            }
            if (isPhone) {
                // skip until </li>
                for (let j = i; j < lines.length; j++) {
                    if (lines[j].includes('</li>')) {
                        i = j; // skip to the end of the li
                        break;
                    }
                }
                changed = true;
                continue; // don't push the </li> line
            }
        }
        newLines.push(lines[i]);
    }

    if (changed) {
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
        console.log(`Removed footer phone in ${file}`);
    }
});
