import { NextRequest, NextResponse } from "next/server";
import { WeatherData, WeatherOutfitGuidance, getWeatherOutfitGuidance, calculateWeatherScore } from "@/lib/weather";

interface ClothingItem {
  id: string;
  category: string;
  subcategory: string;
  color: string;
  pattern: string;
  material: string;
  style: string;
  occasion: string;
  season: string;
}

interface Outfit {
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  accessory?: ClothingItem;
  outerwear?: ClothingItem;
  score: number;
  weatherScore: number;
  reason: string;
  weatherAdvice: string;
}

interface WeatherParams {
  temp?: number;
  condition?: string;
  windSpeed?: number;
  uvIndex?: number;
  precipType?: 'none' | 'rain' | 'snow' | 'drizzle' | 'thunderstorm';
  precipIntensity?: 'none' | 'light' | 'moderate' | 'heavy';
  useWeather: boolean;
}

// Color compatibility matrix
const colorCompatibility: Record<string, string[]> = {
  black: ["white", "gray", "beige", "navy", "red", "pink", "yellow", "green", "blue", "black"],
  white: ["black", "navy", "gray", "beige", "blue", "green", "red", "pink", "yellow", "white"],
  navy: ["white", "beige", "gray", "pink", "yellow", "light blue", "navy"],
  gray: ["black", "white", "navy", "pink", "yellow", "green", "blue", "red", "gray"],
  beige: ["white", "navy", "black", "brown", "olive", "burgundy", "beige"],
  red: ["black", "white", "navy", "gray", "beige", "red"],
  blue: ["white", "beige", "gray", "navy", "yellow", "pink", "blue"],
  green: ["white", "beige", "navy", "gray", "brown", "green"],
  pink: ["white", "navy", "gray", "beige", "denim", "pink"],
  yellow: ["navy", "white", "gray", "denim", "beige", "yellow"],
  brown: ["beige", "white", "cream", "navy", "olive", "brown"],
  olive: ["beige", "white", "navy", "black", "brown", "cream", "olive"],
};

// Style compatibility
const styleCompatibility: Record<string, string[]> = {
  casual: ["casual", "streetwear", "sporty", "minimalist"],
  formal: ["formal", "business", "minimalist"],
  streetwear: ["streetwear", "casual", "sporty"],
  sporty: ["sporty", "casual", "streetwear"],
  minimalist: ["minimalist", "casual", "formal", "business"],
  vintage: ["vintage", "casual", "bohemian"],
  bohemian: ["bohemian", "vintage", "casual"],
  business: ["business", "formal", "minimalist"],
};

// Occasion requirements
const occasionRequirements: Record<string, { required: string[]; optional: string[] }> = {
  "everyday": { required: ["tops", "bottoms"], optional: ["shoes", "accessories", "outerwear"] },
  "work": { required: ["tops", "bottoms", "shoes"], optional: ["accessories", "outerwear"] },
  "party": { required: ["tops", "bottoms", "shoes"], optional: ["accessories", "outerwear"] },
  "workout": { required: ["tops", "bottoms", "shoes"], optional: ["accessories"] },
  "formal": { required: ["tops", "bottoms", "shoes"], optional: ["accessories", "outerwear"] },
};

export async function POST(request: NextRequest) {
  try {
    const { 
      wardrobe, 
      occasion = "everyday", 
      season = "all-season", 
      style = "casual",
      weather,
    } = await request.json();

    if (!wardrobe || wardrobe.length === 0) {
      return NextResponse.json(
        { error: "No wardrobe items provided" },
        { status: 400 }
      );
    }

    // Parse weather parameters
    const weatherParams: WeatherParams = {
      useWeather: weather?.useWeather ?? false,
      temp: weather?.temp,
      condition: weather?.condition,
      windSpeed: weather?.windSpeed,
      uvIndex: weather?.uvIndex,
      precipType: weather?.precipType,
      precipIntensity: weather?.precipIntensity,
    };

    // Generate outfit recommendations
    const outfits = generateOutfits(wardrobe, occasion, season, style, weatherParams);
    
    // Sort by combined score (base score + weather score if applicable)
    outfits.sort((a, b) => {
      const scoreA = weatherParams.useWeather ? (a.score + a.weatherScore) / 2 : a.score;
      const scoreB = weatherParams.useWeather ? (b.score + b.weatherScore) / 2 : b.score;
      return scoreB - scoreA;
    });

    return NextResponse.json({
      outfits: outfits.slice(0, 5), // Top 5 outfits
      occasion,
      season,
      style,
      weather: weatherParams.useWeather ? {
        applied: true,
        params: weatherParams,
      } : null,
    });
  } catch (error) {
    console.error("Outfit generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate outfits" },
      { status: 500 }
    );
  }
}

