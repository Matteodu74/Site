const fs = require('fs');
const file = 'c:/Site/actualites.html';
const content = fs.readFileSync(file, 'utf8');

const regex = /<div class="partners-grid reveal">[\s\S]*?<\/div>[\s]*<\/div>[\s]*<\/section>/;
const replacement = `<div class="partners-grid reveal">
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
    </section>`;

if (regex.test(content)) {
    const newContent = content.replace(regex, replacement);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Replaced successfully!");
} else {
    console.log("Could not find the target string.");
}
