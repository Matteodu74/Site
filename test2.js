const fs = require('fs');

const file = 'c:/Site/index.html';
const content = fs.readFileSync(file, 'utf-8');

const corrected = Buffer.from(content, 'latin1').toString('utf8');

fs.writeFileSync('c:/Site/index_corrected.html', corrected, 'utf-8');
