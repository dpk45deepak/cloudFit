
import React, { useState } from 'react';
import { WeatherReport } from '../types';
import Loader from './Loader';

// A simple map for weather conditions to icons (using Heroicons for simplicity)
const WeatherIcon: React.FC<{condition: string}> = ({ condition }) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    }
    if (lowerCaseCondition.includes('cloud')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
    }
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm7-9l-2 4h4l-2 4" /></svg>
    }
    // Default icon
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
};

interface WeatherCardProps {
  weather: WeatherReport | null;
  isLoading: boolean;
  error: string | null;
  onFetchWeather: (location: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading, error, onFetchWeather }) => {
  const [locationInput, setLocationInput] = useState('');

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    onFetchWeather(locationInput);
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader />
          <p className="mt-3 text-sm text-slate-400">Fetching today's weather...</p>
        </div>
      );
    }

    if (weather) {
      return (
        <div className="flex flex-col h-full animate-fade-in">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-bold text-slate-200">{weather.location}</p>
                    <p className="text-5xl font-bold text-white mt-2">{Math.round(weather.temperature)}°C</p>
                    <p className="font-semibold text-indigo-300">{weather.condition}</p>
                </div>
                <div className="text-indigo-400">
                    <WeatherIcon condition={weather.condition} />
                </div>
            </div>
            <div className="mt-4 flex-grow">
                 <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-md">{weather.summary}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-xs text-slate-400">Feels Like</p>
                    <p className="font-semibold text-white">{Math.round(weather.feelsLike)}°C</p>
                </div>
                 <div>
                    <p className="text-xs text-slate-400">Humidity</p>
                    <p className="font-semibold text-white">{weather.humidity}%</p>
                </div>
                 <div>
                    <p className="text-xs text-slate-400">Wind</p>
                    <p className="font-semibold text-white">{weather.windSpeed} km/h</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400">Chance of Rain</p>
                    <p className="font-semibold text-white">{weather.rain} %</p>
                </div>
            </div>
        </div>
      );
    }
    
    // Initial state or error state: show input form
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <form onSubmit={handleFetch} className="w-full">
          <label htmlFor="location" className="block text-sm font-medium text-slate-300 text-center mb-2">
            Enter your location to get the forecast.
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="location"
              id="location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
              placeholder="e.g., India  or 121102"
              aria-label="Location for weather forecast"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800"
            >
              Get
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
        </form>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700 p-6 min-h-[280px]">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Today's Forecast</h3>
        {renderContent()}
    </div>
  )
};

export default WeatherCard;
