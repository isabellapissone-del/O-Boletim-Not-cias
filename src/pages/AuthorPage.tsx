import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { Article, Author } from '../types';
import { supabase } from '../lib/supabase';
import { Mail, Globe, Twitter, Facebook } from 'lucide-react';

export const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: authData } = await supabase
          .from('authors')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (authData) {
          setAuthor(authData);
          const { data: artsData } = await supabase
            .from('articles')
            .select('*, category:categories(name)')
            .eq('author_id', authData.id)
            .eq('status', 'published')
            .order('published_at', { ascending: false });
          
          if (artsData) setArticles(artsData as Article[]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="py-20 text-center font-bold">Carregando perfil...</div>;
  if (!author) return <div className="py-20 text-center font-bold">Autor não encontrado.</div>;

  return (
    <div className="space-y-12">
      <SEO 
        title={author.name} 
        description={author.bio || `Artigos publicados por ${author.name} no Moçambique Agora.`}
      />

      <header className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-red-50">
          <img 
            src={author.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.slug}`} 
            alt={author.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">{author.name}</h1>
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mt-1">{author.role}</p>
          </div>
          {author.bio && (
            <p className="text-neutral-600 max-w-2xl leading-relaxed">{author.bio}</p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            {author.email_internal && (
              <a href={`mailto:${author.email_internal}`} className="p-2 bg-neutral-100 rounded-full hover:bg-red-100 hover:text-red-600 transition">
                <Mail size={18} />
              </a>
            )}
            {author.social_links?.twitter && (
              <a href={author.social_links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition">
                <Twitter size={18} />
              </a>
            )}
            {author.social_links?.facebook && (
              <a href={author.social_links.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-100 rounded-full hover:bg-blue-50 hover:text-blue-800 transition">
                <Facebook size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between border-b-2 border-neutral-900 mb-8 pb-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Artigos Publicados</h2>
          <span className="text-xs font-bold text-neutral-400">{articles.length} notícias</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} variant="medium" />
          ))}
          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center text-neutral-400 italic">
              Este autor ainda não possui notícias publicadas.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
