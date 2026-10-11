from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
ROOT=Path(__file__).resolve().parents[1]
A=ROOT/'public/assets'
src=Image.open(A/'photo-grade.png').convert('RGB').resize((1600,1000),Image.Resampling.LANCZOS)
# An intentional concept source treatment: flatter, cooler, lower saturation.
before=ImageEnhance.Color(src).enhance(.58)
before=ImageEnhance.Contrast(before).enhance(.82)
before=ImageEnhance.Brightness(before).enhance(.93)
cool=Image.new('RGB',before.size,(38,60,68))
before=Image.blend(before,cool,.11)
before.save(A/'photo-grade-before.jpg','JPEG',quality=91,optimize=True,progressive=True)
# A distinct editorial finish: richer midtones, warm highlights and lifted shadows.
after=ImageEnhance.Color(src).enhance(1.14)
after=ImageEnhance.Contrast(after).enhance(1.12)
after=ImageEnhance.Brightness(after).enhance(1.02)
warm=Image.new('RGB',after.size,(211,145,83))
after=Image.blend(after,warm,.055)
after.save(A/'photo-grade-after.jpg','JPEG',quality=91,optimize=True,progressive=True)
print('Created color-grading study pair.')
