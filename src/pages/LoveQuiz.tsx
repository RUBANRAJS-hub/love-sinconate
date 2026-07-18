import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Award, RefreshCw, Sparkles, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LoveQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const hasAnswered = selectedOption !== null;

  const questions: Question[] = [

  {
    id: 1,
    question: "Where did we first meet in outing place?",
    options: ["Cozy Coffee Shop", "Park Walkway", "Under the City Lights", "Near the Library"],
    correctAnswer: 2,
    explanation: "We met under the beautiful trees in the park walkway, a moment where the wind seemed to stand still for us."
  },
  {
    id: 2,
    question: "What is my absolute favorite thing about you?",
    options: ["Your cute laugh", "Your beautiful sparkling eyes", "Your warm, kind heart", "All of the above ❤️"],
    correctAnswer: 3,
    explanation: "Every part of you is perfect, Shobi. I couldn't choose just one even if I tried!"
  },
  {
    id: 3,
    question: "What was the date of our anniversary?",
    options: ["October 18", "December 14", "April 5", "June 21"],
    correctAnswer: 3,
    explanation: "June 21 is the day our stars aligned and my life changed forever."
  },
  {
    id: 4,
    question: "How long do I promise to love and cherish you?",
    options: ["A few years", "As long as we are happy", "Until the stars stop shining 💫", "Forever and a day more ❤️"],
    correctAnswer: 3,
    explanation: "My love for you stretches beyond time and space. It is eternal."
  },
  {
    id: 5,
    question: "What nickname do I love calling you?",
    options: ["ammu 👑", "papa ❤️", "Shobi 🥰", "pondati 😇"],
    correctAnswer: 1,
    explanation: "Calling you 'papa' always makes my heart smile."
  },
  {
    id: 6,
    question: "What do I miss the most when you're away?",
    options: ["Your messages", "Your smile", "Your voice", "Everything about you ❤️"],
    correctAnswer: 3,
    explanation: "Distance only reminds me how much every little thing about you means to me."
  },
  {
    id: 7,
    question: "What is our dream destination together?",
    options: ["Maldives 🏝️", "kodaikanal 🗼", "ooty ❄️", "Anywhere as long as we're together ❤️"],
    correctAnswer: 3,
    explanation: "Every place becomes magical when I'm with you."
  },
  {
    id: 8,
    question: "What would I do if you were feeling sad?",
    options: ["Give you space", "Buy you chocolates 🍫", "Hold your hand and make you smile ❤️", "Send funny memes 😂"],
    correctAnswer: 2,
    explanation: "Your happiness is my priority, and I'll always stay beside you."
  },
  {
    id: 9,
    question: "Who owns my heart forever?",
    options: ["Nobody", "My family", "Shobi ❤️", "It's a secret 🤫"],
    correctAnswer: 2,
    explanation: "My heart has only one owner, and that's you."
  },
  {
    id: 10,
    question: "What happens after you answer all the questions correctly?",
    options: ["Nothing", "You unlock a surprise ❤️", "You get unlimited hugs 🤗", "Both B & C 💕"],
    correctAnswer: 3,
    explanation: "Congratulations! You've unlocked my heart, a special love message, and unlimited virtual hugs forever!"
  }
];
  const handleOptionSelect = (optionIdx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(optionIdx);
    
    const isCorrect = optionIdx === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      // Trigger confetti explosion
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#FF4F81', '#FFCCD5', '#D4AF37'],
        origin: { y: 0.7 }
      });
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Mega confetti on finish
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-12 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Interactive</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Love Compatibility Quiz
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          Test your knowledge about us! Each correct answer unlocks sweet secrets.
        </p>
      </div>

      {/* Quiz Card */}
      <div className="w-full max-w-lg z-10">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
            >
              {/* Card top stats */}
              <div className="flex justify-between items-center text-xs text-white/40 mb-6 font-mono font-semibold">
                <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
                <span className="text-primary flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Score: {score}</span>
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed select-none">
                {questions[currentIdx].question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3 mb-6">
                {questions[currentIdx].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === questions[currentIdx].correctAnswer;
                  const isWrongSelected = isSelected && !isCorrect;
                  let btnStyle = "border-white/10 text-white hover:bg-white/5 hover:border-white/20";
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-green-500/20 border-green-500/50 text-green-300 shadow-[0_0_12px_rgba(34,197,94,0.15)]";
                    } else if (isWrongSelected) {
                      btnStyle = "bg-red-500/20 border-red-500/50 text-red-300";
                    } else {
                      btnStyle = "opacity-40 border-white/5 text-white/50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left px-5 py-4 rounded-2xl border text-sm font-semibold transition-all active:scale-98 flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrect && <Check className="w-4 h-4 text-green-400" />}
                      {hasAnswered && isWrongSelected && <AlertCircle className="w-4 h-4 text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation Section */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white/5 border border-white/5 p-4.5 rounded-2xl text-xs md:text-sm text-white/70 leading-relaxed italic mb-6 select-none"
                >
                  <div className="font-bold text-primary mb-1 flex items-center gap-1 not-italic">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Secret Log:</span>
                  </div>
                  "{questions[currentIdx].explanation}"
                </motion.div>
              )}

              {/* Next Button */}
              {hasAnswered && (
                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold tracking-wide transition-all shadow-[0_4px_15px_rgba(255,79,129,0.3)] hover:scale-103 active:scale-97 cursor-pointer"
                >
                  {currentIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              )}
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-6 text-gold shadow-[0_0_20px_rgba(212,175,55,0.25)] animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
              <p className="text-white/40 text-xs tracking-wider uppercase font-semibold mb-6">Evaluation Certificate</p>

              {/* Score Display */}
              <div className="bg-white/5 border border-white/5 px-6 py-4 rounded-2xl mb-8">
                <div className="text-4xl font-mono font-bold text-primary">{Math.round((score / questions.length) * 100)}%</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Accuracy Score</div>
              </div>

              <p className="text-white/80 text-sm italic leading-relaxed max-w-sm mb-8 select-none">
                "Shobi, you got {score} out of {questions.length} questions right! No matter the score, you hold a 100% space in my heart forever and ever."
              </p>

              <button
                onClick={handleRestart}
                className="group w-full py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span>Retry Quiz</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default LoveQuiz;
