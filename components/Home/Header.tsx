import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

/**
 * The main application component containing the fully responsive Header.
 * It features a standard navigation bar on large screens (lg) and a toggleable
 * drawer menu (hamburger icon) for mobile and tablet devices.
 */
const App = () => {
  // State to manage the visibility of the mobile navigation menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Simulating the isProcessing prop from the user's snippet
  const isProcessing = false;

  const navItems = ["Home", "New Arrival", "Shop", "Contact", "About Us"];

  return (
  <>      
      {/* --- Responsive Header Component --- */}
      <header className="flex justify-between items-center py-5 px-4 lg:px-12 border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent cursor-pointer select-none">
          MatchFit
        </div>

        {/* Desktop Navigation (Visible only on large screens and up) */}
        <nav className="hidden lg:flex space-x-8 xl:space-x-12 font-medium text-gray-700">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="relative group py-2 transition-colors hover:text-black"
            >
              <span>{item}</span>
              {/* underline effect */}
              <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          ))}
        </nav>

        {/* Utility Icons and Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Search, Cart, User Icons (Search and User hidden on small phones for space) */}
          <Search className="h-5 w-5 cursor-pointer text-gray-600 hover:text-purple-600 transition-colors hidden sm:block" />
          <ShoppingBag className="h-5 w-5 cursor-pointer text-gray-600 hover:text-pink-600 transition-colors" />
          <User className="h-5 w-5 cursor-pointer text-gray-600 hover:text-orange-500 transition-colors hidden sm:block" />
          
          {/* Desktop Sign In Button (Hidden on small mobile to make space for Menu) */}
          <button 
            className="hidden sm:block px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            disabled={isProcessing}>
            Sign In
          </button>

          {/* Mobile Menu Button (Hamburger/X) - Visible only on mobile/tablet (lg:hidden) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
            disabled={isProcessing}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown (Appears below the header on small screens) */}
      <nav
        className={`lg:hidden fixed top-[69px] w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 border-t border-gray-200" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={`mobile-${item}`}
              href="#"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
              className="py-2 text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {item}
            </a>
          ))}
          
          {/* Mobile Sign In Button (Visible only on small phones) */}
          <button 
            className="w-full mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-300 sm:hidden"
            disabled={isProcessing}>
            Sign In
          </button>
        </div>
      </nav>
      </>
  );
};

export default App;
