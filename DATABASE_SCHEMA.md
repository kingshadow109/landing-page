# WearX Database Schema

## Overview

Currently, WearX uses client-side LocalStorage for data persistence. This document defines the data models used throughout the application and serves as a specification for future backend database implementation.

## Current Storage Strategy

| Storage | Purpose | Persistence |
|---------|---------|-------------|
| LocalStorage | Wardrobe items, Style DNA, Weather cache | Browser-only |
| Environment Variables | API keys | Build-time |

## Future Database Recommendation

**Primary**: PostgreSQL 14+
**Cache**: Redis 7+
**File Storage**: AWS S3 or Cloudflare R2

---

## Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     User        │────▶│  StyleDNAProfile│────▶│  ColorPalette   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ email           │     │ userId (FK)     │     │ profileId (FK)  │
│ createdAt       │     │ bodyType        │     │ season          │
│ updatedAt       │     │ skinTone        │     │ colors[]        │
└─────────────────┘     │ workEnvironment │     └─────────────────┘
         │              │ styleArchetype  │
         │              │ createdAt       │
         │              └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  WardrobeItem   │────▶│   OutfitLog     │     │    Badge        │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ userId (FK)     │     │ userId (FK)     │     │ userId (FK)     │
│ name            │     │ outfitData (JSON)│    │ badgeId         │
│ category        │     │ date            │     │ unlockedAt      │
│ color           │     │ weather (JSON)  │     └─────────────────┘
│ purchasePrice   │     └─────────────────┘
│ timesWorn       │
└─────────────────┘
```

---

## Data Models

### 1. User

**Purpose**: User account information

```typescript
interface User {
  id: string;                    // UUID v4
  email: string;                 // Unique, validated
  emailVerified: boolean;        // Verification status
  createdAt: Date;               // Account creation
  updatedAt: Date;               // Last update
  lastLoginAt: Date;             // Last session
  preferences: UserPreferences;  // App settings
}

interface UserPreferences {
  tempUnit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}
```

**PostgreSQL Schema**:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_users_email ON users(email);
```

---

### 2. StyleDNAProfile

**Purpose**: Personal style profiling and recommendations

```typescript
interface StyleDNAProfile {
  id: string;
  userId: string;                // FK to User
  createdAt: Date;
  updatedAt: Date;
  version: number;               // Schema version
  
  // Physical characteristics
  measurements: BodyMeasurements;
  skinTone: SkinToneAnalysis;
  
  // Lifestyle
  lifestyle: LifestyleProfile;
  
  // Style preferences
  preferences: StylePreferences;
  
  // Values alignment
  values: ValuesAlignment;
  
  // Aspirational style
  aspirational: AspirationalStyle;
  
  // Calculated results
  quizResults: QuizResults;
}

interface BodyMeasurements {
  height: number;                // cm
  weight: number;                // kg
  bodyType: BodyType;
  shoulderWidth?: number;        // cm
  waistWidth?: number;           // cm
  hipWidth?: number;             // cm
}

type BodyType = 
  | 'hourglass' 
  | 'pear' 
  | 'apple' 
  | 'rectangle' 
  | 'inverted-triangle'
  | 'athletic'
  | 'not-sure';

interface SkinToneAnalysis {
  undertone: 'warm' | 'cool' | 'neutral';
  depth: 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  bestColors?: string[];
  avoidColors?: string[];
}

interface LifestyleProfile {
  workEnvironment: WorkEnvironment;
  dressCode: DressCode;
  activities: Activity[];
  commuteType: CommuteType;
  climate: Climate;
  travelFrequency: Frequency;
}

type WorkEnvironment = 
  | 'corporate-office' 
  | 'creative-studio' 
  | 'remote-home' 
  | 'hybrid' 
  | 'outdoor' 
  | 'healthcare' 
  | 'retail-service' 
  | 'education';

type DressCode = 
  | 'formal-business' 
  | 'business-casual' 
  | 'smart-casual' 
  | 'casual' 
  | 'uniform' 
  | 'no-dress-code';

type Activity = 
  | 'fitness-gym' 
  | 'yoga-pilates' 
  | 'running' 
  | 'hiking-outdoor' 
  | 'dancing' 
  | 'cycling' 
  | 'swimming' 
  | 'team-sports'
  | 'traveling' 
  | 'social-events' 
  | 'dining-out' 
  | 'nightlife' 
  | 'arts-culture' 
  | 'music-concerts';

type CommuteType = 'walking' | 'public-transit' | 'driving' | 'cycling' | 'mixed';
type Climate = 'tropical' | 'dry' | 'temperate' | 'continental' | 'polar';
type Frequency = 'never' | 'rarely' | 'sometimes' | 'often' | 'very-often';

interface StylePreferences {
  archetypes: StyleArchetype[];
  aesthetic: AestheticType[];
  favoriteColors: string[];
  patternPreference: PatternPreference;
  fitPreference: FitPreference;
  accessoryStyle: AccessoryStyle;
}

type StyleArchetype = 
  | 'minimalist' 
  | 'classic' 
  | 'bohemian' 
  | 'streetwear' 
  | 'preppy' 
  | 'edgy' 
  | 'glamorous' 
  | 'romantic' 
  | 'sporty' 
  | 'vintage' 
  | 'artsy' 
  | 'trendy';

type AestheticType = 
  | 'clean-lines' 
  | 'oversized' 
  | 'tailored' 
  | 'layered' 
  | 'monochrome' 
  | 'colorful' 
  | 'textured' 
  | 'structured' 
  | 'flowy';

type PatternPreference = 
  | 'solids-only' 
  | 'subtle-patterns' 
  | 'bold-patterns' 
  | 'mixed-patterns';

type FitPreference = 
  | 'fitted' 
  | 'relaxed' 
  | 'oversized' 
  | 'mixed-fits';

type AccessoryStyle = 
  | 'minimal' 
  | 'statement' 
  | 'layered' 
  | 'functional' 
  | 'none';

interface ValuesAlignment {
  sustainability: PriorityLevel;
  ethicalLabor: PriorityLevel;
  localProduction: PriorityLevel;
  budgetPriority: BudgetPriority;
  qualityOverQuantity: boolean;
  secondhandComfortable: boolean;
  investmentPieces: string[];
}

type PriorityLevel = 
  | 'not-important' 
  | 'somewhat' 
  | 'important' 
  | 'very-important' 
  | 'dealbreaker';

type BudgetPriority = 
  | 'budget' 
  | 'mid-range' 
  | 'premium' 
  | 'luxury' 
  | 'mixed';

interface AspirationalStyle {
  pinterestBoardUrl?: string;
  styleIcons: string[];
  dreamWardrobeWords: string[];
  styleGoals: StyleGoal[];
  inspirationImages?: string[];
}

type StyleGoal = 
  | 'elevate-everyday' 
  | 'build-capsule' 
  | 'express-creativity' 
  | 'look-professional' 
  | 'feel-confident' 
  | 'simplify-choices' 
  | 'stay-trendy' 
  | 'develop-signature';

interface QuizResults {
  primaryArchetype: StyleArchetype;
  secondaryArchetypes: StyleArchetype[];
  colorPalette: string[];
  recommendedBrands: string[];
  styleKeywords: string[];
}
```

