"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit2,
  Save,
  ChevronDown,
  ChevronUp,
  Utensils,
  ShoppingCart,
  Apple,
  Beef,
  Fish,
  Milk,
} from "lucide-react";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodItem {
  name: string;
  quantity: number;
  nutrition: Nutrition;
  estimatedPrice: number;
  category: "produce" | "dairy" | "meat" | "seafood" | "other";
}

const getCategoryIcon = (category: FoodItem["category"]) => {
  switch (category) {
    case "produce":
      return Apple;
    case "meat":
      return Beef;
    case "dairy":
      return Milk;
    case "seafood":
      return Fish;
    default:
      return ShoppingCart;
  }
};

const NutritionBar = ({
  value,
  max,
  label,
  color,
}: {
  value: number;
  max: number;
  label: string;
  color: string;
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-zinc-400">
      <span>{label}</span>
      <span>{value}g</span>
    </div>
    <div className="h-1.5 rounded-full bg-zinc-800">
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-500 ease-out`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

type AnalysisCardProps = {
  items: FoodItem[];
  onUpdateQuantity?: (index: number, quantity: number) => void;
};

export function AnalysisCard({ items, onUpdateQuantity }: AnalysisCardProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    const item = items[index];
    if (!item) return;
    setEditingIndex(index);
    setEditValue(item.quantity);
  };

  const handleSave = (index: number) => {
    onUpdateQuantity?.(index, editValue);
    setEditingIndex(null);
  };

  return (
    <Card className="flex h-full flex-col border-zinc-800 bg-zinc-900">
      <CardContent className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500 min-h-0 flex-1 overflow-y-auto pt-4">
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = getCategoryIcon(item.category as FoodItem["category"]);
            return (
              <div key={index} className="relative">
                <Card className="overflow-hidden border-zinc-700 bg-zinc-800 transition-shadow hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-zinc-700 p-2">
                        <Icon className="h-5 w-5 text-zinc-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <span>Quantity:</span>
                          {editingIndex === index ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={editValue}
                                onChange={(e) =>
                                  setEditValue(Number(e.target.value))
                                }
                                className="h-7 w-20 border-zinc-600 bg-zinc-700"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSave(index);
                                }}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(index);
                                }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">
                          ${(item.estimatedPrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-zinc-400">
                          ${item.estimatedPrice.toFixed(2)} each
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() =>
                          setExpandedIndex(
                            expandedIndex === index ? null : index,
                          )
                        }
                      >
                        {expandedIndex === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {expandedIndex === index && (
                      <div className="border-t border-zinc-700 transition-[height,opacity] duration-200 ease-in-out">
                        <div className="mt-4 pt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-zinc-300">
                                Nutrition per serving
                              </span>
                              <span className="text-sm text-zinc-400">
                                {item.nutrition.calories} calories
                              </span>
                            </div>
                            <NutritionBar
                              value={item.nutrition.protein}
                              max={30}
                              label="Protein"
                              color="bg-emerald-500"
                            />
                            <NutritionBar
                              value={item.nutrition.carbs}
                              max={50}
                              label="Carbs"
                              color="bg-blue-500"
                            />
                            <NutritionBar
                              value={item.nutrition.fat}
                              max={20}
                              label="Fat"
                              color="bg-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
