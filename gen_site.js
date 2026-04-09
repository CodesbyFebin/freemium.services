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
    { id: 'ai-tools', name: 'AI Tools', icon: '🤖', count: 842, desc: 'Top AI directory.' },
    { id: 'open-source', name: 'Open Source', icon: '🐙', count: 891, desc: 'OSS tools.' },
    { id: 'self-hosting', name: 'Self-Hosting', icon: '🖥️', count: 215, desc: 'Self-hosting guides.' },
    { id: 'automation', name: 'Automation', icon: '⚙️', count: 178, desc: 'Workflow automation.' },
    { id: 'dev-tools', name: 'Dev Tools', icon: '⌨️', count: 267, desc: 'Developer utilities.' },
    { id: 'all-categories', name: 'All Categories', icon: '📂', count: 2847, desc: 'Full directory.' }
];

const allTools = {
    'n8n': { name: 'n8n', tag: 'Automation', emoji: '🔁' },
    'claude-code': { name: 'Claude Code', tag: 'AI Agent', emoji: '⚡' },
    'onyx': { name: 'Onyx', tag: 'RAG', emoji: '🧠' },
    'dify': { name: 'Dify', tag: 'AI Platform', emoji: '🌊' },
    'langflow': { name: 'Langflow', tag: 'Visual AI', emoji: '🔗' },
    'marimo': { name: 'Marimo', tag: 'Notebook', emoji: '📓' }
};

const extraPages = [
    { id: 'blog', title: 'Blog' },
    { id: 'quickstart', title: 'Quickstart' },
    { id: 'self-hosting-guide', title: 'Self-Hosting Guide' },
    { id: 'compare-tools', title: 'Compare Tools' },
    { id: 'submit-tool', title: 'Submit a Tool' },
    { id: 'changelog', title: 'Changelog' },
    { id: 'depin-guide', title: 'DePIN Guide' },
    { id: 'tq-integration', title: 'TQ Integration' },
    { id: 'api-docs', title: 'API Docs' },
    { id: 'html-sitemap', title: 'Sitemap' },
    { id: 'rss-feed', title: 'RSS Feed' }
];

// --- CONTENT GENERATOR HELPERS ---

function genSemanticClusters(topic) {
    let clusters = '';
    for (let i = 1; i <= 10; i++) {
        clusters += `<div class="semantic-cluster">
            <h3>Advanced ${topic} Strategy: Component ${i}</h3>
            <p>The strategic architecture of ${topic} relies on a multi-layered approach to infrastructure design. In 2026, the transition toward decentralized protocols and high-performance edge computing has redefined how developers evaluate ${topic}. By utilizing the TurboQuant DePIN network, organizations can achieve a level of computational sovereignty that ensures their ${topic} implementations are resilient against centralized disruptions. This component delves into the technical nuances of service orchestration, focusing on the seamless interweaving of ${topic} with modern containerized environments. We examine the efficiency of various verification models and how they contribute to the overall semantic integrity of the freemium ecosystem. This is critical for maintaining high availability and ensuring that ${topic} remains a viable choice for enterprise-level deployments where scale and security are non-negotiable.</p>
        </div>`;
    }
    return clusters;
}

function genSEOFAQs(topic) {
    let faqs = '';
    for (let i = 1; i <= 20; i++) {
        faqs += `
        <div class="faq-item">
            <div class="faq-q">Topic ${i}: What is the impact of decentralized physical infrastructure on ${topic} efficiency? <span>+</span></div>
            <div class="faq-a">
                <p>Developing a robust framework for ${topic} requires an understanding of how DePIN architectures influence the speed and reliability of data processing. When ${topic} is integrated with the TurboQuant (TQ) network, it benefits from a distributed node pool that minimizes latency and maximizes throughput. This is particularly relevant for high-intensity ${topic} tasks that require near-instantaneous query feedback. By routing traffic through edge nodes that are optimized for ${topic}, developers can avoid the bottlenecks associated with traditional regional data centers. This detailed examination looks at the various handshake protocols used in ${topic} today and how they are evolving to meet the needs of a more decentralized web. We also consider the role of zero-knowledge proofs in maintaining the privacy of ${topic} data, especially when handled in public node environments.</p>
                <p>Furthering this exploration, we can see that the scalability of ${topic} is no longer tied to a single cloud provider's resource allocation. Instead, ${topic} can scale elastically across the global TQ footprint, utilizing idle compute capacity where it is needed most. This represents a significant shift in the economic model of ${topic}, moving from fixed-cost subscriptions to a more dynamic, resource-based utility model. Search engines recognize this shift, prioritizing content that discusses the intersection of ${topic} and decentralized systems as it signals forward-looking technical authority. By mastering these concepts, Freemium.Services ensures that its ${topic} directory remains the industry standard, providing users with the depth and clarity they need to navigate a rapidly changing technological landscape.</p>
            </div>
        </div>`;
    }
    return faqs;
}

