const fs = require('fs');
const file = 'c:/Site/infrastructures.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- ═══════════════════════════════════════════════\s*IMAGE PLEINE LARGEUR\s*═══════════════════════════════════════════════ -->\s*<section class="infra-fullwidth-image">[\s\S]*?<\/section>/;

content = content.replace(regex, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
