"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Shirt, Footprints, CircleDot, Wind, Briefcase, CloudRain, Sun, Thermometer } from "lucide-react";
import { WeatherWidget } from "./weather-widget";
import { WeatherData, WeatherOutfitGuidance } from "@/lib/weather";

interface OutfitItem {
  id: string;
  category: string;
  subcategory: string;
  color: string;
  style: string;
  material?: string;
  season?: string;
  imageUrl?: string;
}

interface Outfit {
  top?: OutfitItem;
  bottom?: OutfitItem;
  shoes?: OutfitItem;
  accessory?: OutfitItem;
  outerwear?: OutfitItem;
  score: number;
  weatherScore?: number;
  reason: string;
  weatherAdvice?: string;
}

export function OutfitRecommender() {
  const [occasion, setOccasion] = useState("everyday");
  const [season, setSeason] = useState("all-season");
  const [style, setStyle] = useState("casual");
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [guidance, setGuidance] = useState<WeatherOutfitGuidance | null>(null);
  const [useWeather, setUseWeather] = useState(false);

  const handleWeatherChange = (w: WeatherData, g: WeatherOutfitGuidance) => {
    setWeather(w);
    setGuidance(g);
    setUseWeather(true);
  };

  const generateOutfits = async () => {
    setLoading(true);
    
    // Mock wardrobe for demo - in real app, fetch from database
    const mockWardrobe = [
      { id: "1", category: "tops", subcategory: "t-shirt", color: "white", style: "casual", material: "cotton", season: "summer" },
      { id: "2", category: "tops", subcategory: "shirt", color: "blue", style: "formal", material: "cotton", season: "all-season" },
      { id: "3", category: "tops", subcategory: "sweater", color: "gray", style: "casual", material: "wool", season: "winter" },
      { id: "4", category: "tops", subcategory: "long-sleeve", color: "black", style: "casual", material: "cotton", season: "fall" },
      { id: "5", category: "bottoms", subcategory: "jeans", color: "navy", style: "casual", material: "denim", season: "all-season" },
      { id: "6", category: "bottoms", subcategory: "pants", color: "beige", style: "formal", material: "cotton", season: "all-season" },
      { id: "7", category: "bottoms", subcategory: "shorts", color: "khaki", style: "casual", material: "cotton", season: "summer" },
      { id: "8", category: "shoes", subcategory: "sneakers", color: "white", style: "sporty", material: "canvas", season: "all-season" },
      { id: "9", category: "shoes", subcategory: "loafers", color: "brown", style: "formal", material: "leather", season: "all-season" },
      { id: "10", category: "shoes", subcategory: "boots", color: "black", style: "casual", material: "leather", season: "winter" },
      { id: "11", category: "accessories", subcategory: "watch", color: "silver", style: "minimalist", material: "metal", season: "all-season" },
      { id: "12", category: "accessories", subcategory: "scarf", color: "red", style: "casual", material: "wool", season: "winter" },
      { id: "13", category: "accessories", subcategory: "sunglasses", color: "black", style: "casual", material: "plastic", season: "summer" },
      { id: "14", category: "accessories", subcategory: "hat", color: "beige", style: "casual", material: "cotton", season: "summer" },
      { id: "15", category: "outerwear", subcategory: "jacket", color: "black", style: "casual", material: "nylon", season: "fall" },
      { id: "16", category: "outerwear", subcategory: "coat", color: "navy", style: "formal", material: "wool", season: "winter" },
      { id: "17", category: "outerwear", subcategory: "rain-jacket", color: "yellow", style: "sporty", material: "nylon", season: "all-season" },
    ];

    try {
      // Build weather params if available
      const weatherParams = weather ? {
        useWeather: true,
        temp: weather.current.temp,
        condition: weather.current.condition,
        windSpeed: weather.current.windSpeed,
        uvIndex: weather.current.uvIndex,
        precipType: weather.precipitation.type,
        precipIntensity: weather.precipitation.intensity,
      } : { useWeather: false };

      const response = await fetch("/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wardrobe: mockWardrobe,
          occasion,
          season,
          style,
          weather: weatherParams,
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

  const getWeatherBadge = (outfit: Outfit) => {
    if (!useWeather || !outfit.weatherScore) return null;
    
    if (outfit.weatherScore >= 0.8) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <Sun className="w-3 h-3 mr-1" />
          Weather Perfect
        </Badge>
      );
    } else if (outfit.weatherScore >= 0.6) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          <Thermometer className="w-3 h-3 mr-1" />
          Weather OK
        </Badge>
      );
    } else if (outfit.weatherScore < 0.5) {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-700">
          <CloudRain className="w-3 h-3 mr-1" />
          Check Weather
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Preferences */}
        <div className="lg:col-span-2 space-y-6">
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
                    {useWeather ? "Generate Weather-Aware Outfits" : "Generate Outfits"}
                  </>
                )}
              </Button>
              
              {useWeather && weather && (
                <p className="text-xs text-center text-zinc-500">
                  Outfits will be ranked by weather appropriateness for {weather.current.temp}°C in {weather.location.city}
                </p>
              )}
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
                        <div className="flex items-center gap-2">
                          {getWeatherBadge(outfit)}
                          <span className={`text-sm font-bold ${getScoreColor(outfit.score)}`}>
                            {Math.round(outfit.score * 100)}% Match
                          </span>
                        </div>
                      </div>
                      
                      {useWeather && outfit.weatherScore !== undefined && (
                        <div className="mt-2 text-xs text-zinc-500">
                          Style: {Math.round(outfit.score * 100)}% | Weather: {Math.round(outfit.weatherScore * 100)}%
                        </div>
                      )}
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
                      
                      {outfit.weatherAdvice && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                          <CloudRain className="w-3 h-3" />
                          {outfit.weatherAdvice}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget 
            onWeatherChange={handleWeatherChange}
            className="sticky top-4"
          />
        </div>
      </div>
    </div>
  );
}