function genMassiveContent(topic) {
    let content = `<div class="massive-content">
        <h2>Comprehensive Technical Analysis of ${topic}</h2>`;
    for (let i = 1; i <= 40; i++) {
        content += `<section class="reveal">
            <h3>Strategic Perspective ${i}: Deep Dive into ${topic} Architectures</h3>
            <p>As we examine the current state of ${topic}, it is clear that the traditional boundaries between local and cloud-based services are blurring. The advent of high-performance decentralized networks has enabled ${topic} to run with the speed of local hardware but the scale of the global cloud. In this extensive section, we analyze the performance characteristics of ${topic} across various deployment models, specifically highlighting the advantages of using a DePIN-optimized stack. For instance, when ${topic} is combined with tools like n8n or Claude Code, the resulting autonomous workflows are far more resilient than those built on old-school SaaS platforms. This analysis aims to provide a complete mapping of the ${topic} ecosystem, covering every technical vector necessary for high-level mastery. We focus on the interoperability of ${topic} with existing data lakes and how it can be used to augment traditional ETL processes in real-time environments.</p>
            <p>Moving forward, the focus on ${topic} must include a consideration of data sovereignty and the ethical implications of AI-driven automation. By self-hosting ${topic} instances on the TurboQuant network, developers can maintain full control over their models and the data used to train them. This is a game-changer for the ${topic} industry, which has long been dominated by restrictive licensing and opaque usage policies. Our guides at Freemium.Services provide the technical foundations for this new era, offering detailed documentation on Docker deployments, server-side optimizations, and the strategic positioning of ${topic} within a broader corporate tech stack. Each of these sections contributes to a deep semantic understanding of the topic, ensuring that search engines and human readers alike find the most authoritative and useful information possible.</p>
        </section>`;
    }
    content += `</div>`;
    return content;
}

// --- MASTER UI COMPONENTS ---

const MASTER_CSS = `
:root {
  --bg: #080B10; --bg2: #0D1117; --bg3: #111820; --surface: #141C26; --surface2: #1A2332;
  --border: #1E2D40; --border2: #243344; --text: #E8F0F8; --text2: #9BB0C8; --text3: #5A7A9A;
  --accent: #00D4FF; --accent2: #0099CC; --green: #00FF88; --green2: #00CC6A; --orange: #FF6B35;
  --purple: #7C3AED; --yellow: #FFD60A; --red: #FF3B5C;
  --font-display: 'Syne', sans-serif; --font-mono: 'Space Mono', monospace; --font-body: 'DM Sans', sans-serif;
  --glow: 0 0 40px rgba(0,212,255,0.15); --radius: 8px; --radius2: 12px;
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
.btn-submit{background:var(--accent);color:var(--bg)!important;font-weight:600!important;padding:0.4rem 1rem!important;border-radius:var(--radius)}
.container{max-width:1400px;margin:0 auto;padding:0 2rem;position:relative;z-index:1}
.breadcrumb{display:flex;align-items:center;gap:0.5rem;font-family:var(--font-mono);font-size:0.75rem;color:var(--text3);margin-bottom:-0.5rem;padding-top:2rem}
.breadcrumb a{color:var(--text3);text-decoration:none}.breadcrumb a:hover{color:var(--accent)}
h1,h2,h3{font-family:var(--font-display);font-weight:800;letter-spacing:-1px}
.page-hero{padding:4rem 0 3rem;position:relative}
.page-hero h1{font-size:clamp(2.5rem,6vw,4.5rem);margin-bottom:1rem;line-height:1.1}
.page-hero p{color:var(--text2);max-width:800px;font-size:1.2rem;margin-bottom:2rem}
.prose{color:var(--text2);line-height:1.8;font-size:1.1rem;max-width:900px;margin:0 auto}
.prose h2, .prose h3{color:var(--text);margin:3rem 0 1.5rem}
.prose p{margin-bottom:1.5rem}
.faq-section{margin-top:6rem;padding-top:4rem;border-top:1px solid var(--border)}
.faq-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:12px;cursor:pointer}
.faq-q{padding:20px 25px;font-weight:700;display:flex;justify-content:space-between;align-items:center}
.faq-a{padding:0 25px 25px;display:none;color:var(--text2);font-size:0.95rem;line-height:1.7}
.faq-item.active .faq-a{display:block}
.faq-item.active .faq-q{color:var(--accent)}
.semantic-cluster{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;margin-bottom:2rem}
.semantic-cluster h3{font-size:1.1rem;margin-bottom:1rem;color:var(--accent)}
.reveal{opacity:0;transform:translateY(20px);transition:0.6s ease;margin-bottom:3rem}
.reveal.visible{opacity:1;transform:none}
footer{background:var(--bg2);border-top:1px solid var(--border);padding:4rem 2rem 2rem;margin-top:8rem}
.footer-bottom{max-width:1400px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text3);font-family:var(--font-mono)}
.footer-bottom a{color:var(--accent);text-decoration:none}
`;

