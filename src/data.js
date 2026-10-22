export const profile = {
  name: "Yash Mathur",
  role: "SDE-I (Backend/AI) @ smallcase",
  location: "New Delhi, India",
  email: "ymathur123@gmail.com",
  github: "https://github.com/Yash-sudo-web",
  linkedin: "https://www.linkedin.com/in/yashmathur-ai/",
  resume:
    "https://drive.google.com/file/d/1gCyPl44byf5PiJq5-sn-iJrcOYEjNLn4/view?usp=sharing",
};

// Newest first, rendered as a hand-drawn `git log --graph`.
// `lane` 0 is main; the smallcase internship lives on a branch (lane 1) that
// forks off after Sustainiam and merges back as the full-time role.
export const experience = [
  {
    hash: "f3a91c2",
    refs: ["HEAD -> main"],
    lane: 0,
    subject: "Merge branch 'intern': full-time SDE-I (Backend/AI)",
    company: "smallcase",
    url: "https://www.smallcase.com/",
    role: "SDE-I (Backend/AI)",
    period: "Jan 2026 – now",
    color: "yellow",
    points: [
      "Own an internal AI Platform used by 5+ teams to build agents with RAG collections, MCP servers and custom tools",
      "Built a Finance Analyst Agent with quant analysts: MCP tools, RAG knowledge bases, domain skills",
      "CX AI Assistant that reads live chats, pulls customer data via tool calls: 200+ queries a day",
    ],
  },
  {
    hash: "8be07d4",
    refs: ["intern"],
    lane: 1,
    subject: "feat: join smallcase as Backend Engineering Intern",
    company: "smallcase",
    url: "https://www.smallcase.com/",
    role: "Backend Engineering Intern",
    period: "Jul 2025 – Jan 2026",
    color: "blue",
    points: [
      "Laid the foundations of the AI Platform: early RAG pipelines, tool integrations, agent workflows",
      "Evaluator agent on Google ADK scoring 500+ support feedback entries daily",
    ],
  },
  {
    hash: "2c6d5e9",
    refs: [],
    lane: 0,
    subject: "feat: ship Sustainiam's core product as SDE Intern",
    company: "Sustainiam",
    url: "https://sustainiam.com/",
    role: "SDE Intern · remote, SF",
    period: "Jun 2024 – May 2025",
    color: "violet",
    points: [
      "Built the core product's frontend from scratch: 10k+ concurrent real-time updates",
      "250+ PRs merged in a year",
      "Architecture that holds 50k+ concurrent users without falling over",
      "Jest + Playwright suites at 80%+ coverage; automated cron jobs lifted renewals 60%",
    ],
  },
  {
    hash: "7d40b8e",
    refs: [],
    lane: 0,
    subject: "feat: full-stack intern at Purezza Technologies",
    company: "Purezza Technologies",
    url: "https://purezzatechnologies.com/",
    role: "Full-stack Developer Intern · remote",
    period: "Oct 2023 – Nov 2023",
    color: "red",
    points: [
      "Built a job portal and a wholesale e-commerce platform on MERN + Tailwind",
      "Kept the architecture clean enough to scale; containerised backend services with Docker",
      "Shipped in Agile sprints with daily standups and sprint planning",
    ],
  },
  {
    hash: "c19e2f7",
    refs: ["first job"],
    lane: 0,
    subject: "feat: frontend intern at Doubtless",
    company: "Doubtless",
    url: "https://github.com/doubtless46/doubtless-web",
    role: "Frontend Web Developer Intern · part-time",
    period: "Apr 2023 – Jul 2023",
    color: "blue",
    points: [
      "Built the doubt feed UI in React: DoubtCard component, user profile page and the comment thread page",
      "Shipped features through PR review into the staging branch",
    ],
  },
  {
    hash: "0a1b2c3",
    refs: ["tag: v0.1"],
    lane: 0,
    subject: "init: B.Tech CSE @ MSIT, New Delhi",
    period: "Oct 2022",
    color: "green",
    points: [],
  },
];

