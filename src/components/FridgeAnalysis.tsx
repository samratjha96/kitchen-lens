import { FridgeAnalysis as FridgeAnalysisType } from "@/types/fridge";
import { AnalysisCard } from "@/components/AnalysisCard";

type FridgeAnalysisProps = {
  analysis?: FridgeAnalysisType;
};

export function FridgeAnalysis({ analysis }: FridgeAnalysisProps) {
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
      calories: item.calories || 0,
      protein: item.protein || 0,
      carbs: item.carbs || 0,
      fat: item.fat || 0,
    },
    estimatedPrice: item.estimatedValue,
    category: item.category || "other",
  }));

  return <AnalysisCard items={items} />;
}
