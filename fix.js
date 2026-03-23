const fs = require('fs');

let adhesions = fs.readFileSync('c:\\Site\\adhesions.html', 'utf8');
adhesions = adhesions.replace('<li>Accès illimité aux espaces de vie</li>', '<li>Accès illimité aux espaces de vie</li>\n                            <li>Licence multiraquette requise (adultes : 33 €, 7-18 ans : 23 €)</li>');
fs.writeFileSync('c:\\Site\\adhesions.html', adhesions);

let tarifs = fs.readFileSync('c:\\Site\\tarifs.html', 'utf8');
tarifs = tarifs.replace(
    'Tarifs réduits sur les cours & animations\r\n                        </li>',
    'Tarifs réduits sur les cours & animations\r\n                        </li>\r\n                        <li>\r\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">\r\n                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />\r\n                            </svg>\r\n                            Licence multiraquette requise (adultes : 33 €, 7-18 ans : 23 €)\r\n                        </li>'
);

tarifs = tarifs.replace(
    'Tarifs réduits sur les cours & animations\n                        </li>',
    'Tarifs réduits sur les cours & animations\n                        </li>\n                        <li>\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">\n                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />\n                            </svg>\n                            Licence multiraquette requise (adultes : 33 €, 7-18 ans : 23 €)\n                        </li>'
);

fs.writeFileSync('c:\\Site\\tarifs.html', tarifs);
console.log('Done!');
