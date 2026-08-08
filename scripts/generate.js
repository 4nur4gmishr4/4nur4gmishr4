const fs = require('fs');
const path = require('path');
const si = require('simple-icons');

const colors = {
  canvas: '#faf9f5',
  surfaceCard: '#efe9de',
  surfaceDark: '#181715',
  surfaceDarkElevated: '#252320',
  surfaceDarkSoft: '#1f1e1b',
  primary: '#cc785c',
  ink: '#141413',
  body: '#3d3d3a',
  muted: '#6c6a64',
  mutedSoft: '#8e8b82',
  onDark: '#faf9f5',
  onDarkSoft: '#a09d96',
  teal: '#5db8a6'
};

const fonts = {
  display: 'Copernicus, "Tiempos Headline", "Cormorant Garamond", "EB Garamond", Georgia, serif',
  body: 'StyreneB, Inter, -apple-system, sans-serif',
  code: '"JetBrains Mono", ui-monospace, monospace'
};

const DATA = {
  hero: "Backend-focused fullstack & applied ai dev. Building cool stuff with LLMs & agents. Obsessed with clean architecture & shipping no-bug code to prod.",
  experience: {
    title: "Full-Stack Developer Intern",
    company: "Prominent Digitech",
    dates: "Dec 2024 – May 2026",
    bullets: [
      "Architected backend supporting 500+ daily requests with sub-second latency.",
      "Integrated context-aware LLMs, driving 35% reduction in support time.",
      "Maintained CI/CD pipelines using Claude Code & Copilot for high reliability."
    ]
  },
  contacts: [
    { link: "https://anuragsterminalbay.vercel.app/", slug: "website" },
    { link: "https://linkedin.com/in/4nur4gmishra", slug: "linkedin" },
    { link: "mailto:anuragmishrasnag06082004@gmail.com", slug: "gmail" }
  ],
  skills_categories: [
    {
      title: "Languages",
      skills: [
        { name: "Python", slug: "python" },
        { name: "TypeScript", slug: "typescript" },
        { name: "JavaScript", slug: "javascript" },
        { name: "SQL", slug: "mysql" },
        { name: "Bash", slug: "gnubash" }
      ]
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React", slug: "react" },
        { name: "Next.js", slug: "nextdotjs" },
        { name: "Tailwind CSS", slug: "tailwindcss" },
        { name: "HTML5", slug: "html5" },
        { name: "CSS3", slug: "css" }
      ]
    },
    {
      title: "Backend & Core",
      skills: [
        { name: "Node.js", slug: "nodedotjs" },
        { name: "Express.js", slug: "express" },
        { name: "Go", slug: "go" },
        { name: "Flask", slug: "flask" },
        { name: "FastAPI", slug: "fastapi" },
        { name: "Django", slug: "django" }
      ]
    },
    {
      title: "Databases & Vector DBs",
      skills: [
        { name: "PostgreSQL", slug: "postgresql" },
        { name: "Prisma", slug: "prisma" },
        { name: "SQLAlchemy", slug: "sqlalchemy" },
        { name: "MongoDB", slug: "mongodb" },
        { name: "Milvus", slug: "milvus" },
        { name: "Qdrant", slug: "qdrant" },
        { name: "Supabase", slug: "supabase" },
        { name: "Firebase", slug: "firebase" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", slug: "amazonaws" },
        { name: "Docker", slug: "docker" },
        { name: "Kubernetes", slug: "kubernetes" },
        { name: "Git", slug: "git" },
        { name: "Actions", slug: "githubactions" },
        { name: "Linux", slug: "linux" },
        { name: "Vercel", slug: "vercel" },
        { name: "Cloudflare", slug: "cloudflare" }
      ]
    },
    {
      title: "AI Integration & Agents",
      skills: [
        { name: "Claude Code", slug: "anthropic" },
        { name: "Copilot", slug: "githubcopilot" },
        { name: "Gemini API", slug: "googlegemini" },
        { name: "LangChain", slug: "langchain" },
        { name: "LangGraph", slug: "langgraph" }
      ]
    },
    {
      title: "Applied AI & LLMOps",
      skills: [
        { name: "DeepSeek", slug: "deepseek" },
        { name: "vLLM", slug: "vllm" },
        { name: "Ollama", slug: "ollama" },
        { name: "HuggingFace", slug: "huggingface" },
        { name: "PyTorch", slug: "pytorch" }
      ]
    }
  ]
};

