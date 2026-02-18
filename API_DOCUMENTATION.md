# WearX API Documentation

## Overview

WearX is a Next.js-based fashion tech application that provides AI-powered wardrobe management, outfit recommendations, and style profiling. This document covers all API endpoints available in the system.

**Base URL**: `/api`

**Content-Type**: `application/json`

---

## Authentication

Currently, the API does not implement authentication. Future versions will include JWT-based authentication.

---

## Endpoints

### 1. Outfit Recommendations

**Endpoint**: `POST /api/outfits`

Generates personalized outfit recommendations based on wardrobe items, occasion, season, style preferences, and weather conditions.

#### Request Body

```json
{
  "wardrobe": [
    {
      "id": "string",
      "category": "tops" | "bottoms" | "shoes" | "accessories" | "outerwear",
      "subcategory": "string",
      "color": "string",
      "pattern": "string",
      "material": "string",
      "style": "string",
      "occasion": "string",
      "season": "string"
    }
  ],
  "occasion": "everyday" | "work" | "party" | "workout" | "formal",
  "season": "string",
  "style": "string",
  "weather": {
    "useWeather": boolean,
    "temp": number,
    "condition": "string",
    "windSpeed": number,
    "uvIndex": number,
    "precipType": "none" | "rain" | "snow" | "drizzle" | "thunderstorm",
    "precipIntensity": "none" | "light" | "moderate" | "heavy"
  }
}
```

#### Response

**Success (200 OK)**

```json
{
  "outfits": [
    {
      "top": { /* ClothingItem */ },
      "bottom": { /* ClothingItem */ },
      "shoes": { /* ClothingItem */ },
      "accessory": { /* ClothingItem */ },
      "outerwear": { /* ClothingItem */ },
      "score": 0.85,
      "weatherScore": 0.92,
      "reason": "Blue shirt with navy pants, complemented by white sneakers",
      "weatherAdvice": "Breathable fabrics will keep you cool"
    }
  ],
  "occasion": "everyday",
  "season": "summer",
  "style": "casual",
  "weather": {
    "applied": true,
    "params": { /* WeatherParams */ }
  }
}
```

**Error (400 Bad Request)**

```json
{
  "error": "No wardrobe items provided"
}
```

**Error (500 Internal Server Error)**

```json
{
  "error": "Failed to generate outfits"
}
```

#### Scoring Algorithm

Outfits are scored based on:
- **Color compatibility** (30%): Colors that complement each other
- **Style compatibility** (25%): Items matching the requested style
- **Occasion match** (20%): Items appropriate for the occasion
- **Season match** (15%): Items suitable for the season
- **Completeness bonus** (10%): Having required items (top + bottom + shoes)

When weather is enabled, a separate weather score is calculated:
- **Temperature appropriateness** (40%)
- **Precipitation protection** (25%)
- **UV protection** (15%)
- **Wind protection** (10%)
- **Layer count appropriateness** (10%)

---

### 2. Image Analysis

**Endpoint**: `POST /api/analyze`

Analyzes clothing item images using Google's Gemini AI to extract metadata.

#### Request Body

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```

The image should be a Base64-encoded data URL or raw Base64 string.

#### Response

**Success (200 OK)**

```json
{
  "category": "tops",
  "subcategory": "t-shirt",
  "color": "navy",
  "pattern": "solid",
  "material": "cotton",
  "style": "casual",
  "occasion": "everyday",
  "season": "summer",
  "confidence": 0.92
}
```

**Error (400 Bad Request)**

```json
{
  "error": "No image provided"
}
```

**Error (500 Internal Server Error)**

```json
{
  "error": "Analysis failed"
}
```

#### Fallback Behavior

If `GOOGLE_API_KEY` is not configured, the endpoint returns mock data for testing purposes.

---

### 3. Waitlist Signup

**Endpoint**: `POST /api/waitlist`

Adds an email address to the WearX waitlist using Loops.so integration.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Added to waitlist"
}
```

