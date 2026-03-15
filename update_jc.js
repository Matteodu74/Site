const fs = require('fs');
const file = 'c:/Site/cours.html';
let content = fs.readFileSync(file, 'utf8');

const target = `                <!-- Coach 1 — Jean-Christophe -->
                <div class="coach-card">
                    <div class="coach-photo">
                    </div>
                    <h3>Jean-Christophe</h3>
                    <span class="coach-role">Enseignant Diplômé d'État</span>
                    <p>
                        Expert Padel & Tennis<br>
                        Ligue Auvergne-Rhône-Alpes (ARA)
                    </p>
                </div>`;

const replacement = `                <!-- Coach 1 — Jean-Christophe -->
                <div class="coach-card" style="text-align: left; padding: 2rem;">
                    <div class="coach-photo" style="margin: 0 auto 1.5rem auto;">
                    </div>
                    <h3 style="text-align: center;">Jean-Christophe</h3>
                    <span class="coach-role" style="text-align: center; display: block;">Enseignant Diplômé d'État</span>
                    <p style="font-style: italic; margin: 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
                        « Passionné de sports de raquette depuis toujours, j’enseigne le tennis depuis plus de 15 ans et me suis naturellement tourné vers le padel, un sport convivial, ludique et stratégique. Que ce soit pour découvrir le padel, progresser ou se perfectionner, je serai ravi de vous accompagner sur nos pistes ! »
                    </p>
                    <div style="font-size: 0.9rem;">
                        <strong style="color: var(--golden-yellow);">Diplômes :</strong>
                        <ul style="margin: 0.5rem 0 1rem 1.2rem; padding: 0;">
                            <li>DEJEPS Tennis</li>
                            <li>DFMP (Diplôme Fédéral Moniteur Padel)</li>
                        </ul>
                        <strong style="color: var(--golden-yellow);">Qualifications :</strong>
                        <ul style="margin: 0.5rem 0 0 1.2rem; padding: 0;">
                            <li>JAE1 – Juge-Arbitre Équipes</li>
                            <li>JAT2 – Juge-Arbitre Tournois</li>
                            <li>JAP2 – Juge-Arbitre Padel</li>
                        </ul>
                    </div>
                </div>`;

// Use simple string replace if EXACT match fails try with regex
if (content.includes(target)) {
    content = content.replace(target, replacement);
} else {
    // try replacing with regex
    const regex = /<!-- Coach 1 — Jean-Christophe -->[\s\S]*?<\/div>/;
    content = content.replace(regex, replacement);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update done');
