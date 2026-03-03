import { createBrowserClient } from "@supabase/ssr";

function getEnvionmentVariable() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing environment variables');
    }

    return { supabaseUrl, supabaseAnonKey };
}

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvionmentVariable();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}