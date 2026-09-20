import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    category?: string;
  };
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  article
}) => {
  const siteName = 'Moçambique Agora';
  const fullTitle = `${title} | ${siteName}`;
  const defaultDescription = 'Portal de notícias profissional de Moçambique.';
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const fullUrl = url ? `${siteUrl}${url}` : window.location.href;

  useEffect(() => {
    document.title = fullTitle;
    
    // Simple meta tag management
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description || defaultDescription);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description || defaultDescription, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', fullUrl, true);
    if (image) updateMeta('og:image', image, true);

    // Schema.org Structured Data
    let schema: any = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "NewsArticle" : "WebSite",
      "name": siteName,
      "url": siteUrl,
    };

    if (type === 'article' && article) {
      schema = {
        ...schema,
        "headline": title,
        "description": description,
        "image": image,
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime,
        "author": {
          "@type": "Person",
          "name": article.author
        }
      };
    }

    const scriptId = 'schema-data';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

  }, [title, description, image, fullUrl, type, article]);

  return null;
};
