/**
 * Brand Recommendations Logic
 * Suggests brands based on style DNA profile
 */

import { 
  StyleArchetype, 
  ValuesAlignment, 
  BudgetPriority,
  BrandRecommendation 
} from "./types";

// Brand database
const brandDatabase: BrandRecommendation[] = [
  // Sustainable/Ethical Brands
  {
    name: "Patagonia",
    category: "Outdoor/Casual",
    priceRange: "$$$",
    values: ["sustainability", "ethical-labor", "durability"],
    styleMatch: ["sporty", "classic", "minimalist"],
    whyRecommended: "Industry leader in sustainable practices with timeless outdoor wear"
  },
  {
    name: "Reformation",
    category: "Contemporary",
    priceRange: "$$$",
    values: ["sustainability", "trendy", "feminine"],
    styleMatch: ["romantic", "trendy", "glamorous", "vintage"],
    whyRecommended: "Sustainable fashion with vintage-inspired feminine designs"
  },
  {
    name: "Everlane",
    category: "Basics/Essentials",
    priceRange: "$$",
    values: ["transparency", "ethical-labor", "quality"],
    styleMatch: ["minimalist", "classic"],
    whyRecommended: "Radical transparency with modern basics"
  },
  {
    name: "Eileen Fisher",
    category: "Timeless",
    priceRange: "$$$$",
    values: ["sustainability", "ethical-labor", "timeless"],
    styleMatch: ["minimalist", "classic", "artsy"],
    whyRecommended: "Sustainable luxury with timeless, elegant pieces"
  },
  {
    name: "Christy Dawn",
    category: "Vintage-inspired",
    priceRange: "$$$",
    values: ["sustainability", "deadstock", "artisanal"],
    styleMatch: ["vintage", "bohemian", "romantic"],
    whyRecommended: "Beautiful dresses made from deadstock fabrics"
  },
  {
    name: "Kotn",
    category: "Basics",
    priceRange: "$$",
    values: ["ethical-labor", "sustainability", "quality"],
    styleMatch: ["minimalist", "classic"],
    whyRecommended: "Ethically-made Egyptian cotton basics"
  },
  {
    name: "Pact",
    category: "Basics/Organic",
    priceRange: "$",
    values: ["organic", "fair-trade", "affordability"],
    styleMatch: ["minimalist", "sporty", "classic"],
    whyRecommended: "Affordable organic cotton essentials"
  },
  {
    name: "Tentree",
    category: "Casual/Outdoor",
    priceRange: "$$",
    values: ["sustainability", "carbon-neutral", "tree-planting"],
    styleMatch: ["sporty", "minimalist", "streetwear"],
    whyRecommended: "Plants 10 trees for every item purchased"
  },
  
  // Mid-Range Brands
  {
    name: "COS",
    category: "Modern Minimalist",
    priceRange: "$$",
    values: ["design-focused", "quality"],
    styleMatch: ["minimalist", "artsy", "classic"],
    whyRecommended: "Architectural designs with quality fabrics"
  },
  {
    name: "ARKET",
    category: "Modern Essentials",
    priceRange: "$$",
    values: ["sustainability", "quality", "timeless"],
    styleMatch: ["minimalist", "classic", "preppy"],
    whyRecommended: "Nordic-inspired sustainable wardrobe staples"
  },
  {
    name: "Sézane",
    category: "French Chic",
    priceRange: "$$$",
    values: ["sustainability", "artisanal", "vintage-inspired"],
    styleMatch: ["vintage", "romantic", "classic", "bohemian"],
    whyRecommended: "Parisian elegance with sustainable practices"
  },
  {
    name: "Rouje",
    category: "French Vintage",
    priceRange: "$$$",
    values: ["vintage-inspired", "feminine"],
    styleMatch: ["vintage", "romantic", "classic"],
    whyRecommended: "Effortless French girl style"
  },
  {
    name: "Ganni",
    category: "Scandi Cool",
    priceRange: "$$$",
    values: ["responsibility", "trendy"],
    styleMatch: ["trendy", "edgy", "artsy", "glamorous"],
    whyRecommended: "Copenhagen cool with responsible practices"
  },
  {
    name: "Alo Yoga",
    category: "Athleisure",
    priceRange: "$$$",
    values: ["sustainability", "wellness"],
    styleMatch: ["sporty", "minimalist", "trendy"],
    whyRecommended: "Studio-to-street athleisure with eco-consciousness"
  },
  {
    name: "Lululemon",
    category: "Athletic",
    priceRange: "$$$",
    values: ["quality", "performance"],
    styleMatch: ["sporty", "classic", "minimalist"],
    whyRecommended: "Premium activewear that lasts"
  },
  {
    name: "Free People",
    category: "Bohemian",
    priceRange: "$$$",
    values: ["artisanal", "boho"],
    styleMatch: ["bohemian", "romantic", "vintage", "artsy"],
    whyRecommended: "Free-spirited bohemian fashion"
  },
  {
    name: "AllSaints",
    category: "Edgy/Urban",
    priceRange: "$$$",
    values: ["quality", "edgy"],
    styleMatch: ["edgy", "minimalist", "streetwear"],
    whyRecommended: "Effortlessly cool with premium leather and knits"
  },
  {
    name: "Acne Studios",
    category: "Scandi Minimalist",
    priceRange: "$$$$",
    values: ["design-focused", "quality"],
    styleMatch: ["minimalist", "edgy", "artsy", "trendy"],
    whyRecommended: "Scandinavian minimalism with an edge"
  },
  {
    name: "Zimmermann",
    category: "Luxury Resort",
    priceRange: "$$$$",
    values: ["luxury", "feminine"],
    styleMatch: ["romantic", "glamorous", "bohemian", "vintage"],
    whyRecommended: "Romantic luxury with beautiful details"
  },
  
  // Budget-Friendly
  {
    name: "Uniqlo",
    category: "Basics",
    priceRange: "$",
    values: ["affordability", "functionality", "quality"],
    styleMatch: ["minimalist", "classic", "preppy", "sporty"],
    whyRecommended: "Quality basics at accessible prices"
  },
  {
    name: "Uniqlo U",
    category: "Designer Basics",
    priceRange: "$",
    values: ["design", "affordability"],
    styleMatch: ["minimalist", "artsy", "classic"],
    whyRecommended: "Designer collaborations at Uniqlo prices"
  },
  {
    name: "Mango",
    category: "Contemporary",
    priceRange: "$$",
    values: ["trendy", "accessible"],
    styleMatch: ["trendy", "classic", "glamorous"],
    whyRecommended: "Spanish style with on-trend pieces"
  },
  {
    name: "Zara",
    category: "Fast Fashion",
    priceRange: "$$",
    values: ["trendy", "accessible"],
    styleMatch: ["trendy", "classic", "glamorous", "minimalist"],
    whyRecommended: "Latest runway trends at high street prices"
  },
  {
    name: "H&M",
    category: "Fast Fashion",
    priceRange: "$",
    values: ["affordability", "conscious-collection"],
    styleMatch: ["trendy", "classic", "minimalist", "streetwear"],
    whyRecommended: "Trendy pieces with Conscious collection options"
  },
  {
    name: "ASOS",
    category: "Online Marketplace",
    priceRange: "$",
    values: ["variety", "affordability"],
    styleMatch: ["trendy", "streetwear", "glamorous", "edgy", "vintage"],
    whyRecommended: "Huge variety for every style"
  },
  {
    name: "& Other Stories",
    category: "Creative Fashion",
    priceRange: "$$",
    values: ["creativity", "quality"],
    styleMatch: ["trendy", "romantic", "classic", "artsy"],
    whyRecommended: "Creative designs with Parisian atelier"
  },
  {
    name: "Madewell",
    category: "Casual American",
    priceRange: "$$",
    values: ["denim", "casual"],
    styleMatch: ["classic", "bohemian", "vintage"],
    whyRecommended: "Great denim with laid-back style"
  },
  {
    name: "J.Crew",
    category: "Preppy Classic",
    priceRange: "$$",
    values: ["classic", "preppy"],
    styleMatch: ["preppy", "classic", "sporty"],
    whyRecommended: "American preppy with quality materials"
  },
  {
    name: "Ralph Lauren",
    category: "Heritage",
    priceRange: "$$$",
    values: ["heritage", "quality", "classic"],
    styleMatch: ["preppy", "classic", "glamorous"],
    whyRecommended: "Timeless American luxury"
  }
];

