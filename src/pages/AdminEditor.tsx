import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, Sparkles, Image as ImageIcon, ChevronLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Article, Category, Author } from '../types';
import { slugify } from '../lib/utils';

export const AdminEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  
  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    slug: '',
    subtitle: '',
    summary: '',
    content: '',
    status: 'draft',
    is_featured: false,
    category_id: '',
    author_id: ''
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      const { data: cats } = await supabase.from('categories').select('*').order('name');
      const { data: auths } = await supabase.from('authors').select('*').order('name');
      if (cats) setCategories(cats);
      if (auths) setAuthors(auths);

      if (id) {
        const { data } = await supabase.from('articles').select('*').eq('id', id).single();
        if (data) setArticle(data);
      }
    };
    fetchMetadata();
  }, [id]);

  const handleSave = async (statusOverride?: Article['status']) => {
    setLoading(true);
    const payload = { ...article, status: statusOverride || article.status, updated_at: new Date().toISOString() };
    
    try {
      if (id) {
        await supabase.from('articles').update(payload).eq('id', id);
      } else {
        await supabase.from('articles').insert([{ ...payload, created_at: new Date().toISOString() }]);
      }
      navigate('/admin');
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar notícia');
    } finally {
      setLoading(false);
    }
  };

  const handleAiSuggest = async (type: 'seo' | 'summary' | 'tags') => {
    if (!article.content) return alert('Adicione conteúdo primeiro para a IA analisar');
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content: article.content })
      });
      const data = await res.json();
      
      if (type === 'summary') {
        setArticle(prev => ({ ...prev, summary: data.suggestion }));
      } else {
        alert(`Sugestão da IA:\n\n${data.suggestion}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-neutral-200 rounded-full transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-black">{id ? 'Editar Notícia' : 'Nova Notícia'}</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="px-4 py-2 text-sm font-bold border border-neutral-300 rounded-lg hover:bg-neutral-100 transition flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Salvar Rascunho
          </button>
          <button 
            onClick={() => handleSave('published')}
            disabled={loading}
            className="px-6 py-2 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg"
          >
            Publicar Agora
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Título Principal</label>
              <input 
                type="text" 
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value, slug: slugify(e.target.value) })}
                className="w-full text-2xl font-bold border-b border-neutral-100 focus:border-red-600 outline-none pb-2"
                placeholder="Introduza o título da notícia..."
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Subtítulo (Opcional)</label>
              <input 
                type="text" 
                value={article.subtitle}
                onChange={(e) => setArticle({ ...article, subtitle: e.target.value })}
                className="w-full text-lg border-b border-neutral-100 focus:border-red-600 outline-none pb-2 text-neutral-600"
                placeholder="Uma breve frase de apoio ao título..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500">Resumo / Lead</label>
                <button 
                  onClick={() => handleAiSuggest('summary')}
                  disabled={aiLoading}
                  className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1 hover:underline disabled:opacity-50"
                >
                  {aiLoading ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />} Sugerir com IA
                </button>
              </div>
              <textarea 
                rows={3}
                value={article.summary}
                onChange={(e) => setArticle({ ...article, summary: e.target.value })}
                className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-lg outline-none focus:border-red-600"
                placeholder="Resumo que aparecerá na homepage..."
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Conteúdo (Markdown)</label>
              <textarea 
                rows={20}
                value={article.content}
                onChange={(e) => setArticle({ ...article, content: e.target.value })}
                className="w-full p-4 font-mono text-sm border border-neutral-100 rounded-lg outline-none focus:border-red-600 min-h-[500px]"
                placeholder="Escreva a notícia aqui... Use Markdown para formatação."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-black uppercase tracking-tighter border-b border-neutral-100 pb-2">Configurações</h3>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Categoria</label>
              <select 
                value={article.category_id}
                onChange={(e) => setArticle({ ...article, category_id: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-100 rounded-lg outline-none"
              >
                <option value="">Selecionar Categoria</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Autor</label>
              <select 
                value={article.author_id}
                onChange={(e) => setArticle({ ...article, author_id: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-100 rounded-lg outline-none"
              >
                <option value="">Selecionar Autor</option>
                {authors.map(auth => <option key={auth.id} value={auth.id}>{auth.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Imagem Principal (URL)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={article.main_image_url}
                  onChange={(e) => setArticle({ ...article, main_image_url: e.target.value })}
                  className="flex-grow p-2 bg-neutral-50 border border-neutral-100 rounded-lg outline-none text-xs"
                  placeholder="https://..."
                />
                <button className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition"><ImageIcon size={18} /></button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                id="is_featured"
                checked={article.is_featured}
                onChange={(e) => setArticle({ ...article, is_featured: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-300 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="is_featured" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Notícia em Destaque</label>
            </div>
          </div>

          <div className="bg-neutral-900 text-white p-6 rounded-xl space-y-4">
            <h3 className="font-black uppercase tracking-tighter flex items-center gap-2">
              <Sparkles size={18} className="text-red-500" /> SEO Assistant
            </h3>
            <p className="text-[10px] text-neutral-400 font-medium">Use a inteligência artificial para otimizar a sua notícia para os motores de busca.</p>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleAiSuggest('seo')}
                className="text-[10px] font-black uppercase tracking-widest p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition"
              >
                Gerar Title & Meta
              </button>
              <button 
                onClick={() => handleAiSuggest('tags')}
                className="text-[10px] font-black uppercase tracking-widest p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition"
              >
                Sugerir Tags
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