**PostgreSQL Schema**:
```sql
CREATE TABLE style_dna_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INTEGER DEFAULT 1,
    measurements JSONB NOT NULL,
    skin_tone JSONB NOT NULL,
    lifestyle JSONB NOT NULL,
    preferences JSONB NOT NULL,
    values_alignment JSONB NOT NULL,
    aspirational JSONB NOT NULL,
    quiz_results JSONB NOT NULL
);

CREATE INDEX idx_style_dna_user ON style_dna_profiles(user_id);
```

---

### 3. WardrobeItem

**Purpose**: Individual clothing items in user's wardrobe

```typescript
interface WardrobeItem {
  id: string;                    // UUID v4
  userId: string;                // FK to User
  
  // Basic info
  name: string;
  category: Category;
  subcategory: string;
  
  // Visual attributes
  color: string;
  pattern: Pattern;
  material: string;
  
  // Style attributes
  style: Style;
  occasion: Occasion;
  season: Season;
  
  // Purchase info
  brand?: string;
  purchasePrice: number;         // In cents (store as integer)
  purchaseDate: Date;
  
  // Usage tracking
  timesWorn: number;
  lastWorn?: Date;
  
  // Media
  imageUrl?: string;             // S3/Cloudflare R2 URL
  
  // Condition
  condition: Condition;
  isFavorite: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

type Category = 
  | 'tops' 
  | 'bottoms' 
  | 'shoes' 
  | 'accessories' 
  | 'outerwear';

type Pattern = 
  | 'solid' 
  | 'striped' 
  | 'checkered' 
  | 'floral' 
  | 'graphic' 
  | 'polka-dot' 
  | 'animal-print' 
  | 'geometric' 
  | 'abstract';

type Style = 
  | 'casual' 
  | 'formal' 
  | 'business' 
  | 'streetwear' 
  | 'sporty' 
  | 'vintage' 
  | 'bohemian' 
  | 'minimalist' 
  | 'trendy';

type Occasion = 
  | 'everyday' 
  | 'work' 
  | 'party' 
  | 'workout' 
  | 'formal' 
  | 'special';

type Season = 
  | 'spring' 
  | 'summer' 
  | 'fall' 
  | 'winter' 
  | 'all-season';

type Condition = 
  | 'new' 
  | 'excellent' 
  | 'good' 
  | 'fair' 
  | 'worn';
```

