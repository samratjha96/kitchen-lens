import type { NextRequest } from "next/server";
import { createLLM } from "@/lib/llm";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { prompt: string; image?: string };
  const { prompt } = body;

  const llm = createLLM({ provider: "gemini", model: "gemini-1.5-pro-latest" });
  const response = await llm.generateContent(prompt);

  return Response.json(response);
}
