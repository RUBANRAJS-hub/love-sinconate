import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, ShieldCheck } from 'lucide-react';

export const Promises: React.FC = () => {
  const promisesList = [
    "I promise to always listen to you, even in silence.",
    "I promise to hold you tight whenever the world gets too noisy.",
    "I promise to stand by your side in every single storm we face.",
    "I promise to celebrate your smallest wins and make you feel proud.",
    "I promise to never stop holding your hand when we walk together.",
    "I promise to make you laugh whenever sadness creeps in.",
    "I promise to respect your personal growth and encourage your dreams.",
    "I promise to choose you, every single day, without a second thought.",
    "I promise to protect our love and keep it safe from outer noise.",
    "I promise to apologize when I am wrong, and forgive you when you are.",
    "I promise to remember the magic of how we started.",
    "I promise to keep learning you, discovering new things to love.",
    "I promise to cook for you and make sure you eat well.",
    "I promise to always call you 'My Queen' and treat you as one.",
    "I promise to look at you with the same warm eyes, even in old age.",
    "I promise to support your passions and be your biggest fans.",
    "I promise to tell you you are beautiful, especially when you doubt it.",
    "I promise to be your safest shelter and your warmest anchor.",
    "I promise to hold onto our loyalty, keeping our hearts in sync.",
    "I promise to love you forever and ever, through all dimensions of time."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  } as const;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-12 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>Commitments</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          My Vows & Promises
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          A collection of twenty lifelong commitments written from my heart to yours.
        </p>
      </div>

      {/* Promises Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-20px' }}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10"
      >
        {promisesList.map((promise, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              rotateY: 2, 
              borderColor: 'rgba(255, 79, 129, 0.4)',
              boxShadow: '0 8px 30px rgba(255, 79, 129, 0.15)'
            }}
            className="glass-panel border border-white/5 rounded-2xl p-5 flex flex-col justify-between items-start transition-all duration-300 relative overflow-hidden group select-none min-h-[170px]"
          >
            {/* Top Index indicator */}
            <div className="w-full flex justify-between items-center text-[9px] font-mono text-white/30 font-bold">
              <span>PROMISE #{index + 1}</span>
              <Heart className="w-3.5 h-3.5 text-primary/45 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </div>

            {/* Promise text */}
            <p className="text-white/80 text-xs md:text-sm font-medium mt-3.5 leading-relaxed">
              "{promise}"
            </p>

            {/* Bottom checkmark indicator */}
            <div className="w-full border-t border-white/5 mt-4 pt-2.5 flex justify-end">
              <span className="text-[8px] font-mono font-bold tracking-widest text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1 uppercase">
                <CheckCircle className="w-3 h-3 text-primary" />
                <span>Active vow</span>
              </span>
            </div>
            
            {/* Soft decorative background dot */}
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/5 rounded-full blur-lg pointer-events-none group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
export default Promises;
