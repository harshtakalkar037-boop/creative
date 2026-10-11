import { useState, useRef, useEffect } from "react";
import { AlertCircle, Download, Play } from "lucide-react";
import type { Reel } from "../data/portfolio";

type Props = {
  reel: Reel;
  index: number;
};

function formatBytesLabel(src: string): string | null {
  const sizes: Record<string, string> = {
    "video-edit-01.mp4": "11 MB · MP4 · H.264 · 1920×1080 · faststart",
    "video-edit-02.mp4": "21 MB · MP4 · H.264 · 1920×1080 · faststart",
    "video-edit-03.mp4": "14 MB · MP4 · H.264 · 1920×1080 · faststart",
    "video-edit-04.mp4": "17 MB · MP4 · H.264 · 1080×1920 · faststart",
    "video-edit-05.mp4": "11 MB · MP4 · H.264 · 1080×1920 · faststart",
    "video-edit-06.mp4": "16 MB · MP4 · H.264 · 1080×1920 · silent · faststart",
    "video-edit-07.mp4": "15 MB · MP4 · H.264 · 1080×1920 · 60fps · faststart",
    "marathi-satsang.mp4": "2.5 MB · MP4 · H.264",
    "hindi-satsang.mp4": "2.8 MB · MP4 · H.264",
    "stillness-quote.mp4": "2.7 MB · MP4 · H.264",
    "startup-reel.mp4": "1.6 MB · MP4 · H.264",
  };
  const key = src.split("/").pop() || "";
  return sizes[key] || null;
}

function needsTranscodingWarning(reel: Reel): string | null {
  const src = reel.src.toLowerCase();
  if (src.endsWith(".mov")) {
    return "This file is a MOV with HEVC (H.265) and a moov atom at the end — Chrome/Firefox cannot play it reliably. It has been transcoded to MP4/H.264 in this deployment (original preserved).";
  }
  if (reel.id === "uploaded-edit-06") {
    return "This edit has no audio track (silent). If audio was intended, re-export with AAC.";
  }
  return null;
}

function mimeTypeFor(src: string): string {
  if (src.toLowerCase().endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

export function VideoPlayer({ reel, index }: Props) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLargeUpload = reel.id.startsWith("uploaded-edit-");
  // Use preload none for large uploads to avoid bandwidth until user interacts
  const preload: "none" | "metadata" = isLargeUpload ? "none" : "metadata";
  const warning = needsTranscodingWarning(reel);
  const sizeLabel = formatBytesLabel(reel.src);
  const mime = mimeTypeFor(reel.src);

  // Respect the "do not autoplay multiple videos" rule: pause other videos when this plays
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => {
      document.querySelectorAll<HTMLVideoElement>("video.reel-video").forEach((other) => {
        if (other !== el && !other.paused) other.pause();
      });
    };
    el.addEventListener("play", onPlay);
    return () => el.removeEventListener("play", onPlay);
  }, []);

  const missingPoster = !reel.poster;

  return (
    <article className={`reel-card reveal ${index % 2 ? "reel-card-reverse" : ""}`}>
      <div className="reel-screen">
        {/* Keep 9:16 container for concept reels, but allow contain so landscape uploads letterbox rather than crop */}
        <video
          ref={videoRef}
          className="reel-video"
          controls
          playsInline
          preload={preload}
          poster={reel.poster}
          aria-label={`${reel.label} — ${reel.title}`}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          // Do not autoplay
          // Provide playback rate control natively
        >
          <source src={reel.src} type={mime} />
          {reel.captions && (
            <track
              kind="captions"
              src={reel.captions}
              srcLang={reel.language.includes("Marathi") ? "mr" : reel.language.includes("Hindi") ? "hi" : "en"}
              label={`${reel.language} captions`}
            />
          )}
          Your browser does not support this video.{" "}
          <a href={reel.src} download>
            Download the video instead.
          </a>
        </video>

        {/* Fallback placeholder when no poster is supplied */}
        {missingPoster && !isLoaded && !hasError && (
          <div className="video-poster-placeholder" aria-hidden="true">
            <span className="video-placeholder-icon">
              <Play size={18} />
            </span>
            <span className="video-placeholder-text">
              <b>{reel.title}</b>
              <small>No poster frame yet — poster generates on import. Play to preview.</small>
            </span>
          </div>
        )}

        <span className="reel-format">{reel.format}</span>
        {sizeLabel && <span className="reel-size">{sizeLabel}</span>}
      </div>

      <div className="reel-copy">
        <div className="reel-topline">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {reel.label}
          </span>
          <span className="reel-duration">{reel.duration}</span>
        </div>
        <h3>{reel.title}</h3>
        <p>{reel.description}</p>
        <ul className="reel-notes">
          {reel.editNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        {hasError && (
          <div className="video-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" />
            <div>
              <b>Playback failed in this browser.</b>
              <p>
                This file is delivered as <code>{mime}</code>. {warning ? warning + " " : ""}Use the download link below to view the original. For
                best compatibility, these uploads should be transcoded to <code>MP4 (H.264 + AAC, yuv420p, faststart)</code>.
              </p>
              <a className="text-link" href={reel.src} download>
                <Download size={14} aria-hidden="true" /> Download original ({reel.src.split("/").pop()})
              </a>
            </div>
          </div>
        )}

        {warning && !hasError && (
          <div className="video-warning">
            <AlertCircle size={14} aria-hidden="true" />
            <p>{warning}</p>
          </div>
        )}

        <div className="reel-bottomline">
          <span>
            {reel.id.startsWith("uploaded-edit-")
              ? "Uploaded final edit — original work. Details to be confirmed if needed."
              : "Self-initiated concept — not a client commission."}
          </span>
          <a className="text-link" href={reel.src} download>
            Download video <Download size={13} aria-hidden="true" />
          </a>
        </div>

        <div className="video-meta-line">
          <small>
            Source: <code>{reel.src}</code> · MIME: <code>{mime}</code> · preload: <code>{preload}</code> · poster:{" "}
            <code>{reel.poster || "none yet"}</code>
          </small>
        </div>
      </div>
    </article>
  );
}
