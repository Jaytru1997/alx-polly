import { RegisterForm } from "@/components/auth/register-form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

async function getSession() {
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
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export default async function RegisterPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Join PollApp</h1>
          <p className="text-muted-foreground mt-2">
            Create an account to start creating and voting on polls
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
