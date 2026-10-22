import { useState } from "react";
import { Sketch } from "../Sketch";
import { BugBash } from "./BugBash";
import { CircleGame } from "./CircleGame";
import { Reflex } from "./Reflex";
import "./games.css";

const GAMES = [
  { id: "circle", label: "circle", title: "draw a perfect circle", Game: CircleGame },
  { id: "bugs", label: "bug bash", title: "squash the bugs", Game: BugBash },
  { id: "reflex", label: "ship it", title: "how fast can you ship?", Game: Reflex },
];

const KEY = "arcade-game";

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (GAMES.some((g) => g.id === saved)) return saved;
  } catch {}
  return GAMES[0].id;
}

export function Arcade() {
  const [id, setId] = useState(initial);
  const [spin, setSpin] = useState(0);
  const game = GAMES.find((g) => g.id === id);

  const pick = (next) => {
    setId(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  const random = () => {
    const others = GAMES.filter((g) => g.id !== id);
    pick(others[Math.floor(Math.random() * others.length)].id);
    setSpin((n) => n + 1);
  };

  return (
    <div className="arcade">
      <p className="note arcade-kicker">while you're here,</p>
      <h3 className="arcade-title">{game.title}</h3>

      <div className="arcade-bar">
        <div className="arcade-tabs" role="tablist" aria-label="Pick a game">
          {GAMES.map((g, i) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={g.id === id}
              className={`arcade-tab ${g.id === id ? "is-active" : ""}`}
              onClick={() => pick(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <Sketch as="button" className="arcade-random" jitter seed={361} onClick={random} title="Play a random game">
          <span className="dice" style={{ transform: `rotate(${spin * 360}deg)` }}>
            🎲
          </span>{" "}
          random
        </Sketch>
      </div>

      <game.Game key={id} />
    </div>
  );
}
