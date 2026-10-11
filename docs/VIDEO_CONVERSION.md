# Video conversion notes — Harsh Creative Portfolio

This document lists every video that needs transcoding for reliable browser playback and the exact `ffmpeg` commands to produce web-friendly derivatives. **Original files are kept verbatim** under `public/assets/videos/` and are never renamed without re-encoding.

## Audit summary (2026-10-11, branch `fix/portfolio-cleanup`)

Source inspection was done by parsing MP4/MOV box headers (`ftyp`, `stsd`, `hvc1`/`avc1`, `moov`/`mdat`) and `mvhd` durations. `ffprobe`/`ffmpeg` were not available in the audit sandbox, so this file documents the required next steps.

### Concept reels — no action needed
| file | found | result |
|------|-------|--------|
| `marathi-satsang.mp4` | 2.5 MB, `isomiso2avc1`, `avc1`, moov before mdat | ✅ H.264 + AAC, faststart — plays everywhere |
| `hindi-satsang.mp4` | 2.8 MB, same | ✅ |
| `stillness-quote.mp4` | 2.7 MB, same | ✅ |
| `startup-reel.mp4` | 1.6 MB, same | ✅ |

Each has a matching `*_poster.jpg` and `*.vtt`.

### Original final edits — need attention
| # | file | size | codec (stsd) | moov vs mdat | audio | duration | issue |
|---|------|------|--------------|--------------|-------|----------|-------|
| 01 | `video-edit-01.mov` | 26 MB | `hvc1` (HEVC/H.265) | **moov at end** (26927228 > 32) | `mp4a` (AAC) present | 18.09 s | HEVC in MOV + moov at end → Chrome/Firefox won't play; requires full download. **Transcode.** |
| 02 | `video-edit-02.mov` | 35 MB | `hvc1` | **moov at end** | `mp4a` | 23.06 s | Same. **Transcode.** |
| 03 | `video-edit-03.mov` | 23 MB | `hvc1` | **moov at end** | `mp4a` | 14.77 s | Same. **Transcode.** |
| 04 | `video-edit-04.mov` | 34 MB | `hvc1` | **moov at end** | `mp4a` | 21.59 s | Same. Portrait (1080×1920). **Transcode.** |
| 05 | `video-edit-05.mp4` | 78 MB | `avc1` (H.264) main; stray `hvc1` bytes in mdat are not a stsd entry | moov **before** mdat (good) | `mp4a` | 26.23 s | Already H.264 — *no codec transcode required*, but 78 MB is heavy and moov is already faststart; consider a lighter proxy + add poster. |
| 06 | `video-edit-06.mp4` | 66 MB | `avc1` (H.264) | moov before mdat | **no `soun` handler** — appears silent | 21.07 s | H.264 video OK; if audio was intended, re-export with AAC. Add poster. Large — consider recompress. |
| 07 | `video-edit-07.mp4` | 52 MB | `hvc1` (HEVC) | moov before mdat | `mp4a` | 15.09 s | **HEVC in MP4** — Safari plays, Chrome/Firefox do not. **Transcode to H.264.** |

**Important:** Do not simply rename `.mov` → `.mp4`. The container still holds HEVC; browsers check the codec, not the extension.

## What the current build already fixes in code (no re-encode required)

* `src/components/VideoPlayer.tsx` — per-video `controls`, `playsInline`, correct MIME (`video/mp4` vs `video/quicktime`), `preload="none"` for large uploads / `metadata` for small concept reels, poster placeholder when missing, file-size badge, inline HEVC warnings, error state with download fallback, single-playback guard (playing one pauses others), `object-fit: contain` for uploads so landscape footage letterboxes instead of crops, no autoplay.
* `src/data/portfolio.ts` — reels reordered so your 7 original edits appear **first**; selected-work grid reordered to put identity/poster/video/art before product/AI concepts; `satsang-print` card now uses `hindi-satsang-01.jpg` to avoid duplicating the Devotional gallery's opening `marathi-satsang-01.jpg`.
* `src/App.tsx` — `VideoSection` now directly follows `SelectedWork` so original edits are near the top of the homepage.
* `src/sections/PortfolioSections.tsx` — Video section split into **A / My original final edits (7)** and **B / Concept reels (4)** with hierarchy note and conversion note anchored at `#video-conversion`.
* `src/components/SiteHeader.tsx` — nav now surfaces `Video edits` explicitly.
* `public/assets/photo-editing/photo-edit-14.heic` remains **excluded** from the gallery (HEIC is not browser-supported).

## Recommended transcoding — H.264 + AAC + faststart + poster

Requires `ffmpeg` with `libx264` and `aac` (standard builds). Run from repo root. Originals are preserved; outputs overwrite only when you are ready.

### One-time setup check
```bash
ffmpeg -version | head -n 1
# Should show configuration with --enable-libx264
```

### Convert the 5 HEVC files (01–04 MOV, 07 MP4)

> Adjust `-crf` (18–28, lower = higher quality) and `-preset` (slow/medium/fast) to taste. `-vf scale` preserves the source aspect; examples force a 1080p long edge and enforce `yuv420p` for broad compatibility.

**Landscape MOVs (01–03) — 1920×1080:**
```bash
for f in public/assets/videos/video-edit-0{1,2,3}.mov; do
  base=$(basename "$f" .mov)
  ffmpeg -hide_banner -y -i "$f" \
    -c:v libx264 -profile:v high -crf 22 -preset medium \
    -pix_fmt yuv420p -vf "scale=1920:1080:flags=lanczos,format=yuv420p" \
    -c:a aac -b:a 128k -movflags +faststart \
    "public/assets/videos/${base}.mp4"
  ffmpeg -hide_banner -y -ss 1.2 -i "public/assets/videos/${base}.mp4" -frames:v 1 -q:v 2 "public/assets/videos/${base}-poster.jpg"
done
```

