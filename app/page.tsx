import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Create and Vote on Polls</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          PollApp is a modern platform for creating engaging polls, gathering
          opinions, and making data-driven decisions with your community.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/polls/create">
            <Button size="lg">Create Your First Poll</Button>
          </Link>
          <Link href="/polls">
            <Button variant="outline" size="lg">
              Browse Polls
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Create Polls</CardTitle>
            <CardDescription>
              Easily create custom polls with multiple options and descriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Build engaging polls in minutes with our intuitive interface. Add
              descriptions, multiple choice options, and customize to your
              needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vote & Share</CardTitle>
            <CardDescription>
              Vote on polls and share them with your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Participate in polls created by others and share your own polls to
              gather valuable insights from your audience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Results</CardTitle>
            <CardDescription>
              See results update in real-time as votes come in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Watch your poll results update instantly with beautiful charts and
              statistics that make data easy to understand.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to get started?</CardTitle>
            <CardDescription>
              Join thousands of users creating and participating in polls
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg">Sign Up Free</Button>
            </Link>
            <Link href="/polls">
              <Button variant="outline" size="lg">
                Explore Polls
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
