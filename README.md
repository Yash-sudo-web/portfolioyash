# portfolioyash

Personal portfolio of Yash Mathur: a hand-drawn, Excalidraw-style canvas built with React, Vite, rough.js and framer-motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

- Content (experience, projects, skills, links) lives in `src/data.js`.
- Hand-drawn shapes come from `src/components/Sketch.jsx` (`<Sketch>` boxes, `<Doodle>` free shapes).
- Keys `1`–`5` jump between sections; theme and zoom controls float on the canvas.
- The contact form posts to the mailer in `mailer/` (deployed at portfolioyashmailer.vercel.app).
