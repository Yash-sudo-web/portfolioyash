import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import rough from "roughjs";

// One shared generator: we only need path data, React renders the <path>s.
const gen = rough.generator();

// Placeholder colours; rough.js needs literal strings, so we tag paths with
// these and map them to CSS classes (which read the theme's CSS variables).
const INK = "INK";
const FILL = "FILL";

function options(o) {
  return {
    seed: o.seed ?? 1,
    roughness: o.roughness ?? 1.1,
    bowing: o.bowing ?? 1,
    stroke: o.stroke === false ? "none" : INK,
    strokeWidth: o.strokeWidth ?? 1.5,
    fill: o.fill ? FILL : undefined,
    fillStyle: o.fillStyle ?? "hachure",
    hachureGap: o.hachureGap ?? 7,
    hachureAngle: o.hachureAngle ?? -41,
    fillWeight: o.fillWeight ?? 1.1,
    disableMultiStroke: o.single ?? false,
  };
}

export function arrow(points, opts) {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 11;
  const head = (d) => [x2 - len * Math.cos(a + d), y2 - len * Math.sin(a + d)];
  return [
    gen.curve(points, opts),
    gen.linearPath([head(0.5), [x2, y2], head(-0.5)], opts),
  ];
}

function shapeFor(shape, w, h, o) {
  const opts = options(o);
  const m = 3;
  switch (shape) {
    case "ellipse":
      return [gen.ellipse(w / 2, h / 2, w - 2 * m, h - 2 * m, opts)];
    case "underline":
      return [
        gen.curve(
          [
            [m, h + 2],
            [w * 0.3, h - 1],
            [w * 0.65, h + 1],
            [w * 0.9, h - 2],
          ],
          { ...opts, strokeWidth: o.strokeWidth ?? 3 },
        ),
      ];
    default:
      return [gen.rectangle(m, m, w - 2 * m, h - 2 * m, opts)];
  }
}

export function Paths({ drawables }) {
  return drawables.flatMap((d, i) =>
    gen.toPaths(d).map((p, j) => {
      const key = `${i}-${j}`;
      if (p.fill === FILL) return <path key={key} d={p.d} className="p-solid" />;
      if (p.stroke === FILL)
        return <path key={key} d={p.d} className="p-fill" strokeWidth={p.strokeWidth} pathLength="1" />;
      if (p.stroke === INK)
        return <path key={key} d={p.d} className="p-ink" strokeWidth={p.strokeWidth} pathLength="1" />;
      return null;
    }),
  );
}

// Fires once when the element scrolls into view, so strokes can "draw" in.
export function useInView(ref, margin = "0px 0px -10% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, margin]);
  return seen;
}

/**
 * A box (or any element) with a hand-drawn outline/fill behind its content.
 * The drawing follows the element's size and draws itself in on first view.
 */
export function Sketch({
  as: Tag = "div",
  shape = "rect",
  color,
  className = "",
  children,
  jitter = false,
  seed = 1,
  sketch = {},
  ...rest
}) {
  const ref = useRef(null);
  const [size, setSize] = useState(null);
  const [s, setSeed] = useState(seed);
  const seen = useInView(ref);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const drawables = useMemo(
    () => (size && size.w > 6 ? shapeFor(shape, size.w, size.h, { ...sketch, seed: s }) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, shape, s, JSON.stringify(sketch)],
  );

  const hover = jitter ? { onMouseEnter: () => setSeed((n) => n + 1) } : {};

  return (
    <Tag
      ref={ref}
      className={`sketch ${seen ? "is-drawn" : ""} ${className}`}
      data-color={color}
      {...hover}
      {...rest}
    >
      {size && (
        <svg className="sketch-svg" width={size.w} height={size.h} aria-hidden="true">
          <Paths drawables={drawables} />
        </svg>
      )}
      {children}
    </Tag>
  );
}

/** Fills its box with a drawing; `draw(gen, opts, w, h)` returns drawables. */
export function Drawn({ draw, className = "", color, sketch = {} }) {
  const ref = useRef(null);
  const [size, setSize] = useState(null);
  const seen = useInView(ref);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const drawables = useMemo(
    () => (size && size.h > 0 ? draw(gen, options(sketch), size.w, size.h) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, draw, JSON.stringify(sketch)],
  );

  return (
    <div ref={ref} className={`drawn ${seen ? "is-drawn" : ""} ${className}`} data-color={color} aria-hidden="true">
      {size && (
        <svg width={size.w} height={size.h}>
          <Paths drawables={drawables} />
        </svg>
      )}
    </div>
  );
}

/** Free-standing doodle of a fixed size. `draw(gen, opts)` returns drawables. */
export function Doodle({ w, h, draw, color, className = "", style, sketch = {} }) {
  const ref = useRef(null);
  const seen = useInView(ref, "0px");
  const drawables = useMemo(() => draw(gen, options(sketch)), [draw, sketch]);
  return (
    <svg
      ref={ref}
      className={`doodle ${seen ? "is-drawn" : ""} ${className}`}
      data-color={color}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={style}
      aria-hidden="true"
    >
      <Paths drawables={drawables} />
    </svg>
  );
}
