import type { FridgeAnalysis } from "@/types/fridge";
import { FridgeAnalysisSchema } from "@/types/fridge";

const STORAGE_KEY = "kitchen-lens-analysis";

export const storageService = {
  saveAnalysis: (analysis: FridgeAnalysis) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
  },

  getAnalysis: (): FridgeAnalysis | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      const result = FridgeAnalysisSchema.safeParse(parsed);
      return result.success ? result.data : null;
    } catch {
      return null;
    }
  },

  updateItem: (index: number, quantity: number): FridgeAnalysis | null => {
    const analysis = storageService.getAnalysis();
    if (!analysis) return null;

    const newItems = [...analysis.items];
    const item = newItems[index];
    if (!item) return analysis;
    
    newItems[index] = { ...item, quantity };
    
    const totalCalories = newItems.reduce(
      (sum, item) => sum + item.nutrition.calories * item.quantity,
      0
    );
    const totalValue = newItems.reduce(
      (sum, item) => sum + item.estimatedValue * item.quantity,
      0
    );

    const updatedAnalysis: FridgeAnalysis = {
      ...analysis,
      items: newItems,
      totalCalories,
      totalValue
    };

    storageService.saveAnalysis(updatedAnalysis);
    return updatedAnalysis;
  },

  clearAnalysis: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 