from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
POSTERS = ASSETS / "posters"
FONTS = ASSETS / "fonts"
W, H = 1080, 1350
FONT_LATIN = FONTS / "DMSans.ttf"
FONT_SERIF = FONTS / "DMSerifDisplay-Regular.ttf"
FONT_DEV = FONTS / "NotoSansDevanagari.ttf"

# Every text treatment is laid out here (not generated inside the artwork) so Devanagari stays editable, accurate and legible.
POSTER_DATA = [
    {"id":"marathi-satsang-01","title":"मनःशांतीचा\nसुंदर प्रवास","subtitle":"संतवाणी • नामस्मरण • साधना","eyebrow":"मराठी सत्संग  /  ०१","category":"Marathi","bg":"devotional-marathi-bg.png","style":"arch","lang":"dev"},
    {"id":"marathi-satsang-02","title":"भक्ती, सेवा,\nसमाधान","subtitle":"मनापासून जगण्याची दिशा","eyebrow":"मराठी सत्संग  /  ०२","category":"Marathi","bg":"photo-grade.png","style":"panel","lang":"dev"},
    {"id":"marathi-satsang-03","title":"नामात विसावा,\nश्वासात शांतता","subtitle":"सत्संगाचा एक निवांत क्षण","eyebrow":"मराठी सत्संग  /  ०३","category":"Marathi","bg":"ai-concept.png","style":"circle","lang":"dev"},
    {"id":"marathi-satsang-04","title":"शांततेकडे\nएक पाऊल","subtitle":"अंतर्मनाशी संवाद","eyebrow":"मराठी सत्संग  /  ०४","category":"Marathi","bg":"devotional-marathi-bg.png","style":"minimal","lang":"dev"},
    {"id":"hindi-satsang-01","title":"मन की शांति,\nजीवन की रोशनी","subtitle":"सत्संग • साधना • आत्मचिंतन","eyebrow":"हिंदी सत्संग  /  ०१","category":"Hindi","bg":"devotional-hindi-bg.png","style":"arch","lang":"dev"},
    {"id":"hindi-satsang-02","title":"भक्ति में\nएकाग्रता","subtitle":"हर दिन भीतर लौटने का अवसर","eyebrow":"हिंदी सत्संग  /  ०२","category":"Hindi","bg":"ai-art-study.png","style":"panel","lang":"dev"},
    {"id":"hindi-satsang-03","title":"प्रेम से सुनें,\nशांति से जिएँ","subtitle":"संतवाणी का एक सरल संदेश","eyebrow":"हिंदी सत्संग  /  ०३","category":"Hindi","bg":"photo-grade.png","style":"circle","lang":"dev"},
    {"id":"hindi-satsang-04","title":"मौन में भी\nमिलती है राह","subtitle":"ठहरिए • सुनिए • अनुभव कीजिए","eyebrow":"हिंदी सत्संग  /  ०४","category":"Hindi","bg":"devotional-hindi-bg.png","style":"minimal","lang":"dev"},
    {"id":"quote-01","title":"Find a moment\nof stillness.","subtitle":"BE HERE. BREATHE. BEGIN.","eyebrow":"STILLNESS NOTES  /  01","category":"Quotes","bg":"ai-art-study.png","style":"minimal","lang":"latin"},
    {"id":"quote-02","title":"भीतर भी एक\nआकाश है।","subtitle":"अपने लिए एक शांत क्षण।","eyebrow":"मन के लिए  /  ०२","category":"Quotes","bg":"devotional-hindi-bg.png","style":"circle","lang":"dev"},
    {"id":"quote-03","title":"शांत मन,\nस्पष्ट दिशा.","subtitle":"एक श्वास पुरेसा आहे.","eyebrow":"मनासाठी  /  ०३","category":"Quotes","bg":"photo-grade.png","style":"panel","lang":"dev"},
    {"id":"event-01","title":"सत्संग\nसंध्या","subtitle":"एक निवांत संध्याकाळ\nसंतवाणी • नामस्मरण","eyebrow":"कार्यक्रम संकल्पना  /  ०१","category":"Events","bg":"devotional-marathi-bg.png","style":"event","lang":"dev","footer":"तारीख व स्थळ — लवकरच"},
    {"id":"event-02","title":"भजन एवं\nसत्संग","subtitle":"विचार • संगीत • आत्मचिंतन","eyebrow":"आमंत्रण संकल्पना  /  ०२","category":"Events","bg":"devotional-hindi-bg.png","style":"event","lang":"dev","footer":"समय और स्थान शीघ्र घोषित होंगे"},
    {"id":"event-03","title":"An Evening of\nStillness","subtitle":"Satsang • Reflection • Community","eyebrow":"EVENT CONCEPT  /  03","category":"Events","bg":"brand-study.png","style":"event","lang":"latin","footer":"Details to be announced"},
    {"id":"product-01","title":"MAKE SPACE\nFOR FOCUS.","subtitle":"A calmer way to plan a busy day.","eyebrow":"DIGITAL PRODUCT STUDY  /  01","category":"Product","bg":"startup-product.png","style":"product","lang":"latin"},
    {"id":"product-02","title":"Less noise.\nMore signal.","subtitle":"Clarity for the next small step.","eyebrow":"CAMPAIGN CONCEPT  /  02","category":"Product","bg":"ai-concept.png","style":"product","lang":"latin"},
    {"id":"product-03","title":"Small moments.\nClearer days.","subtitle":"A thoughtful product, one day at a time.","eyebrow":"LAUNCH CREATIVE  /  03","category":"Product","bg":"brand-study.png","style":"product","lang":"latin"},
    {"id":"carousel-01","title":"A gentler way\nto remember.","subtitle":"GateMemory  /  a product-story concept","eyebrow":"CAROUSEL CONCEPT  /  01","category":"Carousel","bg":"startup-product.png","style":"carousel","lang":"latin","frame":"01 / 05"},
    {"id":"carousel-02","title":"Build for the\nmoment it matters.","subtitle":"A safety-first product story","eyebrow":"CAROUSEL CONCEPT  /  02","category":"Carousel","bg":"ai-art-study.png","style":"carousel","lang":"latin","frame":"01 / 05"},
    {"id":"carousel-03","title":"Make complex\nfeel clear.","subtitle":"A four-frame applied-AI explainer","eyebrow":"CAROUSEL CONCEPT  /  03","category":"Carousel","bg":"ai-concept.png","style":"carousel","lang":"latin","frame":"01 / 04"},
]

