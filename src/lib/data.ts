export const profile = {
  name: "Ahnaf Ahmad Shoumik",
  first: "Ahnaf",
  role: "Senior Software Engineer",
  email: "ahnafahmad2013@gmail.com",
  phone: "+880 1953-593181",
  location: "Dhaka, Bangladesh",
  // URLs taken from the clickable links in the CV PDF
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahnafshoumik19" },
    { label: "GitHub", href: "https://github.com/ahnaf22" },
    { label: "Fiverr", href: "https://www.fiverr.com/ahnaf22" },
    { label: "UVA Online Judge", href: "https://uhunt.onlinejudge.org/id/593325" },
  ],
  cv: "/Ahnaf_Ahmad_Shoumik_CV.pdf",
};

export const aboutText =
  "I'm a senior engineer who likes owning a system from the first requirement call to the 3 a.m. pager. Five years of heavily customised OpenCart storefronts, payment and shipping integrations, and a multi-tenant SaaS I designed, shipped and keep alive on my own Linux servers. I use AI agents every day, and I read every diff before it ships.";

export const stats = [
  { value: 5, suffix: "+", label: "Years in production", note: "PHP · Laravel · OpenCart" },
  { value: 10000, suffix: "+", label: "Concurrent users", note: "Online olympiad, one platform" },
  { value: 9, suffix: "+", label: "Products shipped", note: "Web, SaaS and Flutter" },
  { value: 1, suffix: "", label: "Engineer on Storola", note: "Code, infra, backups, pager" },
];

export type ArtId =
  | "storola"
  | "custom"
  | "smartexam"
  | "parcel"
  | "deshtax"
  | "bricm"
  | "displaylab"
  | "flatshop"
  | "nutriora";

export type Project = {
  id: ArtId;
  title: string;
  kind: string;
  stack: string[];
  summary: string;
  points: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "storola",
    title: "Storola",
    kind: "Multi-tenant e-commerce SaaS",
    stack: ["PHP", "MySQL", "Linux", "Nginx"],
    summary: "Clients launch and run their own online stores. I own everything from the data model to the pager.",
    points: [
      "Designed tenant provisioning, isolated data management, store configuration and subscription-based access.",
      "Architected the multi-tenant data model and an automated store-setup pipeline with schema management across tenant databases.",
      "Sole engineer on the production stack: server config, deployment, SSL, backups, monitoring and hardening.",
    ],
    href: "https://storola.com",
  },
  {
    id: "custom",
    title: "Custom E-commerce builds",
    kind: "Bespoke storefronts for retail clients",
    stack: ["PHP", "Laravel", "OpenCart", "Payments", "Shipping APIs"],
    summary: "Storefronts built around how each client actually sells, not around what a template allows.",
    points: [
      "Bespoke modules, admin reporting tools, order and checkout workflows, and responsive theme work.",
      "Payment and shipping integrations with webhook verification, state reconciliation and retry paths.",
      "Major-version migrations and stability fixes on legacy codebases, including OpenCart 3 to 4.",
    ],
  },
  {
    id: "smartexam",
    title: "SmartExam BD",
    kind: "Online examination & EdTech",
    stack: ["Laravel", "MySQL", "JavaScript", "Zoom API"],
    summary: "MCQ and written exams for the national curriculum, with teachers marking directly on student scripts.",
    points: [
      "Automated MCQ scoring plus teacher-led evaluation of written scripts.",
      "Browser-based annotation tool to draw, mark and comment on answer sheets before results publish.",
      "Leaderboards, self-assessment suggestions, exam notifications and live classes through the Zoom API.",
    ],
  },
  {
    id: "parcel",
    title: "Mohammad Parcel",
    kind: "Courier & parcel management",
    stack: ["Laravel", "MySQL", "REST", "SMS"],
    summary: "A complete operations platform for a courier business launching from zero.",
    points: [
      "Pickup, transit, hub handling, delivery, return and partial-delivery workflows.",
      "Multi-role access for merchants, riders and admins, with COD collection, balances and payouts.",
      "Financial dashboards and status-driven SMS and in-app notifications across the parcel lifecycle.",
    ],
  },
  {
    id: "deshtax",
    title: "DeshTax",
    kind: "Online tax return preparation",
    stack: ["Laravel", "MySQL", "PDF"],
    summary: "A guided filing flow that ends in a complete, submission-ready tax file.",
    points: [
      "Year-wise tax rules, slab and exemption calculation, and strict input validation.",
      "Automated generation of the required tax documents and reports.",
    ],
  },
  {
    id: "bricm",
    title: "Smart BRICM",
    kind: "High-concurrency olympiad platform",
    stack: ["Laravel", "Queues", "Caching", "MySQL"],
    summary: "Nationwide online olympiads with 10,000+ people hitting start at the same moment.",
    points: [
      "Tuned query and caching strategy, queue-based background processing and server configuration.",
      "Kept the platform stable and responsive at peak load.",
    ],
  },
  {
    id: "displaylab",
    title: "DisplayLab",
    kind: "Digital signage & kiosk (US client)",
    stack: ["Flutter", "Firebase FCM", "Android TV"],
    summary: "Android phone, tablet and TV kiosk with a custom playlist slider, driven remotely.",
    points: [
      "Playlist slider rendering images, video and embedded web pages in sequence.",
      "Device pairing by on-screen code; operators assign and schedule playlists across many devices.",
      "FCM for real-time updates and remote commands, plus auto-start on boot for unattended kiosks.",
    ],
  },
  {
    id: "flatshop",
    title: "Flatshop",
    kind: "Multi-platform commerce app",
    stack: ["Flutter", "REST", "Storola"],
    summary: "One native shopping app that plugs into several different store platforms.",
    points: [
      "Syncs catalogue, pricing and orders from Storola stores.",
      "An integration layer that normalises Magento, PrestaShop and Bagisto APIs behind a single client interface.",
    ],
  },
  {
    id: "nutriora",
    title: "Nutriora",
    kind: "Nutrition & calorie tracker",
    stack: ["Flutter", "Local storage"],
    summary: "Daily intake logging with a saved food library and suggestions from your own habits.",
    points: [
      "Per-meal nutrient breakdown, saved foods and offline-first local storage.",
      "Suggestions based on the user's consumption patterns.",
    ],
  },
];

