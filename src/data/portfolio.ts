export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  detail: string;
  label: string;
  layout?: "wide" | "tall" | "standard";
};

export const selectedWork: Project[] = [
  {
    id: "stillness-motion",
    title: "Stillness, in motion",
    category: "Video editing · Satsang",
    image: "/assets/videos/marathi-satsang-poster.jpg",
    imageAlt: "A warm dusk lake and temple silhouette beneath the Marathi headline मनःशांतीचा सुंदर प्रवास",
    description: "A gentle Marathi satsang invitation shaped as a vertical, captioned motion study.",
    detail: "Self-initiated concept project. A 24-second 9:16 reel built from original generated artwork, carefully typeset Marathi, slow camera movement, open captions and a subtle original ambient soundtrack. It is presented as a portfolio concept, not a client commission.",
    label: "Concept film",
    layout: "wide",
  },
  {
    id: "gate-memory",
    title: "GateMemory",
    category: "Digital product · Concept",
    image: "/assets/projects/gate-memory.svg",
    imageAlt: "Location-memory interface concept with a map, saved photo and voice-note panel",
    description: "A location-memory concept built around photos, voice notes and offline visual matching.",
    detail: "A product concept exploring how a person might leave a visual or spoken breadcrumb and find it again later. The preview is an art-directed interface illustration; no live demo or repository link was provided for this portfolio build.",
    label: "Product concept",
  },
  {
    id: "brand-study",
    title: "A quieter kind of identity",
    category: "Graphic design · Brand study",
    image: "/assets/brand-study.png",
    imageAlt: "Warm ivory stationery and packaging with restrained terracotta and charcoal shapes",
    description: "A self-initiated identity direction exploring paper, proportion and a small clay accent.",
    detail: "An original brand-identity study: an intentionally unnamed concept system for stationery, packaging and social applications. The visual language is built from warm paper, charcoal, terracotta and simple geometric forms. This is not a commissioned client identity.",
    label: "Identity study",
    layout: "tall",
  },
  {
    id: "satsang-print",
    title: "Satsang, in print",
    category: "Poster design · Marathi + Hindi",
    image: "/assets/posters/marathi-satsang-01.jpg",
    imageAlt: "Marathi satsang poster over a misty lake at dawn, with legible Devanagari typography",
    description: "A devotional poster system with original art direction and carefully typeset Devanagari.",
    detail: "A collection of Marathi and Hindi poster concepts, quote cards and event announcements. Background artwork was created without embedded text; the final Devanagari copy was laid out separately using a local, licensed font. Every poster is marked as concept work.",
    label: "Poster series",
  },
  {
    id: "neurosight",
    title: "NeuroSight",
    category: "Applied AI · Assistive vision",
    image: "/assets/projects/neurosight.svg",
    imageAlt: "Phone-first assistive vision interface concept showing a camera preview and a large audio cue control",
    description: "A phone-first assistive vision project, presented through a calm, accessibility-led interface study.",
    detail: "A known project direction supplied for this portfolio. The mock interface illustrates a phone-first assistive vision experience; it does not claim measured accuracy, a specific model, or a production-ready assistive device. No public repository or demo URL was provided.",
    label: "Technical project",
    layout: "tall",
  },
  {
    id: "machine-vision-study",
    title: "Material for machine vision",
    category: "AI-generated art · Visual study",
    image: "/assets/ai-art-study.png",
    imageAlt: "Sculptural amber discs, black thread and paper relief arranged as an abstract machine-vision metaphor",
    description: "An original AI-art direction study about perception, attention and the images systems learn to notice.",
    detail: "An image-led experiment made for this portfolio with a tactile still-life direction rather than a generic neon-tech look. It is an AI-generated visual concept, not a photograph of a physical installation.",
    label: "Visual experiment",
  },
];

export type Poster = {
  id: string;
  title: string;
  category: "Marathi" | "Hindi" | "Quotes" | "Events" | "Product" | "Carousel";
  image: string;
  description: string;
  language: string;
};

export const posterFilters = ["All", "Marathi", "Hindi", "Quotes", "Events", "Product", "Carousel"] as const;

