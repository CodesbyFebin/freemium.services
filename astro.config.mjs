import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Create redirects object from the mapping
const redirects = {
  // Homepage redirect
  '/index.html': '/',
  
  // Knowledge hub
  '/knowledge-hub.html': '/knowledge-hub/',
  
  // Categories
  '/category/ai-tools.html': '/categories/ai-tools/',
  '/category/automation-tools.html': '/categories/automation-tools/',
  '/category/self-hosting.html': '/categories/self-hosting/',
  '/category/rag-tools.html': '/categories/rag-tools/',
  '/category/ai-agents.html': '/categories/ai-agents/',
  '/category/developer-tools.html': '/categories/developer-tools/',
  '/category/vector-databases.html': '/categories/vector-databases/',
  '/category/cli-tools.html': '/categories/cli-tools/',
  '/category/assistants.html': '/categories/assistants/',
  '/category/open-source.html': '/categories/open-source/',
  
  // Tools
  '/tools/n8n.html': '/tools/n8n/',
  '/tools/ollama.html': '/tools/ollama/',
  '/tools/dify.html': '/tools/dify/',
  '/tools/langflow.html': '/tools/langflow/',
  '/tools/open-webui.html': '/tools/open-webui/',
  '/tools/activepieces.html': '/tools/activepieces/',
  '/tools/windmill.html': '/tools/windmill/',
  '/tools/coolify.html': '/tools/coolify/',
  '/tools/qdrant.html': '/tools/qdrant/',
  '/tools/ripgrep.html': '/tools/ripgrep/',
  '/tools/supabase.html': '/tools/supabase/',
  '/tools/auto-gpt.html': '/tools/auto-gpt/',
};

export default defineConfig({
  site: 'https://freemium.services',
  integrations: [react(), mdx()],
  redirects: redirects,
  compress: true,
  vite: {
    server: {
      fs: {
        allow: ['./data', './content']
      }
    }
  }
});