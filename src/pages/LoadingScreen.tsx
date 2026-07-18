import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLove } from '../context/LoveContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Fingerprint } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoadingScreen: React.FC = () => {
  const { setLoveUnlocked, setIsPlaying } = useLove();
  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading Love...');
  const [isPressing, setIsPressing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Loading text sequence
  useEffect(() => {
    const texts = [
      'Loading Love...',
      'Opening memory vaults...',
      'Synchronizing heartbeats...',
      'Polishing romantic stars...',
      'Ready for Shobi ❤️'
    ];
    
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < texts.length - 1) {
        textIndex++;
        setLoadingText(texts[textIndex]);
      }
    }, 1200);

    const percentInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(percentInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(percentInterval);
    };
  }, []);

  // Fingerprint Scanner holding progress
  useEffect(() => {
    let interval: number;
    
    if (isPressing && percent >= 100 && !isUnlocked) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            triggerUnlock();
            return 100;
          }
          return prev + 5; // Scan takes 1 second
        });
      }, 50);
    } else {
      setScanProgress(0);
    }

    return () => clearInterval(interval);
  }, [isPressing, percent]);

  // Listen for Enter key press on laptop/keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && percent >= 100 && !isUnlocked) {
        setIsPressing(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsPressing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [percent, isUnlocked]);

  const triggerUnlock = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF4F81', '#FF80AB', '#FFCCD5', '#D4AF37']
    });

    // Start background music
    setIsPlaying(true);

    setTimeout(() => {
      setLoveUnlocked(true);
      navigate('/home');
    }, 1500); // Allow zoom fade-out animation to complete
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-[#0D1117] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Starry Sky Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,27,34,0.8)_0%,rgba(13,17,23,1)_100%)]" />
      
      {/* Floating Sparkles Backdrop */}
      <div className="absolute top-[20%] left-[30%] w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[30%] w-72 h-72 rounded-full bg-accent/5 blur-[100px] animate-pulse" style={{ animationDelay: '-1.5s' }} />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="scanner-layout"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center"
          >
            {/* Top Glowing Heart */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                filter: [
                  'drop-shadow(0 0 10px rgba(255, 79, 129, 0.4))',
                  'drop-shadow(0 0 25px rgba(255, 79, 129, 0.8))',
                  'drop-shadow(0 0 10px rgba(255, 79, 129, 0.4))'
                ]
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity,
                ease: 'easeInOut' 
              }}
              className="mb-8"
            >
              <Heart className="w-20 h-20 text-primary fill-primary" />
            </motion.div>

            {/* Custom Welcome title */}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white mb-2">
              For My Queen Shobi
            </h1>
            <p className="text-white/40 text-xs tracking-wider uppercase font-semibold mb-12">
              A Premium Love Experience
            </p>

            {/* Stage 1: Loading Progress Bar */}
            {percent < 100 ? (
              <div className="w-64">
                <div className="flex justify-between items-center text-[10px] text-white/50 tracking-widest uppercase font-bold mb-2">
                  <span>{loadingText}</span>
                  <span className="font-mono">{percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${percent}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              </div>
            ) : (
              /* Stage 2: Biometric Fingerprint Unlock */
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-white/70 text-xs mb-8 max-w-[270px] leading-relaxed">
                  Hold your finger on the sensor below or <strong>press & hold the Enter key</strong> on your keyboard to verify your identity.
                </p>

                {/* Fingerprint Button Container */}
                <div className="relative flex items-center justify-center">
                  {/* Scanner Radar Wave Ring */}
                  {isPressing && (
                    <span className="absolute w-28 h-28 rounded-full border border-primary/40 animate-ping pointer-events-none" />
                  )}
                  
                  {/* Glowing Outline Circular Progress */}
                  <svg className="w-24 h-24 transform -rotate-90 pointer-events-none absolute">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="3"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="#FF4F81"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - scanProgress / 100)}
                      className="transition-all duration-75"
                    />
                  </svg>

                  {/* Scanner Sensor Button */}
                  <button
                    onMouseDown={() => setIsPressing(true)}
                    onMouseUp={() => setIsPressing(false)}
                    onMouseLeave={() => setIsPressing(false)}
                    onTouchStart={() => setIsPressing(true)}
                    onTouchEnd={() => setIsPressing(false)}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center glass-panel border border-white/10 hover:border-primary/50 text-white cursor-pointer transition-all duration-300 ${
                      isPressing 
                        ? 'bg-primary/20 scale-95 shadow-[0_0_25px_rgba(255,79,129,0.5)] border-primary/50 text-primary' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <Fingerprint className="w-8 h-8" />
                    
                    {/* Laser Scanner Horizontal Grid Bar */}
                    {isPressing && (
                      <motion.div 
                        initial={{ top: '10%' }}
                        animate={{ top: ['10%', '80%', '10%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-1.5 right-1.5 h-[2px] bg-primary shadow-[0_0_8px_#FF4F81] pointer-events-none z-20"
                      />
                    )}
                  </button>
                </div>

                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-4">
                  {isPressing ? 'Analyzing Biometrics...' : 'Press & hold sensor / Enter key'}
                </span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Stage 3: Space flight exit transition */
          <motion.div 
            key="stars-fly"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-[#090C10]"
          >
            {/* Star tunnel field */}
            <div className="stars-tunnel absolute inset-0 opacity-80" />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-center z-10"
            >
              <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-4 animate-bounce" />
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide">
                Welcome Shobi ❤️
              </h2>
              <p className="text-white/60 text-sm mt-2 italic font-serif">
                "I made something special only for you."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default LoadingScreen;
