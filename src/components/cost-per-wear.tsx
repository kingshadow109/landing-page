"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  WardrobeItem,
  CostPerWearMetrics,
} from "@/lib/cost-per-wear-types";
import {
  calculateCPW,
  calculateUserStats,
  generateInsights,
  formatCurrency,
  getValueCategoryLabel,
  getValueCategoryColor,
  getValueCategoryDescription,
} from "@/lib/cost-per-wear";
import {
  getAllBadges,
  getNextBadges,
  getRarityColor,
  getRarityLabel,
  Badge,
} from "@/lib/badges";
import {
  TrendingDown,
  TrendingUp,
  Award,
  Sparkles,
  Heart,
  Target,
  Leaf,
  Zap,
  Shirt,
  Footprints,
  Crown,
  Gem,
  RefreshCw,
  CheckCircle,
  Compass,
  Palette,
  Archive,
  Layers,
  Flame,
  Trophy,
  BadgeCheck,
  Globe,
  Star,
  Sunrise,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

interface CostPerWearDashboardProps {
  items: WardrobeItem[];
  onLogWear?: (itemId: string) => void;
}

// Icon mapping for badges
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Layers,
  Archive,
  Sparkles,
  Flame,
  Trophy,
  Target,
  BadgeCheck,
  Crown,
  Leaf,
  Globe,
  Gem,
  Heart,
  Star,
  Palette,
  Compass,
  RefreshCw,
  CheckCircle,
  Sunrise,
};