**Error (400 Bad Request)**

```json
{
  "error": "Invalid email address"
}
```

**Error (500 Internal Server Error)**

```json
{
  "error": "Failed to add to waitlist"
}
```

#### Integration Details

- Uses Loops.so API: `https://app.loops.so/api/v1/contacts/create`
- Sets `source` as `"wearx_waitlist"`
- Automatically subscribes users to marketing emails

---

## Data Types

### ClothingItem

```typescript
interface ClothingItem {
  id: string;
  category: "tops" | "bottoms" | "shoes" | "accessories" | "outerwear";
  subcategory: string;
  color: string;
  pattern: string;
  material: string;
  style: string;
  occasion: string;
  season: string;
}
```

### WeatherParams

```typescript
interface WeatherParams {
  useWeather: boolean;
  temp?: number;
  condition?: string;
  windSpeed?: number;
  uvIndex?: number;
  precipType?: "none" | "rain" | "snow" | "drizzle" | "thunderstorm";
  precipIntensity?: "none" | "light" | "moderate" | "heavy";
}
```

### Outfit

```typescript
interface Outfit {
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  accessory?: ClothingItem;
  outerwear?: ClothingItem;
  score: number;
  weatherScore: number;
  reason: string;
  weatherAdvice: string;
}
```

---

## Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| 400 | Bad Request | Check request body format and required fields |
| 500 | Internal Server Error | Check server logs; verify API keys are configured |

---

## Rate Limits

- **Gemini API**: Subject to Google's rate limits
- **Loops.so**: Subject to Loops.so plan limits
- **OpenWeatherMap**: 1000 calls/day on free tier

---

## Environment Variables

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete environment variable configuration.

Key variables for API functionality:

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | No | Gemini API key for image analysis |
| `LOOPS_API_KEY` | No | Loops.so API key for waitlist |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | No | OpenWeatherMap API key |

---

## Client-Side Libraries

### Weather API

The weather functionality is available through the `weather.ts` library:

```typescript
import { 
  getWeatherByCoords, 
  getWeatherByCity,
  getUserLocation,
  getWeatherOutfitGuidance,
  calculateWeatherScore 
} from "@/lib/weather";

// Get weather by coordinates
const weather = await getWeatherByCoords(lat, lon);

// Get weather by city
const weather = await getWeatherByCity("New York");

// Get user's location
const position = await getUserLocation();

// Get outfit guidance
const guidance = getWeatherOutfitGuidance(weather);

// Calculate weather score for an outfit
const score = calculateWeatherScore(outfit, weather, guidance);
```

### Style DNA

Style profiling is available through the `style-dna` library:

```typescript
import { 
  calculateStyleArchetype,
  generateColorPalette,
  getRecommendedCategories,
  saveStyleDNA,
  loadStyleDNA
} from "@/lib/style-dna";

// Calculate archetype from preferences
const archetype = calculateStyleArchetype(['minimalist', 'classic']);

// Generate color palette
const palette = generateColorPalette('medium', ['neutrals', 'earth-tones']);

// Get recommended categories
const categories = getRecommendedCategories(profile);
```

---

## Testing

### Using cURL

```bash
# Test outfit recommendations
curl -X POST http://localhost:3000/api/outfits \
  -H "Content-Type: application/json" \
  -d '{
    "wardrobe": [
      {
        "id": "1",
        "category": "tops",
        "subcategory": "t-shirt",
        "color": "white",
        "pattern": "solid",
        "material": "cotton",
        "style": "casual",
        "occasion": "everyday",
        "season": "summer"
      }
    ],
    "occasion": "everyday",
    "season": "summer",
    "style": "casual"
  }'

# Test waitlist signup
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## Changelog

### v0.1.0
- Initial API release
- Outfit recommendation endpoint
- Image analysis endpoint
- Waitlist signup endpoint
