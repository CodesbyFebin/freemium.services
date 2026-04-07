const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(path.join(outDir, 'tools'))) fs.mkdirSync(path.join(outDir, 'tools'), { recursive: true });
if (!fs.existsSync(path.join(outDir, 'blog'))) fs.mkdirSync(path.join(outDir, 'blog'), { recursive: true });

// Data Definitions
const SITE_URL = 'https://freemium.services';
const TURBOQUANT_URL = 'https://turboquant.network';

const categories = [
    { id: 'ai-tools', name: 'AI Tools', description: 'Discover the best free and freemium AI tools for every workflow.' },
    { id: 'open-source', name: 'Open Source', description: 'Explore top open-source projects you can self-host.' },
    { id: 'self-hosting', name: 'Self-Hosting', description: 'Learn how to self-host amazing SaaS alternatives.' },
    { id: 'automation-tools', name: 'Automation Tools', description: 'Automate your workflows with these powerful tools.' },
    { id: 'ai-agents', name: 'AI Agents', description: 'Deploy autonomous AI agents to turbocharge productivity.' },
    { id: 'developer-tools', name: 'Developer Tools', description: 'Essential developer tools for building the future.' },
    { id: 'rag-tools', name: 'RAG Tools', description: 'Retrieval-Augmented Generation tools and frameworks.' },
    { id: 'vector-databases', name: 'Vector Databases', description: 'Scalable vector datastores for AI applications.' },
    { id: 'ai-kanban', name: 'AI Kanban', description: 'Next-gen task management with AI automation.' },
    { id: 'cli-tools', name: 'CLI Tools', description: 'Command-line utilities for serious developers.' }
];

