const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public');
const toolsDir = path.join(outDir, 'tools');
const categoryDir = path.join(outDir, 'category');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });
if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

const SITE_URL = 'https://freemium.services';
const TQ_URL = 'https://turboquant.network';

// --- DATA DEFINITION ---
const categories = [
    { 
        id: 'ai-tools', 
        name: 'AI Tools', 
        icon: '🤖', 
        desc: 'The definitive guide to building a free, open-source AI stack with LLMs, RAG, and Agents.',
        tools: ['n8n', 'dify', 'langflow', 'ollama', 'open-webui'],
        longDesc: `
            <h2>The Definitive Guide to Open-Source AI Stacks in 2026</h2>
            <p>Welcome to the ultimate hub for Open-Source Artificial Intelligence. In 2026, the landscape of AI has shifted from monolithic SaaS providers to modular, self-hosted stacks. This guide explores the semantic entities required to dominate the AI landscape, focusing on LLMs, RAG (Retrieval-Augmented Generation), and autonomous agents.</p>
            <h3>1. The Rise of Data Sovereignty in AI</h3>
            <p>Organizations are increasingly moving away from closed-source models to maintain control over their proprietary data. By utilizing tools like <strong>Ollama</strong> for local inference and <strong>Qdrant</strong> for vector storage, you can build production-grade AI systems that never leak sensitive information to third-party providers. This sovereignty is the cornerstone of modern enterprise AI strategy.</p>
            <h3>2. Mastering RAG (Retrieval-Augmented Generation)</h3>
            <p>RAG pipelines have become the standard for grounding LLMs in reality. Instead of relying solely on pre-trained knowledge, RAG allows your AI to query your internal documentation in real-time. Tools like <strong>Dify</strong> and <strong>Onyx</strong> simplify this orchestration, providing out-of-the-box support for vector embedding and context retrieval.</p>
            <h3>3. Autonomous Agents and Workflow Automation</h3>
            <p>The next frontier is agentic workflows. Autonomous agents can now use tools, execute bash commands, and iterate on complex multi-step goals. Integrating <strong>Claude Code</strong> with <strong>n8n</strong> allows developers to automate entire software development lifecycles (SDLC) with zero human intervention in the loop.</p>
        `
    },
    { 
        id: 'automation-tools', 
        name: 'Automation', 
        icon: '⚙️', 
        desc: 'Mastering workflow automation without vendor lock-in using No-code and Low-code nodes.',
        tools: ['n8n', 'activepieces', 'windmill', 'pipedream'],
        longDesc: `
            <h2>Building Resilient Automation Architectures</h2>
            <p>Workflow automation is the glue of modern digital business. However, relying on proprietary platforms like Zapier creates significant risk through vendor lock-in and high task-based costs. Our directory focuses on fair-code and open-source alternatives that prioritize efficiency and flexibility.</p>
            <h3>1. The iPaaS Revolution</h3>
            <p>Modern Integration Platform as a Service (iPaaS) solutions like <strong>n8n</strong> provide a visual interface for connecting over 400 applications. Because these tools can be self-hosted on the <strong>TurboQuant DePIN</strong> network, you can run thousands of execution steps for the price of raw compute, rather than paying per-task premiums.</p>
            <h3>2. Event-Driven Architectures</h3>
            <p>Leveraging webhooks and cron triggers allows your infrastructure to react in real-time to external signals. Whether it is processing a new Stripe payment or reacting to a GitHub pull request, open-source automation nodes ensure your data flows smoothly across your entire tech stack.</p>
        `
    },
    { 
        id: 'self-hosting', 
        name: 'Self-Hosting', 
        icon: '🖥️', 
        desc: 'The complete guide to data sovereignty and homelab infrastructure using Docker and K8s.',
        tools: ['coolify', 'ollama', 'dify', 'open-webui'],
        longDesc: `
            <h2>The Self-Hosting Handbook: From Homelab to Enterprise</h2>
            <p>Self-hosting is no longer just for enthusiasts; it is a strategic requirement for privacy-conscious organizations. This pillar page provides the technical scaffolding for deploying and maintaining your own software stack with zero reliance on the public cloud.</p>
            <h3>1. Containerization with Docker and Kubernetes</h3>
            <p>The standard for modern self-hosting is containerization. <strong>Docker</strong> allows you to package any application into an immutable unit that runs anywhere. For larger scales, <strong>Kubernetes</strong> provides the orchestration required for high-availability and elastic scaling.</p>
            <h3>2. Infrastructure as Code (IaC)</h3>
            <p>Managing servers manually is a thing of the past. Using tools like <strong>Coolify</strong> or custom Ansible playbooks, you can treat your hardware as code, ensuring that your deployments are reproducible, secure, and easily backable.</p>
        `
    }
];

