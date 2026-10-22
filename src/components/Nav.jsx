import { useEffect, useState } from "react";
import { profile } from "../data";

export const sections = [
  { id: "work", label: "Work", icon: "rect" },
  { id: "projects", label: "Projects", icon: "diamond" },
  { id: "oss", label: "Open source", icon: "branch" },
  { id: "about", label: "About", icon: "circle" },
  { id: "skills", label: "Skills", icon: "arrow" },
  { id: "contact", label: "Contact", icon: "pencil" },
];

const icons = {
  rect: <rect x="3.5" y="5.5" width="13" height="9" rx="1.5" />,
  diamond: <path d="M10 3 L17 10 L10 17 L3 10 Z" />,
  circle: <circle cx="10" cy="10" r="6.5" />,
  branch: (
    <>
      <circle cx="6" cy="4.5" r="1.8" />
      <circle cx="6" cy="15.5" r="1.8" />
      <circle cx="14" cy="6.5" r="1.8" />
      <path d="M6 6.3v7.4M14 8.3c0 4-8 2.5-8 5.4" />
    </>
  ),
  arrow: <path d="M4 16 L16 4 M9 4 H16 V11" />,
  pencil: <path d="M4 16 L5 12 L13 4 L16 7 L8 15 Z M11.5 5.5 L14.5 8.5" />,
  sun: (
    <>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
    </>
  ),
  moon: <path d="M15.5 12.5A6.5 6.5 0 0 1 7.5 4.5a6.5 6.5 0 1 0 8 8Z" />,
};

export function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    // Excalidraw-style tool shortcuts: number keys jump to a section.
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName)) return;
      const s = sections[Number(e.key) - 1];
      if (s) scrollToId(s.id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="toolbar" aria-label="Sections">
      <a
        href="#top"
        className="toolbar-brand"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {profile.name}
      </a>
      <span className="toolbar-sep" />
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`tool ${active === s.id ? "is-active" : ""}`}
          aria-current={active === s.id ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            scrollToId(s.id);
          }}
        >
          <Icon name={s.icon} />
          <span className="tool-label">{s.label}</span>
          <sub>{i + 1}</sub>
        </a>
      ))}
    </nav>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(
    () =>
      document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
  );

  const pick = (t) => {
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };

  return (
    <div className="panel theme-toggle" role="group" aria-label="Theme">
      {["light", "dark"].map((t) => (
        <button
          key={t}
          className={`tool ${theme === t ? "is-active" : ""}`}
          onClick={() => pick(t)}
          aria-pressed={theme === t}
          aria-label={`${t} theme`}
        >
          <Icon name={t === "light" ? "sun" : "moon"} />
        </button>
      ))}
    </div>
  );
}

const ZOOMS = [0.5, 0.67, 0.8, 0.9, 1, 1.1, 1.25, 1.5];

export function ZoomControl({ zoom, setZoom }) {
  const i = ZOOMS.indexOf(zoom);
  return (
    <div className="panel zoom" role="group" aria-label="Zoom">
      <button className="tool" onClick={() => setZoom(ZOOMS[Math.max(0, i - 1)])} aria-label="Zoom out">
        −
      </button>
      <button className="tool zoom-value" onClick={() => setZoom(1)} title="Reset zoom">
        {Math.round(zoom * 100)}%
      </button>
      <button
        className="tool"
        onClick={() => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, i + 1)])}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}
