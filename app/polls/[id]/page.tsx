"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Poll, PollOption } from "@/lib/types";

// Mock data for development
const mockPoll: Poll = {
  id: "1",
  title: "What's your favorite programming language?",
  description:
    "Choose the programming language you enjoy working with the most. This poll helps us understand the community's preferences and plan future content accordingly.",
  options: [
    { id: "1", text: "JavaScript/TypeScript", votes: 45, pollId: "1" },
    { id: "2", text: "Python", votes: 38, pollId: "1" },
    { id: "3", text: "Java", votes: 22, pollId: "1" },
    { id: "4", text: "C++", votes: 15, pollId: "1" },
    { id: "5", text: "Go", votes: 12, pollId: "1" },
  ],
  createdBy: "user1",
  isActive: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
};

export default function PollDetailPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState<Poll>(mockPoll);

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const handleVote = () => {
    if (!selectedOption) return;

    // TODO: Implement actual voting logic
    console.log("Voting for option:", selectedOption);

    // Update local state for demo
    setPoll((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === selectedOption
          ? { ...option, votes: option.votes + 1 }
          : option
      ),
    }));

    setHasVoted(true);
  };

  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{poll.title}</CardTitle>
            {poll.description && (
              <CardDescription className="text-lg">
                {poll.description}
              </CardDescription>
            )}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Created {poll.createdAt.toLocaleDateString()}</span>
              <span>{totalVotes} total votes</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!hasVoted ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select your answer:</h3>
                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedOption === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="poll-option"
                          value={option.id}
                          checked={selectedOption === option.id}
                          onChange={() => setSelectedOption(option.id)}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className="w-full"
                  size="lg"
                >
                  Submit Vote
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-green-600">
                  Thank you for voting!
                </h3>
                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option.text}</span>
                        <span className="text-sm text-muted-foreground">
                          {option.votes} votes (
                          {getVotePercentage(option.votes)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${getVotePercentage(option.votes)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setHasVoted(false);
                    setSelectedOption(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Vote Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
