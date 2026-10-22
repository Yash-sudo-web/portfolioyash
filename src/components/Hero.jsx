import { motion } from "framer-motion";
import { Doodle, Sketch, arrow } from "./Sketch";
import { scrollToId } from "./Nav";
import { profile } from "../data";

// Doodle drawers live at module scope so their drawables are memoised.
const star = (g, o) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 11 : 26;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push([30 + r * Math.cos(a), 30 + r * Math.sin(a)]);
  }
  return [g.polygon(pts, { ...o, seed: 4, fill: "FILL", fillStyle: "hachure", hachureGap: 5 })];
};
const diamond = (g, o) => [
  g.polygon(
    [
      [40, 4],
      [76, 40],
      [40, 76],
      [4, 40],
    ],
    { ...o, seed: 7, fill: "FILL", fillStyle: "cross-hatch", hachureGap: 6 },
  ),
];
const circle = (g, o) => [g.circle(26, 26, 42, { ...o, seed: 3, fill: "FILL", hachureGap: 5 })];
const cross = (g, o) => [
  g.line(4, 4, 24, 24, { ...o, seed: 2 }),
  g.line(24, 4, 4, 24, { ...o, seed: 5 }),
];
const squiggle = (g, o) => [
  g.curve(
    [
      [4, 50],
      [18, 10],
      [30, 56],
      [44, 8],
      [58, 54],
      [72, 10],
      [86, 52],
      [100, 14],
      [112, 46],
    ],
    { ...o, seed: 9, strokeWidth: 2.4 },
  ),
];
const scrollArrow = (g, o) =>
  arrow(
    [
      [86, 8],
      [52, 18],
      [20, 44],
    ],
    { ...o, seed: 11, strokeWidth: 1.8 },
  );

function Cursor() {
  return (
    <span className="cursor" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14">
        <path d="M2 1 L13 8 L8 9 L6 14 Z" />
      </svg>
      <span className="cursor-tag">yash</span>
    </span>
  );
}

const line = (i) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] },
});

export function Hero() {
  return (
    <header className="hero" id="top">
      <Doodle className="deco deco-cross" w={28} h={28} draw={cross} />
      <Doodle className="deco deco-star" color="yellow" w={60} h={60} draw={star} />
      <Doodle className="deco deco-diamond" color="violet" w={80} h={80} draw={diamond} />
      <Doodle className="deco deco-circle" color="green" w={52} h={52} draw={circle} />

      <motion.p className="hero-meta" {...line(0)}>
        {profile.location} · {profile.role}
      </motion.p>

      <h1 className="hero-title">
        <motion.span className="hero-line" {...line(1)}>
          Engineer.
        </motion.span>
        <motion.span className="hero-line" {...line(2)}>
          <Sketch
            as="span"
            className="highlight"
            color="yellow"
            seed={3}
            sketch={{ stroke: false, fill: true, hachureGap: 4, fillWeight: 2.2, roughness: 1.6 }}
          >
            I build agents
          </Sketch>
        </motion.span>
        <motion.span className="hero-line" {...line(3)}>
          <span className="selection">
            that actually ship.
            <i className="handle tl" />
            <i className="handle tr" />
            <i className="handle bl" />
            <i className="handle br" />
            <Cursor />
          </span>
        </motion.span>
      </h1>

      <motion.p className="hero-sub" {...line(4)}>
        I work on the unglamorous half of AI: the platform, the RAG pipelines, the MCP tools and the
        evals that keep it all honest in production.
      </motion.p>

      <motion.div className="hero-cta" {...line(5)}>
        <Sketch
          as="button"
          className="btn btn-primary"
          color="blue"
          jitter
          sketch={{ fill: true, fillStyle: "solid" }}
          onClick={() => scrollToId("work")}
        >
          View work
        </Sketch>
        <Sketch as="button" className="btn" jitter seed={2} onClick={() => scrollToId("about")}>
          Read my story
        </Sketch>
      </motion.div>

      <div className="hero-scroll" aria-hidden="true">
        <Doodle className="deco-squiggle" w={116} h={62} draw={squiggle} />
        <Doodle className="deco-scroll-arrow" w={92} h={52} draw={scrollArrow} />
        <span className="note">keep scrolling, it's one big canvas</span>
      </div>
    </header>
  );
}
