import React, { useState, useCallback } from "react";
import { CloudRain, Sun, Loader2, Thermometer, User, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react";

// --- Type Definitions ---

interface Product {
  id: number;
  name: string;
  image: string; // largeImageURL from Pixabay
  tags: string;
}

interface WeatherReport {
  city: string;
  tempC: number;
  condition: string;
  icon: string;
}

// --- Constants ---
const PIXABAY_API_KEY = "52653198-af93711c35fc29c9d84946d9e";
const PIXABAY_BASE_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&image_type=photo&category=fashion&per_page=10`;
const OPENWEATHER_API_KEY = "YOUR_API_KEY"; // Placeholder - User must replace this with a real key
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// --- Utility Functions ---

/**
 * Maps weather data to a suitable outfit keyword for the image search.
 * @param tempC - Current temperature in Celsius.
 * @param condition - Weather condition (e.g., 'Rain', 'Clear', 'Snow').
 * @returns A keyword string for clothing (e.g., 'raincoat', 'jacket', 't-shirt').
 */
const mapWeatherToOutfit = (tempC: number, condition: string): string => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');
  const isCold = tempC < 10;
  const isMild = tempC >= 10 && tempC < 20;
  const isHot = tempC >= 20;

  if (isRainy) return 'raincoat and waterproof';
  if (isCold) return 'warm coat or sweater outfit';
  if (isHot) return 'light summer dress or t-shirt outfit';
  if (isMild) return 'light jacket or long sleeve shirt outfit';

  return 'smart casual outfit';
};

// --- Main Components ---

const RecommendationCard: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 delay-${index * 100} ease-out 
                  animate-fadeInUp opacity-0 h-full w-full`}
      style={{ animationDelay: `${index * 0.1}s` }} // Custom animation delay for staggered effect
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-72 object-cover object-top transition-transform duration-300 hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/6b7280/FFFFFF?text=Image+Missing`; }}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 capitalize">{product.tags}</p>
        <button className="mt-3 w-full flex items-center justify-center space-x-2 text-sm font-semibold bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors">
          <span>View Match</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const WeatherDisplay: React.FC<{ weather: WeatherReport | null }> = ({ weather }) => {
  if (!weather) return null;

  const Icon = weather.condition.includes('Rain') || weather.condition.includes('Drizzle') ? CloudRain : Sun;
  const tempColor = weather.tempC < 10 ? 'text-blue-500' : weather.tempC > 25 ? 'text-red-500' : 'text-green-500';

  return (
    <div className="flex items-center justify-center p-4 bg-purple-50 rounded-xl shadow-inner mb-8 transition-opacity duration-500 ease-in-out">
      <Icon className={`w-8 h-8 mr-4 ${tempColor}`} />
      <div className="text-left">
        <p className="font-semibold text-lg text-gray-800">Weather in {weather.city}</p>
        <p className="text-2xl font-bold">
          <span className={tempColor}>{weather.tempC}°C</span>
          <span className="text-gray-600 ml-2 text-base font-medium">/ {weather.condition}</span>
        </p>
      </div>
    </div>
  );
};

// --- Main Application Component ---

const App: React.FC = () => {
  const [stylePreference, setStylePreference] = useState("casual");
  const [tempComfort, setTempComfort] = useState(20); // User's preferred comfy temperature
  const [location, setLocation] = useState("London");
  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Exponential backoff utility for robust API calls
  const fetchWithBackoff = useCallback(async (url: string, options: RequestInit = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      } catch (e) {
        if (i < retries - 1) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw e;
        }
      }
    }
    throw new Error("API request failed after multiple retries.");
  }, []);

  const fetchRecommendations = useCallback(async () => {
    if (!weather) {
      setError("Please fetch the weather first.");
      return;
    }

    setIsLoading(true);
    setRecommendations([]);
    setError(null);

    try {
      // 1. Determine the clothing type based on weather
      const weatherOutfit = mapWeatherToOutfit(weather.tempC, weather.condition);
      
      // 2. Combine weather-based clothing with user style preference
      const finalQuery = `${stylePreference} ${weatherOutfit}`;

      // 3. Construct Pixabay URL
      const encodedQuery = encodeURIComponent(finalQuery);
      const pixabayUrl = `${PIXABAY_BASE_URL}&q=${encodedQuery}`;
      
      console.log("Fetching images for query:", finalQuery);

      // 4. Fetch images from Pixabay
      const data = await fetchWithBackoff(pixabayUrl);

      if (data.hits && data.hits.length > 0) {
        const newRecommendations = data.hits.map((hit: any) => ({
          id: hit.id,
          name: hit.tags.split(',')[0].trim() || finalQuery,
          image: hit.largeImageURL,
          tags: hit.tags,
        }));
        setRecommendations(newRecommendations);
      } else {
        setRecommendations([]);
        setError(`No fashion results found for: "${finalQuery}". Try a different style or location.`);
      }
    } catch (e) {
      setError("Failed to fetch clothing recommendations.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [weather, stylePreference, fetchWithBackoff]);

  const fetchWeather = useCallback(async () => {
    if (!location) {
      setError("Please enter a city.");
      return;
    }
    
    // Reset states
    setIsLoading(true);
    setWeather(null);
    setRecommendations([]);
    setError(null);

    // --- FIX START: Use mock data if placeholder key is detected ---
    if (OPENWEATHER_API_KEY === "YOUR_API_KEY") {
        console.warn("Using mock weather data because OPENWEATHER_API_KEY is the placeholder 'YOUR_API_KEY'.");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        
        // Mock data based on city name for a bit of variety
        const mockTemp = location.toLowerCase().includes('london') ? 12 : 
                         location.toLowerCase().includes('new york') ? 18 : 
                         location.toLowerCase().includes('tokyo') ? 25 : 
                         20;

        const mockCondition = mockTemp < 15 ? "Clouds" : "Clear";

        setWeather({
            city: location,
            tempC: mockTemp,
            condition: mockCondition,
            icon: '01d', // generic icon
        });
        setIsLoading(false);
        return;
    }
    // --- FIX END ---

    // Weather API call (using actual key if provided)
    const weatherUrl = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    try {
      const data = await fetchWithBackoff(weatherUrl);

      if (data.cod === 200) {
        setWeather({
          city: data.name,
          tempC: data.main.temp,
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } else {
        setError(data.message || "City not found.");
      }
    } catch (e) {
      setError("Failed to fetch weather data. Check if 'YOUR_API_KEY' is valid or if the city name is correct.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [location, fetchWithBackoff]);
  
  // Automatically fetch recommendations once weather is available
  React.useEffect(() => {
    if (weather) {
      fetchRecommendations();
    }
  }, [weather, fetchRecommendations]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-6 mb-8 bg-white rounded-xl shadow-lg border-b-4 border-purple-500">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MatchFit 🌦️ Weather Outfit AI
          </h1>
          <p className="mt-2 text-lg text-gray-600">Get your daily fit based on real-time weather and your personal style.</p>
        </header>

        {/* --- Input and Weather Card Section --- */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 text-purple-500 mr-3" />
            Your Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Location Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">1. Where are you today?</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., New York, Paris, Tokyo"
                  className="flex-grow p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={fetchWeather}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading && !weather ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Sun className="w-5 h-5 mr-2" />}
                  {isLoading && !weather ? "Fetching..." : "Get Weather"}
                </button>
              </div>
            </div>

            {/* 2. Style Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">2. Preferred Style</label>
              <select
                value={stylePreference}
                onChange={(e) => setStylePreference(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 transition-colors bg-white"
                disabled={isLoading}
              >
                <option value="casual">Casual & Comfortable</option>
                <option value="sporty">Sporty & Activewear</option>
                <option value="elegant">Elegant & Formal</option>
                <option value="business">Business Casual</option>
              </select>
            </div>
          </div>
          
          {/* Weather Display */}
          <div className="mt-8">
            {weather ? (
              <WeatherDisplay weather={weather} />
            ) : (
              <div className="text-center p-6 bg-gray-100 rounded-xl text-gray-500">
                Enter a city and click "Get Weather" to proceed.
              </div>
            )}
          </div>
        </section>

        {/* --- Recommendation and Loading Section --- */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Thermometer className="w-6 h-6 text-pink-500 mr-3" />
            Your AI MatchFit Recommendations
          </h2>

          {error && (
            <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-3" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl shadow-xl">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              <p className="mt-4 text-xl font-semibold text-gray-700">Analyzing weather and style...</p>
              <p className="text-sm text-gray-500">Fetching the perfect animated outfit matches.</p>
            </div>
          )}

          {/* Animated Results Grid */}
          {!isLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recommendations.map((product, index) => (
                <RecommendationCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {!isLoading && weather && recommendations.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-xl text-gray-600">
              <RefreshCw className="w-8 h-8 text-pink-500 mb-3" />
              <p className="text-lg font-medium">No results were returned for your specific combination.</p>
              <p className="text-sm mt-1">Try clicking "Get Weather" again or adjust your "Preferred Style".</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default App;
