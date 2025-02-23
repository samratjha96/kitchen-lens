import Image from "next/image";
import { X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  preview: string;
  onRemove: () => void;
  onChangeImage: () => void;
}

export function ImagePreview({ preview, onRemove, onChangeImage }: ImagePreviewProps) {
  return (
    <div className="relative h-full min-h-[300px] w-full">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute right-2 top-2 z-10 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
      <Image
        src={preview}
        alt="Preview"
        fill
        className="rounded-lg object-contain"
      />
      <Button
        type="button"
        variant="secondary"
        className="absolute bottom-2 right-2 z-10 border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
        onClick={onChangeImage}
      >
        <ImagePlus className="mr-2 h-4 w-4" />
        Change Image
      </Button>
    </div>
  );
} 