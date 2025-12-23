const fs = require('fs');
const path = require('path');

console.log('🏗️  Building project...');

// 에셋 복사
function copyAssets() {
    // 오디오 파일 복사
    if (fs.existsSync('assets/sounds')) {
        const audioFiles = fs.readdirSync('assets/sounds');
        audioFiles.forEach(file => {
            fs.mkdirSync('dist/assets/sounds', { recursive: true });
            fs.copyFileSync(
                path.join('assets/sounds', file),
                path.join('dist/assets/sounds', file)
            );
        });
        console.log(`✅ ${audioFiles.length} audio files copied!`);
    } else {
        console.log('⚠️  No sounds folder found, skipping...');
    }

    // 이미지 파일 복사 (WebP 변환되지 않은 경우)
    if (fs.existsSync('assets/images')) {
        const imageFiles = fs.readdirSync('assets/images');
        imageFiles.forEach(file => {
            fs.mkdirSync('dist/assets/images', { recursive: true });
            fs.copyFileSync(
                path.join('assets/images', file),
                path.join('dist/assets/images', file)
            );
        });
        console.log(`✅ ${imageFiles.length} image files copied!`);
    }
}

// Sitemap 생성
function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/earthworm-game-demo/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

    fs.writeFileSync('dist/sitemap.xml', sitemap);
    console.log('✅ Sitemap generated!');
}

// robots.txt 생성
function generateRobotsTxt() {
    const robots = `User-agent: *
Allow: /

Sitemap: https://yourusername.github.io/earthworm-game-demo/sitemap.xml`;

    fs.writeFileSync('dist/robots.txt', robots);
    console.log('✅ robots.txt generated!');
}

// .nojekyll 파일 생성 (GitHub Pages용)
function generateNoJekyll() {
    fs.writeFileSync('dist/.nojekyll', '');
    console.log('✅ .nojekyll created!');
}

// 실행
try {
    // dist 폴더 생성
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
    }

    copyAssets();
    generateSitemap();
    generateRobotsTxt();
    generateNoJekyll();

    console.log('✅ Build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
