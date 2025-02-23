"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { StarIcon, BoltIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { ImageUploader } from "@/components/ImageUploader";
import { FridgeAnalysis } from "@/components/FridgeAnalysis";
import type { FridgeAnalysis as FridgeAnalysisType } from "@/types/fridge";

export default function HomePage() {
  const analysisRef = useRef<HTMLDivElement>(null);
  const [analysis, setAnalysis] = useState<FridgeAnalysisType>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = (result: FridgeAnalysisType) => {
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <main className="flex flex-col">
      {/* Hero Section - Full Viewport Height */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center bg-background">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Kitchen{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Lens
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Upload a photo of your fridge and let AI analyze its contents. Get
              instant insights about your food inventory and suggestions for meals.
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={scrollToAnalysis}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 text-blue-400 transition-all duration-300"
            >
              <Link 
                href="https://github.com/samratjha96/kitchen-lens" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Source Code
              </Link>
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
      </section>

      {/* App Section - Full Viewport Height */}
      <section 
        ref={analysisRef}
        className="min-h-[100vh] w-full bg-black flex items-center justify-center"
      >
        <div className="container max-w-7xl mx-auto px-4">
          {!analysis && !isAnalyzing ? (
            <div className="flex justify-center">
              <div className="max-w-xl w-full">
                <ImageUploader 
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="lg:sticky lg:top-4">
                <ImageUploader 
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                />
              </div>
              <div>
                <FridgeAnalysis analysis={analysis} />
              </div>
            </div>
          )}
        </div>
      </section>
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
