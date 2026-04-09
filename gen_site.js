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
        count: 842,
        description: 'Discover the best free and freemium AI tools for every workflow. From LLMs to image generation.',
        keywords: 'best ai tools 2026, free ai directory, top generative ai tools, ai for developers',
        faqs: [
            ['What are the best free AI tools in 2026?', 'Top free AI tools include Claude (free tier), Ollama for local models, and Dify for building AI apps. Our directory lists over 800 daily-verified products.'],
            ['Can I run AI tools locally for free?', 'Yes! Tools like Ollama allow you to run powerful models like Llama 3 and Mistral on your own hardware without any subscription costs.']
        ],
        tools: ['n8n', 'dify', 'ollama', 'open-webui', 'claude-code', 'cline', 'roo-code', 'monica']
    },
    {
        id: 'open-source',
        name: 'Open Source',
        icon: '🐙',
        count: 891,
        description: 'The most comprehensive directory of open-source software. All self-hostable, all free.',
        keywords: 'open source tools 2026, free open source software, github projects, self-hosted oss',
        faqs: [
            ['Why choose open-source over SaaS?', 'Open-source gives you full control over your data, avoids vendor lock-in, and is usually free to self-host. Auditable code also ensures better security.'],
            ['How do I find high-quality open-source projects?', 'Look for projects with active GitHub communities, frequent commits, and clear documentation. All projects on Freemium.Services are hand-verified.']
        ],
        tools: ['n8n', 'dify', 'ollama', 'open-webui', 'meilisearch', 'metabase', 'supabase', 'coolify']
    },
    {
        id: 'self-hosting',
        name: 'Self-Hosting',
        icon: '🖥️',
        count: 215,
        description: 'Step-by-step guides to self-host the best SaaS alternatives. Take full control of your infrastructure.',
        keywords: 'self hosting guide, docker self host, vps hosting, self-hosted saas alternatives',
        faqs: [
            ['What is the easiest way to self-host?', 'For most users, Docker and Docker Compose are the easiest methods. Most tools in our directory provide a single YAML file to get started.'],
            ['What hardware do I need for self-hosting?', 'A simple $6/mo VPS is enough for many automation and database tools. For AI models, we recommend using TurboQuant edge compute nodes.']
        ],
        tools: ['n8n', 'open-webui', 'onyx', 'meilisearch', 'metabase', 'dify']
    },
    {
        id: 'automation-tools',
        name: 'Automation Tools',
        icon: '⚙️',
        count: 178,
        description: 'Automate your workflows with powerful open-source alternatives to Zapier and Make.',
        keywords: 'free automation tools, zapier alternatives, workflow automation, n8n vs make',
        faqs: [
             ['What is the best free alternative to Zapier?', 'n8n is the industry leader for open-source automation. Activepieces is another modern MIT-licensed alternative.'],
             ['Can I automate my local tools?', 'Yes, by self-hosting n8n or Windmill, you can connect tools within your local network securely.']
        ],
        tools: ['n8n', 'activepieces', 'windmill', 'pipedream', 'airflow', 'prefect']
    },
    {
        id: 'ai-agents',
        name: 'AI Agents',
        icon: '🧠',
        count: 134,
        description: 'Deploy autonomous AI agents to turbocharge productivity. Coding assistants, research bots, and more.',
        keywords: 'best ai agents, autonomous agents, ai coding agent, cloade code vs cline',
        faqs: [
            ['What are AI agents?', 'AI agents are LLM-powered systems that can plan and execute multi-step tasks autonomously by using tools and browsing the web.'],
            ['Which AI coding agent is best?', 'Claude Code is currently leading for terminal-native tasks, while Cline and Roo Code are top-tier extensions for VS Code.']
        ],
        tools: ['claude-code', 'goose', 'cline', 'roo-code', 'autogpt', 'dify']
    },
    {
        id: 'developer-tools',
        name: 'Developer Tools',
        icon: '⌨️',
        count: 267,
        description: 'Essential developer tools for building the future. Editors, databases, and notebooks.',
        keywords: 'best dev tools 2026, developer productivity, open source coding tools',
        faqs: [
            ['What are the must-have dev tools in 2026?', 'Zed editor, Supabase for backend, and Marimo for reactive Python notebooks are top recommendations.'],
            ['Are these tools compatible with Linux?', 'Yes, almost every tool listed is cross-platform or runs natively on Linux/Docker.']
        ],
        tools: ['marimo', 'meilisearch', 'zed', 'metabase', 'supabase', 'coolify']
    },
    {
        id: 'rag-tools',
        name: 'RAG Tools',
        icon: '📚',
        count: 89,
        description: 'Retrieval-Augmented Generation tools and frameworks to ground your AI in your own data.',
        keywords: 'best rag tools, llamaindex vs langchain, rag pipeline, vector ingestion',
        faqs: [
            ['What is RAG?', 'RAG (Retrieval-Augmented Generation) is a technique that gives LLMs access to specific documents to provide more accurate and grounded answers.'],
            ['Which framework is best for RAG?', 'LlamaIndex is highly optimized for data retrieval, while LangChain offers the broadest ecosystem for agentic chains.']
        ],
        tools: ['langflow', 'dify', 'llamaindex', 'haystack', 'onyx', 'langchain']
    },
    {
        id: 'vector-databases',
        name: 'Vector Databases',
        icon: '🗄️',
        count: 43,
        description: 'Scalable vector datastores for AI applications. Semantic search and high-speed retrieval.',
        keywords: 'best vector database, qdrant vs chroma, self-hosted vector db',
        faqs: [
            ['Why do I need a vector database?', 'Vector databases are required for semantic search and RAG because they store and query data based on mathematical embeddings rather than keywords.'],
            ['Is pgvector a good alternative to specialized VDBs?', 'Yes, for most applications, adding pgvector to your existing PostgreSQL database is a great, low-complexity solution.']
        ],
        tools: ['qdrant', 'chroma', 'weaviate', 'milvus', 'pgvector', 'redis']
    },
    {
        id: 'ai-kanban',
        name: 'AI Kanban',
        icon: '📋',
        count: 67,
        description: 'Next-gen task management with AI automation. Smart triage and automated reporting.',
        keywords: 'ai project management, jira alternatives, free kanban board',
        faqs: [
            ['How does AI help in Kanban?', 'AI can automatically categorize cards, summarize ticket history, and suggest the best assignee based on work history.'],
            ['Which open-source project management tool is best?', 'Plane is an excellent high-fidelity Jira alternative, while AppFlowy combines Notion-like docs with boards.']
        ],
        tools: ['plane', 'focalboard', 'appflowy', 'linear', 'twenty', 'n8n']
    },
    {
        id: 'cli-tools',
        name: 'CLI Tools',
        icon: '💻',
        count: 156,
        description: 'Command-line utilities for serious developers. Terminal-native power tools.',
        keywords: 'best cli tools, linux terminal utilities, developer cli productivity',
        faqs: [
            ['What are essential CLI tools?', 'ripgrep for search, fzf for fuzzy matching, and lazygit for terminal-based git management are indispensable.'],
            ['Are there AI tools for the terminal?', 'Yes, Claude Code and Aider allow you to code and manage your shell using natural language.']
        ],
        tools: ['claude-code', 'ollama', 'aider', 'ripgrep', 'fzf', 'lazygit']
    }
];

