import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLove } from '../context/LoveContext';
import { 
  Home, 
  Mail, 
  Calendar, 
  Gamepad2, 
  Gift
} from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { loveUnlocked } = useLove();

  if (!loveUnlocked) return null; // hide navigation during loading screen

  const links = [
    { to: '/home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { to: '/letter', label: 'Letter', icon: <Mail className="w-5 h-5" /> },
    { to: '/timeline', label: 'Story', icon: <Calendar className="w-5 h-5" /> },
    { to: '/games', label: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
    { to: '/proposal', label: 'Ring', icon: <Gift className="w-5 h-5 animate-bounce" /> }
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="glass-panel rounded-full py-2.5 px-4 flex items-center justify-between border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(255,79,129,0.6)]' 
                  : 'text-white/60 hover:text-white/80'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative z-10">
                  {link.icon}
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase font-sans">
                  {link.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
