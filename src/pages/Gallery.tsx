import React, { useState } from 'react';
import { Heart, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface PolaroidImage {
  id: number;
  url: string;
  caption: string;
  date: string;
  rotation: string;
}

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const photos: PolaroidImage[] = [
    {
      id: 0,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
      caption: 'Holding hands, walking together',
      date: 'Dec 2024',
      rotation: 'rotate-[-3deg]'
    },
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1494972308805-463bc619b34e?q=80&w=800&auto=format&fit=crop',
      caption: 'Warm silhouetted sunsets',
      date: 'Jan 2025',
      rotation: 'rotate-[2deg]'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
      caption: 'Late night cozy coffee dates',
      date: 'Feb 2025',
      rotation: 'rotate-[-1deg]'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
      caption: 'Sparklers under the summer sky',
      date: 'Jul 2025',
      rotation: 'rotate-[3deg]'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=800&auto=format&fit=crop',
      caption: 'Walking down forest trails',
      date: 'Oct 2025',
      rotation: 'rotate-[-2deg]'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1529636798458-92182e65f133?q=80&w=800&auto=format&fit=crop',
      caption: 'Whispering under fairy lights',
      date: 'Nov 2025',
      rotation: 'rotate-[1deg]'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop',
      caption: 'Roadtrip playlist and singing',
      date: 'Dec 2025',
      rotation: 'rotate-[-3deg]'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
      caption: 'Warm hugs in freezing winter',
      date: 'Jan 2026',
      rotation: 'rotate-[2deg]'
    }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setZoomLevel(1);
      setActivePhoto((prev) => (prev === 0 ? photos.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setZoomLevel(1);
      setActivePhoto((prev) => (prev === photos.length - 1 ? 0 : prev! + 1));
    }
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.03)_0%,transparent_80%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-16 z-10">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Scrapbook</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Our Polaroid Memories
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          Snapshots of moments that we will cherish forever. Click to view in fullscreen.
        </p>
      </div>

      {/* Gallery Masonry Grid */}
      <div className="w-full max-w-5xl columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 z-10">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              setActivePhoto(photo.id);
              setZoomLevel(1);
            }}
            className={`break-inside-avoid inline-block w-full bg-white p-4 pb-6 border border-black/10 shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_15px_30px_rgba(255,79,129,0.15)] hover:rotate-0 hover:z-20 cursor-pointer ${photo.rotation}`}
          >
            {/* Image Box */}
            <div className="w-full aspect-[4/5] bg-neutral-100 overflow-hidden relative group">
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-white drop-shadow-[0_0_10px_rgba(255,79,129,0.8)]" />
              </div>
            </div>
            {/* Caption (Handwritten feel) */}
            <div className="mt-4 text-center">
              <p className="font-cursive text-neutral-800 text-xl leading-none">{photo.caption}</p>
              <span className="text-[9px] font-mono text-neutral-400 mt-2 block font-semibold uppercase tracking-wider">{photo.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {activePhoto !== null && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
        >
          {/* Controls Bar */}
          <div className="absolute top-4 right-4 flex items-center gap-3 z-[10000]">
            <button
              onClick={zoomOut}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-90"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-90"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePhoto(null)}
              className="p-2.5 rounded-full bg-primary hover:bg-primary-hover border border-white/10 text-white transition-all active:scale-90"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-90 z-[10000]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[80vh] flex flex-col items-center relative transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={photos[activePhoto].url}
              alt={photos[activePhoto].caption}
              className="max-w-full max-h-[70vh] object-contain border-4 border-white shadow-2xl rounded-sm"
            />
            {/* Caption */}
            <div className="mt-4 text-center select-none bg-black/40 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md max-w-md">
              <p className="font-cursive text-white text-2xl">{photos[activePhoto].caption}</p>
              <span className="text-[10px] font-mono text-white/50 block mt-1 tracking-widest uppercase font-semibold">{photos[activePhoto].date}</span>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-90 z-[10000]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Gallery;