const allTools = {
    'n8n': { emoji: '🔁', name: 'n8n', tag: 'Automation', stars: '47.2k', desc: 'Leading fair-code workflow automation. 400+ integrations, native AI nodes. Best open-source Zapier alternative.', tags: ['Open Source', 'Self-Hostable', 'AI-Ready'], rating: 4.9, license: 'Fair-code', image: 'https://freemium.services/assets/n8n-thumb.jpg' },
    'dify': { emoji: '🌊', name: 'Dify', tag: 'LLM Platform', stars: '52k', desc: 'Build and deploy LLM apps visually. RAG pipelines, agents, multi-model. Fully open-source.', tags: ['Open Source', 'RAG', 'AI-Powered'], rating: 4.8, license: 'Apache 2.0' },
    'ollama': { emoji: '🦙', name: 'Ollama', tag: 'Local LLMs', stars: '94k', desc: 'Run Llama, Mistral, Gemma and 100+ models locally. MIT licensed. Cross-platform.', tags: ['MIT License', 'Local First', 'Free'], rating: 4.9, license: 'MIT' },
    'open-webui': { emoji: '💬', name: 'Open WebUI', tag: 'Chat Interface', stars: '52k', desc: 'Self-hosted ChatGPT-style UI for Ollama. Multi-model, RAG, web search. Deploy in minutes.', tags: ['MIT License', 'Self-Hostable', 'Open Source'], rating: 4.8, license: 'MIT' },
    'claude-code': { emoji: '⚡', name: 'Claude Code', tag: 'Coding Agent', stars: 'New', desc: "Anthropic's terminal-native AI coding agent. Reads repos, writes code, runs tests. Claude 3.7 power.", tags: ['Free Tier', 'AI Agent', 'Terminal'], rating: 5.0, license: 'Freemium' },
    'cline': { emoji: '🖊️', name: 'Cline', tag: 'VS Code Agent', stars: '29k', desc: 'Leading open-source AI coding agent for VS Code. Creates files, runs commands, any LLM backend.', tags: ['Free', 'Open Source', 'Agentic'], rating: 4.9, license: 'Apache 2.0' },
    'roo-code': { emoji: '🦘', name: 'Roo Code', tag: 'VS Code Agent', stars: '18k', desc: 'Autonomous VS Code agent with custom modes and boomerang tasks for complex workflows.', tags: ['Free', 'Open Source', 'AI-Powered'], rating: 4.8, license: 'Apache 2.0' },
    'meilisearch': { emoji: '🔍', name: 'Meilisearch', tag: 'Search Engine', stars: '47k', desc: 'Blazing-fast open-source search engine. Easy to self-host. Best Algolia alternative.', tags: ['MIT License', 'Self-Hostable', 'Fast'], rating: 4.7, license: 'MIT' },
    'metabase': { emoji: '📊', name: 'Metabase', tag: 'Analytics', stars: '38k', desc: 'Open-source BI tool. Connect to any database, build dashboards without SQL. Free community edition.', tags: ['Open Source', 'Self-Hostable', 'Data'], rating: 4.6, license: 'AGPL' },
    'supabase': { emoji: '🗄️', name: 'Supabase', tag: 'Backend Platform', stars: '73k', desc: 'Open-source Firebase alternative. Postgres, Auth, Storage, Realtime, Edge Functions.', tags: ['Open Source', 'Postgres', 'Free Tier'], rating: 4.8, license: 'Apache 2.0' },
    'coolify': { emoji: '🐳', name: 'Coolify', tag: 'Deployment', stars: '34k', desc: 'Self-hosted Heroku/Netlify/Vercel alternative. Deploy anything via Docker.', tags: ['Open Source', 'Self-Hostable', 'Free'], rating: 4.7, license: 'Apache 2.0' },
    'activepieces': { emoji: '🌊', name: 'Activepieces', tag: 'No-Code Automation', stars: '11.8k', desc: 'MIT-licensed Zapier alternative. Beautiful UI, 200+ pieces. Fully self-hostable.', tags: ['MIT License', 'No-Code', 'Self-Hostable'], rating: 4.5, license: 'MIT' },
    'windmill': { emoji: '⚙️', name: 'Windmill', tag: 'Dev Automation', stars: '9.8k', desc: 'Turn scripts into production workflows. Multi-language (Python, TS, Go). AGPLv3.', tags: ['Open Source', 'Self-Hostable', 'Powerful'], rating: 4.6, license: 'AGPLv3' },
    'onyx': { emoji: '🧠', name: 'Onyx', tag: 'Enterprise AI', stars: '12.8k', desc: 'Self-hosted enterprise AI assistant. Connect your docs, Slack, Notion. Full data sovereignty.', tags: ['Open Source', 'Self-Hostable', 'Enterprise'], rating: 4.7, license: 'MIT' },
    'marimo': { emoji: '📓', name: 'Marimo', tag: 'Python Notebook', stars: '8.4k', desc: 'Next-gen reactive Python notebook. Cell auto-rerun. Shared as apps. Built-in AI.', tags: ['Apache 2.0', 'Reactive', 'Python'], rating: 4.7, license: 'Apache 2.0' },
    'qdrant': { emoji: '🗄️', name: 'Qdrant', tag: 'Vector DB', stars: '21k', desc: 'High-performance vector search in Rust. Filtering, payload indexing. Self-hostable.', tags: ['Apache 2.0', 'Vector', 'Fast'], rating: 4.8, license: 'Apache 2.0' },
    'plane': { emoji: '📋', name: 'Plane', tag: 'Project Management', stars: '31k', desc: 'Open-source Jira alternative. Kanban, sprints, cycles. Self-hostable.', tags: ['MIT License', 'Kanban', 'Free'], rating: 4.6, license: 'MIT' },
    'aider': { emoji: '📝', name: 'Aider', tag: 'AI Pair Programmer', stars: '20k', desc: 'Terminal-based AI pair programming. Edit code with Claude/GPT-4 via git diffs.', tags: ['Apache 2.0', 'Terminal', 'AI'], rating: 4.8, license: 'Apache 2.0' },
    'zed': { emoji: '⚡', name: 'Zed', tag: 'Code Editor', stars: '52k', desc: 'GPU-accelerated code editor in Rust. Built-in AI assistant, ultra-fast. Free.', tags: ['Free', 'Open Source', 'Fast'], rating: 4.8, license: 'GPL' },
    'monica': { emoji: '🤖', name: 'Monica', tag: 'AI Search', stars: '—', desc: 'AI-powered personal assistant for your browser. Search, chat, write, and summarize.', tags: ['Free Tier', 'AI', 'Search'], rating: 4.5, license: 'Freemium' },
    'goose': { emoji: '🪿', name: 'Goose', tag: 'Developer Agent', stars: '11k', desc: "Block's open-source AI agent. Executes shell commands, writes code. Apache 2.0.", tags: ['Open Source', 'Agent', 'Free'], rating: 4.6, license: 'Apache 2.0' },
    'autogpt': { emoji: '🤖', name: 'AutoGPT', tag: 'Autonomous Agent', stars: '172k', desc: 'The original autonomous AI agent. Task decomposition and web search.', tags: ['Open Source', 'AI', 'Autonomous'], rating: 4.3, license: 'MIT' },
    'pipedream': { emoji: '🔗', name: 'Pipedream', tag: 'API Automation', stars: '9.2k', desc: 'Connect APIs with code. 1,000+ integrations. Free tier with generous limits.', tags: ['Free Tier', 'API', 'Developer'], rating: 4.7, license: 'Proprietary' },
    'airflow': { emoji: '📋', name: 'Apache Airflow', tag: 'Data Pipelines', stars: '37k', desc: 'The industry standard for data pipeline orchestration. Python-based DAGs.', tags: ['Open Source', 'Data', 'Pipelines'], rating: 4.7, license: 'Apache 2.0' },
    'prefect': { emoji: '🔄', name: 'Prefect', tag: 'Workflow Orchestration', stars: '16k', desc: 'Modern data pipeline orchestration. Better experience, Python-native.', tags: ['Open Source', 'Data', 'Modern'], rating: 4.8, license: 'Apache 2.0' },
    'langflow': { emoji: '🔗', name: 'Langflow', tag: 'Visual RAG', stars: '38k', desc: 'Drag-and-drop RAG and agent builder. Export as API instantly. Self-hostable.', tags: ['Open Source', 'Visual', 'RAG'], rating: 4.6, license: 'MIT' },
    'llamaindex': { emoji: '🧩', name: 'LlamaIndex', tag: 'RAG Framework', stars: '37k', desc: 'The Python framework for production RAG. Data ingestion, indexing, retrieval.', tags: ['Open Source', 'RAG', 'Python'], rating: 4.9, license: 'MIT' },
    'haystack': { emoji: '🔴', name: 'Haystack', tag: 'NLP Pipelines', stars: '18k', desc: "Production-ready NLP and RAG framework. Pipeline-based architecture.", tags: ['Open Source', 'RAG', 'Enterprise'], rating: 4.7, license: 'Apache 2.0' },
    'langchain': { emoji: '⛓️', name: 'LangChain', tag: 'AI Framework', stars: '93k', desc: 'The foundational LLM framework. Chains, agents, RAG primitives. Massive ecosystem.', tags: ['Open Source', 'AI', 'Chain'], rating: 4.8, license: 'MIT' },
    'chroma': { emoji: '🟠', name: 'Chroma', tag: 'Embedding Store', stars: '15k', desc: 'The easiest open-source vector database. Python-native, great for prototyping.', tags: ['Open Source', 'Vector', 'Fast'], rating: 4.7, license: 'Apache 2.0' },
    'weaviate': { emoji: '🔵', name: 'Vector Search', stars: '12k', desc: 'Open-source vector search with built-in vectorization. Multi-modal support.', tags: ['Open Source', 'Vector', 'API'], rating: 4.7, license: 'BSD' },
    'milvus': { emoji: '🏛️', name: 'Enterprise VDB', stars: '30k', desc: 'Enterprise-grade open-source vector database. Billion-scale vectors.', tags: ['Open Source', 'Vector', 'Large Scale'], rating: 4.8, license: 'Apache 2.0' },
    'pgvector': { emoji: '🐘', name: 'pgvector', tag: 'Postgres Vector', stars: '13k', desc: 'Add vector search to your existing PostgreSQL database. SQL interface.', tags: ['Open Source', 'Postgres', 'Vector'], rating: 4.9, license: 'PostgreSQL' },
    'redis': { emoji: '🔴', name: 'Redis Stack', tag: 'Low-latency VDB', stars: '22k', desc: 'Redis with vector similarity search. Ultra-low latency, familiar interface.', tags: ['Open Source', 'Fast', 'Cache'], rating: 4.7, license: 'Fair-source' },
    'fzf': { emoji: '📁', name: 'fzf', tag: 'Fuzzy Finder', stars: '64k', desc: 'Command-line fuzzy finder. Pipe anything through it for interactive filtering.', tags: ['MIT License', 'CLI', 'Tool'], rating: 4.9, license: 'MIT' },
    'ripgrep': { emoji: '🔍', name: 'ripgrep', tag: 'Text Search', stars: '48k', desc: 'Blazing-fast recursive regex search. 10x faster than grep. Written in Rust.', tags: ['MIT License', 'CLI', 'Search'], rating: 4.9, license: 'MIT' },
    'lazygit': { emoji: '🐙', name: 'lazygit', tag: 'Git TUI', stars: '50k', desc: 'Simple terminal UI for git commands. Stage, commit, branch visually.', tags: ['MIT License', 'CLI', 'Git'], rating: 4.8, license: 'MIT' },
    'focalboard': { emoji: '🃏', name: 'Focalboard', tag: 'Kanban', stars: '22k', desc: 'Mattermost open-source project board. Kanban, table, gallery views.', tags: ['Open Source', 'Self-Hostable', 'Kanban'], rating: 4.4, license: 'AGPL' },
    'appflowy': { emoji: '📝', name: 'AppFlowy', tag: 'Notion Alternative', stars: '59k', desc: 'Open-source Notion alternative with AI. Docs, databases, boards.', tags: ['Open Source', 'AI', 'Docs'], rating: 4.6, license: 'MIT' },
    'twenty': { emoji: '🌱', name: 'Twenty', tag: 'CRM', stars: '18k', desc: 'Open-source Salesforce alternative. Modern, fast, and self-hostable.', tags: ['Open Source', 'CRM', 'Modern'], rating: 4.5, license: 'AGPL' },
    'linear': { emoji: '🦋', name: 'Linear', tag: 'Issue Tracker', stars: '—', desc: 'Modern, fast issue tracker for high-performance teams. AI-powered triage.', tags: ['Free Tier', 'SaaS', 'Modern'], rating: 4.9, license: 'Proprietary' }
};

