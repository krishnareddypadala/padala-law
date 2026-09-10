"""Convert Gemini PNG posters to site JPGs and stage them.
Usage: python sem5-pipeline/scripts/deploy_img.py <subj> <NN> <png>   (repeatable) then commit.
Output: img/<subj>/story-NN.jpg, max 1536x2752, JPEG q85."""
import sys, os
from PIL import Image
subj, nn, src = sys.argv[1], sys.argv[2], sys.argv[3]
dst_dir = os.path.join('img', subj); os.makedirs(dst_dir, exist_ok=True)
dst = os.path.join(dst_dir, f'story-{nn}.jpg')
im = Image.open(src).convert('RGB')
im.thumbnail((1536, 2752))
im.save(dst, 'JPEG', quality=85, optimize=True, progressive=True)
print(dst, im.size, os.path.getsize(dst)//1024, 'KB')
