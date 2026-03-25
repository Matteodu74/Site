const fs = require('fs');
const files = [
  'index.html', 'le-club.html', 'tarifs.html', 'adhesions.html', 
  'infrastructures.html', 'cours.html', 'tournois.html', 
  'actualites.html', 'contact.html', 'reserver.html'
];

const newLink = 'https://www.tiktok.com/@padelcotiere';

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Regex to find TikTok anchor tag
    // It captures cases where href is "#" or "https://www.tiktok.com"
    const regex = /<a [^>]*aria-label="TikTok"[^>]*>/g;
    
    const replacement = `<a href="${newLink}" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="TikTok">`;
    
    const updated = content.replace(regex, replacement);
    
    if (content !== updated) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated TikTok link in ${file}`);
    } else {
      console.log(`TikTok link already up to date or not found in ${file}`);
    }
  }
});
