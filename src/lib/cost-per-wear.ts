import {
  WardrobeItem,
  CostPerWearMetrics,
  Badge,
  UserStats,
  WardrobeInsights,
} from "./cost-per-wear-types";

// Calculate cost-per-wear for an item
export function calculateCPW(item: WardrobeItem): CostPerWearMetrics {
  const costPerWear = item.timesWorn > 0 
    ? item.purchasePrice / item.timesWorn 
    : item.purchasePrice;
  
  // Calculate projected annual wears based on current usage pattern
  const daysSincePurchase = Math.max(
    1,
    (new Date().getTime() - new Date(item.purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const wearsPerDay = item.timesWorn / daysSincePurchase;
  const projectedAnnualWears = Math.round(wearsPerDay * 365);
  const projectedAnnualCPW = projectedAnnualWears > 0 
    ? item.purchasePrice / projectedAnnualWears 
    : item.purchasePrice;

  // Determine value category (positive framing only)
  let valueCategory: CostPerWearMetrics['valueCategory'];
  let sustainabilityScore: number;

  if (item.timesWorn === 0) {
    valueCategory = 'potential';
    sustainabilityScore = 50;
  } else if (costPerWear <= 1) {
    valueCategory = 'champion';
    sustainabilityScore = 95;
  } else if (costPerWear <= 3) {
    valueCategory = 'smart';
    sustainabilityScore = 80;
  } else if (costPerWear <= 10) {
    valueCategory = 'developing';
    sustainabilityScore = 60;
  } else {
    valueCategory = 'potential';
    sustainabilityScore = 40;
  }

  return {
    costPerWear: Math.round(costPerWear * 100) / 100,
    totalValue: item.timesWorn > 0 
      ? Math.round((item.timesWorn * costPerWear) * 100) / 100
      : 0,
    projectedAnnualWears,
    projectedAnnualCPW: Math.round(projectedAnnualCPW * 100) / 100,
    valueCategory,
    sustainabilityScore,
  };
}

// Get wardrobe-level statistics
export function calculateUserStats(items: WardrobeItem[]): UserStats {
  if (items.length === 0) {
    return {
      totalItems: 0,
      totalWears: 0,
      totalWardrobeValue: 0,
      averageCPW: 0,
      streakDays: 0,
      itemsUnderDollarPerWear: 0,
      sustainableChoices: 0,
    };
  }

  const totalWears = items.reduce((sum, item) => sum + item.timesWorn, 0);
  const totalWardrobeValue = items.reduce((sum, item) => sum + item.purchasePrice, 0);
  
  const itemsWithWears = items.filter(item => item.timesWorn > 0);
  const averageCPW = itemsWithWears.length > 0
    ? itemsWithWears.reduce((sum, item) => sum + calculateCPW(item).costPerWear, 0) / itemsWithWears.length
    : 0;

  const itemsUnderDollarPerWear = items.filter(item => {
    const cpw = calculateCPW(item);
    return cpw.costPerWear <= 1 && item.timesWorn > 0;
  }).length;

  // Find best value item (lowest CPW with significant wears)
  const bestValueItem = itemsWithWears.length > 0
    ? itemsWithWears.reduce((best, item) => {
        const bestCPW = calculateCPW(best).costPerWear;
        const itemCPW = calculateCPW(item).costPerWear;
        return itemCPW < bestCPW ? item : best;
      })
    : undefined;

  // Find most worn item
  const mostWornItem = items.reduce((most, item) => 
    item.timesWorn > most.timesWorn ? item : most
  , items[0]);

  return {
    totalItems: items.length,
    totalWears,
    totalWardrobeValue,
    averageCPW: Math.round(averageCPW * 100) / 100,
    bestValueItem,
    mostWornItem,
    streakDays: calculateStreak(items),
    itemsUnderDollarPerWear,
    sustainableChoices: Math.floor(totalWears * 0.3), // Estimated sustainable choices
  };
}

// Calculate current streak (consecutive days with at least one wear)
function calculateStreak(items: WardrobeItem[]): number {
  const wearDates = items
    .filter(item => item.lastWorn)
    .map(item => new Date(item.lastWorn!).toDateString());
  
  const uniqueDates = [...new Set(wearDates)].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (uniqueDates.length === 0) return 0;

  let streak = 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  // Check if streak is active (worn today or yesterday)
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate = new Date(Date.now() - i * 86400000).toDateString();
    if (uniqueDates[i] === expectedDate || (i === 0 && uniqueDates[i] === yesterday)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Generate wardrobe insights (positive framing)
export function generateInsights(items: WardrobeItem[]): WardrobeInsights {
  const itemsWithMetrics = items.map(item => ({
    item,
    metrics: calculateCPW(item),
  }));

  // Best value: Items with lowest CPW (champions)
  const bestValue = itemsWithMetrics
    .filter(({ metrics }) => metrics.valueCategory === 'champion')
    .sort((a, b) => a.metrics.costPerWear - b.metrics.costPerWear)
    .slice(0, 5)
    .map(({ item }) => item);

  // Needs love: Items with high potential but low wears
  const needsLove = itemsWithMetrics
    .filter(({ item, metrics }) => 
      item.timesWorn < 3 && 
      metrics.projectedAnnualWears > 20 &&
      item.purchasePrice > 50
    )
    .sort((a, b) => b.item.purchasePrice - a.item.purchasePrice)
    .slice(0, 5)
    .map(({ item }) => item);

  // Hidden gems: Affordable items with great potential
  const hiddenGems = itemsWithMetrics
    .filter(({ item, metrics }) => 
      item.purchasePrice < 100 &&
      metrics.projectedAnnualWears > 30 &&
      item.timesWorn >= 5
    )
    .sort((a, b) => a.metrics.costPerWear - b.metrics.costPerWear)
    .slice(0, 5)
    .map(({ item }) => item);

  // Investment pieces: Higher priced items being used well
  const investmentPieces = itemsWithMetrics
    .filter(({ item, metrics }) => 
      item.purchasePrice >= 200 &&
      metrics.valueCategory !== 'potential'
    )
    .sort((a, b) => a.metrics.costPerWear - b.metrics.costPerWear)
    .slice(0, 5)
    .map(({ item }) => item);

  // Quick wins: Items that need just 1-2 more wears to reach next tier
  const quickWins = itemsWithMetrics
    .filter(({ item, metrics }) => {
      if (item.timesWorn === 0) return false;
      const wearsToNextTier = Math.ceil(item.purchasePrice / (metrics.costPerWear * 0.8)) - item.timesWorn;
      return wearsToNextTier >= 1 && wearsToNextTier <= 3;
    })
    .sort((a, b) => a.item.timesWorn - b.item.timesWorn)
    .slice(0, 5)
    .map(({ item }) => item);

  return {
    bestValue,
    needsLove,
    hiddenGems,
    investmentPieces,
    quickWins,
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Get value category label (positive framing)
export function getValueCategoryLabel(category: CostPerWearMetrics['valueCategory']): string {
  const labels = {
    champion: 'Value Champion',
    smart: 'Smart Buy',
    developing: 'Building Value',
    potential: 'Ready to Shine',
  };
  return labels[category];
}

// Get value category color
export function getValueCategoryColor(category: CostPerWearMetrics['valueCategory']): string {
  const colors = {
    champion: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
    smart: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
    developing: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
    potential: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30',
  };
  return colors[category];
}

// Get value category description (encouraging)
export function getValueCategoryDescription(category: CostPerWearMetrics['valueCategory']): string {
  const descriptions = {
    champion: 'Outstanding value! This item has earned its place in your wardrobe.',
    smart: 'Great investment! You\'re getting excellent value from this piece.',
    developing: 'Building momentum! Keep wearing this to unlock more value.',
    potential: 'Full of potential! This piece is waiting for its moment to shine.',
  };
  return descriptions[category];
}
