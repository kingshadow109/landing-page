/**
 * Weather API Integration for WearX
 * Uses OpenWeatherMap API (free tier: 1000 calls/day)
 */

export interface WeatherData {
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number; // Celsius
    feelsLike: number;
    humidity: number;
    windSpeed: number; // m/s
    windDeg: number;
    visibility: number; // meters
    pressure: number;
    uvIndex: number;
    condition: WeatherCondition;
    description: string;
    icon: string;
  };
  precipitation: {
    type: 'none' | 'rain' | 'snow' | 'drizzle' | 'thunderstorm';
    intensity: 'none' | 'light' | 'moderate' | 'heavy';
    probability: number; // 0-1
  };
  timestamp: number;
}

export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'fog'
  | 'wind';

export interface WeatherPreferences {
  tempUnit: 'celsius' | 'fahrenheit';
  useLocation: boolean;
  manualLocation?: {
    lat: number;
    lon: number;
    city: string;
  };
}

// Weather-based outfit recommendations
export interface WeatherOutfitGuidance {
  temperature: {
    level: 'freezing' | 'cold' | 'cool' | 'mild' | 'warm' | 'hot' | 'scorching';
    advice: string;
  };
  precipitation: {
    needsProtection: boolean;
    advice: string;
  };
  wind: {
    level: 'calm' | 'breezy' | 'windy' | 'gusty';
    advice: string;
  };
  uv: {
    level: 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
    needsProtection: boolean;
    advice: string;
  };
  recommendedCategories: string[];
  avoidCategories: string[];
  recommendedMaterials: string[];
  avoidMaterials: string[];
  recommendedColors: string[];
  layerCount: number;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Get weather data by coordinates
 */
export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  
  const data = await response.json();
  return parseWeatherData(data);
}

/**
 * Get weather data by city name
 */
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  
  const data = await response.json();
  return parseWeatherData(data);
}

/**
 * Get user's location with permission
 */
export function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        let message = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

/**
 * Parse OpenWeatherMap response to WeatherData
 */
function parseWeatherData(data: any): WeatherData {
  const condition = mapWeatherCondition(data.weather[0]?.main || 'Clear');
  const description = data.weather[0]?.description || '';
  const icon = data.weather[0]?.icon || '';
  
  // Determine precipitation
  let precipType: WeatherData['precipitation']['type'] = 'none';
  let precipIntensity: WeatherData['precipitation']['intensity'] = 'none';
  
  if (data.rain) {
    precipType = 'rain';
    precipIntensity = getPrecipIntensity(data.rain['1h'] || data.rain['3h'] || 0);
  } else if (data.snow) {
    precipType = 'snow';
    precipIntensity = getPrecipIntensity(data.snow['1h'] || data.snow['3h'] || 0);
  } else if (condition === 'drizzle') {
    precipType = 'drizzle';
    precipIntensity = 'light';
  } else if (condition === 'thunderstorm') {
    precipType = 'thunderstorm';
    precipIntensity = 'heavy';
  }
  
  return {
    location: {
      city: data.name,
      country: data.sys?.country || '',
      lat: data.coord?.lat || 0,
      lon: data.coord?.lon || 0,
    },
    current: {
      temp: Math.round(data.main?.temp || 0),
      feelsLike: Math.round(data.main?.feels_like || 0),
      humidity: data.main?.humidity || 0,
      windSpeed: data.wind?.speed || 0,
      windDeg: data.wind?.deg || 0,
      visibility: data.visibility || 10000,
      pressure: data.main?.pressure || 1013,
      uvIndex: 0, // Requires One Call API
      condition,
      description,
      icon,
    },
    precipitation: {
      type: precipType,
      intensity: precipIntensity,
      probability: (data.pop || 0) * 100,
    },
    timestamp: Date.now(),
  };
}

function mapWeatherCondition(main: string): WeatherCondition {
  const mapping: Record<string, WeatherCondition> = {
    'Clear': 'clear',
    'Clouds': 'clouds',
    'Rain': 'rain',
    'Drizzle': 'drizzle',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'snow',
    'Mist': 'mist',
    'Fog': 'fog',
    'Haze': 'mist',
    'Smoke': 'mist',
    'Dust': 'mist',
    'Sand': 'mist',
    'Ash': 'mist',
    'Squall': 'wind',
    'Tornado': 'wind',
  };
  return mapping[main] || 'clear';
}

function getPrecipIntensity(amount: number): WeatherData['precipitation']['intensity'] {
  if (amount === 0) return 'none';
  if (amount < 2.5) return 'light';
  if (amount < 10) return 'moderate';
  return 'heavy';
}

/**
 * Get outfit guidance based on weather
 */
