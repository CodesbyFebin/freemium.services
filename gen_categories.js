const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'category');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const SITE = 'https://freemium.services';
const TQ = 'https://turboquant.network';

const cats = [
  {
    id: 'open-source', title: 'Open Source Tools', emoji: '🐙', count: 891,
    desc: 'The most comprehensive directory of open-source software — MIT, Apache 2.0, AGPLv3 and more. All self-hostable, all free.',
    keywords: 'open source tools 2026, free open source software, self-hosted open source, github open source projects',
    tools: [
      { emoji:'🔁', name:'n8n', tag:'Workflow Automation', stars:'47.2k', desc:'Fair-code workflow automation. 400+ integrations, native AI nodes. Best open-source Zapier alternative.', tags:['Open Source','Self-Hostable','Free Tier'] },
      { emoji:'🌊', name:'Dify', tag:'LLM Platform', stars:'52k', desc:'Build and deploy LLM apps visually. RAG pipelines, agents, multi-model. Fully open-source and self-hostable.', tags:['Open Source','Self-Hostable','AI-Powered'] },
      { emoji:'🦙', name:'Ollama', tag:'Local LLMs', stars:'94k', desc:'Run Llama, Mistral, Gemma and 100+ models locally. MIT licensed. macOS, Linux, Windows.', tags:['MIT License','Open Source','Local First'] },
      { emoji:'💬', name:'Open WebUI', tag:'Chat Interface', stars:'52k', desc:'Self-hosted ChatGPT-style UI for Ollama. Multi-model, RAG, web search. Deploy in minutes.', tags:['MIT License','Open Source','Self-Hostable'] },
      { emoji:'🔍', name:'Meilisearch', tag:'Search Engine', stars:'47k', desc:'Blazing-fast open-source search engine. Easy to self-host. REST API with typo-tolerance.', tags:['MIT License','Open Source','Self-Hostable'] },
      { emoji:'📊', name:'Metabase', tag:'Analytics', stars:'38k', desc:'Open-source BI tool. Connect to any database, build dashboards without SQL. Free community edition.', tags:['Open Source','Self-Hostable','Free Tier'] },
    ],
    faqs: [
      ['What does open-source mean for software tools?', 'Open-source software has its source code publicly available, allowing anyone to view, use, modify, and distribute it. Most open-source tools are free to self-host and use commercially under licenses like MIT, Apache 2.0, or AGPL.'],
      ['What is the best way to self-host open-source tools?', 'The easiest approach is Docker. Most tools provide a docker-compose.yml file that lets you spin up the entire stack with a single command. For production, pair with a reverse proxy like Nginx or Caddy, and consider TurboQuant edge nodes for global distribution.'],
      ['Are open-source tools safe for production?', 'Yes — many of the most reliable production tools are open-source (PostgreSQL, Redis, Linux). The key advantage is full code auditability. Always check for an active community, regular security updates, and a clear license before deploying.'],
    ]
  },
  {
    id: 'self-hosting', title: 'Self-Hosting Guides', emoji: '🖥️', count: 215,
    desc: 'Step-by-step guides to self-host the best SaaS alternatives. Docker, Kubernetes, VPS, and bare metal — take full control of your stack.',
    keywords: 'self hosting guide 2026, self hosted alternatives, docker self host, open source saas alternatives',
    tools: [
      { emoji:'🔁', name:'n8n', tag:'Automation', stars:'47.2k', desc:'Self-host your workflow automation. No usage limits, full data control. docker run in 60 seconds.', tags:['Self-Hostable','Open Source','Free'] },
      { emoji:'💬', name:'Open WebUI', tag:'AI Chat', stars:'52k', desc:'Self-hosted ChatGPT replacement. Connect to local Ollama or any OpenAI-compatible API.', tags:['Self-Hostable','MIT License','Local First'] },
      { emoji:'🧠', name:'Onyx', tag:'Enterprise AI', stars:'12.8k', desc:'Self-hosted enterprise AI assistant. Connect your docs, Slack, Notion. Full data sovereignty.', tags:['Self-Hostable','Open Source','AI-Powered'] },
      { emoji:'🔍', name:'Meilisearch', tag:'Search', stars:'47k', desc:'Self-host your own Algolia alternative. Sub-50ms search, easy config, REST API.', tags:['Self-Hostable','MIT License','Free'] },
      { emoji:'📊', name:'Metabase', tag:'Analytics', stars:'38k', desc:'Self-hosted BI and analytics. Point at your database, get beautiful dashboards instantly.', tags:['Self-Hostable','Open Source','Free Tier'] },
      { emoji:'🌊', name:'Dify', tag:'LLM Platform', stars:'52k', desc:'Self-host your own LLM app platform. Full RAG, agents, and workflow builder under your control.', tags:['Self-Hostable','Open Source','AI-Powered'] },
    ],
    faqs: [
      ['What do I need to self-host a tool?', 'A VPS or server with Docker installed is all you need for most tools. A $6/month Hetzner or DigitalOcean VPS handles most self-hosted apps. For AI workloads needing GPU, consider TurboQuant DePIN edge nodes — dramatically cheaper than AWS.'],
      ['Is self-hosting secure?', 'Self-hosting can be more secure than SaaS because your data never leaves your infrastructure. Use a reverse proxy (Nginx/Caddy), keep Docker images updated, use strong secrets, and enable firewall rules. Most guides on this directory cover security setup.'],
      ['How much does self-hosting cost vs SaaS?', 'Typically 90% cheaper. A $10/month VPS can run n8n, Metabase, a Postgres database, and more — replacing $200+/month in SaaS subscriptions. With TurboQuant DePIN compute, AI inference costs drop another 10x vs AWS.'],
    ]
  },
  {
    id: 'automation-tools', title: 'Automation Tools', emoji: '⚙️', count: 178,
    desc: 'The best free and open-source workflow automation tools. Replace Zapier, Make, and Tray with self-hostable alternatives you fully control.',
    keywords: 'free automation tools, open source zapier alternative, workflow automation 2026, n8n alternatives',
    tools: [
      { emoji:'🔁', name:'n8n', tag:'Workflow Automation', stars:'47.2k', desc:'The leading open-source automation platform. 400+ integrations, visual builder, native AI nodes. Self-host for free.', tags:['Open Source','Self-Hostable','Free Tier'] },
      { emoji:'🌊', name:'Activepieces', tag:'No-Code Automation', stars:'11.8k', desc:'MIT-licensed Zapier alternative. Beautiful UI, 200+ pieces, TypeScript-based. Fully self-hostable.', tags:['MIT License','Self-Hostable','Free Tier'] },
      { emoji:'⚙️', name:'Windmill', tag:'Dev Automation', stars:'9.8k', desc:'Turn scripts into production workflows. Multi-language (Python, TS, Go, Bash). AGPLv3 licensed.', tags:['Open Source','Self-Hostable','Free Tier'] },
      { emoji:'🔗', name:'Pipedream', tag:'API Automation', stars:'9.2k', desc:'Connect APIs with code. 1,000+ integrations. Free tier with generous limits. Open-source core.', tags:['Free Tier','Open Source','Cloud + Self-host'] },
      { emoji:'📋', name:'Apache Airflow', tag:'Data Pipelines', stars:'37k', desc:'The industry standard for data pipeline orchestration. Python-based DAGs, massive ecosystem.', tags:['Open Source','Self-Hostable','Apache 2.0'] },
      { emoji:'🌀', name:'Prefect', tag:'Workflow Orchestration', stars:'16k', desc:'Modern data pipeline orchestration. Beautiful UI, Python-native, free tier. Apache 2.0 licensed.', tags:['Free Tier','Open Source','Self-Hostable'] },
    ],
    faqs: [
      ['What is the best free alternative to Zapier?', 'n8n is the leading open-source Zapier alternative with 47,000+ GitHub stars, 400+ integrations, and native AI nodes. It is fully self-hostable giving you unlimited automations for free. Activepieces (MIT) is another excellent option with a more modern UI.'],
      ['Can I self-host automation tools?', 'Yes — n8n, Activepieces, and Windmill are all fully self-hostable via Docker. Self-hosting removes usage limits, keeps data private, and costs a fraction of SaaS plans. Pair with TurboQuant edge nodes for high-availability global deployments.'],
      ['How do I add AI to my automation workflows?', 'n8n has native AI nodes for LLM chains, vector stores, and AI agents. Connect to OpenAI, Claude, or local Ollama models. You can build fully automated RAG pipelines, AI email responders, and intelligent workflows without code.'],
    ]
  },
  {
    id: 'ai-agents', title: 'AI Agents', emoji: '🧠', count: 134,
    desc: 'The best free and open-source AI agents — coding agents, browser agents, research agents, and autonomous task runners.',
    keywords: 'free AI agents, open source ai agents 2026, autonomous ai agent, coding agent free',
    tools: [
      { emoji:'⚡', name:'Claude Code', tag:'Coding Agent', stars:'New', desc:"Anthropic's terminal-native AI coding agent. Reads repos, writes code, runs tests, manages Git. Free tier available.", tags:['Free Tier','AI-Powered','Agentic'] },
      { emoji:'🪿', name:'Goose', tag:'Developer Agent', stars:'11k', desc:"Block's open-source AI agent. Executes shell commands, writes code, browses web. Works with any LLM.", tags:['Free','Open Source','Apache 2.0'] },
      { emoji:'🖊️', name:'Cline', tag:'VS Code Agent', stars:'29k', desc:'Leading open-source AI coding agent for VS Code. Creates files, runs commands, any LLM backend.', tags:['Free','Open Source','AI-Powered'] },
      { emoji:'🦘', name:'Roo Code', tag:'VS Code Agent', stars:'18k', desc:'Autonomous VS Code agent with custom modes and boomerang tasks for complex multi-step workflows.', tags:['Free','Open Source','AI-Powered'] },
      { emoji:'🤖', name:'AutoGPT', tag:'Autonomous Agent', stars:'172k', desc:'The original autonomous AI agent. Task decomposition, web search, file management. Fully open-source.', tags:['Open Source','Free','AI-Powered'] },
      { emoji:'🌊', name:'Dify', tag:'Agent Platform', stars:'52k', desc:'Build and deploy AI agents visually. Multi-step orchestration, tool use, RAG. Self-hostable platform.', tags:['Free Tier','Open Source','Agentic'] },
    ],
    faqs: [
      ['What is an AI agent?', 'An AI agent is a software system that uses a large language model to autonomously plan, reason, and execute multi-step tasks. Unlike simple chatbots, agents can browse the web, write and run code, manage files, call APIs, and complete complex workflows without human intervention at each step.'],
      ['What are the best free AI coding agents?', 'The best free AI coding agents are: Claude Code (Anthropic, free tier, terminal-native), Cline (VS Code, open-source, 29k stars), Roo Code (VS Code, open-source, 18k stars), Goose (Block, open-source, runs locally), and Aider (terminal, open-source, 20k stars). All support open-source LLMs via Ollama.'],
      ['Can AI agents run locally for free?', 'Yes. Use Goose, Cline, or Aider connected to a local Ollama model (Llama 3, Mistral, etc.). The entire stack runs on your hardware for free. For production agent deployments at scale, TurboQuant DePIN nodes provide distributed compute at 10x lower cost than cloud providers.'],
    ]
  },
  {
    id: 'developer-tools', title: 'Developer Tools', emoji: '⌨️', count: 267,
    desc: 'The best free and open-source developer tools — code editors, notebooks, search engines, databases, and infrastructure tools.',
    keywords: 'free developer tools 2026, open source dev tools, best developer tools free, coding tools open source',
    tools: [
      { emoji:'📓', name:'Marimo', tag:'Reactive Notebooks', stars:'8.4k', desc:'Next-gen reactive Python notebook. Every cell auto-reruns. Share as apps. Built-in AI. Apache 2.0.', tags:['Free','Open Source','AI-Ready'] },
      { emoji:'🔍', name:'Meilisearch', tag:'Search Engine', stars:'47k', desc:'Sub-50ms search API. Typo-tolerant, easy to deploy. MIT licensed. Best Algolia alternative.', tags:['MIT License','Self-Hostable','Free'] },
      { emoji:'⚡', name:'Zed', tag:'Code Editor', stars:'52k', desc:'GPU-accelerated code editor built in Rust. Ultra-fast, AI-native, collaborative. Free and open source.', tags:['Free','Open Source','AI-Ready'] },
      { emoji:'📊', name:'Metabase', tag:'Analytics', stars:'38k', desc:'Open-source BI tool. Beautiful dashboards, SQL, no-coding analytics. Free community edition.', tags:['Open Source','Self-Hostable','Free Tier'] },
      { emoji:'🗄️', name:'Supabase', tag:'Backend Platform', stars:'73k', desc:'Open-source Firebase alternative. Postgres, Auth, Storage, Realtime, Edge Functions. Free tier.', tags:['Open Source','Free Tier','Self-Hostable'] },
      { emoji:'🐳', name:'Coolify', tag:'Deployment', stars:'34k', desc:'Self-hosted Heroku/Netlify/Vercel alternative. Deploy anything via Docker. Free and open-source.', tags:['Open Source','Self-Hostable','Free'] },
    ],
    faqs: [
      ['What are the best free developer tools in 2026?', 'Top free developer tools: Supabase (open-source Firebase, 73k stars), Zed (GPU-accelerated editor, 52k stars), Meilisearch (search API, 47k stars), Metabase (analytics, 38k stars), Coolify (self-hosted deployment, 34k stars), and Marimo (reactive notebooks, 8k stars). All free to use, most open-source.'],
      ['What is the best self-hostable backend platform?', 'Supabase is the leading open-source backend platform with 73,000+ GitHub stars. It provides Postgres, authentication, storage, real-time subscriptions, and edge functions — all self-hostable. Appwrite (38k stars) is another excellent alternative, particularly for mobile apps.'],
      ['How can I deploy apps for free?', 'Use Coolify — an open-source self-hosted alternative to Heroku, Netlify, and Vercel. Deploy on your own VPS for as little as $6/month and get unlimited deployments. Pair with TurboQuant edge nodes for global CDN distribution at a fraction of cloud costs.'],
    ]
  },
  {
    id: 'rag-tools', title: 'RAG Tools', emoji: '📚', count: 89,
    desc: 'The best free and open-source RAG (Retrieval-Augmented Generation) tools — frameworks, vector pipelines, and end-to-end platforms.',
    keywords: 'free RAG tools, open source RAG, retrieval augmented generation tools, RAG pipeline 2026',
    tools: [
      { emoji:'🔗', name:'Langflow', tag:'Visual RAG Builder', stars:'38k', desc:'Drag-and-drop RAG and agent builder on LangChain. Export as API instantly. Self-hostable.', tags:['Free Tier','Open Source','Visual'] },
      { emoji:'🌊', name:'Dify', tag:'LLM+RAG Platform', stars:'52k', desc:'Full LLM app platform with built-in RAG. Upload docs, connect APIs, deploy agents. Self-hostable.', tags:['Free Tier','Open Source','Self-Hostable'] },
      { emoji:'🧩', name:'LlamaIndex', tag:'RAG Framework', stars:'37k', desc:'The Python framework for production RAG. Data ingestion, indexing, retrieval, synthesis. MIT licensed.', tags:['MIT License','Open Source','Python'] },
      { emoji:'🔴', name:'Haystack', tag:'RAG Pipelines', stars:'18k', desc:"deepset's production-ready NLP and RAG framework. Pipeline-based architecture. Apache 2.0.", tags:['Apache 2.0','Open Source','Production'] },
      { emoji:'🧠', name:'Onyx', tag:'Enterprise RAG', stars:'12.8k', desc:'Self-hosted enterprise AI with built-in RAG over your docs, Slack, Notion, and Drive.', tags:['Open Source','Self-Hostable','Enterprise'] },
      { emoji:'⛓️', name:'LangChain', tag:'AI Framework', stars:'93k', desc:'The foundational LLM framework. Chains, agents, RAG primitives. Massive ecosystem. MIT licensed.', tags:['MIT License','Open Source','Python'] },
    ],
    faqs: [
      ['What is RAG (Retrieval-Augmented Generation)?', "RAG is a technique that enhances LLM responses by retrieving relevant documents from a knowledge base before generating an answer. Instead of relying solely on the model's training data, RAG grounds responses in your own documents — making answers accurate, up-to-date, and source-citable."],
      ['How do I build a free RAG pipeline?', 'Use: Langflow or Dify (visual builders), LlamaIndex or LangChain (Python frameworks), Qdrant or Chroma (free vector databases), and Ollama (free local LLM embeddings). The entire stack is free and self-hostable. Langflow can have a basic RAG running in under 10 minutes.'],
      ['What is the best open-source RAG framework?', 'LlamaIndex (37k stars) is the most mature Python framework for production RAG. LangChain (93k stars) is the broadest framework covering RAG, agents, and chains. For no-code RAG, Langflow (built on LangChain) and Dify provide excellent visual builders.'],
    ]
  },
  {
    id: 'vector-databases', title: 'Vector Databases', emoji: '🗄️', count: 43,
    desc: 'The best free and open-source vector databases for AI applications — semantic search, RAG, recommendation engines, and more.',
    keywords: 'free vector database, open source vector db, best vector database 2026, self hosted vector database',
    tools: [
      { emoji:'🗄️', name:'Qdrant', tag:'Vector DB', stars:'21k', desc:'High-performance vector search built in Rust. Filtering, payload indexing, hybrid search. Self-hostable.', tags:['Apache 2.0','Self-Hostable','Free Tier'] },
      { emoji:'🟠', name:'Chroma', tag:'Embedding Store', stars:'15k', desc:'The easiest open-source vector database. Python-native, great for prototyping and production. Apache 2.0.', tags:['Apache 2.0','Open Source','Python'] },
      { emoji:'🔵', name:'Weaviate', tag:'Vector Search', stars:'12k', desc:'Open-source vector search with built-in vectorization. Multi-modal, GraphQL API. Self-hostable.', tags:['Open Source','Self-Hostable','Free Tier'] },
      { emoji:'🏛️', name:'Milvus', tag:'Enterprise Vector DB', stars:'30k', desc:'Enterprise-grade open-source vector database. Billion-scale vectors, distributed architecture.', tags:['Apache 2.0','Open Source','Self-Hostable'] },
      { emoji:'🐘', name:'pgvector', tag:'Postgres Extension', stars:'13k', desc:'Add vector search to your existing PostgreSQL database. Zero new infrastructure, SQL interface.', tags:['Open Source','Free','Self-Hostable'] },
      { emoji:'🔴', name:'Redis Stack', tag:'In-Memory Vector DB', stars:'22k', desc:'Redis with vector similarity search. Ultra-low latency, familiar interface. Free tier available.', tags:['Free Tier','Self-Hostable','Open Source'] },
    ],
    faqs: [
      ['What is a vector database?', 'A vector database stores high-dimensional vector embeddings and enables fast similarity search. Instead of exact keyword matching, vector databases find semantically similar content — enabling semantic search, RAG, recommendation engines, and anomaly detection. They are the backbone of modern AI applications.'],
      ['What is the best free vector database?', 'Qdrant is the top performer — built in Rust, extremely fast, with excellent filtering and a generous free cloud tier. Chroma is the easiest for Python developers to get started. pgvector is best if you already use PostgreSQL. Milvus handles billion-scale production workloads.'],
      ['How do I choose between Qdrant, Chroma, and Weaviate?', 'Choose Chroma for prototyping and simple RAG apps — easiest setup. Choose Qdrant for production performance, filtering needs, and hybrid search. Choose Weaviate if you need built-in vectorization and multi-modal search. All three are free and open-source.'],
    ]
  },
  {
    id: 'ai-kanban', title: 'AI Kanban & Project Management', emoji: '📋', count: 67,
    desc: 'AI-powered project management, kanban boards, and task management tools — free, open-source, and self-hostable.',
    keywords: 'AI kanban tools, open source project management, free task management AI, self hosted kanban 2026',
    tools: [
      { emoji:'📋', name:'Plane', tag:'Project Management', stars:'31k', desc:'Open-source Jira alternative. Kanban, sprints, cycles, modules. Self-hostable. MIT licensed.', tags:['MIT License','Self-Hostable','Free'] },
      { emoji:'🃏', name:'Focalboard', tag:'Kanban Board', stars:'22k', desc:'Mattermost open-source project board. Kanban, table, gallery views. Self-hosted or cloud.', tags:['Open Source','Self-Hostable','Free'] },
      { emoji:'📝', name:'AppFlowy', tag:'Notion Alternative', stars:'59k', desc:'Open-source Notion alternative with AI. Docs, databases, kanban. Privacy-first. MIT licensed.', tags:['MIT License','Open Source','AI-Ready'] },
      { emoji:'🦋', name:'Linear', tag:'Issue Tracking', stars:'—', desc:'Modern, fast issue tracker. Free tier generous. Git integration. AI-powered triage and summaries.', tags:['Free Tier','AI-Powered','Cloud'] },
      { emoji:'🌱', name:'Twenty', tag:'CRM + Kanban', stars:'18k', desc:'Open-source Salesforce alternative with kanban views. Self-hostable, MIT licensed.', tags:['MIT License','Open Source','Self-Hostable'] },
      { emoji:'🤖', name:'n8n AI Tasks', tag:'AI Task Automation', stars:'47.2k', desc:'Build AI-powered task kanban automations with n8n. Auto-assign, summarize, and route tickets.', tags:['Open Source','AI-Powered','Self-Hostable'] },
    ],
    faqs: [
      ['What is the best open-source alternative to Jira?', 'Plane is the top open-source Jira alternative with 31,000+ GitHub stars. It supports kanban boards, sprints, cycles, and modules. Fully self-hostable via Docker, MIT licensed, and completely free. Linear is an excellent SaaS option with a generous free tier.'],
      ['What is the best open-source Notion alternative with kanban?', 'AppFlowy is the leading open-source Notion alternative with 59,000+ GitHub stars. It includes AI writing assistance, docs, databases, and kanban views. MIT licensed and fully self-hostable. Obsidian with plugins is another popular choice for knowledge management.'],
      ['How can AI improve kanban and project management?', 'AI can auto-assign tasks based on workload and skills, summarize long issue threads, predict completion dates, detect blockers, triage incoming tickets, and generate status reports. n8n can orchestrate these AI workflows on top of any kanban tool via its API integrations.'],
    ]
  },
  {
    id: 'cli-tools', title: 'CLI Tools', emoji: '💻', count: 156,
    desc: 'The best free and open-source command-line tools for developers — shells, terminal utilities, AI assistants, and productivity boosters.',
    keywords: 'free CLI tools 2026, best command line tools, open source terminal tools, developer CLI utilities',
    tools: [
      { emoji:'⚡', name:'Claude Code', tag:'AI CLI Agent', stars:'New', desc:"Anthropic's terminal-native AI agent. Reads your codebase, writes code, runs commands autonomously.", tags:['Free Tier','AI-Powered','Terminal'] },
      { emoji:'🦙', name:'Ollama', tag:'LLM CLI', stars:'94k', desc:'Run LLMs from the terminal. `ollama run llama3` — done. MIT licensed, cross-platform.', tags:['MIT License','Free','Terminal'] },
      { emoji:'📝', name:'Aider', tag:'AI Pair Programmer', stars:'20k', desc:'Terminal-based AI pair programming. Edit code with Claude, GPT-4, or local models via git diffs.', tags:['Apache 2.0','Open Source','AI-Powered'] },
      { emoji:'🔍', name:'ripgrep', tag:'Text Search', stars:'48k', desc:'Blazing-fast recursive regex search. 10-100x faster than grep. Written in Rust. MIT licensed.', tags:['MIT License','Open Source','Free'] },
      { emoji:'📁', name:'fzf', tag:'Fuzzy Finder', stars:'64k', desc:'Command-line fuzzy finder. Pipe anything through fzf for interactive filtering. MIT licensed.', tags:['MIT License','Open Source','Free'] },
      { emoji:'🐙', name:'lazygit', tag:'Git TUI', stars:'50k', desc:'Simple terminal UI for git commands. Stage, commit, branch, and resolve conflicts visually in CLI.', tags:['MIT License','Open Source','Free'] },
    ],
    faqs: [
      ['What are the best AI CLI tools in 2026?', 'The best AI CLI tools are: Claude Code (Anthropic, terminal coding agent, free tier), Aider (AI pair programming via terminal, 20k stars), Ollama (run any LLM from terminal, 94k stars), and Shell-GPT (terminal GPT wrapper). Claude Code is the most capable for complex coding tasks.'],
      ['What terminal tools do professional developers use?', 'Essential terminal tools: fzf (fuzzy finder, 64k stars), ripgrep (fast search, 48k stars), lazygit (git TUI, 50k stars), bat (better cat), exa/eza (better ls), zoxide (better cd), tmux (terminal multiplexer), and starship (cross-shell prompt). All free and open-source.'],
      ['How do I use AI in my terminal workflow?', 'Install Ollama to run LLMs locally, then use Aider for AI pair programming in your editor. For autonomous task execution, Claude Code by Anthropic runs entire workflows from the terminal. Shell-GPT wraps any LLM as a shell assistant. All work offline with local models.'],
    ]
  },
  {
    id: 'assistants', title: 'AI Assistants', emoji: '💬', count: 98,
    desc: 'The best free AI assistants — chatbots, personal AI, and productivity assistants with generous free tiers or open-source options.',
    keywords: 'free AI assistants 2026, best AI chatbot free, open source AI assistant, ChatGPT alternatives free',
    tools: [
      { emoji:'💬', name:'Open WebUI', tag:'Self-Hosted Chat', stars:'52k', desc:'Feature-rich ChatGPT-style interface for Ollama. Multi-model, RAG, web search. 100% free and private.', tags:['MIT License','Self-Hostable','Free'] },
      { emoji:'🔍', name:'Perplexity AI', tag:'AI Search', stars:'—', desc:'AI-powered search engine. Free tier with real-time web search and source citations.', tags:['Free Tier','AI-Powered','Cloud'] },
      { emoji:'🤗', name:'Pi', tag:'Personal AI', stars:'—', desc:'Conversational personal AI by Inflection. Empathetic, thoughtful, nuanced. Free to use.', tags:['Free','AI-Powered','Cloud'] },
      { emoji:'📖', name:'Khoj', tag:'Personal AI', stars:'13k', desc:'Open-source personal AI with memory. Indexes your notes, docs, and data. Self-hostable.', tags:['Open Source','Self-Hostable','Free'] },
      { emoji:'🌐', name:'LibreChat', tag:'Multi-Model Chat', stars:'19k', desc:'Open-source ChatGPT UI supporting Claude, Gemini, Ollama and more. Self-hostable.', tags:['Open Source','Self-Hostable','Free'] },
      { emoji:'🧠', name:'Onyx', tag:'Enterprise Assistant', stars:'12.8k', desc:'Self-hosted enterprise AI assistant. Connects to all your tools. MIT licensed.', tags:['Open Source','Self-Hostable','Enterprise'] },
    ],
    faqs: [
      ['What are the best free AI assistants in 2026?', 'Best free AI assistants: Open WebUI (self-hosted, MIT), LibreChat (self-hosted multi-model, 19k stars), Perplexity AI (free tier with web search), Khoj (personal AI with memory, 13k stars), Pi by Inflection (free conversational AI), and Claude.ai free tier. For full privacy, self-host Open WebUI with Ollama.'],
      ['How can I run a free private AI assistant?', 'Install Ollama and Open WebUI on your own server or local machine. This gives you a ChatGPT-quality interface running on your hardware — completely free, completely private, no internet required. Open WebUI supports RAG, web search plugins, image generation, and multi-model switching.'],
      ['What is the best AI assistant for enterprise use?', 'For self-hosted enterprise AI: Onyx (12.8k stars) connects to Slack, Notion, Google Drive, and 40+ other sources to build a company-wide AI assistant. AnythingLLM is another option with a simple UI. Both are fully self-hostable, meaning your proprietary data never leaves your servers.'],
    ]
  },
  {
    id: 'ides', title: 'AI Code Editors & IDEs', emoji: '🖊️', count: 52,
    desc: 'The best AI-powered code editors, IDEs, and VS Code extensions — free, open-source, and built for the AI era of software development.',
    keywords: 'best AI code editor 2026, AI IDE free, VS Code AI, open source AI editor, free coding assistant',
    tools: [
      { emoji:'⚡', name:'Zed', tag:'AI-Native Editor', stars:'52k', desc:'GPU-accelerated code editor in Rust. Built-in AI assistant, real-time collaboration, ultra-fast. Free.', tags:['Free','Open Source','AI-Ready'] },
      { emoji:'🖊️', name:'Cline', tag:'VS Code Agent', stars:'29k', desc:'#1 open-source AI coding agent for VS Code. Full file system access, command execution, any LLM.', tags:['Free','Open Source','AI-Powered'] },
      { emoji:'🦘', name:'Roo Code', tag:'VS Code Agent', stars:'18k', desc:'Advanced VS Code agent with custom modes, boomerang tasks, multi-model support. Open source.', tags:['Free','Open Source','AI-Powered'] },
      { emoji:'💻', name:'Continue.dev', tag:'VS Code Plugin', stars:'20k', desc:'Open-source AI assistant for VS Code and JetBrains. Connect to any LLM — local or cloud.', tags:['Apache 2.0','Open Source','AI-Powered'] },
      { emoji:'🌙', name:'Cursor', tag:'AI Editor', stars:'—', desc:'VS Code fork with deeply integrated AI. Free tier available. Best AI autocomplete in the market.', tags:['Free Tier','AI-Powered','Cloud'] },
      { emoji:'💻', name:'OpenCode', tag:'Terminal Editor', stars:'8k', desc:'Open-source terminal AI coding agent. Claude, GPT-4, or local models. Apache 2.0.', tags:['Apache 2.0','Open Source','Terminal'] },
    ],
    faqs: [
      ['What is the best free AI code editor in 2026?', 'For VS Code users: Cline (29k stars, free, open-source) or Roo Code (18k stars) add powerful AI agents to your existing editor. For a standalone editor, Zed (52k stars) is GPU-accelerated, AI-native, and free. Cursor has a free tier with excellent AI autocomplete. All support local models via Ollama.'],
      ['How is an AI IDE different from GitHub Copilot?', 'Traditional AI copilots like GitHub Copilot do autocomplete. AI IDEs and agentic tools like Cline, Claude Code, and Roo Code go much further — they read your entire codebase, write multi-file changes, run commands, execute tests, browse the web, and complete entire features autonomously with minimal prompting.'],
      ['Can I use AI coding tools with local models for free?', 'Yes. Cline, Roo Code, Continue.dev, and Aider all support Ollama, allowing you to use Llama 3, Mistral, Qwen, and other local models 100% free. For best results, use a model with strong coding capabilities like DeepSeek Coder or Qwen2.5-Coder — both available free via Ollama.'],
    ]
  },
];

