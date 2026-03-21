const fs = require('fs');
const path = 'c:\\Site\\actualites.html';
let html = fs.readFileSync(path, 'utf8');

// The banner block as currently in the file
const bannerOld = `    <!-- BANNIERE EN CONSTRUCTION -->
    <div style="background-color: var(--golden-yellow, #f1c40f); color: #1a1a24; text-align: center; padding: 15px 20px; font-weight: bold; position: relative; z-index: 100; margin-top: 80px; text-transform: uppercase; letter-spacing: 1px;">
        🚧 Cette page est en cours de construction 🚧
    </div>`;

// The new banner to insert
const bannerNew = `    <!-- BANNIERE EN CONSTRUCTION -->
    <div style="background-color: var(--golden-yellow, #f1c40f); color: #1a1a24; text-align: center; padding: 15px 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
        🚧 Cette page est en cours de construction 🚧
    </div>`;

// 1. Remove it from the current position
html = html.replace(bannerOld + '\\n', ''); // Try with newline
html = html.replace(bannerOld + '\\r\\n', '');
html = html.replace(bannerOld, '');

// 2. Insert it just below <section class="actu-hero">
// Specifically, inject it before the "ARTICLE VEDETTE" section comment.
const injectionPoint = '    <!-- ═══════════════════════════════════════════════\\n       ARTICLE VEDETTE';
const injectionPoint2 = '    <!-- ═══════════════════════════════════════════════\\r\\n       ARTICLE VEDETTE';

if (html.includes(injectionPoint)) {
    html = html.replace(injectionPoint, bannerNew + '\\n\\n' + injectionPoint);
} else if (html.includes(injectionPoint2)) {
    html = html.replace(injectionPoint2, bannerNew + '\\r\\n\\r\\n' + injectionPoint2);
}

fs.writeFileSync(path, html, 'utf8');
console.log("Moved banner");
