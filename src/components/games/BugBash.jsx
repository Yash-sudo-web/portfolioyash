import { useEffect, useMemo, useRef, useState } from "react";
import { Paths, Sketch, gen, options } from "../Sketch";
import { readScore, saveScore } from "./storage";

const SIZE = 360;
const ROUND_S = 20;
const BEST_KEY = "bugbash-best";
const HOLES = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => [60 + (i % 3) * 120, 66 + Math.floor(i / 3) * 114]);

// Bugs stay up for less time as the round goes on.
const stayMs = (left) => 520 + (left / ROUND_S) * 520;

function verdict(n) {
  if (n >= 25) return "zero bugs left in prod. hire this person.";
  if (n >= 18) return "QA would be proud.";
  if (n >= 10) return "solid triage.";
  if (n >= 4) return "a few escaped to prod.";
  return "the bugs are winning.";
}

export function BugBash() {
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(ROUND_S);
  const [bug, setBug] = useState(null); // { hole, id }
  const [splat, setSplat] = useState(null);
  const [best, setBest] = useState(() => readScore(BEST_KEY));
  const timers = useRef([]);

  const holes = useMemo(() => {
    const o = options({ roughness: 1.3 });
    return HOLES.map(([x, y], i) => gen.ellipse(x, y + 26, 84, 26, { ...o, seed: 300 + i }));
  }, []);

  const bugShape = useMemo(() => {
    const o = options({ roughness: 1.2, strokeWidth: 1.8 });
    const legs = [-10, 0, 10].flatMap((y, i) => [
      gen.line(-12, y, -26, y - 6 + i * 6, { ...o, seed: 310 + i }),
      gen.line(12, y, 26, y - 6 + i * 6, { ...o, seed: 320 + i }),
    ]);
    return [
      ...legs,
      gen.line(-5, -20, -13, -32, { ...o, seed: 330 }),
      gen.line(5, -20, 13, -32, { ...o, seed: 331 }),
      gen.ellipse(0, 0, 28, 40, { ...o, seed: 332, fill: "FILL", fillStyle: "solid" }),
      gen.line(0, -18, 0, 18, { ...o, seed: 333, strokeWidth: 1.2 }),
    ];
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  // Countdown.
  useEffect(() => {
    if (phase !== "playing") return;
    if (left <= 0) {
      clearTimers();
      setBug(null);
      setPhase("over");
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, left]);

  // Save a new best once the round ends.
  useEffect(() => {
    if (phase === "over" && score > best) {
      setBest(score);
      saveScore(BEST_KEY, score);
    }
  }, [phase, score, best]);

  // Live values for timeouts, which would otherwise see stale state.
  const live = useRef({ phase: "idle", left: ROUND_S, bug: null });
  live.current.phase = phase;
  live.current.left = left;

  const spawn = (prevHole) => {
    let hole;
    do hole = Math.floor(Math.random() * HOLES.length);
    while (hole === prevHole);
    const next = { hole, id: Math.random() };
    live.current.bug = next;
    setBug(next);
    clearTimers();
    // If it isn't squashed in time, it scuttles off to another hole.
    timers.current.push(
      setTimeout(() => {
        if (live.current.phase === "playing" && live.current.bug?.id === next.id) spawn(hole);
      }, stayMs(live.current.left)),
    );
  };

  const start = () => {
    setScore(0);
    setLeft(ROUND_S);
    setSplat(null);
    setPhase("playing");
    live.current.phase = "playing";
    live.current.left = ROUND_S;
    spawn(-1);
  };

  const squash = (e) => {
    e.stopPropagation();
    if (phase !== "playing" || !bug) return;
    const [x, y] = HOLES[bug.hole];
    setSplat({ x, y, id: bug.id });
    setScore((s) => s + 1);
    spawn(bug.hole);
  };

  return (
    <div className="game">
      <Sketch className="game-board" seed={341}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="game-svg bug-svg">
          <Paths drawables={holes} />
          {splat && (
            <text key={splat.id} x={splat.x} y={splat.y + 10} className="bug-splat">
              splat!
            </text>
          )}
          {bug && phase === "playing" && (
            <g
              key={bug.id}
              className="bug"
              data-color="red"
              transform={`translate(${HOLES[bug.hole][0]} ${HOLES[bug.hole][1]})`}
              onPointerDown={squash}
            >
              <circle r="34" className="bug-hit" />
              <g className="bug-body">
                <Paths drawables={bugShape} />
              </g>
            </g>
          )}
          {phase === "playing" && (
            <text x={SIZE - 12} y={26} className="game-hud" textAnchor="end">
              {left}s · {score} squashed
            </text>
          )}
        </svg>
        {phase !== "playing" && (
          <button className="game-overlay" onClick={start}>
            <span className="game-overlay-big">{phase === "over" ? `${score} bugs squashed` : "bug bash"}</span>
            <span className="note">{phase === "over" ? "click to play again" : `squash as many as you can in ${ROUND_S}s`}</span>
          </button>
        )}
      </Sketch>
      <p className="game-result" role="status">
        {phase === "over" && verdict(score)}
      </p>
      <p className="game-best">
        your best: <strong>{best || "—"}</strong>
        <span className="note"> · bugs, not features</span>
      </p>
    </div>
  );
}
