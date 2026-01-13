import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Only create client if env vars are available
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;

// Re-export types for convenience
export type { WaitlistEntry, Profile, AppSource } from './database.types';

export interface NavAIgateWaitlistEntry {
  id?: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
  created_at?: string;
}

export async function joinWaitlist(entry: Omit<NavAIgateWaitlistEntry, 'id' | 'created_at'>) {
  if (!supabase) {
    return { error: { message: 'Waitlist is not configured. Please try again later.' }, data: null };
  }

  // Check current count
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (count !== null && count >= 500) {
    return { error: { message: 'Waitlist is full (500/500)' }, data: null };
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()
    .single();

  return { data, error };
}

export async function getWaitlistCount() {
  if (!supabase) {
    return { count: 0, error: null };
  }

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  return { count: count || 0, error };
}
