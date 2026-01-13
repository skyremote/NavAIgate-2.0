import { supabase } from "./supabase";
import type { AppSource } from "./database.types";

// Define your app identifier - change this per app
export const APP_SOURCE: AppSource = "navaigate";

/**
 * Sign up a new user with app source tracking
 */
export async function signUp(email: string, password: string) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        app_source: APP_SOURCE,
      },
    },
  });

  return { data, error };
}

/**
 * Sign up with OAuth provider (Google, GitHub, Discord)
 */
export async function signUpWithOAuth(
  provider: "google" | "github" | "discord"
) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const redirectUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : 'https://navaigate.dev/auth/callback';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        // This gets stored in raw_app_meta_data
        app_source: APP_SOURCE,
      },
    },
  });

  return { data, error };
}

/**
 * Sign in existing user
 */
export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/**
 * Sign out current user
 */
export async function signOut() {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current user session
 */
export async function getSession() {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

/**
 * Get current user
 */
export async function getUser() {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Get current user's profile including app_source
 */
export async function getCurrentProfile() {
  if (!supabase) throw new Error("Supabase client not initialized");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

/**
 * Request password reset email
 */
export async function resetPassword(email: string) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const redirectUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/reset-password`
    : 'https://navaigate.dev/auth/reset-password';

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  return { data, error };
}

/**
 * Update user password (after reset)
 */
export async function updatePassword(newPassword: string) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return { data, error };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!supabase) throw new Error("Supabase client not initialized");

  return supabase.auth.onAuthStateChange(callback);
}