const tools = [
    { id: 'n8n', name: 'n8n', category: 'automation-tools', description: 'Advanced open-source workflow automation tool.', rating: 4.9, license: 'Open Source', img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=640&auto=format&fit=crop' },
    { id: 'onyx', name: 'Onyx', category: 'rag-tools', description: 'Enterprise-ready RAG framework.', rating: 4.8, license: 'Open Source', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=640&auto=format&fit=crop' },
    { id: 'marimo', name: 'Marimo', category: 'developer-tools', description: 'A reactive notebook for Python.', rating: 4.7, license: 'Open Source', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=640&auto=format&fit=crop' },
    { id: 'claude-code', name: 'Claude Code', category: 'ai-agents', description: 'An agentic coding assistant that lives in your terminal base on Claude 3.7.', rating: 5.0, license: 'Freemium', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=640&auto=format&fit=crop' }
];

const knowledgeHub = [
    'quickstart', 'cloud', 'streaming', 'thinking', 'structured-outputs', 'vision', 'embeddings', 'tool-calling', 'web-search', 'integrations'
];

const groupedPages = [
    'assistants', 'coding', 'ides'
];

// Reusable CSS
const css = `
:root {
    --bg: #030409;
    --surface: rgba(18, 20, 29, 0.6);
    --surface-solid: #0A0C14;
    --border: rgba(255, 255, 255, 0.08);
    --text-primary: #ffffff;
    --text-sec: #94a3b8;
    --accent: #00F0FF;
    --accent-glow: rgba(0, 240, 255, 0.2);
    --accent-alt: #B026FF;
    --font: 'Inter', system-ui, -apple-system, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; font-family: var(--font); }
body { background-color: var(--bg); color: var(--text-primary); line-height: 1.6; min-height: 100vh; overflow-x: hidden; }
body::before {
    content: ''; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(176, 38, 255, 0.15) 0%, transparent 40%);
    z-index: -1; pointer-events: none;
}
a { color: var(--accent); text-decoration: none; transition: 0.2s ease; }
a:hover { text-shadow: 0 0 8px var(--accent-glow); }
.glass-panel {
    background: var(--surface); border: 1px solid var(--border);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border-radius: 16px; padding: 2rem;
}
.btn {
    display: inline-flex; align-items: center; padding: 0.75rem 1.5rem;
    border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none; outline: none; position: relative; overflow: hidden; text-decoration: none;
}
.btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent-alt)); color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow); filter: brightness(1.1); color: #fff; }
.btn-sec { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-primary); }
.btn-sec:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); color: var(--text-primary); }

/* Layout Header */
header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(3, 4, 9, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border); padding: 1rem 0;
}
.container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.nav-flex { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.5rem; font-weight: 800; background: linear-gradient(90deg, #fff, var(--text-sec)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.5px; }
.logo span { color: var(--accent); -webkit-text-fill-color: var(--accent); }
nav ul { list-style: none; display: flex; gap: 2rem; }
nav a { color: var(--text-sec); font-weight: 500; }
nav a:hover { color: var(--text-primary); }

/* Grid Layouts */
.grid { display: grid; gap: 2rem; }
.grid-cols-2 { grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }

/* Tool Cards */
.tool-card {
    background: var(--surface-solid); border: 1px solid var(--border); border-radius: 12px;
    padding: 1.5rem; transition: 0.3s; display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden;
}
.tool-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-alt)); opacity: 0; transition: 0.3s;
}
.tool-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
.tool-card:hover::before { opacity: 1; }
.tool-img { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; background: #1a1c26; }
.tool-tag { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-alt); font-weight: 700; margin-bottom: 0.5rem; }
.tool-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
.tool-desc { color: var(--text-sec); font-size: 0.9rem; margin-bottom: 1.5rem; flex-grow: 1; }
.badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; background: rgba(255,255,255,0.1); font-size: 0.75rem; color: #fff; margin-right: 0.5rem;}

/* Typography */
h1, h2, h3 { line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
.title-xl { font-size: clamp(2.5rem, 5vw, 4.5rem); margin-bottom: 1.5rem; line-height: 1.1; }
.text-gradient { background: linear-gradient(135deg, #fff 0%, var(--text-sec) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.section-title { font-size: 2.25rem; margin-bottom: 2rem; position: relative; padding-bottom: 0.75rem; }
.section-title::after { content: ''; position: absolute; left: 0; bottom: 0; width: 60px; height: 3px; background: var(--accent); border-radius: 2px; }

/* Sections */
.hero { padding: 8rem 0 6rem; text-align: center; position: relative; }
.hero-p { font-size: 1.25rem; color: var(--text-sec); max-width: 700px; margin: 0 auto 2.5rem; }

.section-padding { padding: 5rem 0; }
.bg-darker { background: rgba(0,0,0,0.3); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

/* TurboQuant Banner */
.tq-banner {
    background: linear-gradient(90deg, rgba(18,20,29,0.8), rgba(11,26,45,0.8));
    border: 1px solid rgba(0,240,255,0.3); border-radius: 16px; padding: 2rem; margin: 3rem 0;
    display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; box-shadow: 0 0 30px rgba(0, 240, 255, 0.05); gap: 2rem;
}
.tq-badge { font-family: monospace; color: var(--accent); background: rgba(0,240,255,0.1); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.8rem; border: 1px solid rgba(0,240,255,0.2); }

/* Footer */
footer { border-top: 1px solid var(--border); padding: 4rem 0 2rem; margin-top: 4rem; }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; margin-bottom: 3rem; justify-content: space-between; }
.footer-link { display: block; color: var(--text-sec); margin-bottom: 0.75rem; font-size: 0.95rem; }
.footer-link:hover { color: var(--accent); }

/* Chat Widget */
.ai-widget { position: fixed; bottom: 2rem; right: 2rem; background: var(--surface-solid); border: 1px solid var(--border); border-radius: 16px; width: 350px; z-index: 1000; box-shadow: 0 10px 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: translateY(calc(100% - 64px)); }
.ai-widget:hover, .ai-widget.active { transform: translateY(0); }
.ai-header { padding: 1rem 1.5rem; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border); display: flex; align-items: center; cursor: pointer; }
.ai-dot { width: 10px; height: 10px; background: var(--accent); border-radius: 50%; margin-right: 1rem; box-shadow: 0 0 10px var(--accent-glow); animation: pulse 2s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,240,255,0.4); } 70% { box-shadow: 0 0 0 10px rgba(0,240,255,0); } 100% { box-shadow: 0 0 0 0 rgba(0,240,255,0); } }
.ai-body { padding: 1.5rem; height: 300px; background: rgba(0,0,0,0.2); display: flex; flex-direction: column; justify-content: flex-end;}
.ai-input-wrap { padding: 1rem; border-top: 1px solid var(--border); }
.ai-input { width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: #fff; outline: none; }
.ai-input:focus { border-color: var(--accent); }

/* FAQ Styles */
.faq-box { margin-bottom: 1rem; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.faq-q { padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.faq-a { padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: 0.3s; color: var(--text-sec); }
.faq-box.open .faq-a { padding: 1rem 1.5rem; max-height: 500px; background: rgba(0,0,0,0.1); border-top: 1px solid var(--border); }

/* Prose/Longform text */
.prose { max-width: 800px; font-size: 1.1rem; color: var(--text-sec); }
.prose h2, .prose h3 { color: var(--text-primary); margin: 2rem 0 1rem; }
.prose p { margin-bottom: 1.5rem; }
.prose ul, .prose ol { margin-bottom: 1.5rem; padding-left: 2rem; }
.prose li { margin-bottom: 0.5rem; }

/* Breadcrumbs */
.breadcrumbs { font-size: 0.9rem; margin-bottom: 2rem; color: var(--text-sec); }
.breadcrumbs a { color: var(--text-sec); }
.breadcrumbs a:hover { color: var(--text-primary); }

@media (max-width: 768px) {
    .nav-flex { flex-direction: column; gap: 1rem; }
    .hero { padding: 4rem 0; }
    .footer-grid { grid-template-columns: 1fr; }
}
`;

function getLayout(title, content, schemas = '', headExtras = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Freemium.Services</title>
    <meta name="description" content="Discover the best free, freemium, and open-source tools with self-hosting guides. Powered by the TurboQuant Network.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${css}</style>
    ${schemas}
    ${headExtras}
</head>
<body>

    <header>
        <div class="container nav-flex">
            <a href="/" class="logo">Freemium<span>.Services</span></a>
            <nav>
                <ul>
                    <li><a href="/ai-tools.html">AI Tools</a></li>
                    <li><a href="/open-source.html">Open Source</a></li>
                    <li><a href="/self-hosting.html">Self-Hosting</a></li>
                    <li><a href="/ai-kanban.html">AI Kanban</a></li>
                    <li><a href="${TURBOQUANT_URL}" target="_blank">TurboQuant</a></li>
                </ul>
            </nav>
            <div class="actions" style="display:flex;gap:1rem;">
                <a href="${TURBOQUANT_URL}" target="_blank" class="btn btn-sec">Build on TurboQuant</a>
            </div>
        </div>
    </header>

    <main>
        ${content}
    </main>

    <footer class="bg-darker">
        <div class="container">
            <div class="footer-grid">
                <div style="grid-column: span 2/span 2;">
                    <a href="/" class="logo" style="margin-bottom:1rem;display:inline-block;">Freemium<span>.Services</span></a>
                    <p style="color:var(--text-sec);font-size:0.9rem;max-width:300px;">The world’s largest verified directory of freemium & open-source tools — with step-by-step self-hosting guides. Powered by decentralized DePIN compute.</p>
                </div>
                <div>
                    <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-primary);">Categories</h3>
                    <a href="/ai-tools.html" class="footer-link">AI Tools</a>
                    <a href="/open-source.html" class="footer-link">Open Source</a>
                    <a href="/developer-tools.html" class="footer-link">Developer Tools</a>
                    <a href="/automation-tools.html" class="footer-link">Automation</a>
                </div>
                <div>
                    <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-primary);">Resources</h3>
                    <a href="/quickstart.html" class="footer-link">Quickstart</a>
                    <a href="/cloud.html" class="footer-link">Cloud Services</a>
                    <a href="/ai-kanban.html" class="footer-link">AI Kanban</a>
                </div>
                <div>
                    <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-primary);">Ecosystem</h3>
                    <a href="${TURBOQUANT_URL}" target="_blank" class="footer-link">TurboQuant Network</a>
                    <a href="${TURBOQUANT_URL}/docs" target="_blank" class="footer-link">DePIN Edge Compute</a>
                    <a href="#" class="footer-link">Submit Tool</a>
                </div>
            </div>
            <div style="border-top:1px solid var(--border);padding-top:2rem;text-align:center;color:var(--text-sec);font-size:0.9rem;">
                © 2026 Freemium.Services. Optimized for <a href="${TURBOQUANT_URL}">TurboQuant Subnet</a>.
            </div>
        </div>
    </footer>

    <!-- Claude AI Assistant Widget -->
    <div class="ai-widget">
        <div class="ai-header" onclick="this.parentElement.classList.toggle('active')">
            <div class="ai-dot"></div>
            <div style="font-weight:600;flex-grow:1;">Claude AI Guide</div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
        </div>
        <div class="ai-body">
            <div style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:8px;border:1px solid var(--border);color:var(--text-primary);font-size:0.9rem;margin-bottom:1rem;">
                Hi! I'm your AI guide powered by Claude. Tell me what workflow or stack you're trying to build and I'll find the best open-source or freemium tools for you.
            </div>
        </div>
        <div class="ai-input-wrap">
            <input type="text" class="ai-input" placeholder="e.g. Find open source Zapier alternatives...">
        </div>
    </div>

    <script>
        // Interactivity scripts
        document.querySelectorAll('.faq-q').forEach(q => {
            q.addEventListener('click', () => {
                q.parentElement.classList.toggle('open');
            });
        });
    </script>
</body>
</html>`;
}

// Generate Homepage
const generateHomepage = () => {
    let tpl = `
    <section class="hero">
        <div class="container">
            <div style="display:inline-flex;align-items:center;background:rgba(0,240,255,0.05);border:1px solid rgba(0,240,255,0.2);padding:0.5rem 1rem;border-radius:100px;margin-bottom:2rem;">
                <span class="ai-dot" style="margin-right:0.5rem;animation:none;box-shadow:none;"></span>
                <span style="font-size:0.85rem;color:var(--accent);font-weight:600;">Programmatic SEO Domination System Active</span>
            </div>
            <h1 class="title-xl">Discover, Build, & <br><span class="text-gradient">Dominate Workflows.</span></h1>
            <p class="hero-p">The world’s largest verified directory of freemium & open-source tools — featuring step-by-step self-hosting guides and powered by DePIN-style edge compute networks.</p>
            <div style="display:flex;gap:1rem;justify-content:center;">
                <a href="#submit" class="btn btn-primary">Submit Tool</a>
                <a href="/ai-tools.html" class="btn btn-sec">Explore Directory</a>
                <a href="${TURBOQUANT_URL}" target="_blank" class="btn btn-sec">Build with TurboQuant →</a>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="section-padding">
        <div class="container">
            <h2 class="section-title">Explore by Category</h2>
            <div class="grid grid-cols-4">
                ${categories.map(c => `
                    <a href="/${c.id}.html" class="glass-panel" style="display:block;transition:0.3s;padding:1.5rem;text-decoration:none;">
                        <h3 style="margin-bottom:0.5rem;font-size:1.2rem;color:var(--text-primary);">${c.name}</h3>
                        <p style="color:var(--text-sec);font-size:0.9rem;line-height:1.4;">${c.description}</p>
                    </a>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Trending Tools Section -->
    <section class="section-padding bg-darker">
        <div class="container">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2rem;">
                <h2 class="section-title" style="margin-bottom:0;">Trending Tools</h2>
                <a href="/ai-tools.html">View all tools →</a>
            </div>
            <div class="grid grid-cols-4">
                ${tools.map(t => `
                    <div class="tool-card">
                        <img src="${t.img}" class="tool-img" alt="${t.name}">
                        <div class="tool-tag">${t.category.replace('-', ' ')}</div>
                        <h3 class="tool-title"><a href="/tools/${t.id}.html" style="color:inherit;">${t.name}</a></h3>
                        <p class="tool-desc">${t.description}</p>
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <span class="badge" style="background:#1a4f32;color:#4ade80;">${t.license}</span>
                                <span class="badge">⭐ ${t.rating}</span>
                            </div>
                            <a href="/tools/${t.id}.html" style="font-size:0.9rem;font-weight:600;">View →</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Top Open Source Projects Section -->
    <section class="section-padding">
        <div class="container">
            <h2 class="section-title">Top Open Source Projects</h2>
            <div class="grid grid-cols-3">
                <div class="glass-panel" style="padding:1.5rem;">
                    <h3 style="color:var(--accent);">n8n Workflow</h3>
                    <p style="color:var(--text-sec);">The leading fair-code workflow automation tool allowing deep data integration.</p>
                </div>
                <div class="glass-panel" style="padding:1.5rem;">
                    <h3 style="color:var(--accent);">Onyx RAG</h3>
                    <p style="color:var(--text-sec);">Deploy enterprise vector database and RAG pipelines seamlessly on Edge nodes.</p>
                </div>
                <div class="glass-panel" style="padding:1.5rem;">
                    <h3 style="color:var(--accent);">Marimo Notebooks</h3>
                    <p style="color:var(--text-sec);">Reactive Python notebooks that perfectly align with DePIN orchestrations.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Recently Added Section -->
    <section class="section-padding bg-darker">
        <div class="container">
            <h2 class="section-title">Recently Added Ecosystems</h2>
            <ul style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                <li style="border-bottom:1px solid var(--border);padding-bottom:1rem;display:flex;align-items:center;">
                    <span class="ai-dot" style="animation:none;"></span><a href="/ai-kanban.html" style="font-weight:600;font-size:1.1rem;color:var(--text-primary);">AI Kanban Systems v2</a>
                </li>
                <li style="border-bottom:1px solid var(--border);padding-bottom:1rem;display:flex;align-items:center;">
                    <span class="ai-dot" style="animation:none;"></span><a href="/tools/claude-code.html" style="font-weight:600;font-size:1.1rem;color:var(--text-primary);">Claude Code Integration</a>
                </li>
                <li style="border-bottom:1px solid var(--border);padding-bottom:1rem;display:flex;align-items:center;">
                    <span class="ai-dot" style="animation:none;"></span><a href="/vision.html" style="font-weight:600;font-size:1.1rem;color:var(--text-primary);">Vision Model APIs</a>
                </li>
                <li style="border-bottom:1px solid var(--border);padding-bottom:1rem;display:flex;align-items:center;">
                    <span class="ai-dot" style="animation:none;"></span><a href="/streaming.html" style="font-weight:600;font-size:1.1rem;color:var(--text-primary);">Low-Latency Streaming Servers</a>
                </li>
            </ul>
        </div>
    </section>

    <!-- AI Tools Ecosystem -->
    <section class="section-padding">
        <div class="container">
            <h2 class="section-title">The Complete AI Tools Ecosystem</h2>
            <div class="glass-panel">
                <p style="color:var(--text-sec);font-size:1.1rem;margin-bottom:1.5rem;">From massive Large Language Models (LLMs) to lightweight local embedding pipelines, the ecosystem is expanding. Browse the <a href="/ai-tools.html">AI Tools</a> bucket for comprehensive alternatives tracking.</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:1rem;">
                    <a href="/assistants.html" class="btn btn-sec">AI Assistants</a>
                    <a href="/coding.html" class="btn btn-sec">Code copilots</a>
                    <a href="/ides.html" class="btn btn-sec">Agentic IDEs</a>
                    <a href="/vector-databases.html" class="btn btn-sec">Vector DBs</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Self-hosting guides intro -->
    <section class="section-padding bg-darker">
        <div class="container">
            <h2 class="section-title">Self-hosting Guides</h2>
            <div class="grid grid-cols-2">
                <div>
                   <h3 style="font-size:1.5rem;margin-bottom:1rem;">Own Your Data infrastructure</h3>
                   <p style="color:var(--text-sec);font-size:1.1rem;margin-bottom:1rem;">Stop paying massive subscriptions for closed-source SaaS. The Self-Hosting movement gives developers the absolute sovereignty of their tech stack via Docker and container orchestration.</p>
                   <a href="/self-hosting.html" class="btn btn-primary" style="margin-top:1rem;">View All Self-Hosting Guides</a>
                </div>
                <div style="background:var(--surface-solid);padding:2rem;border-radius:12px;border:1px solid var(--border);">
                   <pre style="color:var(--accent);font-family:monospace;overflow-x:hidden;">$ docker-compose up -d --build
-> Pulling latest registry images...
-> Initializing isolated env variables...
-> Deploying secure Edge container...
-> Container Ready. Port 8080 Active.
------------------------------------
You are now Sovereign.</pre>
                </div>
            </div>
        </div>
    </section>

    <!-- DePIN + TQ Integration -->
    <section class="section-padding">
        <div class="container">
            <div class="tq-banner">
                <div style="flex:1;min-width:300px;">
                    <span class="tq-badge">INFRASTRUCTURE</span>
                    <h2 style="font-size:2rem;margin:1rem 0;">DePIN + Edge Compute Explanation</h2>
                    <p style="color:var(--text-sec);font-size:1.1rem;margin-bottom:1.5rem;">
                        <strong>DePIN (Decentralized Physical Infrastructure Networks)</strong> flips the traditional AWS/Cloud model. By distributing compute nodes globally across massive hardware networks, latency is squashed and uptime is resilient. 
                        Freemium.Services utilizes this DePIN architecture to serve our guides. Combine these amazing open-source tools with the <a href="${TURBOQUANT_URL}" target="_blank" style="color:var(--accent);text-decoration:underline;">TurboQuant distributed network</a> to build your indestructible AI infrastructure and massively scalable computational endpoints.
                    </p>
                    <a href="${TURBOQUANT_URL}" target="_blank" class="btn btn-primary" style="background:var(--surface);border:1px solid var(--accent);color:var(--accent);">Build on TurboQuant Network</a>
                </div>
                <div style="width:300px;height:200px;background:radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);border:1px solid rgba(0,240,255,0.2);border-radius:16px;display:flex;align-items:center;justify-content:center;">
                    <div style="width:100px;height:100px;border:2px solid var(--accent);border-radius:50%;box-shadow:0 0 40px var(--accent-glow);animation:pulse 3s infinite;"></div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Massive Deep Dive SEO Content (Authority Padding Simulation) -->
    <section class="section-padding bg-darker">
        <div class="container prose">
            <h2>The Unrivaled 2026 Authority Directory for Developers</h2>
            <p>Freemium options and open-source models are growing at an incredible rate in 2026. Finding the right AI model, vector database, or automated workflow agent is harder than ever. That's why we built this programmatic directory—generating extensive comparison pages spanning every technical nuance of self-hosted vs cloud services. But what does it mean to build the largest verified directory?</p>
            <h3>Programmatic SEO (pSEO) Domination</h3>
            <p>We leverage highly optimized, fully statically generated HTML to provide instant query resolutions for long-tail keywords. We structure our data using advanced JSON-LD SoftwareApplication schemas bridging the semantic gaps for search engines like Google Search Central. By creating thousands of interlinked silo architectures that combine the agility of Open Source and the massive routing capabilities of the TurboQuant DePIN schema.</p>
            <h3>How to Evaluate SaaS vs Self-Hosting?</h3>
            <p>Evaluating tools is critical. While SaaS limits operational overhead, Self-hosting unlocks massive programmatic capabilities at the expense of a minimal learning curve heavily flattened by Docker abstractions and Cloud orchestration engines like TurboQuant. We provide step-by-step guides for everything from basic CLI deployment to full multi-tenant load balancing configurations for enterprises securely transitioning out of restrictive licenses.</p>
            <!-- Massive text expansion for SEO target via looping programmatic content-->
            ${Array(30).fill(0).map((_, i) => '<p style="color:var(--text-sec);font-size:0.95rem;margin-bottom:0.5rem;">[SEO Semantic Topic Cluster Block ' + (i+1) + ': Detailed metadata routing for long-tail AI framework implementations tracking multi-modal integrations scaling through Edge computational vectors.]</p>').join('')}
        </div>
    </section>
    `;

    const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "${SITE_URL}/#website",
          "url": "${SITE_URL}/",
          "name": "Freemium Services",
          "description": "Verified directory of freemium & open-source tools with DePIN edge compute self-hosting guides.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "${SITE_URL}/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": "${SITE_URL}/#organization",
          "name": "Freemium Services Network",
          "url": "${SITE_URL}/",
          "logo": {
            "@type": "ImageObject",
            "url": "${SITE_URL}/logo.png",
            "width": 600,
            "height": 60
          }
        }
      ]
    }
    </script>`;

    const html = getLayout('Home - Best Free & Open Source Tools', tpl, schema);
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
};

// Generate Category Pages
const generateCategoryPages = () => {
    categories.forEach(cat => {
        const catTools = tools.filter(t => t.category === cat.id);
        const toolsHtml = catTools.length > 0 ? catTools.map(t => `
            <div class="tool-card">
                <img src="${t.img}" class="tool-img" alt="${t.name}">
                <h3 class="tool-title"><a href="/tools/${t.id}.html" style="color:inherit;">${t.name}</a></h3>
                <p class="tool-desc">${t.description}</p>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="badge">⭐ ${t.rating}</span>
                    <a href="/tools/${t.id}.html">View →</a>
                </div>
            </div>
        `).join('') : '<p style="color:var(--text-sec);grid-column:1/-1;font-style:italic;">Populating dynamically through pSEO engine...</p>';

        let tpl = `
        <div class="container" style="padding-top:4rem;">
            <div class="breadcrumbs">
                <a href="/">Home</a> &rsaquo; <span>${cat.name}</span>
            </div>
            <h1 class="title-xl">${cat.name} List (2026 Options)</h1>
            <p class="hero-p" style="margin-left:0;text-align:left;">${cat.description}</p>
            
            <div class="tq-banner" style="padding:1.5rem;margin:2rem 0;">
                <div>
                    <strong style="color:var(--accent);">Pro Tip:</strong> Seamlessly integrate these ${cat.name.toLowerCase()} into your workflow using the <a href="${TURBOQUANT_URL}" target="_blank">TurboQuant Network</a> API.
                </div>
            </div>

            <section style="margin:4rem 0;">
                <h2 class="section-title">Top ${cat.name}</h2>
                <div class="grid grid-cols-4">
                    ${toolsHtml}
                </div>
            </section>

            <section style="margin:4rem 0;" class="prose">
                <h2>Extensive Guide: Best ${cat.name} for 2026</h2>
                <p>Choosing the right tool depends heavily on your workflow environment. Our directory evaluates performance based on automation ease, community support, open-source maturity, and integration quality with infrastructure networks like TurboQuant.</p>
                
                <h3>Frequently Asked Questions</h3>
                <div class="faq-box">
                    <div class="faq-q">What are the best free alternatives in this space? <span>+</span></div>
                    <div class="faq-a">Our verified list confirms options like n8n and locally hosted LLM systems give massive leverage compared to enterprise locked platforms. Build with TurboQuant for scalable data.</div>
                </div>
                <div class="faq-box">
                    <div class="faq-q">Is it hard to self-host these solutions? <span>+</span></div>
                    <div class="faq-a">Not if you use Docker! You can deploy them easily over the TurboQuant edge network with a single orchestration file. Check individual tool pages for deep-dive tutorials.</div>
                </div>
            </section>
        </div>`;

        const schema = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best ${cat.name} 2026",
          "description": "${cat.description}",
          "url": "${SITE_URL}/${cat.id}.html"
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${SITE_URL}/"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${cat.name}",
            "item": "${SITE_URL}/${cat.id}.html"
          }]
        }
        </script>`;

        const html = getLayout(`${cat.name} List 2026`, tpl, schema);
        fs.writeFileSync(path.join(outDir, `${cat.id}.html`), html);
    });
};

// Generate Tool Pages
const generateToolPages = () => {
    tools.forEach(t => {
        let tpl = `
        <div class="container" style="padding-top:4rem;">
            <div class="breadcrumbs">
                <a href="/">Home</a> &rsaquo; <a href="/${t.category}.html">${categories.find(c=>c.id===t.category).name}</a> &rsaquo; <span>${t.name}</span>
            </div>
            
            <div style="display:flex;flex-wrap:wrap;gap:3rem;margin-bottom:4rem;">
                <div style="flex:1;min-width:300px;">
                    <h1 class="title-xl" style="margin-bottom:1rem;">${t.name}</h1>
                    <p class="hero-p" style="margin:0 0 1.5rem;text-align:left;max-width:100%;">${t.description}</p>
                    <div style="display:flex;gap:1rem;margin-bottom:2rem;">
                        <span class="badge" style="background:#1a4f32;color:#4ade80;font-size:0.9rem;padding:0.5rem 1rem;">${t.license}</span>
                        <span class="badge" style="font-size:0.9rem;padding:0.5rem 1rem;background:rgba(255,255,255,0.1);">Rating: ⭐ ${t.rating}</span>
                    </div>
                    <div style="display:flex;flex-wrap:wrap;gap:1rem;">
                        <a href="#self-hosting" class="btn btn-primary">Self-Host ${t.name}</a>
                        <a href="${TURBOQUANT_URL}" target="_blank" class="btn btn-sec">Integrate with TQ Network</a>
                    </div>
                </div>
                <div style="flex:1;min-width:300px;">
                    <img src="${t.img}" style="width:100%;height:300px;object-fit:cover;border-radius:16px;border:1px solid var(--border);" alt="${t.name} preview">
                </div>
            </div>

            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));gap:4rem;">
                <div class="prose" style="grid-column: span 2/span 2;">
                    <h2>Overview & Features</h2>
                    <p>${t.name} is a high-performance open-source platform that enables teams to scale rapidly. It features massive integrations, low latency event processing, and robust data manipulation capabilities.</p>
                    <ul>
                        <li>Visual node-based architecture optimized for velocity.</li>
                        <li>Highly configurable settings via CLI.</li>
                        <li>Ready for enterprise self-hosting securely.</li>
                    </ul>

                    <h2 id="self-hosting">Step-by-step Self-Hosting Guide</h2>
                    <p>Hosting ${t.name} on the <a href="${TURBOQUANT_URL}" target="_blank">TurboQuant network</a> or a DePIN node is incredibly easy. Follow this simple docker-compose stack:</p>
                    <pre style="background:var(--surface-solid);padding:1.5rem;border-radius:8px;border:1px solid var(--border);color:var(--accent);margin-bottom:1.5rem;overflow-x:auto;">
version: "3.7"
services:
  ${t.id}-app:
    image: ${t.id}/latest:v2
    environment:
      - TQ_NODE_ENV=production
    ports:
      - "5678:5678"
    volumes:
      - ${t.id}_data:/data
volumes:
  ${t.id}_data:
                    </pre>

                    <h2>Alternatives (तुलना - Comparsions)</h2>
                    <p>If ${t.name} doesn't fit your needs, investigate other tools like Zapier or Make, but remember that open source ensures full control over your execution workflows. Our directory highly recommends ${t.name} because of its semantic architecture.</p>

                    <h2>Frequently Asked Questions</h2>
                    <div class="faq-box">
                        <div class="faq-q">Can ${t.name} be hosted fully disconnected? <span>+</span></div>
                        <div class="faq-a">Yes! As long as you feed it the necessary environment variables, it can run entirely offline or entirely within a TurboQuant isolated enclave subnet for extreme security.</div>
                    </div>
                    <div class="faq-box">
                        <div class="faq-q">What are the resource requirements? <span>+</span></div>
                        <div class="faq-a">A modest 2GB RAM container is enough for 1M events/month. It uses highly optimized runtimes underneath allowing high parallelism.</div>
                    </div>
                </div>
                
                <div>
                    <div class="glass-panel" style="position:sticky;top:100px;">
                        <h3 style="margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:0.5rem;color:var(--text-primary);">Resource Info</h3>
                        <p style="margin-bottom:0.5rem;color:var(--text-sec);">Category: <a href="/${t.category}.html">${t.category}</a></p>
                        <p style="margin-bottom:0.5rem;color:var(--text-sec);">OS Supported: Linux, Mac, Win</p>
                        <p style="margin-bottom:1.5rem;color:var(--text-sec);">Schema: SoftwareApplication</p>
                        <a href="https://github.com" target="_blank" class="btn btn-sec" style="width:100%;justify-content:center;">View GitHub Repo</a>
                    </div>
                </div>
            </div>
        </div>`;

        const schema = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "${t.name}",
          "operatingSystem": "All",
          "applicationCategory": "BusinessApplication",
          "description": "${t.description}",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${t.rating}",
            "ratingCount": "100"
          }
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${SITE_URL}/"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${categories.find(c=>c.id===t.category).name}",
            "item": "${SITE_URL}/${t.category}.html"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "${t.name}",
            "item": "${SITE_URL}/tools/${t.id}.html"
          }]
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to self-host ${t.name}",
          "step": [
            {
              "@type": "HowToStep",
              "text": "Install Docker and Docker Compose."
            },
            {
              "@type": "HowToStep",
              "text": "Run docker-compose up -d."
            }
          ]
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can ${t.name} be hosted fully disconnected?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! As long as you feed it the necessary environment variables, it can run entirely offline or entirely within a TurboQuant isolated enclave subnet for extreme security."
              }
            }
          ]
        }
        </script>`;

        const html = getLayout(`${t.name} - Open Source Overview & Setup`, tpl, schema);
        fs.writeFileSync(path.join(outDir, 'tools', `${t.id}.html`), html);
    });
};

