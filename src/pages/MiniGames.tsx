import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gamepad2, Heart, RefreshCw, Smile, Gift, Flame, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MiniGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'scratch' | 'puzzle' | 'memory' | 'catcher'>('scratch');

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-10 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-gold" />
          <span>Interactive Play</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Romantic Game Room
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          Scratch the golden card or piece together the heart puzzle to reveal hidden messages.
        </p>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-2 justify-center mt-6 bg-white/5 border border-white/5 p-1 rounded-3xl backdrop-blur-md">
          <button
            onClick={() => setActiveGame('scratch')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeGame === 'scratch' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'
            }`}
          >
            Scratch Card
          </button>
          <button
            onClick={() => setActiveGame('puzzle')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeGame === 'puzzle' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'
            }`}
          >
            Heart Puzzle
          </button>
          <button
            onClick={() => setActiveGame('memory')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeGame === 'memory' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'
            }`}
          >
            Memory Match
          </button>
          <button
            onClick={() => setActiveGame('catcher')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeGame === 'catcher' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'
            }`}
          >
            Hearts Catcher
          </button>
        </div>
      </div>

      {/* Game Content Box */}
      <div className="w-full max-w-lg z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {activeGame === 'scratch' && <ScratchCardGame key="scratch-card" />}
          {activeGame === 'puzzle' && <HeartPuzzleGame key="heart-puzzle" />}
          {activeGame === 'memory' && <LoveMemoryMatchGame key="love-memory" />}
          {activeGame === 'catcher' && <HeartsCatcherGame key="hearts-catcher" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================
   GAME 1: SCRATCH CARD
   ========================================== */
const ScratchCardGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    setIsRevealed(false);
    setPercentScratched(0);
    isDrawingRef.current = false;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 200;

    // Draw scratch-off golden overlay
    ctx.fillStyle = '#D4AF37'; // gold
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add luxury text details to gold paint
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#161B22';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH WITH YOUR MOUSE OR FINGER', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText('TO REVEAL MY PROMISE', canvas.width / 2, canvas.height / 2 + 10);
  };

  const handleScratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchedPercent();
  };

  const checkScratchedPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;

    // Sample every 4th pixel to save CPU
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSamples = pixels.length / 16;
    const pct = (transparentCount / totalSamples) * 100;
    setPercentScratched(Math.round(pct));

    if (pct > 55 && !isRevealed) {
      setIsRevealed(true);
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#FF4F81', '#FFCCD5', '#D4AF37'],
        origin: { y: 0.7 }
      });
    }
  };

  const handleMouseDown = () => { isDrawingRef.current = true; };
  const handleMouseUp = () => { isDrawingRef.current = false; };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    handleScratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    handleScratch(touch.clientX, touch.clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.4)] w-full"
    >
      <h3 className="text-base font-bold text-white mb-4 select-none flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-gold" />
        <span>Golden Scratch Card</span>
      </h3>

      {/* Main card box containing text behind and canvas on top */}
      <div className="relative w-[300px] h-[200px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center select-none shadow-inner mb-6">
        {/* Unlocked Message Behind */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-primary/10 via-accent/20 to-gold/10 text-center">
          <Heart className="w-8 h-8 text-primary fill-primary animate-pulse mb-3" />
          <h4 className="font-cursive text-white text-3xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(255,79,129,0.5)]">
            I Love You Forever ❤️
          </h4>
          <p className="text-[10px] text-white/50 font-mono mt-2.5 uppercase tracking-widest font-bold">
            No matter the distance
          </p>
        </div>

        {/* Scratch-off canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Progress */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/40 mb-6 uppercase tracking-wider font-semibold">
        <span>Scratch Progress: {percentScratched}%</span>
        <span>{isRevealed ? 'Revealed!' : 'Scratch 60% to reveal'}</span>
      </div>

      <button
        onClick={initCanvas}
        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset Card</span>
      </button>
    </motion.div>
  );
};

/* ==========================================
   GAME 2: HEART PUZZLE
   ========================================== */
interface PuzzlePiece {
  id: number;
  label: string;
  defaultPos: { x: number; y: number };
  correctPos: { x: number; y: number };
  color: string;
}

