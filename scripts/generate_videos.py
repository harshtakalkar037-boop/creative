from __future__ import annotations

import math, os, subprocess, tempfile, wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
OUT = ASSETS / "videos"
FONTS = ASSETS / "fonts"
W, H, FPS = 720, 1280, 24
FONT_DEV = FONTS / "NotoSansDevanagari.ttf"
FONT_LATIN = FONTS / "DMSans.ttf"
FONT_SERIF = FONTS / "DMSerifDisplay-Regular.ttf"

# Reusable full-frame grading layers are vectorized once, then composited by Pillow for each frame.
def make_gradients():
    yy=np.arange(H,dtype=np.float32)[:,None]/H
    xx=np.arange(W,dtype=np.float32)[None,:]/W
    a=(34 + 84*np.maximum(0,(yy-.24)/.76) + 33*np.maximum(0,(.23-yy)/.23) + 70*np.maximum(0,np.abs(xx-.5)-.30)).clip(0,175).astype(np.uint8)
    arr=np.zeros((H,W,4),dtype=np.uint8)
    arr[:,:,0]=13; arr[:,:,1]=16; arr[:,:,2]=15; arr[:,:,3]=a
    veil=Image.fromarray(arr,"RGBA")
    light=Image.new("RGBA",(W,H),(0,0,0,0)); ld=ImageDraw.Draw(light)
    ld.ellipse((44,355,W-44,956),fill=(226,183,112,22))
    light=light.filter(ImageFilter.GaussianBlur(74))
    return veil,light

GRADIENT, SPOTLIGHT = make_gradients()

# Programmatically animated motion-graphics reels. Background artwork is original and all soundtrack tones are synthesized here.
REELS = [
  {
    "id":"marathi-satsang", "title":"Marathi Satsang — Shanticha Pravas", "duration":24, "lang":"mr", "accent":(225,165,95),
    "footer":"मराठी सत्संग  /  मोशन संकल्पना",
    "segments":[
      {"start":0,"end":4.6,"image":"devotional-marathi-bg.png","title":"मनःशांतीचा\nसुंदर प्रवास","subtitle":"क्षणभर थांबा. श्वासाकडे परत या.","eyebrow":"एक निवांत निमंत्रण"},
      {"start":4.6,"end":9.2,"image":"ai-concept.png","title":"संतवाणी","subtitle":"विचारांतून उमलणारी शांतता.","eyebrow":"ऐका • विचार करा • अनुभवा"},
      {"start":9.2,"end":14.8,"image":"photo-grade.png","title":"नामस्मरण\nआणि साधना","subtitle":"स्वतःशी पुन्हा जोडून घेण्यासाठी.","eyebrow":"एक शांत क्षण"},
      {"start":14.8,"end":19.4,"image":"devotional-marathi-bg.png","title":"एकत्र बसूया.","subtitle":"सत्संग • चिंतन • सहवास","eyebrow":"सत्संग संध्या"},
      {"start":19.4,"end":24,"image":"devotional-marathi-bg.png","title":"तारीख व स्थळ\nलवकरच","subtitle":"संकल्पना • Harsh Takalkar","eyebrow":"मनःशांतीचा सुंदर प्रवास"},
    ]
  },
  {
    "id":"hindi-satsang", "title":"Hindi Satsang — Ek Shaant Pal", "duration":24, "lang":"hi", "accent":(222,160,98),
    "footer":"हिंदी सत्संग  /  मोशन संकल्पना",
    "segments":[
      {"start":0,"end":4.6,"image":"devotional-hindi-bg.png","title":"मन की शांति,\nजीवन की रोशनी","subtitle":"हर दिन, भीतर लौटने का अवसर।","eyebrow":"एक शांत निमंत्रण"},
      {"start":4.6,"end":9.2,"image":"photo-grade.png","title":"ठहरिए।","subtitle":"एक गहरी साँस लीजिए।","eyebrow":"सुनिए • समझिए • अनुभव कीजिए"},
      {"start":9.2,"end":14.8,"image":"ai-art-study.png","title":"भजन • विचार\n• आत्मचिंतन","subtitle":"मन को एक शांत दिशा देने के लिए।","eyebrow":"सत्संग का भाव"},
      {"start":14.8,"end":19.4,"image":"devotional-hindi-bg.png","title":"सत्संग में\nमिलते हैं।","subtitle":"समय और स्थान शीघ्र घोषित होंगे।","eyebrow":"एक साथ, एक शांत क्षण"},
      {"start":19.4,"end":24,"image":"devotional-hindi-bg.png","title":"मन की शांति,\nजीवन की रोशनी","subtitle":"मोशन कॉन्सेप्ट • Harsh Takalkar","eyebrow":"सत्संग • साधना • आत्मचिंतन"},
    ]
  },
  {
    "id":"stillness-quote", "title":"Devotional Quote — Stillness Notes", "duration":18, "lang":"hi", "accent":(224,165,91),
    "footer":"मन के लिए  /  मोशन नोट",
    "segments":[
      {"start":0,"end":4.2,"image":"ai-art-study.png","title":"रुकिए।","subtitle":"एक गहरी साँस लें।","eyebrow":"एक पल अपने लिए"},
      {"start":4.2,"end":8.8,"image":"photo-grade.png","title":"भीतर भी एक\nआकाश है।","subtitle":"शोर से थोड़ा दूर।","eyebrow":"शांत मन • खुला आकाश"},
      {"start":8.8,"end":13.4,"image":"ai-concept.png","title":"अभी यहीं।","subtitle":"इस क्षण को महसूस कीजिए।","eyebrow":"ठहरिए • साँस लीजिए"},
      {"start":13.4,"end":18,"image":"ai-art-study.png","title":"Find a moment\nof stillness.","subtitle":"BE HERE. BREATHE. BEGIN.","eyebrow":"STILLNESS NOTES  /  01","latin":True},
    ]
  },
  {
    "id":"startup-reel", "title":"Startup Product — Focus, In Motion", "duration":20, "lang":"en", "accent":(197,108,79),
    "footer":"STARTUP PROMO  /  PRODUCT CONCEPT",
    "segments":[
      {"start":0,"end":4.5,"image":"startup-product.png","title":"MAKE SPACE\nFOR FOCUS.","subtitle":"A quieter workspace concept.","eyebrow":"A PRODUCT STORY  /  01","latin":True},
      {"start":4.5,"end":9,"image":"brand-study.png","title":"Capture it.","subtitle":"Good ideas happen between everything else.","eyebrow":"NOTICE THE MOMENT","latin":True},
      {"start":9,"end":14,"image":"startup-product.png","title":"Connect the dots.","subtitle":"Notes, people and next steps — in one flow.","eyebrow":"MAKE ROOM FOR CLARITY","latin":True},
      {"start":14,"end":20,"image":"cinematic-frame.png","title":"Keep moving.","subtitle":"A digital product campaign concept by Harsh Takalkar.","eyebrow":"DESIGNED FOR THE NEXT SMALL STEP","latin":True},
    ]
  },
]

