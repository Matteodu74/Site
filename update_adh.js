const fs = require('fs');
const file = 'c:/Site/adhesions.html';
let content = fs.readFileSync(file, 'utf8');

const target = `engagement à long terme.</p>`;
const replacement = `engagement à long terme.</p>
                    <p style="font-size: 0.95em; margin-top: 15px; color: var(--golden-yellow);">
                        <em>* Attention : l'ajout d'une licence découverte à 3 € est obligatoire pour pouvoir jouer (celle-ci inclut une assurance).</em>
                    </p>`;

content = content.replace(target, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Update completed');