const getLayout = (title, content, head = {}, schema = null) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Freemium.Services</title>
    <meta name="robots" content="index, follow">
    <meta name="description" content="${head.description || 'Verified directory of freemium and open-source software.'}">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
    <style>${MASTER_CSS}</style>
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body>
    <nav>
        <div class="nav-inner">
            <a href="/" class="logo">freemium<span>.services</span></a>
            <ul class="nav-links">
                <li><a href="/category/ai-tools.html">AI Tools</a></li>
                <li><a href="/category/open-source.html">Open Source</a></li>
                <li><a href="/category/self-hosting.html">Self-Hosting</a></li>
                <li><a href="${TQ_URL}" style="color:var(--accent)">TurboQuant ↗</a></li>
            </ul>
        </div>
    </nav>
    <main>${content}</main>
    <footer>
        <div class="container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;text-align:left;">
            <div><a href="/" class="logo">freemium<span>.services</span></a><p style="margin-top:1rem;font-size:0.9rem;color:var(--text3);">World's largest verified directory.</p></div>
            <div><h4>Explore</h4><a href="/category/all-categories.html">All Categories</a><br><a href="/blog.html">Blog</a></div>
            <div><h4>Resources</h4><a href="/quickstart.html">Quickstart</a><br><a href="/self-hosting-guide.html">Hosting Guide</a></div>
            <div><h4>Ecosystem</h4><a href="${TQ_URL}">TurboQuant</a><br><a href="/api-docs.html">API Docs</a></div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Freemium.Services. Optimized for TurboQuant Network.</span>
            <span><a href="/sitemap.xml">XML Sitemap</a> | <a href="/html-sitemap.html">HTML Sitemap</a></span>
        </div>
    </footer>
    <script>
        document.querySelectorAll('.faq-item').forEach(box => {
            box.addEventListener('click', () => box.classList.toggle('active'));
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>
</html>`;
};

// --- GENERATORS ---

function genHomepage() {
    let content = `
    <div class="hero container" style="text-align:center;padding:8rem 2rem 4rem;">
        <h1 style="font-size:clamp(3rem, 10vw, 6rem);line-height:1;margin-bottom:2rem;">The DePIN <br><span style="color:var(--accent);">Future is Here.</span></h1>
        <p style="font-size:1.5rem;color:var(--text2);max-width:800px;margin:0 auto 4rem;">Explore 2,847+ verified freemium & open-source tools with unparalleled technical documentation.</p>
        <div style="display:flex;gap:1.5rem;justify-content:center;">
            <a href="/category/ai-tools.html" style="background:var(--accent);color:var(--bg);padding:1.2rem 2.5rem;border-radius:var(--radius);font-weight:800;text-decoration:none;font-size:1.1rem;">Explore Directory</a>
            <a href="${TQ_URL}" style="border:1px solid var(--border);padding:1.2rem 2.5rem;border-radius:var(--radius);font-weight:800;text-decoration:none;font-size:1.1rem;">TurboQuant Hub</a>
        </div>
    </div>
    <div class="container" style="padding-bottom:8rem;">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem;">
            ${categories.map(c => `<a href="/category/${c.id}.html" class="semantic-cluster" style="text-decoration:none;text-align:center;display:block;"><h3>${c.icon} ${c.name}</h3><p style="font-size:0.8rem;color:var(--text3);">${c.count} verified tools</p></a>`).join('')}
        </div>
        <div style="margin-top:4rem;">
            ${genMassiveContent('The Freemium Services Ecosystem')}
        </div>
    </div>`;
    fs.writeFileSync(path.join(outDir, 'index.html'), getLayout('World\'s Largest Directory', content));
}

function genCategoryPages() {
    categories.forEach(cat => {
        let content = `
        <div class="container">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <span>${cat.name}</span></nav>
            <div class="page-hero">
                <h1>Best ${cat.name} in 2026</h1>
                <p>Welcome to the definitive resource for ${cat.name}. This technical guide provides an exhaustive analysis of the semantic architectures required to dominate the ${cat.name} landscape in 2026.</p>
            </div>
            <div class="prose">
                ${genSemanticClusters(cat.name)}
                ${genMassiveContent(cat.name)}
                <section class="faq-section">
                    <h2>Frequently Asked Questions about ${cat.name}</h2>
                    ${genSEOFAQs(cat.name)}
                </section>
            </div>
        </div>`;
        fs.writeFileSync(path.join(categoryDir, `${cat.id}.html`), getLayout(cat.name, content, { description: `Ultimate guide to ${cat.name}.` }));
    });
}

function genToolPages() {
    Object.keys(allTools).forEach(tid => {
        const t = allTools[tid];
        let content = `
        <div class="container">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <span>${t.name}</span></nav>
            <div class="page-hero">
                <h1>${t.emoji} ${t.name} — Full Setup Guide 2026</h1>
                <p>Establishing absolute sovereignty over your ${t.name} deployment using the TurboQuant DePIN edge network and advanced container orchestration.</p>
            </div>
            <div class="prose">
                <div style="background:#050810;padding:2rem;border-radius:var(--radius);border:1px solid var(--accent2);color:var(--green);font-family:var(--font-mono);margin-bottom:3rem;">
                    # Deploy ${t.name} with TQ Subnet<br>
                    curl -sL https://turboquant.network/deploy/${tid} | bash
                </div>
                ${genSemanticClusters(t.name)}
                ${genMassiveContent(t.name)}
                <section class="faq-section">
                    <h2>Expert Implementation FAQs for ${t.name}</h2>
                    ${genSEOFAQs(t.name)}
                </section>
            </div>
        </div>`;
        fs.writeFileSync(path.join(toolsDir, `${tid}.html`), getLayout(t.name, content, { description: `How to self-host ${t.name}.` }));
    });
}

function genExtraPages() {
    extraPages.forEach(p => {
        let content = `
        <div class="container">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <span>${p.title}</span></nav>
            <div class="page-hero">
                <h1>${p.title} — Performance Standards 2026</h1>
                <p>The core documentation for the Freemium Services ecosystem, providing the blueprints for 2026 technological innovation.</p>
            </div>
            <div class="prose">
                ${genSemanticClusters(p.title)}
                ${genMassiveContent(p.title)}
                <section class="faq-section">
                    <h2>Technical Reference: ${p.title}</h2>
                    ${genSEOFAQs(p.title)}
                </section>
            </div>
        </div>`;
        fs.writeFileSync(path.join(outDir, `${p.id}.html`), getLayout(p.title, content, { description: p.title }));
    });
}

function genSitemap() {
    const pages = [
        ...categories.map(c => `/category/${c.id}.html`),
        ...Object.keys(allTools).map(tid => `/tools/${tid}.html`),
        ...extraPages.map(p => `/${p.id}.html`)
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>
  ${pages.map(p => `<url><loc>${SITE_URL}${p}</loc><priority>0.8</priority></url>`).join('')}
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
}

// --- EXECUTION ---
console.log('Generating Homepage...'); genHomepage();
console.log('Generating Categories...'); genCategoryPages();
console.log('Generating Tools...'); genToolPages();
console.log('Generating Extra Pages...'); genExtraPages();
console.log('Generating Sitemap...'); genSitemap();

console.log('Site build successful. References to pillars and metrics removed.');
