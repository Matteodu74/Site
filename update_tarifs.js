const fs = require('fs');
const file = 'c:/Site/tarifs.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove Licence FFT Padel
content = content.replace(/<li>\s*<svg[^>]+>\s*<path[^>]+>\s*<\/svg>\s*Licence FFT Padel incluse\s*<\/li>/, '');

// 2. Update Complémentaire Tennis
content = content.replace(/Offre spéciale joueurs de tennis/, "Condition : être licencié tennis dans l'un des trois clubs (Miribel, Neyron ou Tramoyes)");
content = content.replace(/<li>\s*<svg[^>]+>\s*<path[^>]+>\s*<\/svg>\s*Accès sur 3 clubs \(Miribel, Neyron, Tramoyes\)\s*<\/li>/, '');
content = content.replace(/<li>\s*<svg[^>]+>\s*<path[^>]+>\s*<\/svg>\s*Possibilité d'être intégré aux inter-clubs sportifs\s*<\/li>/, '');

// 3. Cartes Liberté prices
// 10 Sessions
content = content.replace(/<span class="cours-price-amount">70 €<\/span>\s*<span class="cours-price-unit"><\/span>[\s\S]*?<p class="cours-item-desc">Idéal pour jouer régulièrement sans abonnement annuel.<\/p>/,
    `<span class="cours-price-amount">105 €</span>\n                                <span class="cours-price-unit"></span>\n                            </div>\n                        </div>\n                        <p class="cours-item-desc">Idéal pour jouer régulièrement sans abonnement annuel. (Sessions de 1h30)</p>`);

// 12 Sessions
content = content.replace(/<span class="cours-price-amount">90 €<\/span>\s*<span class="cours-price-unit"><\/span>[\s\S]*?<p class="cours-item-desc">Pour les groupes d'amis ou entreprises.<\/p>/,
    `<span class="cours-price-amount">135 €</span>\n                                <span class="cours-price-unit"></span>\n                            </div>\n                        </div>\n                        <p class="cours-item-desc">Pour les groupes d'amis ou entreprises. (Sessions de 1h30)</p>`);

// 4. Cours & Enseignement
content = content.replace(/<span class="cours-price-amount">180 €<\/span>/, '<span class="cours-price-amount">200 €</span>');
content = content.replace(/<span class="cours-price-amount">130 €<\/span>/, '<span class="cours-price-amount">150 €</span>');

// 5. Invitations
content = content.replace(/Invitez un ami non-adhérent à jouer sur nos terrains avec un supplément par joueur et par partie./, "Invitez un ami non-adhérent à jouer sur nos terrains avec un supplément par joueur et par partie (session 1h30).");
content = content.replace(/<span class="invite-price-amount">8 €<\/span>/, '<span class="invite-price-amount">12 €</span>');
content = content.replace(/<span class="invite-price-amount">6 €<\/span>/, '<span class="invite-price-amount">9 €</span>');

fs.writeFileSync(file, content, 'utf8');
console.log("Updated tarifs.html");
