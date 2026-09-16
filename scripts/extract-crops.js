const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const src = 'C:/Users/Darshak/.gemini/antigravity-ide/brain/27ffc6b3-8046-4631-8c1f-9b7ac6c0d8e2/.user_uploaded/media_1789564328341.png';
  const outDir = path.join(__dirname, '../public/images/products');
  const bannerDir = path.join(__dirname, '../public/images/banners');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  if (!fs.existsSync(bannerDir)) fs.mkdirSync(bannerDir, { recursive: true });

  const metadata = await sharp(src).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  // 1. Extract Hero Banner
  await sharp(src)
    .extract({ left: 0, top: 62, width: 773, height: 215 })
    .toFile(path.join(bannerDir, 'insecticides-hero-banner.png'));
  console.log('Saved hero banner');

  // Let's accurately crop the 4 main bottles from row 1:
  // In 773 width:
  // Card 1 box is roughly x: 91, y: 320, w: 136, h: 153
  // Bottle inside Card 1: x: 110, y: 324, w: 98, h: 132
  // Card 2: x: 242, y: 320, w: 136, h: 153
  // Bottle inside Card 2: x: 261, y: 324, w: 98, h: 132
  // Card 3: x: 393, y: 320, w: 136, h: 153
  // Bottle inside Card 3: x: 412, y: 324, w: 98, h: 132
  // Card 4: x: 545, y: 320, w: 136, h: 153
  // Bottle inside Card 4: x: 564, y: 324, w: 98, h: 132

  const crops = [
    { name: 'aadhira.png', left: 112, top: 324, width: 95, height: 130 },
    { name: 'bitcoin.png', left: 263, top: 324, width: 95, height: 130 },
    { name: 'chlocyp.png', left: 415, top: 324, width: 95, height: 130 },
    { name: 'chlofos.png', left: 566, top: 324, width: 95, height: 130 },
  ];

  for (const c of crops) {
    await sharp(src)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toFile(path.join(outDir, c.name));
    console.log(`Saved ${c.name}`);
  }
}

processImage().catch(console.error);