function wrapText(text, maxChars) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  words.forEach(word => {
    if (currentLine.length + word.length + 1 <= maxChars) {
      currentLine += (currentLine.length ? ' ' : '') + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;'; case '>': return '&gt;';
      case '&': return '&amp;'; case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function getIconPath(slug) {
  if (slug === 'website') return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z";
  if (slug === 'linkedin') return "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
  if (slug === 'amazonaws') return "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z";
  
  // Use simple-icons package to guarantee 100% robust rendering without network drops
  const iconKey = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  if (si[iconKey]) {
    return si[iconKey].path;
  }
  // Fallback brute force search if slug doesn't perfectly match key
  const found = Object.values(si).find(i => i.slug === slug);
  return found ? found.path : '';
}

function makeHero() {
  const introLines = wrapText(DATA.hero, 92);

  let svg = `<svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="200" fill="${colors.canvas}"/>
    <g transform="translate(48, 45)">
    <rect x="0" y="-8" width="12" height="28" fill="${colors.primary}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="24" y="20" fill="${colors.ink}" font-family='${fonts.display}' font-size="36" letter-spacing="-0.02em">Anurag Mishra</text>
    <text x="0" y="55" fill="${colors.primary}" font-family='${fonts.body}' font-size="18" font-weight="600">Applied AI &amp; Backend Engineer</text>
  `;

  introLines.forEach((line, i) => {
    svg += `<text x="0" y="${95 + (i * 24)}" fill="${colors.body}" font-family='${fonts.body}' font-size="15" font-weight="400">${escapeXml(line)}</text>`;
  });

  return svg + `</g></svg>`;
}

function makeShowcase() {
  return `<svg width="800" height="340" viewBox="0 0 800 340" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="340" fill="${colors.canvas}"/>
    <rect x="48" y="28" width="10" height="22" fill="${colors.primary}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="68" y="50" fill="${colors.ink}" font-family='${fonts.display}' font-size="28" letter-spacing="-0.02em">Featured Flagship Engineering</text>

    <!-- Card 1: FaultLine -->
    <rect x="48" y="80" width="340" height="220" rx="12" fill="${colors.surfaceDark}"/>
    <rect x="48" y="80" width="340" height="36" rx="12" fill="${colors.surfaceDarkSoft}"/>
    <circle cx="68" cy="98" r="5" fill="${colors.primary}"/>
    <circle cx="83" cy="98" r="5" fill="${colors.teal}"/>
    <circle cx="98" cy="98" r="5" fill="${colors.muted}"/>
    <text x="120" y="102" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">faultline.ts (20,200+ Users)</text>
    
    <text x="68" y="138" fill="${colors.onDark}" font-family='${fonts.code}' font-size="13">const agent = new FaultLine();</text>
    <text x="68" y="160" fill="${colors.primary}" font-family='${fonts.code}' font-size="13">await agent.analyzeAST(err);</text>
    <text x="68" y="182" fill="${colors.teal}" font-family='${fonts.code}' font-size="13">agent.redactSecrets();</text>
    <text x="68" y="210" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">// VS Code Debugger &amp; Explainer</text>
    <text x="68" y="230" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">// TypeScript • AST • LLMs</text>
    <text x="68" y="262" fill="${colors.onDark}" font-family='${fonts.code}' font-size="13">&gt; Status: 20,200+ Downloads<tspan fill="${colors.primary}">█</tspan>
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </text>

    <!-- Card 2: Null-Secret -->
    <rect x="412" y="80" width="340" height="220" rx="12" fill="${colors.surfaceDark}"/>
    <rect x="412" y="80" width="340" height="36" rx="12" fill="${colors.surfaceDarkSoft}"/>
    <circle cx="432" cy="98" r="5" fill="${colors.primary}"/>
    <circle cx="447" cy="98" r="5" fill="${colors.teal}"/>
    <circle cx="462" cy="98" r="5" fill="${colors.muted}"/>
    <text x="484" y="102" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">null-secret.go (1,500+ Users)</text>
    
    <text x="432" y="138" fill="${colors.onDark}" font-family='${fonts.code}' font-size="13">vault := zeroKnowledge.Init()</text>
    <text x="432" y="160" fill="${colors.primary}" font-family='${fonts.code}' font-size="13">vault.EncryptAES_GCM(data)</text>
    <text x="432" y="182" fill="${colors.teal}" font-family='${fonts.code}' font-size="13">vault.SelfDestruct(onRead)</text>
    <text x="432" y="210" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">// E2E Encrypted Secret Sharing</text>
    <text x="432" y="230" fill="${colors.onDarkSoft}" font-family='${fonts.code}' font-size="12">// Go • React • SQLite • PBKDF2</text>
    <text x="432" y="262" fill="${colors.onDark}" font-family='${fonts.code}' font-size="13">&gt; Security: 100% Encrypted<tspan fill="${colors.primary}">█</tspan>
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </text>
  </svg>`;
}

function makeExperience() {
  const ex = DATA.experience;
  let svg = `<svg width="800" height="300" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="300" fill="${colors.canvas}"/>
    
    <rect x="48" y="28" width="10" height="22" fill="${colors.primary}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="68" y="50" fill="${colors.ink}" font-family='${fonts.display}' font-size="28" letter-spacing="-0.02em">Experience</text>
    <rect x="48" y="80" width="704" height="170" rx="12" fill="${colors.surfaceCard}"/>
    
    <text x="80" y="120" fill="${colors.ink}" font-family='${fonts.body}' font-size="18" font-weight="600">${escapeXml(ex.title)}</text>
    <text x="80" y="145" fill="${colors.primary}" font-family='${fonts.body}' font-size="14" font-weight="500">${escapeXml(ex.company)} • ${ex.dates}</text>
  `;
  
  ex.bullets.forEach((bullet, i) => {
    svg += `<circle cx="85" cy="${175 + (i * 24) - 4}" r="3" fill="${colors.ink}"/>
            <text x="100" y="${175 + (i * 24)}" fill="${colors.body}" font-family='${fonts.body}' font-size="14">${escapeXml(bullet)}</text>`;
  });

  return svg + `</svg>`;
}

async function makeSkills() {
  const categories = DATA.skills_categories;
  
  let currentY = 100;
  let categoryMarkup = "";
  
  categories.forEach(cat => {
    // Draw sub-heading
    categoryMarkup += `
      <text x="48" y="${currentY}" fill="${colors.primary}" font-family='${fonts.body}' font-size="16" font-weight="600" letter-spacing="0.05em">${escapeXml(cat.title.toUpperCase())}</text>
    `;
    currentY += 24;
    
    // Draw grid
    cat.skills.forEach((skill, i) => {
      const col = i % 6;
      const row = Math.floor(i / 6);
      
      const x = 48 + (col * 121.6);
      const y = currentY + (row * 80);
      
      const pathData = getIconPath(skill.slug);
      
      categoryMarkup += `
        <rect x="${x}" y="${y}" width="96" height="70" rx="12" fill="${colors.surfaceCard}"/>
      `;
      
      if (pathData) {
        categoryMarkup += `
          <g transform="translate(${x + 36}, ${y + 16})">
            <path d="${pathData}" fill="${colors.ink}" transform="scale(1)" />
          </g>
        `;
      }
      
      categoryMarkup += `
        <text x="${x + 48}" y="${y + 55}" fill="${colors.ink}" font-family='${fonts.body}' font-size="12" font-weight="500" text-anchor="middle">${escapeXml(skill.name)}</text>
      `;
    });
    
    const rows = Math.ceil(cat.skills.length / 6);
    currentY += (rows * 80) + 40; // Add space after grid for next category
  });
  
  const totalHeight = currentY; 
  
  let svg = `<svg width="800" height="${totalHeight}" viewBox="0 0 800 ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="${totalHeight}" fill="${colors.canvas}"/>
    <rect x="48" y="28" width="10" height="22" fill="${colors.primary}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="68" y="50" fill="${colors.ink}" font-family='${fonts.display}' font-size="28" letter-spacing="-0.02em">Technical Infrastructure</text>
    ${categoryMarkup}
  </svg>`;
  
  return svg;
}

function makeAchievements() {
  return `<svg width="800" height="180" viewBox="0 0 800 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="180" fill="${colors.canvas}"/>
    
    <rect x="48" y="28" width="10" height="22" fill="${colors.primary}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="68" y="50" fill="${colors.ink}" font-family='${fonts.display}' font-size="28" letter-spacing="-0.02em">Achievements &amp; Impact</text>
    <rect x="48" y="80" width="704" height="70" rx="12" fill="${colors.primary}"/>
    
    <circle cx="85" cy="115" r="4" fill="#ffffff"/>
    <text x="100" y="120" fill="#ffffff" font-family='${fonts.body}' font-size="15" font-weight="500">Developer Tool Author: 24,000+ cumulative downloads across software projects.</text>
  </svg>`;
}

async function main() {
  try {
    const outDir = path.join(__dirname, '..', 'assets');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    
    // Generate individual sub-SVGs
    const heroSvg = makeHero();
    const showcaseSvg = makeShowcase();
    const experienceSvg = makeExperience();
    const skillsSvg = await makeSkills();
    const achievementsSvg = makeAchievements();

    // Helper functions for SVG string manipulation
    function getSvgInner(svgString) {
      const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
      return match ? match[1] : '';
    }

    function getSvgHeight(svgString) {
      const match = svgString.match(/height="(\d+)"/i);
      return match ? parseInt(match[1], 10) : 0;
    }

    const hHero = getSvgHeight(heroSvg);
    const hShowcase = getSvgHeight(showcaseSvg);
    const hExp = getSvgHeight(experienceSvg);
    const hInfra = getSvgHeight(skillsSvg);
    const hAch = getSvgHeight(achievementsSvg);

    const totalHeight = hHero + hShowcase + hExp + hInfra + hAch;

    let merged = `<svg width="800" height="${totalHeight}" viewBox="0 0 800 ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">\n`;
    merged += `  <rect width="800" height="${totalHeight}" fill="${colors.canvas}"/>\n`;

    let currentY = 0;

    function appendSection(svgString, height) {
      let inner = getSvgInner(svgString);
      inner = inner.replace(/<rect width="800" height="\d+" fill="#faf9f5"\/?>/gi, '');
      const group = `  <g transform="translate(0, ${currentY})">\n${inner}\n  </g>\n`;
      currentY += height;
      return group;
    }

    merged += appendSection(heroSvg, hHero);
    merged += appendSection(showcaseSvg, hShowcase);
    merged += appendSection(experienceSvg, hExp);
    merged += appendSection(skillsSvg, hInfra);
    merged += appendSection(achievementsSvg, hAch);

    merged += `</svg>`;

    // Save master content profile-v2.svg
    fs.writeFileSync(path.join(outDir, 'profile-v2.svg'), merged);

    const hash = Date.now();

    // Generate standalone 800x44 SVG with clickable icons positioned flush right to x=800
    // Width 800px ensures it scales down 1:1 on mobile screens alongside profile-v2.svg!
    let contactsRowSvg = `<svg width="800" height="44" viewBox="0 0 800 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(656, 2)">`;

    DATA.contacts.forEach((c, idx) => {
      const pathData = getIconPath(c.slug);
      if (pathData) {
        const xOffset = idx * (40 + 12);
        contactsRowSvg += `
        <a href="${c.link}" target="_blank" rel="noopener noreferrer">
          <g transform="translate(${xOffset}, 0)">
            <rect width="40" height="40" rx="10" fill="${colors.primary}" />
            <g transform="translate(10, 10) scale(0.833)">
              <path d="${pathData}" fill="#ffffff" />
            </g>
          </g>
        </a>`;
      }
    });

    contactsRowSvg += `
      </g>
    </svg>`;

    fs.writeFileSync(path.join(outDir, 'contacts-row.svg'), contactsRowSvg);

    // Clean up temporary standalone icons and spacer
    ['spacer.svg', 'icon-website.svg', 'icon-linkedin.svg', 'icon-gmail.svg'].forEach(f => {
      const p = path.join(outDir, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    const readmeContent = `<div align="left" style="line-height: 0;">
  <a href="https://anuragsterminalbay.vercel.app/" target="_blank" rel="noopener noreferrer"><img src="./assets/contacts-row.svg?v=${hash}" width="800" alt="Contacts"></a>
  <img alt="Anurag Mishra Profile" src="./assets/profile-v2.svg?v=${hash}" width="800">
</div>`;
    
    fs.writeFileSync(path.join(__dirname, '..', 'README.md'), readmeContent);
    console.log('Done! Responsive 800px contacts-row.svg generated and aligned flush right for mobile & desktop');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
