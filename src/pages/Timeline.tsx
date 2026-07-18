import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  MessageCircle, 
  Smile, 
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
      title: 'First Sight (Kamaraj University)',
      date: 'August 2021',
      description: 'The very first time I laid my eyes on you. It was during admission time at Kamaraj University, right outside Room Number F13. A moment etched into my memory forever, where my heart knew you were the one.',
      icon: <MapPin className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-primary shadow-[0_0_12px_rgba(255,79,129,0.5)]'
    },
    {
      id: 2,
      title: 'Second Meet (Staff Room)',
      date: 'July',
      description: 'Meeting you again, this time in the English Department Staff Room. The world slowed down, the surroundings faded, and I knew destiny was planning something beautiful for us.',
      icon: <Compass className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-accent shadow-[0_0_12px_rgba(255,128,171,0.5)]'
    },
    {
      id: 3,
      title: 'First Conversation',
      date: 'Jolly Moments',
      description: 'Talking with you for the first time. The conversation was so jolly, filled with laughter, lighthearted energy, and a wonderful connection that made me smile all day.',
      icon: <Smile className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)]'
    },
    {
      id: 4,
      title: 'First Confession (Message)',
      date: 'June 21, 2022',
      description: 'Typing out my feelings and hitting send. Confessing my love for you in a message, with my heart beating faster than ever, waiting for your response with sweet nervousness.',
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]'
    },
    {
      id: 5,
      title: 'Brave Face-to-Face Confession',
      date: 'July 7, 2022',
      description: 'Gathering all my courage, walking up to you, and telling you face-to-face how deeply I love you. A day of absolute bravery, truth, and locked eyes.',
      icon: <Sparkles className="w-5 h-5 text-white" />,
      align: 'left',
      badgeColor: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
    },
    {
      id: 6,
      title: 'First Time Going Home',
      date: 'October 28, 2022',
      description: 'The magical day we went to our home together for the first time. Stepping into our shared comfort zone, feeling secure, and realizing we are each other\'s safe haven.',
      icon: <Calendar className="w-5 h-5 text-white" />,
      align: 'right',
      badgeColor: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
    },
    {
      id: 7,
      title: 'The Forehead Vermilion Pledge',
      date: 'Our Sacred Bond',
      description: 'Placing the holy kunguma pottu on your forehead, sealing our commitment, and marrying you in my heart forever. A sacred union of our souls for eternity.',
      icon: <Heart className="w-5 h-5 text-white" fill="white" />,
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
