/**
 * Main Style DNA Calculation Logic
 * Orchestrates all analysis modules to generate complete profile
 */

import { 
  QuizAnswers, 
  StyleDNAProfile, 
  QuizResults,
  StyleArchetype
} from "./types";
import { analyzeSkinTone } from "./colors";
import { calculateBodyType } from "./body-type";
import { calculateStyleArchetypes } from "./archetypes";
import { getBrandRecommendations } from "./brands";

/**
 * Generate complete Style DNA profile from quiz answers
 */
export function generateStyleDNAProfile(answers: QuizAnswers): StyleDNAProfile {
  const id = generateProfileId();
  const now = new Date().toISOString();
  
  // Analyze skin tone
  const skinTone = analyzeSkinTone({
    undertone: answers.undertone,
    skinDepth: answers.skinDepth,
    veinColor: answers.veinColor,
    jewelryPreference: answers.jewelryPreference,
    sunReaction: answers.sunReaction
  });
  
  // Calculate body type
  const bodyType = calculateBodyType({
    height: answers.height,
    weight: answers.weight,
    bodyType: answers.bodyType
  });
  
  // Calculate style archetypes
  const archetypeResults = calculateStyleArchetypes(answers);
  
  // Get brand recommendations
  const recommendedBrands = getBrandRecommendations(
    [archetypeResults.primary, ...archetypeResults.secondary],
    {
      sustainability: answers.sustainability,
      ethicalLabor: answers.ethicalLabor,
      localProduction: "somewhat",
      budgetPriority: answers.budgetPriority,
      qualityOverQuantity: answers.qualityOverQuantity,
      secondhandComfortable: true,
      investmentPieces: []
    }
  );
  
  // Generate style keywords
  const styleKeywords = generateStyleKeywords(
    archetypeResults.primary,
    answers.aestheticPreferences || [],
    answers.styleGoals || []
  );
  
  const profile: StyleDNAProfile = {
    id,
    createdAt: now,
    updatedAt: now,
    version: 1,
    measurements: {
      height: answers.height,
      weight: answers.weight,
      bodyType
    },
    skinTone,
    lifestyle: {
      workEnvironment: answers.workEnvironment,
      dressCode: answers.dressCode,
      activities: answers.activities || [],
      commuteType: answers.commuteType,
      climate: answers.climate,
      travelFrequency: "sometimes"
    },
    preferences: {
      archetypes: answers.styleArchetypes,
      aesthetic: answers.aestheticPreferences || [],
      favoriteColors: [],
      patternPreference: answers.patternPreference,
      fitPreference: answers.fitPreference,
      accessoryStyle: answers.accessoryStyle
    },
    values: {
      sustainability: answers.sustainability,
      ethicalLabor: answers.ethicalLabor,
      localProduction: "somewhat",
      budgetPriority: answers.budgetPriority,
      qualityOverQuantity: answers.qualityOverQuantity,
      secondhandComfortable: true,
      investmentPieces: []
    },
    aspirational: {
      styleIcons: answers.styleIcons || [],
      dreamWardrobeWords: answers.dreamWords || [],
      styleGoals: answers.styleGoals || []
    },
    quizResults: {
      primaryArchetype: archetypeResults.primary,
      secondaryArchetypes: archetypeResults.secondary,
      colorPalette: skinTone.bestColors || [],
      recommendedBrands: recommendedBrands.map(b => b.name),
      styleKeywords
    }
  };
  
  return profile;
}

/**
 * Generate style keywords based on archetype and preferences
 */
function generateStyleKeywords(
  primaryArchetype: StyleArchetype,
  aesthetics: string[],
  goals: string[]
): string[] {
  const keywords: string[] = [primaryArchetype];
  
  // Add aesthetic keywords
  const aestheticKeywords: Record<string, string[]> = {
    "clean-lines": ["minimal", "streamlined", "polished"],
    "oversized": ["relaxed", "comfortable", "modern"],
    "tailored": ["structured", "refined", "professional"],
    "layered": ["dimensional", "textured", "versatile"],
    "monochrome": ["cohesive", "elegant", "understated"],
    "colorful": ["vibrant", "expressive", "playful"],
    "textured": ["tactile", "rich", "interesting"],
    "structured": ["architectural", "defined", "bold"],
    "flowy": ["effortless", "feminine", "graceful"]
  };
  
  aesthetics.forEach(aesthetic => {
    const words = aestheticKeywords[aesthetic] || [];
    keywords.push(...words);
  });
  
  // Add goal-based keywords
  const goalKeywords: Record<string, string[]> = {
    "elevate-everyday": ["elevated", "effortless"],
    "build-capsule": ["curated", "versatile", "essential"],
    "express-creativity": ["creative", "unique", "personal"],
    "look-professional": ["polished", "professional", "confident"],
    "feel-confident": ["empowering", "flattering", "authentic"],
    "simplify-choices": ["streamlined", "easy", "functional"],
    "stay-trendy": ["current", "fashion-forward"],
    "develop-signature": ["distinctive", "personal", "iconic"]
  };
  
  goals.forEach(goal => {
    const words = goalKeywords[goal] || [];
    keywords.push(...words);
  });
  
  // Remove duplicates and limit
  return [...new Set(keywords)].slice(0, 10);
}

