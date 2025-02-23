import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { env } from '@/env'

type ModelProvider = 'gemini' | 'openai' | 'anthropic'
type ModelName = 'gemini-1.5-pro-latest' | 'gemini-pro' | 'gpt-4' | 'claude-3'

interface LLMConfig {
  provider: ModelProvider
  model: ModelName
}

const defaultConfig: LLMConfig = {
  provider: 'gemini',
  model: 'gemini-1.5-pro-latest'
}

export const createLLM = (config: Partial<LLMConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config }

  switch (finalConfig.provider) {
    case 'gemini':
      const google = createGoogleGenerativeAI({ apiKey: env.GOOGLE_GEMINI_API_KEY })
      return google(finalConfig.model)
    
    case 'openai':
    case 'anthropic':
      throw new Error(`Provider ${finalConfig.provider} not yet implemented`)
      
    default:
      throw new Error(`Unknown provider: ${String(finalConfig.provider)}`)
  }
} 