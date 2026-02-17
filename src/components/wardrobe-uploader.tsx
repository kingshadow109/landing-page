"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Loader2, Camera } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  analyzing: boolean;
  analyzed: boolean;
  result?: ClothingAnalysis;
}

interface ClothingAnalysis {
  category: string;
  subcategory: string;
  color: string;
  pattern: string;
  material: string;
  style: string;
  occasion: string;
  season: string;
  confidence: number;
}

export function WardrobeUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith("image/")
    );
    
    addImages(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type.startsWith("image/")
    );
    
    addImages(files);
  }, []);

  const addImages = (files: File[]) => {
    const newImages: UploadedImage[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      analyzing: false,
      analyzed: false,
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const analyzeImage = async (id: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, analyzing: true } : img
      )
    );

    try {
      const image = images.find(img => img.id === id);
      if (!image) return;

      // Convert image to base64
      const base64 = await fileToBase64(image.file);

      // Call API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const result = await response.json();

      setImages(prev =>
        prev.map(img =>
          img.id === id
            ? { ...img, analyzing: false, analyzed: true, result }
            : img
        )
      );
    } catch (error) {
      console.error("Analysis error:", error);
      setImages(prev =>
        prev.map(img =>
          img.id === id ? { ...img, analyzing: false } : img
        )
      );
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging
            ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800"
            : "border-zinc-200 dark:border-zinc-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="py-12">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Upload your wardrobe
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Drag and drop photos, or click to browse
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="wardrobe-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="wardrobe-upload" className="cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                Select Photos
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={image.preview}
                  alt="Wardrobe item"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <CardContent className="p-3">
                {!image.analyzed && !image.analyzing && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => analyzeImage(image.id)}
                  >
                    Analyze
                  </Button>
                )}
                {image.analyzing && (
                  <Button size="sm" className="w-full" disabled>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </Button>
                )}
                {image.analyzed && image.result && (
                  <div className="text-xs space-y-1">
                    <p className="font-medium">{image.result.category}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {image.result.color} • {image.result.style}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
