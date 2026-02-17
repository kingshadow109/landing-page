/**
 * Style Archetype Analysis
 * Determines primary and secondary style archetypes from preferences
 */

import { 
  StyleArchetype, 
  StylePreferences, 
  AestheticType,
  QuizAnswers 
} from "./types";

/**
 * Style archetype definitions with characteristics
 */
export const styleArchetypes: Record<StyleArchetype, {
  name: string;
  description: string;
  keywords: string[];
  colors: string[];
  fabrics: string[];
  silhouettes: string[];
  brands: string[];
}> = {
  minimalist: {
    name: "Minimalist",
    description: "Clean lines, neutral palette, quality over quantity",
    keywords: ["clean", "simple", "understated", "timeless", "curated"],
    colors: ["black", "white", "gray", "beige", "navy"],
    fabrics: ["cotton", "linen", "silk", "cashmere", "wool"],
    silhouettes: ["structured", "tailored", "streamlined"],
    brands: ["COS", "Everlane", "Uniqlo U", "ARKET", "The Row"]
  },
  classic: {
    name: "Classic",
    description: "Timeless elegance, traditional silhouettes, investment pieces",
    keywords: ["timeless", "polished", "refined", "elegant", "sophisticated"],
    colors: ["navy", "camel", "white", "burgundy", "forest green"],
    fabrics: ["wool", "tweed", "silk", "cotton", "leather"],
    silhouettes: ["tailored", "fitted", "structured"],
    brands: ["Brooks Brothers", "Ralph Lauren", "J.Crew", "Massimo Dutti", "Banana Republic"]
  },
  bohemian: {
    name: "Bohemian",
    description: "Free-spirited, eclectic, nature-inspired, artistic",
    keywords: ["free-spirited", "earthy", "artistic", "flowy", "eclectic"],
    colors: ["terracotta", "olive", "mustard", "rust", "cream"],
    fabrics: ["linen", "cotton", "suede", "velvet", "lace"],
    silhouettes: ["flowy", "loose", "layered"],
    brands: ["Free People", "Anthropologie", "Urban Outfitters", "Spell", "Dôen"]
  },
  streetwear: {
    name: "Streetwear",
    description: "Urban influence, casual cool, bold graphics, sneakers",
    keywords: ["urban", "edgy", "casual", "bold", "youthful"],
    colors: ["black", "white", "red", "neon accents", "camo"],
    fabrics: ["denim", "cotton", "nylon", "mesh", "jersey"],
    silhouettes: ["oversized", "relaxed", "layered"],
    brands: ["Supreme", "Nike", "Adidas", "Stüssy", "Off-White"]
  },
  preppy: {
    name: "Preppy",
    description: "Ivy League inspired, polished casual, collegiate",
    keywords: ["polished", "collegiate", "crisp", "cheerful", "put-together"],
    colors: ["navy", "pink", "green", "white", "kelly green"],
    fabrics: ["cotton", "tweed", "corduroy", "seersucker", "knit"],
    silhouettes: ["tailored", "fitted", "classic"],
    brands: ["Vineyard Vines", "Lilly Pulitzer", "Kate Spade", "Tory Burch", "GANT"]
  },
  edgy: {
    name: "Edgy",
    description: "Bold, rebellious, dark aesthetic, statement pieces",
    keywords: ["bold", "rebellious", "dark", "statement", "alternative"],
    colors: ["black", "charcoal", "deep red", "silver", "gunmetal"],
    fabrics: ["leather", "denim", "lace", "mesh", "velvet"],
    silhouettes: ["structured", "asymmetric", "deconstructed"],
    brands: ["AllSaints", "Rick Owens", "Alexander Wang", "Acne Studios", "Diesel"]
  },
  glamorous: {
    name: "Glamorous",
    description: "Luxurious, attention-grabbing, red-carpet ready",
    keywords: ["luxurious", "sparkling", "sophisticated", "dramatic", "elegant"],
    colors: ["gold", "black", "jewel tones", "metallics", "champagne"],
    fabrics: ["silk", "satin", "velvet", "sequins", "chiffon"],
    silhouettes: ["fitted", "flowing", "dramatic"],
    brands: ["Reformation", "Self-Portrait", "Zimmermann", "Sabinna", "Rotate"]
  },
  romantic: {
    name: "Romantic",
    description: "Soft, feminine, delicate details, pastel palette",
    keywords: ["feminine", "soft", "delicate", "dreamy", "whimsical"],
    colors: ["blush", "lavender", "mint", "cream", "soft pink"],
    fabrics: ["lace", "chiffon", "silk", "organza", "velvet"],
    silhouettes: ["flowy", "soft", "feminine"],
    brands: ["LoveShackFancy", "Selkie", "For Love & Lemons", "Reformation", "Ulla Johnson"]
  },
  sporty: {
    name: "Sporty",
    description: "Athletic-inspired, functional, comfortable, active",
    keywords: ["active", "functional", "comfortable", "casual", "energetic"],
    colors: ["black", "gray", "neon accents", "white", "team colors"],
    fabrics: ["technical fabrics", "jersey", "mesh", "spandex", "cotton"],
    silhouettes: ["fitted", "streamlined", "functional"],
    brands: ["Lululemon", "Alo Yoga", "Nike", "Adidas", "Outdoor Voices"]
  },
  vintage: {
    name: "Vintage",
    description: "Retro-inspired, nostalgic, thrifted treasures",
    keywords: ["retro", "nostalgic", "unique", "curated", "timeless"],
    colors: ["mustard", "rust", "olive", "burgundy", "cream"],
    fabrics: ["wool", "cotton", "denim", "velvet", "silk"],
    silhouettes: ["era-specific", "structured", "feminine"],
    brands: ["Rouje", "Sézane", "Reformation", "Christy Dawn", "Thrift/Vintage"]
  },
  artsy: {
    name: "Artsy",
    description: "Creative, unconventional, statement pieces, gallery-worthy",
    keywords: ["creative", "unconventional", "bold", "artistic", "unique"],
    colors: ["eclectic mix", "bold primaries", "unexpected combinations"],
    fabrics: ["mixed textures", "artisanal", "handcrafted", "sustainable"],
    silhouettes: ["sculptural", "architectural", "experimental"],
    brands: ["Issey Miyake", "Comme des Garçons", "Marimekko", "Gorman", "Independent designers"]
  },
  trendy: {
    name: "Trendy",
    description: "Fashion-forward, current, experimental, Instagram-ready",
    keywords: ["current", "fashion-forward", "experimental", "of-the-moment"],
    colors: ["seasonal trends", "Pantone colors", "viral shades"],
    fabrics: ["trending materials", "innovative textiles", "sustainable alternatives"],
    silhouettes: ["current trends", "viral styles", "influencer favorites"],
    brands: ["Zara", "H&M Trend", "& Other Stories", "Mango", "Revolve"]
  }
};

