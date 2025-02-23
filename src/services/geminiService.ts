'use server';

import { generateObject } from 'ai'
import { createLLM } from '@/lib/llm'
import type { AnalyzeImageResponse } from '@/types/gemini'
import { z } from 'zod'
import { FridgeItemSchema } from '@/types/fridge'

const ResponseSchema = z.object({
  items: z.array(FridgeItemSchema)
})

export async function test() {
  const { object } = await generateObject({
    model: createLLM({ provider: 'gemini', model: 'gemini-1.5-pro-latest' }),
    schema: ResponseSchema,
    prompt: 'Generate 5 random food items that might be found in a fridge'
  })
  
  return object
}

export async function analyzeImage(imageData: string): Promise<AnalyzeImageResponse> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: '...', image: imageData }),
  })

  if (!response.ok) throw new Error('Failed to analyze image')

  const data = await response.json() as { text: string }
  return JSON.parse(data.text) as AnalyzeImageResponse
} 