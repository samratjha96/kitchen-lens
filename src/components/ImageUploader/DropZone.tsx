import { Upload } from "lucide-react";

interface DropZoneProps {
  onDrop: (file: File) => void;
  dragActive: boolean;
}

export function DropZone({ onDrop, dragActive }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e?.dataTransfer?.files?.[0];
    if (file) onDrop(file);
  };

  return (
    <label
      htmlFor="image-upload"
      className="flex cursor-pointer flex-col items-center gap-4 p-8 text-center"
    >
      <div className="rounded-full bg-muted p-4">
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
  );
} 