const faqBank = [
    { q: 'What is Freemium.Services?', a: 'Freemium.Services is the world\'s largest verified directory of freemium, free, and open-source software (FOSS). We index over 2,800 tools across 47 categories, helping developers, founders, and IT professionals discover software that can be self-hosted or used with a free tier. Unlike general directories, we prioritize tools that offer data sovereignty and avoid vendor lock-in.' },
    { q: 'What does "Freemium" mean?', a: '"Freemium" is a business model where a software product is offered free of charge for basic usage, but a premium is charged for advanced features, increased usage limits, or enterprise support. This model is popular among startups and open-source companies because it lowers the barrier to entry. Examples include n8n (free self-hosted, paid cloud), Onyx (free community edition, paid enterprise), and Windmill.' },
    { q: 'What is Open Source software?', a: 'Open Source software (OSS) is code that is released under a license in which the copyright holder grants users the rights to use, study, change, and distribute the software to anyone and for any purpose. Popular open-source licenses include MIT License (permissive), AGPLv3 (strong copyleft, requires sharing modifications of hosted services), and Apache 2.0.' },
    { q: 'What is Self-Hosting?', a: 'Self-hosting is the practice of running and maintaining software applications on your own private server or local hardware, rather than using a third-party cloud provider (SaaS). This gives you full ownership of your data, customizability, and often lower long-term costs. We provide step-by-step self-hosting guides for tools like Dify and Langflow.' },
    { q: 'What is Docker?', a: 'Docker is a platform that packages software into standardized units called containers. A container bundles the application code with all its dependencies (libraries, system tools) so it runs reliably on any Linux server. It is the standard for modern self-hosting.' },
    { q: 'What is the best free alternative to Zapier?', a: 'n8n is widely considered the best free alternative to Zapier. It is open-source (Fair-code), self-hostable, and offers over 400 native integrations. It provides a visual workflow editor and is significantly more cost-effective for high-volume automation.' },
    { q: 'What is RAG?', a: 'RAG (Retrieval-Augmented Generation) is a technique that enhances the accuracy of LLMs by providing them with real-time, proprietary data from external sources (like your company documents). Tools like Dify and Onyx are built specifically to implement RAG workflows.' },
    { q: 'How can I run an LLM locally?', a: 'Use Ollama. Ollama is a tool that allows you to download and run open-source LLMs (like Llama 3, Mistral, Gemma) directly on your local machine or self-hosted server. It provides a simple CLI and an API compatible with OpenAI.' }
];

const allTools = {
    'n8n': { 
        name: 'n8n', tag: 'Automation', emoji: '🔄', github_stars: 42000, license: 'Fair-code (Apache 2.0)',
        description: 'n8n is a workflow automation tool that connects various apps and services. Unlike Zapier or Make, n8n offers true self-hosting with unlimited operations.',
        install: 'docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n',
        features: ['400+ native integrations', 'Self-hostable with Docker', 'Built-in AI nodes for LLM integration', 'Webhook support for real-time triggers'],
        alternatives: ['activepieces', 'windmill', 'pipedream']
    },
    'ollama': { 
        name: 'Ollama', tag: 'Local LLM', emoji: '🦙', github_stars: 78000, license: 'MIT',
        description: 'Get up and running with large language models locally. Ollama allows you to run Llama 3, Mistral, and other models directly on your hardware.',
        install: 'curl -fsSL https://ollama.com/install.sh | sh',
        features: ['Local LLM execution', 'Multi-model support (GGUF)', 'REST API interface', 'GPU acceleration support'],
        alternatives: ['open-webui', 'lmstudio']
    },
    'dify': {
        name: 'Dify', tag: 'AI Platform', emoji: '🌊', github_stars: 35000, license: 'Apache 2.0',
        description: 'Dify is an open-source LLM app development platform. Its intuitive interface combines AI workflow, RAG pipeline, and agent capabilities.',
        install: 'git clone https://github.com/langgenius/dify.git && cd dify/docker && docker-compose up -d',
        features: ['Visual orchestration of LLM apps', 'Built-in RAG engine', 'Prompt IDE', 'Vector database integrations'],
        alternatives: ['langflow', 'flowise']
    }
};