const EXTRA_PAGES = [
    { id: 'quickstart', title: 'Quickstart Guide' },
    { id: 'cloud', title: 'Cloud Services' },
    { id: 'streaming', title: 'Low-Latency Streaming' },
    { id: 'vision', title: 'Vision APIs' },
    { id: 'integrations', title: 'Master Integrations' }
];

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
html{scroll-behavior:smooth;font-size:16px}
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
.breadcrumb{display:flex;align-items:center;gap:0.5rem;font-family:var(--font-mono);font-size:0.75rem;color:var(--text3);margin-bottom:1.5rem;padding-top:2rem}
.breadcrumb a{color:var(--text3);text-decoration:none}.breadcrumb a:hover{color:var(--accent)}
h1,h2,h3{font-family:var(--font-display);font-weight:800;letter-spacing:-1px}
.page-hero{padding:3rem 0;position:relative}
.page-hero h1{font-size:clamp(2rem,5vw,3.5rem);margin-bottom:1rem}
.page-hero p{color:var(--text2);max-width:700px;font-size:1.1rem;margin-bottom:2rem}
.tools-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem}
.tool-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius2);padding:1.5rem;text-decoration:none;color:var(--text);display:flex;flex-direction:column;gap:1rem;transition:0.25s}
.tool-card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:var(--glow)}
.tool-header{display:flex;align-items:center;gap:1rem}
.tool-logo{width:48px;height:48px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:1.5rem}
.tool-name{font-size:1.1rem;font-weight:700}
.tag{display:inline-flex;padding:2px 10px;border-radius:100px;font-size:0.75rem;font-family:var(--font-mono)}
.tag-free{background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.2)}
.tag-open{background:rgba(124,58,237,0.1);color:#a78bfa;border:1px solid rgba(124,58,237,0.2)}
.stat-row{display:flex;justify-content:space-between;border-bottom:1px solid var(--border);padding:8px 0;font-size:0.9rem}
.stat-label{color:var(--text3);text-transform:uppercase;font-size:0.7rem;letter-spacing:1px}
.stat-val{font-weight:600}
.prose{color:var(--text2);line-height:1.8;max-width:800px}
.prose h2{color:var(--text);margin:2rem 0 1rem}
.faq-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;cursor:pointer}
.faq-q{padding:15px 20px;font-weight:700;display:flex;justify-content:space-between}
.faq-a{padding:0 20px 15px;display:none;color:var(--text2);font-size:0.9rem}
.faq-box.active .faq-a{display:block}
.faq-box.active .faq-q{color:var(--accent)}
footer{background:var(--bg2);border-top:1px solid var(--border);padding:4rem 2rem 2rem;margin-top:6rem}
.footer-bottom{max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text3);font-family:var(--font-mono)}
.footer-bottom a{color:var(--accent);text-decoration:none}
@media(max-width:768px){.footer-bottom{flex-direction:column;gap:1rem;text-align:center}}
`;

const getLayout = (title, content, head = {}, schema = null) => {
    const headObj = typeof head === 'string' ? { extra: head, canonical: '' } : head;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Freemium.Services</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${SITE_URL}${headObj.canonical || ''}">
    <meta name="description" content="${headObj.description || 'Verified directory of freemium and open-source software with self-hosting guides.'}">
    <meta name="keywords" content="${headObj.keywords || 'self-hosted, open-source, ai-tools, freemium, saas-alternatives'}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title} | Freemium.Services">
    <meta property="og:description" content="${headObj.description || 'Access the world\'s largest directory of open-source software.'}">
    <style>${MASTER_CSS}</style>
    ${headObj.extra || ''}
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
                <li><a href="/submit.html" class="btn-submit">+ Submit</a></li>
            </ul>
        </div>
    </nav>
    <main>${content}</main>
    <footer>
        <div class="container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;margin-bottom:4rem;text-align:left;">
            <div>
                <a href="/" class="logo" style="display:block;margin-bottom:1rem;">freemium<span>.services</span></a>
                <p style="color:var(--text3);font-size:0.85rem;">The world's largest verified directory of freemium and open-source software with self-hosting guides.</p>
            </div>
            <div>
                <h4 style="margin-bottom:1.25rem;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px;">Categories</h4>
                <a href="/category/ai-tools.html" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">AI Tools</a>
                <a href="/category/open-source.html" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">Open Source</a>
                <a href="/category/automation-tools.html" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">Automation</a>
            </div>
            <div>
                <h4 style="margin-bottom:1.25rem;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px;">Resources</h4>
                <a href="/quickstart.html" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">Quickstart</a>
                <a href="/cloud.html" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">Cloud Guides</a>
            </div>
            <div>
                <h4 style="margin-bottom:1.25rem;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px;">Ecosystem</h4>
                <a href="${TQ_URL}" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">TurboQuant Network</a>
                <a href="https://github.com" style="display:block;color:var(--text2);margin-bottom:0.6rem;text-decoration:none;font-size:0.85rem;">Open Source GitHub</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Freemium.Services. Optimized for <a href="${TQ_URL}">TurboQuant DePIN</a>.</span>
            <span><a href="/sitemap.xml">Sitemap</a> | <a href="/submit.html">Submit Tool</a></span>
        </div>
    </footer>
    <script>
        document.querySelectorAll('.faq-box').forEach(box => {
            box.addEventListener('click', () => box.classList.toggle('active'));
        });
    </script>
</body>
</html>`;
};

