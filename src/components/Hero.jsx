import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Doodle, Sketch, arrow } from "./Sketch";
import { scrollToId } from "./Nav";

const enter = (i) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] },
});

const NOTES = [
  { title: "now", body: "SDE-1 on the backend/AI team @ smallcase", color: "s-yellow", x: "4%", y: "6%", r: -5 },
  { title: "shipped", body: "an AI platform 5+ teams build agents on", color: "s-violet", x: "52%", y: "0%", r: 4 },
  { title: "stack", body: "Python · TypeScript · Go, plus MCP, RAG and evals", color: "s-blue", x: "10%", y: "52%", r: 3 },
  { title: "off the clock", body: "rebuilding Redis in Go, merging OSS PRs", color: "s-green", x: "56%", y: "48%", r: -4 },
];

const dragArrow = (g, o) =>
  arrow(
    [
      [70, 8],
      [40, 10],
      [8, 30],
    ],
    { ...o, seed: 71, strokeWidth: 1.6 },
  );

const PAPER = { fill: true, fillStyle: "solid", roughness: 1.4 };

// Marker-pen styles for phrases in the intro.
const marker = { stroke: false, fill: true, hachureGap: 4, fillWeight: 2.2, roughness: 1.6 };

function Mark({ color, seed, kind = "highlight", children }) {
  return (
    <Sketch
      as="span"
      shape={kind === "highlight" ? "rect" : kind}
      className={`mark mark-${kind}`}
      color={color}
      seed={seed}
      sketch={kind === "highlight" ? marker : { strokeWidth: 2.2 }}
    >
      {children}
    </Sketch>
  );
}

// Drifts on its own until someone drags it; once thrown, it glides to a stop and stays there.
// Each note owns its state, so picking one up only re-renders that note.
function StickyNote({ note: n, i, board }) {
  const [settled, setSettled] = useState(false);
  return (
    <motion.div
      className="sticky-note"
      style={{ left: n.x, top: n.y }}
      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: n.r }}
      transition={{ delay: 0.3 + i * 0.12, type: "spring", bounce: 0.4 }}
      drag
      dragConstraints={board}
      dragElastic={0.15}
      whileDrag={{ scale: 1.05, zIndex: 5 }}
      onDragStart={() => setSettled(true)}
    >
      {/* The drift lives on an inner wrapper so it never fights the drag transform.
          It's paused (not removed) on drag so the note doesn't snap. */}
      <div
        className={`sticky-float ${settled ? "is-settled" : ""}`}
        style={{ "--float-dur": `${5 + i * 0.9}s`, "--float-delay": `${-i * 1.3}s` }}
      >
        <Sketch className="sticky-paper" color={n.color} seed={81 + i} sketch={PAPER}>
          <span className="sticky-title">{n.title}</span>
          <span className="sticky-body">{n.body}</span>
        </Sketch>
      </div>
    </motion.div>
  );
}

// A colourful intro beside a little board of sticky notes visitors can drag around.
export function Hero() {
  const board = useRef(null);

  return (
    <header className="hero" id="top">
      <div className="hero-grid">
        <div>
          <motion.h1 className="hero-title" {...enter(0)}>
            Hi, I'm{" "}
            <Mark color="yellow" seed={71}>
              Yash
            </Mark>
            .
          </motion.h1>
          <motion.p className="hero-lead" {...enter(1)}>
            I build{" "}
            <Mark color="blue" seed={72} kind="underline">
              AI agents
            </Mark>{" "}
            that hold up in{" "}
            <Mark color="green" seed={73} kind="ellipse">
              production
            </Mark>
            .
          </motion.p>
          <motion.p className="hero-sub" {...enter(2)}>
            Most of my work lives{" "}
            <Mark color="violet" seed={74}>
              behind the demo
            </Mark>
            : retrieval that finds the right context, tools agents can safely call, and evals that catch bad
            answers before users do.
          </motion.p>
          <motion.div className="hero-cta" {...enter(3)}>
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
            <Sketch as="button" className="btn" jitter seed={2} onClick={() => scrollToId("contact")}>
              Say hi
            </Sketch>
          </motion.div>
        </div>

        <div className="sticky-board" ref={board}>
          {NOTES.map((n, i) => (
            <StickyNote key={n.title} note={n} i={i} board={board} />
          ))}
          <span className="sticky-hint">
            <Doodle w={76} h={36} draw={dragArrow} />
            <span className="note">go on, drag them</span>
          </span>
        </div>
      </div>
    </header>
  );
}
