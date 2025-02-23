"use server";

import { LLM } from "@/lib/llm/llm";
import { z } from "zod";
import { FridgeItemSchema } from "@/types/fridge";

const ResponseSchema = z.object({
  items: z.array(FridgeItemSchema),
});

export async function analyze(image: File) {
  const imageData = await image.arrayBuffer();

  const foodAnalyzer = new LLM({
    responseSchema: ResponseSchema,
    systemInstruction:
      "You are a vision AI and food expert that can analyze images of food and return the contents of the image in a structured format.",
  });

  const { data } = await foodAnalyzer.generate([
    {
      inlineData: {
        data: Buffer.from(imageData).toString("base64"),
        mimeType: "image/png",
      },
    },
    `Identify different types of food in this image. 
    Detect and label various foods, providing:
    - Name of each food item
    - Location within the image
    - Nutritional information
    - Food category (fruits, vegetables, grains, etc.)`,
  ]);

  return data;
}
