"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  // TODO: Replace with actual authentication state
  const isAuthenticated = false;
  const user = null;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            PollApp
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/polls"
              className="text-sm font-medium hover:text-primary"
            >
              Browse Polls
            </Link>
            <Link
              href="/polls/create"
              className="text-sm font-medium hover:text-primary"
            >
              Create Poll
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline">Sign Out</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
