const fs = require('fs');
const path = require('path');

const dir = 'c:/Site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Contact form - remove phone number field
    const phoneFieldRegex = /[\s]*<div class="form-group">\s*<label for="form-phone">Numéros? de téléphone.*?<\/label>\s*<input type="tel" id="form-phone" name="phone".*?>\s*<\/div>/g;
    if (phoneFieldRegex.test(content)) {
        content = content.replace(phoneFieldRegex, '');
        changed = true;
    }

    // Task 1: licencié -> adhérent
    if (file === 'tarifs.html') {
        let newContent = content.replace("être licencié tennis dans l'un des trois clubs", "être adhérent tennis dans l'un des trois clubs");
        
        // Task 2: Location de terrain
        newContent = newContent.replace('<span class="price-amount">8,00 €</span>\n                        <span class="price-unit">/ pers / h</span>', '<span class="price-amount">12,00 €</span>\n                        <span class="price-unit">/ pers / session 1h30</span>');
        newContent = newContent.replace('<span class="price-amount">8,00 €</span>\r\n                        <span class="price-unit">/ pers / h</span>', '<span class="price-amount">12,00 €</span>\r\n                        <span class="price-unit">/ pers / session 1h30</span>');

        newContent = newContent.replace('<span class="price-amount">6,00 €</span>\n                        <span class="price-unit">/ pers / h</span>', '<span class="price-amount">9,00 €</span>\n                        <span class="price-unit">/ pers / session 1h30</span>');
        newContent = newContent.replace('<span class="price-amount">6,00 €</span>\r\n                        <span class="price-unit">/ pers / h</span>', '<span class="price-amount">9,00 €</span>\r\n                        <span class="price-unit">/ pers / session 1h30</span>');
        
        if (content !== newContent) {
            content = newContent;
            changed = true;
        }
    }

    if (file === 'adhesions.html') {
        let newContent = content.replace("être licencié tennis (Miribel, Neyron ou Tramoyes)", "être adhérent tennis (Miribel, Neyron ou Tramoyes)");
        // Update launch offer text in adhesions.html too if present? wait, let's look if it's there.
        newContent = newContent.replace("pour ceux qui ne sont pas licenciés tennis", "pour ceux qui ne sont pas adhérents tennis");
        newContent = newContent.replace("Non-adhérents tennis", "Non-adhérents tennis"); // already ok
        if (content !== newContent) {
            content = newContent;
            changed = true;
        }
    }

    // "licencié" also appears in the launch offer text in tarifs.html
    if (file === 'tarifs.html' || file === 'adhesions.html' || file === 'index.html') {
         let newContent = content.replace("pour ceux qui ne sont pas licenciés tennis", "pour ceux qui ne sont pas adhérents tennis");
         if (content !== newContent) {
             content = newContent;
             changed = true;
         }
    }


    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
