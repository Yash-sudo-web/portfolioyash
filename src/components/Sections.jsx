import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Doodle, Drawn, Sketch, arrow, useInView } from "./Sketch";
import { Arcade } from "./games/Arcade";
import { scrollToId } from "./Nav";
import { chat, experience, oss, profile, projects, stack } from "../data";

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.55, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] },
});

function Heading({ n, children, color = "red" }) {
  return (
    <motion.h2 className="section-title" {...reveal()}>
      {n && <span className="section-num">{n}</span>}
      <Sketch as="span" className="title-underline" shape="underline" color={color} seed={n ? +n : 9}>
        {children}
      </Sketch>
    </motion.h2>
  );
}

// git-graph geometry: lanes sit at fractions of the gutter width; DOT_Y is
// the commit dot's y within its row.
const LANES = [0.2, 0.68];
const DOT_Y = 21;

// One drawer per commit row, built once so <Drawn> can memoise its paths.
const graphDrawers = experience.map((c, i) => (g, o, w, h) => {
  const LANE = LANES.map((f) => Math.round(f * w));
  const prev = experience[i - 1];
  const next = experience[i + 1];
  const x = LANE[c.lane];
  const main = { ...o, seed: 200 + i, strokeWidth: 2 };
  const branch = { ...o, seed: 300 + i, strokeWidth: 1.4 };
  const out = [];

  if (c.lane === 0) {
    if (prev) out.push(g.line(x, 0, x, DOT_Y - 12, main));
    if (next) out.push(g.line(x, DOT_Y + 12, x, h, main));
    // Merge: the branch comes up from below and joins this commit.
    if (next?.lane === 1)
      out.push(g.curve([[LANE[1], h], [LANE[1], DOT_Y + 30], [x + 10, DOT_Y + 8]], branch));
    // Fork: the branch leaves this commit and heads up.
    if (prev?.lane === 1)
      out.push(g.curve([[x + 10, DOT_Y - 8], [LANE[1], DOT_Y - 26], [LANE[1], 0]], branch));
  } else {
    out.push(g.line(LANE[0], 0, LANE[0], h, main));
    out.push(g.line(x, 0, x, DOT_Y - 12, branch));
    out.push(g.line(x, DOT_Y + 12, x, h, branch));
  }

  out.push(g.circle(x, DOT_Y, 20, { ...o, seed: 400 + i, fill: "FILL", fillStyle: "solid" }));
  if (c.lane === 0 && next?.lane === 1)
    out.push(g.circle(x, DOT_Y, 30, { ...o, seed: 500 + i, strokeWidth: 1.2 }));
  return out;
});

