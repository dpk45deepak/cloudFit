
import React, { useState } from 'react';
import { OccasionContext } from '../types';

interface ContextStepProps {
  onBack: () => void;
  onGenerate: (context: OccasionContext) => void;
  initialContext: OccasionContext;
}

const ContextStep: React.FC<ContextStepProps> = ({ onBack, onGenerate, initialContext }) => {
  const [context, setContext] = useState<OccasionContext>(initialContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(context);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContext(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6 text-slate-100">Set the Scene</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-8 rounded-xl shadow-2xl border border-slate-700">
        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-slate-300">Occasion</label>
          <select id="occasion" name="occasion" value={context.occasion} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
            <option>Everyday Wear</option>
            <option>Office / Business Casual</option>
            <option>Wedding Guest</option>
            <option>Night Out / Party</option>
            <option>Workout / Gym</option>
            <option>Formal Event</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">What's the event you're dressing for?</p>
        </div>

        <div>
          <label htmlFor="weather" className="block text-sm font-medium text-slate-300">Weather Conditions</label>
          <textarea id="weather" name="weather" value={context.weather} onChange={handleInputChange} rows={3} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="e.g., Cold and rainy, around 5°C" />
          <p className="mt-2 text-xs text-slate-500">Describe the weather. Include temperature, precipitation, and wind if possible.</p>
        </div>

        <div className="flex justify-between items-center">
          <button type="button" onClick={onBack} className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-colors">
            Back
          </button>
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transform transition-transform duration-200 hover:scale-105">
            Generate My Style
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContextStep;
