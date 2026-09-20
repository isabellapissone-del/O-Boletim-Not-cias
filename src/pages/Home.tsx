import React, { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { AdSlot } from '../components/AdSlot';
import { Article } from '../types';
import { supabase } from '../lib/supabase';

// Mock data for initial dev
const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Moçambique avança com novos projetos de infraestrutura sustentável em Maputo',
    slug: 'mocambique-novos-projetos-infraestrutura',
    summary: 'O governo anunciou hoje um pacote de investimentos focados na mobilidade urbana e resiliência climática para a capital moçambicana.',
    content: '...',
    status: 'published',
    is_featured: true,
    view_count: 1200,
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    is_urgent: false,
    featured_priority: 0,
    updated_at: new Date().toISOString(),
    category: { id: '1', name: 'Moçambique', slug: 'mocambique', order_index: 1 },
    author: { id: 'a1', name: 'Artur Magaia', slug: 'artur-magaia', role: 'editor' }
  },
  {
    id: '2',
    title: 'Política: Assembleia da República debate novas leis eleitorais para as próximas legislativas',
    slug: 'debate-leis-eleitorais-mocambique',
    summary: 'Sessão plenária marcada por intensos debates entre as principais bancadas parlamentares sobre a transparência do processo.',
    content: '...',
    status: 'published',
    is_featured: false,
    view_count: 800,
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    is_urgent: false,
    featured_priority: 0,
    updated_at: new Date().toISOString(),
    category: { id: '2', name: 'Política', slug: 'politica', order_index: 2 },
  },
  {
    id: '3',
    title: 'Economia: Preços do gás natural em Moçambique registam estabilidade no mercado global',
    slug: 'precos-gas-natural-estabilidade',
    summary: 'Relatório trimestral indica que a produção nacional continua a atrair investidores estrangeiros apesar da volatilidade regional.',
    content: '...',
    status: 'published',
    is_featured: false,
    view_count: 500,
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    is_urgent: false,
    featured_priority: 0,
    updated_at: new Date().toISOString(),
    category: { id: '3', name: 'Economia', slug: 'economia', order_index: 3 },
  }
];

export const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt to fetch from real Supabase if configured
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*, category:categories(*), author:authors(*)')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(10);
        
        if (data && data.length > 0) {
          setArticles(data as Article[]);
        }
      } catch (e) {
        console.log('Supabase not connected yet, using mock data.');
      }
    };
    
    fetchArticles();
  }, []);

  const featured = articles.find(a => a.is_featured) || articles[0];
  const others = articles.filter(a => a.id !== featured?.id);

  return (
    <div className="space-y-12">
      <SEO 
        title="O Seu Portal de Notícias" 
        description="Acompanhe as últimas notícias de Moçambique, política, economia, desporto e muito mais."
      />

      {/* Featured Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          {featured && <ArticleCard article={featured} variant="large" />}
        </div>
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-4 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Últimas Notícias
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
              {others.slice(0, 4).map(article => (
                <ArticleCard key={article.id} article={article} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdSlot type="home_top" />

      {/* Category Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {articles.slice(0, 8).map(article => (
          <ArticleCard key={article.id} article={article} variant="medium" />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Example Category Block */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-neutral-900 mb-8 pb-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Economia</h2>
              <button className="text-xs font-bold text-red-600 hover:underline">Ver tudo</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(0, 4).map(article => (
                <ArticleCard key={article.id} article={article} variant="medium" />
              ))}
            </div>
          </div>
        </div>
        
        <aside className="space-y-12">
          <AdSlot type="sidebar" />
          
          <div className="bg-neutral-900 text-white p-6 rounded-xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">Newsletter</h3>
            <p className="text-neutral-400 text-sm mb-6">Receba as notícias mais importantes diretamente no seu email.</p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="O seu email" 
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 outline-none focus:border-red-500"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition">
                Subscrever
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};
