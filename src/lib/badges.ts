import { Badge, UserStats, WardrobeItem } from "./cost-per-wear-types";
import { calculateCPW, calculateUserStats } from "./cost-per-wear";

export type { Badge };

// Badge definitions with positive, encouraging language
export const BADGE_DEFINITIONS: Omit<Badge, "progress" | "isUnlocked" | "unlockedAt">[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Added your first item to the wardrobe",
    icon: "Footprints",
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "wardrobe-curator",
    name: "Wardrobe Curator",
    description: "Built a collection of 10+ items",
    icon: "Layers",
    maxProgress: 10,
    rarity: "common",
  },
  {
    id: "fashion-archivist",
    name: "Fashion Archivist",
    description: "Documented 50+ pieces in your wardrobe",
    icon: "Archive",
    maxProgress: 50,
    rarity: "rare",
  },
  {
    id: "first-wear",
    name: "Style Pioneer",
    description: "Logged your first outfit wear",
    icon: "Sparkles",
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "consistency-champion",
    name: "Consistency Champion",
    description: "Logged wears for 7 days in a row",
    icon: "Flame",
    maxProgress: 7,
    rarity: "rare",
  },
  {
    id: "dedication-master",
    name: "Dedication Master",
    description: "Maintained a 30-day tracking streak",
    icon: "Trophy",
    maxProgress: 30,
    rarity: "epic",
  },
  {
    id: "value-hunter",
    name: "Value Hunter",
    description: "Achieved $1 or less cost-per-wear on an item",
    icon: "Target",
    maxProgress: 1,
    rarity: "rare",
  },
  {
    id: "smart-shopper",
    name: "Smart Shopper",
    description: "Have 5 items under $1 per wear",
    icon: "BadgeCheck",
    maxProgress: 5,
    rarity: "epic",
  },
  {
    id: "value-legend",
    name: "Value Legend",
    description: "Have 10 items under $1 per wear",
    icon: "Crown",
    maxProgress: 10,
    rarity: "legendary",
  },
  {
    id: "sustainability-starter",
    name: "Green Starter",
    description: "Logged 25 total wears across your wardrobe",
    icon: "Leaf",
    maxProgress: 25,
    rarity: "common",
  },
  {
    id: "eco-enthusiast",
    name: "Eco Enthusiast",
    description: "Logged 100 total wears - reducing waste!",
    icon: "Recycle",
    maxProgress: 100,
    rarity: "rare",
  },
  {
    id: "sustainability-hero",
    name: "Sustainability Hero",
    description: "500+ wears - you're making a real impact!",
    icon: "Globe",
    maxProgress: 500,
    rarity: "legendary",
  },
  {
    id: "hidden-treasure",
    name: "Hidden Treasure",
    description: "Found a gem: wore an item 10+ times",
    icon: "Gem",
    maxProgress: 10,
    rarity: "rare",
  },
  {
    id: "wardrobe-favorite",
    name: "Wardrobe Favorite",
    description: "An item reached 25 wears - a true staple!",
    icon: "Heart",
    maxProgress: 25,
    rarity: "epic",
  },
  {
    id: "lifetime-piece",
    name: "Lifetime Piece",
    description: "50+ wears - this item is legendary!",
    icon: "Star",
    maxProgress: 50,
    rarity: "legendary",
  },
  {
    id: "mix-master",
    name: "Mix Master",
    description: "Wore items from 5 different categories",
    icon: "Palette",
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "style-explorer",
    name: "Style Explorer",
    description: "Wore items from 10 different categories",
    icon: "Compass",
    maxProgress: 10,
    rarity: "epic",
  },
  {
    id: "rediscovery",
    name: "Rediscovery",
    description: "Wore an item after 30+ days of rest",
    icon: "RefreshCw",
    maxProgress: 1,
    rarity: "rare",
  },
  {
    id: "conscious-curator",
    name: "Conscious Curator",
    description: "All items have been worn at least once",
    icon: "CheckCircle",
    maxProgress: 1,
    rarity: "epic",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Joined WearX in the early days",
    icon: "Sunrise",
    maxProgress: 1,
    rarity: "legendary",
  },
];