function generateOutfits(
  wardrobe: ClothingItem[],
  occasion: string,
  season: string,
  style: string,
  weatherParams: WeatherParams
): Outfit[] {
  const outfits: Outfit[] = [];
  
  // Group items by category
  const byCategory: Record<string, ClothingItem[]> = {
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: [],
    outerwear: [],
  };
  
  wardrobe.forEach(item => {
    const cat = item.category.toLowerCase();
    if (byCategory[cat]) {
      byCategory[cat].push(item);
    }
  });

  // Generate combinations
  const requirements = occasionRequirements[occasion] || occasionRequirements["everyday"];
  
  for (const top of byCategory.tops) {
    for (const bottom of byCategory.bottoms) {
      for (const shoes of byCategory.shoes.length > 0 ? byCategory.shoes : [undefined]) {
        for (const accessory of byCategory.accessories.length > 0 ? [...byCategory.accessories, undefined] : [undefined]) {
          for (const outerwear of byCategory.outerwear.length > 0 ? [...byCategory.outerwear, undefined] : [undefined]) {
            const outfit: Outfit = {
              top,
              bottom,
              shoes,
              accessory,
              outerwear,
              score: 0,
              weatherScore: 0.5, // Default weather score
              reason: "",
              weatherAdvice: "",
            };
            
            outfit.score = calculateScore(outfit, occasion, season, style);
            
            // Calculate weather score if weather params provided
            if (weatherParams.useWeather && weatherParams.temp !== undefined) {
              outfit.weatherScore = calculateOutfitWeatherScore(outfit, weatherParams);
              outfit.weatherAdvice = generateWeatherAdvice(outfit, weatherParams);
            }
            
            outfit.reason = generateReason(outfit);
            
            // Adjust minimum score threshold based on weather
            const minScore = weatherParams.useWeather ? 0.4 : 0.5;
            if (outfit.score > minScore) {
              outfits.push(outfit);
            }
          }
        }
      }
    }
  }

  return outfits;
}

function calculateScore(outfit: Outfit, occasion: string, season: string, style: string): number {
  let score = 0.5; // Base score
  const items = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory, outfit.outerwear].filter(Boolean) as ClothingItem[];
  
  if (items.length === 0) return 0;

  // Color compatibility (30%)
  const colors = items.map(i => i.color.toLowerCase());
  let colorScore = 0;
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      if (areColorsCompatible(colors[i], colors[j])) {
        colorScore += 1;
      }
    }
  }
  const maxColorPairs = (colors.length * (colors.length - 1)) / 2;
  score += (colorScore / maxColorPairs) * 0.3;

  // Style compatibility (25%)
  const styles = items.map(i => i.style.toLowerCase());
  let styleScore = 0;
  for (const itemStyle of styles) {
    if (areStylesCompatible(itemStyle, style.toLowerCase())) {
      styleScore += 1;
    }
  }
  score += (styleScore / styles.length) * 0.25;

  // Occasion match (20%)
  const occasions = items.map(i => i.occasion.toLowerCase());
  const occasionMatch = occasions.filter(o => o === occasion.toLowerCase() || o === "everyday").length;
  score += (occasionMatch / occasions.length) * 0.2;

  // Season match (15%)
  const seasons = items.map(i => i.season.toLowerCase());
  const seasonMatch = seasons.filter(s => s === season.toLowerCase() || s === "all-season").length;
  score += (seasonMatch / seasons.length) * 0.15;

  // Completeness bonus (10%)
  const hasRequired = outfit.top && outfit.bottom;
  const hasShoes = !!outfit.shoes;
  if (hasRequired) score += 0.05;
  if (hasShoes) score += 0.05;

  return Math.min(score, 1);
}

