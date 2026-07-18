import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Trigger sweet burst of confetti
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#FF4F81', '#FFCCD5', '#D4AF37'],
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Main envelope display */}
      <div className="w-full max-w-2xl flex flex-col items-center z-10">
        
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 text-center drop-shadow-md">
          A Message for Shobi
        </h2>
        <p className="text-white/40 text-xs tracking-wider uppercase font-semibold mb-12 text-center">
          Click the seal to read what is written inside
        </p>

        <div className="relative w-full max-w-md h-[280px] sm:h-[320px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope closed state */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50, rotate: -5 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onClick={handleOpen}
                className="relative w-72 h-52 sm:w-80 sm:h-56 bg-gradient-to-br from-[#FFCCD5] to-[#FF80AB] rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/20 cursor-pointer flex flex-col items-center justify-center hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
              >
                {/* Flap outline shadows */}
                <div className="absolute top-0 left-0 right-0 h-0 border-t-[100px] border-t-white/10 border-x-[144px] sm:border-x-[160px] border-x-transparent pointer-events-none rounded-t-xl" />
                <div className="absolute bottom-0 left-0 right-0 h-0 border-b-[112px] sm:border-b-[128px] border-b-white/5 border-x-[144px] sm:border-x-[160px] border-x-transparent pointer-events-none rounded-b-xl" />

                {/* Wax seal */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary border-4 border-white/30 flex items-center justify-center shadow-[0_5px_15px_rgba(255,79,129,0.6)] group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
                </div>
                
                <span className="absolute bottom-4 text-[10px] text-primary/80 uppercase font-bold tracking-widest">
                  Tap to Seal Break
                </span>
              </motion.div>
            ) : (
              /* Unfolded expanded letter */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'backOut' }}
                className="absolute inset-0 w-full h-[450px] sm:h-[500px] -top-16 glass-panel rounded-3xl p-6 md:p-8 flex flex-col border border-primary/20 shadow-[0_15px_45px_rgba(255,79,129,0.15)] relative overflow-hidden"
              >
                {/* Vintage Letter Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 select-none">
                  <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest flex items-center gap-1">
                    <MailOpen className="w-3.5 h-3.5" />
                    <span>My Heart's Whisper</span>
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Scripted Content Container */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar font-cursive text-xl md:text-2xl text-white/95 leading-relaxed space-y-4">
                  <p className="font-bold">Dearest Shobi,</p>
                  
                  <p>
                    Writing this letter feels like capturing a sunset in a bottle—words seem too simple to reflect the warmth you bring into my life. Every day since you walked into my world, you have filled it with a light I never knew was missing.
                  </p>
                  
                  <p>
                    Your smile is my favorite piece of art. Your voice is my favorite melody. Your presence is the only place where I feel truly, completely at home. You are my partner in laughter, my support in silence, and my guide in the stars.
                  </p>
                  
                  <p>
                    I built this space because simple messages aren't enough for someone as extraordinary as you. This is a monument to our laughter, our promises, and our dreams.
                  </p>
                  
                  <p>
                    Thank you for being my queen, my best friend, and my greatest adventure. I love you, Shobi, more than words could ever describe, more than the stars in the night sky.
                  </p>
                  
                  <p className="text-right pr-6 mt-6">
                    Forever Yours, <br />
                    <span className="text-primary font-bold">Ruban</span>
                  </p>
                </div>

                {/* Letter action bar */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center select-none">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    Close Letter
                  </button>
                  
                  <a 
                    href="/timeline" 
                    onClick={(e) => { e.preventDefault(); window.location.href='/timeline' }}
                    className="flex items-center gap-1 text-xs text-primary font-bold hover:text-accent transition-colors"
                  >
                    <span>Read Our Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Bottom ribbon decorative shape */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
export default LoveLetter;
