# WearX System Architecture

## Overview

WearX is a modern fashion tech application built with Next.js 16, React 19, and TypeScript. It provides AI-powered wardrobe management, outfit recommendations, and personal style profiling.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   React 19  │  │  Next.js 16 │  │    TypeScript 5.x       │  │
│  │   (UI)      │  │  (Framework)│  │    (Type Safety)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │    API      │  │    Components           │  │
│  │  (App Router)│  │  Routes     │  │   (UI Library)          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Service Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Style DNA │  │   Weather   │  │   Cost-Per-Wear         │  │
│  │   Engine    │  │   Service   │  │   Analytics             │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Outfit    │  │   Image     │  │    Badge/Achievement    │  │
│  │   Generator │  │   Analysis  │  │       System            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Services                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Gemini    │  │OpenWeatherMap│  │      Loops.so          │  │
│  │   (AI/ML)   │  │   (Weather)  │  │    (Email/CRM)         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Storage Layer                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              LocalStorage (Client-Side)                  │    │
│  │  - Wardrobe Items  - Style DNA Profile  - Weather Cache  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Core Framework
- **Next.js 16.1.6**: React framework with App Router
- **React 19.2.3**: UI library with latest features
- **TypeScript 5.x**: Type-safe development

### Styling
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **Radix UI**: Headless UI components (Select, Slot, Dialog)
- **Lucide React**: Icon library
- **next-themes**: Dark/light mode support

### State Management
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **LocalStorage**: Client-side persistence

### External APIs
- **Google Gemini**: AI-powered image analysis
- **OpenWeatherMap**: Weather data (1000 calls/day free tier)
- **Loops.so**: Email list management

## Project Structure

```
projects/landing-page/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes
│   │   │   ├── analyze/        # Image analysis endpoint
│   │   │   ├── outfits/        # Outfit recommendation endpoint
│   │   │   └── waitlist/       # Waitlist signup endpoint
│   │   ├── style-dna/          # Style DNA quiz page
│   │   ├── wardrobe/           # Wardrobe management pages
│   │   ├── outfits/            # Outfit recommendations page
│   │   ├── page.tsx            # Landing page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── style-dna-quiz.tsx  # Style DNA quiz component
│   │   ├── outfit-recommender.tsx
│   │   ├── wardrobe-uploader.tsx
│   │   └── ...
│   ├── lib/                    # Utility libraries
│   │   ├── style-dna/          # Style DNA engine
│   │   ├── weather.ts          # Weather integration
│   │   ├── cost-per-wear.ts    # CPW calculations
│   │   ├── badges.ts           # Badge system
│   │   └── utils.ts            # General utilities
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── dist/                       # Build output
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Key Components

### 1. Outfit Recommendation Engine

**Location**: `src/app/api/outfits/route.ts`

Generates outfit combinations using:
- Color compatibility matrix
- Style compatibility rules
- Occasion requirements
- Season matching
- Weather-based scoring

**Algorithm**:
1. Group wardrobe items by category
2. Generate all valid combinations
3. Score each outfit based on compatibility rules
4. Apply weather adjustments if enabled
5. Return top 5 recommendations

### 2. Style DNA Engine

**Location**: `src/lib/style-dna/`

Personal style profiling system:
- Body type analysis
- Skin tone color matching
- Lifestyle assessment
- Style archetype calculation
- Brand recommendations

**Key Features**:
- 9 style archetypes (Minimalist, Classic, Bohemian, etc.)
- Color palette generation based on skin tone
- Activity-based category recommendations

### 3. Weather Integration

**Location**: `src/lib/weather.ts`

Weather-aware outfit recommendations:
- OpenWeatherMap API integration
- Geolocation support
- Weather-based outfit guidance
- Temperature-appropriate material suggestions

**Features**:
- Current weather by coordinates or city
- 15-minute localStorage caching
- UV, wind, and precipitation considerations

### 4. Cost-Per-Wear Analytics

**Location**: `src/lib/cost-per-wear.ts`, `src/lib/badges.ts`

Wardrobe value tracking:
- CPW calculations
- Sustainability scoring
- Badge/achievement system
- Wardrobe insights

**Metrics**:
- Cost per wear
- Projected annual value
- Sustainability score
- Value categories (champion, smart, developing, potential)

### 5. Image Analysis

**Location**: `src/app/api/analyze/route.ts`

AI-powered clothing item recognition:
- Google Gemini integration
- Category detection
- Color, pattern, material identification
- Confidence scoring

## Data Flow

### Outfit Recommendation Flow

```
User selects occasion, season, style
         │
         ▼
┌─────────────────┐
│  Client sends   │
│  wardrobe data  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  POST /api/     │
│  outfits        │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Generate all   │
│  combinations   │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Score outfits  │
│  (color, style, │
│  occasion, etc) │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Apply weather  │
│  adjustments    │
│  (if enabled)   │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Return top 5   │
│  recommendations│
└─────────────────┘
```

### Image Analysis Flow

```
User uploads image
         │
         ▼
┌─────────────────┐
│  Convert to     │
│  base64         │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  POST /api/     │
│  analyze        │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Send to Gemini │
│  API            │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Parse response │
│  (extract JSON) │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Return item    │
│  metadata       │
└─────────────────┘
```

## Client-Side Storage

WearX uses LocalStorage for client-side persistence:

| Key | Data | Size Limit |
|-----|------|------------|
| `wearx-wardrobe` | Wardrobe items | ~5MB |
| `wearx-style-dna` | Style DNA profile | ~100KB |
| `wearx_weather` | Cached weather data | ~10KB |

**Note**: Future versions will migrate to a proper backend database.

## Performance Considerations

### Static Export
- Next.js configured for static export (`output: 'export'`)
- No server-side rendering at runtime
- All API calls are client-side or pre-rendered

### Caching
- Weather data cached for 15 minutes
- Images optimized at build time
- Component-level memoization where appropriate

### Bundle Size
- Tree-shaking enabled
- Dynamic imports for heavy components
- Lucide icons imported individually

## Security Considerations

### API Keys
- All API keys stored in environment variables
- Client-side keys prefixed with `NEXT_PUBLIC_`
- Server-side keys never exposed to client

### Image Uploads
- Base64 encoding for image transfer
- No persistent storage on server
- Gemini API handles image processing

### Data Privacy
- All user data stored locally
- No backend database (currently)
- No tracking cookies

## Scalability Roadmap

### Phase 1: Current (Static)
- Static site export
- Client-side storage
- External API dependencies

### Phase 2: Backend Integration
- Node.js/Express or Next.js API routes
- PostgreSQL database
- Redis caching
- User authentication

### Phase 3: Advanced Features
- Real-time weather updates
- Social features
- ML model training
- Mobile app

## Development Workflow

```bash
# Development
npm run dev

# Build
npm run build

# Export static site
npm run export

# Lint
npm run lint
```

## Deployment Targets

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Edge Functions**: Vercel Edge, Cloudflare Workers (future)

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
