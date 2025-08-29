"use client";

import { useState } from "react";
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

// Mock data for development
const mockUserPolls: Poll[] = [
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
    createdBy: "user1",
    isActive: true,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
];

export default function DashboardPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    totalPolls: mockUserPolls.length,
    totalVotes: mockUserPolls.reduce(
      (sum, poll) =>
        sum +
        poll.options.reduce((pollSum, option) => pollSum + option.votes, 0),
      0
    ),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your polls.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.totalPolls}</div>
            <p className="text-xs text-muted-foreground">
              Polls you've created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.totalVotes}</div>
            <p className="text-xs text-muted-foreground">
              Votes across all your polls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{user.email}</div>
            <p className="text-xs text-muted-foreground">Your email address</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Create new polls or manage your existing ones
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/polls/create">
            <Button>Create New Poll</Button>
          </Link>
          <Link href="/polls">
            <Button variant="outline">Browse All Polls</Button>
          </Link>
        </CardContent>
      </Card>

      {/* User's Polls */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Polls</h2>
          <Link href="/polls/create">
            <Button variant="outline">Create Poll</Button>
          </Link>
        </div>

        {mockUserPolls.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockUserPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-md transition-shadow">
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
                      <span>
                        {poll.options.reduce(
                          (sum, option) => sum + option.votes,
                          0
                        )}{" "}
                        votes
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-muted-foreground">
                        Created {poll.createdAt.toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/polls/${poll.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                You haven't created any polls yet.
              </p>
              <Link href="/polls/create">
                <Button>Create Your First Poll</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
