import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/portfolio";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: Props) {
  return (
    <button
      className={`project-card reveal ${project.layout ?? "standard"}`}
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      aria-label={`Read project details: ${project.title}`}
    >
      <span className="project-image-wrap">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-open" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
        <span className="project-type">{project.label}</span>
      </span>
      <span className="project-meta">
        <span>
          <span className="project-category">{project.category}</span>
          <span className="project-title">{project.title}</span>
        </span>
        <span className="project-description">{project.description}</span>
      </span>
    </button>
  );
}
