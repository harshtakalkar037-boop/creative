import { useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, MoveUpRight, Sparkles } from "lucide-react";
import { digitalProjects, reels, selectedWork, skillGroups, achievements, type DigitalProject, type Project } from "../data/portfolio";
import { PosterGallery } from "../components/PosterGallery";
import { ProjectCard } from "../components/ProjectCard";
import { VideoPlayer } from "../components/VideoPlayer";

function SectionIntro({
  number, eyebrow, title, description, headingId, dark = false,
}: { number: string; eyebrow: string; title: string; description?: string; headingId: string; dark?: boolean }) {
  return (
    <div className={`section-intro reveal ${dark ? "section-intro-dark" : ""}`}>
      <div className="section-intro-top"><span className="section-index">{number} /</span><span className="section-eyebrow">{eyebrow}</span></div>
      <h2 id={headingId}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" />Video editing <span aria-hidden="true">×</span> Poster & Graphic design <span aria-hidden="true">×</span> Photo editing</p>
        <h1 className="hero-title" id="hero-title">Original edits.<br /><em>Considered design.</em><br /><span>Work that stays with you.</span></h1>
        <p className="hero-lede">I’m Harsh — video editor and visual designer. I cut rhythm-driven edits, design Marathi/Hindi devotional and campaign posters, grade photographs, and explore product and AI interfaces with the same attention to story and craft. <strong>Original creative work first — technical explorations further down.</strong></p>
        <div className="hero-actions">
          <a className="button button-dark" href="#video">Watch my edits <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="button button-quiet" href="#work">View selected work <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="hero-note"><span className="hero-note-line" /><span>7 original final edits prioritized — concept reels and technical work follow.</span></div>
      </div>
      <figure className="hero-visual reveal">
        <img src="/assets/hero-studio.png" alt="A cinematic creative workspace with a camera, laptop, contact sheets and warm studio light" fetchPriority="high" />
        <span className="hero-visual-index">01 <span>/</span> FIELD NOTES</span>
        <figcaption><span>Video · Posters · Graphics · Photo</span><span>Original work / 2026</span></figcaption>
        <span className="hero-stamp" aria-hidden="true">HT<br />—</span>
      </figure>
      <div className="hero-footer"><span>Original edits <i /> Poster systems <i /> Graphic campaigns</span><a href="#work" aria-label="Scroll to selected work">Scroll to explore <ArrowDownRight size={15} aria-hidden="true" /></a></div>
    </section>
  );
}

