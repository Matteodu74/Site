const fs = require('fs');

function replaceInFile(file, regex, replaceStr) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}

// 1. contact.html
replaceInFile(
    'c:/Site/contact.html',
    /<h3>Horaires<\/h3>\s*<p>Tous les jours :<br>08h00 – 22h00<\/p>/,
    `<h3>Horaires d'ouverture</h3>
                    <p>Tous les jours :<br>08h00 – 22h00</p>
                    <h4 style="font-size: 1rem; margin-top: 1rem; color: var(--golden-yellow);">Horaires de permanence</h4>
                    <p>Semaine : 16h00 – 22h00<br>Week-end : 11h00 – 22h00</p>`
);

// 2. cours.html
const coursInfoBlock = `
    <!-- ═══════════════════════════════════════════════
       INFO COURS BLOCK
       ═══════════════════════════════════════════════ -->
    <section class="cours-info" style="padding: 2rem 0; text-align: center;">
        <div class="container">
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius); padding: 2rem; max-width: 800px; margin: 0 auto;" class="reveal">
                <h3 style="color: var(--golden-yellow); margin-bottom: 1rem;">Information Importante</h3>
                <p>Nos cours sont conçus pour des groupes de <strong>4 personnes maximum</strong>. Afin de garantir une qualité d'enseignement et une bonne dynamique de jeu, les cours seront lancés <strong>uniquement s'il y a 4 personnes inscrites (pas moins)</strong>.</p>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════
       CTA BANNER
       ═══════════════════════════════════════════════ -->
    <section class="cours-cta-banner reveal">`;
replaceInFile(
    'c:/Site/cours.html',
    /<!-- ═══════════════════════════════════════════════\s*CTA BANNER\s*═══════════════════════════════════════════════ -->\s*<section class="cours-cta-banner reveal">/,
    coursInfoBlock
);

// 3. tarifs.html
const tarifsLaunchBlock = `
    <!-- ═══════════════════════════════════════════════
       OFFRE DE LANCEMENT
       ═══════════════════════════════════════════════ -->
    <section class="adhesion-launch" style="padding: 4rem 0;">
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
                <div class="launch-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
                    <!-- Offre Non Adh -->
                    <div class="launch-card" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.1);">
                        <h3>Non-Adhérents</h3>
                        <div class="price" style="font-size: 2rem; font-weight: bold; margin: 1rem 0; color: var(--golden-yellow);">85 € <span style="font-size: 1rem; color: rgba(255,255,255,0.7); font-weight: normal;">/ jusqu'à fin août</span></div>
                        <p>Idéal pour découvrir le Padel. Vous profitez de tous nos avantages membres tout au long de
                            l'été !</p>
                        <a href="contact.html" class="btn btn-outline" style="width: 100%; margin-top:20px; display: block; text-align: center;">Je profite
                            de l'offre</a>
                    </div>
                    <!-- Offre Adh -->
                    <div class="launch-card premium-launch" style="background: var(--golden-yellow); padding: 2rem; border-radius: var(--radius); color: #000;">
                        <h3 style="color: #000;">Adhérents Tennis</h3>
                        <div class="price" style="font-size: 2rem; font-weight: bold; margin: 1rem 0;">50 € <span style="font-size: 1rem; font-weight: normal;">/ jusqu'à fin août</span></div>
                        <p>Prix très spécial réservé à nos joueurs de tennis. L'occasion rêvée de tester le padel sans
                            se ruiner.</p>
                        <a href="contact.html" class="btn" style="background: #000; color: var(--golden-yellow); width: 100%; margin-top:20px; display: block; text-align: center;">Je profite
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

replaceInFile(
    'c:/Site/tarifs.html',
    /<!-- ═══════════════════════════════════════════════\s*DEVENEZ ADHÉRENT\s*═══════════════════════════════════════════════ -->\s*<section class="adherent-section" id="adherent">/,
    tarifsLaunchBlock
);

