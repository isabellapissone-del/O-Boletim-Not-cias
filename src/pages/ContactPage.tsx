import React from 'react';
import { SEO } from '../components/SEO';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <SEO title="Contactos" description="Entre em contacto com a redação do Moçambique Agora." />
      
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Contactos</h1>
        <p className="text-neutral-500 text-xl max-w-2xl mx-auto">
          Tem uma denúncia, sugestão ou quer anunciar connosco? Estamos à sua disposição.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">Informação de Contacto</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Mail size={24} /></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Email Geral</p>
                  <p className="font-bold text-lg">geral@mocambiqueagora.co.mz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Phone size={24} /></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Telefone</p>
                  <p className="font-bold text-lg">+258 84 000 0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl"><MapPin size={24} /></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Escritório</p>
                  <p className="font-bold text-lg">Av. Julius Nyerere, Maputo, Moçambique</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">Publicidade</h3>
            <p className="text-neutral-400 mb-6">Para parcerias comerciais e anúncios no portal, contacte o nosso departamento comercial.</p>
            <a href="mailto:comercial@mocambiqueagora.co.mz" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition">
              Solicitar Media Kit
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Envie uma Mensagem</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Nome</label>
                <input type="text" className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:border-red-500" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Email</label>
                <input type="email" className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:border-red-500" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Assunto</label>
              <select className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:border-red-500">
                <option>Redação / Sugestão de Pauta</option>
                <option>Denúncia Escrita</option>
                <option>Comercial / Anúncios</option>
                <option>Suporte Técnico</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Mensagem</label>
              <textarea rows={6} className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:border-red-500" placeholder="Escreva a sua mensagem aqui..."></textarea>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 rounded-xl transition flex items-center justify-center gap-2">
              <Send size={18} /> Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
