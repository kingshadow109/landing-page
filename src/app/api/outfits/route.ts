import { NextRequest, NextResponse } from "next/server";

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
  reason: string;
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
    const { wardrobe, occasion = "everyday", season = "all-season", style = "casual" } = await request.json();

    if (!wardrobe || wardrobe.length === 0) {
      return NextResponse.json(
        { error: "No wardrobe items provided" },
        { status: 400 }
      );
    }

    // Generate outfit recommendations
    const outfits = generateOutfits(wardrobe, occasion, season, style);
    
    // Sort by score
    outfits.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      outfits: outfits.slice(0, 5), // Top 5 outfits
      occasion,
      season,
      style,
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
  style: string
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
              reason: "",
            };
            
            outfit.score = calculateScore(outfit, occasion, season, style);
            outfit.reason = generateReason(outfit);
            
            if (outfit.score > 0.5) {
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
