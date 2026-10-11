import { useEffect, useRef } from "react";
import { ArrowUpRight, Download, X } from "lucide-react";
import type { Project } from "../data/portfolio";

type Props = { project: Project | null; onClose: () => void };

export function ProjectDialog({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(".project-dialog");
        const focusable = dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = priorOverflow;
      previous?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description">
        <button className="dialog-close" ref={closeRef} type="button" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
        <div className="dialog-image">
          <img src={project.image} alt={project.imageAlt} />
          <span className="dialog-image-note">{project.label} <span aria-hidden="true">/</span> selected work</span>
        </div>
        <div className="dialog-copy">
          <span className="eyebrow"><span className="eyebrow-dot" />{project.category}</span>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p className="dialog-lede" id="project-dialog-description">{project.description}</p>
          <p className="dialog-detail">{project.detail}</p>
          <div className="dialog-actions">
            <a className="text-link" href={project.image} download>
              <Download size={16} strokeWidth={1.8} aria-hidden="true" /> Download visual
            </a>
            <a className="text-link" href="mailto:harshtakalkar037@gmail.com?subject=Portfolio%20project%20enquiry">
              Discuss a similar project <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
          <span className="dialog-footnote">Concept work is labelled clearly. No client, performance or launch claims are implied.</span>
        </div>
      </section>
    </div>
  );
}
