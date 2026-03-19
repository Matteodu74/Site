const fs = require('fs');

const file = 'c:/Site/contact.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `<div class="acces-item">
                                <path
                                    d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                            </svg>
                        </div>
                        <div>
                            <h4>Accessibilité</h4>`;

const correctStr = `<div class="acces-item">
                        <div class="acces-item-icon acces-icon--bus">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
                            </svg>
                        </div>
                        <div>
                            <h4>En Transports</h4>
                            <p>Accessible en bus via le réseau Colibri (arrêt à proximité) ainsi que la ligne 171 TCL. La gare TER de Neyron se trouve à moins de 10 minutes à pied !</p>
                        </div>
                    </div>

                    <div class="acces-item">
                        <div class="acces-item-icon acces-icon--access">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                            </svg>
                        </div>
                        <div>
                            <h4>Accessibilité</h4>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, correctStr);
    fs.writeFileSync(file, content);
    console.log("contact.html fixed successfully!");
} else {
    console.log("Target string not found in contact.html!");
}
