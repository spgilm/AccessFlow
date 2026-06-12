import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const workspaceLabel = import.meta.env.VITE_ACCESSFLOW_WORKSPACE_LABEL || "prototype";

let client = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getWorkspaceLabel() {
  return workspaceLabel;
}

export function getSupabaseStatus() {
  return {
    configured: isSupabaseConfigured(),
    workspaceLabel,
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
  };
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}

export async function getCurrentSession() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session ?? null;
}

export function subscribeToAuthChanges(callback) {
  if (!isSupabaseConfigured()) {
    return () => {};
  }

  const supabase = getSupabaseClient();
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ?? null);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

export async function signUpWithEmail(email, password) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signInWithEmail(email, password) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function saveWorkspaceSnapshot(payload) {
  const supabase = getSupabaseClient();
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    throw new Error("Sign in before saving to Supabase.");
  }

  const { data, error } = await supabase
    .from("accessflow_workspace_snapshots")
    .insert({
      workspace_label: workspaceLabel,
      user_id: session.user.id,
      payload,
    })
    .select("id, updated_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loadLatestWorkspaceSnapshot() {
  const supabase = getSupabaseClient();
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    throw new Error("Sign in before loading from Supabase.");
  }

  const { data, error } = await supabase
    .from("accessflow_workspace_snapshots")
    .select("id, payload, created_at, updated_at")
    .eq("workspace_label", workspaceLabel)
    .eq("user_id", session.user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
