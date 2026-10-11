from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
ROOT=Path(__file__).resolve().parents[1]
A=ROOT/'public/assets'; F=A/'fonts'
src=Image.open(A/'hero-studio.png').convert('RGB')
W,H=1200,630
scale=max(W/src.width,H/src.height)
src=src.resize((round(src.width*scale),round(src.height*scale)),Image.Resampling.LANCZOS)
left=(src.width-W)//2; top=(src.height-H)//2
im=src.crop((left,top,left+W,top+H)).convert('RGBA')
# deep editorial veil for readable open-graph title
ov=Image.new('RGBA',(W,H),(0,0,0,0)); p=ov.load()
for x in range(W):
    a=int(190*(1-x/W)**1.65+14)
    for y in range(H): p[x,y]=(21,23,21,a)
im=Image.alpha_composite(im,ov)
d=ImageDraw.Draw(im)
lat=ImageFont.truetype(str(F/'DMSans.ttf'),20)
ser=ImageFont.truetype(str(F/'DMSerifDisplay-Regular.ttf'),61)
d.text((80,93),'HARSH TAKALKAR   /   CREATIVE TECHNOLOGIST',font=lat,fill=(235,183,116,255))
d.multiline_text((78,190),'Creative visuals.\nThoughtful technology.',font=ser,fill=(247,242,233,255),spacing=8)
d.line((82,390,150,390),fill=(203,119,83,255),width=4)
d.text((81,431),'DESIGN  ·  VIDEO  ·  DIGITAL PRODUCTS  ·  APPLIED AI',font=lat,fill=(242,237,226,230))
im.convert('RGB').save(A/'og-harsh.jpg','JPEG',quality=90,optimize=True,progressive=True)
print('Created Open Graph card.')
