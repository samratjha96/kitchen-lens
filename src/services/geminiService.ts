"use server";

import { createLLM } from "@/lib/llm";
import type { AnalyzeImageResponse } from "@/types/gemini";
import { z } from "zod";
import { FridgeItemSchema } from "@/types/fridge";

const ResponseSchema = z.object({
  items: z.array(FridgeItemSchema),
});

export async function test2(imageData: string) {
  const llm = createLLM({
    provider: "gemini",
    model: "gemini-1.5-pro-latest",
    responseSchema: ResponseSchema,
    systemInstruction:
      "You are a vision AI and food expertthat can analyze images of food and return the contents of the image in a structured format.",
  });
  const result = await llm.generateContent(
    `Generate 5 random food items that might be found in a fridge`,
  );
  const generatedText = result.response.text();
  const jsonData = JSON.parse(generatedText);
  const parsed = ResponseSchema.safeParse(jsonData);
  if (!parsed.success) throw new Error("Failed to parse response");
  return parsed.data;
}

export async function analyzeImage(
  imageData: string,
): Promise<AnalyzeImageResponse> {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "...", image: imageData }),
  });

  if (!response.ok) throw new Error("Failed to analyze image");

  const data = (await response.json()) as { text: string };
  return JSON.parse(data.text) as AnalyzeImageResponse;
}
