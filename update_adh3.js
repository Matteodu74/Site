const fs = require('fs');
const file = 'c:/Site/adhesions.html';
let content = fs.readFileSync(file, 'utf8');

// For Padel Pleine
const c1 = "<li>Accès illimité aux espaces de vie</li>";
const r1 = c1 + "\n                            <li style=\"color: var(--golden-yellow); font-size: 0.9em; margin-top: 10px;\"><em>* L'ajout d'une licence supplémentaire est obligatoire pour pouvoir jouer.</em></li>";
content = content.replace(c1, r1);

// For Complémentaire Tennis
const c2 = "<li>Réservée aux adhérents Tennis actuels</li>";
const r2 = "<li>Condition : être licencié tennis (Miribel, Neyron ou Tramoyes)</li>";
content = content.replace(c2, r2);

const c3 = "<li>Le meilleur des deux sports</li>";
const r3 = c3 + "\n                            <li style=\"color: var(--golden-yellow); font-size: 0.9em; margin-top: 10px;\"><em>* L'ajout d'une licence supplémentaire est obligatoire pour pouvoir jouer.</em></li>";
content = content.replace(c3, r3);

fs.writeFileSync(file, content, 'utf8');
console.log("updated");