/**
 * Get brand recommendations based on style and values
 */
export function getBrandRecommendations(
  archetypes: StyleArchetype[],
  values: ValuesAlignment,
  count: number = 8
): BrandRecommendation[] {
  let scoredBrands = brandDatabase.map(brand => {
    let score = 0;
    
    // Style match score
    const styleMatches = brand.styleMatch.filter(style => 
      archetypes.includes(style)
    ).length;
    score += styleMatches * 10;
    
    // Values alignment score
    if (values.sustainability === "very-important" || values.sustainability === "dealbreaker") {
      if (brand.values.includes("sustainability") || brand.values.includes("organic")) {
        score += 15;
      }
    } else if (values.sustainability === "important") {
      if (brand.values.includes("sustainability")) {
        score += 8;
      }
    }
    
    if (values.ethicalLabor === "very-important" || values.ethicalLabor === "dealbreaker") {
      if (brand.values.includes("ethical-labor") || brand.values.includes("fair-trade")) {
        score += 15;
      }
    }
    
    // Budget alignment
    const priceMap: Record<BudgetPriority, string[]> = {
      "budget": ["$"],
      "mid-range": ["$", "$$"],
      "premium": ["$$", "$$$"],
      "luxury": ["$$$", "$$$$"],
      "mixed": ["$", "$$", "$$$", "$$$$"]
    };
    
    if (priceMap[values.budgetPriority].includes(brand.priceRange)) {
      score += 5;
    }
    
    return { brand, score };
  });
  
  // Sort by score and return top recommendations
  scoredBrands.sort((a, b) => b.score - a.score);
  
  return scoredBrands.slice(0, count).map(({ brand }) => brand);
}

/**
 * Get brands by specific criteria
 */
export function getBrandsByCriteria(criteria: {
  style?: StyleArchetype;
  priceRange?: string;
  values?: string[];
}): BrandRecommendation[] {
  return brandDatabase.filter(brand => {
    let matches = true;
    
    if (criteria.style && !brand.styleMatch.includes(criteria.style)) {
      matches = false;
    }
    
    if (criteria.priceRange && brand.priceRange !== criteria.priceRange) {
      matches = false;
    }
    
    if (criteria.values && !criteria.values.some(v => brand.values.includes(v))) {
      matches = false;
    }
    
    return matches;
  });
}