**PostgreSQL Schema**:
```sql
CREATE TABLE wardrobe_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    pattern VARCHAR(50) NOT NULL,
    material VARCHAR(100) NOT NULL,
    style VARCHAR(50) NOT NULL,
    occasion VARCHAR(50) NOT NULL,
    season VARCHAR(50) NOT NULL,
    brand VARCHAR(255),
    purchase_price INTEGER NOT NULL, -- Stored in cents
    purchase_date DATE NOT NULL,
    times_worn INTEGER DEFAULT 0,
    last_worn DATE,
    image_url TEXT,
    condition VARCHAR(20) NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_wardrobe_user ON wardrobe_items(user_id);
CREATE INDEX idx_wardrobe_category ON wardrobe_items(category);
CREATE INDEX idx_wardrobe_color ON wardrobe_items(color);
```

---

### 4. OutfitLog

**Purpose**: Track when users wear outfits

```typescript
interface OutfitLog {
  id: string;                    // UUID v4
  userId: string;                // FK to User
  
  // Outfit composition
  items: string[];               // Array of WardrobeItem IDs
  outfitData: {
    top?: string;
    bottom?: string;
    shoes?: string;
    accessory?: string;
    outerwear?: string;
  };
  
  // When worn
  date: Date;
  
  // Context
  occasion?: string;
  notes?: string;
  rating?: number;               // 1-5 stars
  
  // Weather at time of wearing
  weather?: {
    temp: number;
    condition: string;
    location: string;
  };
  
  createdAt: Date;
}
```

**PostgreSQL Schema**:
```sql
CREATE TABLE outfit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    items UUID[] NOT NULL,
    outfit_data JSONB NOT NULL,
    date DATE NOT NULL,
    occasion VARCHAR(50),
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    weather JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_outfit_logs_user ON outfit_logs(user_id);
CREATE INDEX idx_outfit_logs_date ON outfit_logs(date);
```

---

### 5. Badge

**Purpose**: Achievement/badge tracking

```typescript
interface Badge {
  id: string;                    // UUID v4
  userId: string;                // FK to User
  badgeId: string;               // Reference to badge definition
  unlockedAt: Date;
  progress: number;
  maxProgress: number;
}

// Badge definitions (static/seed data)
interface BadgeDefinition {
  id: string;                    // Unique identifier
  name: string;
  description: string;
  icon: string;                  // Lucide icon name
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: string;             // Description of unlock condition
}
```

**PostgreSQL Schema**:
```sql
CREATE TABLE badge_definitions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    max_progress INTEGER NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    condition_description TEXT NOT NULL
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id VARCHAR(50) REFERENCES badge_definitions(id),
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress INTEGER DEFAULT 0,
    max_progress INTEGER NOT NULL,
    UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
```

---

### 6. WeatherCache

**Purpose**: Cache weather data to reduce API calls

```typescript
interface WeatherCache {
  id: string;                    // UUID v4
  location: {
    lat: number;
    lon: number;
    city: string;
    country: string;
  };
  
  // Weather data
  data: WeatherData;
  
  // Cache metadata
  fetchedAt: Date;
  expiresAt: Date;               // 15 minutes from fetch
}

interface WeatherData {
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    visibility: number;
    pressure: number;
    uvIndex: number;
    condition: WeatherCondition;
    description: string;
    icon: string;
  };
  precipitation: {
    type: 'none' | 'rain' | 'snow' | 'drizzle' | 'thunderstorm';
    intensity: 'none' | 'light' | 'moderate' | 'heavy';
    probability: number;
  };
  timestamp: number;
}

type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'fog'
  | 'wind';
```

**Redis Schema** (for caching):
```
Key: weather:{lat}:{lon}
Value: JSON string of WeatherData
TTL: 900 seconds (15 minutes)
```

---

## Indexes

### Performance Indexes

```sql
-- Wardrobe item lookups
CREATE INDEX idx_wardrobe_user_category ON wardrobe_items(user_id, category);
CREATE INDEX idx_wardrobe_user_color ON wardrobe_items(user_id, color);
CREATE INDEX idx_wardrobe_user_season ON wardrobe_items(user_id, season);

-- Outfit log queries
CREATE INDEX idx_outfit_logs_user_date ON outfit_logs(user_id, date DESC);

-- Badge lookups
CREATE INDEX idx_user_badges_unlocked ON user_badges(user_id, unlocked_at DESC);
```

---

## Migrations

### Initial Migration

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}'::jsonb
);