/**
 * Calculate style archetype scores based on quiz answers
 */
export function calculateStyleArchetypes(answers: Partial<QuizAnswers>): {
  primary: StyleArchetype;
  secondary: StyleArchetype[];
  scores: Record<StyleArchetype, number>;
} {
  const scores: Record<StyleArchetype, number> = {
    minimalist: 0,
    classic: 0,
    bohemian: 0,
    streetwear: 0,
    preppy: 0,
    edgy: 0,
    glamorous: 0,
    romantic: 0,
    sporty: 0,
    vintage: 0,
    artsy: 0,
    trendy: 0
  };
  
  // Score based on selected archetypes
  if (answers.styleArchetypes) {
    answers.styleArchetypes.forEach((archetype, index) => {
      // First choice gets more weight
      const weight = index === 0 ? 3 : 1;
      scores[archetype] += weight * 10;
    });
  }
  
  // Score based on aesthetic preferences
  if (answers.aestheticPreferences) {
    const aestheticMap: Record<AestheticType, StyleArchetype[]> = {
      "clean-lines": ["minimalist", "classic"],
      "oversized": ["streetwear", "artsy"],
      "tailored": ["classic", "preppy"],
      "layered": ["bohemian", "streetwear"],
      "monochrome": ["minimalist", "edgy"],
      "colorful": ["artsy", "trendy", "bohemian"],
      "textured": ["bohemian", "romantic", "vintage"],
      "structured": ["classic", "minimalist", "edgy"],
      "flowy": ["bohemian", "romantic", "vintage"]
    };
    
    answers.aestheticPreferences.forEach(aesthetic => {
      const matchingArchetypes = aestheticMap[aesthetic] || [];
      matchingArchetypes.forEach(archetype => {
        scores[archetype] += 5;
      });
    });
  }
  
  // Score based on pattern preference
  if (answers.patternPreference) {
    switch (answers.patternPreference) {
      case "solids-only":
        scores.minimalist += 8;
        scores.classic += 5;
        break;
      case "subtle-patterns":
        scores.classic += 5;
        scores.preppy += 5;
        break;
      case "bold-patterns":
        scores.bohemian += 8;
        scores.artsy += 8;
        break;
      case "mixed-patterns":
        scores.bohemian += 8;
        scores.artsy += 8;
        scores.trendy += 5;
        break;
    }
  }
  
  // Score based on fit preference
  if (answers.fitPreference) {
    switch (answers.fitPreference) {
      case "fitted":
        scores.classic += 5;
        scores.glamorous += 5;
        scores.sporty += 5;
        break;
      case "relaxed":
        scores.classic += 3;
        scores.bohemian += 5;
        break;
      case "oversized":
        scores.streetwear += 8;
        scores.minimalist += 5;
        break;
      case "mixed-fits":
        scores.trendy += 5;
        scores.artsy += 5;
        break;
    }
  }
  
  // Score based on accessory style
  if (answers.accessoryStyle) {
    switch (answers.accessoryStyle) {
      case "minimal":
        scores.minimalist += 8;
        break;
      case "statement":
        scores.glamorous += 8;
        scores.artsy += 5;
        break;
      case "layered":
        scores.bohemian += 8;
        scores.vintage += 5;
        break;
      case "functional":
        scores.sporty += 8;
        scores.minimalist += 3;
        break;
      case "none":
        scores.minimalist += 5;
        break;
    }
  }
  
  // Sort by score
  const sortedArchetypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([archetype]) => archetype as StyleArchetype);
  
  return {
    primary: sortedArchetypes[0],
    secondary: sortedArchetypes.slice(1, 4),
    scores
  };
}

/**
 * Get style archetype details
 */
export function getStyleArchetypeDetails(archetype: StyleArchetype) {
  return styleArchetypes[archetype];
}

/**
 * Get complementary archetypes
 */
export function getComplementaryArchetypes(primary: StyleArchetype): StyleArchetype[] {
  const complements: Record<StyleArchetype, StyleArchetype[]> = {
    minimalist: ["classic", "edgy", "sporty"],
    classic: ["minimalist", "preppy", "vintage"],
    bohemian: ["romantic", "vintage", "artsy"],
    streetwear: ["sporty", "edgy", "trendy"],
    preppy: ["classic", "sporty", "romantic"],
    edgy: ["streetwear", "minimalist", "artsy"],
    glamorous: ["romantic", "classic", "trendy"],
    romantic: ["bohemian", "vintage", "glamorous"],
    sporty: ["streetwear", "minimalist", "preppy"],
    vintage: ["bohemian", "romantic", "classic"],
    artsy: ["bohemian", "edgy", "trendy"],
    trendy: ["streetwear", "glamorous", "artsy"]
  };
  
  return complements[primary] || [];
}