export function SelectedWorkSection({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section className="section selected-work" id="work" aria-labelledby="work-heading">
      <div className="wrap">
        <SectionIntro number="01" eyebrow="Original work, first" title="Selected work" headingId="work-heading" description="My strongest original work leads: poster systems, video, identity and art direction. Digital-product and assistive-AI concepts follow after. Everything is labelled as concept work where appropriate — no client commissions are implied." />
        <div className="project-grid">
          {selectedWork.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}
        </div>
        <div className="section-tail"><span>Creative work first — technical exploration after. Each card opens detail and download.</span><a className="text-link" href="#video">Watch the 7 original edits <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}

export function DevotionalSection() {
  return (
    <section className="section devotional-section" id="satsang" aria-labelledby="satsang-heading">
      <div className="wrap">
        <SectionIntro number="02" eyebrow="Devotional design" title="A little stillness, in print." headingId="satsang-heading" description="Satsang is one part of my creative practice—not the whole portfolio. These Marathi and Hindi poster, quote and event concepts use original visual backgrounds with accurately typeset Devanagari." />
        <div className="devotional-note reveal"><span className="devotional-note-mark" aria-hidden="true">“</span><p>Quiet should feel designed, not decorated.</p><span className="devotional-note-credit">ART DIRECTION PRINCIPLE / 01</span></div>
        <PosterGallery categories={["Marathi", "Hindi", "Quotes", "Events"]} galleryId="devotional-gallery" />
        <p className="concept-note">All event dates and venues are intentionally left unannounced. Every visual in this gallery is a self-initiated portfolio concept.</p>
      </div>
    </section>
  );
}

export function VideoSection() {
  const originalEdits = reels.filter((r) => r.id.startsWith("uploaded-edit-"));
  const conceptReels = reels.filter((r) => !r.id.startsWith("uploaded-edit-"));
  return (
    <section className="section video-section" id="video" aria-labelledby="video-heading">
      <div className="wrap">
        <SectionIntro number="03" eyebrow="Motion & editing — your work first" title="Original edits, cut with intent." headingId="video-heading" description="Your 7 original final edits lead this section — each playable with native controls, playsInline, and a download fallback. Concept reels follow after, clearly separated. Titles for the 7 uploads stay neutral (Video edit 01–07) until you confirm specific titles; no client or campaign is invented." />

        <div className="video-hierarchy-note reveal">
          <span className="eyebrow"><span className="eyebrow-dot" />How this section is ordered</span>
          <p><strong>First:</strong> 7 original final edits you supplied (MOV/MP4, 15–26s, up to 78 MB). <strong>Then:</strong> 4 self-initiated concept reels (2.5 MB avg, with open + WebVTT captions). Large originals use <code>preload="none"</code> to avoid downloading until you press play; concept reels use <code>preload="metadata"</code>.</p>
        </div>

        <div className="reel-group">
          <div className="reel-group-header">
            <h3><span className="reel-group-index">A /</span> My original final edits — 7 videos</h3>
            <span className="reel-group-meta">Prioritized · Original work · Neutral titles until confirmed</span>
          </div>
          <div className="reel-list">
            {originalEdits.map((reel, index) => (
              <VideoPlayer key={reel.id} reel={reel} index={index} />
            ))}
          </div>
          <div className="video-group-note">
            <p>Heads-up: MOV files and the HEVC (H.265) MP4 need transcoding for reliable Chrome/Firefox playback. See the inline warnings on each player and <a href="#video-conversion">conversion notes below</a>. Original files are preserved untouched.</p>
          </div>
        </div>

        <div className="reel-group reel-group-concept">
          <div className="reel-group-header">
            <h3><span className="reel-group-index">B /</span> Concept reels — 4 motion studies</h3>
            <span className="reel-group-meta">Self-initiated · Not client work · H.264 + AAC + WebVTT</span>
          </div>
          <div className="reel-list">
            {conceptReels.map((reel, index) => (
              <VideoPlayer key={reel.id} reel={reel} index={index} />
            ))}
          </div>
          <p className="concept-note">Each concept reel includes a separate WebVTT caption track (Marathi/Hindi/English) plus burned-in open captions. Open captions are part of the picture; the captions menu is available in compatible players.</p>
        </div>

        <div id="video-conversion" className="video-conversion-note reveal">
          <h4>Video playback & conversion note</h4>
          <p><strong>What was found:</strong> 4 MOV files (<code>video-edit-01.mov</code>–<code>04.mov</code>) are HEVC (hvc1) with the moov atom after mdat (requires full download before playback) — many browsers cannot play HEVC in MOV. <code>video-edit-07.mp4</code> is also HEVC. <code>video-edit-06.mp4</code> has no audio track. All uploads are large (23–78 MB) and have no poster frames.</p>
          <p><strong>What this build fixes in code:</strong> dedicated <code>VideoPlayer</code> with <code>controls</code>, <code>playsInline</code>, correct MIME types (<code>video/mp4</code> / <code>video/quicktime</code>), <code>preload="none"</code> for large uploads, single-playback guard (playing one pauses others), poster placeholder, file-size badges, inline HEVC warnings, and an error state with download fallback. Videos are not autoplayed and do not play simultaneously. Aspect is preserved with <code>object-fit: contain</code> on uploads so landscape footage letterboxes rather than crops.</p>
          <p><strong>What still needs your action (ffmpeg):</strong> Transcode the 5 HEVC files to <code>H.264 (AVC, yuv420p) + AAC</code> MP4 with <code>-movflags +faststart</code> for progressive streaming. See <code>docs/VIDEO_CONVERSION.md</code> for exact commands. Poster frames can be generated at the same time (<code>-ss 1.2 -frames:v 1</code>).</p>
          <p className="tiny-note">No file was renamed from .mov to .mp4 without re-encoding. Originals are kept verbatim under <code>public/assets/videos/</code>.</p>
        </div>
      </div>
    </section>
  );
}

export function DesignSection() {
  return (
    <section className="section design-section" id="design" aria-labelledby="design-heading">
      <div className="wrap">
        <SectionIntro number="04" eyebrow="Graphic design" title="Systems, not just single posts." headingId="design-heading" description="A brand-study direction, campaign graphics and carousel covers—built around a clear visual language and purposeful typography." />
        <div className="identity-feature reveal">
          <div className="identity-image"><img src="/assets/brand-study.png" alt="Original brand identity study: warm paper stationery, charcoal card and terracotta geometric shapes" loading="lazy" /><span className="identity-image-caption">UNNAMED IDENTITY STUDY / SELF-INITIATED</span></div>
          <div className="identity-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />Visual identity experiment</span>
            <h3>Warm materials.<br /><em>Clear signals.</em></h3>
            <p>An original, unnamed concept identity exploring how a restrained palette, tactile surfaces and a simple geometric mark can travel across stationery, packaging and digital campaigns.</p>
            <div className="swatch-row" aria-label="Concept color palette">
              <span style={{ background: "#f3efe6" }}><small>Paper</small></span><span style={{ background: "#292b28" }}><small>Ink</small></span><span style={{ background: "#bc7255" }}><small>Clay</small></span><span style={{ background: "#d3a15f" }}><small>Ochre</small></span>
            </div>
            <a className="text-link" href="#design-gallery">Browse campaign concepts <ArrowDownRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="campaign-heading" id="design-gallery"><div><span className="eyebrow"><span className="eyebrow-dot" />Campaign & social</span><h3>Make the message<br /><em>easy to remember.</em></h3></div><p>Promotional poster concepts and carousel covers for digital products. Each one is clearly presented as an exploration rather than a client launch.</p></div>
        <PosterGallery categories={["Product", "Carousel", "Graphics", "Poster Studies"]} galleryId="campaign-gallery" />
      </div>
    </section>
  );
}

export function PhotoSection() {
  const [compare, setCompare] = useState(50);
  return (
    <section className="section photo-section" id="photo" aria-labelledby="photo-heading">
      <div className="wrap">
        <SectionIntro number="05" eyebrow="Photo editing & colour" title="The feeling lives in the finish." headingId="photo-heading" description="A concept look-development study using an original generated landscape: a flatter source treatment against a warmer, more dimensional grade." />
        <div className="grade-layout reveal">
          <div className="grade-visual">
            <div className="grade-stage" style={{ "--compare": `${compare}%` } as CSSProperties}>
              <img className="grade-before" src="/assets/photo-grade-before.jpg" alt="Muted, cool source treatment of a monsoon landscape" loading="lazy" />
              <img className="grade-after" src="/assets/photo-grade-after.jpg" alt="Warm editorial colour grade applied to the same landscape" loading="lazy" />
              <span className="grade-label grade-label-before">Before <i>· concept source</i></span><span className="grade-label grade-label-after">After <i>· warm grade</i></span>
              <span className="grade-divider" aria-hidden="true" />
              <input className="compare-range" type="range" min="8" max="92" value={compare} onChange={(event) => setCompare(Number(event.target.value))} aria-label="Before and after image comparison" aria-valuetext={`After treatment visible from ${compare} percent across the image`} />
            </div>
            <div className="grade-range-meta"><span>Source treatment</span><span>Drag to compare</span><span>Final grade</span></div>
          </div>
          <div className="grade-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />Color & retouching study</span>
            <h3>From atmosphere<br />to <em>intention.</em></h3>
            <p>The comparison is built from two locally stored image treatments—no external images, filters or services. A restrained lift in warmth and contrast gives the frame a softer, more editorial finish.</p>
            <div className="finish-list"><span><b>01</b> Tone & contrast</span><span><b>02</b> Warmth & highlight balance</span><span><b>03</b> Product-image direction</span></div>
            <p className="small-note">Self-initiated concept study. It is not presented as client retouching or a documentary before/after.</p>
          </div>
        </div>
        <div className="photo-extra-gallery">
          <span className="eyebrow"><span className="eyebrow-dot" />Additional photo work</span>
          <h3>More image studies.</h3>
          <p className="small-note">Additional uploaded images are shown as studies; filenames are normalized and no unverified before/after claims are made.</p>
          <PosterGallery categories={["Photo Editing"]} galleryId="photo-editing-gallery" />
        </div>
      </div>
    </section>
  );
}

const artStudies = [
  { title: "Aperture / attention", image: "/assets/ai-art-study.png", alt: "Amber glass discs and paper relief create an abstract aperture on charcoal", kind: "AI art direction" },
  { title: "Contours of a signal", image: "/assets/ai-concept.png", alt: "Layered ivory and saffron paper contours converge around a fine copper thread", kind: "Perception study" },
  { title: "A quieter landscape", image: "/assets/devotional-marathi-bg.png", alt: "Mist across a lake and a small temple silhouette in warm dawn light", kind: "Atmosphere study" },
];

export function AIArtSection() {
  return (
    <section className="section ai-art-section" id="ai-art" aria-labelledby="ai-art-heading">
      <div className="wrap">
        <SectionIntro number="06" eyebrow="AI-generated art" title="A prompt is only the first frame." headingId="ai-art-heading" description="Original generated imagery, then art-directed through palette, crop and context. These are visual concepts—not photographs of physical installations." />
        <div className="art-grid">
          {artStudies.map((study, index) => (
            <figure className={`art-card reveal art-card-${index + 1}`} key={study.title}>
              <div className="art-image"><img src={study.image} alt={study.alt} loading="lazy" /><span className="art-index">0{index + 1}</span></div>
              <figcaption><span><span className="art-kind">{study.kind}</span><span className="art-title">{study.title}</span></span><Sparkles size={17} strokeWidth={1.5} aria-label="AI-generated visual concept" /></figcaption>
            </figure>
          ))}
        </div>
        <div className="art-footnote"><span>Generated assets are stored locally in the project.</span><span>Art direction / Harsh Takalkar</span></div>
      </div>
    </section>
  );
}

function DigitalProjectCard({ project, index }: { project: DigitalProject; index: number }) {
  return (
    <article className={`digital-card reveal digital-card-${index + 1}`}>
      <div className="digital-image"><img src={project.image} alt={`${project.title} — ${project.focus} interface concept preview`} loading="lazy" /><span className="digital-number">0{index + 1}</span></div>
      <div className="digital-info">
        <div className="digital-overline"><span>{project.focus}</span><span>{project.status}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <details className="project-notes"><summary>Project notes <ArrowDownRight size={15} aria-hidden="true" /></summary><div className="project-note-body"><p>{project.detail}</p><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></details>
      </div>
    </article>
  );
}

export function ProductsSection() {
  return (
    <section className="section products-section" id="products" aria-labelledby="products-heading">
      <div className="wrap">
        <SectionIntro number="07" eyebrow="Web development & digital products" title="Useful ideas deserve thoughtful interfaces." headingId="products-heading" description="Product previews for the software and digital-product directions supplied for this portfolio. Two cards (GateMemory, NeuroSight) also appear as teaser cards in Selected Work — that is intentional (teaser → detail), not a duplicate rendering bug. The visual screens here are locally stored concept illustrations, not live product screenshots." />
        <div className="digital-grid">{digitalProjects.map((project, index) => <DigitalProjectCard key={project.id} project={project} index={index} />)}</div>
        <div className="project-link-note"><span className="project-link-icon" aria-hidden="true">↗</span><p>Public repositories and demo links are intentionally omitted until verified. Add confirmed URLs in <code>src/data/portfolio.ts</code> when ready. GateMemory & NeuroSight are the same concepts teased in Selected Work — this grid is their detailed view.</p></div>
      </div>
    </section>
  );
}

const aiDirections = [
  { number: "01", title: "Computer vision", description: "Phone-first assistive vision, represented by the NeuroSight project direction.", tag: "NeuroSight" },
  { number: "02", title: "On-device AI", description: "Edge AI learning and product thinking, including an 80-hour Honeywell Future Skills program.", tag: "Edge AI" },
  { number: "03", title: "Applied machine learning", description: "Machine learning, scikit-learn and anomaly-detection topics—shown without unsupported benchmark claims.", tag: "Applied ML" },
  { number: "04", title: "AI product development", description: "Bringing technical possibilities into clear, human-centred product concepts.", tag: "Product thinking" },
];

export function AIPracticeSection() {
  return (
    <section className="section ai-practice-section" id="ai-ml" aria-labelledby="ai-practice-heading">
      <div className="wrap ai-practice-wrap">
        <div className="ai-practice-intro">
          <SectionIntro number="08" eyebrow="AI & machine learning" title="Curious about what intelligence can make useful." headingId="ai-practice-heading" description="A separate technical view of computer vision, edge AI, model workflows and applied product thinking." dark />
          <div className="ai-practice-note"><span className="practice-line" /><p>Project directions and areas of practice—not performance claims.</p></div>
        </div>
        <div className="ai-direction-list">
          {aiDirections.map((item) => (
            <article className="ai-direction reveal" key={item.number}>
              <span className="ai-direction-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="ai-direction-tag">{item.tag}</span>
            </article>
          ))}
          <div className="edge-program"><span className="edge-program-icon" aria-hidden="true">80</span><span><b>Honeywell Future Skills · Edge AI</b><small>80 hours completed · program completion</small></span><ArrowUpRight size={16} aria-hidden="true" /></div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="wrap">
        <SectionIntro number="09" eyebrow="Skills & tools" title="A broad toolkit, used with intention." headingId="skills-heading" description="Creative skills, development technologies and AI/ML topics from my stated practice. No proficiency rankings are implied." />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-group reveal" key={group.number}>
              <div className="skill-group-top"><span>{group.number} / PRACTICE</span><ArrowUpRight size={16} aria-hidden="true" /></div>
              <h3>{group.title}</h3>
              <div className="skill-chips">{group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
        <div className="skills-bottom-note"><span className="tiny-dot" />A working toolkit, not a list of claims.</div>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section className="section achievements-section" id="achievements" aria-labelledby="achievements-heading">
      <div className="wrap">
        <SectionIntro number="10" eyebrow="Recognition & experience" title="Milestones, clearly labelled." headingId="achievements-heading" description="Awards, participation, course completion and project-building experience—kept distinct and factual." />
        <div className="achievement-list">
          {achievements.map((item, index) => (
            <article className="achievement-row reveal" key={item.title}>
              <div className="achievement-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="achievement-main"><span className="achievement-type">{item.type}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
              <div className="achievement-note">{item.note}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="wrap about-layout">
        <div className="about-copy">
          <SectionIntro number="11" eyebrow="A little about me" title="Creative by curiosity. Technical by training." headingId="about-heading" description="I’m Harsh Takalkar, an Electronics & Telecommunication engineering student drawn to the space where visual craft meets useful technology." />
          <p className="about-body">I enjoy shaping the whole experience: a frame that holds attention, a poster that feels considered, an interface that makes sense, or an AI idea translated into a practical product direction. I’m still learning, building and refining—with equal care for the detail and the reason behind it.</p>
          <a className="text-link" href="#contact">Let’s connect <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <figure className="about-visual reveal"><img src="/assets/cinematic-frame.png" alt="A lone traveler on a coastal road at blue hour, an original cinematic concept frame" loading="lazy" /><figcaption><span>Curiosity is a good compass.</span><span>CREATIVE / TECHNICAL</span></figcaption><span className="about-visual-tag">FRAME<br />&nbsp;OF<br />MIND</span></figure>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="wrap contact-wrap">
        <div className="contact-topline"><span><span className="eyebrow-dot" />Have an idea in mind?</span><span>12 / CONTACT</span></div>
        <div className="contact-main">
          <h2 id="contact-heading">Let’s make something<br /><em>clear, useful & memorable.</em></h2>
          <div className="contact-right"><p>For creative work, product ideas or a good conversation about technology and storytelling.</p><a className="button button-light" href="mailto:harshtakalkar037@gmail.com?subject=Portfolio%20enquiry">Email Harsh <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </div>
        <div className="contact-links">
          <a href="mailto:harshtakalkar037@gmail.com"><span>Email</span><b>harshtakalkar037@gmail.com</b><ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/harsh-takalkar/" target="_blank" rel="noreferrer"><span><Linkedin size={15} aria-hidden="true" /> LinkedIn</span><b>harsh-takalkar</b><ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href="https://github.com/harshtakalkar037-boop" target="_blank" rel="noreferrer"><span><Github size={15} aria-hidden="true" /> GitHub</span><b>harshtakalkar037-boop</b><ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="contact-bottom"><span>Based on what I’m building next.</span><a href="#top">Back to top <MoveUpRight size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-inner"><a className="footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">HT</span><span>Harsh Takalkar<small>Creative technologist</small></span></a><span>© {new Date().getFullYear()} Harsh Takalkar. Concept work labelled with care.</span><a href="mailto:harshtakalkar037@gmail.com" aria-label="Email Harsh Takalkar"><ArrowUpRight size={16} /></a></div></footer>;
}
