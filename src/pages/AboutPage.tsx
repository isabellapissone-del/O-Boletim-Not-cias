import React from 'react';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral prose-lg">
      <SEO title="Sobre Nós" description="Saiba mais sobre a missão e a equipa do Moçambique Agora." />
      <h1 className="text-5xl font-black tracking-tighter mb-8">Sobre Nós</h1>
      
      <p className="lead">
        O <strong>Moçambique Agora</strong> é um portal de notícias independente, focado em fornecer informação de qualidade, rigorosa e oportuna sobre a realidade moçambicana e internacional.
      </p>

      <h2>Nossa Missão</h2>
      <p>
        Nossa missão é informar com integridade, promovendo a transparência e o debate democrático em Moçambique. Acreditamos que uma sociedade informada é uma sociedade mais forte.
      </p>

      <h2>Cobertura</h2>
      <p>
        Cobrimos todo o território nacional, desde as dinâmicas urbanas de Maputo até às realidades das províncias mais remotas. Nossos editoriais abrangem política, economia, desporto, cultura e tecnologia.
      </p>

      <h2>Independência Editorial</h2>
      <p>
        Mantemos uma linha editorial estritamente independente de interesses políticos ou económicos particulares. Nosso compromisso é, em primeiro lugar, com o leitor e com a verdade dos factos.
      </p>

      <div className="bg-red-50 p-8 rounded-2xl border border-red-100 not-prose my-12">
        <h3 className="text-xl font-black uppercase tracking-tight text-red-600 mb-4">Compromisso com Moçambique</h3>
        <p className="text-neutral-700 font-medium">
          Estamos empenhados em elevar o padrão do jornalismo digital no país, utilizando tecnologias modernas para garantir que a notícia chegue a todos, em qualquer dispositivo, a qualquer momento.
        </p>
      </div>
    </div>
  );
};