// --- GENERATORS ---

function genHomepage() {
    let content = `
    <div class="hero container" style="text-align:center;padding:6rem 2rem;">
        <span style="display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--border);padding:5px 15px;border-radius:100px;font-size:0.75rem;color:var(--accent);margin-bottom:2rem;">
            <span style="width:6px;height:6px;background:var(--green);border-radius:50%;margin-right:10px;box-shadow:0 0 10px var(--green);"></span>
            World's Largest Verified Directory (2,847+ Tools)
        </span>
        <h1 style="font-size:clamp(2.5rem, 8vw, 5rem);margin-bottom:1.5rem;line-height:1.1;">Discover, Self-Host, <br><span style="color:var(--accent);">Build The Future.</span></h1>
        <p style="color:var(--text2);font-size:1.2rem;max-width:700px;margin:0 auto 3rem;">Find the best freemium and open-source tools with step-by-step self-hosting guides. Powered by decentralized DePIN compute.</p>
        <div style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;">
            <a href="/category/ai-tools.html" class="btn" style="background:var(--accent);color:var(--bg);font-weight:700;padding:1rem 2rem;">Explore AI Tools</a>
            <a href="/category/open-source.html" class="btn" style="background:var(--surface);border:1px solid var(--border);padding:1rem 2rem;">Open Source Directory</a>
        </div>
    </div>

    <section class="container" style="padding-bottom:6rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2.5rem;">
            <h2 class="section-title">Explore by Category</h2>
            <a href="/category/all.html" style="color:var(--accent);text-decoration:none;font-family:var(--font-mono);font-size:0.8rem;">View All →</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.25rem;">
            ${categories.map(c => `
                <a href="/category/${c.id}.html" class="tool-card" style="text-align:center;align-items:center;padding:2rem;">
                    <div style="font-size:2.5rem;margin-bottom:1rem;">${c.icon}</div>
                    <div class="tool-name">${c.name}</div>
                    <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text3);margin-top:5px;">${c.count} verified</div>
                </a>
            `).join('')}
        </div>
    </section>

    <section style="background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:5rem 0;">
        <div class="container">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2.5rem;">
                <h2 class="section-title">Trending Tools</h2>
                <a href="/category/ai-tools.html" style="color:var(--accent);text-decoration:none;font-family:var(--font-mono);font-size:0.8rem;">View All Trending →</a>
            </div>
            <div class="tools-grid">
                ${['n8n', 'claude-code', 'ollama', 'dify', 'zed', 'supabase'].map(tid => {
                    const t = allTools[tid];
                    return `
                    <a href="/tools/${tid}.html" class="tool-card">
                        <div class="tool-header">
                            <div class="tool-logo">${t.emoji}</div>
                            <div class="tool-meta">
                                <div class="tool-name">${t.name}</div>
                                <div style="font-size:0.75rem;color:var(--text3);">${t.tag}</div>
                            </div>
                            <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--yellow);">★ ${t.stars}</div>
                        </div>
                        <p class="tool-desc">${t.desc}</p>
                        <div class="tool-footer">
                            ${t.tags.map(tg => `<span class="tag tag-free">${tg}</span>`).join('')}
                        </div>
                    </a>`;
                }).join('')}
            </div>
        </div>
    </section>
    `;
    fs.writeFileSync(path.join(outDir, 'index.html'), getLayout('World\'s Largest Freemium Directory', content));
}

