import { NextApiRequest, NextApiResponse } from "next";
import { LLM } from "@/lib/llm/llm";
import { z } from "zod";
import { FridgeItemSchema } from "@/types/fridge";

const RequestSchema = z.object({
  image: z.string(),
});

type AnalyzeFridgeRequest = z.infer<typeof RequestSchema>;

const ResponseSchema = z.object({
  items: z.array(FridgeItemSchema),
});

// Vercel specific config for handling larger request bodies (files) and the time to process the request
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
  maxDuration: 60,
};

const validateRequest = (body: unknown): AnalyzeFridgeRequest => {
  const result = RequestSchema.safeParse(body);

  if (!result.success) {
    throw new Error(`Invalid request: ${result.error.message}`);
  }

  return result.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = validateRequest(req.body);

    const foodAnalyzer = new LLM({
      responseSchema: ResponseSchema,
      systemInstruction:
        "You are a vision AI and food expert that can analyze images of food and return the contents of the image in a structured format.",
    });

    const { data } = await foodAnalyzer.generate([
      {
        inlineData: {
          data: image,
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

    return res.status(200).json(data);
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to analyze image",
    });
  }
}
