import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral prose-lg">
      <SEO title="Política de Privacidade" />
      <h1>Política de Privacidade</h1>
      <p className="text-neutral-500">Última atualização: 20 de Setembro de 2026</p>
      
      <p>No <strong>Moçambique Agora</strong>, a privacidade dos nossos visitantes é de extrema importância. Este documento descreve os tipos de informações pessoais que recebemos e recolhemos e como são utilizadas.</p>

      <h2>Recolha de Dados</h2>
      <p>Recolhemos informações quando se regista no nosso site, subscreve a nossa newsletter ou preenche um formulário de contacto. Os dados recolhidos podem incluir o seu nome e endereço de email.</p>

      <h2>Cookies e Web Beacons</h2>
      <p>Utilizamos cookies para armazenar informações sobre as preferências dos visitantes, registar informações específicas do utilizador sobre quais as páginas que o utilizador acede ou visita, e personalizar o conteúdo da página com base no tipo de navegador ou outras informações que o visitante envia através do seu navegador.</p>

      <h2>Google AdSense</h2>
      <p>Como fornecedor de terceiros, o Google utiliza cookies para exibir anúncios no nosso site. O uso do cookie DART pelo Google permite-lhe exibir anúncios aos utilizadores com base na sua visita ao nosso site e a outros sites na Internet.</p>

      <h2>Segurança</h2>
      <p>Implementamos uma variedade de medidas de segurança para manter a segurança das suas informações pessoais. Utilizamos tecnologias de encriptação padrão da indústria ao transferir e receber dados de consumidores trocados com o nosso site.</p>

      <h2>Consentimento</h2>
      <p>Ao utilizar o nosso site, o utilizador consente com a nossa política de privacidade.</p>
    </div>
  );
};