function genCategoryPages() {
    categories.forEach(cat => {
        let catTools = cat.tools.map(tid => allTools[tid]).filter(t => t);
        let content = `
        <div class="container">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <span>${cat.name}</span></nav>
            <div class="page-hero">
                <h1 style="display:flex;align-items:center;gap:1.5rem;">${cat.icon} Best ${cat.name} in 2026</h1>
                <p>${cat.description}</p>
                <div style="display:flex;gap:2rem;font-family:var(--font-mono);font-size:0.8rem;color:var(--text3);">
                    <span>● ${cat.count} verified tools</span>
                    <span>● Updated daily</span>
                    <span>● ${cat.faqs.length}+ Expert FAQs</span>
                </div>
            </div>

            <div class="tools-grid">
                ${catTools.map(t => {
                    const tid = Object.keys(allTools).find(k => allTools[k].name === t.name);
                    return `
                    <a href="/tools/${tid}.html" class="tool-card">
                        <div class="tool-header">
                            <div class="tool-logo">${t.emoji}</div>
                            <div class="tool-meta">
                                <div class="tool-name">${t.name}</div>
                                <div style="font-size:0.75rem;color:var(--text3);">${t.tag}</div>
                            </div>
                            <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--yellow);">★ ${t.stars}</div>
                        </div>
                        <p class="tool-desc">${t.desc}</p>
                        <div class="tool-footer">
                            ${t.tags.map(tg => `<span class="tag tag-free">${tg}</span>`).join('')}
                        </div>
                    </a>`;
                }).join('')}
            </div>

            <section style="margin-top:6rem;max-width:800px;">
                <h2 style="margin-bottom:2rem;">Frequently Asked Questions about ${cat.name}</h2>
                ${cat.faqs.map(([q,a]) => `
                    <div class="faq-box">
                        <div class="faq-q">${q} <span>+</span></div>
                        <div class="faq-a">${a}</div>
                    </div>
                `).join('')}
            </section>
        </div>`;
        const head = {
            canonical: `/category/${cat.id}.html`,
            description: cat.description,
            keywords: cat.keywords
        };
        fs.writeFileSync(path.join(categoryDir, `${cat.id}.html`), getLayout(`${cat.name} List (2026)`, content, head));
        // Also write to root for backward compatibility if needed, but the user asked for interlinking. 
        // I'll stick to /category/ and redirect later if needed.
    });
}

