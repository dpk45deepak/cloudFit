
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