// Each project carries a small left-to-right architecture: nodes joined by labelled arrows.
export const projects = [
  {
    name: "PandaPrep",
    file: "pandaprep",
    url: "https://pandaprepai.tech/",
    blurb:
      "Upload a syllabus, get exam-ready notes. An agentic pipeline writes them section by section and streams the markdown back live.",
    stat: "300+ active users",
    tags: ["MERN", "Azure", "WebSockets", "BullMQ", "Docker", "GenAI"],
    color: "yellow",
    nodes: [
      { t: "student", s: "syllabus in" },
      { t: "agent pipeline", s: "LLM steps" },
      { t: "BullMQ", s: "job queue" },
      { t: "PDF service", s: "Docker" },
    ],
    edges: ["WebSocket", "jobs", "render"],
    note: "notes stream back as markdown while the agents are still writing",
  },
  {
    name: "Redis in Go",
    file: "redis-go",
    url: "https://github.com/Yash-sudo-web/redis-implementation-golang",
    blurb:
      "A Redis server and client written from scratch. Compatible enough that the official redis-cli can't tell the difference.",
    stat: "drop-in compatible",
    tags: ["Go", "Concurrency", "RESP", "RDB", "Docker"],
    color: "red",
    nodes: [
      { t: "redis-cli", s: "the real one" },
      { t: "RESP parser", s: "per conn goroutine" },
      { t: "keyspace", s: "+ TTL expiry" },
      { t: "replica", s: "master → slave" },
    ],
    edges: ["TCP", "commands", "sync"],
    note: "snapshots load from RDB files on boot",
  },
  {
    name: "Synkro",
    file: "synkro",
    url: "https://github.com/Yash-sudo-web/synkro",
    blurb: "Real-time chat on the MERN stack, built to stay snappy when a lot of people are talking at once.",
    stat: "real-time",
    tags: ["MERN", "Socket.io", "Passport.js", "TailwindCSS"],
    color: "blue",
    nodes: [
      { t: "browser", s: "React" },
      { t: "Node server", s: "Socket.io" },
      { t: "auth", s: "Passport.js" },
      { t: "MongoDB", s: "messages" },
    ],
    edges: ["socket", "session", "persist"],
    note: "one monolith, tuned for lots of open sockets",
  },
  {
    name: "KisaanMitr",
    file: "kisaanmitr",
    url: "https://kisaan-mitr.vercel.app/",
    blurb:
      "Snap a leaf, get a diagnosis. Deep-learning crop disease detection, plus a marketplace that links farmers to agri suppliers.",
    stat: "AI for farms",
    tags: ["Deep Learning", "React", "Flask"],
    color: "green",
    nodes: [
      { t: "leaf photo", s: "farmer's phone" },
      { t: "CNN model", s: "Flask API" },
      { t: "diagnosis", s: "+ treatment" },
      { t: "marketplace", s: "agri suppliers" },
    ],
    edges: ["upload", "predict", "buy fix"],
    note: "from 'what's wrong with my crop' to 'here's where to get the cure'",
  },
];

// Rendered as an annotated stack.ts file; `note` becomes a handwritten margin comment.
export const stack = [
  { key: "languages", items: ["Python", "TypeScript", "Go", "Rust", "C/C++", "SQL"], note: "Go is for fun (see: Redis)", color: "yellow" },
  { key: "backend", items: ["Node.js", "NestJS", "Express", "Django", "Flask"], note: "home turf", color: "blue" },
  { key: "frontend", items: ["React", "Next.js", "React Native", "Tailwind"] },
  { key: "agents", items: ["Agentic AI", "Google ADK", "LangChain", "MCP servers", "tool calling", "sub-agents"], note: "where I spend my days now", color: "violet" },
  { key: "retrieval", items: ["RAG", "vector DBs", "embeddings"] },
  { key: "quality", items: ["evals", "LLM-as-judge", "Jest", "Playwright", "Cypress"], note: "80%+ coverage, I counted", color: "green" },
  { key: "data", items: ["MongoDB", "PostgreSQL"] },
  { key: "infra", items: ["AWS", "Azure", "Docker", "K8s", "GitHub Actions"], note: "it's not done till it's deployed", color: "red" },
];

