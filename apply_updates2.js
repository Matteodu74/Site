const fs = require('fs');

const file = 'c:/Site/tarifs.html';
let content = fs.readFileSync(file, 'utf8');

// Add adhesions.css to head
content = content.replace(
    /<link rel="stylesheet" href="tarifs\.css">/g,
    `<link rel="stylesheet" href="tarifs.css">
    <link rel="stylesheet" href="adhesions.css">`
);

// Replace the DEVENEZ ADHERENT block to insert the exact Offre de lancement before it
const tarifsLaunchBlock = `
    <!-- ═══════════════════════════════════════════════
       OFFRE DE LANCEMENT
       ═══════════════════════════════════════════════ -->
    <section class="adhesion-launch">
        <div class="container">
            <div class="launch-content reveal">
                <div class="launch-header">
                    <span class="launch-badge">Offre de Lancement — Mi-Avril à Fin Août</span>
                    <h2>Venez essayer avant de vous lancer !</h2>
                    <p>Le club ouvre ses portes mi-avril. Profitez de cette période estivale pour découvrir nos
                        installations et tester tous les avantages de l'adhésion à un tarif exceptionnel et sans
                        engagement à long terme.</p>
                    <p style="font-size: 0.95em; margin-top: 15px; color: var(--golden-yellow);">
                        <em>* Attention : l'ajout d'une licence découverte à 4 € est obligatoire pour pouvoir jouer (celle-ci inclut une assurance).</em>
                    </p>
                </div>
                <div class="launch-cards">
                    <!-- Offre Non Adh -->
                    <div class="launch-card">
                        <h3>Non-Adhérents Tennis</h3>
                        <div class="price">85 € <span>/ jusqu'à fin août</span></div>
                        <p>Idéal pour découvrir le Padel. Vous profitez de tous nos avantages membres tout au long de
                            l'été !</p>
                        <a href="contact.html" class="btn btn-outline" style="width: 100%; margin-top:20px;">Je profite
                            de l'offre</a>
                    </div>
                    <!-- Offre Adh -->
                    <div class="launch-card premium-launch">
                        <h3>Adhérents Tennis</h3>
                        <div class="price">50 € <span>/ jusqu'à fin août</span></div>
                        <p>Prix très spécial réservé à nos joueurs de tennis. L'occasion rêvée de tester le padel sans
                            se ruiner.</p>
                        <a href="contact.html" class="btn btn-primary" style="width: 100%; margin-top:20px;">Je profite
                            de l'offre</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════
       DEVENEZ ADHÉRENT
       ═══════════════════════════════════════════════ -->
    <section class="adherent-section" id="adherent">`;

content = content.replace(
    /<!-- ═══════════════════════════════════════════════\s*DEVENEZ ADHÉRENT\s*═══════════════════════════════════════════════ -->\s*<section class="adherent-section" id="adherent">/g,
    tarifsLaunchBlock
);

fs.writeFileSync(file, content);
console.log("tarifs.html fixed!");
