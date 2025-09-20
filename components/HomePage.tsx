
import React from 'react';
import WeatherCard from './WeatherCard';
import AvatarManager from './AvatarManager';
import { WeatherReport, UserProfile } from '../types';

interface HomePageProps {
  weather: WeatherReport | null;
  isLoadingWeather: boolean;
  weatherError: string | null;
  onFetchWeather: (location: string) => void;
  userProfile: UserProfile;
  onAvatarChange: (base64Image: string | null) => void;
  isProcessingAvatar: boolean;
  onGetTodaysLook: () => void;
  onStartStylingSession: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  weather,
  isLoadingWeather,
  weatherError,
  onFetchWeather,
  userProfile,
  onAvatarChange,
  isProcessingAvatar,
  onGetTodaysLook,
  onStartStylingSession
}) => {
  return (
    <div className="animate-fade-in" style={{minHeight: '60vh'}}>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-100">Welcome, Stylist</h2>
            <p className="mt-2 max-w-2xl mx-auto text-slate-400">
                Let's find the perfect look for you. Start with today's weather or begin a full styling session.
            </p>
        </div>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
            <AvatarManager 
                avatarImage={userProfile.avatarImage || null} 
                onAvatarChange={onAvatarChange}
                isProcessing={isProcessingAvatar}
            />
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                <p className="text-slate-300 mb-4">Ready to find your style?</p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button
                        onClick={onGetTodaysLook}
                        disabled={!weather || isProcessingAvatar}
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transform transition-transform duration-200 hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
                        title={!weather ? "Weather data is needed for this feature." : ""}
                        >
                        Get Today's Look
                    </button>
                    <button
                        onClick={onStartStylingSession}
                        disabled={isProcessingAvatar}
                        className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 disabled:opacity-50"
                        >
                        Full Styling Session
                    </button>
                 </div>
            </div>
        </div>
        <div>
            <WeatherCard weather={weather} isLoading={isLoadingWeather} error={weatherError} onFetchWeather={onFetchWeather} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
