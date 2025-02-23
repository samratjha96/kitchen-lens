import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            AI Fridge{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Analyzer
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Upload a photo of your fridge and let AI analyze its contents. Get
            instant insights about your food inventory and suggestions for meals.
          </p>
        </div>

        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/analyze">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/how-it-works">How it Works</Link>
          </Button>
        </div>

        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-6 text-left"
            >
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "Smart Analysis",
    description:
      "Advanced AI technology identifies food items and their conditions in your fridge.",
  },
  {
    title: "Instant Results",
    description:
      "Get immediate feedback about your fridge contents and food storage suggestions.",
  },
  {
    title: "Meal Suggestions",
    description:
      "Receive personalized meal recommendations based on your available ingredients.",
  },
];