/**
 * Generate unique profile ID
 */
function generateProfileId(): string {
  return `style-dna-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Update existing profile with new answers
 */
export function updateStyleDNAProfile(
  existingProfile: StyleDNAProfile,
  newAnswers: Partial<QuizAnswers>
): StyleDNAProfile {
  // Merge existing answers with new ones
  const mergedAnswers: QuizAnswers = {
    // Use existing values as defaults, override with new
    height: newAnswers.height ?? existingProfile.measurements.height,
    weight: newAnswers.weight ?? existingProfile.measurements.weight,
    bodyType: newAnswers.bodyType ?? existingProfile.measurements.bodyType,
    undertone: newAnswers.undertone ?? existingProfile.skinTone.undertone,
    skinDepth: newAnswers.skinDepth ?? existingProfile.skinTone.depth,
    veinColor: newAnswers.veinColor ?? "both",
    jewelryPreference: newAnswers.jewelryPreference ?? "both",
    sunReaction: newAnswers.sunReaction ?? "tan",
    workEnvironment: newAnswers.workEnvironment ?? existingProfile.lifestyle.workEnvironment,
    dressCode: newAnswers.dressCode ?? existingProfile.lifestyle.dressCode,
    activities: newAnswers.activities ?? existingProfile.lifestyle.activities,
    commuteType: newAnswers.commuteType ?? existingProfile.lifestyle.commuteType,
    climate: newAnswers.climate ?? existingProfile.lifestyle.climate,
    styleArchetypes: newAnswers.styleArchetypes ?? existingProfile.preferences.archetypes,
    aestheticPreferences: newAnswers.aestheticPreferences ?? existingProfile.preferences.aesthetic,
    patternPreference: newAnswers.patternPreference ?? existingProfile.preferences.patternPreference,
    fitPreference: newAnswers.fitPreference ?? existingProfile.preferences.fitPreference,
    accessoryStyle: newAnswers.accessoryStyle ?? existingProfile.preferences.accessoryStyle,
    sustainability: newAnswers.sustainability ?? existingProfile.values.sustainability,
    ethicalLabor: newAnswers.ethicalLabor ?? existingProfile.values.ethicalLabor,
    budgetPriority: newAnswers.budgetPriority ?? existingProfile.values.budgetPriority,
    qualityOverQuantity: newAnswers.qualityOverQuantity ?? existingProfile.values.qualityOverQuantity,
    styleIcons: newAnswers.styleIcons ?? existingProfile.aspirational.styleIcons,
    styleGoals: newAnswers.styleGoals ?? existingProfile.aspirational.styleGoals,
    dreamWords: newAnswers.dreamWords ?? existingProfile.aspirational.dreamWardrobeWords
  };
  
  const updatedProfile = generateStyleDNAProfile(mergedAnswers);
  
  // Preserve original creation date and ID
  return {
    ...updatedProfile,
    id: existingProfile.id,
    createdAt: existingProfile.createdAt,
    updatedAt: new Date().toISOString(),
    version: existingProfile.version + 1
  };
}

/**
 * Get profile summary for display
 */
export function getProfileSummary(profile: StyleDNAProfile): {
  title: string;
  description: string;
  highlights: string[];
} {
  const { quizResults, measurements, skinTone } = profile;
  
  const title = `The ${capitalizeFirst(quizResults.primaryArchetype)}`;
  
  const secondaryText = quizResults.secondaryArchetypes.length > 0
    ? `with ${quizResults.secondaryArchetypes.slice(0, 2).map(capitalizeFirst).join(" and ")} influences`
    : "";
  
  const description = `Your Style DNA reveals a primary ${quizResults.primaryArchetype} aesthetic ${secondaryText}. 
    Your ${skinTone.season} color palette features ${skinTone.bestColors?.length || 0} flattering shades, 
    and your ${measurements.bodyType} shape opens up versatile styling possibilities.`;
  
  const highlights = [
    `Primary Style: ${capitalizeFirst(quizResults.primaryArchetype)}`,
    `Color Season: ${capitalizeFirst(skinTone.season)}`,
    `Body Type: ${capitalizeFirst(measurements.bodyType)}`,
    `Best Colors: ${skinTone.bestColors?.slice(0, 3).join(", ") || "N/A"}`,
    `Top Brands: ${quizResults.recommendedBrands.slice(0, 3).join(", ")}`
  ];
  
  return { title, description, highlights };
}

function capitalizeFirst(str: string): string {
  return str.split("-").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
}

// Re-export all modules
export * from "./types";
export * from "./colors";
export * from "./body-type";
export * from "./archetypes";
export * from "./brands";
