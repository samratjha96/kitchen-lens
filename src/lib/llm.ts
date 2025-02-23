// import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toGeminiSchema } from "gemini-zod";

import { env } from "@/env";
import { z } from "zod";

type ModelProvider = "gemini" | "openai" | "anthropic";
type ModelName = "gemini-1.5-pro-latest" | "gemini-pro" | "gpt-4" | "claude-3";

interface LLMConfig {
  provider: ModelProvider;
  model: ModelName;
  systemInstruction: string;
  responseSchema: z.ZodSchema;
}

const defaultConfig: LLMConfig = {
  provider: "gemini",
  model: "gemini-1.5-pro-latest",
  systemInstruction:
    "You are a helpful assistant that can answer questions and help with tasks.",
  responseSchema: z.string(),
};

export const createLLM = (config: Partial<LLMConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };

  switch (finalConfig.provider) {
    case "gemini":
      const google = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API_KEY);
      return google.getGenerativeModel({
        model: finalConfig.model,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: toGeminiSchema(finalConfig.responseSchema),
        },
        systemInstruction: finalConfig.systemInstruction,
      });
    case "openai":
    case "anthropic":
      throw new Error(`Provider ${finalConfig.provider} not yet implemented`);

    default:
      throw new Error(`Unknown provider: ${String(finalConfig.provider)}`);
  }
};
