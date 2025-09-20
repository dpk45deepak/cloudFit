
import React, { useRef, useState } from 'react';

interface AvatarManagerProps {
  avatarImage: string | null;
  onAvatarChange: (base64Image: string | null) => void;
  isProcessing: boolean;
}

const AvatarManager: React.FC<AvatarManagerProps> = ({ avatarImage, onAvatarChange, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="text-center p-6 bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-slate-100">Create Your Avatar</h3>
      <p className="text-sm text-slate-400 mt-1 mb-4">Upload a photo to personalize your recommendations.</p>
      
      <div className="relative w-40 h-40 rounded-full mb-4 bg-slate-700/50 border-2 border-dashed border-slate-600 flex items-center justify-center">
        {avatarImage ? (
          <img src={avatarImage} alt="User avatar" className="w-full h-full object-cover rounded-full" />
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />
      
      <button
        onClick={triggerFileSelect}
        disabled={isProcessing}
        className="px-5 py-2.5 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-colors disabled:opacity-50"
      >
        {avatarImage ? 'Change Photo' : 'Upload Photo'}
      </button>
      { isProcessing && <p className="text-sm text-indigo-400 mt-2 animate-pulse">Analyzing avatar...</p> }

    </div>
  );
};

export default AvatarManager;
