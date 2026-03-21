const fs = require('fs');
const path = require('path');

const dir = 'c:\\Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const partenairesHTML = `  <!-- ═══════════════════════════════════════════════
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

files.forEach(f => {
    if (f === "index_corrected.html") return;
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /<!-- [═]+\s+PARTENAIRES\s+[═]+ -->\s*<section class="partenaires">[\s\S]*?<!-- [═]+\s+FOOTER/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, partenairesHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${f} (replaced existing)`);
    } else {
        const footerRegex = /<!-- [═]+\s+FOOTER/g;
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, partenairesHTML);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${f} (inserted new)`);
        } else {
            console.log(`Could not find footer in ${f}`);
        }
    }
});

const cssPath = path.join(dir, 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(/\.partner-logo \{[\s\S]*?\}/, `.partner-logo {
  width: 160px;
  height: 90px;
  border-radius: var(--radius-sm);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  padding: 16px;
}`);

cssContent = cssContent.replace(/\.partner-logo img \{[\s\S]*?\}/, `.partner-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 1;
}`);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Updated style.css');
