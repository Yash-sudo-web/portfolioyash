import { useEffect, useRef, useState } from "react";
import { Sketch } from "../Sketch";
import { readScore, saveScore } from "./storage";

const BEST_KEY = "reflex-best";

function verdict(ms) {
  if (ms < 180) return "are you a bot? be honest.";
  if (ms < 250) return "fast. merge approved.";
  if (ms < 330) return "decent. CI is still slower.";
  return "slower than our CI pipeline.";
}

// Reaction test: wait for green, then click. Lower is better.
export function Reflex() {
  const [phase, setPhase] = useState("idle"); // idle | waiting | go | done | early
  const [ms, setMs] = useState(null);
  const [best, setBest] = useState(() => readScore(BEST_KEY));
  const wentGreen = useRef(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const press = () => {
    if (phase === "waiting") {
      clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const t = Math.round(performance.now() - wentGreen.current);
      setMs(t);
      setPhase("done");
      if (!best || t < best) {
        setBest(t);
        saveScore(BEST_KEY, t);
      }
      return;
    }
    // idle, done or early: start a new round after a random wait.
    setPhase("waiting");
    timer.current = setTimeout(() => {
      wentGreen.current = performance.now();
      setPhase("go");
    }, 1400 + Math.random() * 2600);
  };

  const big = {
    idle: "ship it!",
    waiting: "wait for green…",
    go: "SHIP IT!",
    done: `${ms} ms`,
    early: "too early!",
  }[phase];
  const small = {
    idle: "click when the board turns green",
    waiting: "CI is running…",
    go: "click, click, click",
    done: "click to try again",
    early: "that's how prod goes down. click to retry",
  }[phase];

  return (
    <div className="game">
      <Sketch
        as="button"
        className={`game-board reflex reflex-${phase}`}
        seed={351}
        onPointerDown={press}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), press())}
      >
        <span className="reflex-big">{big}</span>
        <span className="note">{small}</span>
      </Sketch>
      <p className="game-result" role="status">
        {phase === "done" && verdict(ms)}
      </p>
      <p className="game-best">
        your best: <strong>{best ? `${best} ms` : "—"}</strong>
        <span className="note"> · lower is better</span>
      </p>
    </div>
  );
}