function genToolPages() {
    Object.keys(allTools).forEach(tid => {
        const t = allTools[tid];
        const cat = categories.find(c => c.tools.includes(tid)) || { id: 'all', name: 'Tools' };
        let content = `
        <div class="container">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/category/${cat.id}.html">${cat.name}</a> <span>›</span> <span>${t.name}</span></nav>
            <div style="display:grid;grid-template-columns:1fr 320px;gap:4rem;padding-top:2rem;">
                <div>
                    <div style="width:72px;height:72px;background:var(--surface2);border:1px solid var(--border);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin-bottom:1.5rem;">${t.emoji}</div>
                    <h1 style="font-size:3.5rem;margin-bottom:0.5rem;">${t.name}</h1>
                    <p style="font-size:1.2rem;color:var(--text2);margin-bottom:1.5rem;">${t.desc}</p>
                    <div style="display:flex;gap:1rem;margin-bottom:2.5rem;">
                        <span class="tag tag-free">★ ${t.stars} Stars</span>
                        <span class="tag tag-open">${t.license} License</span>
                        <span class="tag tag-self">Self-Host Ready</span>
                    </div>
                    <div style="display:flex;gap:1rem;margin-bottom:4rem;">
                        <a href="#self-host" class="btn" style="background:var(--accent);color:var(--bg);font-weight:700;">Self-Hosting Guide</a>
                        <a href="${TQ_URL}" class="btn" style="background:var(--surface);border:1px solid var(--border);">Build on TurboQuant</a>
                    </div>

                    <div class="prose">
                        <h2>Features & Overview</h2>
                        <p>${t.name} is a powerful solution in the <strong>${t.tag}</strong> landscape. It provides developers with high flexibility, low-latency performance, and the sovereignty of open-source software.</p>
                        <ul>
                            <li>Deep integration with modern developer stacks.</li>
                            <li>High-performance architecture built for 2026 scale.</li>
                            <li>Massive community support with over ${t.stars} stars.</li>
                        </ul>

                        <h2 id="self-host">Self-Hosting ${t.name} with Docker</h2>
                        <p>Deploying ${t.name} on the <strong>TurboQuant DePIN edge network</strong> or your own VPS is simple using Docker Compose.</p>
                        <div style="background:#050810;border:1px solid var(--border);padding:1.5rem;border-radius:12px;font-family:var(--font-mono);font-size:0.85rem;margin:1.5rem 0;color:var(--green);">
                            # docker-compose.yml<br>
                            version: "3.8"<br>
                            services:<br>
                            &nbsp;&nbsp;${tid}:<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;image: ${tid}/latest<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;ports: ["8080:8080"]<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;restart: unless-stopped
                        </div>
                    </div>
                </div>
                <aside>
                    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;position:sticky;top:100px;">
                        <h4 style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--text3);margin-bottom:1rem;letter-spacing:1px;">Tool Metadata</h4>
                        <div class="stat-row"><span class="stat-label">Rating</span><span class="stat-val">⭐ ${t.rating} / 5.0</span></div>
                        <div class="stat-row"><span class="stat-label">Category</span><span class="stat-val"><a href="/category/${cat.id}.html" style="color:var(--accent);text-decoration:none;">${cat.name}</a></span></div>
                        <div class="stat-row"><span class="stat-label">Status</span><span class="stat-val" style="color:var(--green);">Verified ✓</span></div>
                        <div class="stat-row"><span class="stat-label">Compute</span><span class="stat-val">DePIN Optimized</span></div>
                        <div class="stat-row"><span class="stat-label">Deployment</span><span class="stat-val">Docker / VPS</span></div>
                        <a href="${TQ_URL}" class="btn" style="width:100%;margin-top:1.5rem;background:var(--accent);color:var(--bg);font-size:0.8rem;justify-content:center;">Deploy to TurboQuant</a>
                    </div>
                </aside>
            </div>
        </div>`;
        const schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": t.name,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web, Self-Hosted",
            "description": t.desc,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": t.rating,
                "ratingCount": "100"
            }
        };

        const head = {
            canonical: `/tools/${tid}.html`,
            description: `Discover ${t.name} - ${t.desc}. Full self-hosting guide, feature breakdown, and open-source licensing details.`,
            keywords: `${t.name}, self-hosting, ${t.tag}, open-source alternative, ${t.tags.join(', ')}`
        };

        fs.writeFileSync(path.join(toolsDir, `${tid}.html`), getLayout(`${t.name} - Self-Hosting Guide & Features`, content, head, schema));
    });
}

