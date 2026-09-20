import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: any = null;

// Lazy initialization to prevent crash on startup if keys are missing
export const supabase = new Proxy({} as any, {
  get(_, prop) {
    // If we're checking configuration status, return it
    if (prop === 'isConfigured') return isSupabaseConfigured;

    if (!client) {
      if (!isSupabaseConfigured) {
        // Return a dummy object that doesn't crash
        const mockResponse = { data: [], error: null }; // Silent by default
        const mockChain = () => ({
          from: mockChain,
          select: mockChain,
          eq: mockChain,
          order: mockChain,
          limit: mockChain,
          single: async () => ({ data: null, error: null }),
          then: (cb: any) => cb(mockResponse)
        });

        if (prop === 'from' || prop === 'rpc') return mockChain;
        if (prop === 'auth') return { 
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        };
        
        return () => {};
      }
      client = createClient(supabaseUrl, supabaseAnonKey);
    }
    return client[prop];
  }
});
