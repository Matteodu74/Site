const fs = require('fs');
let html = fs.readFileSync('c:\\Site\\tournois.html', 'utf8');

// === BLOC FIN DE SAISON ===
// Replace the subtitle text
html = html.replace(
  'Ne manquez pas nos prochains tournois P25 !',
  'Ne manquez pas nos prochains tournois !'
);

// Replace the entire tournaments-list inside the fin de saison block
// Find the section between "tournaments-list" after "Fin de saison" and its closing </div>
const finSaisonStart = html.indexOf('Fin de saison (Mai - Juillet)');
const tournamentsListStart = html.indexOf('<div class="tournaments-list">', finSaisonStart);
const tournamentsListContentStart = html.indexOf('\n', tournamentsListStart);
// Find the closing </div> for tournaments-list
const closingDiv = html.indexOf('</div>\r\n                </div>', tournamentsListStart);

const oldTournamentContent = html.substring(tournamentsListContentStart, closingDiv);

const newTournamentContent = `
                        
                        <!-- MAI -->
                        <div class="tournament-row" style="background: var(--white); border-radius: 8px; margin-bottom: 8px;">
                            <div class="t-date" style="color: var(--cyan-electric); font-weight: bold; width: 80px;">23 Mai</div>
                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>
                            <div class="t-desc">Tournoi P50</div>
                        </div>

                        <!-- JUIN -->
                        <div class="tournament-row" style="border-radius: 8px; margin-bottom: 8px;">
                            <div class="t-date" style="color: var(--golden-yellow); font-weight: bold; width: 80px;">23 Juin</div>
                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>
                            <div class="t-desc">Tournoi P25</div>
                        </div>

                        <!-- JUILLET -->
                        <div class="tournament-row" style="background: var(--white); border-radius: 8px; margin-bottom: 8px;">
                            <div class="t-date" style="color: var(--cyan-electric); font-weight: bold; width: 80px;">11 Juillet</div>
                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>
                            <div class="t-desc">Tournoi P25</div>
                        </div>
                        <div class="tournament-row" style="border-radius: 8px; margin-bottom: 8px;">
                            <div class="t-date" style="color: var(--golden-yellow); font-weight: bold; width: 80px;">25 Juillet</div>
                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>
                            <div class="t-desc">Tournoi P50</div>
                        </div>
                        
                    `;

html = html.replace(oldTournamentContent, newTournamentContent);

// === BLOC SAISON 2026 ===
// 15/09: P25 -> P50
html = html.replace(
  '<div class="t-date">15/09</div>\r\n                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>\r\n                            <div class="t-desc">Tournoi de Septembre P25</div>',
  '<div class="t-date">15/09</div>\r\n                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>\r\n                            <div class="t-desc">Tournoi de Septembre P50</div>'
);

// 03/11: P25 -> P50
html = html.replace(
  '<div class="t-date">03/11</div>\r\n                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>\r\n                            <div class="t-desc">Tournoi Indoor P25</div>',
  '<div class="t-date">03/11</div>\r\n                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>\r\n                            <div class="t-desc">Tournoi Indoor P50</div>'
);

// 01/12: P25 -> P50
html = html.replace(
  '<div class="t-date">01/12</div>\r\n                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>\r\n                            <div class="t-desc">P25 de Décembre</div>',
  '<div class="t-date">01/12</div>\r\n                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>\r\n                            <div class="t-desc">P50 de Décembre</div>'
);

// === BLOC SAISON 2027 ===
// 02/02: P25 -> P50
html = html.replace(
  '<div class="t-date">02/02</div>\r\n                            <div class="t-cat"><span class="badge p25-badge">P25</span></div>\r\n                            <div class="t-desc">P25 de Février</div>',
  '<div class="t-date">02/02</div>\r\n                            <div class="t-cat"><span class="badge p50-badge">P50</span></div>\r\n                            <div class="t-desc">P50 de Février</div>'
);

fs.writeFileSync('c:\\Site\\tournois.html', html, 'utf8');
console.log('✅ Tournois mis à jour avec succès !');

// Verification
const result = fs.readFileSync('c:\\Site\\tournois.html', 'utf8');
console.log('\nVérifications:');
console.log('- "Ne manquez pas nos prochains tournois !":', result.includes('Ne manquez pas nos prochains tournois !') ? '✅' : '❌');
console.log('- 23 Mai P50:', result.includes('23 Mai') && result.includes('p50-badge') ? '✅' : '❌');
console.log('- 23 Juin P25:', result.includes('23 Juin') ? '✅' : '❌');
console.log('- 11 Juillet P25:', result.includes('11 Juillet') ? '✅' : '❌');
console.log('- 25 Juillet P50:', result.includes('25 Juillet') ? '✅' : '❌');
console.log('- 12 Mai supprimé:', !result.includes('12 Mai') ? '✅' : '❌');
console.log('- 09 Juin supprimé:', !result.includes('09 Juin') ? '✅' : '❌');
console.log('- 15/09 P50:', result.includes('Tournoi de Septembre P50') ? '✅' : '❌');
console.log('- 03/11 P50:', result.includes('Tournoi Indoor P50') ? '✅' : '❌');
console.log('- 01/12 P50:', result.includes('P50 de Décembre') ? '✅' : '❌');
console.log('- 02/02 P50:', result.includes('P50 de Février') ? '✅' : '❌');
console.log('- Heures supprimées:', !result.includes('13h00 - 17h00') && !result.includes('14h00 - 18h00') ? '✅' : '❌');
