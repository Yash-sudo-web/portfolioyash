import { useState } from "react";
import { Nav, ThemeToggle, ZoomControl } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About, Contact, Experience, OpenSource, Projects, Skills } from "./components/Sections";

export default function App() {
  const [zoom, setZoom] = useState(1);

  return (
    <>
      <Nav />
      <ThemeToggle />
      <ZoomControl zoom={zoom} setZoom={setZoom} />
      <main className="canvas" style={{ zoom }}>
        <Hero />
        <Experience />
        <Projects />
        <OpenSource />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
