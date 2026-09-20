import React from 'react';
import { SEO } from '../components/SEO';

export const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral prose-lg">
      <SEO title="Termos de Uso" />
      <h1>Termos de Uso</h1>
      <p className="text-neutral-500">Última atualização: 20 de Setembro de 2026</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>Ao aceder ao portal <strong>Moçambique Agora</strong>, o utilizador concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>

      <h2>2. Licença de Uso</h2>
      <p>É concedida permissão para descarregar temporariamente uma cópia dos materiais (informações ou software) no site Moçambique Agora, apenas para visualização transitória pessoal e não comercial.</p>
      <p>Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
      <ul>
        <li>Modificar ou copiar os materiais;</li>
        <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
        <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
        <li>Remover quaisquer direitos de autor ou outras notações de propriedade dos materiais.</li>
      </ul>

      <h2>3. Isenção de Responsabilidade</h2>
      <p>Os materiais no site do Moçambique Agora são fornecidos 'como estão'. O portal não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.</p>

      <h2>4. Limitações</h2>
      <p>Em nenhum caso o Moçambique Agora ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais.</p>
    </div>
  );
};