export function CostPerWearDashboard({ items, onLogWear }: CostPerWearDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<"overview" | "badges" | "insights">("overview");

  const stats = useMemo(() => calculateUserStats(items), [items]);
  const insights = useMemo(() => generateInsights(items), [items]);
  const badges = useMemo(() => getAllBadges(items), [items]);
  const nextBadges = useMemo(() => getNextBadges(items, 3), [items]);
  const unlockedBadges = useMemo(() => badges.filter(b => b.isUnlocked), [badges]);

  // Calculate category distribution
  const categoryDistribution = useMemo(() => {
    const dist = items.reduce((acc, item) => {
      const metrics = calculateCPW(item);
      acc[metrics.valueCategory] = (acc[metrics.valueCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return dist;
  }, [items]);

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <Shirt className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Start Your Value Journey</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
            Add items to your wardrobe to unlock insights about your clothing value and sustainability impact.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: "overview", label: "Overview", icon: TrendingUp },
          { id: "badges", label: `Badges (${unlockedBadges.length})`, icon: Award },
          { id: "insights", label: "Insights", icon: Lightbulb },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className="flex-1"
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === "overview" && (
        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={Shirt}
              label="Total Items"
              value={stats.totalItems.toString()}
              subtext="in your wardrobe"
            />
            <StatCard
              icon={Footprints}
              label="Total Wears"
              value={stats.totalWears.toString()}
              subtext="outfits logged"
            />
            <StatCard
              icon={TrendingDown}
              label="Avg Cost/Wear"
              value={formatCurrency(stats.averageCPW)}
              subtext="getting better!"
              highlight={stats.averageCPW <= 5}
            />
            <StatCard
              icon={Target}
              label="Value Champions"
              value={stats.itemsUnderDollarPerWear.toString()}
              subtext="under $1/wear"
              highlight={stats.itemsUnderDollarPerWear > 0}
            />
          </div>

          {/* Wardrobe Value Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Your Wardrobe Value
              </CardTitle>
              <CardDescription>
                Track how your investment in quality pieces pays off over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Investment</p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(stats.totalWardrobeValue)}
                  </p>
                </div>
                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Value Unlocked</p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(stats.totalWears * stats.averageCPW)}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Sustainability Score</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                      {Math.round((stats.totalWears / Math.max(stats.totalItems, 1)) * 10)}
                    </p>
                    <span className="text-sm text-blue-600">/100</span>
                  </div>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-4">Your Wardrobe Breakdown</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'champion', label: 'Value Champions', icon: Crown },
                    { key: 'smart', label: 'Smart Buys', icon: BadgeCheck },
                    { key: 'developing', label: 'Building Value', icon: TrendingUp },
                    { key: 'potential', label: 'Ready to Shine', icon: Zap },
                  ].map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className={`p-3 rounded-lg ${getValueCategoryColor(key as CostPerWearMetrics['valueCategory'])}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{label}</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {categoryDistribution[key] || 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Value Items */}
          {insights.bestValue.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  Your Value Champions
                </CardTitle>
                <CardDescription>
                  Items delivering exceptional value per wear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.bestValue.slice(0, 3).map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      onLogWear={onLogWear}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === "badges" && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Your Collection</p>
                  <p className="text-2xl font-bold">
                    {unlockedBadges.length} <span className="text-zinc-400">/ {badges.length}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Completion</p>
                  <p className="text-2xl font-bold">
                    {Math.round((unlockedBadges.length / badges.length) * 100)}%
                  </p>
                </div>
              </div>
              <Progress
                value={(unlockedBadges.length / badges.length) * 100}
                className="mt-4"
              />
            </CardContent>
          </Card>

          {/* Next to Unlock */}
          {nextBadges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Almost There!
                </CardTitle>
                <CardDescription>
                  Keep going - you\'re close to unlocking these badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} showProgress />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Badges */}
          <Card>
            <CardHeader>
              <CardTitle>All Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insights Tab */}
      {selectedTab === "insights" && (
        <div className="space-y-6">
          {/* Quick Wins */}
          {insights.quickWins.length > 0 && (
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Zap className="w-5 h-5" />
                  Quick Wins
                </CardTitle>
                <CardDescription>
                  Wear these items 1-2 more times to reach the next value tier!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.quickWins.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      onLogWear={onLogWear}
                      showAction
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hidden Gems */}
          {insights.hiddenGems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-purple-500" />
                  Hidden Gems
                </CardTitle>
                <CardDescription>
                  Affordable pieces delivering amazing value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.hiddenGems.map((item) => (
                    <ItemRow key={item.id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Needs Love */}
          {insights.needsLove.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Ready to Shine
                </CardTitle>
                <CardDescription>
                  These pieces have potential - give them some attention!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.needsLove.slice(0, 3).map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      onLogWear={onLogWear}
                      showAction
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Investment Pieces */}
          {insights.investmentPieces.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Investment Pieces Paying Off
                </CardTitle>
                <CardDescription>
                  Higher-priced items you\'re wearing well
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.investmentPieces.map((item) => (
                    <ItemRow key={item.id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  highlight = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subtext: string;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-emerald-200 dark:border-emerald-800" : undefined}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${highlight ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-zinc-100 dark:bg-zinc-800"}`}>
            <Icon className={`w-4 h-4 ${highlight ? "text-emerald-600" : "text-zinc-600 dark:text-zinc-400"}`} />
          </div>
        </div>
        <p className="text-2xl font-bold mt-3">{value}</p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{label}</p>
        <p className={`text-xs mt-1 ${highlight ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"}`}>
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}

// Item Row Component
function ItemRow({
  item,
  onLogWear,
  showAction = false,
}: {
  item: WardrobeItem;
  onLogWear?: (itemId: string) => void;
  showAction?: boolean;
}) {
  const metrics = calculateCPW(item);

  return (
    <div className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          <Shirt className="w-6 h-6 text-zinc-400" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {item.timesWorn} wears • {formatCurrency(metrics.costPerWear)}/wear
        </p>
      </div>

      <div className="text-right">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getValueCategoryColor(metrics.valueCategory)}`}>
          {getValueCategoryLabel(metrics.valueCategory)}
        </span>
      </div>

      {showAction && onLogWear && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onLogWear(item.id)}
        >
          Log Wear
        </Button>
      )}
    </div>
  );
}

// Badge Card Component
function BadgeCard({
  badge,
  showProgress = false,
}: {
  badge: Badge;
  showProgress?: boolean;
}) {
  const IconComponent = iconMap[badge.icon] || Award;
  const progressPercent = (badge.progress / badge.maxProgress) * 100;

  return (
    <div
      className={`p-4 rounded-lg border ${
        badge.isUnlocked
          ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
          : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-75"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getRarityColor(badge.rarity)}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium">{badge.name}</p>
            <span className={`text-xs px-1.5 py-0.5 rounded ${getRarityColor(badge.rarity)}`}>
              {getRarityLabel(badge.rarity)}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{badge.description}</p>

          {(showProgress || !badge.isUnlocked) && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                <span className="font-medium">{badge.progress} / {badge.maxProgress}</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
