import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLove } from '../context/LoveContext';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  CloudRain, 
  Flower, 
  Snowflake, 
  Flame, 
  Sparkles, 
  Menu, 
  X,
  Music
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    weatherMode, 
    setWeatherMode, 
    isMuted, 
    setIsMuted, 
    isPlaying, 
    setIsPlaying, 
    songs, 
    currentSongIndex, 
    nextSong,
    setAmbientSound,
    loveUnlocked
  } = useLove();

  const [isOpen, setIsOpen] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [showWeatherMenu, setShowWeatherMenu] = useState(false);

  if (!loveUnlocked) return null; // hide navigation during loading screen

  const activeStyle = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_12px_rgba(255,79,129,0.5)] border border-white/20 scale-105' 
        : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
    }`;

  const toggleMute = () => setIsMuted(!isMuted);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const weatherIcons = {
    normal: <Sparkles className="w-4 h-4 text-white" />,
    sakura: <Flower className="w-4 h-4 text-accent" />,
    snow: <Snowflake className="w-4 h-4 text-blue-200" />,
    rain: <CloudRain className="w-4 h-4 text-blue-400" />,
    fireflies: <Flame className="w-4 h-4 text-gold" />,
  };

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/letter', label: 'Letter' },
    { to: '/timeline', label: 'Story' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/music', label: 'Melody' },
    { to: '/reasons', label: '100 Reasons' },
    { to: '/quiz', label: 'Quiz' },
    { to: '/garden', label: 'Rose Garden' },
    { to: '/games', label: 'Games' },
    { to: '/secret', label: 'Secret' },
    { to: '/proposal', label: 'Proposal' }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 glass-panel rounded-full px-5 py-3 flex items-center justify-between border border-white/10 shadow-2xl transition-all duration-500">
      {/* Brand logo */}
      <NavLink 
        to="/home" 
        className="flex items-center gap-2 font-serif text-lg md:text-xl font-bold text-white hover:opacity-85 transition-opacity"
      >
        <span className="bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,79,129,0.3)]">
          Ruban & Shobi
        </span>
        <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
      </NavLink>

      {/* Desktop navigation links */}
      <div className="hidden lg:flex items-center gap-2">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={activeStyle}>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Controls panel */}
      <div className="flex items-center gap-3">
        {/* Environment button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWeatherMenu(!showWeatherMenu);
              setShowMusicMenu(false);
            }}
            className="p-2 rounded-full glass-panel-light hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
            title="Toggle Weather Effects"
          >
            {weatherIcons[weatherMode]}
            <span className="hidden sm:inline text-xs capitalize text-white/90">{weatherMode}</span>
          </button>

          {showWeatherMenu && (
            <div className="absolute right-0 mt-3 w-44 glass-panel rounded-2xl p-2.5 border border-white/10 shadow-2xl z-[100] animate-fadeIn animate-duration-200">
              <h3 className="text-white/60 text-[10px] uppercase font-bold tracking-widest px-2 mb-1.5">Atmosphere</h3>
              {[
                { mode: 'normal', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Normal Magic' },
                { mode: 'sakura', icon: <Flower className="w-3.5 h-3.5 text-accent" />, label: 'Sakura Petals' },
                { mode: 'snow', icon: <Snowflake className="w-3.5 h-3.5 text-blue-200" />, label: 'Gentle Snow' },
                { mode: 'rain', icon: <CloudRain className="w-3.5 h-3.5 text-blue-400" />, label: 'Romantic Rain' },
                { mode: 'fireflies', icon: <Flame className="w-3.5 h-3.5 text-gold" />, label: 'Fireflies Glow' }
              ].map((item) => (
                <button
                  key={item.mode}
                  onClick={() => {
                    setWeatherMode(item.mode as any);
                    setShowWeatherMenu(false);
                    // Automatically add corresponding ambient sound
                    if (item.mode === 'rain') setAmbientSound('rain');
                    else if (item.mode === 'normal') setAmbientSound('none');
                    else if (item.mode === 'sakura') setAmbientSound('birds');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                    weatherMode === item.mode
                      ? 'bg-primary/20 text-primary border border-primary/20'
                      : 'text-white/80 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Music menu button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMusicMenu(!showMusicMenu);
              setShowWeatherMenu(false);
            }}
            className={`p-2 rounded-full glass-panel-light hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer ${
              isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
            }`}
            title="Music Settings"
          >
            <Music className="w-4 h-4 text-primary" />
          </button>

          {showMusicMenu && (
            <div className="absolute right-0 mt-3 w-64 glass-panel rounded-2xl p-3.5 border border-white/10 shadow-2xl z-[100] animate-fadeIn animate-duration-200">
              <h3 className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center justify-between">
                <span>Now Playing</span>
                <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full font-mono">
                  {currentSongIndex + 1}/{songs.length}
                </span>
              </h3>
              
              <div className="mb-3.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div className="text-xs font-semibold text-white truncate">{songs[currentSongIndex].title}</div>
                <div className="text-[10px] text-white/50 truncate mt-0.5">{songs[currentSongIndex].artist}</div>
              </div>

              {/* Music controls inside dropdown */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={nextSong}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3.5 border-t border-white/10 pt-2 text-center">
                <span className="text-[9px] text-white/40">Enjoy our sweet background track</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowMusicMenu(false);
            setShowWeatherMenu(false);
          }}
          className="lg:hidden p-2 rounded-full glass-panel-light hover:bg-white/15 border border-white/10 text-white transition-all cursor-pointer"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 w-full glass-panel border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-2.5 animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_12px_rgba(255,79,129,0.3)] border border-white/10'
                    : 'text-white/80 hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <span>{link.label}</span>
              <Heart className="w-3.5 h-3.5 text-primary opacity-50" />
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
