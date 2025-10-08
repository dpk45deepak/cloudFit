
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text pb-2">
        AI Virtual Stylist
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Your personal fashion assistant, powered by Gemini.
      </p>
    </header>
  );
};

export default Header;
