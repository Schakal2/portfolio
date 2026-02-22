import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Find the file with the umlaut by listing directory contents
const imagesDir = join(process.cwd(), 'images');
const files = readdirSync(imagesDir);
console.log('Files in images dir:', files);

const coverFile = files.find(f => f.includes('Cover') && f.endsWith('.png'));
if (coverFile) {
  const src = join(imagesDir, coverFile);
  const dest = join(process.cwd(), 'public', 'images', 'cover-ebehoerde.png');
  mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
  copyFileSync(src, dest);
  console.log(`Copied "${coverFile}" to public/images/cover-ebehoerde.png`);
} else {
  console.log('Cover image not found!');
}
