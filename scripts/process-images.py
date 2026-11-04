"""Builds responsive AVIF/WebP variants + src/content/art-manifest.json from downloaded sources.
Usage: python3 scripts/process-images.py <source_dir>"""
import json, os, sys
from PIL import Image, ImageOps, ImageEnhance

SRC = sys.argv[1]
OUT = 'public/art'
WIDTHS = [480, 800, 1200, 1800]
# name: (file, crop box as fractions (l,t,r,b) or None, max width, warm/neutral tweak)
ASSETS = {
  'krishna-fluting':   ('cma-314462.jpg', None, 1800),
  'radha-sakhi':       ('cma-154754.jpg', (0.035, 0.04, 0.965, 0.96), 1800),
  'krishna-awaiting':  ('cma-115988.jpg', (0.0, 0.0, 1.0, 1.0), 1200),
  'radha-storm':       ('cma-170893.jpg', (0.03, 0.03, 0.97, 0.97), 1800),
  'shiva-parvati':     ('cma-162435.jpg', None, 1200),
  'vishnu-lakshmi':    ('cma-155590.jpg', None, 1800),
  'ganesha':           ('cma-162529.jpg', None, 1200),
  'budha':             ('cma-394757.jpg', (0.155, 0.125, 0.845, 0.875), 1200),
  'taurus':            ('cma-394756.jpg', (0.155, 0.125, 0.845, 0.875), 1200),
  'palm-diagram':      ('wel-palm.jpg', (0.04, 0.02, 0.97, 0.985), 1200),
  'jantar-mantar':     ('uns-jantar.jpg', None, 1800),
  'lepakshi':          ('uns-lepakshi.jpg', None, 1800),
  'diyas':             ('uns-diyas.jpg', None, 1800),
  'temple-corridor':   ('uns-corridor.jpg', None, 1800),
}
manifest = {}
total = 0
for name, (f, crop, maxw) in ASSETS.items():
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    im = ImageOps.exif_transpose(im)
    if crop:
        W, H = im.size
        im = im.crop((int(crop[0]*W), int(crop[1]*H), int(crop[2]*W), int(crop[3]*H)))
    widths = [w for w in WIDTHS if w <= maxw and w <= im.width]
    for w in widths:
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(f'{OUT}/{name}-{w}.avif', quality=52, speed=4)
        r.save(f'{OUT}/{name}-{w}.webp', quality=72, method=6)
        total += os.path.getsize(f'{OUT}/{name}-{w}.avif')
    # tiny blurred placeholder colour (average) for reserved boxes
    avg = im.resize((1, 1), Image.BOX).getpixel((0, 0))
    manifest[name] = {'w': im.width, 'h': im.height, 'widths': widths, 'bg': '#%02x%02x%02x' % avg}
    print(name, im.size, widths, [os.path.getsize(f'{OUT}/{name}-{w}.avif')//1024 for w in widths], 'KB avif')
json.dump(manifest, open('src/content/art-manifest.json', 'w'), indent=1)
print('total avif KB', total//1024)
