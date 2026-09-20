import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-8 border-t-4 border-red-600">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter text-red-500">
                MOÇAMBIQUE<span className="text-white">AGORA</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              O seu portal de notícias de referência em Moçambique. Informação rigorosa, independente e atualizada 24 horas por dia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Categorias</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/categoria/mocambique" className="hover:text-red-500 transition">Moçambique</Link></li>
              <li><Link to="/categoria/politica" className="hover:text-red-500 transition">Política</Link></li>
              <li><Link to="/categoria/economia" className="hover:text-red-500 transition">Economia</Link></li>
              <li><Link to="/categoria/desporto" className="hover:text-red-500 transition">Desporto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Institucional</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/sobre" className="hover:text-red-500 transition">Sobre Nós</Link></li>
              <li><Link to="/politica-editorial" className="hover:text-red-500 transition">Política Editorial</Link></li>
              <li><Link to="/contactos" className="hover:text-red-500 transition">Contactos</Link></li>
              <li><Link to="/privacidade" className="hover:text-red-500 transition">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-red-500 transition">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Siga-nos</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-red-600 transition text-white"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-red-600 transition text-white"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-red-600 transition text-white"><Instagram size={20} /></a>
            </div>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex items-center gap-2"><Mail size={16} /> geral@mocambiqueagora.co.mz</div>
              <div className="flex items-center gap-2"><Phone size={16} /> +258 84 000 0000</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> Maputo, Moçambique</div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Moçambique Agora. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/rss.xml">RSS Feed</Link>
            <Link to="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
