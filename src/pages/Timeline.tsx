import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  MessageCircle, 
  Smile, 
  Camera, 
  Heart, 
  Calendar, 
  Compass, 
  Sparkles 
} from 'lucide-react';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  align: 'left' | 'right';
  badgeColor: string;
}

export const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      id: 1,
      title: 'First Meet',
      date: 'October 18, 2024',
      description: 'The universe aligned and our paths finally crossed. A moment of nervous smiles, warm glances, and a feeling that something magical was about to begin.',
      icon: <MapPin className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-primary shadow-[0_0_12px_rgba(255,79,129,0.5)]'
    },
    {
      id: 2,
      title: 'First Chat',
      date: 'October 20, 2024',
      description: 'Hour-long text messages that kept us awake past midnight. Talking about everything and nothing, laughing at silly jokes, and realizing we speak the same language.',
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-accent shadow-[0_0_12px_rgba(255,128,171,0.5)]'
    },
    {
      id: 3,
      title: 'First Smile',
      date: 'November 2, 2024',
      description: 'That specific smile you gave me that melted all my defenses. I knew in that exact second that you were someone incredibly special that I wanted to keep in my life.',
      icon: <Smile className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)]'
    },
    {
      id: 4,
      title: 'First Photo',
      date: 'December 14, 2024',
      description: 'Our first picture together—capturing our raw happiness. A simple polaroid memory that sits close to my heart, marking the beginning of our visual diary.',
      icon: <Camera className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]'
    },
    {
      id: 5,
      title: 'Favorite Memory',
      date: 'April 5, 2025',
      description: 'Walking hand in hand under the stars, feeling like the rest of the world had faded away. A quiet moment where time stood still, and love felt infinite.',
      icon: <Heart className="w-5 h-5 text-white" fill="white" />,
      align: 'left',
      badgeColor: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
    },
    {
      id: 6,
      title: 'Today',
      date: 'July 2026',
      description: 'Growing stronger, laughing louder, and loving deeper every single day. Facing the world together, and building a foundation that nothing can shake.',
      icon: <Calendar className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
    },
    {
      id: 7,
      title: 'Our Future Together',
      date: 'Forever & Always',
      description: 'A lifetime of adventures, cozy mornings, travel diaries, holding hands through storms, and celebrating every small victory. Building our dream home and growing old together.',
      icon: <Compass className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-gold shadow-[0_0_12px_rgba(212,175,55,0.5)]'
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,128,171,0.03)_0%,transparent_80%)] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-lg mb-16 z-10"
      >
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Milestones</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Our Love Story Timeline
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          A collection of small moments that became the chapters of our forever.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <div className="relative w-full max-w-4xl z-10">
        
        {/* Central glowing vertical track */}
        <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-accent to-gold shadow-[0_0_8px_rgba(255,79,129,0.5)] -translate-x-1/2" />

        {/* Timeline Events */}
        <div className="space-y-12">
          {events.map((event) => {
            const isLeft = event.align === 'left';
            
            return (
              <div 
                key={event.id} 
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node icon element */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 cursor-default ${event.badgeColor}`}
                  >
                    {event.icon}
                  </motion.div>
                </div>

                {/* Card Container */}
                <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                  isLeft ? 'md:pr-14' : 'md:pl-14'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300 relative group hover:shadow-[0_8px_32px_rgba(255,79,129,0.08)]"
                  >
                    {/* Tiny connector triangle for desktop */}
                    <div className={`hidden md:block absolute top-5 w-0 h-0 border-y-8 border-y-transparent ${
                      isLeft 
                        ? '-right-4 border-l-[16px] border-l-[#161B22]/50 border-r-0' 
                        : '-left-4 border-r-[16px] border-r-[#161B22]/50 border-l-0'
                    }`} />

                    <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
                      {event.date}
                    </span>
                    
                    <h3 className="text-lg md:text-xl font-bold text-white mt-1.5 mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty spacer for balancing layout on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Timeline;
