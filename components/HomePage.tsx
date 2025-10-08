import React, { useState } from "react";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherCard";
import AvatarManager from "./AvatarManager";
import { WeatherReport, UserProfile } from "../types";

interface HomePageProps {
  weather: WeatherReport | null;
  isLoadingWeather: boolean;
  weatherError: string | null;
  onFetchWeather: (location: string) => void;
  userProfile: UserProfile;
  onAvatarChange: (base64Image: string | null) => void;
  isProcessingAvatar: boolean;
  onGetTodaysLook: () => void;
  onStartStylingSession: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  weather,
  isLoadingWeather,
  weatherError,
  onFetchWeather,
  userProfile,
  onAvatarChange,
  isProcessingAvatar,
  onGetTodaysLook,
  onStartStylingSession,
}) => {
  const [isHoveredToday, setIsHoveredToday] = useState(false);
  const [isHoveredSession, setIsHoveredSession] = useState(false);

  return (
    <div className="relative bg-transparent rounded-xl overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full animate-[pulse_8s_ease-in-out_infinite] filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full animate-[pulse_10s_ease-in-out_infinite] filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600/15 rounded-full animate-[pulse_12s_ease-in-out_infinite] filter blur-3xl" />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          }}
          animate={{
            y: [null, -20, 0],
            x: [null, 10, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
        {/* Welcome section */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-300 to-purple-400 drop-shadow-lg mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome, Stylist{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              ✨
            </motion.span>
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Your personalized fashion companion. Check today's weather, update
            your avatar, and discover a style made just for you.
          </motion.p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-start">
          {/* Left Side */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <AvatarManager
              avatarImage={userProfile.avatarImage || null}
              onAvatarChange={onAvatarChange}
              isProcessing={isProcessingAvatar}
            />

            {/* Action card */}
            <motion.div
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.2 },
              }}
            >
              <p className="text-slate-200 mb-6 text-center text-lg font-medium">
                What would you like to do today?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Today's Look Button */}
                <motion.button
                  onClick={onGetTodaysLook}
                  disabled={!weather || isProcessingAvatar}
                  onHoverStart={() => setIsHoveredToday(true)}
                  onHoverEnd={() => setIsHoveredToday(false)}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: isHoveredToday ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      🌤
                    </motion.span>
                    Get Today's Look
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: isHoveredToday ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>

                {/* Styling Session Button */}
                <motion.button
                  onClick={onStartStylingSession}
                  disabled={isProcessingAvatar}
                  onHoverStart={() => setIsHoveredSession(true)}
                  onHoverEnd={() => setIsHoveredSession(false)}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex-1 px-6 py-4 rounded-xl bg-slate-800/70 text-white font-semibold shadow-md overflow-hidden group border border-slate-700/50 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                      animate={{
                        scale: isHoveredSession ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      💃
                    </motion.span>
                    Full Styling Session
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-slate-700/50 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: isHoveredSession ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            <WeatherCard
              weather={weather}
              isLoading={isLoadingWeather}
              error={weatherError}
              onFetchWeather={onFetchWeather}
            />
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-10 bottom-10 text-slate-500/30 text-7xl rotate-12 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          👗
        </motion.div>
        <motion.div
          className="absolute right-10 top-20 text-slate-500/30 text-7xl -rotate-12 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          👠
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
