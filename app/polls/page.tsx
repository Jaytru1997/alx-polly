import { PollCard } from "@/components/polls/poll-card";
import { Poll } from "@/lib/types";

// Mock data for development
const mockPolls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description:
      "Choose the programming language you enjoy working with the most",
    options: [
      { id: "1", text: "JavaScript/TypeScript", votes: 45, pollId: "1" },
      { id: "2", text: "Python", votes: 38, pollId: "1" },
      { id: "3", text: "Java", votes: 22, pollId: "1" },
      { id: "4", text: "C++", votes: 15, pollId: "1" },
    ],
    createdBy: "user1",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Best framework for building web apps?",
    description: "Which framework do you prefer for modern web development?",
    options: [
      { id: "5", text: "React", votes: 52, pollId: "2" },
      { id: "6", text: "Vue.js", votes: 28, pollId: "2" },
      { id: "7", text: "Angular", votes: 20, pollId: "2" },
      { id: "8", text: "Svelte", votes: 18, pollId: "2" },
    ],
    createdBy: "user2",
    isActive: true,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    title: "Preferred database system",
    options: [
      { id: "9", text: "PostgreSQL", votes: 35, pollId: "3" },
      { id: "10", text: "MongoDB", votes: 30, pollId: "3" },
      { id: "11", text: "MySQL", votes: 25, pollId: "3" },
      { id: "12", text: "Redis", votes: 20, pollId: "3" },
    ],
    createdBy: "user3",
    isActive: true,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
];

export default function PollsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Polls</h1>
        <p className="text-muted-foreground">
          Discover and vote on polls created by the community
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {mockPolls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No polls found.</p>
        </div>
      )}
    </div>
  );
}