def font(path, size):
    return ImageFont.truetype(str(path), size, layout_engine=ImageFont.Layout.RAQM)

def cover(im: Image.Image, size=(W,H), zoom=1.0, bias=(.5,.5)) -> Image.Image:
    sw,sh=im.size; tw,th=size
    scale=max(tw/sw,th/sh)*zoom
    nw,nh=round(sw*scale),round(sh*scale)
    im=im.resize((nw,nh),Image.Resampling.LANCZOS)
    cx=int(nw*bias[0]); cy=int(nh*bias[1])
    left=min(max(cx-tw//2,0),nw-tw); top=min(max(cy-th//2,0),nh-th)
    return im.crop((left,top,left+tw,top+th))

def source_canvas(src: Image.Image, progress: float, idx: int):
    src=src.convert("RGB")
    if src.width/src.height > .92:
        # Preserve landscape artwork as an editorial film frame over a softly blurred, local full-bleed backdrop.
        bg=cover(src, zoom=1.12, bias=(.45 + .08*progress,.52)).filter(ImageFilter.GaussianBlur(28))
        bg=ImageEnhance.Brightness(bg).enhance(.40)
        shade=Image.new("RGBA",(W,H),(15,18,17,72))
        bg=Image.alpha_composite(bg.convert("RGBA"),shade)
        ph=458
        pw=min(W,round(src.width*ph/src.height))
        fg=src.resize((pw,ph),Image.Resampling.LANCZOS)
        # Slow, restrained lateral drift gives the frame a gentle camera move.
        x=int((W-pw)//2 + math.sin(progress*math.pi*2 + idx*.65)*9)
        y=int(405 + math.sin(progress*math.pi*2+idx*.4)*9)
        # warm cinematic grade and a soft dark edge.
        fg=ImageEnhance.Color(fg).enhance(.89)
        bg.alpha_composite(fg.convert("RGBA"),(x,y))
        d=ImageDraw.Draw(bg,"RGBA")
        d.rectangle((max(0,x-2),y-2,min(W,x+pw+2),y+ph+2),outline=(241,229,203,185),width=2)
        canvas=bg
    else:
        # Vertical devotional artwork fills the frame and drifts slowly rather than sitting still.
        zoom=1.045+.035*progress
        canvas=cover(src,zoom=zoom,bias=(.49+.018*math.sin(progress*math.pi*2),.52+.012*math.cos(progress*math.pi*2)))
        canvas=canvas.convert("RGBA")
        # Warm tint / vignette for legible type and an intimate filmic finish.
        overlay=Image.new("RGBA",(W,H),(13,16,15,66))
        canvas=Image.alpha_composite(canvas,overlay)
    # Gradient veil and soft center spotlight for all backgrounds.
    canvas=Image.alpha_composite(canvas,GRADIENT)
    return Image.alpha_composite(canvas,SPOTLIGHT)

def draw_center(draw, y, text, fnt, fill, spacing=16):
    draw.multiline_text((W//2,y),text,font=fnt,fill=fill,anchor="mm",align="center",spacing=spacing,language="hi")

def fit_font(text, latin, base):
    candidate=font((FONT_SERIF if latin else FONT_DEV),base)
    maxw=620
    # reduce very long lines while maintaining title hierarchy
    while candidate.getbbox(text.replace("\n"," "))[2] > maxw and base > 43:
        base -= 2
        candidate=font((FONT_SERIF if latin else FONT_DEV),base)
    return candidate

def alpha_for(t, start, end):
    return max(0.0,min(1.0,(t-start)/.52,(end-t)/.52))

def make_frame(reel, t, cached):
    segs=reel["segments"]
    idx=max(i for i,s in enumerate(segs) if s["start"] <= t) if t >= segs[0]["start"] else 0
    seg=segs[idx]; dur=seg["end"]-seg["start"]
    progress=max(0,min(1,(t-seg["start"])/dur))
    bg=source_canvas(cached[seg["image"]],progress,idx)
    # Crossfade only the art at cut points, then reveal the following copy cleanly.
    if idx < len(segs)-1 and t > seg["end"]-.42:
        nxt=segs[idx+1]
        blend=(t-(seg["end"]-.42))/.42
        next_bg=source_canvas(cached[nxt["image"]],0,idx+1)
        bg=Image.blend(bg,next_bg,max(0,min(1,blend)))
    # Persistent editorial frame labels.
    d=ImageDraw.Draw(bg,"RGBA")
    accent=tuple(reel["accent"])+(255,)
    cream=(248,242,229,240)
    small=font(FONT_DEV if reel["lang"] in ("mr","hi") else FONT_LATIN,17)
    d.text((54,68),"HT  /  HARSH TAKALKAR",font=font(FONT_LATIN,15),fill=(248,242,229,210),anchor="lm")
    d.text((W-54,68),f"{idx+1:02d}  /  {len(segs):02d}",font=font(FONT_LATIN,14),fill=(248,242,229,190),anchor="rm")
    d.line((54,105,W-54,105),fill=(248,242,229,82),width=1)
    # Segmented progress underline.
    d.rounded_rectangle((54,H-62,W-54,H-57),radius=3,fill=(248,242,229,62))
    d.rounded_rectangle((54,H-62,54+int((W-108)*t/reel["duration"]),H-57),radius=3,fill=accent)
    bottom_font=font(FONT_DEV if reel["lang"] in ("mr","hi") else FONT_LATIN,16)
    d.text((54,H-88),reel["footer"],font=bottom_font,fill=(248,242,229,220),anchor="lm",language="hi")
    # Active typography is burned into the picture as open captions; the separate WebVTT track is also packaged.
    a=alpha_for(t,seg["start"],seg["end"])
    if a > 0:
        alpha=int(255*a)
        yshift=int((1-a)*20)
        latin=seg.get("latin",False)
        eyebrow_font=font(FONT_LATIN if latin else FONT_DEV,17 if not latin else 15)
        ey=seg.get("eyebrow","")
        if ey:
            d.text((W//2,412+yshift),ey,font=eyebrow_font,fill=tuple(reel["accent"])+(alpha,),anchor="mm",language="hi")
            d.line((W//2-24,446+yshift,W//2+24,446+yshift),fill=tuple(reel["accent"])+(alpha,),width=2)
        title=seg["title"]
        title_font=fit_font(title,latin,78 if not latin else 72)
        # center-title y avoids controls and the permanent header/footer.
        draw_center(d,590+yshift,title,title_font,(248,242,229,alpha),spacing=18)
        subtitle=seg.get("subtitle","")
        if subtitle:
            subfont=font(FONT_LATIN if latin else FONT_DEV,25 if not latin else 22)
            draw_center(d,790+yshift,subtitle,subfont,(242,233,215,alpha),spacing=10)
    return bg.convert("RGB")

def synth_audio(path: Path, duration: float, seed: int):
    sr=44100
    n=int(sr*duration)
    t=np.arange(n,dtype=np.float32)/sr
    # Gentle original ambient tones; two slow harmonic beds and very soft bell-like partials.
    if seed == 3:
        freqs=[196.0,246.94,293.66,392.0]
    elif seed == 4:
        freqs=[130.81,164.81,196.0,261.63]
    else:
        freqs=[146.83,196.0,220.0,293.66]
    phases=[0.0,.7,1.35,2.1]
    signal=np.zeros(n,dtype=np.float32)
    for i,(f,p) in enumerate(zip(freqs,phases)):
        mod=0.68+0.20*np.sin(2*np.pi*(.08+i*.017)*t+p)
        signal += (0.018/(i+1)**0.55)*np.sin(2*np.pi*f*t+p)*mod
        signal += (0.004/(i+1))*np.sin(2*np.pi*(f*2.01)*t+p*.4)*mod
    if seed==4:
        pulse=(np.sin(2*np.pi*1.45*t)>0.88).astype(np.float32)
        signal += 0.006*pulse*np.sin(2*np.pi*523.25*t)
    # Smooth attack/release, low noise bed and stereo width.
    attack=np.clip(t/1.8,0,1)
    release=np.clip((duration-t)/2.4,0,1)
    env=np.minimum(attack,release)
    signal*=env
    noise=np.random.default_rng(seed).normal(0,.00017,n).astype(np.float32)*env
    left=np.clip(signal+noise,-.15,.15); right=np.clip(signal*.94+np.roll(noise,113),-.15,.15)
    stereo=np.stack((left,right),axis=1)
    pcm=(stereo*32767).astype('<i2')
    with wave.open(str(path),'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())

def timestamp(sec):
    ms=round(sec*1000); h=ms//3600000; ms%=3600000; m=ms//60000; ms%=60000; s=ms//1000; ms%=1000
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"

def write_vtt(reel):
    lines=["WEBVTT","\n"]
    for s in reel["segments"]:
        st=s["start"]+.35; end=s["end"]-.15
        text=s["title"].replace("\\n","\n")
        sub=s.get("subtitle","")
        lines.append(f"{timestamp(st)} --> {timestamp(end)}")
        lines.append(text)
        if sub: lines.append(sub)
        lines.append("")
    (OUT / f"{reel['id']}.vtt").write_text("\n".join(lines),encoding="utf-8")

def make_reel(reel, seed):
    print(f"Rendering {reel['id']} ({reel['duration']}s)…", flush=True)
    # Cache original sources at full quality; animation crop is generated per shot.
    sources={s["image"]:Image.open(ASSETS/s["image"]).convert("RGB") for s in reel["segments"]}
    frame_count=int(reel["duration"]*FPS)
    OUT.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="harsh-reel-") as tmp:
        tmp=Path(tmp)
        for i in range(frame_count):
            t=i/FPS
            frame=make_frame(reel,t,sources)
            frame.save(tmp/f"frame_{i:05d}.jpg",quality=88,optimize=False,subsampling=0)
        synth_audio(tmp/"ambience.wav",reel["duration"],seed)
        output=OUT/f"{reel['id']}.mp4"
        cmd=["ffmpeg","-hide_banner","-loglevel","error","-y","-framerate",str(FPS),"-i",str(tmp/"frame_%05d.jpg"),"-i",str(tmp/"ambience.wav"),
             "-c:v","libx264","-preset","medium","-crf","25","-profile:v","main","-level","4.0","-pix_fmt","yuv420p",
             "-vf","format=yuv420p","-c:a","aac","-b:a","128k","-shortest","-movflags","+faststart",str(output)]
        subprocess.run(cmd,check=True)
    write_vtt(reel)
    # A separate poster frame from the finished reel is used by the HTML video player.
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-ss","1.2","-i",str(OUT/f"{reel['id']}.mp4"),"-frames:v","1","-q:v","2",str(OUT/f"{reel['id']}-poster.jpg")],check=True)
    print(f"  saved {output.stat().st_size/1024/1024:.2f} MB", flush=True)

if __name__=="__main__":
    OUT.mkdir(parents=True,exist_ok=True)
    for i,reel in enumerate(REELS,1):
        make_reel(reel,i)
    print("All reels rendered with H.264 video, AAC original ambient soundtrack, burned-in text and WebVTT captions.")
