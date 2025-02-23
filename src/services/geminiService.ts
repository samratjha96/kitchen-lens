"use server";

import { createLLM } from "@/lib/llm";
import type { AnalyzeImageResponse } from "@/types/gemini";
import { z } from "zod";
import { FridgeItemSchema } from "@/types/fridge";

const ResponseSchema = z.object({
  items: z.array(FridgeItemSchema),
});

export async function identifyFoods(image: File) {
  const imageData = await image.arrayBuffer();
  const llm = createLLM({
    provider: "gemini",
    model: "gemini-1.5-pro-latest",
    responseSchema: ResponseSchema,
    systemInstruction:
      "You are a vision AI and food expertthat can analyze images of food and return the contents of the image in a structured format.",
  });
  const result = await llm.generateContent([
    {
      inlineData: {
        data: Buffer.from(imageData).toString("base64"),
        mimeType: "image/png",
      },
    },
    `You have to identify different types of food in images. 
The system should accurately detect and label various foods displayed in the image, providing the name 
of the food and its location within the image (e.g., bottom left, right corner, etc.). Additionally, 
the system should extract nutritional information and categorize the type of food (e.g., fruits, vegetables, grains, etc.) 
based on the detected items. The output should include a comprehensive report or display showing the
identified foods, their positions, names, and corresponding nutritional details.`,
  ]);
  const generatedText = result.response.text();
  console.log("LLM response", generatedText);
  const jsonData = JSON.parse(generatedText);
  const parsed = ResponseSchema.safeParse(jsonData);
  if (!parsed.success) throw new Error("Failed to parse response");
  return parsed.data;
}
