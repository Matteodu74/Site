const fs = require('fs');
let file = 'c:/Site/contact.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Permanence hours
content = content.replace(
    /Tous les jours :<br>08h00 – 22h00<\/p>/g,
    `Tous les jours :<br>08h00 – 22h00</p>\n                    <h4 style="font-size: 1rem; margin-top: 1rem; color: var(--golden-yellow);">Horaires de permanence</h4>\n                    <p>Semaine : 16h00 – 22h00<br>Week-end : 11h00 – 22h00</p>`
);

content = content.replace(
    /<h3>Horaires<\/h3>/g,
    `<h3>Horaires d'ouverture</h3>`
);

// 2. Transports
content = content.replace(
    /Accessible via les axes principaux de la Côtière \(proximité A46 et N84\)\./g,
    `Accessible en bus via le réseau Colibri (arrêt à proximité) ainsi que la ligne 171 TCL. La gare TER de Neyron se trouve à moins de 10 minutes à pied !`
);

fs.writeFileSync(file, content);
console.log("Safely applied to contact.html!");
