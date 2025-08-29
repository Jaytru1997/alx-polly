import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
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
