"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Poll } from "@/lib/types";

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">{poll.title}</CardTitle>
        {poll.description && (
          <CardDescription className="line-clamp-2">
            {poll.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{poll.options.length} options</span>
            <span>{totalVotes} votes</span>
          </div>

          <div className="space-y-2">
            {poll.options.slice(0, 3).map((option) => (
              <div
                key={option.id}
                className="flex justify-between items-center"
              >
                <span className="text-sm truncate flex-1">{option.text}</span>
                <span className="text-sm font-medium ml-2">
                  {totalVotes > 0
                    ? Math.round((option.votes / totalVotes) * 100)
                    : 0}
                  %
                </span>
              </div>
            ))}
            {poll.options.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{poll.options.length - 3} more options
              </p>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-muted-foreground">
              Created {new Date(poll.createdAt).toLocaleDateString()}
            </span>
            <Link href={`/polls/${poll.id}`}>
              <Button size="sm" variant="outline">
                View Poll
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