function tagClass(t) {
  if(t.includes('Free Tier')||t==='Free') return 'tag-free';
  if(t.includes('MIT')||t.includes('Apache')||t.includes('AGPLv')||t==='Open Source') return 'tag-open';
  if(t.includes('Self-Host')||t.includes('Local')) return 'tag-self';
  if(t.includes('AI')||t.includes('Agentic')) return 'tag-ai';
  return 'tag-open';
}

const CSS = `<style>
:root{--bg:#080B10;--bg2:#0D1117;--bg3:#111820;--surface:#141C26;--surface2:#1A2332;--border:#1E2D40;--border2:#243344;--text:#E8F0F8;--text2:#9BB0C8;--text3:#5A7A9A;--accent:#00D4FF;--green:#00FF88;--orange:#FF6B35;--yellow:#FFD60A;--font-display:'Syne',sans-serif;--font-mono:'Space Mono',monospace;--font-body:'DM Sans',sans-serif;--radius:8px;--radius2:12px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);line-height:1.6;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0}
nav{position:sticky;top:0;z-index:100;background:rgba(8,11,16,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 2rem}
.nav-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:2rem;height:60px}
.logo{font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--accent);text-decoration:none}
.logo span{color:var(--green)}
.nav-links{display:flex;align-items:center;gap:.25rem;list-style:none;margin-left:auto}
.nav-links a{color:var(--text2);text-decoration:none;font-size:.875rem;padding:.4rem .75rem;border-radius:var(--radius);transition:all .2s}
.nav-links a:hover{color:var(--text);background:var(--surface)}
.btn-submit{background:var(--accent);color:var(--bg)!important;font-weight:600!important;padding:.4rem 1rem!important;border-radius:var(--radius)}
.container{max-width:1400px;margin:0 auto;padding:0 2rem}
.page-hero{padding:3rem 2rem 2rem;position:relative;z-index:1}
.breadcrumb{display:flex;align-items:center;gap:.5rem;font-family:var(--font-mono);font-size:.75rem;color:var(--text3);margin-bottom:1.5rem}
.breadcrumb a{color:var(--text3);text-decoration:none}.breadcrumb a:hover{color:var(--accent)}
.page-hero h1{font-family:var(--font-display);font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-1px;margin-bottom:1rem}
.page-hero p{color:var(--text2);max-width:600px;line-height:1.7;margin-bottom:2rem}
.hero-meta{display:flex;gap:2rem;flex-wrap:wrap}
.meta-item{display:flex;align-items:center;gap:.5rem;font-family:var(--font-mono);font-size:.8rem;color:var(--text3)}
.meta-icon{color:var(--accent)}
.tools-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.25rem;margin-bottom:3rem}
.tool-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius2);padding:1.5rem;text-decoration:none;color:var(--text);display:flex;flex-direction:column;gap:1rem;transition:all .25s;position:relative;overflow:hidden}
.tool-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--green));transform:scaleX(0);transform-origin:left;transition:transform .3s}
.tool-card:hover{border-color:var(--border2);transform:translateY(-2px);box-shadow:0 8px 40px rgba(0,0,0,.4)}
.tool-card:hover::after{transform:scaleX(1)}
.tool-header{display:flex;align-items:center;gap:1rem}
.tool-logo{width:44px;height:44px;border-radius:var(--radius);background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.tool-name{font-family:var(--font-display);font-size:1rem;font-weight:700}
.tool-tagline{font-size:.8rem;color:var(--text3)}
.tool-stars{font-family:var(--font-mono);font-size:.75rem;color:var(--yellow)}
.tool-desc{font-size:.875rem;color:var(--text2);line-height:1.6;flex:1}
.tool-footer{display:flex;gap:.5rem;flex-wrap:wrap}
.tag{display:inline-flex;padding:.25rem .6rem;border-radius:100px;font-size:.72rem;font-family:var(--font-mono)}
.tag-free{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2)}
.tag-open{background:rgba(124,58,237,.1);color:#a78bfa;border:1px solid rgba(124,58,237,.2)}
.tag-self{background:rgba(0,212,255,.08);color:var(--accent);border:1px solid rgba(0,212,255,.2)}
.tag-ai{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2)}
.tq-banner{background:linear-gradient(135deg,rgba(0,212,255,.08),rgba(0,255,136,.05));border:1px solid rgba(0,212,255,.2);border-radius:16px;padding:2rem;margin:3rem 0;text-align:center}
.tq-banner h2{font-family:var(--font-display);font-size:1.6rem;font-weight:800;margin-bottom:.75rem}
.tq-banner p{color:var(--text2);max-width:500px;margin:0 auto 1.5rem;line-height:1.7}
.btn-primary{display:inline-flex;padding:.75rem 1.5rem;border-radius:var(--radius);background:var(--accent);color:var(--bg);font-weight:700;text-decoration:none;transition:all .2s}
.btn-primary:hover{background:#00b8d9}
.faq-section{margin-top:3rem;padding-top:3rem;border-top:1px solid var(--border)}
.faq-section h2{font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:1.5rem}
.faq-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-bottom:.75rem;cursor:pointer;transition:border-color .2s}
.faq-item.open,.faq-item:hover{border-color:var(--accent)}
.faq-q{font-family:var(--font-display);font-size:.95rem;font-weight:700;display:flex;justify-content:space-between;gap:1rem}
.faq-icon{color:var(--accent);font-size:1.2rem;flex-shrink:0;transition:transform .2s}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-a{font-size:.875rem;color:var(--text2);line-height:1.7;margin-top:.75rem;display:none}
.faq-item.open .faq-a{display:block}
footer{background:var(--bg2);border-top:1px solid var(--border);padding:2rem;margin-top:5rem}
.footer-bottom{max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8rem;color:var(--text3);font-family:var(--font-mono)}
.footer-bottom a{color:var(--accent);text-decoration:none}
@media(max-width:600px){.tools-grid{grid-template-columns:1fr}.page-hero{padding:2rem 1rem 1rem}}
</style>`;

