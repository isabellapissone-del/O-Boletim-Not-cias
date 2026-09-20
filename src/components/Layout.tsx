import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ConfigNotice } from './ConfigNotice';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <Header />
      <ConfigNotice />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
