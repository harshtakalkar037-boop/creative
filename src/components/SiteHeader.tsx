import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

// Navigation is ordered to reflect portfolio priority: creative work (selected + video) first,
// then design/photo, then technical/digital. This matches the homepage section order.
const links = [
  { label: "Selected work", href: "#work" },
  { label: "Video edits", href: "#video" },
  { label: "Posters", href: "#satsang" },
  { label: "Design & Photo", href: "#design" },
  { label: "Digital + AI", href: "#products" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a className="brand" href="#top" aria-label="Harsh Takalkar, back to top" onClick={close}>
          <span className="brand-mark" aria-hidden="true">HT</span>
          <span className="brand-name">Harsh Takalkar<span className="brand-role">Creative technologist</span></span>
        </a>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={close}>{link.label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={close}>Contact <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" /></a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a href={link.href} key={link.href} onClick={close} tabIndex={open ? 0 : -1}>
              <span className="mobile-nav-index">0{index + 1}</span>{link.label}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
          <a href="#contact" onClick={close} tabIndex={open ? 0 : -1}>
            <span className="mobile-nav-index">05</span>Contact<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
