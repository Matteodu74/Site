const fs = require('fs');
const path = 'c:\\Site\\actualites.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Add banner at the top, just after </header>
const banner = `
    <!-- BANNIERE EN CONSTRUCTION -->
    <div style="background-color: var(--golden-yellow, #f1c40f); color: #1a1a24; text-align: center; padding: 15px 20px; font-weight: bold; position: relative; z-index: 100; margin-top: 80px; text-transform: uppercase; letter-spacing: 1px;">
        🚧 Cette page est en cours de construction 🚧
    </div>`;

if (!html.includes('Cette page est en cours de construction')) {
    html = html.replace('</header>', '</header>' + banner);
}

// Since margin-top 80px pushes content down, the hero section might need to NOT have its normal padding-top that expects to be under the header.
// Actually, `margin-top: 80px` on the banner will push the banner BELOW the fixed header. That's good. 
// But the hero section (`actu-hero`) might currently be overlapping. Let's just leave the simple HTML banner.

// 2. Remove all <span class="placeholder-label"...>...</span>
html = html.replace(/<span class="placeholder-label"[^>]*>Image<\/span>/g, '');

// 3. Clear alt attributes of empty images so they don't display their text on the placeholder background
// Look for <img src="" alt="SOME TEXT"> and replace with <img src="" alt="">
html = html.replace(/<img\s+src=""\s+alt="([^"]*)"/g, '<img src="" alt=""');

fs.writeFileSync(path, html, 'utf8');
console.log('Fixed actualites.html');
