const fs = require('fs');
const path = require('path');

function processFile(file, edits) {
    const fullPath = path.resolve('c:/Site', file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;
    
    for (const edit of edits) {
        if (!content.match(edit.regex)) {
            console.error(`Regex failed on ${file}:`, edit.regex);
        } else {
            content = content.replace(edit.regex, edit.replaceStr);
            console.log(`Successfully replaced in ${file}`);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(fullPath, content);
    }
}

// 1. index.html
processFile('index.html', [
    {
        regex: /<h2>Ouverture Prévue Mi-Avril !<\/h2>\s*<p>\s*Préparez vos raquettes ! Padel Côtière ouvrira officiellement ses portes à la <strong>mi-avril<\/strong>\. Une\s*ambiance chaleureuse, des infrastructures flambant neuves et une passion partagée vous attendent\.\s*<\/p>/,
        replaceStr: `<h2>Ouverture Prévue le 26 Avril !</h2>
        <p>
          Préparez vos raquettes ! Padel Côtière ouvrira officiellement ses portes le <strong>26 avril</strong>, avec une possibilité de pré-ouverture avant si le chantier avance bien et que nous vous tenons au courant. Une
          ambiance chaleureuse, des infrastructures flambant neuves et une passion partagée vous attendent.
        </p>`
    }
]);

// 2. adhesions.html
processFile('adhesions.html', [
    {
        regex: /l'ajout d'une licence découverte à 3 €/g,
        replaceStr: `l'ajout d'une licence découverte à 4 €`
    },
    {
        regex: /<h3>Non-Adhérents Tennis<\/h3>\s*<div class="price">80 € <span>\/ jusqu'à fin août<\/span><\/div>/,
        replaceStr: `<h3>Non-Adhérents Tennis</h3>
                        <div class="price">85 € <span>/ jusqu'à fin août</span></div>`
    }
]);

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
                <!-- Offre Non Adh -->
                <div class="launch-cards">
                    <div class="launch-card">
                        <h3>Non-Adhérents Tennis</h3>
                        <div class="price">85 € <span>/ jusqu'à fin août</span></div>
                        <p>Idéal pour découvrir le Padel. Vous profitez de tous nos avantages membres tout au long de l'été !</p>
                        <a href="contact.html" class="btn btn-outline" style="width: 100%; margin-top:20px;">Je profite de l'offre</a>
                    </div>
                    <!-- Offre Adh -->
                    <div class="launch-card premium-launch">
                        <h3>Adhérents Tennis</h3>
                        <div class="price">50 € <span>/ jusqu'à fin août</span></div>
                        <p>Prix très spécial réservé à nos joueurs de tennis. L'occasion rêvée de tester le padel sans se ruiner.</p>
                        <a href="contact.html" class="btn btn-primary" style="width: 100%; margin-top:20px;">Je profite de l'offre</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════
       DEVENEZ ADHÉRENT
       ═══════════════════════════════════════════════ -->
    <section class="adherent-section" id="adherent">`;

processFile('tarifs.html', [
    {
        regex: /<!-- ═══════════════════════════════════════════════\s*DEVENEZ ADHÉRENT\s*═══════════════════════════════════════════════ -->\s*<section class="adherent-section" id="adherent">/,
        replaceStr: tarifsLaunchBlock
    }
]);

// 4. infrastructures.html
const infraBanner = `
    <!-- ═══════════════════════════════════════════════
       D'OÙ VIENT PADEL CÔTIÈRE ?
       ═══════════════════════════════════════════════ -->
    <section class="info-banner" style="background-color: var(--card-bg); padding: 2rem 0; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="container reveal">
            <p style="color: var(--golden-yellow); font-weight: bold; font-size: 1.1rem; margin: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style="vertical-align: middle; margin-right: 8px;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Les photos de nos infrastructures arriveront très bientôt, dès que le chantier de Padel Côtière sera entièrement fini d'être construit et aménagé !
            </p>
        </div>
    </section>

    <section class="origine-section">`;
processFile('infrastructures.html', [
    {
        regex: /<!-- ═══════════════════════════════════════════════\s*D'OÙ VIENT PADEL CÔTIÈRE \?\s*═══════════════════════════════════════════════ -->\s*<section class="origine-section">/,
        replaceStr: infraBanner
    }
]);

// 5. cours.html
const coursInfoBlock = `
    <!-- ═══════════════════════════════════════════════
       CTA BANNER
       ═══════════════════════════════════════════════ -->
    <section class="cours-info" style="padding: 2rem 0; text-align: center;">
        <div class="container">
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius); padding: 2rem; max-width: 800px; margin: 0 auto;" class="reveal">
                <h3 style="color: var(--golden-yellow); margin-bottom: 1rem;">Information Importante</h3>
                <p>Nos cours sont conçus pour des groupes de <strong>4 personnes maximum</strong>. Afin de garantir une qualité d'enseignement et une bonne dynamique de jeu, les cours seront lancés <strong>uniquement s'il y a 4 personnes inscrites (pas moins)</strong>.</p>
            </div>
        </div>
    </section>

    <section class="cours-cta-banner reveal">`;
processFile('cours.html', [
    {
        regex: /<!-- ═══════════════════════════════════════════════\s*CTA BANNER\s*═══════════════════════════════════════════════ -->\s*<section class="cours-cta-banner reveal">/,
        replaceStr: coursInfoBlock
    }
]);

// 6. contact.html
processFile('contact.html', [
    {
        regex: /<h3>Horaires<\/h3>\s*<p>Tous les jours :<br>08h00 – 22h00<\/p>/,
        replaceStr: `<h3>Horaires d'ouverture</h3>
                    <p>Tous les jours :<br>08h00 – 22h00</p>
                    <h4 style="font-size: 1rem; margin-top: 1rem; color: var(--golden-yellow);">Horaires de permanence</h4>
                    <p>Semaine : 16h00 – 22h00<br>Week-end : 11h00 – 22h00</p>`
    }
]);

console.log("All fixes applied!");
