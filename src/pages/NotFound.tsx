import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="py-20 text-center space-y-6">
      <h1 className="text-9xl font-black text-neutral-200">404</h1>
      <h2 className="text-3xl font-black tracking-tight">Página não encontrada</h2>
      <p className="text-neutral-500 max-w-md mx-auto">A notícia ou página que procura pode ter sido removida ou o endereço está incorreto.</p>
      <Link 
        to="/" 
        className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg"
      >
        Voltar à Página Inicial
      </Link>
    </div>
  );
};
