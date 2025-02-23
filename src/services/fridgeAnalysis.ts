import type { FridgeAnalysis } from "@/types/fridge";

export const analyzeFridge = async (_image: File): Promise<FridgeAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return {
    items: [
      {
        name: "Milk",
        quantity: 1,
        unit: "gallon",
        calories: 103,
        protein: 8,
        carbs: 12,
        fat: 2.4,
        estimatedValue: 3.99,
        expiryDate: "2024-04-01",
        category: "dairy"
      },
      {
        name: "Eggs",
        quantity: 12,
        unit: "pieces",
        calories: 70,
        protein: 6,
        carbs: 0,
        fat: 5,
        estimatedValue: 4.99,
        expiryDate: "2024-03-28",
        category: "dairy"
      },
      {
        name: "Salmon Fillet",
        quantity: 2,
        unit: "pieces",
        calories: 208,
        protein: 22,
        carbs: 0,
        fat: 13,
        estimatedValue: 12.99,
        expiryDate: "2024-03-25",
        category: "seafood"
      },
      {
        name: "Organic Apples",
        quantity: 6,
        unit: "pieces",
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        estimatedValue: 5.99,
        expiryDate: "2024-03-30",
        category: "produce"
      }
    ],
    totalCalories: 1524,
    totalValue: 27.96
  }
} 