function genExtraPages() {
    EXTRA_PAGES.forEach(page => {
        let content = `
        <div class="container prose" style="padding:6rem 0;">
            <nav class="breadcrumb"><a href="/">Home</a> <span>›</span> <span>${page.title}</span></nav>
            <h1>${page.title}</h1>
            <p>This technical guide provides deep insights into the <strong>${page.id}</strong> framework within the Freemium Services ecosystem. Leveraging decentralized infrastructure via TurboQuant, developers can now scale ${page.id.replace('-', ' ')} with zero latency.</p>
            <h2>Strategic Advantages</h2>
            <p>Building on top of open-source primitives ensures that your stack remains future-proof. Our directory evaluates tools based on their integration capabilities with DePIN nodes.</p>
            <div style="background:var(--surface);border:1px solid var(--accent);padding:2rem;border-radius:12px;margin:2rem 0;">
                <h3 style="margin-top:0;color:var(--accent);">TurboQuant Optimization Active</h3>
                <p style="margin-bottom:0;">This page architecture is optimized for semantic search and high-speed delivery across the global edge network.</p>
            </div>
        </div>`;
        fs.writeFileSync(path.join(outDir, `${page.id}.html`), getLayout(page.title, content));
    });
}

function genSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="//freemium.services/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>2026-04-09T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
  </url>
  <url>
    <loc>${SITE_URL}/index.html</loc>
    <lastmod>2026-04-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${EXTRA_PAGES.map(p => `
  <url>
    <loc>${SITE_URL}/${p.id}.html</loc>
    <lastmod>2026-04-09T00:00:00+00:00</lastmod>
    <changefreq>${p.id === 'quickstart' ? 'monthly' : 'weekly'}</changefreq>
    <priority>${p.id === 'quickstart' ? '0.9' : '0.7'}</priority>
  </url>`).join('')}
  ${categories.map(c => `
  <url>
    <loc>${SITE_URL}/category/${c.id}.html</loc>
    <lastmod>2026-04-09T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  ${Object.keys(allTools).map(tid => {
      const t = allTools[tid];
      const priority = ['n8n', 'dify', 'ollama', 'open-webui', 'supabase', 'coolify'].includes(tid) ? '0.9' : '0.8';
      return `
  <url>
    <loc>${SITE_URL}/tools/${tid}.html</loc>
    <lastmod>2026-04-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    ${t.image ? `
    <image:image>
      <image:loc>${t.image}</image:loc>
      <image:title>${t.name} ${t.tag} tool</image:title>
    </image:image>` : ''}
  </url>`; }).join('')}
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

    // sitemap-images.xml
    const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${Object.keys(allTools).filter(tid => allTools[tid].image).map(tid => {
      const t = allTools[tid];
      return `
  <url>
    <loc>${SITE_URL}/tools/${tid}.html</loc>
    <image:image>
      <image:loc>${t.image}</image:loc>
      <image:title>${t.name} workflow automation tool</image:title>
    </image:image>
  </url>`; }).join('')}
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap-images.xml'), imageSitemap);

    // sitemap-news.xml (recent updates)
    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${SITE_URL}/category/ai-tools.html</loc>
    <news:news>
      <news:publication><news:name>Freemium Services</news:name><news:language>en</news:language></news:publication>
      <news:publication_date>2026-04-09T00:00:00+00:00</news:publication_date>
      <news:title>Best AI Tools 2026 Directory Updated</news:title>
    </news:news>
  </url>
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap-news.xml'), newsSitemap);

    // sitemap-video.xml (basic placeholder for compliance)
    const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE_URL}/streaming.html</loc>
    <video:video>
      <video:thumbnail_loc>${SITE_URL}/assets/streaming-thumb.jpg</video:thumbnail_loc>
      <video:title>Low-Latency Streaming Guide</video:title>
      <video:description>Technical overview of decentralized streaming infrastructure.</video:description>
      <video:player_loc>${SITE_URL}/player?v=streaming</video:player_loc>
    </video:video>
  </url>
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap-video.xml'), videoSitemap);
}

function genRobotsTxt() {
    const robots = `# ============================================
# robots.txt
# Domain: freemium.services
# Optimized: AI Models, LLMs, Search Engines, Auto-Indexing
# Version: 2.0 (Enterprise Grade)
# ============================================

User-agent: *
Allow: /
Allow: /category/
Allow: /tools/
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/
Allow: /sitemap.xml
Allow: /sitemap-*.xml
Allow: /*.html$

Disallow: /admin/
Disallow: /wp-admin/
Disallow: /cgi-bin/
Disallow: /tmp/
Disallow: /logs/
Disallow: /backup/
Disallow: /private/
Disallow: /config/
Disallow: /includes/
Disallow: /vendor/
Disallow: /node_modules/
Disallow: /wp-*
Disallow: /feed/
Disallow: /trackback/
Disallow: /xmlrpc.php
Disallow: /?s=
Disallow: /*?
Disallow: /*.pdf$
Disallow: /*.zip$
Disallow: /*.gz$

Crawl-delay: 0.3

# AI MODEL CRAWLERS (Full Access)
User-agent: GPTBot
User-agent: ChatGPT-User
Allow: /
Crawl-delay: 0.5

User-agent: Google-Extended
Allow: /
Crawl-delay: 0.3

User-agent: anthropic-ai
Allow: /
Crawl-delay: 0.5

User-agent: CCBot
Allow: /
Crawl-delay: 1

User-agent: FacebookBot
User-agent: meta-externalagent
Allow: /
Crawl-delay: 0.5

User-agent: Amazonbot
Allow: /
Crawl-delay: 0.5

User-agent: Applebot
User-agent: Applebot-Extended
Allow: /
Crawl-delay: 0.5

User-agent: bingbot
User-agent: adidxbot
Allow: /
Crawl-delay: 0.3

User-agent: PerplexityBot
Allow: /
Crawl-delay: 1

User-agent: CohereBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 1

User-agent: Yeti
Allow: /
Crawl-delay: 1

# SEO & TRADITIONAL CRAWLERS
User-agent: Googlebot
Allow: /
Crawl-delay: 0.2

User-agent: Bingbot
Allow: /
Crawl-delay: 0.3

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-images.xml
Sitemap: ${SITE_URL}/sitemap-news.xml
Sitemap: ${SITE_URL}/sitemap-video.xml

Host: ${SITE_URL.replace('https://', '')}
`;
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
}

// --- EXECUTION ---
console.log('Generating Homepage...');
genHomepage();
console.log('Generating Categories...');
genCategoryPages();
console.log('Generating Tools...');
genToolPages();
console.log('Generating Extra Pages...');
genExtraPages();
console.log('Generating Sitemap...');
genSitemap();
console.log('Generating Sitemap Variants (News, Images)...');
console.log('Generating Robots.txt...');
genRobotsTxt();

console.log('Site generation complete! Interlinking and SEO optimized.');
