import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
// Assuming HomePage exists at this path
import HomePage from './Pages/Home';
import FinalPage from './Pages/Final';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string; // URL string
}

interface ContactDetailProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

interface ProductGridProps {
  title: string;
  products?: Product[];
  items?: number;
  color: string; // Tailwind color name like 'pink', 'orange'
}

interface WeatherReport {
  temperature: string;
  condition: string;
}

// --- Utility Components (Retained from the previous file structure) ---

const ProductCard: React.FC<{ product: Product | { name: string; price: string; image?: string; index: number }, color: string }> = ({ product, color }) => {
  const isRealProduct = 'id' in product;
  const productName = isRealProduct ? product.name : product.name;
  const productPrice = isRealProduct ? product.price : product.price;
  const imageUrl = isRealProduct ? product.image : undefined;
  const index = isRealProduct ? product.id : product.index;

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02] cursor-pointer">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productName}
          className="h-40 w-full object-cover rounded-lg mb-3"
          loading="lazy"
        />
      ) : (
        <div className="h-40 w-full bg-gray-300 rounded-lg mb-3 flex items-center justify-center text-gray-600 font-medium">
          Product {index}
        </div>
      )}
      <p className="font-semibold text-gray-800 truncate">{productName}</p>
      <p className={`text-sm font-bold text-${color}-500`}>{productPrice}</p>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, items = 0, color }) => {
  const displayItems = products || Array.from({ length: items }).map((_, index) => ({
    name: `FitTech Tee`,
    price: `$49.99`,
    index: index + 1,
  }));

  return (
    <div className="mt-8">
      <h3 className={`text-2xl font-semibold mb-6 text-${color}-600`}>{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayItems.map((item, index) => (
          <ProductCard
            key={item.id || index}
            product={item as any} // Using 'as any' since ProductCard handles two types of objects
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, value }) => (
  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
    {icon}
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-gray-500 text-sm">{value}</p>
    </div>
  </div>
);

// --- View Components (Including the NEW/UPDATED OutfitRecommendationView) ---

const HomeView: React.FC = () => (
  <div className="text-center p-12 md:p-16 bg-white rounded-2xl shadow-xl border border-gray-100">
    <section className="relative p-6 lg:p-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-xl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-100 via-transparent to-pink-100 blur-3xl opacity-30"></div>
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight 
                       bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          MatchFit
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover your ideal outfit combinations tailored just for you. <br />
          MatchFit recommends clothes based on your body type, weight, style preferences, and even real-time weather reports to help you look and feel your best every day.
        </p>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Whether it’s casual, sporty, or elegant, we make dressing smart, effortless, and stylish.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 
                           text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Get Your Outfit
        </button>
      </div>
    </section>
    <HomePage />
  </div>
);

// Example recommended products (Moved outside the component for clarity)
const recommendedProducts: Product[] = [
  {
    id: 1,
    name: "Elegant Red Dress",
    price: "$69",
    image:
      "https://images.unsplash.com/photo-1600180758895-d6fa0d945acb?auto=format&fit=crop&w=800&q=90",
  },
  {
    id: 2,
    name: "Blue Denim Jacket",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=90",
  },
  {
    id: 3,
    name: "Green Hoodie",
    price: "$55",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=90",
  },
];

/**
 * UPDATED OutfitRecommendationView with Weather API integration
 */
const OutfitRecommendationView: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFetchWeather = async () => {
    if (!location.trim()) {
      setWeatherError("Please enter a location");
      return;
    }
    setIsLoadingWeather(true);
    setWeatherError(null);

    // Note: The OpenWeatherMap API key is placeholder (YOUR_API_KEY) and must be replaced 
    // for this to work in a live environment.
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message || "City not found.");
      }
      setWeather({
        temperature: data.main.temp.toFixed(1) + "°C",
        condition: data.weather[0].main,
      });
    } catch (err: any) {
      // Improved error handling to show a more user-friendly message
      setWeatherError(err.message === "Failed to fetch" ? "Network error. Check console." : "City not found or API error.");
    } finally {
      setIsLoadingWeather(false);
    }
  };

  return (
    <div className="p-8 lg:p-16 bg-slate-50 min-h-screen">
      <FinalPage/>
    </div>
  );
};