const HeartPuzzleGame: React.FC = () => {
  const [completed, setCompleted] = useState(false);
  const [snappedCount, setSnappedCount] = useState<Record<number, boolean>>({});

  const puzzlePieces: PuzzlePiece[] = [
    { id: 1, label: 'L-Top', defaultPos: { x: -80, y: -90 }, correctPos: { x: -50, y: -50 }, color: 'bg-primary' },
    { id: 2, label: 'R-Top', defaultPos: { x: 90, y: -80 }, correctPos: { x: 50, y: -50 }, color: 'bg-accent' },
    { id: 3, label: 'Center', defaultPos: { x: -90, y: 70 }, correctPos: { x: 0, y: 0 }, color: 'bg-primary' },
    { id: 4, label: 'Bottom', defaultPos: { x: 80, y: 90 }, correctPos: { x: 0, y: 50 }, color: 'bg-accent' }
  ];

  const handleDragEnd = (id: number, info: any, correct: { x: number; y: number }) => {
    // Check distance between current offset and correct position
    const distanceThreshold = 35;
    const distanceX = Math.abs(info.offset.x - correct.x);
    const distanceY = Math.abs(info.offset.y - correct.y);

    if (distanceX < distanceThreshold && distanceY < distanceThreshold) {
      setSnappedCount(prev => {
        const next = { ...prev, [id]: true };
        
        // If all 4 pieces snapped
        if (Object.keys(next).length === 4) {
          setCompleted(true);
          confetti({
            particleCount: 80,
            spread: 60,
            colors: ['#FF4F81', '#FFCCD5', '#D4AF37'],
            origin: { y: 0.7 }
          });
        }
        return next;
      });
    }
  };

  const handleRestart = () => {
    setCompleted(false);
    setSnappedCount({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.4)] w-full"
    >
      <h3 className="text-base font-bold text-white mb-2 select-none flex items-center gap-1.5">
        <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
        <span>Heart Jigsaw Puzzle</span>
      </h3>
      <p className="text-[10px] text-white/40 mb-6 uppercase tracking-wider text-center select-none font-bold">
        Drag the floating segments into their transparent heart sockets.
      </p>

      {/* Board Box */}
      <div className="relative w-[300px] h-[300px] border border-white/5 bg-white/5 rounded-2xl shadow-inner mb-6 flex items-center justify-center overflow-hidden select-none">
        
        {/* Heart shadow grid outline sockets */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Heart className="w-44 h-44 text-white fill-white" />
        </div>

        {/* Snapped/Unlocked Message */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#161B22]/90 p-5 rounded-2xl border border-primary/20 text-center z-30"
            >
              <Heart className="w-12 h-12 text-primary fill-primary animate-pulse mb-3" />
              <h4 className="font-serif text-white font-bold text-lg mb-1.5">Puzzle Solved!</h4>
              <p className="font-serif italic text-sm text-white/80 leading-relaxed max-w-[200px]">
                "You completed my heart! You hold the only key to my soul, Shobi."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Puzzle Socket Slices (Placeholders where they snap) */}
        <div className="relative w-44 h-44 flex items-center justify-center pointer-events-none">
          {/* Socket 1: Left-Top */}
          <div 
            className={`absolute top-0 left-4 w-16 h-16 rounded-full border-2 border-dashed border-white/20 transition-all ${
              snappedCount[1] ? 'bg-primary/45 border-solid border-primary/40' : ''
            }`}
          />
          {/* Socket 2: Right-Top */}
          <div 
            className={`absolute top-0 right-4 w-16 h-16 rounded-full border-2 border-dashed border-white/20 transition-all ${
              snappedCount[2] ? 'bg-accent/45 border-solid border-accent/40' : ''
            }`}
          />
          {/* Socket 3: Center */}
          <div 
            className={`absolute top-10 w-24 h-24 rotate-45 border-2 border-dashed border-white/10 transition-all ${
              snappedCount[3] ? 'bg-primary/40 border-solid border-primary/30' : ''
            }`}
          />
        </div>

        {/* Floating Draggable Pieces */}
        {puzzlePieces.map((piece) => {
          const isSnapped = snappedCount[piece.id];
          if (isSnapped) return null;

          return (
            <motion.div
              key={piece.id}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              onDragEnd={(_, info) => handleDragEnd(piece.id, info, piece.correctPos)}
              initial={{ x: piece.defaultPos.x, y: piece.defaultPos.y }}
              whileDrag={{ scale: 1.15, zIndex: 50 }}
              className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center text-[10px] font-mono font-bold text-white border border-white/20 shadow-lg cursor-grab active:cursor-grabbing ${piece.color}`}
            >
              <Heart className="w-5 h-5 fill-white text-white opacity-80" />
            </motion.div>
          );
        })}

      </div>

      <button
        onClick={handleRestart}
        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset Puzzle</span>
      </button>
    </motion.div>
  );
};

/* ==========================================
   GAME 3: LOVE MEMORY MATCH
   ========================================== */
interface MemoryCard {
  id: number;
  icon: React.ReactNode;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const LoveMemoryMatchGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const cardIcons = [
    { icon: <Heart className="w-6 h-6 text-red-500 fill-red-500" />, name: 'heart' },
    { icon: <Sparkles className="w-6 h-6 text-yellow-400" />, name: 'sparkle' },
    { icon: <Smile className="w-6 h-6 text-yellow-500" />, name: 'smile' },
    { icon: <Gift className="w-6 h-6 text-pink-400" />, name: 'gift' },
    { icon: <Flame className="w-6 h-6 text-orange-500" />, name: 'flame' },
    { icon: <Gamepad2 className="w-6 h-6 text-blue-400" />, name: 'game' },
  ];

  const initializeGame = () => {
    const duplicated = [...cardIcons, ...cardIcons].map((item, index) => ({
      id: index,
      icon: item.icon,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));
    
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      
      if (cards[firstIdx].name === cards[secondIdx].name) {
        setTimeout(() => {
          const matchedCards = cards.map((card, idx) => {
            if (idx === firstIdx || idx === secondIdx) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          setCards(matchedCards);
          setFlippedCards([]);
          
          if (matchedCards.every(card => card.isMatched)) {
            setIsWon(true);
            confetti({
              particleCount: 80,
              spread: 60,
              colors: ['#FF4F81', '#FFCCD5', '#D4AF37']
            });
          }
        }, 600);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card, idx) => {
            if (idx === firstIdx || idx === secondIdx) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.4)] w-full"
    >
      <h3 className="text-base font-bold text-white mb-2 select-none flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-gold" />
        <span>Love Memory Match</span>
      </h3>
      <p className="text-[10px] text-white/40 mb-6 uppercase tracking-wider text-center select-none font-bold">
        Match all pairs of romantic symbols to reveal the secret memo.
      </p>

      <div className="grid grid-cols-4 gap-3 w-full max-w-[280px] aspect-square relative select-none">
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-[#161B22]/95 border border-primary/20 rounded-2xl flex flex-col items-center justify-center p-4 text-center z-30"
            >
              <Heart className="w-10 h-10 text-primary fill-primary animate-pulse mb-2" />
              <h4 className="font-serif text-white font-bold text-base mb-1.5">Pairs Matched!</h4>
              <p className="font-serif italic text-xs text-white/80 leading-relaxed max-w-[200px]">
                "Every match reminds me of how perfectly we fit together, Shobi. You reside in my mind!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {cards.map((card) => {
          const showContent = card.isFlipped || card.isMatched;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="relative aspect-square rounded-xl cursor-pointer preserve-3d transition-transform duration-500"
              style={{
                transform: showContent ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className="absolute inset-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner hover:border-primary/45 transition-colors"
                style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
              >
                <Heart className="w-5 h-5 text-white/15" />
              </div>
              <div 
                className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/30 flex items-center justify-center shadow-lg"
                style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}
              >
                {card.icon}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/40 mt-6 uppercase tracking-wider font-semibold">
        <span>Moves: {moves}</span>
        <button
          onClick={initializeGame}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </motion.div>
  );
};

/* ==========================================
   GAME 4: HEARTS CATCHER
   ========================================== */
interface CatchItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'heart' | 'kiss' | 'bomb';
  size: number;
  color: string;
}

const HeartsCatcherGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const scoreRef = useRef(0);
  const basketRef = useRef({ x: 120, y: 200, width: 60, height: 16 });
  const itemsRef = useRef<CatchItem[]>([]);
  const isPlayingRef = useRef(true);

  useEffect(() => {
    scoreRef.current = 0;
    setScore(0);
    setGameWon(false);
    isPlayingRef.current = true;
    itemsRef.current = [];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 230;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      basketRef.current.x = Math.max(0, Math.min(canvas.width - basketRef.current.width, relativeX - basketRef.current.width / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      basketRef.current.x = Math.max(0, Math.min(canvas.width - basketRef.current.width, relativeX - basketRef.current.width / 2));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    let frameId: number;
    let spawnTimer = 0;

    const gameLoop = () => {
      if (!isPlayingRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FF4F81';
      ctx.beginPath();
      ctx.roundRect(basketRef.current.x, basketRef.current.y, basketRef.current.width, basketRef.current.height, 8);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CATCH LOVE', basketRef.current.x + basketRef.current.width / 2, basketRef.current.y + 11);

      spawnTimer++;
      if (spawnTimer > 35) {
        spawnTimer = 0;
        const types: ('heart' | 'kiss' | 'bomb')[] = ['heart', 'heart', 'kiss', 'bomb'];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        
        itemsRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * (canvas.width - 20) + 10,
          y: -10,
          speed: Math.random() * 1.5 + 1.5,
          type: chosenType,
          size: chosenType === 'kiss' ? 10 : chosenType === 'bomb' ? 8 : 12,
          color: chosenType === 'kiss' ? '#FF80AB' : chosenType === 'bomb' ? '#60A5FA' : '#FF4F81'
        });
      }

      const items = itemsRef.current;
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;

        ctx.fillStyle = item.color;
        ctx.beginPath();
        if (item.type === 'heart') {
          const size = item.size;
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.beginPath();
          ctx.moveTo(0, size * 0.3);
          ctx.bezierCurveTo(-size / 2, -size / 2, -size, size * 0.3, 0, size);
          ctx.bezierCurveTo(size, size * 0.3, size / 2, -size / 2, 0, size * 0.3);
          ctx.fill();
          ctx.restore();
        } else if (item.type === 'kiss') {
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fill();
        }

        const basket = basketRef.current;
        if (
          item.y + item.size >= basket.y && 
          item.y <= basket.y + basket.height &&
          item.x >= basket.x - 5 && 
          item.x <= basket.x + basket.width + 5
        ) {
          if (item.type === 'heart') {
            scoreRef.current += 10;
          } else if (item.type === 'kiss') {
            scoreRef.current += 20;
          } else {
            scoreRef.current = Math.max(0, scoreRef.current - 15);
          }
          setScore(scoreRef.current);
          items.splice(i, 1);

          if (scoreRef.current >= 100) {
            isPlayingRef.current = false;
            setGameWon(true);
            confetti({
              particleCount: 80,
              spread: 60,
              colors: ['#FF4F81', '#FFCCD5', '#D4AF37']
            });
          }
        } 
        else if (item.y > canvas.height + 15) {
          items.splice(i, 1);
        }
      }

      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleRestart = () => {
    scoreRef.current = 0;
    setScore(0);
    setGameWon(false);
    isPlayingRef.current = true;
    itemsRef.current = [];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.4)] w-full"
    >
      <h3 className="text-base font-bold text-white mb-2 select-none flex items-center gap-1.5">
        <Trophy className="w-4 h-4 text-gold" />
        <span>Hearts Catcher Game</span>
      </h3>
      <p className="text-[10px] text-white/40 mb-6 uppercase tracking-wider text-center select-none font-bold">
        Move your mouse/finger to catch hearts. Reach 100 points to win!
      </p>

      <div className="relative w-[300px] h-[230px] border border-white/5 bg-[#090C10] rounded-2xl overflow-hidden shadow-inner mb-6 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-none"
        />

        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-[#161B22]/95 border border-primary/20 rounded-2xl flex flex-col items-center justify-center p-4 text-center z-30 select-none"
            >
              <Heart className="w-10 h-10 text-primary fill-primary animate-pulse mb-2" />
              <h4 className="font-serif text-white font-bold text-base mb-1.5">Affection Caught!</h4>
              <p className="font-serif italic text-xs text-white/80 leading-relaxed max-w-[200px]">
                "You caught 100+ points of my affection! Shobi, you have fully captured my heart!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-wider font-semibold select-none">
        <span>Score: {score} / 100</span>
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </motion.div>
  );
};

export default MiniGames;
