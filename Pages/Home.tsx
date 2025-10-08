import React from 'react';
import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import FooterContent from '../components/Home/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* <Header /> */}
      <main>
        <HeroSection />
        {/* Placeholder for the Footer Content/Testimonial section */}
        <FooterContent /> 
      </main>
    </div>
  );
};

export default App;