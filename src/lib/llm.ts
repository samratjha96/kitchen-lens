import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { toGeminiSchema } from "gemini-zod";
import { env } from "@/env";
import type { z } from "zod";

type ModelProvider = "gemini" | "openai" | "anthropic";
type ModelName = "gemini-1.5-pro-latest" | "gemini-pro" | "gpt-4" | "claude-3";

interface LLMConfig<T extends z.ZodSchema> {
  provider: ModelProvider;
  model: ModelName;
  systemInstruction: string;
  responseSchema: T;
}

interface LLMResponse<T> {
  data: T;
  raw: string;
}

export class LLM<T extends z.ZodSchema> {
  private config: LLMConfig<T>;
  private model: GenerativeModel;

  constructor(config: Partial<LLMConfig<T>> & { responseSchema: T }) {
    this.config = {
      provider: "gemini",
      model: "gemini-1.5-pro-latest",
      systemInstruction: "",
      ...config,
    };
    this.model = this.initialize();
  }

  private initialize(): GenerativeModel {
    switch (this.config.provider) {
      case "gemini":
        const google = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API_KEY);
        return google.getGenerativeModel({
          model: this.config.model,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: toGeminiSchema(this.config.responseSchema),
          },
          systemInstruction: this.config.systemInstruction,
        });

      case "openai":
      case "anthropic":
        throw new Error(`Provider ${this.config.provider} not yet implemented`);

      default:
        throw new Error(`Unknown provider: ${String(this.config.provider)}`);
    }
  }

  async generate(
    prompt:
      | string
      | Array<string | { inlineData: { data: string; mimeType: string } }>,
  ): Promise<LLMResponse<z.infer<T>>> {
    const result = await this.model.generateContent(prompt);
    const rawText = result.response.text();

    try {
      const jsonData = JSON.parse(rawText);
      const parsed = this.config.responseSchema.safeParse(jsonData);

      if (!parsed.success) {
        throw new Error(
          `Failed to parse response: ${JSON.stringify(parsed.error.issues)}`,
        );
      }

      return {
        data: parsed.data,
        raw: rawText,
      };
    } catch (e) {
      throw e;
    }
  }
}
