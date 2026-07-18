import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Heart, 
  Search, 
  Sparkles, 
  Smile, 
  Eye, 
  Gift, 
  Crown, 
  Flame, 
  Lightbulb,
  Compass,
  Key,
  Star,
  Coffee,
  Bookmark,
  Sun,
  Moon,
  MessageCircle,
  Calendar,
  CloudRain,
  Music as MusicIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveReason {
  id: number;
  reason: string;
  icon: React.ReactNode;
  category: string;
}

export const Reasons: React.FC = () => {
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 100 Curated beautiful reasons
  const reasonsList: LoveReason[] = [
    { id: 1, reason: "Your beautiful smile that brightens up my darkest days.", icon: <Smile className="text-yellow-400" />, category: "Appearance" },
    { id: 2, reason: "The way your eyes sparkle when we look at each other.", icon: <Eye className="text-blue-400" />, category: "Appearance" },
    { id: 3, reason: "Your incredible kindness and empathy for everyone around you.", icon: <Heart className="text-red-400 fill-red-400" />, category: "Personality" },
    { id: 4, reason: "Your voice, which acts as my favorite melody and peace.", icon: <Sparkles className="text-gold" />, category: "Personality" },
    { id: 5, reason: "The unwavering support you show for all my dreams.", icon: <Crown className="text-purple-400" />, category: "Support" },
    { id: 6, reason: "How safe and warm I feel when holding your hand.", icon: <Heart className="text-primary fill-primary" />, category: "Feelings" },
    { id: 7, reason: "Your silly sense of humor that makes me giggle instantly.", icon: <Smile className="text-orange-400" />, category: "Personality" },
    { id: 8, reason: "How you remember the smallest details of our conversations.", icon: <Bookmark className="text-green-400" />, category: "Support" },
    { id: 9, reason: "Your intelligence and the fascinating ideas you share.", icon: <Lightbulb className="text-yellow-300" />, category: "Personality" },
    { id: 10, reason: "The unique smell of your perfume that lingers on me.", icon: <Flame className="text-pink-400" />, category: "Appearance" },
    { id: 11, reason: "How you look at me when you think I am not paying attention.", icon: <Eye className="text-cyan-400" />, category: "Feelings" },
    { id: 12, reason: "Your determination to grow and learn every day.", icon: <Compass className="text-rose-400" />, category: "Personality" },
    { id: 13, reason: "The way you comfort me when I feel down or stressed.", icon: <CloudRain className="text-blue-300" />, category: "Support" },
    { id: 14, reason: "Your cute little sneezes that melt my heart.", icon: <Sparkles className="text-yellow-400" />, category: "Appearance" },
    { id: 15, reason: "The warmth of your hugs that instantly cures my anxiety.", icon: <Heart className="text-red-400" />, category: "Feelings" },
    { id: 16, reason: "How you make even a simple walk feel like an adventure.", icon: <Compass className="text-emerald-400" />, category: "Feelings" },
    { id: 17, reason: "Your passion for things you love.", icon: <Flame className="text-red-500" />, category: "Personality" },
    { id: 18, reason: "The way you hold me close when we watch movies.", icon: <Heart className="text-primary fill-primary" />, category: "Feelings" },
    { id: 19, reason: "How you always make time for us, no matter how busy you are.", icon: <Calendar className="text-indigo-400" />, category: "Support" },
    { id: 20, reason: "Your cute morning face, even with messy hair.", icon: <Sun className="text-yellow-500" />, category: "Appearance" },
    { id: 21, reason: "The way you squeeze my hand three times to say 'I Love You'.", icon: <Heart className="text-red-500 fill-red-500" />, category: "Feelings" },
    { id: 22, reason: "How you laugh at my terrible dad jokes.", icon: <Smile className="text-green-300" />, category: "Support" },
    { id: 23, reason: "Your amazing taste in music and movies.", icon: <MusicIcon className="text-accent" />, category: "Personality" },
    { id: 24, reason: "How you play with my fingers when we sit together.", icon: <Heart className="text-pink-300" />, category: "Feelings" },
    { id: 25, reason: "The quiet peace we share when just reading or sitting in silence.", icon: <Moon className="text-indigo-300" />, category: "Feelings" },
    { id: 26, reason: "Your beautiful hands that I always love holding.", icon: <Heart className="text-gold" />, category: "Appearance" },
    { id: 27, reason: "The way you call my name with that special tone.", icon: <Sparkles className="text-purple-300" />, category: "Feelings" },
    { id: 28, reason: "How you are my biggest cheerleader in life.", icon: <Crown className="text-yellow-400" />, category: "Support" },
    { id: 29, reason: "Your patience and how you listen when I vent.", icon: <MessageCircle className="text-teal-300" />, category: "Support" },
    { id: 30, reason: "The cute text messages you send me randomly during the day.", icon: <MessageCircle className="text-rose-300" />, category: "Support" },
    { id: 31, reason: "How you are both my lover and my best friend.", icon: <Heart className="text-primary fill-primary" />, category: "Feelings" },
    { id: 32, reason: "Your beautiful soul that shines brighter than any star.", icon: <Star className="text-yellow-400" />, category: "Personality" },
    { id: 33, reason: "The way we can communicate just by looking at each other.", icon: <Eye className="text-blue-500" />, category: "Feelings" },
    { id: 34, reason: "Your courage in facing difficult times.", icon: <Compass className="text-indigo-400" />, category: "Personality" },
    { id: 35, reason: "The coffee and tea dates we share in quiet cafes.", icon: <Coffee className="text-amber-500" />, category: "Feelings" },
    { id: 36, reason: "How you make me want to be a better man every day.", icon: <Key className="text-gold" />, category: "Feelings" },
    { id: 37, reason: "Your soft cheeks that I love to pinch.", icon: <Smile className="text-pink-400" />, category: "Appearance" },
    { id: 38, reason: "How you always check on me to ensure I have eaten.", icon: <Gift className="text-emerald-400" />, category: "Support" },
    { id: 39, reason: "The way your nose crinkles when you laugh really hard.", icon: <Smile className="text-yellow-500" />, category: "Appearance" },
    { id: 40, reason: "How we share the same dreams for our future.", icon: <Compass className="text-purple-400" />, category: "Feelings" },
    { id: 41, reason: "The warmth of your body when you sleep beside me.", icon: <Moon className="text-slate-300" />, category: "Feelings" },
    { id: 42, reason: "Your honesty, even when it is hard to say.", icon: <Key className="text-cyan-400" />, category: "Personality" },
    { id: 43, reason: "How you handle my chaotic energy with grace.", icon: <Sparkles className="text-green-300" />, category: "Support" },
    { id: 44, reason: "Your cute sleep talking.", icon: <Moon className="text-blue-400" />, category: "Appearance" },
    { id: 45, reason: "How you look at me like I am the only person in the room.", icon: <Eye className="text-red-400" />, category: "Feelings" },
    { id: 46, reason: "Your incredible sense of style and fashion.", icon: <Crown className="text-pink-500" />, category: "Appearance" },
    { id: 47, reason: "The way you celebrate my achievements as your own.", icon: <Star className="text-gold" />, category: "Support" },
    { id: 48, reason: "Your capacity for unconditional love.", icon: <Heart className="text-primary fill-primary" />, category: "Personality" },
    { id: 49, reason: "The funny faces you make just to make me smile.", icon: <Smile className="text-yellow-400" />, category: "Personality" },
    { id: 50, reason: "How your hand fits perfectly in mine, like a puzzle piece.", icon: <Key className="text-emerald-300" />, category: "Feelings" },
    // Fill remaining to 100 with beautiful general reasons
    ...Array.from({ length: 50 }, (_, i) => {
      const remainingReasons = [
        "How you make my heart beat faster every time you walk into the room.",
        "Your lovely laughter, which is my absolute favorite sound in the world.",
        "The gentle way you brush my hair out of my eyes.",
        "How you support my hobbies, even if you don't fully understand them.",
        "The kindness you show to animals and nature.",
        "Your soft lips that feel like heaven when they touch mine.",
        "How you can tell when I'm sad just by the tone of my voice.",
        "Your delicious cooking and the meals we prepare together.",
        "The beautiful memories we've built, and the ones we have yet to create.",
        "How you never fail to make me feel appreciated and wanted.",
        "Your elegant posture and how gracefully you move.",
        "The way you make ordinary moments feel extraordinary.",
        "How you look in my oversized shirts.",
        "The cute pout you give when you don't get your way.",
        "Your wisdom when giving advice.",
        "The security I feel knowing we face the future as a team.",
        "How you hug me from behind when I am working.",
        "The light in your eyes when we talk about our dream travel destinations.",
        "Your loyalty and how fierce you are in defending those you love.",
        "The warmth of your skin against mine.",
        "How you make our house feel like a home.",
        "The cute dimples that appear when you smile.",
        "How you forgive my small mistakes and love my imperfections.",
        "The sound of your breathing when you are asleep next to me.",
        "The way you play with my hair when I lay in your lap.",
        "How you bring colors to my black-and-white world.",
        "The romantic notes we leave for each other.",
        "Your generosity and how you share everything with me.",
        "How you look when you're deeply focused on reading a book.",
        "The trust we share that cannot be broken.",
        "The funny nicknames we have for each other.",
        "The way you remember the anniversary of our first date.",
        "How you inspire me to work harder and achieve my goals.",
        "The soft tickle of your eyelashes against my cheek during close hugs.",
        "Your bright energy that lifts the mood of any room you enter.",
        "The late-night conversations about the universe and stars.",
        "How you love me for exactly who I am, without wanting to change me.",
        "Your cute reactions when I surprise you with gifts.",
        "The way you hold onto my arm when we walk in crowded areas.",
        "Your sweet kisses on my forehead that make me feel cherished.",
        "The beautiful future I see in your eyes every time we talk.",
        "How you always know exactly how to make me laugh.",
        "Your strength in moments of vulnerability.",
        "The way you smile after we kiss.",
        "How you make me feel like the luckiest man alive every single second.",
        "Your lovely eyelashes and the beautiful frame they make for your eyes.",
        "The exciting dates we plan and look forward to.",
        "How you believe in us, even during rough patches.",
        "Your beautiful heart that loves deeply and purely.",
        "The simple fact that you exist, and that you are mine, Shobi."
      ];
      const icons = [
        <Heart className="text-red-400" />,
        <Sparkles className="text-gold" />,
        <Star className="text-yellow-400" />,
        <Smile className="text-pink-400" />,
        <Crown className="text-purple-400" />,
        <Key className="text-emerald-400" />
      ];
      return {
        id: i + 51,
        reason: remainingReasons[i] || `The beautiful way you enrich my life daily.`,
        icon: icons[i % icons.length],
        category: "Feelings"
      };
    })
  ];

  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      // Swiped Right - Next card
      triggerSwipeConfetti();
      nextCard();
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped Left - Next card
      nextCard();
    }
  };

  const nextCard = () => {
    x.set(0); // reset position
    setCurrentIndex((prev) => (prev + 1) % reasonsList.length);
  };

  const triggerSwipeConfetti = () => {
    confetti({
      particleCount: 15,
      spread: 40,
      colors: ['#FF4F81', '#FF80AB', '#D4AF37'],
      origin: { y: 0.8 }
    });
  };

  const filteredReasons = reasonsList.filter((item) =>
    item.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-10 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Reasons Why</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          100 Reasons Why I Love You
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          A dictionary of all the things that make you the center of my universe.
        </p>

        {/* View mode toggle */}
        <div className="inline-flex mt-6 bg-white/5 border border-white/5 p-1 rounded-full backdrop-blur-md">
          <button
            onClick={() => setViewMode('swipe')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              viewMode === 'swipe'
                ? 'bg-primary text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Swipe Cards
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              viewMode === 'grid'
                ? 'bg-primary text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Search Directory
          </button>
        </div>
      </div>

      {/* Swipe View Mode */}
      {viewMode === 'swipe' && (
        <div className="relative w-full max-w-xs h-[380px] flex items-center justify-center z-10 select-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.05 }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: x.get() > 0 ? 200 : -200, rotate: x.get() > 0 ? 45 : -45 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute w-72 h-96 glass-panel border border-primary/20 rounded-3xl p-6 flex flex-col justify-between items-center shadow-[0_15px_35px_rgba(255,79,129,0.15)] cursor-grab active:cursor-grabbing hover:border-primary/40 transition-colors"
            >
              {/* Card top details */}
              <div className="w-full flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-primary/80 font-bold uppercase tracking-wider">
                  Reason #{reasonsList[currentIndex].id}
                </span>
                <span className="text-[9px] bg-white/5 border border-white/5 text-white/50 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  {reasonsList[currentIndex].category}
                </span>
              </div>

              {/* Big Icon */}
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner my-4 animate-float">
                {reasonsList[currentIndex].icon}
              </div>

              {/* Reason Text */}
              <div className="text-center flex-1 flex items-center justify-center px-2">
                <p className="font-serif italic text-white/95 text-base md:text-lg leading-relaxed">
                  "{reasonsList[currentIndex].reason}"
                </p>
              </div>

              {/* Footer swipe hints */}
              <div className="w-full border-t border-white/5 pt-3 flex justify-between text-[8px] font-mono text-white/30 uppercase tracking-widest">
                <span>← Swipe Left (Next)</span>
                <span>Swipe Right (Confetti) →</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Grid Directory View Mode */}
      {viewMode === 'grid' && (
        <div className="w-full max-w-4xl z-10 flex flex-col items-center">
          {/* Search bar */}
          <div className="relative w-full max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search specific reasons (e.g. smile, hugs, voice)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-full glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
            />
          </div>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredReasons.length === 0 ? (
              <div className="col-span-full text-center py-10 text-white/40 text-xs italic select-none">
                No matching reasons found. Try searching something else!
              </div>
            ) : (
              filteredReasons.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel border border-white/5 hover:border-primary/20 rounded-2xl p-4.5 flex items-start gap-3.5 transition-all duration-300 group hover:shadow-[0_4px_15px_rgba(255,79,129,0.06)]"
                >
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-primary/50 font-bold uppercase">Reason #{item.id}</span>
                    <p className="text-white/80 text-xs md:text-sm mt-1 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Reasons;
