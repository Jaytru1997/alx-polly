import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";

async function getSession() {
  const supabase = await getServerSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