-- Style DNA Profiles
CREATE TABLE style_dna_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INTEGER DEFAULT 1,
    measurements JSONB NOT NULL,
    skin_tone JSONB NOT NULL,
    lifestyle JSONB NOT NULL,
    preferences JSONB NOT NULL,
    values_alignment JSONB NOT NULL,
    aspirational JSONB NOT NULL,
    quiz_results JSONB NOT NULL
);

-- Wardrobe Items
CREATE TABLE wardrobe_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    pattern VARCHAR(50) NOT NULL,
    material VARCHAR(100) NOT NULL,
    style VARCHAR(50) NOT NULL,
    occasion VARCHAR(50) NOT NULL,
    season VARCHAR(50) NOT NULL,
    brand VARCHAR(255),
    purchase_price INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    times_worn INTEGER DEFAULT 0,
    last_worn DATE,
    image_url TEXT,
    condition VARCHAR(20) NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outfit Logs
CREATE TABLE outfit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    items UUID[] NOT NULL,
    outfit_data JSONB NOT NULL,
    date DATE NOT NULL,
    occasion VARCHAR(50),
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    weather JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badge Definitions
CREATE TABLE badge_definitions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    max_progress INTEGER NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    condition_description TEXT NOT NULL
);

-- User Badges
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id VARCHAR(50) REFERENCES badge_definitions(id),
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress INTEGER DEFAULT 0,
    max_progress INTEGER NOT NULL,
    UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_style_dna_user ON style_dna_profiles(user_id);
CREATE INDEX idx_wardrobe_user ON wardrobe_items(user_id);
CREATE INDEX idx_wardrobe_category ON wardrobe_items(category);
CREATE INDEX idx_outfit_logs_user ON outfit_logs(user_id);
CREATE INDEX idx_outfit_logs_date ON outfit_logs(date);
CREATE INDEX idx_user_badges_user ON user_badges(user_id);
```

---

## Data Seeding

### Badge Definitions

```sql
INSERT INTO badge_definitions (id, name, description, icon, max_progress, rarity, condition_description) VALUES
('first-step', 'First Step', 'Added your first item to the wardrobe', 'Footprints', 1, 'common', 'Add 1 wardrobe item'),
('wardrobe-curator', 'Wardrobe Curator', 'Built a collection of 10+ items', 'Layers', 10, 'common', 'Add 10 wardrobe items'),
('fashion-archivist', 'Fashion Archivist', 'Documented 50+ pieces in your wardrobe', 'Archive', 50, 'rare', 'Add 50 wardrobe items'),
('first-wear', 'Style Pioneer', 'Logged your first outfit wear', 'Sparkles', 1, 'common', 'Log 1 outfit wear'),
('consistency-champion', 'Consistency Champion', 'Logged wears for 7 days in a row', 'Flame', 7, 'rare', '7-day streak'),
('dedication-master', 'Dedication Master', 'Maintained a 30-day tracking streak', 'Trophy', 30, 'epic', '30-day streak'),
('value-hunter', 'Value Hunter', 'Achieved $1 or less cost-per-wear on an item', 'Target', 1, 'rare', 'Get CPW ≤ $1 on any item'),
('smart-shopper', 'Smart Shopper', 'Have 5 items under $1 per wear', 'BadgeCheck', 5, 'epic', '5 items with CPW ≤ $1'),
('value-legend', 'Value Legend', 'Have 10 items under $1 per wear', 'Crown', 10, 'legendary', '10 items with CPW ≤ $1'),
('sustainability-starter', 'Green Starter', 'Logged 25 total wears across your wardrobe', 'Leaf', 25, 'common', '25 total wears'),
('eco-enthusiast', 'Eco Enthusiast', 'Logged 100 total wears - reducing waste!', 'Recycle', 100, 'rare', '100 total wears'),
('sustainability-hero', 'Sustainability Hero', '500+ wears - you''re making a real impact!', 'Globe', 500, 'legendary', '500 total wears'),
('hidden-treasure', 'Hidden Treasure', 'Found a gem: wore an item 10+ times', 'Gem', 10, 'rare', 'Any item worn 10+ times'),
('wardrobe-favorite', 'Wardrobe Favorite', 'An item reached 25 wears - a true staple!', 'Heart', 25, 'epic', 'Any item worn 25+ times'),
('lifetime-piece', 'Lifetime Piece', '50+ wears - this item is legendary!', 'Star', 50, 'legendary', 'Any item worn 50+ times'),
('mix-master', 'Mix Master', 'Wore items from 5 different categories', 'Palette', 5, 'rare', 'Wear from 5 categories'),
('style-explorer', 'Style Explorer', 'Wore items from 10 different categories', 'Compass', 10, 'epic', 'Wear from 10 categories'),
('conscious-curator', 'Conscious Curator', 'All items have been worn at least once', 'CheckCircle', 1, 'epic', 'Wear every item once');
```

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Architecture](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
