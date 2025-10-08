
export enum AppStep {
  Home,
  Profile,
  Context,
  Results,
}

export interface WeatherReport {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  summary: string;
  rain: number; // Chance of rain as a percentage
}

export interface UserProfile {
  bodyType: string;
  style: string;
  colors: string[];
  fit: string;
  avatarImage?: string | null; // Base64 image data URL
  avatarDescription?: string | null; // AI-generated description of the person in the image
}

export interface OccasionContext {
  occasion: string;
  weather: string;
}

export interface OutfitItem {
  name: string;
  description: string;
}

export interface OutfitRecommendation {
  outfitName: string;
  description: string;
  items: OutfitItem[];
}

export interface VisualizedOutfit extends OutfitRecommendation {
  imageUrl?: string;
  isLoadingImage?: boolean;
}
