import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { ProjectDialog } from "./components/ProjectDialog";
import {
  AboutSection,
  AchievementsSection,
  AIArtSection,
  AIPracticeSection,
  ContactSection,
  DesignSection,
  DevotionalSection,
  HeroSection,
  PhotoSection,
  ProductsSection,
  SelectedWorkSection,
  SiteFooter,
  SkillsSection,
  VideoSection,
} from "./sections/PortfolioSections";
import type { Project } from "./data/portfolio";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <SelectedWorkSection onOpen={setActiveProject} />
        {/* Video comes immediately after Selected Work to prioritize your 7 original final edits */}
        <VideoSection />
        <DevotionalSection />
        <DesignSection />
        <PhotoSection />
        <AIArtSection />
        <ProductsSection />
        <AIPracticeSection />
        <SkillsSection />
        <AchievementsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectDialog project={activeProject} onClose={closeProject} />
    </>
  );
}
