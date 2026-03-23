const fs = require('fs');
const file = 'c:/Site/actualites.html';
let content = fs.readFileSync(file, 'utf8');

const target = `            <div class="partners-grid reveal">
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                </div>
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                </div>
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
                    </svg>
                </div>
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                </div>
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <div class="partner-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
            </div>`;

const replacement = `            <div class="partners-grid reveal">
                <div class="partner-logo">
                    <img src="logo minoterie.png" alt="Minoterie">
                </div>
                <div class="partner-logo">
                    <img src="logo region_transparent.png" alt="La Région Auvergne-Rhône-Alpes">
                </div>
                <div class="partner-logo">
                    <img src="logo fft.png" alt="Fédération Française de Tennis">
                </div>
            </div>`;

// use regex with optional whitespace to replace
const regex = new RegExp('<div class="partners-grid reveal">[\\\\s\\\\S]*?</div>[\\\\s]*</div>[\\\\s]*</section>');
let repl = \`<div class="partners-grid reveal">
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
    </section>\`;
let newContent = content.replace(regex, repl);
fs.writeFileSync(file, newContent, 'utf8');
console.log("Done");
