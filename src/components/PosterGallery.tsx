import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Download, X } from "lucide-react";
import { posters, type Poster } from "../data/portfolio";

type Props = {
  categories: Poster["category"][];
  galleryId: string;
};

export function PosterGallery({ categories, galleryId }: Props) {
  const [filter, setFilter] = useState<"All" | Poster["category"]>("All");
  const [active, setActive] = useState<Poster | null>(null);
  const isOpen = Boolean(active);
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = posters.filter((poster) => categories.includes(poster.category));
  const visibleItems = filter === "All" ? items : items.filter((poster) => poster.category === filter);
  const filters = ["All", ...categories] as const;
  const activeIndex = active ? visibleItems.findIndex((item) => item.id === active.id) : -1;

  const close = useCallback(() => setActive(null), []);
  const showRelative = useCallback((offset: number) => {
    if (activeIndex < 0 || !visibleItems.length) return;
    const next = (activeIndex + offset + visibleItems.length) % visibleItems.length;
    setActive(visibleItems[next]);
  }, [activeIndex, visibleItems]);
  const showRelativeRef = useRef(showRelative);
  useEffect(() => { showRelativeRef.current = showRelative; }, [showRelative]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showRelativeRef.current(-1);
      if (event.key === "ArrowRight") showRelativeRef.current(1);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(".poster-lightbox");
        const nodes = dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!nodes?.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = priorOverflow;
      previous?.focus();
    };
  }, [isOpen, close]);

  return (
    <div className="poster-gallery" id={galleryId}>
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="Filter poster gallery">
          {filters.map((item) => (
            <button
              type="button"
              className={`filter-chip ${filter === item ? "is-active" : ""}`}
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >{item === "All" ? "All work" : item}</button>
          ))}
        </div>
        <span className="gallery-count">{visibleItems.length.toString().padStart(2, "0")} visuals</span>
      </div>
      <div className="poster-grid">
        {visibleItems.map((poster, index) => (
          <button
            className={`poster-card ${index % 5 === 1 ? "poster-card-offset" : ""}`}
            key={poster.id}
            type="button"
            onClick={() => setActive(poster)}
            aria-haspopup="dialog"
            aria-label={`Preview ${poster.title}, ${poster.category} concept`}
          >
            <span className="poster-image-wrap">
              <img src={poster.image} alt="" loading="lazy" width="1080" height="1350" />
              <span className="poster-view">View artwork <span aria-hidden="true">↗</span></span>
            </span>
            <span className="poster-caption">
              <span><span className="poster-title">{poster.title}</span><span className="poster-meta">{poster.language} · {poster.category} concept</span></span>
              <span className="poster-index">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </button>
        ))}
      </div>
      {active && (
        <div className="lightbox-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section className="poster-lightbox" role="dialog" aria-modal="true" aria-labelledby="poster-lightbox-title" aria-describedby="poster-lightbox-description">
            <button className="lightbox-close" ref={closeRef} type="button" onClick={close} aria-label="Close artwork preview"><X size={20} /></button>
            <div className="lightbox-art"><img src={active.image} alt={`${active.title} — ${active.description}`} /></div>
            <div className="lightbox-info">
              <span className="eyebrow"><span className="eyebrow-dot" />{active.category} · {active.language}</span>
              <h2 id="poster-lightbox-title">{active.title}</h2>
              <p id="poster-lightbox-description">{active.description}</p>
              <p className="lightbox-note">An original portfolio concept. All copy is typeset separately from the generated background artwork for accurate Devanagari rendering.</p>
              <a className="button button-dark download-button" href={active.image} download>
                <Download size={16} aria-hidden="true" /> Download 1080 × 1350 <span className="button-arrow" aria-hidden="true">↗</span>
              </a>
              <div className="lightbox-navigation">
                <button type="button" onClick={() => showRelative(-1)} aria-label="Previous artwork"><ArrowLeft size={17} /> Previous</button>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => showRelative(1)} aria-label="Next artwork">Next <ArrowRight size={17} /></button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
