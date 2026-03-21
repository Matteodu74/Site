const fs = require('fs');
const filePath = 'c:\\Site\\adhesions.html';
let content = fs.readFileSync(filePath, 'utf8');

// Update wording (from previous request)
const targetWording = `<em>* Attention : l'ajout d'une licence découverte à 4 € est obligatoire pour pouvoir jouer (celle-ci inclut une assurance).</em>`;
const newWording = `<em>* Attention : pour ceux qui ne sont pas licenciés tennis, l'ajout d'une licence découverte à 4 € est obligatoire pour pouvoir jouer (celle-ci inclut une assurance).</em>`;
content = content.replace(targetWording, newWording);

// Inject Partenaires block if not exists (from even older request)
const partenairesHTML = `  <!-- ═══════════════════════════════════════════════
       PARTENAIRES
       ═══════════════════════════════════════════════ -->
  <section class="partenaires">
    <div class="container">
      <h2 class="section-title reveal">NOS PARTENAIRES</h2>
      <div class="partners-grid reveal">
        <div class="partner-logo">
          <img src="logo minoterie.png" alt="Minoterie">
        </div>
        <div class="partner-logo">
          <img src="logo region_transparent.png" alt="La Région Auvergne-Rhône-Alpes">
        </div>
        <div class="partner-logo">
          <img src="logo fft.png" alt="Fédération Française de Tennis">
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════
       FOOTER`;

const footerRegex = /<!-- [═]+\s*FOOTER[\s\S]*?FOOTER.*\n\s*[═]+ -->/g;
const footerFound = content.match(footerRegex);
if(footerFound) {
    if (!content.includes('NOS PARTENAIRES')) {
        content = content.replace(footerFound[0], partenairesHTML + footerFound[0].replace(/<!-- [═]+\s+FOOTER/, ''));
    }
} else {
    // simpler replacement
    if (!content.includes('NOS PARTENAIRES')) {
        content = content.replace(/<!-- [═]+\s+FOOTER/g, partenairesHTML.replace('  <!-- ═══════════════════════════════════════════════\n       FOOTER', '') + '<!-- ═══════════════════════════════════════════════\n       FOOTER');
    }
}

// And finally remove the annoying line about the licence in the complementary block
const licenceLineRegex = /<li style="color: var\(--golden-yellow\); font-size: 0\.9em; margin-top: 10px;"><em>\* L'ajout d'une licence supplémentaire est obligatoire pour pouvoir jouer\.<\/em><\/li>/g;
content = content.replace(licenceLineRegex, '');

// Also clean up any potential double empty lines inside the card body <ul>
content = content.replace(/<li>Le meilleur des deux sports<\/li>\s*<\/ul>/g, '<li>Le meilleur des deux sports</li>\n                        </ul>');


fs.writeFileSync(filePath, content, 'utf8');
console.log('Restored adhesions.html and removed the complementary license line');