export const experience = [
  {
    when: "Nov 2020 — Now",
    role: "Senior Software Engineer",
    place: "Innolytic IT Ltd",
    where: "Dhaka",
    points: [
      "Lead backend across PHP/Laravel apps and OpenCart platforms, owning features from requirement to production support.",
      "Administer and secure production Linux servers: Nginx/Apache, PHP-FPM, SSL, firewall, SSH, backups, cron.",
      "Bulk schema migrations across many client databases in multi-tenant MySQL, plus recovery of corrupted dump data.",
      "Scope and estimate enterprise work, with phased delivery plans and module-level effort breakdowns.",
      "Brought Claude Code, Codex and Gemini into the team's daily delivery, with every change reviewed by hand.",
    ],
  },
  {
    when: "Project-based",
    role: "Independent Developer",
    place: "Fiverr / Freelancer.com",
    where: "Remote",
    points: [
      "Custom web development, e-commerce customisation and troubleshooting for international clients.",
      "Direct client communication, scoping and revision cycles across legacy-heavy projects.",
    ],
  },
  {
    when: "2020",
    role: "M.Sc. Computer Science",
    place: "Jahangirnagar University",
    where: "Savar",
    points: ["Department of Computer Science & Engineering."],
  },
  {
    when: "2018",
    role: "B.Sc. Computer Science & Engineering",
    place: "Ahsanullah University of Science and Technology",
    where: "Dhaka",
    points: [
      "1st runner-up, Intra-University Programming Contest (2016).",
      "Best Project Award for a space shooter game (2015).",
      "Semifinalist, Banglalink Idea Incubator (2019).",
    ],
  },
];

export const stack = [
  {
    group: "Backend",
    items: ["PHP 7/8", "Laravel", "OpenCart 3 & 4", "REST APIs", "Queues", "Eloquent", "Composer"],
  },
  {
    group: "Commerce",
    items: ["Payment gateways", "Shipping APIs", "Webhooks", "Idempotency", "Multi-tenancy", "SMS & email"],
  },
  {
    group: "Infra",
    items: ["Linux", "Nginx", "Apache", "PHP-FPM", "SSL/TLS", "Bash", "Firewall & SSH", "Backups"],
  },
  {
    group: "Data",
    items: ["MySQL", "MariaDB", "Schema design", "Indexing", "Query tuning", "Data recovery"],
  },
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "Firebase FCM", "Android TV", "Offline storage"],
  },
  {
    group: "AI workflow",
    items: ["Claude Code", "Codex", "Gemini", "MCP", "Prompt & context design"],
  },
  {
    group: "Frontend",
    items: ["JavaScript", "jQuery", "Twig", "Bootstrap", "Next.js", "React"],
  },
];