function calculateOutfitWeatherScore(outfit: Outfit, weather: WeatherParams): number {
  let score = 0.5; // Base score
  const items = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory, outfit.outerwear].filter(Boolean) as ClothingItem[];
  
  if (items.length === 0) return 0;
  
  const temp = weather.temp ?? 20;
  const precipType = weather.precipType ?? 'none';
  const windSpeed = weather.windSpeed ?? 0;
  const uvIndex = weather.uvIndex ?? 0;
  
  // Temperature appropriateness (40%)
  let tempScore = 0;
  
  for (const item of items) {
    const itemSeason = item.season?.toLowerCase() || 'all-season';
    const material = item.material?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    
    // Check season match for temperature
    if (itemSeason === 'all-season') {
      tempScore += 1;
    } else if (temp >= 25 && itemSeason === 'summer') {
      tempScore += 1;
    } else if (temp <= 10 && itemSeason === 'winter') {
      tempScore += 1;
    } else if (temp > 10 && temp < 25 && (itemSeason === 'spring' || itemSeason === 'fall')) {
      tempScore += 1;
    }
    
    // Material appropriateness
    if (temp >= 25) {
      // Hot weather - prefer breathable materials
      if (['cotton', 'linen', 'rayon', 'chambray'].some(m => material.includes(m))) {
        tempScore += 0.5;
      }
      if (['wool', 'fleece', 'down'].some(m => material.includes(m))) {
        tempScore -= 0.5;
      }
    } else if (temp <= 10) {
      // Cold weather - prefer warm materials
      if (['wool', 'cashmere', 'fleece', 'down', 'flannel'].some(m => material.includes(m))) {
        tempScore += 0.5;
      }
      if (['linen', 'mesh', 'thin cotton'].some(m => material.includes(m))) {
        tempScore -= 0.5;
      }
    }
    
    // Category appropriateness
    if (temp <= 5) {
      if (category === 'outerwear') tempScore += 0.3;
      if (category === 'accessories') tempScore += 0.2; // scarves, gloves
    } else if (temp >= 25) {
      if (category === 'outerwear') tempScore -= 0.3;
    }
  }
  
  score += (tempScore / (items.length * 2)) * 0.4;
  
  // Precipitation protection (25%)
  if (precipType !== 'none') {
    const hasOuterwear = !!outfit.outerwear;
    const hasWaterproofMaterial = items.some(item => 
      ['nylon', 'polyester', 'gore-tex', 'waterproof'].some(m => 
        item.material?.toLowerCase().includes(m)
      )
    );
    
    if (hasOuterwear) score += 0.15;
    if (hasWaterproofMaterial) score += 0.1;
    
    // Penalize suede and delicate materials in rain
    if (precipType === 'rain' || precipType === 'thunderstorm') {
      const hasDelicateMaterials = items.some(item =>
        ['suede', 'silk', 'velvet'].some(m => item.material?.toLowerCase().includes(m))
      );
      if (hasDelicateMaterials) score -= 0.2;
    }
  } else {
    score += 0.25; // No protection needed
  }
  
  // UV protection (15%)
  if (uvIndex >= 3) {
    const hasHat = items.some(item => 
      item.subcategory?.toLowerCase().includes('hat') ||
      item.subcategory?.toLowerCase().includes('cap')
    );
    const hasSunglasses = items.some(item =>
      item.subcategory?.toLowerCase().includes('sunglasses')
    );
    const hasLongSleeves = outfit.top?.subcategory?.toLowerCase().includes('long');
    
    if (hasHat) score += 0.05;
    if (hasSunglasses) score += 0.05;
    if (hasLongSleeves) score += 0.05;
  } else {
    score += 0.15;
  }
  
  // Wind protection (10%)
  if (windSpeed >= 15) {
    const hasOuterwear = !!outfit.outerwear;
    if (hasOuterwear) score += 0.1;
  } else {
    score += 0.1;
  }
  
  // Layer count appropriateness (10%)
  let expectedLayers = 1;
  if (temp <= -5) expectedLayers = 4;
  else if (temp <= 5) expectedLayers = 3;
  else if (temp <= 15) expectedLayers = 2;
  else if (temp <= 22) expectedLayers = 1;
  
  const actualLayers = items.filter(i => 
    i.category === 'tops' || i.category === 'outerwear'
  ).length;
  const layerDiff = Math.abs(actualLayers - expectedLayers);
  score += Math.max(0, 0.1 - layerDiff * 0.03);
  
  return Math.min(Math.max(score, 0), 1);
}

function generateWeatherAdvice(outfit: Outfit, weather: WeatherParams): string {
  const advice: string[] = [];
  const items = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory, outfit.outerwear].filter(Boolean) as ClothingItem[];
  
  const temp = weather.temp ?? 20;
  const precipType = weather.precipType ?? 'none';
  
  // Temperature advice
  if (temp >= 28) {
    const hasBreathable = items.some(item =>
      ['cotton', 'linen'].some(m => item.material?.toLowerCase().includes(m))
    );
    if (hasBreathable) advice.push("Breathable fabrics will keep you cool");
    else advice.push("Consider lighter fabrics for this heat");
  } else if (temp <= 5) {
    const hasOuterwear = !!outfit.outerwear;
    if (!hasOuterwear) advice.push("You might want to add a jacket");
  }
  
  // Precipitation advice
  if (precipType === 'rain' || precipType === 'thunderstorm') {
    const hasOuterwear = !!outfit.outerwear;
    if (hasOuterwear) advice.push("Good rain protection");
    else advice.push("Don't forget a rain jacket!");
  }
  
  return advice.join(". ");
}

function areColorsCompatible(color1: string, color2: string): boolean {
  if (color1 === color2) return true;
  const compatible = colorCompatibility[color1] || [];
  return compatible.includes(color2);
}

function areStylesCompatible(style1: string, style2: string): boolean {
  if (style1 === style2) return true;
  const compatible = styleCompatibility[style1] || [];
  return compatible.includes(style2);
}

function generateReason(outfit: Outfit): string {
  const parts: string[] = [];
  
  if (outfit.top && outfit.bottom) {
    parts.push(`${outfit.top.color} ${outfit.top.subcategory} with ${outfit.bottom.color} ${outfit.bottom.subcategory}`);
  }
  
  if (outfit.shoes) {
    parts.push(`complemented by ${outfit.shoes.color} ${outfit.shoes.subcategory}`);
  }
  
  if (outfit.accessory) {
    parts.push(`accented with ${outfit.accessory.subcategory}`);
  }
  
  return parts.join(", ");
}