export function getWeatherOutfitGuidance(weather: WeatherData): WeatherOutfitGuidance {
  const temp = weather.current.temp;
  const condition = weather.current.condition;
  const windSpeed = weather.current.windSpeed;
  const uvIndex = weather.current.uvIndex;
  const precip = weather.precipitation;
  
  // Temperature guidance
  let tempLevel: WeatherOutfitGuidance['temperature']['level'];
  let tempAdvice: string;
  
  if (temp <= -5) {
    tempLevel = 'freezing';
    tempAdvice = 'Heavy winter gear required. Layer up with thermal base layers.';
  } else if (temp <= 5) {
    tempLevel = 'cold';
    tempAdvice = 'Warm clothing needed. Consider sweaters and jackets.';
  } else if (temp <= 15) {
    tempLevel = 'cool';
    tempAdvice = 'Light layers recommended. A jacket might be useful.';
  } else if (temp <= 22) {
    tempLevel = 'mild';
    tempAdvice = 'Comfortable temperature. Light clothing is perfect.';
  } else if (temp <= 28) {
    tempLevel = 'warm';
    tempAdvice = 'Stay cool with breathable fabrics. Short sleeves recommended.';
  } else if (temp <= 35) {
    tempLevel = 'hot';
    tempAdvice = 'Light, loose clothing. Avoid dark colors.';
  } else {
    tempLevel = 'scorching';
    tempAdvice = 'Minimal, breathable clothing. Stay hydrated and seek shade.';
  }
  
  // Precipitation guidance
  const needsProtection = precip.type !== 'none';
  let precipAdvice: string;
  
  switch (precip.type) {
    case 'rain':
    case 'thunderstorm':
      precipAdvice = precip.intensity === 'heavy' 
        ? 'Waterproof outerwear essential. Consider rain boots.'
        : 'Bring a rain jacket or umbrella.';
      break;
    case 'snow':
      precipAdvice = 'Warm, waterproof outerwear needed. Insulated boots recommended.';
      break;
    case 'drizzle':
      precipAdvice = 'Light rain protection suggested. Water-resistant jacket.';
      break;
    default:
      precipAdvice = 'No precipitation expected.';
  }
  
  // Wind guidance
  let windLevel: WeatherOutfitGuidance['wind']['level'];
  let windAdvice: string;
  
  if (windSpeed < 5) {
    windLevel = 'calm';
    windAdvice = 'Little to no wind.';
  } else if (windSpeed < 15) {
    windLevel = 'breezy';
    windAdvice = 'Light breeze. Comfortable for most outfits.';
  } else if (windSpeed < 25) {
    windLevel = 'windy';
    windAdvice = 'Hold onto your hat! Consider wind-resistant outerwear.';
  } else {
    windLevel = 'gusty';
    windAdvice = 'Strong winds. Secure loose items and consider a windbreaker.';
  }
  
  // UV guidance
  let uvLevel: WeatherOutfitGuidance['uv']['level'];
  let uvAdvice: string;
  const needsUvProtection = uvIndex >= 3;
  
  if (uvIndex <= 2) {
    uvLevel = 'low';
    uvAdvice = 'Low UV. Minimal protection needed.';
  } else if (uvIndex <= 5) {
    uvLevel = 'moderate';
    uvAdvice = 'Moderate UV. Consider a hat and sunglasses.';
  } else if (uvIndex <= 7) {
    uvLevel = 'high';
    uvAdvice = 'High UV. Sun protection recommended: hat, sunglasses, sunscreen.';
  } else if (uvIndex <= 10) {
    uvLevel = 'very-high';
    uvAdvice = 'Very high UV. Full sun protection essential.';
  } else {
    uvLevel = 'extreme';
    uvAdvice = 'Extreme UV. Avoid direct sun. Full protection mandatory.';
  }
  
  // Category recommendations
  const recommendedCategories: string[] = [];
  const avoidCategories: string[] = [];
  
  // Temperature-based categories
  if (temp <= 5) {
    recommendedCategories.push('outerwear', 'accessories'); // scarves, gloves
    avoidCategories.push('shorts');
  } else if (temp >= 25) {
    recommendedCategories.push('tops', 'bottoms');
    avoidCategories.push('outerwear');
  }
  
  // Precipitation-based categories
  if (needsProtection) {
    recommendedCategories.push('outerwear'); // rain jacket
    if (precip.type === 'rain' || precip.type === 'thunderstorm') {
      avoidCategories.push('suede', 'silk');
    }
  }
  
  // Material recommendations
  const recommendedMaterials: string[] = [];
  const avoidMaterials: string[] = [];
  
  if (temp >= 25) {
    recommendedMaterials.push('cotton', 'linen', 'rayon', 'chambray');
    avoidMaterials.push('wool', 'polyester', 'synthetic', 'leather');
  } else if (temp <= 10) {
    recommendedMaterials.push('wool', 'cashmere', 'fleece', 'down', 'flannel');
    avoidMaterials.push('linen', 'thin cotton', 'mesh');
  } else {
    recommendedMaterials.push('cotton', 'denim', 'light wool', 'jersey');
  }
  
  if (needsProtection) {
    recommendedMaterials.push('nylon', 'polyester', 'gore-tex');
  }
  
  // Color recommendations
  const recommendedColors: string[] = [];
  
  if (temp >= 28) {
    recommendedColors.push('white', 'beige', 'light gray', 'pastel');
  } else if (temp <= 10) {
    recommendedColors.push('black', 'navy', 'burgundy', 'olive', 'dark gray');
  }
  
  // Layer count
  let layerCount = 1;
  if (temp <= -5) layerCount = 4;
  else if (temp <= 5) layerCount = 3;
  else if (temp <= 15) layerCount = 2;
  else if (temp <= 22) layerCount = 1;
  
  return {
    temperature: { level: tempLevel, advice: tempAdvice },
    precipitation: { needsProtection, advice: precipAdvice },
    wind: { level: windLevel, advice: windAdvice },
    uv: { level: uvLevel, needsProtection: needsUvProtection, advice: uvAdvice },
    recommendedCategories,
    avoidCategories,
    recommendedMaterials,
    avoidMaterials,
    recommendedColors,
    layerCount,
  };
}

