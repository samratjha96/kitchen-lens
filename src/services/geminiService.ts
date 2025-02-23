import { generateText } from 'ai';
import { geminiModel } from '@/lib/gemini';

interface AnalyzeImageResponse {
  items: Array<{
    name: string;
    quantity: number;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    estimatedPrice: number;
    category: 'produce' | 'dairy' | 'meat' | 'seafood' | 'other';
  }>;
}

export async function test(): Promise<AnalyzeImageResponse> {
  const { text } = await generateText({
    model: geminiModel,
    prompt: `Generate 5 random food items in the following JSON format:
      {
        "items": [
          {
            "name": "item name",
            "quantity": number,
            "nutrition": {
              "calories": number,
              "protein": number,
              "carbs": number,
              "fat": number
            },
            "estimatedPrice": number,
            "category": "produce|dairy|meat|seafood|other"
          }
        ]
      }`,
  });
  return JSON.parse(text) as AnalyzeImageResponse;
}

export async function analyzeImage(imageData: string): Promise<AnalyzeImageResponse> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Analyze this image of food items and provide detailed information in the following JSON format:
      {
        "items": [
          {
            "name": "item name",
            "quantity": number,
            "nutrition": {
              "calories": number,
              "protein": number,
              "carbs": number,
              "fat": number
            },
            "estimatedPrice": number,
            "category": "produce|dairy|meat|seafood|other"
          }
        ]
      }
      
      Base the analysis on visible items in the image. Include realistic nutritional values and price estimates.`,
      image: imageData,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }

  const data = await response.json();
  return JSON.parse(data.text) as AnalyzeImageResponse;
} 