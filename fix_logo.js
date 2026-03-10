const fs = require('fs');

const dir = 'c:/Users/HP/Downloads/assets/website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(`${dir}/${file}`, 'utf-8');

    const search = `<a href="index.html">\r
                    <img class="h-10 md:h-12 lg:h-16 w-auto invert opacity-100 hover:scale-105 transition-transform"\r
                        src="assets/dielogo.png" alt="Logo">\r
                </a>`;

    const replace = `<a href="index.html" class="bg-white/95 px-3 py-1.5 rounded-xl shadow-sm inline-flex items-center group">\n                    <img class="h-8 md:h-10 lg:h-14 w-auto object-contain group-hover:scale-105 transition-transform"\n                        src="assets/dielogo.png" alt="Logo">\n                </a>`;

    // Fallback regex if precise string matching fails due to exact whitespace differences
    content = content.replace(/<a href="index\.html">\s*<img class="[^"]*w-auto invert opacity-100 hover:scale-105 transition-transform"\s*src="assets\/dielogo\.png" alt="Logo">\s*<\/a>/s, replace);

    fs.writeFileSync(`${dir}/${file}`, content, 'utf-8');
    console.log(`Updated logo in ${file}`);
});