function Commit({ c, i }) {
  const [open, setOpen] = useState(true);
  const hasDiff = c.points.length > 0;

  return (
    <motion.div className={`commit lane-${c.lane}`} {...reveal(i)}>
      <Drawn className="graph" color={c.color} draw={graphDrawers[i]} />
      <div className="commit-body">
        <button
          className="commit-head"
          onClick={() => hasDiff && setOpen(!open)}
          aria-expanded={hasDiff ? open : undefined}
          disabled={!hasDiff}
        >
          <span className="hash">{c.hash}</span>
          {c.refs.map((r) => (
            <span key={r} className={`ref ref-${r.split(/[ :]/)[0].toLowerCase()}`}>
              {r}
            </span>
          ))}
          <span className="subject">{c.subject}</span>
          {hasDiff && <span className="diffstat">+{c.points.length} {open ? "▾" : "▸"}</span>}
        </button>
        <p className="commit-meta">
          {c.company && (
            <>
              <a href={c.url} target="_blank" rel="noreferrer">
                {c.company} ↗
              </a>
              {" · "}
              {c.role}
              {" · "}
            </>
          )}
          <span className="date">{c.period}</span>
        </p>
        {hasDiff && open && (
          <ul className="diff">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="work" className="section">
      <Heading n="01">Experience</Heading>
      <motion.p className="git-cmd" {...reveal()}>
        <span className="prompt">$</span> git log --graph --decorate yash/career
      </motion.p>
      <div className="git-log">
        {experience.map((c, i) => (
          <Commit key={c.hash} c={c} i={i} />
        ))}
      </div>
      <p className="note flow-note">
        ↑ newest on top. the intern branch got merged into main in Jan 2026.
      </p>
    </section>
  );
}

const archArrow = (g, o) =>
  arrow(
    [
      [4, 20],
      [34, 15],
      [64, 20],
    ],
    { ...o, seed: 8, strokeWidth: 1.6 },
  );

function Architecture({ project }) {
  return (
    <div className="arch">
      {project.nodes.map((n, i) => (
        <Fragment key={n.t}>
          {i > 0 && (
            <div className="arch-edge">
              <span className="arch-label">{project.edges[i - 1]}</span>
              <Doodle w={68} h={30} draw={archArrow} />
            </div>
          )}
          <Sketch
            className="arch-node"
            color={project.color}
            seed={i + 101}
            sketch={i === 1 ? { fill: true, hachureGap: 6 } : {}}
          >
            <strong>{n.t}</strong>
            <span>{n.s}</span>
          </Sketch>
        </Fragment>
      ))}
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section id="projects" className="section">
      <Heading n="02" color="blue">
        Things I've built
      </Heading>

      <motion.div className="tabs" role="tablist" aria-label="Projects" {...reveal(1)}>
        {projects.map((x, i) => (
          <Sketch
            as="button"
            key={x.name}
            role="tab"
            aria-selected={i === active}
            className={`tab ${i === active ? "is-active" : ""}`}
            color={x.color}
            seed={i + 111}
            jitter
            sketch={i === active ? { fill: true, fillStyle: "zigzag", hachureGap: 5 } : {}}
            onClick={() => setActive(i)}
          >
            {x.file}
            <span className="tab-ext">.md</span>
          </Sketch>
        ))}
      </motion.div>

      <motion.div {...reveal(2)}>
        <Sketch className="project-panel" seed={121} role="tabpanel" key={p.name}>
          <div className="project-head">
            <div>
              <h3 className="card-title project-name">
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.name} ↗
                </a>
              </h3>
              <p className="project-blurb">{p.blurb}</p>
            </div>
            <Sketch as="span" shape="ellipse" className="stat" color={p.color} seed={active + 41}>
              {p.stat}
            </Sketch>
          </div>

          <p className="note arch-title">how it works ↓</p>
          <Architecture project={p} />
          <p className="note arch-note">* {p.note}</p>

          <ul className="chips">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Sketch>
      </motion.div>

      <p className="note more">
        {active + 1} of {projects.length} · more on{" "}
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </p>
    </section>
  );
}

const heart = (g, o) => [
  g.path("M22 36 C 6 24, 4 10, 14 8 C 19 7, 22 11, 22 14 C 22 11, 25 7, 30 8 C 40 10, 38 24, 22 36 Z", {
    ...o,
    seed: 171,
    fill: "FILL",
    hachureGap: 3.5,
  }),
];

const PRS_URL =
  "https://github.com/search?q=is%3Apr+author%3AYash-sudo-web+is%3Amerged+-user%3AYash-sudo-web&type=pullrequests";

export function OpenSource() {
  const years = [...new Set(oss.prs.map((p) => p.year))];

  return (
    <section id="oss" className="section">
      <Heading n="03" color="green">
        Open source
      </Heading>
      <div className="oss-layout">
        <motion.div {...reveal(1)}>
          <Sketch className="letter" seed={161} sketch={{ roughness: 0.8 }}>
            <Doodle className="letter-heart" color="red" w={44} h={42} draw={heart} />
            <p className="letter-to">Dear open source,</p>
            <p>
              I learned to code in public, one pull request at a time. My first merge, back in 2021, was a
              tiny fix in opsdroid, and I've been chasing that purple “merged” badge ever since.
            </p>
            <p>
              Since then you've let me write the Blueprint API (tests included) for Novu's Python SDK, ship
              Japanese, Danish and Vietnamese in Novu's notification center, plug Algolia into Swirl's search,
              and chase a TypeScript bug at Cloudinary across two repos until the ts-ignore could finally go.
              Most Octobers, I come back for more.
            </p>
            <p>
              Thank you for the patient maintainers and the honest code reviews, and for teaching me to read
              other people's code before writing my own.
            </p>
            <p className="letter-sign">— yash</p>
          </Sketch>
          <div className="oss-stats">
            {oss.stats.map((s, i) => (
              <Sketch key={s.label} as="div" shape="ellipse" className="oss-stat" color={s.color} seed={181 + i}>
                <strong>{s.n}</strong>
                <span>{s.label}</span>
              </Sketch>
            ))}
          </div>
        </motion.div>

        <motion.div className="pr-log" {...reveal(2)}>
          {years.map((y) => (
            <div className="pr-year" key={y}>
              <span className="year">{y}</span>
              <ul>
                {oss.prs
                  .filter((p) => p.year === y)
                  .map((p) => (
                    <li key={p.repo + p.prs[0]} className={p.detail ? "pr-code" : "pr-minor"}>
                      <span className="merged">merged</span>
                      <a className="pr-repo" href={`https://github.com/${p.repo}`} target="_blank" rel="noreferrer">
                        {p.repo}
                      </a>
                      <span className="pr-title">{p.title}</span>
                      {p.detail && <span className="pr-detail">{p.detail}</span>}
                      <span className="pr-nums">
                        {p.prs.map((n) => (
                          <a key={n} href={`https://github.com/${p.repo}/pull/${n}`} target="_blank" rel="noreferrer">
                            #{n}
                          </a>
                        ))}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <p className="note more">
            + a handful of smaller ones ·{" "}
            <a href={PRS_URL} target="_blank" rel="noreferrer">
              every merged PR ↗
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function About() {
  const ref = useRef(null);
  const seen = useInView(ref, "0px 0px -25% 0px");
  const [shown, setShown] = useState(() => (reducedMotion() ? chat.length : 0));
  const next = chat[shown];
  const typing = seen && next?.from === "agent";

  // Play the conversation one message at a time once it scrolls into view.
  useEffect(() => {
    if (!seen || !next) return;
    const delay = next.from === "agent" ? 1300 : shown === 0 ? 300 : 700;
    const t = setTimeout(() => setShown((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [seen, shown, next]);

  return (
    <section id="about" className="section about">
      <Heading color="yellow">About</Heading>
      <div className="about-layout">
        <Sketch className="chat" seed={131}>
          <div className="chat-bar">
            <span className="chat-dot" />
            <span className="chat-name">ask-yash</span>
            <span className="chat-status">{typing ? "calling tools…" : seen && !next ? "idle" : "online"}</span>
          </div>
          <div className="chat-log" ref={ref}>
            {chat.map((m, i) => (
              <div
                key={i}
                className={`msg msg-${m.from} ${i < shown ? "is-shown" : ""}`}
                aria-hidden={i >= shown}
              >
                {m.tool && <span className="tool-call">⚙ {m.tool} ✓</span>}
                <Sketch
                  className="bubble"
                  color={m.from === "agent" ? "violet" : undefined}
                  seed={i + 141}
                  sketch={m.from === "agent" ? { fill: true, hachureGap: 8, roughness: 0.9 } : { roughness: 0.9 }}
                >
                  {m.text}
                  {m.cta && (
                    <button className="inline-link" onClick={() => scrollToId("contact")}>
                      take me there ↓
                    </button>
                  )}
                </Sketch>
              </div>
            ))}
            {typing && (
              <div className="typing" aria-label="typing">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
        </Sketch>
        <p className="note about-aside">
          ← not a real agent.
          <br />
          (yet. give me a weekend.)
        </p>
      </div>
    </section>
  );
}

export function Skills() {
  const width = String(stack.length + 3).length;
  const lines = [
    { code: <><span className="kw">export const</span> <span className="fn">stack</span> = {"{"}</> },
    ...stack.map((s) => ({
      code: (
        <>
          {"  "}
          <span className="key">{s.key}</span>: [
          {s.items.map((x, j) => (
            <span key={x}>
              <span className="str">"{x}"</span>
              {j < s.items.length - 1 && ", "}
            </span>
          ))}
          ],
        </>
      ),
      note: s.note,
      color: s.color,
    })),
    { code: <>{"}"} <span className="kw">satisfies</span> <span className="fn">Engineer</span>;</> },
  ];

  return (
    <section id="skills" className="section">
      <Heading n="04" color="violet">
        Stack
      </Heading>
      <motion.div {...reveal(1)}>
        <Sketch className="editor" seed={151}>
          <div className="editor-bar">
            <span className="editor-tab">stack.ts</span>
            <span className="editor-path">~/yash/src</span>
          </div>
          <pre className="editor-code">
            {lines.map((l, i) => (
              <div className="code-line" key={i}>
                <span className="ln">{String(i + 1).padStart(width, " ")}</span>
                <code>{l.code}</code>
                {l.note && (
                  <span className="margin-note" data-color={l.color}>
                    ← {l.note}
                  </span>
                )}
              </div>
            ))}
          </pre>
        </Sketch>
      </motion.div>
      <p className="note more">type-checks fine. mostly.</p>
    </section>
  );
}

const MAILER = "https://portfolioyashmailer.vercel.app/send-email";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(MAILER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = (name) => ({
    name,
    value: form[name],
    required: true,
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  });

  return (
    <section id="contact" className="section contact">
      <Heading n="05">Say hi</Heading>

      <div className="contact-grid">
        <motion.div {...reveal(1)}>
          <Sketch as="button" className="email-box" jitter seed={71} onClick={copy}>
            <span className="email">{profile.email}</span>
            <span className="note">{copied ? "copied ✓" : "click to copy"}</span>
          </Sketch>
          <div className="links">
            {[
              ["GitHub", profile.github],
              ["LinkedIn", profile.linkedin],
              ["Résumé", profile.resume],
            ].map(([label, href], i) => (
              <Sketch as="a" key={label} className="btn" href={href} target="_blank" rel="noreferrer" jitter seed={81 + i}>
                {label} ↗
              </Sketch>
            ))}
          </div>
          <form className="contact-form" onSubmit={submit}>
            <p className="note">or leave a note on the canvas</p>
            <Sketch className="field" seed={91}>
              <input placeholder="your name" aria-label="Name" {...field("name")} />
            </Sketch>
            <Sketch className="field" seed={92}>
              <input type="email" placeholder="your email" aria-label="Email" {...field("email")} />
            </Sketch>
            <Sketch className="field" seed={93}>
              <textarea rows={4} placeholder="what are we building?" aria-label="Message" {...field("message")} />
            </Sketch>
            <div className="form-row">
              <Sketch
                as="button"
                type="submit"
                className="btn btn-primary"
                color="blue"
                jitter
                seed={94}
                sketch={{ fill: true, fillStyle: "solid" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "sending…" : "Send"}
              </Sketch>
              <span className="note" role="status">
                {status === "sent" && "got it, I'll reply soon ✓"}
                {status === "error" && "that didn't go through, try email instead"}
              </span>
            </div>
          </form>
        </motion.div>

        <motion.div {...reveal(2)}>
          <Arcade />
        </motion.div>
      </div>

      <footer className="footer note">
        drawn by hand (well, by rough.js) · © {new Date().getFullYear()} {profile.name}
      </footer>
    </section>
  );
}
