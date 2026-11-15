const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const htmlPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html does not exist');
  process.exit(1);
}

// First recreate clean dist/index.html
const cleanHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./lion-crest.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SHERU BAI GIFT BOX 🦁 | Not Just a Gift. It's a Feeling.</title>
    <meta name="description" content="Sheru Bai is more than just a gift store. It's a little way of spreading happiness, sharing love and creating beautiful memories through thoughtful gifts. Delivery across India." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" crossorigin href="./assets/index-2AmaXz3n.css">
    <script type="module" crossorigin src="./assets/index-BunqKyRZ.js"></script>
  </head>
  <body class="bg-cream-100 text-darkbrown-900 font-sans antialiased selection:bg-gold-500 selection:text-white min-h-screen">
    <div id="root"></div>
  </body>
</html>`;

fs.writeFileSync(htmlPath, cleanHtml);

// Find CSS & JS files
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

let standalone = cleanHtml;

if (cssFile) {
  const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  standalone = standalone.replace(/<link rel="stylesheet"[^>]+>/, () => `<style>\n${css}\n</style>`);
}

if (jsFile) {
  const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  const safeJs = js.replace(/<\/script>/g, '<\\/script>');
  // Using function replacer () => ... avoids $ replacement token mangling!
  standalone = standalone.replace(/<script type="module"[^>]+><\/script>/, () => `<script type="module">\n${safeJs}\n</script>`);
}

fs.writeFileSync(path.join(distDir, 'standalone.html'), standalone);
fs.writeFileSync(htmlPath, standalone);
console.log('Successfully created standalone.html and dist/index.html! Length:', standalone.length);
