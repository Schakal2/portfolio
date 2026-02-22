import shutil
import os

images_dir = '/vercel/share/v0-project/images'
dest = '/vercel/share/v0-project/public/images/cover-ebehoerde.png'

files = os.listdir(images_dir)
print('Files:', files)

cover = [f for f in files if 'Cover' in f and f.endswith('.png')]
if cover:
    src = os.path.join(images_dir, cover[0])
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(src, dest)
    print(f'Copied "{cover[0]}" to {dest}')
else:
    print('Cover image not found')
