import { z } from 'zod'

export const NutritionSchema = z.object({
  calories: z.number(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fat: z.number().optional(),
})

export const FridgeItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  nutrition: NutritionSchema,
  estimatedValue: z.number(),
  unit: z.string().optional(),
  expiryDate: z.string().optional(),
  category: z.enum(['produce', 'dairy', 'meat', 'seafood', 'other']).optional()
})

export const FridgeAnalysisSchema = z.object({
  items: z.array(FridgeItemSchema),
  totalCalories: z.number(),
  totalValue: z.number()
})

export type FridgeItem = z.infer<typeof FridgeItemSchema>
export type FridgeAnalysis = z.infer<typeof FridgeAnalysisSchema> 