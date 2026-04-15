const fs = require('fs');
let html = fs.readFileSync('c:\\Site\\tournois.html', 'utf8');

// Bloc Fin de saison : "Tournoi P50" -> "Tournoi"
html = html.replace(/<div class="t-desc">Tournoi P50<\/div>/g, '<div class="t-desc">Tournoi</div>');

// Bloc Fin de saison : "Tournoi P25" -> "Tournoi" (dans le bloc fin de saison uniquement)
// Actually, let's keep the same format — remove P25/P50 from fin de saison descriptions only
// The fin de saison block has simple names like "Tournoi P50" and "Tournoi P25"

// Bloc Saison 2026:
// 15/09: "Tournoi de Septembre P50" -> "Tournoi de Septembre"
html = html.replace('Tournoi de Septembre P50', 'Tournoi de Septembre');

// 03/11: "Tournoi Indoor P50" -> "Tournoi Indoor"
html = html.replace('Tournoi Indoor P50', 'Tournoi Indoor');

// 01/12: "P50 de Décembre" -> "Tournoi de Décembre"
html = html.replace('P50 de Décembre', 'Tournoi de Décembre');

// Bloc Saison 2027:
// 02/02: "P50 de Février" -> "Tournoi de Février"
html = html.replace('P50 de Février', 'Tournoi de Février');

fs.writeFileSync('c:\\Site\\tournois.html', html, 'utf8');
console.log('✅ Descriptions mises à jour !');

// Vérification
const result = fs.readFileSync('c:\\Site\\tournois.html', 'utf8');
const remaining = result.match(/t-desc.*?P50/g);
console.log('Occurrences "P50" restantes dans les descriptions:', remaining ? remaining : 'Aucune ✅');
