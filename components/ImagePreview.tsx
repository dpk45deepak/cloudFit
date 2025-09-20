
import React from 'react';
import Loader from './Loader';

interface ImagePreviewProps {
  imageUrl?: string;
  isLoading?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="w-full aspect-[3/4] bg-slate-900 flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center">
            <Loader />
            <p className="text-sm text-slate-400 mt-2">Creating image...</p>
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt="AI generated outfit" className="w-full h-full object-cover animate-fade-in" />
      ) : (
        <div className="text-center text-slate-500 p-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm">Click "Visualize" to see this outfit.</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
