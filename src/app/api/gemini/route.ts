import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt,
    });

    return Response.json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 