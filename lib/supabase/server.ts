import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function getServerSupabase() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      global: { headers: { Cookie: cookieHeader } },
    }
  );
  return supabase;
}
