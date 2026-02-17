// Types for Cost-Per-Wear tracking

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  color: string;
  brand?: string;
  purchasePrice: number;
  purchaseDate: Date;
  timesWorn: number;
  lastWorn?: Date;
  imageUrl?: string;
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'worn';
  isFavorite: boolean;
}

export interface CostPerWearMetrics {
  costPerWear: number;
  totalValue: number;
  projectedAnnualWears: number;
  projectedAnnualCPW: number;
  valueCategory: 'champion' | 'smart' | 'developing' | 'potential';
  sustainabilityScore: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeId: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalItems: number;
  totalWears: number;
  totalWardrobeValue: number;
  averageCPW: number;
  bestValueItem?: WardrobeItem;
  mostWornItem?: WardrobeItem;
  streakDays: number;
  itemsUnderDollarPerWear: number;
  sustainableChoices: number;
}

export interface WardrobeInsights {
  bestValue: WardrobeItem[];
  needsLove: WardrobeItem[];
  hiddenGems: WardrobeItem[];
  investmentPieces: WardrobeItem[];
  quickWins: WardrobeItem[];
}
