
import React from 'react';
import { VisualizedOutfit } from '../types';
import OutfitCard from './OutfitCard';
import Loader from './Loader';

interface ResultsViewProps {
  recommendations: VisualizedOutfit[];
  isLoading: boolean;
  error: string | null;
  onVisualize: (index: number) => void;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ recommendations, isLoading, error, onVisualize, onReset }) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />
        <p className="mt-4 text-slate-300 text-lg">Your personal stylist is curating your looks...</p>
        <p className="text-slate-500 text-sm">This might take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-red-900/20 border border-red-500/50 p-6 rounded-lg max-w-lg mx-auto">
        <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
        <p className="mt-2 text-red-400">{error}</p>
        <button onClick={onReset} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8">Your Personalized Recommendations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recommendations.map((rec, index) => (
                <OutfitCard key={index} outfit={rec} onVisualize={() => onVisualize(index)} />
            ))}
        </div>
         <div className="text-center mt-12">
            <button onClick={onReset} className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75">
                Create a New Look
            </button>
        </div>
    </div>
  );
};

export default ResultsView;