const MASTER_CSS = `
:root {
  --bg: #080B10; --bg2: #0D1117; --bg3: #111820; --surface: #141C26; --surface2: #1A2332;
  --border: #1E2D40; --border2: #243344; --text: #E8F0F8; --text2: #9BB0C8; --text3: #5A7A9A;
  --accent: #00D4FF; --accent2: #0099CC; --green: #00FF88; --green2: #00CC6A; --orange: #FF6B35;
  --font-display: 'Syne', sans-serif; --font-mono: 'Space Mono', monospace; --font-body: 'DM Sans', sans-serif;
  --radius: 8px; --radius2: 12px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);line-height:1.6;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0}
nav{position:sticky;top:0;z-index:100;background:rgba(8,11,16,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 2rem}
.nav-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:2rem;height:60px}
.logo{font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--accent);text-decoration:none;letter-spacing:-0.5px}
.logo span{color:var(--green)}
.nav-links{display:flex;align-items:center;gap:0.25rem;list-style:none;margin-left:auto}
.nav-links a{color:var(--text2);text-decoration:none;font-size:0.875rem;padding:0.4rem 0.75rem;border-radius:var(--radius);transition:all 0.2s}
.nav-links a:hover{color:var(--text);background:var(--surface)}
.container{max-width:1100px;margin:0 auto;padding:0 2rem;position:relative;z-index:1}
h1,h2,h3{font-family:var(--font-display);font-weight:800;letter-spacing:-1px}
.page-hero{padding:5rem 0 4rem;position:relative;border-bottom:1px solid var(--border);}
.page-hero h1{font-size:clamp(2.5rem,6vw,4.5rem);margin-bottom:1.5rem;line-height:1.1}
.page-hero p{color:var(--text2);font-size:1.3rem;margin-bottom:2rem;max-width:800px;}
.prose{color:var(--text2);line-height:1.8;font-size:1.15rem;margin:4rem 0}
.prose h2{color:var(--text);margin:3.5rem 0 1.5rem;font-size:2.2rem;border-left:4px solid var(--accent);padding-left:1.5rem;}
.prose h3{color:var(--text);margin:2.5rem 0 1rem;font-size:1.6rem;}
.prose p{margin-bottom:1.8rem;}
.prose ul{padding-left:1.5rem;margin-bottom:2rem;}
.prose li{margin-bottom:0.8rem;}
.prose a{color:var(--accent);text-decoration:none;font-weight:600;} .prose a:hover{text-decoration:underline;}
pre{background:#050810;padding:2rem;border-radius:var(--radius);border:1px solid var(--border2);overflow-x:auto;margin:2rem 0;font-family:var(--font-mono);color:var(--green);font-size:0.95rem;box-shadow:inset 0 4px 20px rgba(0,0,0,0.5);}
.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem;margin:3rem 0;}
.tool-card{background:var(--surface);border:1px solid var(--border);padding:2rem;border-radius:var(--radius2);text-decoration:none;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);display:flex;flex-direction:column;gap:1rem;}
.tool-card:hover{transform:translateY(-5px);border-color:var(--accent);background:var(--surface2);box-shadow:0 12px 40px rgba(0,212,255,0.1);}
.tool-card h3{color:var(--text);font-size:1.4rem;font-family:var(--font-display);}
.tool-card p{color:var(--text2);font-size:0.95rem;flex-grow:1;}
.faq-section{margin-top:6rem;padding-top:4rem;border-top:1px solid var(--border)}
.faq-item{margin-bottom:3rem;}
.faq-item h3{font-size:1.3rem;margin-bottom:1rem;color:var(--text);}
.faq-item p{color:var(--text2);line-height:1.7;}
footer{background:var(--bg2);border-top:1px solid var(--border);padding:6rem 2rem 3rem;margin-top:10rem}
.footer-bottom{max-width:1400px;margin:3rem auto 0;padding-top:2rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text3);font-family:var(--font-mono)}
`;

const getLayout = (title, content, head = {}, faqSchema = null) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Freemium.Services</title>
    <link rel="canonical" href="${SITE_URL}${head.path || ''}">
    <meta name="description" content="${head.description || 'Verified directory of freemium and open-source software.'}">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
    <style>${MASTER_CSS}</style>
    ${faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ''}
