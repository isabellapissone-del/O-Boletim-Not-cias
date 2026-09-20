import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { formatDate, cn } from '../lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small' | 'list';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'medium' }) => {
  if (variant === 'large') {
    return (
      <Link to={`/noticia/${article.slug}`} className="group block relative overflow-hidden rounded-xl bg-neutral-900 text-white shadow-2xl">
        <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
          <img 
            src={article.main_image_url || `https://picsum.photos/seed/${article.id}/800/450`} 
            alt={article.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-70 md:opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4 md:p-10">
          <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-red-600 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-4 w-fit">
            {article.category?.name || 'Geral'}
          </span>
          <h2 className="text-xl md:text-4xl lg:text-5xl font-black leading-tight mb-2 md:mb-4 group-hover:text-red-400 transition line-clamp-3 md:line-clamp-none">
            {article.title}
          </h2>
          <p className="text-neutral-300 text-xs md:text-lg line-clamp-2 max-w-2xl mb-3 md:mb-4 font-medium hidden sm:block">
            {article.summary}
          </p>
          <div className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-tighter">
            Por {article.author?.name || 'Redação'} • {formatDate(article.published_at || article.created_at)}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link to={`/noticia/${article.slug}`} className="group flex gap-3 md:gap-4 border-b border-neutral-100 pb-4 mb-4 items-start">
        <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={article.main_image_url || `https://picsum.photos/seed/${article.id}/300/300`} 
            alt={article.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-0.5 md:mb-1 block">
            {article.category?.name || 'Geral'}
          </span>
          <h3 className="text-sm md:text-lg font-black leading-snug group-hover:text-red-600 transition line-clamp-3">
            {article.title}
          </h3>
          <div className="text-[9px] md:text-[10px] text-neutral-500 font-bold uppercase tracking-tighter mt-1 md:mt-2">
            {formatDate(article.published_at || article.created_at)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/noticia/${article.slug}`} className="group block">
      <div className="aspect-[3/2] overflow-hidden rounded-xl mb-4 bg-neutral-200">
        <img 
          src={article.main_image_url || `https://picsum.photos/seed/${article.id}/600/400`} 
          alt={article.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-red-600 mb-2 block">
        {article.category?.name || 'Geral'}
      </span>
      <h3 className={cn(
        "font-black leading-tight group-hover:text-red-600 transition line-clamp-3",
        variant === 'medium' ? "text-xl" : "text-base"
      )}>
        {article.title}
      </h3>
      {variant === 'medium' && (
        <p className="text-neutral-500 text-sm mt-3 line-clamp-2">
          {article.summary}
        </p>
      )}
      <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter mt-3">
        {formatDate(article.published_at || article.created_at)}
      </div>
    </Link>
  );
};
