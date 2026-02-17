# Cost-Per-Wear Tracker - Gamification Design

## Research Summary: Gamifying Sustainability Without Shaming

Based on research into sustainable fashion apps and behavioral psychology, this feature uses **positive reinforcement** rather than guilt to encourage sustainable wardrobe habits.

### Key Principles Applied

#### 1. **Positive Framing Only**
- No "money waster" labels - instead use "Ready to Shine" for underutilized items
- No shame for high cost-per-wear - frame as "Building Value" or "Potential"
- Celebrate wins rather than highlighting losses

#### 2. **Progress Over Perfection**
- Badges for streaks and consistency, not just end goals
- "Almost There!" section showing progress toward badges
- Quick wins - items close to reaching the next value tier

#### 3. **Intrinsic Motivation**
- Focus on personal achievement rather than comparison
- Value Champions = items under $1/wear (smart choices)
- Sustainability score based on actual usage, not purchase price

#### 4. **Tangible Feedback**
- Real-time cost-per-wear calculations
- Projected annual value metrics
- Visual progress bars for badge completion

### Badge Categories

| Rarity | Examples | Psychology |
|--------|----------|------------|
| Common | First Step, Style Pioneer | Easy wins to build confidence |
| Rare | Value Hunter, Hidden Treasure | Recognize smart shopping |
| Epic | Smart Shopper, Wardrobe Favorite | Sustained good behavior |
| Legendary | Value Legend, Lifetime Piece | Exceptional achievement |

### Value Categories (Positive Language)

- **Value Champion** ($0-1/wear): "Outstanding value! This item has earned its place in your wardrobe."
- **Smart Buy** ($1-3/wear): "Great investment! You're getting excellent value from this piece."
- **Building Value** ($3-10/wear): "Building momentum! Keep wearing this to unlock more value."
- **Ready to Shine** ($10+/wear or unworn): "Full of potential! This piece is waiting for its moment to shine."

### Insights Sections

1. **Quick Wins** - Items 1-2 wears away from next tier (immediate gratification)
2. **Hidden Gems** - Affordable items with great value (smart shopping validation)
3. **Ready to Shine** - High-potential items needing attention (gentle nudge)
4. **Investment Pieces** - Higher-priced items being used well (justification)

### Why This Works

Research shows that:
- **Hedonic motivation** (fun/pleasure) drives behavior more than obligation
- **Progress indicators** create commitment and reduce abandonment
- **Positive reinforcement** builds lasting habits vs. guilt-based approaches
- **Personal milestones** are more motivating than social comparison

### References

1. "Gamifying Sustainability: Turning Eco-Choices into Playful Wins" - Digital Agency Network
2. "How Gamification Builds Long-Term Sustainable Habits" - The Traceability Hub
3. "Wardrobe Management Apps and Their Unintended Benefits for Fashion Sustainability" - ResearchGate

## Implementation

### Files Created

- `/src/lib/cost-per-wear-types.ts` - TypeScript interfaces
- `/src/lib/cost-per-wear.ts` - Calculation logic and insights
- `/src/lib/badges.ts` - Badge system and progress tracking
- `/src/components/cost-per-wear.tsx` - Dashboard component
- `/src/app/wardrobe/value/page.tsx` - Value tracking page
- `/src/components/ui/dialog.tsx` - Dialog component for add item
- `/src/components/ui/progress.tsx` - Progress bar component

### Key Features

1. **Cost-per-wear calculation** with projections
2. **Wardrobe value dashboard** with sustainability metrics
3. **20 badges** across 4 rarity tiers
4. **Smart insights** that encourage usage without shaming
5. **Demo data** for immediate visualization
