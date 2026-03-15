const fs = require('fs');
const file = 'c:/Site/cours.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- Coach 1 — Jean-Christophe -->[\s\S]*?(?=<!-- Coach 2 — Sébastien -->)/;

const replacement = `<!-- Coach 1 — Jean-Christophe -->
                <div class="coach-card">
                    <div class="coach-photo">
                    </div>
                    <h3>Jean-Christophe</h3>
                    <span class="coach-role">Enseignant Diplômé d'État</span>
                    <p style="margin-top: 5px;">
                        +15 ans exp. raquette<br>
                        <strong>DEJEPS Tennis & DFMP</strong>
                    </p>
                    <div style="margin-top: 10px; font-size: 0.8rem;">
                        <strong>Juge-Arbitre (JAE1, JAT2, JAP2)</strong><br>
                        <span style="color: var(--golden-yellow); font-size: 0.75rem; font-style: italic; display: inline-block; margin-top: 5px; line-height: 1.4;">"Pour découvrir, progresser ou se perfectionner !"</span>
                    </div>
                </div>

                `;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed cours.html');
