const fs = require('fs');
const path = 'c:\\Site\\actualites.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove all placeholder image labels
html = html.replace(/<span class="placeholder-label"[^>]*>Image<\/span>/g, '');

// 2. Clear alt attributes of empty images
html = html.replace(/<img\s+src=""\s+alt="([^"]*)"/g, '<img src="" alt=""');

// 3. Remove the banner from immediately below the header
const bannerOld = `    <!-- BANNIERE EN CONSTRUCTION -->
    <div style="background-color: var(--golden-yellow, #f1c40f); color: #1a1a24; text-align: center; padding: 15px 20px; font-weight: bold; position: relative; z-index: 100; margin-top: 80px; text-transform: uppercase; letter-spacing: 1px;">
        🚧 Cette page est en cours de construction 🚧
    </div>`;

html = html.replace(bannerOld, '');

// The old banner might not exist in the checked out version since we added it in a previous step!
// So we just inject the NEW banner directly below `actu-hero-content`. Wait, below `actu-hero` section?
// "juste en dessous de la vie du club supprime celui ci qui est trop heut et met le en dessous de la vie du club"
// I will just put it literally inside the hero section, below the text, or just after the section.
// After the section is best so it forms a bar across the screen.

const bannerNew = `
    <!-- BANNIERE EN CONSTRUCTION -->
    <div style="background-color: var(--golden-yellow, #f1c40f); color: #1a1a24; text-align: center; padding: 15px 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
        🚧 Cette page est en cours de construction 🚧
    </div>
`;

// Insert after </section> of `actu-hero`
const injectionMarker = '    </section>\\n\\n    <!-- ═══════════════════════════════════════════════\\n       ARTICLE VEDETTE';
const injectionMarker2 = '    </section>\\r\\n\\r\\n    <!-- ═══════════════════════════════════════════════\\r\\n       ARTICLE VEDETTE';

if (html.includes('       ARTICLE VEDETTE')) {
    html = html.replace(/<\/section>(\s*)<!-- ═══════════════════════════════════════════════\s*ARTICLE VEDETTE/g, '</section>' + bannerNew + '$1<!-- ═══════════════════════════════════════════════\\n       ARTICLE VEDETTE');
}

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully fixed actualites.html using absolute JS replacement.');
