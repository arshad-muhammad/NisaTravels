import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const PUBLIC_DIR = './public';
const FORMATS = ['jpg', 'jpeg', 'png', 'webp'];

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function optimizeImage(filePath) {
  const extension = filePath.split('.').pop().toLowerCase();
  if (!FORMATS.includes(extension)) return;

  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Create WebP version
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(filePath.replace(/\.[^.]+$/, '.webp'));

    // Optimize original
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (metadata.width > 1920) {
      await image
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .png({ quality: 80, progressive: true })
        .toFile(filePath + '.tmp');

      // Replace original with optimized version
      await fs.promises.rename(filePath + '.tmp', filePath);
    }

    const newStats = await stat(filePath);
    console.log(`Optimized ${filePath}: ${(originalSize / 1024).toFixed(2)}KB → ${(newStats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function optimizeImages() {
  try {
    for await (const file of getFiles(PUBLIC_DIR)) {
      await optimizeImage(file);
    }
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImages(); 