function genPage(cat) {
  const toolsHtml = cat.tools.map(t => `
  <a href="/tools/${t.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}.html" class="tool-card">
    <div class="tool-header">
      <div class="tool-logo">${t.emoji}</div>
      <div style="flex:1"><div class="tool-name">${t.name}</div><div class="tool-tagline">${t.tag}</div></div>
      <div class="tool-stars">&#9733; ${t.stars}</div>
    </div>
    <div class="tool-desc">${t.desc}</div>
    <div class="tool-footer">${t.tags.map(tg=>`<span class="tag ${tagClass(tg)}">${tg}</span>`).join('')}</div>
  </a>`).join('');

  const faqSchema = JSON.stringify(cat.faqs.map(([q,a])=>({
    "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}
  })));

  const faqHtml = cat.faqs.map(([q,a])=>`
  <div class="faq-item" onclick="this.classList.toggle('open')">
    <div class="faq-q">${q}<span class="faq-icon">+</span></div>
    <div class="faq-a">${a}</div>
  </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${cat.count} Best Free ${cat.title} in 2026 | Freemium.Services</title>
<meta name="description" content="${cat.desc}">
<meta name="keywords" content="${cat.keywords}">
<link rel="canonical" href="${SITE}/category/${cat.id}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
  {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE}"},{"@type":"ListItem","position":2,"name":"${cat.title}","item":"${SITE}/category/${cat.id}"}]},
  {"@type":"CollectionPage","name":"${cat.count} Best Free ${cat.title} in 2026","description":"${cat.desc}","url":"${SITE}/category/${cat.id}"},
  {"@type":"FAQPage","mainEntity":${faqSchema}}
]}
<\/script>
${CSS}
</head>
<body>
<nav><div class="nav-inner">
  <a href="/" class="logo">freemium<span>.services</span></a>
  <ul class="nav-links">
    <li><a href="/category/ai-tools.html">AI Tools</a></li>
    <li><a href="/category/open-source.html">Open Source</a></li>
    <li><a href="/category/self-hosting.html">Self-Hosting</a></li>
    <li><a href="${TQ}" rel="noopener" style="color:var(--accent)">TurboQuant &#8599;</a></li>
    <li><a href="/submit.html" class="btn-submit">+ Submit Tool</a></li>
  </ul>
</div></nav>

<div class="page-hero container">
  <nav class="breadcrumb"><a href="/">Home</a><span>&rsaquo;</span><span>${cat.title}</span></nav>
  <h1>${cat.emoji} ${cat.count} Best Free ${cat.title} in 2026</h1>
  <p>${cat.desc}</p>
  <div class="hero-meta">
    <div class="meta-item"><span class="meta-icon">&#9679;</span>${cat.count} tools listed</div>
    <div class="meta-item"><span class="meta-icon">&#9679;</span>Updated daily</div>
    <div class="meta-item"><span class="meta-icon">&#9679;</span>All verified</div>
    <div class="meta-item"><span class="meta-icon">&#9679;</span>Self-host guides included</div>
  </div>
</div>

<main class="container" style="position:relative;z-index:1;padding-bottom:2rem">
  <div class="tools-grid">${toolsHtml}</div>

  <div class="tq-banner">
    <h2>Scale on <span style="color:var(--accent)">TurboQuant Network</span></h2>
    <p>Deploy your self-hosted ${cat.title.toLowerCase()} on decentralized DePIN edge compute. 10x cheaper than AWS with global distribution.</p>
    <a href="${TQ}" class="btn-primary" rel="noopener" target="_blank">Explore TurboQuant &rarr;</a>
  </div>

  <div class="faq-section">
    <h2>&#10067; ${cat.title} FAQ</h2>
    ${faqHtml}
  </div>
</main>

<footer><div class="footer-bottom">
  <span>&#169; 2026 <a href="/">freemium.services</a> &middot; Powered by <a href="${TQ}">TurboQuant Network</a></span>
  <span><a href="/category/ai-tools.html">AI Tools</a> &middot; <a href="/category/self-hosting.html">Self-Hosting</a> &middot; <a href="/category/open-source.html">Open Source</a></span>
</div></footer>
</body>
</html>`;
}

cats.forEach(cat => {
  const html = genPage(cat);
  const file = path.join(outDir, `${cat.id}.html`);
  fs.writeFileSync(file, html);
  console.log(`Generated: category/${cat.id}.html (${(html.length/1024).toFixed(1)}KB)`);
});
console.log(`\nDone! ${cats.length} category pages generated.`);
