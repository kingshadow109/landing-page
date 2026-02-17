/**
 * Style DNA Types and Interfaces
 * Defines the data structures for the style profiling system
 */

// Body Measurements
export interface BodyMeasurements {
  height: number; // in cm
  weight: number; // in kg
  bodyType: BodyType;
  shoulderWidth?: number;
  waistWidth?: number;
  hipWidth?: number;
}

export type BodyType = 
  | "hourglass" 
  | "pear" 
  | "apple" 
  | "rectangle" 
  | "inverted-triangle"
  | "athletic"
  | "not-sure";

// Skin Tone Analysis
export interface SkinToneAnalysis {
  undertone: Undertone;
  depth: SkinDepth;
  season: ColorSeason;
  bestColors?: string[];
  avoidColors?: string[];
}

export type Undertone = "warm" | "cool" | "neutral";
export type SkinDepth = "fair" | "light" | "medium" | "tan" | "deep" | "dark";
export type ColorSeason = "spring" | "summer" | "autumn" | "winter";

// Lifestyle
export interface LifestyleProfile {
  workEnvironment: WorkEnvironment;
  dressCode: DressCode;
  activities: Activity[];
  commuteType: CommuteType;
  climate: Climate;
  travelFrequency: Frequency;
}

export type WorkEnvironment = 
  | "corporate-office" 
  | "creative-studio" 
  | "remote-home" 
  | "hybrid" 
  | "outdoor" 
  | "healthcare" 
  | "retail-service" 
  | "education";

export type DressCode = 
  | "formal-business" 
  | "business-casual" 
  | "smart-casual" 
  | "casual" 
  | "uniform" 
  | "no-dress-code";

export type Activity = 
  | "fitness-gym" 
  | "yoga-pilates" 
  | "running" 
  | "hiking-outdoor" 
  | "dancing" 
  | "cycling" 
  | "swimming" 
  | "team-sports"
  | "traveling" 
  | "social-events" 
  | "dining-out" 
  | "nightlife" 
  | "arts-culture" 
  | "music-concerts";

export type CommuteType = "walking" | "public-transit" | "driving" | "cycling" | "mixed";
export type Climate = "tropical" | "dry" | "temperate" | "continental" | "polar";
export type Frequency = "never" | "rarely" | "sometimes" | "often" | "very-often";

// Style Preferences
export interface StylePreferences {
  archetypes: StyleArchetype[];
  aesthetic: AestheticType[];
  favoriteColors: string[];
  patternPreference: PatternPreference;
  fitPreference: FitPreference;
  accessoryStyle: AccessoryStyle;
}

export type StyleArchetype = 
  | "minimalist" 
  | "classic" 
  | "bohemian" 
  | "streetwear" 
  | "preppy" 
  | "edgy" 
  | "glamorous" 
  | "romantic" 
  | "sporty" 
  | "vintage" 
  | "artsy" 
  | "trendy";

export type AestheticType = 
  | "clean-lines" 
  | "oversized" 
  | "tailored" 
  | "layered" 
  | "monochrome" 
  | "colorful" 
  | "textured" 
  | "structured" 
  | "flowy";

export type PatternPreference = 
  | "solids-only" 
  | "subtle-patterns" 
  | "bold-patterns" 
  | "mixed-patterns";

export type FitPreference = 
  | "fitted" 
  | "relaxed" 
  | "oversized" 
  | "mixed-fits";

export type AccessoryStyle = 
  | "minimal" 
  | "statement" 
  | "layered" 
  | "functional" 
  | "none";

// Values Alignment
export interface ValuesAlignment {
  sustainability: PriorityLevel;
  ethicalLabor: PriorityLevel;
  localProduction: PriorityLevel;
  budgetPriority: BudgetPriority;
  qualityOverQuantity: boolean;
  secondhandComfortable: boolean;
  investmentPieces: string[];
}

export type PriorityLevel = "not-important" | "somewhat" | "important" | "very-important" | "dealbreaker";
export type BudgetPriority = "budget" | "mid-range" | "premium" | "luxury" | "mixed";

// Aspirational Style
export interface AspirationalStyle {
  pinterestBoardUrl?: string;
  styleIcons: string[];
  dreamWardrobeWords: string[];
  styleGoals: StyleGoal[];
  inspirationImages?: string[];
}

export type StyleGoal = 
  | "elevate-everyday" 
  | "build-capsule" 
  | "express-creativity" 
  | "look-professional" 
  | "feel-confident" 
  | "simplify-choices" 
  | "stay-trendy" 
  | "develop-signature";

// Complete Style DNA Profile
export interface StyleDNAProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  measurements: BodyMeasurements;
  skinTone: SkinToneAnalysis;
  lifestyle: LifestyleProfile;
  preferences: StylePreferences;
  values: ValuesAlignment;
  aspirational: AspirationalStyle;
  quizResults: QuizResults;
}

export interface QuizResults {
  primaryArchetype: StyleArchetype;
  secondaryArchetypes: StyleArchetype[];
  colorPalette: string[];
  recommendedBrands: string[];
  styleKeywords: string[];
}

// Quiz State
export interface QuizState {
  currentStep: number;
  totalSteps: number;
  answers: Partial<QuizAnswers>;
  isComplete: boolean;
}

export interface QuizAnswers {
  // Step 1: Body Measurements
  height: number;
  weight: number;
  bodyType: BodyType;
  
  // Step 2: Skin Tone
  undertone: Undertone;
  skinDepth: SkinDepth;
  veinColor: "green" | "purple" | "both";
  jewelryPreference: "gold" | "silver" | "both";
  sunReaction: "burn" | "tan" | "both";
  
  // Step 3: Lifestyle
  workEnvironment: WorkEnvironment;
  dressCode: DressCode;
  activities: Activity[];
  commuteType: CommuteType;
  climate: Climate;
  
  // Step 4: Style Preferences
  styleArchetypes: StyleArchetype[];
  aestheticPreferences: AestheticType[];
  patternPreference: PatternPreference;
  fitPreference: FitPreference;
  accessoryStyle: AccessoryStyle;
  
  // Step 5: Values
  sustainability: PriorityLevel;
  ethicalLabor: PriorityLevel;
  budgetPriority: BudgetPriority;
  qualityOverQuantity: boolean;
  
  // Step 6: Aspirational
  styleIcons: string[];
  styleGoals: StyleGoal[];
  dreamWords: string[];
}

// Quiz Step Configuration
export interface QuizStep {
  id: string;
  title: string;
  description: string;
  component: string;
  isOptional?: boolean;
}

// Color Palette
export interface ColorPalette {
  name: string;
  season: ColorSeason;
  undertone: Undertone;
  colors: {
    neutrals: string[];
    main: string[];
    accents: string[];
    avoid: string[];
  };
}

// Brand Recommendation
export interface BrandRecommendation {
  name: string;
  category: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  values: string[];
  styleMatch: StyleArchetype[];
  whyRecommended: string;
}