def font(path: Path, size: int):
    return ImageFont.truetype(str(path), size, layout_engine=ImageFont.Layout.RAQM)

def cover(image: Image.Image, size=(W,H), center=(0.5,0.5)) -> Image.Image:
    image = image.convert("RGB")
    sw, sh = image.size
    tw, th = size
    scale = max(tw/sw, th/sh)
    nw, nh = round(sw*scale), round(sh*scale)
    image = image.resize((nw, nh), Image.Resampling.LANCZOS)
    cx = int(nw*center[0]); cy = int(nh*center[1])
    left = min(max(cx - tw//2, 0), nw-tw)
    top = min(max(cy - th//2, 0), nh-th)
    return image.crop((left, top, left+tw, top+th))

def add_gradients(im: Image.Image, strength=0.72):
    overlay = Image.new("RGBA", im.size, (0,0,0,0))
    pix = overlay.load()
    for y in range(H):
        # A gentle top/bottom vignette with the strongest contrast behind the type block.
        top = max(0, 1 - y/560)
        bottom = max(0, (y/H - .45) / .55)
        mid = max(0, 1 - abs(y/H - .53)/.39)
        a = int(255 * min(.82, strength*(.30*top + .50*bottom + .36*mid)))
        for x in range(W):
            side = max(0, abs(x/W-.5)-.30) * .9
            aa = min(205, int(a + side*100))
            pix[x,y] = (19, 22, 21, aa)
    return Image.alpha_composite(im.convert("RGBA"), overlay)

def draw_center(draw: ImageDraw.ImageDraw, xy, text, fnt, fill, spacing=14, align="center", stroke_width=0, stroke_fill=(0,0,0,0)):
    draw.multiline_text(xy, text, font=fnt, fill=fill, anchor="mm", align=align, spacing=spacing,
                        stroke_width=stroke_width, stroke_fill=stroke_fill, language="hi")

def make_poster(item):
    src = Image.open(ASSETS / item["bg"])
    bg = cover(src)
    # Warm/cool palette treatment to keep all work within one visual system without making every poster alike.
    if item["category"] in ("Marathi", "Events"):
        bg = ImageEnhance.Color(bg).enhance(.88)
    if item["category"] == "Product":
        bg = ImageEnhance.Brightness(bg).enhance(.92)
    im = add_gradients(bg, .66 if item["style"] in ("minimal", "product") else .76)
    d = ImageDraw.Draw(im, "RGBA")
    cream=(246,240,226,255); saffron=(218,155,81,255); terracotta=(197,111,83,255)
    # Frame and motif vary by art direction, not by a generic repeated card template.
    if item["style"] == "arch":
        d.rounded_rectangle((58,58,W-58,H-58), radius=265, outline=(246,240,226,105), width=2)
        d.arc((300,250,780,730), 198, 342, fill=(218,155,81,210), width=3)
        title_y=602
    elif item["style"] == "panel":
        d.rounded_rectangle((76,278,W-76,1058), radius=20, fill=(22,23,20,112), outline=(248,241,226,90), width=2)
        d.rectangle((112,350,119,970), fill=(218,155,81,245))
        title_y=654
    elif item["style"] == "circle":
        d.ellipse((W-340,230,W-106,464), outline=(230,173,107,110), width=2)
        d.ellipse((W-300,270,W-146,424), outline=(230,173,107,95), width=1)
        d.line((90,330,90,990), fill=(218,155,81,225), width=3)
        title_y=600
    elif item["style"] == "event":
        d.rectangle((68,68,W-68,H-68), outline=(246,240,226,135), width=2)
        d.line((W//2-42,330,W//2+42,330), fill=(218,155,81,255), width=4)
        title_y=615
    elif item["style"] == "product":
        d.rounded_rectangle((68,68,W-68,H-68), radius=8, outline=(35,37,35,75), width=2)
        d.rectangle((100,105,108,250), fill=(190,102,71,255))
        title_y=610
    elif item["style"] == "carousel":
        d.rounded_rectangle((62,62,W-62,H-62), radius=32, outline=(246,240,226,130), width=2)
        d.ellipse((W-205,175,W-150,230), fill=(222,157,84,245))
        title_y=585
    else:
        title_y=600
    latin = item["lang"] == "latin"
    text_font = font(FONT_SERIF if latin else FONT_DEV, 88 if item["category"] not in ("Product","Carousel") else 78)
    if item["category"] == "Events" and latin:
        text_font = font(FONT_SERIF, 88)
    small = font(FONT_DEV if item["lang"] == "dev" else FONT_LATIN, 22)
    subfont = font(FONT_DEV if not latin else FONT_LATIN, 30 if not latin else 25)
    eyebrow = item["eyebrow"]
    # Small top identifier; keep it intentionally restrained.
    d.text((W//2, 155), eyebrow, font=small, fill=(246,240,226,225), anchor="mm", spacing=4)
    d.line((W//2-28, 201, W//2+28, 201), fill=(218,155,81,245), width=3)
    title_fill = cream if item["category"] not in ("Product",) else (35,36,33,255)
    # Product artwork is the only light editorial direction, so preserve its paper palette.
    if item["category"] == "Product":
        # translucent ivory type plate makes the light campaign readable, while image remains visible.
        d.rounded_rectangle((105,410,975,820), radius=6, fill=(247,243,235,214))
        title_y=615
        title_fill=(31,33,30,255)
    draw_center(d, (W//2, title_y), item["title"], text_font, title_fill, spacing=20)
    sub_y = title_y + (180 if "\n" in item["title"] else 125)
    if item.get("subtitle"):
        sub_fill = (241,235,221,245) if item["category"] != "Product" else (70,70,64,255)
        draw_center(d, (W//2, sub_y), item["subtitle"], subfont, sub_fill, spacing=11)
    # For event artwork, avoid made-up dates or venues: explicitly indicate those details are pending.
    if item.get("footer"):
        footerfont = font(FONT_DEV if item["lang"] == "dev" else FONT_LATIN, 25)
        d.rounded_rectangle((150,1052,930,1120), radius=30, fill=(22,23,20,155), outline=(218,155,81,175), width=1)
        d.text((W//2,1086), item["footer"], font=footerfont, fill=cream, anchor="mm", language="hi")
    if item.get("frame"):
        d.text((W-132,H-135), item["frame"], font=small, fill=(246,240,226,230), anchor="mm")
        d.line((132,H-135,W-198,H-135), fill=(246,240,226,130), width=2)
    # Small concept signature: this is a design-study portfolio, not a claimed client commission.
    d.text((W//2,H-112), "CONCEPT STUDY   /   HARSH TAKALKAR", font=font(FONT_LATIN,17), fill=(246,240,226,195), anchor="mm")
    # Slightly soften pixels and save optimized real poster image.
    out=POSTERS / f"{item['id']}.jpg"
    im.convert("RGB").save(out, "JPEG", quality=91, optimize=True, progressive=True)
    item["image"] = f"/assets/posters/{out.name}"
    return item

if __name__ == "__main__":
    POSTERS.mkdir(parents=True, exist_ok=True)
    finished=[make_poster(p.copy()) for p in POSTER_DATA]
    print(f"Created {len(finished)} poster assets in {POSTERS}")
