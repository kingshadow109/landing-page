"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  MapPin,
  RefreshCw,
  Umbrella,
  Shirt,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import {
  WeatherData,
  WeatherOutfitGuidance,
  getUserLocation,
  getWeatherByCoords,
  getWeatherByCity,
  getWeatherOutfitGuidance,
  formatTemp,
  getWeatherIconUrl,
  cacheWeatherData,
  getCachedWeatherData,
} from "@/lib/weather";

interface WeatherWidgetProps {
  onWeatherChange?: (weather: WeatherData, guidance: WeatherOutfitGuidance) => void;
  compact?: boolean;
  className?: string;
}

export function WeatherWidget({ onWeatherChange, compact = false, className = "" }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [guidance, setGuidance] = useState<WeatherOutfitGuidance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [manualCity, setManualCity] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  // Fetch weather on mount (try cache first)
  useEffect(() => {
    const cached = getCachedWeatherData();
    if (cached) {
      setWeather(cached);
      const g = getWeatherOutfitGuidance(cached);
      setGuidance(g);
      onWeatherChange?.(cached, g);
    } else {
      // Try to get location automatically
      handleAutoDetect();
    }
  }, []);

  const handleAutoDetect = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      
      // For demo purposes, use a mock weather data since we may not have API key
      // In production, this would call the actual API
      const mockWeather = generateMockWeather(latitude, longitude);
      
      setWeather(mockWeather);
      const g = getWeatherOutfitGuidance(mockWeather);
      setGuidance(g);
      cacheWeatherData(mockWeather);
      setLocationPermission(true);
      onWeatherChange?.(mockWeather, g);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get location");
      setLocationPermission(false);
      setShowManualInput(true);
    } finally {
      setLoading(false);
    }
  }, [onWeatherChange]);

  const handleManualCity = useCallback(async () => {
    if (!manualCity.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In production, this would call the actual API
      const mockWeather = generateMockWeatherForCity(manualCity);
      
      setWeather(mockWeather);
      const g = getWeatherOutfitGuidance(mockWeather);
      setGuidance(g);
      cacheWeatherData(mockWeather);
      onWeatherChange?.(mockWeather, g);
      setShowManualInput(false);
    } catch (err) {
      setError("Failed to fetch weather for this city");
    } finally {
      setLoading(false);
    }
  }, [manualCity, onWeatherChange]);

  const handleRefresh = useCallback(async () => {
    if (weather?.location) {
      setLoading(true);
      // In production, refresh from API
      setTimeout(() => setLoading(false), 1000);
    }
  }, [weather]);

  // Generate mock weather based on location (for demo)
  const generateMockWeather = (lat: number, lon: number): WeatherData => {
    // Simulate different weather based on location
    const conditions = ['clear', 'clouds', 'rain', 'drizzle'] as const;
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = 15 + Math.floor(Math.random() * 15); // 15-30°C
    
    return {
      location: {
        city: "Current Location",
        country: "",
        lat,
        lon,
      },
      current: {
        temp,
        feelsLike: temp + 2,
        humidity: 60 + Math.floor(Math.random() * 30),
        windSpeed: 2 + Math.random() * 8,
        windDeg: Math.floor(Math.random() * 360),
        visibility: 10000,
        pressure: 1013,
        uvIndex: Math.floor(Math.random() * 8),
        condition: randomCondition,
        description: randomCondition === 'clear' ? 'clear sky' : 'scattered clouds',
        icon: randomCondition === 'clear' ? '01d' : '03d',
      },
      precipitation: {
        type: randomCondition === 'rain' ? 'rain' : 'none',
        intensity: randomCondition === 'rain' ? 'light' : 'none',
        probability: randomCondition === 'rain' ? 0.3 : 0,
      },
      timestamp: Date.now(),
    };
  };

  const generateMockWeatherForCity = (city: string): WeatherData => {
    return {
      location: {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        country: "",
        lat: 0,
        lon: 0,
      },
      current: {
        temp: 20,
        feelsLike: 22,
        humidity: 65,
        windSpeed: 5,
        windDeg: 180,
        visibility: 10000,
        pressure: 1015,
        uvIndex: 5,
        condition: 'clouds',
        description: 'few clouds',
        icon: '02d',
      },
      precipitation: {
        type: 'none',
        intensity: 'none',
        probability: 0.1,
      },
      timestamp: Date.now(),
    };
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-purple-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getTempColor = (temp: number) => {
    if (temp <= 5) return "text-blue-500";
    if (temp <= 15) return "text-cyan-500";
    if (temp <= 25) return "text-green-500";
    if (temp <= 32) return "text-orange-500";
    return "text-red-500";
  };

  // Compact view
  if (compact && weather) {
    return (
      <div className={`flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-lg border ${className}`}>
        {getWeatherIcon(weather.current.condition)}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getTempColor(weather.current.temp)}`}>
              {formatTemp(weather.current.temp)}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
              {weather.current.description}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {weather.location.city}
            </span>
            {guidance?.precipitation.needsProtection && (
              <Badge variant="secondary" className="text-xs">
                <Umbrella className="w-3 h-3 mr-1" />
                Rain
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={loading}
          className="shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    );
  }

  // Full view
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Weather
          </div>
          {weather && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {!weather && !loading && !error && (
          <div className="text-center py-6">
            <Cloud className="w-12 h-12 mx-auto text-zinc-300 mb-3" />
            <p className="text-zinc-500 mb-4">Get weather-aware outfit recommendations</p>
            <Button onClick={handleAutoDetect} className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Detect Location
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 mx-auto animate-spin text-zinc-400 mb-3" />
            <p className="text-zinc-500">Getting weather data...</p>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  You can enter your city manually instead.
                </p>
              </div>
            </div>
            
            {showManualInput && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter city name..."
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleManualCity()}
                    className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={handleManualCity} disabled={!manualCity.trim()}>
                    Go
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {weather && guidance && (
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.current.condition)}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${getTempColor(weather.current.temp)}`}>
                    {formatTemp(weather.current.temp)}
                  </span>
                  <span className="text-sm text-zinc-500">
                    Feels like {formatTemp(weather.current.feelsLike)}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                  {weather.current.description}
                </p>
                <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {weather.location.city}
                </p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <Droplets className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                <p className="text-xs text-zinc-500">Humidity</p>
                <p className="text-sm font-medium">{weather.current.humidity}%</p>
              </div>
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <Wind className="w-4 h-4 mx-auto text-cyan-500 mb-1" />
                <p className="text-xs text-zinc-500">Wind</p>
                <p className="text-sm font-medium">{Math.round(weather.current.windSpeed)} m/s</p>
              </div>
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <Eye className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-zinc-500">UV Index</p>
                <p className="text-sm font-medium">{weather.current.uvIndex}</p>
              </div>
            </div>

            {/* Outfit Guidance */}
            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                Outfit Advice
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Thermometer className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {guidance.temperature.advice}
                  </span>
                </div>
                
                {guidance.precipitation.needsProtection && (
                  <div className="flex items-start gap-2 text-sm">
                    <Umbrella className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {guidance.precipitation.advice}
                    </span>
                  </div>
                )}
                
                {guidance.uv.needsProtection && (
                  <div className="flex items-start gap-2 text-sm">
                    <Sun className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {guidance.uv.advice}
                    </span>
                  </div>
                )}
              </div>

              {/* Recommended Categories */}
              {guidance.recommendedCategories.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {guidance.recommendedCategories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {cat}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherWidget;
