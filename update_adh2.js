const fs = require('fs');
const file = 'c:/Site/adhesions.html';
let content = fs.readFileSync(file, 'utf8');

// Update Padel Pleine
const pleineTarget = `<li>Accès illimité aux espaces de vie</li>
                        </ul>`;
const pleineReplace = `<li>Accès illimité aux espaces de vie</li>
                            <li style="font-size: 0.9em; margin-top: 5px; color: var(--primary);"><em>* Licence obligatoire en supplément pour pouvoir jouer</em></li>
                        </ul>`;
content = content.replace(pleineTarget, pleineReplace);

// Update Complémentaire Tennis
const tennisTarget = `<li>Réservée aux adhérents Tennis actuels</li>
                            <li>Mêmes avantages que l'adhésion pleine</li>
                            <li><strong>Accès complet aux 4 terrains de padel</strong></li>
                            <li>Priorité de réservation conservée</li>
                            <li>Le meilleur des deux sports</li>
                        </ul>`;
const tennisReplace = `<li>Condition : être licencié tennis (Miribel, Neyron ou Tramoyes)</li>
                            <li>Mêmes avantages que l'adhésion pleine</li>
                            <li><strong>Accès complet aux 4 terrains de padel</strong></li>
                            <li>Priorité de réservation conservée</li>
                            <li>Le meilleur des deux sports</li>
                            <li style="font-size: 0.9em; margin-top: 5px; color: var(--primary);"><em>* Licence padel obligatoire en supplément pour pouvoir jouer</em></li>
                        </ul>`;
content = content.replace(tennisTarget, tennisReplace);

fs.writeFileSync(file, content, 'utf8');
console.log('Update done');