export const posters: Poster[] = [
  { id: "marathi-satsang-01", title: "मनःशांतीचा सुंदर प्रवास", category: "Marathi", image: "/assets/posters/marathi-satsang-01.jpg", description: "A contemplative dawn-lake poster about returning to a calm breath.", language: "Marathi" },
  { id: "marathi-satsang-02", title: "भक्ती, सेवा, समाधान", category: "Marathi", image: "/assets/posters/marathi-satsang-02.jpg", description: "An understated devotional composition about devotion, service and contentment.", language: "Marathi" },
  { id: "marathi-satsang-03", title: "नामात विसावा, श्वासात शांतता", category: "Marathi", image: "/assets/posters/marathi-satsang-03.jpg", description: "A quiet abstract treatment for a moment of remembrance and stillness.", language: "Marathi" },
  { id: "marathi-satsang-04", title: "शांततेकडे एक पाऊल", category: "Marathi", image: "/assets/posters/marathi-satsang-04.jpg", description: "A minimal Marathi poster inviting reflection and a gentler pace.", language: "Marathi" },
  { id: "hindi-satsang-01", title: "मन की शांति, जीवन की रोशनी", category: "Hindi", image: "/assets/posters/hindi-satsang-01.jpg", description: "A warm courtyard-inspired Hindi satsang poster about inner light.", language: "Hindi" },
  { id: "hindi-satsang-02", title: "भक्ति में एकाग्रता", category: "Hindi", image: "/assets/posters/hindi-satsang-02.jpg", description: "A sculptural abstract background paired with a short Hindi reflection.", language: "Hindi" },
  { id: "hindi-satsang-03", title: "प्रेम से सुनें, शांति से जिएँ", category: "Hindi", image: "/assets/posters/hindi-satsang-03.jpg", description: "A landscape-led visual about listening with care and living with calm.", language: "Hindi" },
  { id: "hindi-satsang-04", title: "मौन में भी मिलती है राह", category: "Hindi", image: "/assets/posters/hindi-satsang-04.jpg", description: "An intimate Hindi typography poster on finding direction in quiet.", language: "Hindi" },
  { id: "quote-01", title: "Find a moment of stillness.", category: "Quotes", image: "/assets/posters/quote-01.jpg", description: "An English stillness card designed for a calm social post.", language: "English" },
  { id: "quote-02", title: "भीतर भी एक आकाश है।", category: "Quotes", image: "/assets/posters/quote-02.jpg", description: "A Hindi quote card with a warm devotional art direction.", language: "Hindi" },
  { id: "quote-03", title: "शांत मन, स्पष्ट दिशा.", category: "Quotes", image: "/assets/posters/quote-03.jpg", description: "A concise Marathi and Hindi-inspired reminder for a quieter mind.", language: "Marathi" },
  { id: "event-01", title: "सत्संग संध्या", category: "Events", image: "/assets/posters/event-01.jpg", description: "Marathi event-announcement concept. Date and venue are intentionally left unannounced.", language: "Marathi" },
  { id: "event-02", title: "भजन एवं सत्संग", category: "Events", image: "/assets/posters/event-02.jpg", description: "Hindi event-announcement concept. Date and venue are intentionally left unannounced.", language: "Hindi" },
  { id: "event-03", title: "An Evening of Stillness", category: "Events", image: "/assets/posters/event-03.jpg", description: "An English satsang event concept with details marked as to be announced.", language: "English" },
  { id: "product-01", title: "Make space for focus.", category: "Product", image: "/assets/posters/product-01.jpg", description: "A startup campaign concept for a calmer digital workspace.", language: "English" },
  { id: "product-02", title: "Less noise. More signal.", category: "Product", image: "/assets/posters/product-02.jpg", description: "A product-promotion concept about clarity and the next small step.", language: "English" },
  { id: "product-03", title: "Small moments. Clearer days.", category: "Product", image: "/assets/posters/product-03.jpg", description: "A warm campaign direction for an unnamed digital product.", language: "English" },
  { id: "carousel-01", title: "A gentler way to remember.", category: "Carousel", image: "/assets/posters/carousel-01.jpg", description: "Cover visual for a five-frame GateMemory product-story concept.", language: "English" },
  { id: "carousel-02", title: "Build for the moment it matters.", category: "Carousel", image: "/assets/posters/carousel-02.jpg", description: "Cover visual for a five-frame safety-first product narrative.", language: "English" },
  { id: "carousel-03", title: "Make complex feel clear.", category: "Carousel", image: "/assets/posters/carousel-03.jpg", description: "Cover visual for a four-frame applied-AI explainer concept.", language: "English" },
];

export type Reel = {
  id: string;
  title: string;
  label: string;
  duration: string;
  language: string;
  format: string;
  poster: string;
  src: string;
  captions: string;
  description: string;
  editNotes: string[];
};

export const reels: Reel[] = [
  {
    id: "marathi-satsang", title: "A quieter invitation", label: "Marathi Satsang", duration: "00:24", language: "Marathi", format: "9:16 · 24 seconds",
    poster: "/assets/videos/marathi-satsang-poster.jpg", src: "/assets/videos/marathi-satsang.mp4", captions: "/assets/videos/marathi-satsang.vtt",
    description: "A self-initiated Marathi promotional-video concept shaped around a slow exhale, a gentle invitation and a clear social-ready close.",
    editNotes: ["Marathi open captions + WebVTT track", "Original ambient sound bed", "Slow push-ins and soft crossfades"],
  },
  {
    id: "hindi-satsang", title: "One calm moment", label: "Hindi Satsang", duration: "00:24", language: "Hindi", format: "9:16 · 24 seconds",
    poster: "/assets/videos/hindi-satsang-poster.jpg", src: "/assets/videos/hindi-satsang.mp4", captions: "/assets/videos/hindi-satsang.vtt",
    description: "A peaceful Hindi devotional promotion concept, paced for YouTube Shorts, Instagram Reels and WhatsApp sharing.",
    editNotes: ["Hindi open captions + WebVTT track", "Readable Devanagari title cards", "Soft cuts, camera drift and original audio"],
  },
  {
    id: "stillness-quote", title: "A note to return to", label: "Devotional quote reel", duration: "00:18", language: "Hindi + English", format: "9:16 · 18 seconds",
    poster: "/assets/videos/stillness-quote-poster.jpg", src: "/assets/videos/stillness-quote.mp4", captions: "/assets/videos/stillness-quote.vtt",
    description: "A short typography-led reel that lets a single thought breathe before it resolves into an English stillness card.",
    editNotes: ["Animated title reveals", "Hindi + English caption track", "Layered original ambient tones"],
  },
  {
    id: "startup-reel", title: "Focus, in motion", label: "Startup product promo", duration: "00:20", language: "English", format: "9:16 · 20 seconds",
    poster: "/assets/videos/startup-reel-poster.jpg", src: "/assets/videos/startup-reel.mp4", captions: "/assets/videos/startup-reel.vtt",
    description: "A self-initiated commercial-editing concept for an unnamed digital product, using concise kinetic messaging and product-focused imagery.",
    editNotes: ["Kinetic text beats", "Original ambient / pulse sound bed", "Product imagery and soft crossfades"],
  },
];

