import { CreatePollForm } from "@/components/polls/create-poll-form";

export default function CreatePollPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create a New Poll</h1>
          <p className="text-muted-foreground mt-2">
            Share your question with the community and gather opinions
          </p>
        </div>
        <CreatePollForm />
      </div>
    </div>
  );
}
