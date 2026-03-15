const fs = require('fs');
const file = 'c:/Site/tarifs.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("Idéal pour jouer régulièrement sans abonnement annuel. (Sessions de 1h30)", "Idéal pour jouer régulièrement sans abonnement annuel. Carte nominative (utilisable 1 session par 1 session). Sessions de 1h30.");

content = content.replace("Pour les groupes d'amis ou entreprises. (Sessions de 1h30)", "Pour les groupes d'amis ou entreprises. Carte non nominative (possibilité d'utiliser plusieurs invitations à la fois). Sessions de 1h30.");

fs.writeFileSync(file, content, 'utf8');
console.log("Updated descriptions");
