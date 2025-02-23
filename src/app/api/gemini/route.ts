import type { NextRequest } from 'next/server'
import { generateText } from 'ai'
import { createLLM } from '@/lib/llm'

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { prompt: string; image?: string }
  const { prompt } = body

  const response = await generateText({
    model: createLLM({ provider: 'gemini', model: 'gemini-1.5-pro-latest' }),
    prompt,
  })

  return Response.json(response)
} 