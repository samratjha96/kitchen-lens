import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { StarIcon, BoltIcon, SparklesIcon } from "@heroicons/react/24/outline";

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

        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-lg border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                transform: `translateZ(${index * 10}px)`,
                zIndex: index,
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center text-center">
                <feature.icon className="mb-3 h-8 w-8 text-blue-500" />
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
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
    icon: StarIcon,
  },
  {
    title: "Instant Results",
    description:
      "Get immediate feedback about your fridge contents and food storage suggestions.",
    icon: BoltIcon,
  },
  {
    title: "Meal Suggestions",
    description:
      "Receive personalized meal recommendations based on your available ingredients.",
    icon: SparklesIcon,
  },
];
