const fs = require('fs');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');

console.log('🗜️  Minifying files...');

// HTML 압축
function minifyHTMLFiles() {
    const htmlFiles = ['index.html', 'screens/start.html', 'screens/game.html',
        'screens/gameover.html', 'screens/settings.html'];

    let minifiedCount = 0;

    htmlFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  ${file} not found, skipping...`);
            return;
        }

        const content = fs.readFileSync(file, 'utf8');
        const minified = minifyHTML(content, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        });

        const outputPath = path.join('dist', file);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, minified);
        minifiedCount++;
    });

    console.log(`✅ ${minifiedCount} HTML files minified!`);
}

// CSS 압축
function minifyCSSFiles() {
    if (!fs.existsSync('css')) {
        console.log('⚠️  No CSS folder found, skipping...');
        return;
    }

    const cssFiles = ['css/main.css', 'css/animations.css'];
    let minifiedCount = 0;

    cssFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  ${file} not found, skipping...`);
            return;
        }

        const content = fs.readFileSync(file, 'utf8');
        const minified = new CleanCSS().minify(content).styles;

        const outputPath = path.join('dist', file);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, minified);
        minifiedCount++;
    });

    console.log(`✅ ${minifiedCount} CSS files minified!`);
}

// JS 압축
async function minifyJSFiles() {
    if (!fs.existsSync('js')) {
        console.log('⚠️  No JS folder found, skipping...');
        return;
    }

    const jsDir = 'js';
    const files = getAllJSFiles(jsDir);

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const result = await minifyJS(content);

        const outputPath = path.join('dist', file);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, result.code);
    }

    console.log(`✅ ${files.length} JS files minified!`);
}

function getAllJSFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(getAllJSFiles(filePath));
        } else if (file.endsWith('.js')) {
            results.push(filePath);
        }
    });

    return results;
}

// 실행
(async () => {
    try {
        minifyHTMLFiles();
        minifyCSSFiles();
        await minifyJSFiles();
        console.log('✅ All files minified successfully!');
    } catch (error) {
        console.error('❌ Minification failed:', error.message);
        process.exit(1);
    }
})();
