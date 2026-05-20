const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');

// 1. Lees alle bestanden in de huidige map
fs.readdir(__dirname, (err, files) => {
    if (err) return console.error('Fout bij lezen map:', err);

    // 2. Filter alleen de HTML bestanden (behalve index.html zelf)
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');

    // 3. Maak van elk bestand een HTML link string
    const linksHtml = htmlFiles
        .map(file => `        <li><a href="${file}">${file.replace('.html', '')}</a></li>`)
        .join('\n');

    // 4. Lees de huidige index.html
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) return console.error('Fout bij lezen index.html:', err);

        // 5. Vervang alles tussen <ul id="demo-lijst"> en </ul>
        const regex = /(<ul id="demo-lijst">)[\s\S]*?(<\/ul>)/;
        const bijgewerkteHtml = data.replace(regex, `$1\n${linksHtml}\n$2`);

        // 6. Schrijf de nieuwe code terug naar index.html
        fs.writeFile(indexFile, bijgewerkteHtml, 'utf8', (err) => {
            if (err) return console.error('Fout bij opslaan:', err);
            console.log('index.html is succesvol bijgewerkt met de nieuwste HTML-bestanden!');
        });
    });
});