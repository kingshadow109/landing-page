// Style DNA types and calculation logic

export interface StyleDNAProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Physical
  bodyType: BodyType;
  height?: number; // cm
  skinTone: SkinTone;
  
  // Lifestyle
  workEnvironment: WorkEnvironment;
  weeklyActivities: Activity[];
  commuteType: CommuteType;
  
  // Style
  stylePreferences: StylePreference[];
  colorPreferences: ColorPreference[];
  patternPreferences: PatternPreference[];
  
  // Values
  sustainabilityPriority: Priority;
  budgetPreference: BudgetPreference;
  brandValues: BrandValue[];
  
  // Aspirational
  styleIcons?: string[];
  pinterestBoard?: string;
  
  // Calculated
  styleArchetype: StyleArchetype;
  colorPalette: string[];
  recommendedCategories: string[];
}

export type BodyType = 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'inverted-triangle' | 'oval';

export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';

export type WorkEnvironment = 
  | 'formal-corporate' 
  | 'business-casual' 
  | 'smart-casual' 
  | 'casual' 
  | 'creative' 
  | 'remote';

export type Activity = 
  | 'gym' 
  | 'yoga' 
  | 'running' 
  | 'hiking' 
  | 'cycling' 
  | 'swimming'
  | 'dancing'
  | 'sports'
  | 'traveling'
  | 'social-events'
  | 'networking'
  | 'date-nights';

export type CommuteType = 'walking' | 'public-transit' | 'driving' | 'cycling' | 'remote';

export type StylePreference = 
  | 'minimalist'
  | 'classic'
  | 'trendy'
  | 'bohemian'
  | 'streetwear'
  | 'preppy'
  | 'edgy'
  | 'romantic'
  | 'sporty'
  | 'vintage'
  | 'luxury'
  | 'casual';

export type ColorPreference = 
  | 'neutrals'
  | 'earth-tones'
  | 'pastels'
  | 'jewel-tones'
  | 'bright-colors'
  | 'monochrome'
  | 'all-colors';

export type PatternPreference = 
  | 'solid-colors'
  | 'subtle-patterns'
  | 'stripes'
  | 'floral'
  | 'geometric'
  | 'animal-print'
  | 'mix-and-match';

export type Priority = 'low' | 'medium' | 'high' | 'essential';

export type BudgetPreference = 
  | 'budget-conscious'
  | 'mid-range'
  | 'investment-pieces'
  | 'luxury'
  | 'mix';

export type BrandValue = 
  | 'sustainable'
  | 'ethical-production'
  | 'local-made'
  | 'vegan'
  | 'size-inclusive'
  | 'transparent-pricing'
  | 'artisanal';

export type StyleArchetype = 
  | 'The Minimalist'
  | 'The Classic'
  | 'The Trendsetter'
  | 'The Bohemian'
  | 'The Urbanite'
  | 'The Professional'
  | 'The Athlete'
  | 'The Romantic'
  | 'The Eclectic';

// Color palettes by skin tone
export const skinToneColors: Record<SkinTone, string[]> = {
  fair: ['#F5E6D3', '#E8D4C4', '#D4A5A5', '#8B4513', '#2F4F4F', '#191970'],
  light: ['#FFE4C4', '#DEB887', '#CD853F', '#4682B4', '#556B2F', '#800080'],
  medium: ['#F4A460', '#D2691E', '#8B4513', '#228B22', '#4169E1', '#DC143C'],
  tan: ['#D2691E', '#8B4513', '#A0522D', '#006400', '#000080', '#8B0000'],
  deep: ['#8B4513', '#654321', '#4A3728', '#FFD700', '#FF6347', '#00CED1'],
  dark: ['#4A3728', '#2F1810', '#1A0F0A', '#FFD700', '#FF4500', '#00FF7F'],
};

