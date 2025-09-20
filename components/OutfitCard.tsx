
import React from 'react';
import { VisualizedOutfit } from '../types';
import ImagePreview from './ImagePreview';

interface OutfitCardProps {
  outfit: VisualizedOutfit;
  onVisualize: () => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onVisualize }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
      <ImagePreview imageUrl={outfit.imageUrl} isLoading={outfit.isLoadingImage} />
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100">{outfit.outfitName}</h3>
        <p className="mt-2 text-sm text-slate-400 flex-grow">{outfit.description}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-700">
          <h4 className="font-semibold text-slate-300 mb-2">Key Items:</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {outfit.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1 text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span><strong>{item.name}:</strong> {item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={onVisualize}
            disabled={!!outfit.imageUrl || outfit.isLoadingImage}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors"
          >
            {outfit.isLoadingImage ? 'Generating...' : outfit.imageUrl ? 'Visualized!' : 'Visualize Outfit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
