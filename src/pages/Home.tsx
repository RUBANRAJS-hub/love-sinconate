import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import ThreeHeart from '../components/ThreeHeart';

const loveQuotes = [
  "In your smile, I see something more beautiful than all the stars in the night sky. ✨",
  "You are my today and all of my tomorrows. I will choose you forever, Shobi. ❤️",
  "If I know what love is, it is because of you. You are my home, my anchor, and my peace.",
  "Every single day I find myself falling in love with you all over again, deeper than before. 🌸",
  "My favorite place in the entire universe is right next to you, listening to your sweet laughter.",
  "In a room full of art, my eyes would always search only for you, my masterpiece."
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Rotate quotes every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Soft typing animation for quotes
  useEffect(() => {
    setIsTyping(true);
    let currentText = '';
    const fullText = loveQuotes[quoteIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setDisplayedQuote(currentText);
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 35); // speed of typing

    return () => clearInterval(typingInterval);
  }, [quoteIndex]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
      {/* Background Starry / Floating Aurora is handled globally, but let's add custom localized gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0D1117_95%)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left Side: Text and Quotes */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left flex flex-col justify-center max-w-lg"
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 self-center lg:self-start bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary uppercase mb-6 shadow-[0_0_15px_rgba(255,79,129,0.15)] animate-pulse">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Ruban's Promise to Shobi</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Hi Shobi, My <span className="bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent text-neon-glow">Forever</span> Love.
          </h1>

          <p className="text-white/50 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-md">
            I built this interactive magical digital world for you to show you a piece of my heart. Click around, explore the roses, open the secrets, and listen to the melodies.
          </p>

          {/* Typewriter love quote section */}
          <div className="min-h-[110px] sm:min-h-[90px] mb-8 glass-panel rounded-2xl p-5 border border-white/10 relative shadow-inner overflow-hidden select-none">
            <div className="absolute top-3 left-4 text-xs font-mono text-primary/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Whispers of Love</span>
            </div>
            
            <p className="text-sm md:text-base font-serif italic text-white/90 leading-relaxed mt-4">
              {displayedQuote}
              {isTyping && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate('/letter')}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold tracking-wide shadow-[0_0_20px_rgba(255,79,129,0.4)] border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Open My Heart</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={() => navigate('/proposal')}
              className="px-8 py-4 rounded-full glass-panel-light hover:bg-white/10 text-white font-semibold tracking-wide border border-white/10 hover:border-primary/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Go to Proposal</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: 3D Heart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex-1 w-full flex items-center justify-center relative"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-primary/10 blur-[60px] animate-pulse pointer-events-none" />
          <div className="absolute w-[180px] h-[180px] rounded-full bg-gold/5 blur-[40px] animate-pulse pointer-events-none" style={{ animationDelay: '-1s' }} />
          
          {/* ThreeJS Heart Canvas */}
          <ThreeHeart />
        </motion.div>
      </div>

      {/* Scrolling bottom notice */}
      <div className="absolute bottom-6 hidden lg:block text-white/30 text-[10px] uppercase tracking-widest font-mono">
        Scroll Down to explore navigation or tap tabs above
      </div>
    </div>
  );
};
export default Home;
