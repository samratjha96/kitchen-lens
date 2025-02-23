import type { FridgeAnalysis as FridgeAnalysisType } from "@/types/fridge";
import { AnalysisCard } from "@/components/AnalysisCard";

type FridgeAnalysisProps = {
  analysis?: FridgeAnalysisType;
  onUpdateQuantity?: (index: number, quantity: number) => void;
};

export function FridgeAnalysis({
  analysis,
  onUpdateQuantity,
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

  return <AnalysisCard items={items} onUpdateQuantity={onUpdateQuantity} />;
}
