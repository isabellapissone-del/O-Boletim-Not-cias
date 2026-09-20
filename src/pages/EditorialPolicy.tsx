import React from 'react';
import { SEO } from '../components/SEO';

export const EditorialPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral prose-lg">
      <SEO title="Política Editorial" />
      <h1 className="text-5xl font-black tracking-tighter mb-8">Política Editorial</h1>
      
      <p className="lead">
        A <strong>Política Editorial</strong> do Moçambique Agora rege a nossa conduta jornalística e o nosso compromisso com a verdade e a transparência.
      </p>

      <h2>1. Independência</h2>
      <p>A nossa redação opera com total independência. Não aceitamos diretrizes de governos, partidos políticos, grupos de pressão ou anunciantes que possam comprometer a integridade da nossa informação.</p>

      <h2>2. Verificação de Factos</h2>
      <p>Toda a informação publicada passa por um rigoroso processo de verificação. Utilizamos múltiplas fontes e, sempre que possível, fontes primárias e documentos oficiais.</p>

      <h2>3. Uso de Inteligência Artificial</h2>
      <p>Utilizamos ferramentas de IA como apoio à produtividade editorial (resumos, sugestões de títulos, otimização SEO). No entanto, <strong>nenhuma notícia é produzida ou publicada exclusivamente por IA</strong> sem a revisão, verificação e aprovação de um editor humano.</p>

      <h2>4. Correções e Erratas</h2>
      <p>Reconhecemos os nossos erros. Quando uma falha é detetada, publicamos a respetiva correção de forma clara e transparente no próprio artigo, indicando o que foi alterado e porquê.</p>

      <h2>5. Plágio</h2>
      <p>O plágio é estritamente proibido. Todas as citações e informações provenientes de terceiros são devidamente creditadas.</p>
    </div>
  );
};