// Calculate style archetype from preferences
export function calculateStyleArchetype(preferences: StylePreference[]): StyleArchetype {
  const scores: Record<StyleArchetype, number> = {
    'The Minimalist': 0,
    'The Classic': 0,
    'The Trendsetter': 0,
    'The Bohemian': 0,
    'The Urbanite': 0,
    'The Professional': 0,
    'The Athlete': 0,
    'The Romantic': 0,
    'The Eclectic': 0,
  };

  const mapping: Record<StylePreference, StyleArchetype[]> = {
    minimalist: ['The Minimalist'],
    classic: ['The Classic', 'The Professional'],
    trendy: ['The Trendsetter', 'The Urbanite'],
    bohemian: ['The Bohemian', 'The Romantic'],
    streetwear: ['The Urbanite', 'The Trendsetter'],
    preppy: ['The Classic', 'The Professional'],
    edgy: ['The Urbanite', 'The Trendsetter'],
    romantic: ['The Romantic', 'The Bohemian'],
    sporty: ['The Athlete'],
    vintage: ['The Classic', 'The Bohemian'],
    luxury: ['The Classic', 'The Professional'],
    casual: ['The Minimalist', 'The Classic'],
  };

  preferences.forEach(pref => {
    mapping[pref]?.forEach(archetype => {
      scores[archetype] += 1;
    });
  });

  // Return highest scoring archetype
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as StyleArchetype;
}

// Generate color palette from preferences
export function generateColorPalette(
  skinTone: SkinTone,
  colorPrefs: ColorPreference[]
): string[] {
  const baseColors = skinToneColors[skinTone] || skinToneColors.medium;
  
  // Add preference-based colors
  const preferenceColors: Record<ColorPreference, string[]> = {
    neutrals: ['#000000', '#FFFFFF', '#808080', '#C0C0C0', '#A9A9A9'],
    'earth-tones': ['#8B4513', '#D2691E', '#CD853F', '#DAA520', '#556B2F'],
    pastels: ['#FFB6C1', '#E6E6FA', '#F0E68C', '#98FB98', '#87CEEB'],
    'jewel-tones': ['#DC143C', '#4169E1', '#228B22', '#FFD700', '#800080'],
    'bright-colors': ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
    monochrome: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
    'all-colors': [],
  };

  let palette = [...baseColors];
  
  colorPrefs.forEach(pref => {
    if (pref !== 'all-colors') {
      palette = [...palette, ...preferenceColors[pref]];
    }
  });

  // Remove duplicates and limit to 12 colors
  return [...new Set(palette)].slice(0, 12);
}

// Get recommended categories based on profile
export function getRecommendedCategories(profile: Partial<StyleDNAProfile>): string[] {
  const categories: string[] = [];
  
  // Work-based recommendations
  if (profile.workEnvironment === 'formal-corporate') {
    categories.push('suits', 'dress-shirts', 'dress-pants', 'blazers');
  } else if (profile.workEnvironment === 'business-casual') {
    categories.push('button-downs', 'chinos', 'cardigans', 'loafers');
  } else if (profile.workEnvironment === 'creative') {
    categories.push('statement-pieces', 'unique-accessories', 'artistic-prints');
  }
  
  // Activity-based recommendations
  profile.weeklyActivities?.forEach(activity => {
    if (['gym', 'running', 'cycling'].includes(activity)) {
      categories.push('activewear', 'sneakers', 'sports-accessories');
    }
    if (['hiking', 'outdoor'].includes(activity)) {
      categories.push('outdoor-gear', 'hiking-boots', 'weather-resistant');
    }
    if (['social-events', 'date-nights', 'networking'].includes(activity)) {
      categories.push('evening-wear', 'dress-shoes', 'statement-jewelry');
    }
  });
  
  // Commute-based recommendations
  if (profile.commuteType === 'walking') {
    categories.push('comfortable-shoes', 'weather-appropriate-outerwear');
  }
  if (profile.commuteType === 'cycling') {
    categories.push('bike-friendly-clothing', 'reflective-gear');
  }
  
  return [...new Set(categories)];
}

// Save profile to localStorage
export function saveStyleDNA(profile: StyleDNAProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wearx-style-dna', JSON.stringify(profile));
  }
}

// Load profile from localStorage
export function loadStyleDNA(): StyleDNAProfile | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('wearx-style-dna');
    if (saved) {
      return JSON.parse(saved) as StyleDNAProfile;
    }
  }
  return null;
}