export type DigitalProject = {
  id: string;
  title: string;
  focus: string;
  image: string;
  summary: string;
  status: string;
  detail: string;
  stack: string[];
};

export const digitalProjects: DigitalProject[] = [
  {
    id: "gate-memory", title: "GateMemory", focus: "Location memory", image: "/assets/projects/gate-memory.svg",
    summary: "A location-memory concept using photos, voice notes and offline visual matching.", status: "Product concept",
    detail: "A wayfinding and recall concept centered on small visual and spoken memories. The portfolio preview is illustrative; no public demo or repository link was supplied.", stack: ["Product thinking", "Computer vision", "Offline-first concept"],
  },
  {
    id: "study-sphere", title: "Study Sphere / PICT Notes", focus: "Student knowledge sharing", image: "/assets/projects/study-sphere.svg",
    summary: "A notes-sharing platform for students, presented as a campus learning-product interface study.", status: "Platform project",
    detail: "A student-focused notes-sharing platform from the supplied project list. This page shows a product-preview illustration only; live status and a public URL were not supplied.", stack: ["Student platform", "Notes sharing", "Product interface"],
  },
  {
    id: "neurosight", title: "NeuroSight", focus: "Assistive vision", image: "/assets/projects/neurosight.svg",
    summary: "A phone-first assistive vision project that puts accessible interaction ahead of interface density.", status: "Technical project",
    detail: "A phone-first assistive-vision project from the supplied portfolio brief. The visual is a concept interface; it makes no unsupported claims about model performance or release status.", stack: ["Computer vision", "Mobile-first", "Applied AI"],
  },
  {
    id: "silentguard", title: "SilentGuard", focus: "Safety & fall detection", image: "/assets/projects/silentguard.svg",
    summary: "An AI-assisted safety and fall-detection project framed around human-centred alerts.", status: "Technical concept",
    detail: "A safety-focused AI concept from the supplied project list. The dashboard preview is illustrative, not a live monitoring interface and not connected to sensor data.", stack: ["Applied AI", "Safety systems", "Product design"],
  },
  {
    id: "disastermesh", title: "DisasterMesh", focus: "Coordination systems", image: "/assets/projects/disaster-mesh.svg",
    summary: "A disaster communication and coordination concept visualised as a shared response workspace.", status: "Product concept",
    detail: "A coordination concept for disaster-response contexts from the supplied project list. This preview explores shared information hierarchy; no live network, map feed or deployment claim is made.", stack: ["Digital products", "Coordination UX", "Applied technology"],
  },
];

export const skillGroups = [
  { title: "Creative practice", number: "01", skills: ["Video editing", "Graphic design", "Photo editing", "Visual storytelling", "Social media creatives", "Motion graphics & typography"] },
  { title: "Development toolkit", number: "02", skills: ["Python", "Java", "C / C++", "HTML · CSS · JavaScript", "React", "Node.js · Express", "MongoDB", "Git · GitHub"] },
  { title: "AI & machine learning", number: "03", skills: ["Machine learning", "Computer vision", "PyTorch", "TensorFlow Lite", "scikit-learn", "Applied AI", "Model deployment", "Anomaly detection"] },
];

export const achievements = [
  { type: "Award", title: "DigiTwin.AI", detail: "First place · UpXGen Hackathon", note: "Award noted as supplied; date not specified." },
  { type: "Participation", title: "iQOO Hackathon 2026", detail: "Hackathon participation", note: "Participation, not an award." },
  { type: "Program completion", title: "Honeywell Future Skills — Edge AI", detail: "80 hours completed", note: "Course / program completion." },
  { type: "Project experience", title: "Building across disciplines", detail: "Creative systems, web projects and applied-AI explorations", note: "Selected project work; no client claims." },
  { type: "Academic background", title: "Electronics & Telecommunication", detail: "Engineering student", note: "Academic discipline supplied for this portfolio." },
];
