"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, ChevronDown, ChevronUp, Utensils, ShoppingCart, Apple, Beef, Fish, Milk } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface FoodItem {
  name: string
  quantity: number
  nutrition: Nutrition
  estimatedPrice: number
  category: "produce" | "dairy" | "meat" | "seafood" | "other"
}

const getCategoryIcon = (category: FoodItem["category"]) => {
  switch (category) {
    case "produce":
      return Apple
    case "meat":
      return Beef
    case "dairy":
      return Milk
    case "seafood":
      return Fish
    default:
      return ShoppingCart
  }
}

const NutritionBar = ({
  value,
  max,
  label,
  color,
}: {
  value: number
  max: number
  label: string
  color: string
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-zinc-400">
      <span>{label}</span>
      <span>{value}g</span>
    </div>
    <div className="h-1.5 rounded-full bg-zinc-800">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
)

type AnalysisCardProps = {
  items: FoodItem[]
  onUpdateQuantity?: (index: number, quantity: number) => void
}

export function AnalysisCard({ items, onUpdateQuantity }: AnalysisCardProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<number>(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setEditValue(items[index].quantity)
  }

  const handleSave = (index: number) => {
    onUpdateQuantity?.(index, editValue)
    setEditingIndex(null)
  }

  const totalCalories = items.reduce((acc, item) => acc + item.nutrition.calories * item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.estimatedPrice * item.quantity, 0)

  const searchRecipes = () => {
    const ingredients = items.map((item) => item.name).join(", ")
    window.open(`https://www.google.com/search?q=recipes+with+${encodeURIComponent(ingredients)}`, "_blank")
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Fridge Contents Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = getCategoryIcon(item.category)
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="overflow-hidden bg-zinc-800 border-zinc-700 transition-shadow hover:shadow-lg"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-zinc-700">
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
                                onChange={(e) => setEditValue(Number(e.target.value))}
                                className="w-20 h-7 bg-zinc-700 border-zinc-600"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSave(index)
                                }}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEdit(index)
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
                        <div className="text-xs text-zinc-400">${item.estimatedPrice.toFixed(2)} each</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      >
                        {expandedIndex === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 mt-4 border-t border-zinc-700"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-zinc-300">Nutrition per serving</span>
                              <span className="text-sm text-zinc-400">{item.nutrition.calories} calories</span>
                            </div>
                            <NutritionBar
                              value={item.nutrition.protein}
                              max={30}
                              label="Protein"
                              color="bg-emerald-500"
                            />
                            <NutritionBar value={item.nutrition.carbs} max={50} label="Carbs" color="bg-blue-500" />
                            <NutritionBar value={item.nutrition.fat} max={20} label="Fat" color="bg-amber-500" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="space-y-4 pt-6 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="text-zinc-400">Total Calories</div>
                <div className="text-2xl font-bold text-white">{totalCalories}</div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="text-zinc-400">Total Value</div>
                <div className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={searchRecipes}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Utensils className="w-4 h-4 mr-2" />
            Find Recipes with These Ingredients
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 