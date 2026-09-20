import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, LayoutDashboard, FileText, Settings, Users, BarChart3 } from 'lucide-react';
import { Article } from '../types';
import { supabase } from '../lib/supabase';
import { formatDate } from '../lib/utils';

export const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    views: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // For demo purposes, we'll allow seeing the dashboard, but in real app redirect
        // navigate('/login');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from('articles')
          .select('*, category:categories(name)')
          .order('created_at', { ascending: false });
        
        if (data) {
          const arts = data as Article[];
          setArticles(arts);
          setStats({
            total: arts.length,
            published: arts.filter(a => a.status === 'published').length,
            drafts: arts.filter(a => a.status === 'draft').length,
            views: arts.reduce((acc, curr) => acc + (curr.view_count || 0), 0)
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchData();
  }, [navigate]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Admin Sidebar - Horizontal on mobile, vertical on desktop */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 bg-white p-2 md:p-4 rounded-xl border border-neutral-200 shadow-sm scrollbar-hide">
          <Link to="/admin" className="flex items-center gap-3 px-3 md:px-4 py-2 text-sm font-bold bg-red-50 text-red-600 rounded-lg whitespace-nowrap">
            <LayoutDashboard size={18} /> <span className="hidden sm:inline lg:inline">Dashboard</span>
          </Link>
          <Link to="/admin/editor" className="flex items-center gap-3 px-3 md:px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg transition whitespace-nowrap">
            <FileText size={18} /> <span className="hidden sm:inline lg:inline">Notícias</span>
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-3 px-3 md:px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg transition whitespace-nowrap">
            <Users size={18} /> <span className="hidden sm:inline lg:inline">Categorias</span>
          </Link>
          <Link to="/admin/authors" className="flex items-center gap-3 px-3 md:px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg transition whitespace-nowrap">
            <Users size={18} /> <span className="hidden sm:inline lg:inline">Autores</span>
          </Link>
          <div className="hidden lg:block border-t border-neutral-100 my-4 pt-4">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg transition">
              <Settings size={18} /> Configurações
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Painel Administrativo</h1>
            <p className="text-neutral-500">Gerencie o conteúdo do portal Moçambique Agora.</p>
          </div>
          <Link to="/admin/editor" className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-800 transition shadow-lg">
            <Plus size={18} /> Nova Notícia
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Notícias', value: stats.total, icon: FileText, color: 'text-blue-600' },
            { label: 'Publicadas', value: stats.published, icon: Eye, color: 'text-green-600' },
            { label: 'Rascunhos', value: stats.drafts, icon: Edit, color: 'text-amber-600' },
            { label: 'Visualizações', value: stats.views, icon: BarChart3, color: 'text-red-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Article Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="font-black uppercase tracking-tight">Notícias Recentes</h3>
            <div className="text-xs text-neutral-500">Mostrando {articles.length} resultados</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Título</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Categoria</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Data</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-neutral-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm line-clamp-1">{article.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold bg-neutral-100 px-2 py-1 rounded">
                        {article.category?.name || 'Sem categoria'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                        article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-neutral-500">
                      {formatDate(article.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link to={`/admin/editor/${article.id}`} className="inline-block p-2 hover:text-red-600 transition">
                        <Edit size={16} />
                      </Link>
                      <button className="p-2 hover:text-red-600 transition">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-400 italic">
                      Nenhuma notícia encontrada. Comece a criar agora!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
