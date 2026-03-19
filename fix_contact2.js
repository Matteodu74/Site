const fs = require('fs');

const file = 'c:/Site/contact.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Permanence hours
content = content.replace(
    /<h3>Horaires<\/h3>\s*<p>Tous les jours :<br>08h00 – 22h00<\/p>/,
    `<h3>Horaires d'ouverture</h3>
                    <p>Tous les jours :<br>08h00 – 22h00</p>
                    <h4 style="font-size: 1rem; margin-top: 1rem; color: var(--golden-yellow);">Horaires de permanence</h4>
                    <p>Semaine : 16h00 – 22h00<br>Week-end : 11h00 – 22h00</p>`
);

// 2. Transports
const targetStr = `<div>
                            <h4>Transports</h4>
                            <p>Accessible via les axes principaux de la Côtière (proximité A46 et N84).</p>
                        </div>`;

const correctStr = `<div>
                            <h4>En Transports</h4>
                            <p>Accessible en bus via le réseau Colibri (arrêt à proximité) ainsi que la ligne 171 TCL. La gare TER de Neyron se trouve à moins de 10 minutes à pied !</p>
                        </div>`;

content = content.replace(targetStr, correctStr);

fs.writeFileSync(file, content);
console.log("contact.html fixed successfully!");
