"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // This will help developers notice missing env vars during development
  // Do not throw to avoid breaking static builds unintentionally
  // eslint-disable-next-line no-console
  console.warn(
    "Missing Supabase env vars NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);
