"use client";

import { useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { analyze } from "@/services/fridgeAnalysis";
import type { FridgeAnalysis } from "@/types/fridge";
import { DropZone } from "./DropZone";
import Image from "next/image";

interface ImageUploaderProps {
  onAnalysisComplete: (analysis: FridgeAnalysis) => void;
  onAnalysisStart: () => void;
}

export function ImageUploader({
  onAnalysisComplete,
  onAnalysisStart,
}: ImageUploaderProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleFileSelect = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const analyzeImage = async () => {
    if (!image) return;
    setError(null);
    onAnalysisStart();

    try {
      setLoading(true);
      const analysis = await analyze(image);

      const transformedAnalysis: FridgeAnalysis = {
        items: analysis.items.map((item) => ({
          ...item,
          calories: item.nutrition.calories,
          estimatedValue: item.estimatedValue,
        })),
        totalCalories: analysis.items.reduce(
          (sum, item) => sum + item.nutrition.calories,
          0,
        ),
        totalValue: analysis.items.reduce(
          (sum, item) => sum + item.estimatedValue,
          0,
        ),
      };

      onAnalysisComplete(transformedAnalysis);
    } catch (error) {
      setError(
        `Failed to analyze image. Potential causes are:
        1. API key is invalid
        2. Image is taking longer than 10 seconds to process (Vercel serverless function limit)\n
        3. Image is not a valid photo`
      );
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTestImage = async () => {
    try {
      const response = await fetch('/fridge.jpeg');
      const blob = await response.blob();
      const file = new File([blob], 'fridge.jpeg', { type: 'image/jpeg' });
      handleFileSelect(file);
    } catch (error) {
      setError('Failed to load test image');
      console.error('Error loading test image:', error);
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrag}
        className={cn(
          "relative flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 ease-in-out",
          dragActive
            ? "border-blue-500 bg-blue-500/5"
            : "border-zinc-800 hover:border-zinc-700",
          preview ? "bg-zinc-900" : "bg-zinc-900",
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleFileSelect(e.target.files[0])
          }
          className="hidden"
          id="image-upload"
        />

        {preview ? (
          <div className="w-full space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={preview}
                alt="Preview"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <div className="flex justify-end gap-2 px-4">
              <Button variant="outline" size="sm" onClick={removeImage}>
                Remove
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                Change Image
              </Button>
            </div>
          </div>
        ) : (
          <DropZone dragActive={dragActive} onDrop={handleFileSelect} />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-center gap-2 py-2">
          {!preview ? (
            <Button
              onClick={loadTestImage}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/25"
            >
              Use test image
            </Button>
          ) : (
            <Button
              onClick={analyzeImage}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/25"
              disabled={!image || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing your fridge...
                </>
              ) : (
                "Analyze Contents"
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
