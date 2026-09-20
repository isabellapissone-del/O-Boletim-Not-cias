import React from 'react';
import { AlertTriangle, Settings, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const ConfigNotice: React.FC = () => {
  if (isSupabaseConfigured) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-amber-800">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertTriangle size={18} />
          </div>
          <div className="text-sm">
            <p className="font-bold">Modo de Pré-visualização</p>
            <p className="text-amber-700/80">O portal está a usar dados de teste. Ligue a sua base de dados Supabase para activar funcionalidades reais.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-700 shadow-sm">
            <Database size={14} />
            Configuração Necessária
          </div>
          <p className="text-[10px] text-amber-600 font-medium hidden lg:block">
            Vá a <span className="font-bold">Settings &gt; Secrets</span> e adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
          </p>
        </div>
      </div>
    </div>
  );
};