/**
 * Calculate weather-appropriate score for an outfit
 * Returns a score between 0 and 1, where 1 is perfectly appropriate
 */
export function calculateWeatherScore(
  outfit: any,
  weather: WeatherData,
  guidance: WeatherOutfitGuidance
): number {
  let score = 0.5; // Base score
  const items = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory, outfit.outerwear].filter(Boolean);
  
  if (items.length === 0) return 0;
  
  // Temperature appropriateness (40%)
  const temp = weather.current.temp;
  let tempScore = 0;
  
  for (const item of items) {
    const season = item.season?.toLowerCase() || 'all-season';
    const material = item.material?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    
    // Check season match
    if (season === 'all-season') {
      tempScore += 1;
    } else if (temp >= 25 && season === 'summer') {
      tempScore += 1;
    } else if (temp <= 10 && season === 'winter') {
      tempScore += 1;
    } else if (temp > 10 && temp < 25 && (season === 'spring' || season === 'fall')) {
      tempScore += 1;
    }
    
    // Check material appropriateness
    if (guidance.recommendedMaterials.some(m => material.includes(m))) {
      tempScore += 0.5;
    }
    if (guidance.avoidMaterials.some(m => material.includes(m))) {
      tempScore -= 0.5;
    }
    
    // Check category appropriateness
    if (guidance.recommendedCategories.includes(category)) {
      tempScore += 0.3;
    }
    if (guidance.avoidCategories.includes(category)) {
      tempScore -= 0.3;
    }
  }
  
  score += (tempScore / (items.length * 2.8)) * 0.4;
  
  // Precipitation protection (25%)
  if (guidance.precipitation.needsProtection) {
    const hasOuterwear = !!outfit.outerwear;
    const hasWaterproofMaterial = items.some(item => 
      ['nylon', 'polyester', 'gore-tex', 'waterproof'].some(m => 
        item.material?.toLowerCase().includes(m)
      )
    );
    
    if (hasOuterwear) score += 0.15;
    if (hasWaterproofMaterial) score += 0.1;
  } else {
    score += 0.25; // No protection needed
  }
  
  // UV protection (15%)
  if (guidance.uv.needsProtection) {
    const hasHat = items.some(item => 
      item.subcategory?.toLowerCase().includes('hat') ||
      item.subcategory?.toLowerCase().includes('cap')
    );
    const hasSunglasses = items.some(item =>
      item.subcategory?.toLowerCase().includes('sunglasses')
    );
    const hasLongSleeves = outfit.top?.subcategory?.toLowerCase().includes('long');
    
    if (hasHat) score += 0.05;
    if (hasSunglasses) score += 0.05;
    if (hasLongSleeves) score += 0.05;
  } else {
    score += 0.15;
  }
  
  // Wind protection (10%)
  if (guidance.wind.level === 'windy' || guidance.wind.level === 'gusty') {
    const hasOuterwear = !!outfit.outerwear;
    if (hasOuterwear) score += 0.1;
  } else {
    score += 0.1;
  }
  
  // Layer count appropriateness (10%)
  const actualLayers = items.filter(i => 
    i.category === 'tops' || i.category === 'outerwear'
  ).length;
  const expectedLayers = guidance.layerCount;
  const layerDiff = Math.abs(actualLayers - expectedLayers);
  score += Math.max(0, 0.1 - layerDiff * 0.03);
  
  return Math.min(Math.max(score, 0), 1);
}

/**
 * Format temperature for display
 */
export function formatTemp(temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(temp * 9/5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

/**
 * Get weather icon URL
 */
export function getWeatherIconUrl(iconCode: string, size: '1x' | '2x' | '4x' = '2x'): string {
  const sizeMap = { '1x': '', '2x': '@2x', '4x': '@4x' };
  return `https://openweathermap.org/img/wn/${iconCode}${sizeMap[size]}.png`;
}

/**
 * Cache weather data in localStorage
 */
export function cacheWeatherData(data: WeatherData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wearx_weather', JSON.stringify(data));
  }
}

/**
 * Get cached weather data
 */
export function getCachedWeatherData(): WeatherData | null {
  if (typeof window === 'undefined') return null;
  
  const cached = localStorage.getItem('wearx_weather');
  if (!cached) return null;
  
  try {
    const data = JSON.parse(cached) as WeatherData;
    // Check if cache is still valid (15 minutes)
    if (Date.now() - data.timestamp > 15 * 60 * 1000) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
