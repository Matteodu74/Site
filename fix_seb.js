const fs = require('fs');
const file = 'c:/Site/cours.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- Coach 2 — Sébastien -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/;

const replacement = `<!-- Coach 2 — Sébastien -->
                <div class="coach-card">
                    <div class="coach-photo">
                        <img src="sebastien.jpg" alt="Sébastien, Enseignant Padel" style="object-fit: cover; object-position: center 20%;">
                    </div>
                    <h3>Sébastien</h3>
                    <span class="coach-role">Enseignant Diplômé d'État</span>
                    <p style="margin-top: 5px;">
                        <strong>DEJEPS Tennis & DFMP</strong>
                    </p>
                    <div style="margin-top: 10px; font-size: 0.8rem;">
                        <strong>Juge-Arbitre (JAE1, JAT2, JAP2)</strong>
                    </div>
                </div>
            `;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed sebastien');
