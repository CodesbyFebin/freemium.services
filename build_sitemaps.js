const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const SITE_URL = 'https://freemium.services';
const DATE = '2026-04-10';

function writeXML(filename, content) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
    fs.writeFileSync(path.join(publicDir, filename), header + content);
    console.log(`Generated: ${filename}`);
}

// 1. Core
writeXML('sitemap-core.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/</loc><lastmod>${DATE}</lastmod><priority>1.0</priority></url>
    <url><loc>${SITE_URL}/docs.html</loc><lastmod>${DATE}</lastmod><priority>0.95</priority></url>
    <url><loc>${SITE_URL}/blog.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/quickstart.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/self-hosting-guide.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/compare-tools.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/api-docs.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/changelog.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/submit-tool.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/depin-guide.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/tq-integration.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/rss-feed.html</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
</urlset>`);

// 2. Categories
const categories = ['ai-tools', 'open-source', 'self-hosting', 'automation-tools', 'ai-agents', 'developer-tools', 'rag-tools', 'vector-databases', 'cli-tools', 'ides'];
writeXML('sitemap-categories.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${categories.map(c => `<url><loc>${SITE_URL}/category/${c}.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>`).join('')}
</urlset>`);

// 3. Tools
const tools = ['n8n', 'ollama', 'dify', 'qdrant', 'claude-code', 'cline', 'activepieces', 'open-webui', 'marimo', 'langflow', 'onyx', 'goose', 'roo-code', 'windmill', 'pipedream', 'milvus', 'weaviate', 'pgvector', 'aider', 'autogpt', 'chroma', 'coolify', 'focalboard', 'fzf', 'haystack', 'langchain', 'lazygit', 'linear', 'llamaindex', 'meilisearch', 'metabase', 'monica', 'plane', 'prefect', 'redis', 'ripgrep', 'supabase', 'twenty', 'zed'];
writeXML('sitemap-tools.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${tools.map(t => `<url><loc>${SITE_URL}/tools/${t}.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>`).join('')}
</urlset>`);

// 4. Knowledge
writeXML('sitemap-knowledge.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/embeddings.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
    <url><loc>${SITE_URL}/streaming.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
    <url><loc>${SITE_URL}/tool-calling.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
    <url><loc>${SITE_URL}/structured-outputs.html</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
</urlset>`);

// 5. Comparisons
writeXML('sitemap-comparisons.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/compare-tools.html#n8n-vs-activepieces</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
    <url><loc>${SITE_URL}/compare-tools.html#qdrant-vs-milvus</loc><lastmod>${DATE}</lastmod><priority>0.85</priority></url>
</urlset>`);

// 6. Blog
writeXML('sitemap-blog.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/blog/n8n-vs-activepieces</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/blog/ollama-self-hosting-guide</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/blog/qdrant-milvus-comparison</loc><lastmod>${DATE}</lastmod><priority>0.9</priority></url>
</urlset>`);

// 7. Features
writeXML('sitemap-features.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/ai-kanban.html</loc><lastmod>${DATE}</lastmod><priority>0.8</priority></url>
    <url><loc>${SITE_URL}/assistants.html</loc><lastmod>${DATE}</lastmod><priority>0.8</priority></url>
    <url><loc>${SITE_URL}/coding.html</loc><lastmod>${DATE}</lastmod><priority>0.8</priority></url>
</urlset>`);

// 8. News
writeXML('sitemap-news.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    <url><loc>${SITE_URL}/blog/n8n-vs-activepieces</loc><news:news><news:publication><news:name>Freemium Services</news:name><news:language>en</news:language></news:publication><news:publication_date>${DATE}</news:publication_date><news:title>n8n vs ActivePieces 2026 Comparison</news:title></news:news></url>
</urlset>`);

// 9. Images
writeXML('sitemap-images.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url><loc>${SITE_URL}/</loc><image:image><image:loc>${SITE_URL}/images/hero.webp</image:loc></image:image></url>
</urlset>`);

// Multi-lingual generic setups
writeXML('sitemap-hi.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url><loc>${SITE_URL}/hi/</loc><xhtml:link rel="alternate" hreflang="hi" href="${SITE_URL}/hi/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/></url>
</urlset>`);

writeXML('sitemap-ta.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url><loc>${SITE_URL}/ta/</loc><xhtml:link rel="alternate" hreflang="ta" href="${SITE_URL}/ta/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/></url>
</urlset>`);

writeXML('sitemap-ml.xml', `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url><loc>${SITE_URL}/ml/</loc><xhtml:link rel="alternate" hreflang="ml" href="${SITE_URL}/ml/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/></url>
</urlset>`);

// Finally, GENERATE THE MASTER INDEX
const masterIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>${SITE_URL}/sitemap-core.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-categories.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-tools.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-knowledge.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-comparisons.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-blog.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-features.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-news.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-images.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-hi.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-ta.xml</loc><lastmod>${DATE}</lastmod></sitemap>
    <sitemap><loc>${SITE_URL}/sitemap-ml.xml</loc><lastmod>${DATE}</lastmod></sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), masterIndex);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), masterIndex); // Main fallback map
console.log('Generated: sitemap-index.xml and sitemap.xml');
