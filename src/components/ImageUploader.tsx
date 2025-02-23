"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Upload, X, Loader2, ImagePlus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { analyzeFridgeImage } from "@/services/fridgeAnalysis"
import type { FridgeAnalysis } from "@/types/fridge"

interface ImageUploaderProps {
  onAnalysisComplete: (analysis: FridgeAnalysis) => void;
  onAnalysisStart: () => void;
}

export function ImageUploader({ onAnalysisComplete, onAnalysisStart }: ImageUploaderProps) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
    const input = document.getElementById("image-upload") as HTMLInputElement
    if (input) input.value = ""
  }

  const handleAnalyze = async () => {
    if (!image) return
    onAnalysisStart()

    try {
      setLoading(true)
      const analysis = await analyzeFridgeImage(image)
      onAnalysisComplete(analysis)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-200 ease-in-out min-h-[400px]",
          dragActive ? "border-blue-500 bg-blue-500/5" : "border-zinc-800 hover:border-zinc-700",
          preview ? "bg-zinc-900" : "bg-zinc-900"
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />

        {preview ? (
          <div className="relative w-full h-full min-h-[300px]">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/10 text-white transition-all duration-300"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
            />
            <Button
              type="button"
              variant="secondary"
              className="absolute bottom-2 right-2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/10 text-white transition-all duration-300"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Change Image
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center gap-4 text-center p-8"
          >
            <div className="p-4 rounded-full bg-muted">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Drop your fridge photo here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, WEBP (max 10MB)
            </p>
          </label>
        )}

        {dragActive && (
          <div className="absolute inset-0 z-10 bg-primary/5 rounded-lg backdrop-blur-sm flex items-center justify-center">
            <p className="font-medium">Drop your image here</p>
          </div>
        )}
      </div>

      <Button
        onClick={handleAnalyze}
        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        disabled={!image || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing your fridge...
          </>
        ) : (
          "Analyze Contents"
        )}
      </Button>
    </Card>
  )
} 