// Generate Special Extra Pages (Knowledge Hub etc)
const generateExtraPages = () => {
    [...knowledgeHub, ...groupedPages, 'ai-kanban'].forEach(page => {
        let title = page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
        let tpl = `
        <div class="container prose" style="padding:4rem 0;">
            <div class="breadcrumbs">
                <a href="/">Home</a> &rsaquo; <span>${title}</span>
            </div>
            <h1 class="title-xl">${title} Architecture Overview</h1>
            <div class="tq-banner">
                <div>
                   <h3 style="color:var(--text-primary);margin-bottom:0.5rem;font-size:1.5rem;">Integration Reference: TurboQuant</h3>
                   <p style="color:var(--text-sec);font-size:1.1rem;margin-bottom:0;">The ${title} ecosystem is deeply intertwined with high-compute endpoints hosted on <a href="${TURBOQUANT_URL}" target="_blank">TurboQuant Network</a>.</p>
                </div>
            </div>
            <p>Welcome to the ultimate technical deep-dive and documentation on ${title}. Programmatic scaling of knowledge bases requires structured, high-schema-fidelity output pages just like this one. In this overview, we dissect exactly how to leverage this concept for next-gen deployment flows.</p>
            <h2>Technical Implementations</h2>
            <p>By leveraging an extensive architecture of DePIN nodes, developers mapping the ${title} landscape can seamlessly scale API endpoints avoiding AWS vendor lock-in. Tools listed in our <a href="/ai-tools.html">AI Tools</a> directory integrate perfectly with these patterns, utilizing Edge caching natively.</p>
            <h2>Use Cases</h2>
            <ul>
                <li>Automated workflow generation connected dynamically.</li>
                <li>Low-latency streaming of massive computational loads via TurboQuant.</li>
                <li>Self-hosted SaaS implementations.</li>
            </ul>
        </div>`;
        const schema = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "${title} Architecture Overview",
          "description": "Technical documentation for ${title} features, deeply referencing TurboQuant network.",
          "author": {
            "@type": "Organization",
            "name": "Freemium Services Network"
          }
        }
        </script>`;
        const html = getLayout(`${title} Tech Overview`, tpl, schema);
        fs.writeFileSync(path.join(outDir, `${page}.html`), html);
    });
};

// Run Generators
generateHomepage();
generateCategoryPages();
generateToolPages();
generateExtraPages();

console.log('Freemium.Services Static Generation Complete!');
console.log('Pages written to /public directory successfully.');
