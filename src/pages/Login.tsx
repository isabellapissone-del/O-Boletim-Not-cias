import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { KeyRound, Mail, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-200">
        <div className="text-center mb-8">
          <span className="text-2xl font-black tracking-tighter text-red-600">
            MOÇAMBIQUE<span className="text-neutral-900">AGORA</span>
          </span>
          <h2 className="text-xl font-bold mt-4">Acesso Administrativo</h2>
          <p className="text-sm text-neutral-500">Inicie sessão para gerenciar o portal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-3">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg outline-none focus:border-red-500 transition"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Palavra-passe</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg outline-none focus:border-red-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neutral-900 text-white font-bold py-3 rounded-lg hover:bg-neutral-800 transition disabled:opacity-50 shadow-lg"
          >
            {loading ? 'A processar...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
