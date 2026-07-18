import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, MapPin, Heart, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecretPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [surpriseClicked, setSurpriseClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'shobi') {
      setIsUnlocked(true);
      setErrorMsg('');
      confetti({
        particleCount: 100,
        spread: 70,
        colors: ['#FF4F81', '#FF80AB', '#D4AF37']
      });
    } else {
      setErrorMsg('Incorrect Password. Hint: What is your name? (lowercase)');
      // shake screen
      confetti({
        particleCount: 5,
        spread: 10,
        colors: ['#ef4444']
      });
    }
  };

  const handleSurpriseClick = () => {
    setSurpriseClicked(true);
    
    // Continuous fireworks and confetti bursts
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // center firework
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-20 px-6 transition-all duration-1000 ${
      surpriseClicked ? 'bg-gradient-to-br from-[#FF4F81] via-[#FF80AB] to-[#0D1117]' : 'bg-[#0D1117]'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* Locked Vault Screen */
          <motion.div
            key="locked-vault"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.5)] w-full max-w-md z-10"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary/75 mb-6 animate-pulse shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Secret Vault Lock</h3>
            <p className="text-white/40 text-xs tracking-wider uppercase font-semibold mb-6">Enter Password to Decrypt</p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl glass-panel border border-white/10 text-white text-center text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
              />

              {errorMsg && (
                <span className="text-red-400 text-xs font-semibold text-center select-none">
                  {errorMsg}
                </span>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold tracking-wide shadow-[0_4px_15px_rgba(255,79,129,0.3)] hover:scale-103 active:scale-97 cursor-pointer transition-all mt-2"
              >
                Unlock Vault
              </button>
            </form>
          </motion.div>
        ) : (
          /* Unlocked Chamber Page */
          <motion.div
            key="unlocked-chamber"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl flex flex-col items-center z-10"
          >
            {/* Header */}
            <div className="text-center max-w-lg mb-10 select-none">
              <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
                <Unlock className="w-3.5 h-3.5 text-gold" />
                <span>Vault Decrypted</span>
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
                Our Secret Chamber
              </h2>
              <p className="text-white/40 text-xs md:text-sm">
                Unveiling coordinates of our history, private logs, and specialized triggers.
              </p>
            </div>

            {/* Content Cards Row */}
            <div className="w-full flex flex-col md:flex-row gap-6 items-stretch mb-8">
              
              {/* Left Side: Styled First Meet Map */}
              <div className="flex-1 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between select-none">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-white/50 mb-3.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Coordinates of First Meet</span>
                  </h3>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    The exact coordinate matrix where our timelines intersected. Marked with a permanent beacon of love.
                  </p>
                </div>

                {/* Styled Vector Map Grid */}
                <div className="relative w-full h-44 border border-white/5 bg-[#090C10] rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                  
                  {/* Map Roads / Topology */}
                  <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,20 Q40,50 100,30" stroke="#FF4F81" strokeWidth="1" fill="none" />
                    <path d="M20,0 Q60,60 50,100" stroke="#FF80AB" strokeWidth="0.8" fill="none" />
                    <path d="M0,80 C30,70 70,90 100,60" stroke="#D4AF37" strokeWidth="0.6" fill="none" />
                  </svg>

                  {/* Radar Scanning Circles */}
                  <div className="absolute w-24 h-24 rounded-full border border-primary/20 animate-[ping_2s_infinite] pointer-events-none" />
                  <div className="absolute w-12 h-12 rounded-full border border-primary/30 animate-[ping_3s_infinite] pointer-events-none" style={{ animationDelay: '0.5s' }} />

                  {/* Heart glowing Pin */}
                  <div className="relative z-10 flex flex-col items-center justify-center animate-bounce">
                    <Heart className="w-7 h-7 text-primary fill-primary drop-shadow-[0_0_8px_rgba(255,79,129,0.8)]" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-0.5 shadow-md" />
                  </div>

                  {/* Details Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/40 border border-white/5 px-2.5 py-1 rounded-lg backdrop-blur-md text-[8px] font-mono text-white/50 tracking-wider">
                    COORD: 40.7128° N, 74.0060° W
                  </div>
                </div>

                <div className="text-center text-[10px] text-white/40 mt-3 font-semibold">
                  "Scenic Park Walkway • The Start of Forever"
                </div>
              </div>

              {/* Right Side: Surprise Trigger button */}
              <div className="flex-1 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between items-center text-center">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-white/50 mb-3.5 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span>Danger Alert</span>
                  </h3>
                  <p className="text-xs text-white/60 mb-8 leading-relaxed max-w-xs">
                    This button contains a payload of compressed affection. Click at your own risk. Do not press.
                  </p>
                </div>

                {/* Surprise Button */}
                {!surpriseClicked ? (
                  <button
                    onClick={handleSurpriseClick}
                    className="w-40 h-40 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg border-4 border-white/10 shadow-[0_12px_30px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center select-none cursor-pointer group"
                  >
                    <div className="flex flex-col items-center gap-1 group-hover:animate-shake">
                      <Heart className="w-6 h-6 fill-white text-white" />
                      <span>DON'T CLICK</span>
                    </div>
                  </button>
                ) : (
                  /* Triggered State */
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Heart className="w-16 h-16 text-white fill-white animate-pulse drop-shadow-[0_0_20px_#ffffff] mb-3" />
                    <h3 className="text-2xl font-serif text-white font-bold text-glow select-none">
                      I LOVE YOU SHOBI!
                    </h3>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest font-mono font-bold mt-2 select-none">
                      Forever and Ever ❤️
                    </p>
                  </motion.div>
                )}

                <span className="text-[9px] text-white/30 tracking-widest font-mono uppercase mt-4">
                  {surpriseClicked ? 'Warning: Affection Overflow!' : 'Secure protocol initialized'}
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SecretPage;
