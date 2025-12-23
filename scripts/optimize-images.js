const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🖼️  Optimizing images...');
  
  // assets/images 폴더가 있는지 확인
  if (!fs.existsSync('assets/images')) {
    console.log('⚠️  No images folder found. Skipping optimization.');
    return;
  }
  
  try {
    await imagemin(['assets/images/*.{jpg,png}'], {
      destination: 'dist/assets/images',
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });
    
    console.log('✅ Images optimized and converted to WebP!');
  } catch (error) {
    console.error('❌ Image optimization failed:', error.message);
    process.exit(1);
  }
})();
