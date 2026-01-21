
import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env vars missing");
  }

  // Server-side Supabase client
  return createClient(supabaseUrl, supabaseKey);
}
