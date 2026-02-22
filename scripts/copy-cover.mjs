import { copyFileSync } from 'fs';
import { join } from 'path';

const src = join(process.cwd(), 'images', 'Cover image eBeh\u00f6rde.png');
const dest = join(process.cwd(), 'public', 'images', 'cover-ebehoerde.png');

try {
  copyFileSync(src, dest);
  console.log('Successfully copied cover image');
} catch (e) {
  console.error('Failed to copy:', e.message);
}
