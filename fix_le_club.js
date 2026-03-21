const fs = require('fs');
const filePath = 'c:\\Site\\le-club.html';
let content = fs.readFileSync(filePath, 'utf8');

const regexOld = /<!-- [═]+\s*PARTENAIRES — Same as landing\s*[═]+ -->\s*<section class="partenaires">[\s\S]*?<\/section>/g;
content = content.replace(regexOld, '');

// Also remove the bottom section added by update_all.js (if any, but since we reverted, it's not there)
// and replace it properly:

const partenairesHTML = `    <!-- ═══════════════════════════════════════════════
       PARTENAIRES
       ═══════════════════════════════════════════════ -->
    <section class="partenaires">
        <div class="container">
            <h2 class="section-title reveal">NOS PARTENAIRES</h2>
            <div class="partners-grid reveal">
                <!-- Partenaire 1 -->
                <div class="partner-logo">
                    <img src="logo minoterie.png" alt="Minoterie">
                </div>
                <!-- Partenaire 2 -->
                <div class="partner-logo">
                    <img src="logo region_transparent.png" alt="La Région Auvergne-Rhône-Alpes">
                </div>
                <!-- Partenaire 3 -->
                <div class="partner-logo">
                    <img src="logo fft.png" alt="Fédération Française de Tennis">
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════
       FOOTER`;

const footerRegex = /<!-- [═]+\s+FOOTER[\s\S]*?FOOTER.*\n\s*[═]+ -->/g;
const footerFound = content.match(footerRegex);
if(footerFound) {
    content = content.replace(footerFound[0], partenairesHTML + footerFound[0].replace(/<!-- [═]+\s+FOOTER/, ''));
} else {
    // simpler replacement
    content = content.replace(/<!-- [═]+\s+FOOTER/g, partenairesHTML.replace('    <!-- ═══════════════════════════════════════════════\n       FOOTER', '') + '<!-- ═══════════════════════════════════════════════\n       FOOTER');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed le-club.html');
