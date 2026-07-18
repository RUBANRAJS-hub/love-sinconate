import React, { useState, useEffect, useRef } from 'react';
import { useLove } from '../context/LoveContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Mic, 
  Square, 
  Trash2, 
  ListMusic, 
  Volume1, 
  Heart,
  Sparkles,
  Disc
} from 'lucide-react';

interface VoiceNote {
  id: string;
  url: string;
  duration: string;
  date: string;
}

export const MusicPlayer: React.FC = () => {
  const { 
    songs, 
    currentSongIndex, 
    setCurrentSongIndex, 
    isPlaying, 
    setIsPlaying, 
    nextSong,
    prevSong,
    ambientSound,
    setAmbientSound
  } = useLove();

  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([
    {
      id: 'pre-1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // mock pre-recorded message
      duration: '0:18',
      date: 'April 5, 2025'
    }
  ]);
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voicePlaybackId, setVoicePlaybackId] = useState<string | null>(null);
  const [voiceIsPlaying, setVoiceIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<number | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Stop voice notes playback when main music plays or vice-versa
  useEffect(() => {
    if (isPlaying && voiceAudioRef.current && voiceIsPlaying) {
      voiceAudioRef.current.pause();
      setVoiceIsPlaying(false);
      setVoicePlaybackId(null);
    }
  }, [isPlaying]);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, [isRecording]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Start Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Calculate dynamic recording length
        const minutes = Math.floor(recordingTime / 60);
        const seconds = recordingTime % 60;
        const durationStr = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        const newNote: VoiceNote = {
          id: `rec-${Date.now()}`,
          url: audioUrl,
          duration: durationStr,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        };
        
        setVoiceNotes((prev) => [newNote, ...prev]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setIsPlaying(false); // Stop background music during recording
    } catch (err) {
      alert("Microphone permission was denied. I'll load a mock sample instead!");
      // Fallback: simulate a recording
      setIsRecording(true);
      setIsPlaying(false);
      setTimeout(() => {
        setIsRecording(false);
        const mockNote: VoiceNote = {
          id: `rec-mock-${Date.now()}`,
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
          duration: '0:12',
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        };
        setVoiceNotes((prev) => [mockNote, ...prev]);
      }, 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Voice playback controls
  const playVoiceNote = (note: VoiceNote) => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
    }

    if (voicePlaybackId === note.id && voiceIsPlaying) {
      setVoiceIsPlaying(false);
      setVoicePlaybackId(null);
      return;
    }

    setIsPlaying(false); // Pause main background music
    setVoicePlaybackId(note.id);
    setVoiceIsPlaying(true);
    
    const audio = new Audio(note.url);
    voiceAudioRef.current = audio;
    audio.play().catch(err => console.log(err));

    audio.onended = () => {
      setVoiceIsPlaying(false);
      setVoicePlaybackId(null);
    };
  };

  const deleteVoiceNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (voicePlaybackId === id && voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      setVoiceIsPlaying(false);
      setVoicePlaybackId(null);
    }
    setVoiceNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-12 z-10">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Melodies</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Romantic Jukebox
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          Listen to our favorite love songs, activate ambient overlays, or record a sweet message.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 z-10 items-stretch">
        
        {/* Left Card: Jukebox / Vinyl Player */}
        <div className="flex-1 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-white/50 mb-6 flex items-center gap-2">
            <Disc className="w-4 h-4 text-primary" />
            <span>Jukebox Player</span>
          </h3>

          {/* Vinyl Spinner */}
          <div className="relative w-56 h-56 flex items-center justify-center mb-6">
            {/* Vinyl Record */}
            <div 
              className={`w-48 h-48 rounded-full bg-black border-4 border-neutral-800 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-1000 ${
                isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
              }`}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2.5 rounded-full border border-neutral-900 opacity-80" />
              <div className="absolute inset-6 rounded-full border border-neutral-900 opacity-60" />
              <div className="absolute inset-10 rounded-full border border-neutral-900 opacity-50" />
              <div className="absolute inset-14 rounded-full border border-neutral-900 opacity-40" />

              {/* Vinyl Label Center */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-neutral-900 flex items-center justify-center relative">
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                <div className="absolute w-2 h-2 rounded-full bg-black" />
              </div>
            </div>
            {/* Tone arm needle */}
            <div 
              className={`absolute top-0 right-4 w-12 h-24 origin-top-left transition-transform duration-500 pointer-events-none ${
                isPlaying ? 'rotate-[20deg]' : 'rotate-0'
              }`}
            >
              <svg width="40" height="96" viewBox="0 0 40 96" fill="none">
                <path d="M4 4L28 60L16 88" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="12" y="84" width="8" height="12" rx="1" fill="#FF4F81" />
              </svg>
            </div>
          </div>

          {/* Title and details */}
          <div className="text-center mb-6">
            <h4 className="text-lg font-bold text-white max-w-[250px] truncate mx-auto">
              {songs[currentSongIndex].title}
            </h4>
            <p className="text-xs text-white/50 mt-1">
              {songs[currentSongIndex].artist}
            </p>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-6 mb-6">
            <button 
              onClick={prevSong} 
              className="p-2.5 rounded-full glass-panel-light hover:bg-white/10 text-white transition-all active:scale-90"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay} 
              className="p-4 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/35 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
            </button>
            <button 
              onClick={nextSong} 
              className="p-2.5 rounded-full glass-panel-light hover:bg-white/10 text-white transition-all active:scale-90"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Jukebox Track Playlist selection */}
          <div className="w-full border-t border-white/5 pt-4">
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3 px-1 uppercase font-bold tracking-wider font-mono">
              <ListMusic className="w-3.5 h-3.5" />
              <span>Playlist Tracks</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
              {songs.map((song, idx) => (
                <button
                  key={song.title}
                  onClick={() => selectSong(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                    currentSongIndex === idx 
                      ? 'bg-primary/20 text-primary border border-primary/20 font-bold' 
                      : 'text-white/80 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="truncate">{song.title}</span>
                  {currentSongIndex === idx && isPlaying && (
                    <div className="flex items-center gap-0.5">
                      <span className="w-0.5 h-2 bg-primary animate-pulse" />
                      <span className="w-0.5 h-3 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-0.5 h-1.5 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Voice Recorder & Soundscapes */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Ambient Soundscapes selector */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white/50 mb-4 flex items-center gap-2">
              <Volume1 className="w-4 h-4 text-gold" />
              <span>Ambient Soundscapes</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { type: 'none', label: 'No Ambient' },
                { type: 'rain', label: 'Rain Forest' },
                { type: 'birds', label: 'Forest Birds' },
                { type: 'ocean', label: 'Ocean Waves' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setAmbientSound(item.type as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    ambientSound === item.type
                      ? 'bg-gold/20 text-gold border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Memo Box */}
          <div className="flex-1 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-white/50 mb-4 flex items-center gap-2">
                <Mic className="w-4 h-4 text-accent" />
                <span>Voice Message Box</span>
              </h3>

              {/* Recording trigger */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl mb-4 relative overflow-hidden select-none">
                {isRecording ? (
                  <>
                    {/* Pulsing red dot */}
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping absolute top-4 left-4" />
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 absolute top-4 left-4" />
                    
                    <div className="flex-1 pl-6">
                      <div className="text-xs font-bold text-white">Recording voice memo...</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Microphone active</div>
                    </div>
                    
                    {/* Timer */}
                    <div className="text-sm font-mono font-bold text-red-500 mr-2">
                      {formatTime(recordingTime)}
                    </div>
                    
                    <button 
                      onClick={stopRecording}
                      className="p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                    >
                      <Square className="w-4 h-4 fill-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">Record your own voice</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Records locally via browser</div>
                    </div>
                    <button 
                      onClick={startRecording}
                      className="p-3 rounded-full bg-accent hover:bg-accent/80 text-white shadow-lg shadow-accent/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Mic className="w-4 h-4 fill-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Voice Notes List */}
              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1 custom-scrollbar">
                {voiceNotes.length === 0 ? (
                  <p className="text-xs text-white/30 italic text-center py-6 select-none">No voice messages recorded yet.</p>
                ) : (
                  voiceNotes.map((note) => (
                    <div 
                      key={note.id}
                      onClick={() => playVoiceNote(note)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                        voicePlaybackId === note.id
                          ? 'bg-accent/20 border-accent/30 text-accent font-bold'
                          : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${voicePlaybackId === note.id ? 'bg-accent/20' : 'bg-white/5'}`}>
                          {voicePlaybackId === note.id && voiceIsPlaying ? (
                            <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
                              <span className="w-0.5 bg-accent animate-[pulse_0.8s_infinite] h-2.5" />
                              <span className="w-0.5 bg-accent animate-[pulse_0.8s_infinite_0.2s] h-3.5" />
                              <span className="w-0.5 bg-accent animate-[pulse_0.8s_infinite_0.4s] h-1.5" />
                            </div>
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs">{note.id.startsWith('pre') ? 'First Voice Note' : 'Voice Memo'}</div>
                          <span className="text-[9px] text-white/40 block font-semibold">{note.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/40">{note.duration}</span>
                        <button
                          onClick={(e) => deleteVoiceNote(note.id, e)}
                          className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="text-center text-[10px] text-white/30 pt-3 select-none">
              Recordings are held inside browser memory.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default MusicPlayer;
