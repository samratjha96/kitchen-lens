import { env } from "@/env";
import type { z } from "zod";
import type {
  LLMConfig,
  LLMResponse,
  ModelInterface,
  PromptContent,
} from "../../types/llm";
import { GeminiModel } from "./providers/gemini";

export class LLM<T extends z.ZodSchema> {
  private model: ModelInterface<z.infer<T>>;

  constructor(config: Partial<LLMConfig<T>> & { responseSchema: T }) {
    const fullConfig: LLMConfig<T> = {
      provider: "gemini",
      model: "gemini-2.0-flash-lite-preview-02-05",
      systemInstruction: "",
      ...config,
    };

    this.model = this.initialize(fullConfig);
  }

  private initialize(config: LLMConfig<T>): ModelInterface<z.infer<T>> {
    switch (config.provider) {
      case "gemini":
        return new GeminiModel(env.GOOGLE_GEMINI_API_KEY, config);

      case "openai":
      case "anthropic":
        throw new Error(`Provider ${config.provider} not yet implemented`);

      default:
        throw new Error(`Unknown provider: ${String(config.provider)}`);
    }
  }

  async generate(prompt: PromptContent): Promise<LLMResponse<z.infer<T>>> {
    return this.model.generate(prompt);
  }
}
