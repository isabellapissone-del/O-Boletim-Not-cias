import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini lazily
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    genAI = new GoogleGenAI({ 
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return genAI;
}

// Initialize Supabase Admin lazily
let supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    supabaseAdmin = createClient(url, key);
  }
  return supabaseAdmin;
}

app.use(express.json());

// --- API ROUTES ---

// AI Assistant: Generate editorial suggestions
app.post('/api/ai/suggest', async (req, res) => {
  const { type, content } = req.body;
  
  try {
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({ error: 'AI Service not configured' });
    }

    let prompt = '';
    
    if (type === 'seo') {
      prompt = `Como um editor sênior de notícias moçambicano, sugira um título SEO (máx 60 chars) e uma meta descrição SEO (máx 160 chars) para o seguinte artigo:\n\n${content}`;
    } else if (type === 'summary') {
      prompt = `Resuma o seguinte artigo de notícias em um parágrafo conciso e atraente para a homepage:\n\n${content}`;
    } else if (type === 'tags') {
      prompt = `Sugira 5 tags relevantes para este artigo de notícias moçambicano:\n\n${content}`;
    }

    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt
    });
    res.json({ suggestion: result.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to generate suggestion' });
  }
});

// RSS Feed
app.get('/rss.xml', async (req, res) => {
  try {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return res.status(200).header('Content-Type', 'application/xml').send('<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Moçambique Agora</title><description>Supabase not configured</description></channel></rss>');
    }

    const { data: articles } = await admin
      .from('articles')
      .select('title, slug, summary, published_at, categories(name)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Moçambique Agora</title>
  <link>${siteUrl}</link>
  <description>Últimas notícias de Moçambique e do mundo</description>
  <language>pt-mz</language>`;

    if (articles) {
      for (const article of (articles as any[])) {
        const categoryName = article.categories?.name;

        rss += `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${siteUrl}/noticia/${article.slug}</link>
    <description><![CDATA[${article.summary}]]></description>
    <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
    <category>${categoryName || 'Geral'}</category>
  </item>`;
      }
    }

    rss += `
</channel>
</rss>`;

    res.header('Content-Type', 'application/xml');
    res.send(rss);
  } catch (error) {
    res.status(500).send('Error generating RSS');
  }
});

// Sitemap
app.get('/sitemap.xml', async (req, res) => {
  try {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return res.status(200).header('Content-Type', 'application/xml').send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
    }

    const { data: articles } = await admin
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><changefreq>always</changefreq><priority>1.0</priority></url>`;

    if (articles) {
      for (const article of (articles as any[])) {
        sitemap += `
  <url>
    <loc>${siteUrl}/noticia/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    }

    sitemap += `\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`);
});

// --- VITE MIDDLEWARE ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
