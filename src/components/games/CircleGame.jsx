import { useRef, useState } from "react";
import { Sketch } from "../Sketch";

const SIZE = 360;
const C = SIZE / 2;
const MIN_R = 40;
const BEST_KEY = "circle-best";

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(v) {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {}
}

// Roundness = 1 − (mean deviation from the mean radius ÷ mean radius), so a
// shaky or squashed loop loses points no matter how big it is.
function roundness(points) {
  const rs = points.map(([x, y]) => Math.hypot(x - C, y - C));
  const mean = rs.reduce((a, b) => a + b, 0) / rs.length;
  const dev = rs.reduce((a, r) => a + Math.abs(r - mean), 0) / rs.length;
  return { score: Math.max(0, 1 - (dev / mean) * 3.2), radius: mean };
}

function verdict(pct) {
  if (pct >= 95) return "okay, show-off. send me your resume instead.";
  if (pct >= 90) return "smoother than my deploys.";
  if (pct >= 80) return "solid. ship it.";
  if (pct >= 65) return "good enough for a hackathon demo.";
  return "that's a potato. try again?";
}

export function CircleGame() {
  const svgRef = useRef(null);
  const drawing = useRef(false);
  const sweep = useRef({ total: 0, last: null });
  const pts = useRef([]);
  const [points, setPoints] = useState([]);
  const [state, setState] = useState({ phase: "idle" }); // idle | drawing | done | fail
  const [best, setBest] = useState(readBest);

  const toLocal = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE];
  };

  const fail = (msg) => {
    drawing.current = false;
    setState({ phase: "fail", msg });
  };

  const down = (e) => {
    e.preventDefault();
    try {
      svgRef.current.setPointerCapture(e.pointerId);
    } catch {}
    const p = toLocal(e);
    drawing.current = true;
    sweep.current = { total: 0, last: Math.atan2(p[1] - C, p[0] - C) };
    pts.current = [p];
    setPoints([p]);
    setState({ phase: "drawing" });
  };

  const move = (e) => {
    if (!drawing.current) return;
    const p = toLocal(e);
    if (Math.hypot(p[0] - C, p[1] - C) < MIN_R / 2) return fail("too close to the dot!");

    // Track how far around the dot we've gone, so a half-moon can't score.
    const a = Math.atan2(p[1] - C, p[0] - C);
    let d = a - sweep.current.last;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    sweep.current.total += d;
    sweep.current.last = a;

    pts.current = [...pts.current, p];
    setPoints(pts.current);
    if (Math.abs(sweep.current.total) >= 2 * Math.PI) finish(pts.current);
  };

  const finish = (drawn) => {
    drawing.current = false;
    const { score, radius } = roundness(drawn);
    if (radius < MIN_R) return setState({ phase: "fail", msg: "bigger! use the whole canvas." });
    const pct = Math.round(score * 1000) / 10;
    if (pct > best) {
      setBest(pct);
      saveBest(pct);
    }
    setState({ phase: "done", pct, radius, record: pct > best });
  };

  const up = () => {
    if (!drawing.current) return;
    if (Math.abs(sweep.current.total) < 2 * Math.PI * 0.92) return fail("close the loop all the way round");
    finish(pts.current);
  };

  const live = points.length > 8 && state.phase === "drawing" ? Math.round(roundness(points).score * 100) : null;
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <div className="circle-game">
      <Sketch className="circle-board" seed={201}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={`circle-svg phase-${state.phase}`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          role="img"
          aria-label="Drawing area: drag around the dot to draw a circle"
        >
          {state.phase === "done" && <circle className="circle-ideal" cx={C} cy={C} r={state.radius} />}
          <path className="circle-stroke" d={path} />
          <circle className="circle-dot" cx={C} cy={C} r={5} />
          {state.phase === "idle" && (
            <text x={C} y={C + 34} className="circle-hint">
              drag around the dot
            </text>
          )}
          {live !== null && (
            <text x={C} y={C - 18} className="circle-live">
              {live}%
            </text>
          )}
          {state.phase === "done" && (
            <text x={C} y={C - 18} className="circle-live">
              {state.pct}%
            </text>
          )}
        </svg>
      </Sketch>
      <p className="circle-result" role="status">
        {state.phase === "done" && (
          <>
            {state.record && <strong className="circle-record">new best! </strong>}
            {verdict(state.pct)}
          </>
        )}
        {state.phase === "fail" && state.msg}
        {(state.phase === "idle" || state.phase === "drawing") && " "}
      </p>
      <p className="circle-best">
        your best: <strong>{best ? `${best}%` : "—"}</strong>
        <span className="note"> · can you crack 90%?</span>
      </p>
    </div>
  );
}
