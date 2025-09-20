
import React, { useState, useCallback, useEffect } from 'react';
import { AppStep, UserProfile, OccasionContext, VisualizedOutfit, WeatherReport } from './types';
import { generateOutfitRecommendations, visualizeOutfit, generateWeatherReport, describePersonInImage } from './services/geminiService';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfileStep from './components/ProfileStep';
import ContextStep from './components/ContextStep';
import ResultsView from './components/ResultsView';
import StepIndicator from './components/StepIndicator';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Home);
  const [userProfile, setUserProfile] =useState<UserProfile>({
    bodyType: 'Average',
    style: 'Casual',
    colors: [],
    fit: 'Comfortable',
    avatarImage: null,
    avatarDescription: null,
  });
  const [occasionContext, setOccasionContext] = useState<OccasionContext>({
    occasion: 'Everyday',
    weather: 'Mild and sunny, about 20°C',
  });
  const [recommendations, setRecommendations] = useState<VisualizedOutfit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [isProcessingAvatar, setIsProcessingAvatar] = useState<boolean>(false);

  const handleFetchWeather = async (location: string) => {
    if (!location.trim()) {
      setWeatherError("Please enter a location.");
      return;
    }
    setIsLoadingWeather(true);
    setWeatherError(null);
    setWeather(null); // Clear previous weather data
    try {
      const report = await generateWeatherReport(location);
      setWeather(report);
    } catch (e) {
      setWeatherError(`Failed to get weather for that location. Please try again.`);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleAvatarChange = async (base64Image: string | null) => {
    if (!base64Image) {
        setUserProfile(prev => ({ ...prev, avatarImage: null, avatarDescription: null }));
        return;
    }

    setUserProfile(prev => ({ ...prev, avatarImage: base64Image, avatarDescription: null }));
    setIsProcessingAvatar(true);
    try {
        // extract base64 data part
        const imageData = base64Image.split(',')[1];
        const description = await describePersonInImage(base64Image);
        setUserProfile(prev => ({ ...prev, avatarDescription: description }));
    } catch(e) {
        setError(`Failed to process avatar: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
        setIsProcessingAvatar(false);
    }
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    setStep(AppStep.Context);
  };
  
  const handleGetTodaysLook = () => {
    if (!weather) {
        setError("Weather data is not available to make a recommendation.");
        return;
    }
    const context: OccasionContext = {
        occasion: 'Everyday Wear based on today\'s weather',
        weather: `${weather.condition}, around ${weather.temperature}°C`
    };
    handleContextSubmit(context);
  };

  const handleContextSubmit = async (context: OccasionContext) => {
    setOccasionContext(context);
    setStep(AppStep.Results);
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await generateOutfitRecommendations(userProfile, context);
      if (result) {
        setRecommendations(result.map(r => ({ ...r, isLoadingImage: false })));
      } else {
         setError('Failed to get recommendations. The response was empty.');
      }
    } catch (e) {
      setError(`An error occurred: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualize = useCallback(async (outfitIndex: number) => {
    setRecommendations(prev => 
      prev.map((rec, index) => 
        index === outfitIndex ? { ...rec, isLoadingImage: true } : rec
      )
    );

    try {
      const outfitToVisualize = recommendations[outfitIndex];
      const imageUrl = await visualizeOutfit(outfitToVisualize, userProfile);
      setRecommendations(prev =>
        prev.map((rec, index) =>
          index === outfitIndex ? { ...rec, imageUrl, isLoadingImage: false } : rec
        )
      );
    } catch (e) {
      setError(`Failed to generate image: ${e instanceof Error ? e.message : String(e)}`);
      setRecommendations(prev =>
        prev.map((rec, index) =>
          index === outfitIndex ? { ...rec, isLoadingImage: false } : rec
        )
      );
    }
  }, [recommendations, userProfile]);

  const handleReset = () => {
    setStep(AppStep.Home);
    setRecommendations([]);
    setError(null);
  };
  
  const renderStep = () => {
    switch (step) {
      case AppStep.Home:
        return <HomePage 
            weather={weather}
            isLoadingWeather={isLoadingWeather}
            weatherError={weatherError}
            onFetchWeather={handleFetchWeather}
            userProfile={userProfile}
            onAvatarChange={handleAvatarChange}
            isProcessingAvatar={isProcessingAvatar}
            onGetTodaysLook={handleGetTodaysLook}
            onStartStylingSession={() => setStep(AppStep.Profile)}
        />;
      case AppStep.Profile:
        return <ProfileStep onNext={handleProfileSubmit} initialProfile={userProfile}/>;
      case AppStep.Context:
        return <ContextStep onBack={() => setStep(AppStep.Profile)} onGenerate={handleContextSubmit} initialContext={occasionContext} />;
      case AppStep.Results:
        return <ResultsView recommendations={recommendations} isLoading={isLoading} error={error} onVisualize={handleVisualize} onReset={handleReset}/>;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white antialiased">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-900"
      ></div>
      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        {step !== AppStep.Home && <StepIndicator currentStep={step} />}
        <main className="mt-8">
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;