// The About section plays out as a chat with a (pretend) agent.
export const chat = [
  { from: "you", text: "so who's yash?" },
  {
    from: "agent",
    tool: "read_resume()",
    text: "Backend/AI engineer at smallcase, based in New Delhi. He builds the platform other teams use to ship agents: RAG collections, MCP servers, tools and the evals around them.",
  },
  { from: "you", text: "how'd he get there?" },
  {
    from: "agent",
    tool: "get_timeline()",
    text: "Joined smallcase as a backend intern in Jul 2025, helped lay the AI platform's foundations, and went full-time as SDE-I in Jan 2026. Before that he built Sustainiam's real-time frontend from scratch.",
  },
  { from: "you", text: "and outside work?" },
  {
    from: "agent",
    tool: "search_github()",
    text: "He rebuilds things to see how they work. Exhibit A: a Redis server in Go that the real redis-cli happily talks to. He's also finishing a B.Tech in CSE at MSIT.",
  },
  { from: "you", text: "how do I reach him?" },
  { from: "agent", text: "Scroll down. He replies faster than I do.", cta: true },
];

// Merged PRs to other people's projects, newest first. Pulled from GitHub.
export const oss = {
  stats: [
    { n: "26", label: "merged PRs", color: "green" },
    { n: "15", label: "orgs", color: "violet" },
    { n: "2021", label: "first merge", color: "yellow" },
  ],
  // `detail` marks a code contribution: it gets the highlighted card treatment.
  prs: [
    {
      year: 2024,
      repo: "cloudinary-community/cloudinary-util",
      prs: [206],
      title: "fix: type the videojs instance on CloudinaryVideoPlayer",
      detail: "Root cause of next-cloudinary#426: the player type was missing videojs, so consumers had to ts-ignore it.",
    },
    {
      year: 2024,
      repo: "cloudinary-community/next-cloudinary",
      prs: [535],
      title: "fix: remove the ts-ignore from CldVideoPlayer",
      detail: "Followed the fix downstream: bumped the types package and deleted the hack. Closed #426.",
    },
    { year: 2024, repo: "LambdaTest/wdio-lambdatest-service", prs: [94], title: "fix: repair the CI workflows" },
    { year: 2024, repo: "LambdaTest/lambdatest-buildkite-plugin", prs: [7], title: "chore: bump buildkite plugin-tester to 4.1.1" },
    {
      year: 2023,
      repo: "novuhq/novu-python-legacy",
      prs: [90],
      title: "feat: Blueprint API in the Python SDK",
      detail: "New Blueprint API client, request/response DTOs and a full test suite: +241 lines across 6 files.",
    },
    {
      year: 2023,
      repo: "swirlai/swirl-search",
      prs: [702],
      title: "feat: Algolia SearchProvider",
      detail: "Plugged Algolia into Swirl's federated search as a new provider (#688).",
    },
    { year: 2023, repo: "arc53/DocsGPT", prs: [622, 692], title: "docs: Chatwoot extension + using different LLMs" },
    { year: 2023, repo: "Chimoney/chimoney-community-projects", prs: [312, 329], title: "i18n: Spanish and Korean README translations" },
    {
      year: 2022,
      repo: "novuhq/novu",
      prs: [1444, 1476, 1552],
      title: "feat: Japanese, Danish and Vietnamese in the notification center",
      detail: "Added three locales to the React notification-center package and registered them in its i18n map.",
    },
    { year: 2022, repo: "percona/pxc-docs", prs: [20], title: "docs: fix up the ProxySQL guide" },
    { year: 2021, repo: "opsdroid/opsdroid", prs: [1762], title: "docs: fix a broken link (my very first merge)" },
    { year: 2021, repo: "LoginRadius/awesome-login-pages", prs: [15], title: "docs: mobile screenshots for login pages 7–13" },
  ],
};
