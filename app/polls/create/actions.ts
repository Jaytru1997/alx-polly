"use server";

import { z } from "zod";
import { getServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const createPollSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().max(500).optional().or(z.literal("")),
  options: z
    .array(z.string().trim().min(1))
    .min(2, "Provide at least two options")
    .max(10, "Maximum 10 options"),
  allowAnonymous: z.boolean().default(false),
});

export type CreatePollInput = z.infer<typeof createPollSchema>;

export async function createPollAction(formData: FormData) {
  const supabase = await getServerSupabase();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr) return { ok: false, error: userErr.message } as const;
  if (!user) return { ok: false, error: "Not authenticated" } as const;

  const payload = {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    allowAnonymous:
      String(formData.get("allowAnonymous") || "false") === "true",
    options: (formData.getAll("options") as string[])
      .map((o) => o.trim())
      .filter(Boolean),
  } satisfies Partial<CreatePollInput>;

  const parsed = createPollSchema.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((e) => e.message).join("; ");
    return { ok: false, error: msg } as const;
  }

  const { title, description, options, allowAnonymous } = parsed.data;

  const { data: poll, error: insertPollErr } = await supabase
    .from("polls")
    .insert({
      title,
      description: description || null,
      created_by: user.id,
      is_active: true,
      allow_anonymous: allowAnonymous,
    })
    .select("id")
    .single();

  if (insertPollErr || !poll) {
    return {
      ok: false,
      error: insertPollErr?.message || "Failed to create poll",
    } as const;
  }

  const optionRows = options.map((text, idx) => ({
    poll_id: poll.id,
    text,
    position: idx,
  }));
  const { error: optsErr } = await supabase
    .from("poll_options")
    .insert(optionRows);
  if (optsErr) return { ok: false, error: optsErr.message } as const;

  redirect(`/polls/${poll.id}`);
}
