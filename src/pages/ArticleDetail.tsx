import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Clock, User, ChevronRight, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { Article } from '../types';
import { formatDate } from '../lib/utils';
import { supabase } from '../lib/supabase';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*, category:categories(*), author:authors(*)')
          .eq('slug', slug)
          .single();
        
        if (data) {
          setArticle(data as Article);
          
          // Increment views
          await supabase.rpc('increment_view_count', { article_id: data.id });
        }
      } catch (e) {
        console.error('Error fetching article:', e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="py-20 text-center font-bold">Carregando notícia...</div>;
  if (!article) return <div className="py-20 text-center font-bold">Notícia não encontrada.</div>;

  return (
    <article className="max-w-4xl mx-auto">
      <SEO 
        title={article.title}
        description={article.summary}
        image={article.main_image_url}
        type="article"
        article={{
          publishedTime: article.published_at || article.created_at,
          modifiedTime: article.updated_at,
          author: article.author?.name,
          category: article.category?.name
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-8">
        <Link to="/" className="hover:text-red-600">Início</Link>
        <ChevronRight size={12} />
        <Link to={`/categoria/${article.category?.slug}`} className="hover:text-red-600">
          {article.category?.name}
        </Link>
      </nav>

      <header className="mb-6 md:mb-10">
        <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6">
          {article.category?.name}
        </span>
        <h1 className="text-2xl md:text-5xl font-black leading-tight mb-4 md:mb-8">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-lg md:text-2xl text-neutral-500 font-medium mb-6 md:mb-10 leading-relaxed">
            {article.subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-neutral-200">
          <div className="flex items-center gap-4">
            {article.author?.photo_url && (
              <img src={article.author.photo_url} className="w-10 h-10 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
            )}
            <div>
              <div className="text-sm font-black uppercase tracking-tighter">
                Por <Link to={`/autor/${article.author?.slug}`} className="hover:text-red-600 transition">{article.author?.name || 'Redação'}</Link>
              </div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> {formatDate(article.published_at || article.created_at)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-100 transition"><Share2 size={18} /></button>
            <button className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-100 transition"><MessageSquare size={18} /></button>
          </div>
        </div>
      </header>

      {article.main_image_url && (
        <figure className="mb-8 md:mb-12">
          <div className="aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
            <img src={article.main_image_url} alt={article.image_caption || article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          {(article.image_caption || article.image_credit) && (
            <figcaption className="mt-4 text-xs md:text-sm text-neutral-500 italic flex flex-col sm:flex-row sm:justify-between gap-2">
              <span>{article.image_caption}</span>
              {article.image_credit && <span className="font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Crédito: {article.image_credit}</span>}
            </figcaption>
          )}
        </figure>
      )}

      <div className="prose prose-neutral prose-lg max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      <AdSlot type="in_article" />

      <footer className="mt-16 pt-8 border-t border-neutral-200">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Notícias Relacionadas</h3>
        {/* Related news would go here */}
      </footer>
    </article>
  );
};
