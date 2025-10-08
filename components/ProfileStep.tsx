
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileStepProps {
  onNext: (profile: UserProfile) => void;
  initialProfile: UserProfile;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ onNext, initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [colorsInput, setColorsInput] = useState<string>(initialProfile.colors.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colors = colorsInput.split(',').map(c => c.trim()).filter(Boolean);
    onNext({ ...profile, colors });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6 text-slate-100">Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-8 rounded-xl shadow-2xl border border-slate-700">
        <div>
          <label htmlFor="bodyType" className="block text-sm font-medium text-slate-300">Body Type</label>
          <select id="bodyType" name="bodyType" value={profile.bodyType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
            <option>Average</option>
            <option>Athletic</option>
            <option>Slim</option>
            <option>Curvy</option>
            <option>Broad Shoulders</option>
          </select>
           <p className="mt-2 text-xs text-slate-500">Describe your general build to help us find the right fit.</p>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-slate-300">Preferred Style</label>
          <select id="style" name="style" value={profile.style} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
            <option>Casual</option>
            <option>Formal</option>
            <option>Streetwear</option>
            <option>Bohemian</option>
            <option>Minimalist</option>
            <option>Sporty</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">What's your go-to fashion vibe?</p>
        </div>

        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-slate-300">Favorite Colors</label>
          <input type="text" id="colors" name="colors" value={colorsInput} onChange={(e) => setColorsInput(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="e.g., navy blue, beige, forest green" />
          <p className="mt-2 text-xs text-slate-500">List some colors you love, separated by commas.</p>
        </div>

        <div>
          <label htmlFor="fit" className="block text-sm font-medium text-slate-300">Preferred Fit</label>
           <select id="fit" name="fit" value={profile.fit} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
            <option>Comfortable</option>
            <option>Slim Fit</option>
            <option>Oversized</option>
            <option>Tailored</option>
          </select>
           <p className="mt-2 text-xs text-slate-500">How do you like your clothes to fit?</p>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transform transition-transform duration-200 hover:scale-105">
            Next: Occasion
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileStep;
