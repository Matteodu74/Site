const fs = require('fs');

function fixMojibake(file) {
    const content = fs.readFileSync(file, 'utf-8');

    // Convert each character code point back to a byte (if it's < 256)
    const buf = Buffer.alloc(content.length);
    for (let i = 0; i < content.length; i++) {
        buf[i] = content.charCodeAt(i) & 0xFF; // discard any higher bits if somehow there
    }

    // Now buf contains the original UTF-8 bytes
    const originalHtml = buf.toString('utf-8');

    fs.writeFileSync(file, originalHtml, 'utf-8');
}

const files = fs.readdirSync('c:/Site/').filter(f => f.endsWith('.html') || f.endsWith('.css'));
files.forEach(f => {
    console.log('Fixing', f);
    fixMojibake('c:/Site/' + f);
});
