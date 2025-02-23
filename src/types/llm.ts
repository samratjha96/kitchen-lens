import type { z } from "zod";

export type ModelProvider = "gemini" | "openai" | "anthropic";
export type ModelName =
  | "gemini-1.5-pro-latest"
  | "gemini-2.0-flash-lite-preview-02-05"
  | "gpt-4"
  | "claude-3";

export interface LLMConfig<T extends z.ZodSchema> {
  provider: ModelProvider;
  model: ModelName;
  systemInstruction: string;
  responseSchema: T;
}

export interface LLMResponse<T> {
  data: T;
  raw: string;
}

export type PromptContent =
  | string
  | Array<string | { inlineData: { data: string; mimeType: string } }>;

export interface ModelInterface<T> {
  generate(prompt: PromptContent): Promise<LLMResponse<T>>;
}
