import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { Article, Category } from '../types';
import { supabase } from '../lib/supabase';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: cat } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (cat) {
          setCategory(cat);
          const { data: arts } = await supabase
            .from('articles')
            .select('*, category:categories(name)')
            .eq('category_id', cat.id)
            .eq('status', 'published')
            .order('published_at', { ascending: false });
          
          if (arts) setArticles(arts as Article[]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="py-20 text-center font-bold">Carregando categoria...</div>;
  if (!category) return <div className="py-20 text-center font-bold">Categoria não encontrada.</div>;

  return (
    <div className="space-y-12">
      <SEO 
        title={category.name} 
        description={category.description || `Notícias sobre ${category.name} em Moçambique.`}
      />

      <header className="border-b-4 border-neutral-900 pb-4">
        <h1 className="text-5xl font-black tracking-tighter uppercase">{category.name}</h1>
        {category.description && (
          <p className="mt-4 text-neutral-500 font-medium max-w-2xl">{category.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} variant="medium" />
        ))}
        {articles.length === 0 && (
          <div className="col-span-full py-20 text-center text-neutral-400 italic">
            Ainda não existem notícias publicadas nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
};
