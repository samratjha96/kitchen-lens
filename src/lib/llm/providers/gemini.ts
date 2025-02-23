import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { toGeminiSchema } from "gemini-zod";
import type { z } from "zod";
import type {
  LLMConfig,
  LLMResponse,
  ModelInterface,
  PromptContent,
} from "../types";

export class GeminiModel<T extends z.ZodSchema>
  implements ModelInterface<z.infer<T>>
{
  private model: GenerativeModel;
  private config: LLMConfig<T>;

  constructor(apiKey: string, config: LLMConfig<T>) {
    this.config = config;
    const google = new GoogleGenerativeAI(apiKey);
    this.model = google.getGenerativeModel({
      model: config.model,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: toGeminiSchema(config.responseSchema),
      },
      systemInstruction: config.systemInstruction,
    });
  }

  async generate(prompt: PromptContent): Promise<LLMResponse<z.infer<T>>> {
    const result = await this.model.generateContent(prompt);
    const rawText = result.response.text();

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
  }
}
