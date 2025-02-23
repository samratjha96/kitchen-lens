import type { FridgeAnalysis as FridgeAnalysisType } from "@/types/fridge";
import { AnalysisCard } from "@/components/AnalysisCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

type FridgeAnalysisProps = {
  analysis?: FridgeAnalysisType;
  onUpdateQuantity?: (index: number, quantity: number) => void;
  imageHeight?: number;
};

export function FridgeAnalysis({
  analysis,
  onUpdateQuantity,
  imageHeight = 500,
}: FridgeAnalysisProps) {
  if (!analysis) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-16 rounded-lg bg-zinc-800" />
        <div className="h-16 rounded-lg bg-zinc-800" />
        <div className="h-16 rounded-lg bg-zinc-800" />
        <div className="h-16 rounded-lg bg-zinc-800" />
      </div>
    );
  }

  if (analysis.items.length === 0) {
    return (
      <div className="rounded-lg bg-zinc-800 p-6 text-center">
        <p className="text-zinc-200">
          No food items were found in the picture. Please upload a different
          picture.
        </p>
      </div>
    );
  }

  const items = analysis.items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    nutrition: {
      calories: item.nutrition.calories ?? 0,
      protein: item.nutrition.protein ?? 0,
      carbs: item.nutrition.carbs ?? 0,
      fat: item.nutrition.fat ?? 0,
    },
    estimatedPrice: item.estimatedValue,
    category: item.category ?? "other",
  }));

  const totalCalories = items.reduce(
    (sum, item) => sum + item.nutrition.calories * item.quantity,
    0,
  );
  const totalValue = items.reduce(
    (sum, item) => sum + item.estimatedPrice * item.quantity,
    0,
  );

  const searchRecipes = () => {
    const ingredients = items.map((item) => item.name).join(", ");
    window.open(
      `https://www.google.com/search?q=recipes+with+${encodeURIComponent(ingredients)}`,
      "_blank",
    );
  };

  return (
    <div className="flex h-full flex-col" style={{ height: imageHeight * 1.5 }}>
      <h2 className="mb-4 text-xl font-semibold">Fridge Contents Analysis</h2>

      <div className="min-h-0 flex-1">
        <AnalysisCard items={items} onUpdateQuantity={onUpdateQuantity} />
      </div>

      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-zinc-700 bg-zinc-800">
            <CardContent className="p-4">
              <div className="text-zinc-400">Total Calories</div>
              <div className="text-2xl font-bold text-white">
                {totalCalories.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="border-zinc-700 bg-zinc-800">
            <CardContent className="p-4">
              <div className="text-zinc-400">Total Value</div>
              <div className="text-2xl font-bold text-white">
                ${totalValue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={searchRecipes}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/25"
          >
            <Utensils className="mr-2 h-4 w-4" />
            Lookup recipes online
          </Button>

          <div className="space-y-1">
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white opacity-50 shadow-lg"
              disabled
            >
              Build recipe with AI
            </Button>
            <p className="text-center text-xs text-zinc-500">Coming Soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
