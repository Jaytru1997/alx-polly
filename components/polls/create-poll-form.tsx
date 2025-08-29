"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, X } from "lucide-react";

export function CreatePollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [allowAnonymous, setAllowAnonymous] = useState(false);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validOptions = options.filter((option) => option.trim() !== "");

    if (validOptions.length < 2) {
      alert("Please provide at least 2 options");
      setIsLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("allowAnonymous", String(allowAnonymous));
      validOptions.forEach((opt) => fd.append("options", opt));
      const { createPollAction } = await import("@/app/polls/create/actions");
      const res = await createPollAction(fd);
      if (res && !res.ok) {
        setError(res.error || "Failed to create poll");
        setIsLoading(false);
        return;
      }
      // If res is undefined, the server action performed a redirect
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>
          Create a new poll and share it with others to gather opinions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Poll Title *
            </label>
            <Input
              id="title"
              placeholder="What would you like to ask?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <Input
              id="description"
              placeholder="Add more context to your poll..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Poll Options *</label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    required
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="allowAnonymous"
              type="checkbox"
              checked={allowAnonymous}
              onChange={(e) => setAllowAnonymous(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="allowAnonymous" className="text-sm">
              Allow anonymous voting
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating poll..." : "Create Poll"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
