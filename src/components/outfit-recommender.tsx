"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Shirt, Footprints, CircleDot, Wind, Briefcase } from "lucide-react";
import Image from "next/image";

interface OutfitItem {
  id: string;
  category: string;
  subcategory: string;
  color: string;
  style: string;
  imageUrl?: string;
}

interface Outfit {
  top?: OutfitItem;
  bottom?: OutfitItem;
  shoes?: OutfitItem;
  accessory?: OutfitItem;
  outerwear?: OutfitItem;
  score: number;
  reason: string;
}

export function OutfitRecommender() {
  const [occasion, setOccasion] = useState("everyday");
  const [season, setSeason] = useState("all-season");
  const [style, setStyle] = useState("casual");
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(false);

  const generateOutfits = async () => {
    setLoading(true);
    
    // Mock wardrobe for demo - in real app, fetch from database
    const mockWardrobe = [
      { id: "1", category: "tops", subcategory: "t-shirt", color: "white", style: "casual" },
      { id: "2", category: "tops", subcategory: "shirt", color: "blue", style: "formal" },
      { id: "3", category: "tops", subcategory: "sweater", color: "gray", style: "casual" },
      { id: "4", category: "bottoms", subcategory: "jeans", color: "navy", style: "casual" },
      { id: "5", category: "bottoms", subcategory: "pants", color: "beige", style: "formal" },
      { id: "6", category: "bottoms", subcategory: "shorts", color: "khaki", style: "casual" },
      { id: "7", category: "shoes", subcategory: "sneakers", color: "white", style: "sporty" },
      { id: "8", category: "shoes", subcategory: "loafers", color: "brown", style: "formal" },
      { id: "9", category: "accessories", subcategory: "watch", color: "silver", style: "minimalist" },
      { id: "10", category: "outerwear", subcategory: "jacket", color: "black", style: "casual" },
    ];

    try {
      const response = await fetch("/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wardrobe: mockWardrobe,
          occasion,
          season,
          style,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutfits(data.outfits);
      }
    } catch (error) {
      console.error("Failed to generate outfits:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.6) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="space-y-6">
      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Outfit Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Occasion</label>
              <Select value={occasion} onValueChange={setOccasion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyday">🌟 Everyday</SelectItem>
                  <SelectItem value="work">💼 Work</SelectItem>
                  <SelectItem value="party">🎉 Party</SelectItem>
                  <SelectItem value="workout">💪 Workout</SelectItem>
                  <SelectItem value="formal">👔 Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Season</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-season">🌈 All Season</SelectItem>
                  <SelectItem value="spring">🌸 Spring</SelectItem>
                  <SelectItem value="summer">☀️ Summer</SelectItem>
                  <SelectItem value="fall">🍂 Fall</SelectItem>
                  <SelectItem value="winter">❄️ Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">😎 Casual</SelectItem>
                  <SelectItem value="formal">👔 Formal</SelectItem>
                  <SelectItem value="streetwear">🔥 Streetwear</SelectItem>
                  <SelectItem value="minimalist">✨ Minimalist</SelectItem>
                  <SelectItem value="sporty">🏃 Sporty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateOutfits} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating outfits...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Outfits
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Outfit Results */}
      {outfits.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Outfits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outfits.map((outfit, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Outfit #{index + 1}
                    </CardTitle>
                    <span className={`text-sm font-bold ${getScoreColor(outfit.score)}`}>
                      {Math.round(outfit.score * 100)}% Match
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {outfit.top && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
                        <Shirt className="w-3 h-3" />
                        {outfit.top.color} {outfit.top.subcategory}
                      </div>
                    )}
                    {outfit.bottom && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
                        <Briefcase className="w-3 h-3" />
                        {outfit.bottom.color} {outfit.bottom.subcategory}
                      </div>
                    )}
                    {outfit.shoes && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
                        <Footprints className="w-3 h-3" />
                        {outfit.shoes.color} {outfit.shoes.subcategory}
                      </div>
                    )}
                    {outfit.accessory && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
                        <CircleDot className="w-3 h-3" />
                        {outfit.accessory.subcategory}
                      </div>
                    )}
                    {outfit.outerwear && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
                        <Wind className="w-3 h-3" />
                        {outfit.outerwear.color} {outfit.outerwear.subcategory}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {outfit.reason}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