const ShopView: React.FC = () => (
  <div className="p-12 bg-white rounded-2xl shadow-xl">
    {/* <ShopPage /> */}
    <h2 className="text-4xl font-bold text-orange-500 mb-4">🛒 All Products</h2>
    <p className="text-gray-600">Browse our full catalog of performance gear, from basics to professional attire.</p>
    <ProductGrid title="Shop All Gear" items={6} color="orange" />
  </div>
);

const ContactView: React.FC = () => (
  <div className="p-12 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto">
    <h2 className="text-4xl font-bold text-pink-500 mb-8 text-center">Get In Touch</h2>
    <div className="space-y-6">
      <ContactDetail icon={<Mail className="w-6 h-6 text-purple-600" />} title="Email Support" value="support@matchfit.com" />
      <ContactDetail icon={<Phone className="w-6 h-6 text-purple-600" />} title="Customer Hotline" value="(+1) 555-MATCH" />
      <ContactDetail icon={<MapPin className="w-6 h-6 text-purple-600" />} title="Our Headquarters" value="123 Performance Way, Gear City, USA" />
    </div>
  </div>
);

const AboutUsView: React.FC = () => (
  <div className="p-12 bg-white rounded-2xl shadow-xl">
    <h2 className="text-4xl font-bold text-purple-600 mb-4">🌟 Our Mission</h2>
    <p className="text-gray-600 leading-relaxed max-w-3xl">
      MatchFit was founded on the belief that peak performance starts with perfect fit. We combine cutting-edge fabric technology with minimalist design to create apparel that empowers athletes of all levels. We are committed to sustainability, quality, and a relentless pursuit of excellence in every stitch.
    </p>
    <div className="mt-8 text-lg font-medium text-gray-800">Founded: 2024 | Location: Global | Values: Quality, Fit, Sustainability</div>
  </div>
);


/**
 * The main application component containing the fully responsive Header and client-side router.
 */
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const isProcessing = false;

  const navItems = ["Home", "Outfit", "Shop", "Contact", "About Us"];

  const handleNavigation = (pageName: string) => {
    setCurrentPage(pageName);
    setIsMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomeView />;
      case "Outfit":
        return <OutfitRecommendationView />;
      case "Shop":
        return <ShopView />;
      case "Contact":
        return <ContactView />;
      case "About Us":
        return <AboutUsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* --- Responsive Header Component --- */}
      <header className="flex justify-between items-center py-5 px-4 lg:px-12 border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">

        {/* Logo */}
        <div
          onClick={() => handleNavigation("Home")}
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent cursor-pointer select-none">
          MatchFit
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 xl:space-x-12">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item)}
              className={`relative group py-2 transition-colors text-lg font-medium focus:outline-none ${currentPage === item
                  ? 'text-black font-bold'
                  : 'text-gray-700 hover:text-black'
                }`}
            >
              <span>{item}</span>
              <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full ${currentPage === item ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </nav>

        {/* Utility Icons and Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">

          <Search className="h-5 w-5 cursor-pointer text-gray-600 hover:text-purple-600 transition-colors hidden sm:block" />
          <ShoppingBag className="h-5 w-5 cursor-pointer text-gray-600 hover:text-pink-600 transition-colors" />
          <User className="h-5 w-5 cursor-pointer text-gray-600 hover:text-orange-500 transition-colors hidden sm:block" />

          {/* Desktop Sign In Button */}
          <button
            className="hidden sm:block px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            disabled={isProcessing}>
            Sign In
          </button>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Dropdown */}
      <nav
        className={`lg:hidden fixed top-[69px] w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40 overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100 border-t border-gray-200" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={`mobile-${item}`}
              onClick={() => handleNavigation(item)}
              className={`w-full text-left py-3 px-2 text-lg font-medium transition-colors border-b border-gray-100 last:border-b-0 
                ${currentPage === item ? 'text-purple-600 font-semibold bg-gray-50' : 'text-gray-700 hover:text-purple-600'}`
              }
            >
              {item}
            </button>
          ))}

          {/* Mobile Sign In Button */}
          <button
            className="w-full mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-300 sm:hidden"
            disabled={isProcessing}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Main content area */}
      <main className="p-4 lg:p-12">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;