// Calculate badge progress based on user stats
export function calculateBadgeProgress(
  badgeId: string,
  items: WardrobeItem[]
): { progress: number; isUnlocked: boolean } {
  const stats = calculateUserStats(items);

  switch (badgeId) {
    case "first-step":
      return { progress: Math.min(stats.totalItems, 1), isUnlocked: stats.totalItems >= 1 };
    
    case "wardrobe-curator":
      return { progress: Math.min(stats.totalItems, 10), isUnlocked: stats.totalItems >= 10 };
    
    case "fashion-archivist":
      return { progress: Math.min(stats.totalItems, 50), isUnlocked: stats.totalItems >= 50 };
    
    case "first-wear":
      return { progress: Math.min(stats.totalWears, 1), isUnlocked: stats.totalWears >= 1 };
    
    case "consistency-champion":
      return { progress: Math.min(stats.streakDays, 7), isUnlocked: stats.streakDays >= 7 };
    
    case "dedication-master":
      return { progress: Math.min(stats.streakDays, 30), isUnlocked: stats.streakDays >= 30 };
    
    case "value-hunter": {
      const hasValueItem = items.some(item => {
        const cpw = calculateCPW(item);
        return cpw.costPerWear <= 1 && item.timesWorn > 0;
      });
      return { progress: hasValueItem ? 1 : 0, isUnlocked: hasValueItem };
    }
    
    case "smart-shopper":
      return { 
        progress: Math.min(stats.itemsUnderDollarPerWear, 5), 
        isUnlocked: stats.itemsUnderDollarPerWear >= 5 
      };
    
    case "value-legend":
      return { 
        progress: Math.min(stats.itemsUnderDollarPerWear, 10), 
        isUnlocked: stats.itemsUnderDollarPerWear >= 10 
      };
    
    case "sustainability-starter":
      return { progress: Math.min(stats.totalWears, 25), isUnlocked: stats.totalWears >= 25 };
    
    case "eco-enthusiast":
      return { progress: Math.min(stats.totalWears, 100), isUnlocked: stats.totalWears >= 100 };
    
    case "sustainability-hero":
      return { progress: Math.min(stats.totalWears, 500), isUnlocked: stats.totalWears >= 500 };
    
    case "hidden-treasure": {
      const hasTenWears = items.some(item => item.timesWorn >= 10);
      const maxWears = Math.max(...items.map(item => item.timesWorn), 0);
      return { progress: Math.min(maxWears, 10), isUnlocked: hasTenWears };
    }
    
    case "wardrobe-favorite": {
      const hasTwentyFiveWears = items.some(item => item.timesWorn >= 25);
      const maxWears = Math.max(...items.map(item => item.timesWorn), 0);
      return { progress: Math.min(maxWears, 25), isUnlocked: hasTwentyFiveWears };
    }
    
    case "lifetime-piece": {
      const hasFiftyWears = items.some(item => item.timesWorn >= 50);
      const maxWears = Math.max(...items.map(item => item.timesWorn), 0);
      return { progress: Math.min(maxWears, 50), isUnlocked: hasFiftyWears };
    }
    
    case "mix-master": {
      const categories = new Set(items.filter(i => i.timesWorn > 0).map(i => i.category)).size;
      return { progress: Math.min(categories, 5), isUnlocked: categories >= 5 };
    }
    
    case "style-explorer": {
      const categories = new Set(items.filter(i => i.timesWorn > 0).map(i => i.category)).size;
      return { progress: Math.min(categories, 10), isUnlocked: categories >= 10 };
    }
    
    case "rediscovery":
      // This would require tracking individual wear dates
      return { progress: 0, isUnlocked: false };
    
    case "conscious-curator": {
      const allWorn = items.length > 0 && items.every(item => item.timesWorn > 0);
      return { progress: allWorn ? 1 : 0, isUnlocked: allWorn };
    }
    
    case "early-bird":
      // Special badge - would be set based on join date
      return { progress: 1, isUnlocked: true };
    
    default:
      return { progress: 0, isUnlocked: false };
  }
}

// Get all badges with current progress
export function getAllBadges(items: WardrobeItem[]): Badge[] {
  return BADGE_DEFINITIONS.map(definition => {
    const { progress, isUnlocked } = calculateBadgeProgress(definition.id, items);
    return {
      ...definition,
      progress,
      isUnlocked,
      unlockedAt: isUnlocked ? new Date() : undefined,
    };
  });
}

// Get recently unlocked badges
export function getRecentlyUnlockedBadges(items: WardrobeItem[], daysAgo: number = 7): Badge[] {
  const allBadges = getAllBadges(items);
  const cutoffDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  
  return allBadges.filter(badge => 
    badge.isUnlocked && badge.unlockedAt && badge.unlockedAt > cutoffDate
  );
}

// Get next badges to unlock (encouragement)
export function getNextBadges(items: WardrobeItem[], limit: number = 3): Badge[] {
  const allBadges = getAllBadges(items);
  
  return allBadges
    .filter(badge => !badge.isUnlocked)
    .sort((a, b) => (b.progress / b.maxProgress) - (a.progress / a.maxProgress))
    .slice(0, limit);
}

// Get rarity color
export function getRarityColor(rarity: Badge['rarity']): string {
  const colors = {
    common: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800',
    rare: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
    epic: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
    legendary: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30',
  };
  return colors[rarity];
}

// Get rarity label
export function getRarityLabel(rarity: Badge['rarity']): string {
  const labels = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
  };
  return labels[rarity];
}
