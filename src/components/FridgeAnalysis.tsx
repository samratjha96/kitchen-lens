import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FridgeAnalysis() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Fridge Contents Analysis</h2>
        
        <div className="space-y-4">
          {/* Placeholder content */}
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-zinc-800 rounded-lg" />
            <div className="h-16 bg-zinc-800 rounded-lg" />
            <div className="h-16 bg-zinc-800 rounded-lg" />
            <div className="h-16 bg-zinc-800 rounded-lg" />
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Total Calories</h3>
                <p className="text-2xl font-semibold text-white">--</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Total Value</h3>
                <p className="text-2xl font-semibold text-white">$--.--</p>
              </div>
            </div>

            <Button className="w-full bg-blue-500 hover:bg-blue-600" disabled>
              Find Recipes with These Ingredients
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 