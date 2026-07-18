import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type WeatherMode = 'normal' | 'sakura' | 'snow' | 'rain' | 'fireflies';

export interface Song {
  title: string;
  artist: string;
  url: string;
}

interface LoveContextType {
  weatherMode: WeatherMode;
  setWeatherMode: (mode: WeatherMode) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  songs: Song[];
  nextSong: () => void;
  prevSong: () => void;
  ambientSound: 'none' | 'rain' | 'birds' | 'ocean';
  setAmbientSound: (sound: 'none' | 'rain' | 'birds' | 'ocean') => void;
  ambientVolume: number;
  setAmbientVolume: (vol: number) => void;
  secretUnlocked: boolean;
  setSecretUnlocked: (unlocked: boolean) => void;
  proposalStatus: 'pending' | 'yes' | 'always';
  setProposalStatus: (status: 'pending' | 'yes' | 'always') => void;
  quizScore: number;
  setQuizScore: (score: number) => void;
  completedPuzzle: boolean;
  setCompletedPuzzle: (completed: boolean) => void;
  scratchedCard: boolean;
  setScratchedCard: (scratched: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  loveUnlocked: boolean;
  setLoveUnlocked: (unlocked: boolean) => void;
}

const LoveContext = createContext<LoveContextType | undefined>(undefined);

const playlist: Song[] = [
  {
    title: 'Yeya En Kottikkaaraa',
    artist: 'Anirudh Ravichander (Sethupathi)',
    url: '/songs/yeya.mp3',
  },
  {
    title: 'Onakkaaga Poranthaenae',
    artist: 'Justin Prabhakaran (Pannaiyaarum Padminiyum)',
    url: '/songs/onakkaaga.mp3',
  }
];

export const LoveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('normal');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'birds' | 'ocean'>('none');
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [proposalStatus, setProposalStatus] = useState<'pending' | 'yes' | 'always'>('pending');
  const [quizScore, setQuizScore] = useState(0);
  const [completedPuzzle, setCompletedPuzzle] = useState(false);
  const [scratchedCard, setScratchedCard] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loveUnlocked, setLoveUnlocked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize main playlist audio object once
  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audioRef.current = audio;

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Synchronize Audio source and state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if source changed
    const currentUrl = playlist[currentSongIndex].url;
    if (audio.src !== currentUrl) {
      audio.src = currentUrl;
      audio.load();
    }

    audio.muted = isMuted;

    if (isPlaying && loveUnlocked) {
      audio.play().catch(err => {
        console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentSongIndex, isPlaying, isMuted, loveUnlocked]);

  // Handle Ambient Sounds
  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current = null;
    }

    if (ambientSound === 'none' || !loveUnlocked) return;

    let ambientUrl = '';
    if (ambientSound === 'rain') {
      // Soft loopable rain
      ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/2448/2448-84.wav';
    } else if (ambientSound === 'birds') {
      // Soft loopable forest birds
      ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/1244/1244-84.wav';
    } else if (ambientSound === 'ocean') {
      // Ocean waves
      ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/1188/1188-84.wav';
    }

    if (ambientUrl) {
      const audio = new Audio(ambientUrl);
      audio.loop = true;
      audio.volume = isMuted ? 0 : ambientVolume;
      ambientAudioRef.current = audio;
      
      if (isPlaying) {
        audio.play().catch(err => console.log("Ambient autoplay blocked", err));
      }
    }

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, [ambientSound, isPlaying, isMuted, loveUnlocked]);

  // Adjust volumes
  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = isMuted ? 0 : ambientVolume;
    }
  }, [ambientVolume, isMuted]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <LoveContext.Provider
      value={{
        weatherMode,
        setWeatherMode,
        isMuted,
        setIsMuted,
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex,
        songs: playlist,
        nextSong,
        prevSong,
        ambientSound,
        setAmbientSound,
        ambientVolume,
        setAmbientVolume,
        secretUnlocked,
        setSecretUnlocked,
        proposalStatus,
        setProposalStatus,
        quizScore,
        setQuizScore,
        completedPuzzle,
        setCompletedPuzzle,
        scratchedCard,
        setScratchedCard,
        isLoaded,
        setIsLoaded,
        loveUnlocked,
        setLoveUnlocked
      }}
    >
      {children}
    </LoveContext.Provider>
  );
};

export const useLove = () => {
  const context = useContext(LoveContext);
  if (context === undefined) {
    throw new Error('useLove must be used within a LoveProvider');
  }
  return context;
};
