export interface AnalyzeImageResponse {
  items: Array<{
    name: string
    quantity: number
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
    estimatedPrice: number
    category: 'produce' | 'dairy' | 'meat' | 'seafood' | 'other'
  }>
} 