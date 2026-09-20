import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { Article } from '../types';
import { supabase } from '../lib/supabase';
import { Search as SearchIcon } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const { data } = await supabase
          .from('articles')
          .select('*, category:categories(name)')
          .or(`title.ilike.%${query}%,summary.ilike.%${query}%,content.ilike.%${query}%`)
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        
        if (data) setArticles(data as Article[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [query]);

  return (
    <div className="space-y-12">
      <SEO title={`Pesquisa: ${query}`} />

      <header className="border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-4 text-neutral-400 mb-4">
          <SearchIcon size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Resultados da pesquisa</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight">
          Mostrando resultados para <span className="text-red-600">"{query}"</span>
        </h1>
      </header>

      {loading ? (
        <div className="py-20 text-center font-bold">Pesquisando notícias...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} variant="medium" />
          ))}
          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-neutral-500 font-medium">Nenhuma notícia encontrada para os termos pesquisados.</p>
              <p className="text-sm text-neutral-400 mt-2">Tente termos mais genéricos ou verifique a ortografia.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
