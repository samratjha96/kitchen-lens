"use server";

export const maxDuration = 60; // https://vercel.com/docs/functions/configuring-functions/duration

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
    - Nutritional information
    - Food category (fruits, vegetables, grains, etc.)
    - Realistic price per item

    Rules:
    0. If the image does not contain any food, return an empty array.
    1. Only return the items that are visible in the image.
    2. When you see an item that you are unsure of, return it as "other"
    3. When you see egg cartons the quantity is 1 (dozen). Do not use 12 or price eggs individually. Ex: {"name": "Egg Carton", "quantity": 1, "price": 3.99}
    4. Always use factual prices and nutritional information. This is extremely critical as we are using this data to make decisions about what to eat
    `,
  ]);

  console.log("LLM Response", data);

  return data;
}