</head>
<body>
    <nav>
        <div class="nav-inner">
            <a href="/" class="logo">freemium<span>.services</span></a>
            <ul class="nav-links">
                <li><a href="/category/ai-tools.html">AI Tools</a></li>
                <li><a href="/category/automation-tools.html">Automation</a></li>
                <li><a href="/docs.html">Docs</a></li>
                <li><a href="${TQ_URL}" style="color:var(--accent)">TurboQuant ↗</a></li>
            </ul>
        </div>
    </nav>
    <main>${content}</main>
    <footer>
        <div class="container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4rem;">
            <div><a href="/" class="logo">freemium<span>.services</span></a><p style="margin-top:1.5rem;color:var(--text3);font-size:0.9rem;">Empowering developers with open-source sovereignty and freemium intelligence.</p></div>
            <div><h4 style="margin-bottom:1.5rem;">Categories</h4>${categories.map(c=>`<a href="/category/${c.id}.html" style="display:block;color:var(--text3);text-decoration:none;margin-bottom:0.5rem;">${c.name}</a>`).join('')}</div>
            <div><h4 style="margin-bottom:1.5rem;">Resources</h4><a href="/docs.html" style="display:block;color:var(--text3);text-decoration:none;margin-bottom:0.5rem;">Documentation</a><a href="/quickstart.html" style="display:block;color:var(--text3);text-decoration:none;margin-bottom:0.5rem;">Quickstart</a></div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Freemium.Services.</span>
            <span><a href="/sitemap.xml" style="color:var(--accent);">XML Sitemap</a></span>
        </div>
    </footer>
</body>
</html>`;
};

// --- CORE GENERATORS ---

function genCategoryPages() {
    categories.forEach(cat => {
        let toolsHTML = cat.tools ? cat.tools.map(tid => {
            const t = allTools[tid] || { name: tid, description: 'High-performance open-source utility.', emoji: '🔧' };
            return `<a href="/tools/${tid}.html" class="tool-card">
                <h3>${t.emoji} ${t.name}</h3>
                <p>${t.description}</p>
                <div style="font-size:0.75rem;color:var(--accent);font-family:var(--font-mono);">VIEW GUIDE →</div>
            </a>`;
        }).join('') : '';

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqBank.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        };

        let content = `
        <div class="container">
            <div class="page-hero">
                <h1>${cat.icon} ${cat.name} — Essential Open Source Hub</h1>
                <p>${cat.desc}</p>
            </div>
            <div class="prose">
                <h2>Top Verified ${cat.name}</h2>
                <div class="card-grid">
                    ${toolsHTML}
                </div>
                ${cat.longDesc || '<p>Detailed analysis of this category is currently being finalized into a comprehensive pillar guide.</p>'}
                
                <section class="faq-section">
                    <h2>Expert FAQ — ${cat.name} & Open Source Mastery</h2>
                    <div style="margin-top:2rem;">
                        ${faqBank.map(f => `
                            <div class="faq-item">
                                <h3>Q: ${f.q}</h3>
                                <p>A: ${f.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        </div>`;
        
        fs.writeFileSync(path.join(categoryDir, `${cat.id}.html`), getLayout(`Best ${cat.name} 2026`, content, { description: cat.desc, path: `/category/${cat.id}.html` }, faqSchema));
    });
}

function genToolPages() {
    Object.keys(allTools).forEach(tid => {
        const t = allTools[tid];
        let content = `
        <div class="container">
            <div class="page-hero" style="border:none; padding-bottom:1rem;">
                <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent);margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:1px;">
                    ${t.tag} • ${t.license} • ⭐ ${t.github_stars.toLocaleString()} Github Stars
                </div>
                <h1 style="display:flex;align-items:center;gap:1.5rem;">${t.emoji} ${t.name}</h1>
                <p style="font-size:1.4rem;line-height:1.4;">${t.description}</p>
            </div>
            
            <div class="prose" style="margin-top:1rem;">
                <h2>Mastering ${t.name} Deployment</h2>
                <p>${t.description} As an essential entity in the <strong>${t.tag}</strong> ecosystem, ${t.name} defines the standard for performance and scalability in 2026 infrastructure stacks.</p>
                
                <h3>Core Capabilities</h3>
                <ul>
                    ${t.features.map(f => `<li>✅ <strong>${f.split(' ')[0]}</strong>: ${f.split(' ').slice(1).join(' ')}</li>`).join('')}
                </ul>
                
                <h3>One-Line Production Install</h3>
                <pre><code>${t.install}</code></pre>
                
                <h3>Semantic Alternatives</h3>
                <div class="card-grid" style="margin-top:2rem;">
                    ${t.alternatives.map(a => `<a href="/tools/${a}.html" class="tool-card" style="padding:1.2rem;min-width:0;"><h4 style="text-transform:capitalize;">${a.replace('-',' ')}</h4></a>`).join('')}
                </div>
            </div>
        </div>`;
        fs.writeFileSync(path.join(toolsDir, `${tid}.html`), getLayout(`${t.name} Setup Guide`, content, { description: `How to deploy and maintain ${t.name}.`, path: `/tools/${tid}.html` }));
    });
}

// --- EXECUTION ---
console.log('Generating Reimagined Categories...'); genCategoryPages();
console.log('Generating Reimagined Tools...'); genToolPages();
console.log('Site build successful.');
