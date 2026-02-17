/**
 * Color Analysis Logic
 * Determines color season and palette based on skin tone analysis
 */

import { 
  Undertone, 
  SkinDepth, 
  ColorSeason, 
  ColorPalette,
  SkinToneAnalysis 
} from "./types";

// Color palettes for each season
export const colorPalettes: Record<ColorSeason, ColorPalette> = {
  spring: {
    name: "Spring",
    season: "spring",
    undertone: "warm",
    colors: {
      neutrals: ["#F5F5DC", "#FAEBD7", "#FFE4C4", "#DEB887", "#D2B48C"],
      main: ["#FF6B6B", "#FFB347", "#FFD700", "#98FB98", "#87CEEB", "#DDA0DD"],
      accents: ["#FF1493", "#00CED1", "#ADFF2F", "#FF4500", "#40E0D0"],
      avoid: ["#000080", "#4B0082", "#800080", "#2F4F4F", "#000000"]
    }
  },
  summer: {
    name: "Summer",
    season: "summer",
    undertone: "cool",
    colors: {
      neutrals: ["#F0F8FF", "#E6E6FA", "#D3D3D3", "#C0C0C0", "#A9A9A9"],
      main: ["#B0C4DE", "#DDA0DD", "#D8BFD8", "#98D8C8", "#F0E68C", "#FFB6C1"],
      accents: ["#9370DB", "#20B2AA", "#778899", "#BC8F8F", "#6495ED"],
      avoid: ["#FF4500", "#FF8C00", "#FFD700", "#8B4513", "#B8860B"]
    }
  },
  autumn: {
    name: "Autumn",
    season: "autumn",
    undertone: "warm",
    colors: {
      neutrals: ["#F5F5DC", "#D2B48C", "#8B7355", "#A0522D", "#696969"],
      main: ["#D2691E", "#CD853F", "#DAA520", "#228B22", "#8B0000", "#4B0082"],
      accents: ["#FF6347", "#B8860B", "#556B2F", "#8B4513", "#A0522D"],
      avoid: ["#00CED1", "#1E90FF", "#FF69B4", "#FF1493", "#E6E6FA"]
    }
  },
  winter: {
    name: "Winter",
    season: "winter",
    undertone: "cool",
    colors: {
      neutrals: ["#FFFFFF", "#F5F5F5", "#D3D3D3", "#808080", "#000000"],
      main: ["#DC143C", "#0000CD", "#006400", "#4B0082", "#FF1493", "#00CED1"],
      accents: ["#FF0000", "#000080", "#8B008B", "#008B8B", "#191970"],
      avoid: ["#D2B48C", "#DEB887", "#F4A460", "#BC8F8F", "#D2691E"]
    }
  }
};

/**
 * Determine color season based on undertone and skin depth
 */
export function determineColorSeason(
  undertone: Undertone,
  skinDepth: SkinDepth
): ColorSeason {
  if (undertone === "warm") {
    return skinDepth === "fair" || skinDepth === "light" ? "spring" : "autumn";
  } else {
    return skinDepth === "fair" || skinDepth === "light" ? "summer" : "winter";
  }
}

/**
 * Get color palette for a specific season
 */
export function getColorPalette(season: ColorSeason): ColorPalette {
  return colorPalettes[season];
}

/**
 * Analyze skin tone from quiz answers
 */
export function analyzeSkinTone(answers: {
  undertone: Undertone;
  skinDepth: SkinDepth;
  veinColor: "green" | "purple" | "both";
  jewelryPreference: "gold" | "silver" | "both";
  sunReaction: "burn" | "tan" | "both";
}): SkinToneAnalysis {
  // Validate undertone with additional signals
  let confirmedUndertone = answers.undertone;
  
  // Vein color check
  if (answers.veinColor === "green") {
    confirmedUndertone = "warm";
  } else if (answers.veinColor === "purple") {
    confirmedUndertone = "cool";
  }
  
  // Jewelry preference check
  if (answers.jewelryPreference === "gold") {
    confirmedUndertone = confirmedUndertone === "cool" ? "neutral" : "warm";
  } else if (answers.jewelryPreference === "silver") {
    confirmedUndertone = confirmedUndertone === "warm" ? "neutral" : "cool";
  }
  
  // Sun reaction check
  if (answers.sunReaction === "burn") {
    // Usually indicates cool undertone
    if (confirmedUndertone === "warm") confirmedUndertone = "neutral";
  }
  
  const season = determineColorSeason(confirmedUndertone, answers.skinDepth);
  const palette = getColorPalette(season);
  
  return {
    undertone: confirmedUndertone,
    depth: answers.skinDepth,
    season,
    bestColors: [...palette.colors.neutrals.slice(0, 3), ...palette.colors.main.slice(0, 4)],
    avoidColors: palette.colors.avoid.slice(0, 3)
  };
}

/**
 * Get hex color for display
 */
export function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    "cream": "#F5F5DC",
    "beige": "#F5F5DC",
    "taupe": "#D2B48C",
    "camel": "#C19A6B",
    "navy": "#000080",
    "charcoal": "#36454F",
    "black": "#000000",
    "white": "#FFFFFF",
    "ivory": "#FFFFF0",
    "gray": "#808080",
    "brown": "#8B4513",
    "burgundy": "#800020",
    "olive": "#808000",
    "teal": "#008080",
    "coral": "#FF7F50",
    "peach": "#FFDAB9",
    "mint": "#98FF98",
    "lavender": "#E6E6FA",
    "blush": "#DE5D83",
    "mustard": "#FFDB58"
  };
  
  return colorMap[colorName.toLowerCase()] || "#CCCCCC";
}

/**
 * Get contrasting text color (black or white) for a background
 */
export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
