export type FridgeItem = {
  name: string
  quantity: number
  unit?: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  estimatedValue: number
  expiryDate?: string
  category?: "produce" | "dairy" | "meat" | "seafood" | "other"
}

export type FridgeAnalysis = {
  items: FridgeItem[]
  totalCalories: number
  totalValue: number
} 