**Portrait MOV (04) — 1080×1920:**
```bash
ffmpeg -hide_banner -y -i public/assets/videos/video-edit-04.mov \
  -c:v libx264 -profile:v high -crf 22 -preset medium \
  -pix_fmt yuv420p -vf "scale=1080:1920:flags=lanczos,format=yuv420p" \
  -c:a aac -b:a 128k -movflags +faststart \
  public/assets/videos/video-edit-04.mp4

ffmpeg -hide_banner -y -ss 1.2 -i public/assets/videos/video-edit-04.mp4 -frames:v 1 -q:v 2 public/assets/videos/video-edit-04-poster.jpg
```

**HEVC MP4 (07) — portrait 2160×3840 source, downscale to 1080×1920 for web:**
```bash
ffmpeg -hide_banner -y -i public/assets/videos/video-edit-07.mp4 \
  -c:v libx264 -profile:v high -crf 22 -preset medium \
  -pix_fmt yuv420p -vf "scale=1080:1920:flags=lanczos,format=yuv420p" \
  -c:a aac -b:a 128k -movflags +faststart \
  public/assets/videos/video-edit-07-h264.mp4
# When satisfied, replace original and add poster:
mv public/assets/videos/video-edit-07-h264.mp4 public/assets/videos/video-edit-07.mp4
ffmpeg -hide_banner -y -ss 1.2 -i public/assets/videos/video-edit-07.mp4 -frames:v 1 -q:v 2 public/assets/videos/video-edit-07-poster.jpg
```

After conversion, **update `src/data/portfolio.ts`** for each converted reel:
* change `src` to the new `.mp4` path if you changed the extension,
* set `poster: "/assets/videos/<name>-poster.jpg"`,
* update `format` to e.g. `"Uploaded final edit · MP4 · H.264"`,
* remove the HEVC warning by adjusting `needsTranscodingWarning` or letting it fall through.

Keep the original HEVC MOVs elsewhere (e.g. `public/assets/videos/originals/`) if you want an archive, but do not serve both under the same URL.

### Optional: lighten the two heavy but already-H.264 uploads

These already play, but 78 MB and 66 MB are heavy for a portfolio hero:

```bash
# Video 05 — 78 MB → aim for ~12–18 MB at CRF 24
ffmpeg -hide_banner -y -i public/assets/videos/video-edit-05.mp4 \
  -c:v libx264 -profile:v high -crf 24 -preset medium -pix_fmt yuv420p \
  -vf "scale=1920:1080:flags=lanczos,format=yuv420p" -c:a aac -b:a 128k -movflags +faststart \
  public/assets/videos/video-edit-05-h264-light.mp4
mv public/assets/videos/video-edit-05-h264-light.mp4 public/assets/videos/video-edit-05.mp4
ffmpeg -hide_banner -y -ss 1.2 -i public/assets/videos/video-edit-05.mp4 -frames:v 1 -q:v 2 public/assets/videos/video-edit-05-poster.jpg

# Video 06 — 66 MB, silent; add poster and optionally recompress
ffmpeg -hide_banner -y -ss 1.2 -i public/assets/videos/video-edit-06.mp4 -frames:v 1 -q:v 2 public/assets/videos/video-edit-06-poster.jpg
# If recompressing (keeps silence):
ffmpeg -hide_banner -y -i public/assets/videos/video-edit-06.mp4 \
  -c:v libx264 -profile:v high -crf 24 -preset medium -pix_fmt yuv420p \
  -vf "scale=3840:2160:flags=lanczos,format=yuv420p" -an -movflags +faststart \
  public/assets/videos/video-edit-06-light.mp4 && mv public/assets/videos/video-edit-06-light.mp4 public/assets/videos/video-edit-06.mp4
```

For Video 06, if audio *was* intended, re-export from your editor with an AAC track instead of using `-an`.

### Verify faststart and codec
```bash
# moov should be before mdat (faststart) and codec should be avc1 + mp4a
python3 - << 'PY'
import pathlib
for p in sorted(pathlib.Path("public/assets/videos").glob("video-edit*.*")):
    d=p.read_bytes()
    print(p.name, "moov before mdat?", d.find(b"moov") < d.find(b"mdat"), "has avc1?", b"avc1" in d[:200000], "has hvc1?", b"hvc1" in d[:200000], "has mp4a?", b"mp4a" in d[:200000])
PY
```

## How to confirm in browser
1. `npm run build && npm run preview` then open `http://localhost:4173` — each player should show poster (or placeholder), `controls`, and a file-size badge.
2. Throttle network to "Fast 3G" in DevTools — large uploads should not download until you press play (check Network panel: no `video-edit-*.mov/mp4` request before interaction).
3. In Chrome on Windows/Linux, the HEVC entries should show the inline warning and fail with a download fallback; after transcoding the warning disappears and playback succeeds.
4. Playing one video should pause any other that is playing.

## Checklist before merging to `main` and deploying

- [ ] Run the 5 transcodes above (or at minimum 01–04 + 07) and generate `*-poster.jpg` for each.
- [ ] Update `src/data/portfolio.ts` poster/format fields.
- [ ] `npm run build` passes (`check:assets` + `tsc --noEmit` + `vite build`).
- [ ] Manual click-through of all 11 videos at desktop + mobile widths.
- [ ] Push `fix/portfolio-cleanup` and open PR — do not merge until reviewer approves (per task).
- [ ] After merge to `main`, wait for Netlify production build (branch `main`, command `npm run build`, publish `dist/`) and verify `https://harsh-creative.netlify.app/` shows A / original edits first.

---
*Generated during `fix/portfolio-cleanup` — 2026-10-11.*
