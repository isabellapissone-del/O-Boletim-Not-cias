import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, X, User } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { name: 'Moçambique', slug: 'mocambique' },
  { name: 'Política', slug: 'politica' },
  { name: 'Economia', slug: 'economia' },
  { name: 'Sociedade', slug: 'sociedade' },
  { name: 'Desporto', slug: 'desporto' },
  { name: 'Cultura', slug: 'cultura' }
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto max-w-7xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 h-16 md:h-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-red-600">
                MOÇAMBIQUE<span className="text-neutral-900">AGORA</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-neutral-600">
              {categories.map((cat) => (
                <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="hover:text-red-600 transition">
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-neutral-100 rounded-full transition"
            >
              <Search size={22} />
            </button>
            <Link to="/admin" className="p-2 hover:bg-neutral-100 rounded-full transition">
              <User size={22} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute w-full bg-white border-b border-neutral-200 transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-screen border-t" : "max-h-0"
        )}>
          <nav className="flex flex-col p-4 gap-4 text-lg font-bold uppercase">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                to={`/categoria/${cat.slug}`} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-red-600 transition border-b border-neutral-50 pb-2"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full bg-white p-4 shadow-xl animate-in slide-in-from-top duration-300">
            <form onSubmit={handleSearch} className="flex items-center gap-4 max-w-4xl mx-auto">
              <Search className="text-neutral-400" size={24} />
              <input 
                autoFocus
                type="text" 
                placeholder="Pesquisar notícias..." 
                className="flex-grow py-2 text-xl outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full"
              >
                <X size={24} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
