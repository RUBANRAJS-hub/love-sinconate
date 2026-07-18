import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoveProvider, useLove } from './context/LoveContext';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';

// Pages imports
import LoadingScreen from './pages/LoadingScreen';
import Home from './pages/Home';
import LoveLetter from './pages/LoveLetter';
import Timeline from './pages/Timeline';
import Gallery from './pages/Gallery';
import MusicPlayer from './pages/MusicPlayer';
import Reasons from './pages/Reasons';
import LoveQuiz from './pages/LoveQuiz';
import RoseGarden from './pages/RoseGarden';
import MiniGames from './pages/MiniGames';
import SecretPage from './pages/SecretPage';
import Proposal from './pages/Proposal';
import Ending from './pages/Ending';

// Route protection that redirects to biometric scanner if locked
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loveUnlocked } = useLove();
  if (!loveUnlocked) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-slate-bg overflow-x-hidden">
        {/* Custom cursor (Heart and tail) */}
        <CustomCursor />
        
        {/* Global ambient particle generator */}
        <BackgroundEffects />

        {/* Floating Top Navigation */}
        <Navbar />

        {/* Main Routes content container */}
        <div className="relative w-full z-10">
          <Routes>
            <Route path="/" element={<LoadingScreen />} />
            
            {/* Protected Romantic Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/letter" element={<ProtectedRoute><LoveLetter /></ProtectedRoute>} />
            <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
            <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
            <Route path="/music" element={<ProtectedRoute><MusicPlayer /></ProtectedRoute>} />
            <Route path="/reasons" element={<ProtectedRoute><Reasons /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><LoveQuiz /></ProtectedRoute>} />
            <Route path="/garden" element={<ProtectedRoute><RoseGarden /></ProtectedRoute>} />
            <Route path="/games" element={<ProtectedRoute><MiniGames /></ProtectedRoute>} />
            <Route path="/secret" element={<ProtectedRoute><SecretPage /></ProtectedRoute>} />
            <Route path="/proposal" element={<ProtectedRoute><Proposal /></ProtectedRoute>} />
            <Route path="/ending" element={<ProtectedRoute><Ending /></ProtectedRoute>} />
            
            {/* Catch-all redirect to fingerprint scanner */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Responsive iOS styled Bottom tab bar */}
        <BottomNavigation />
      </div>
    </Router>
  );
};

function App() {
  return (
    <LoveProvider>
      <AppContent />
    </LoveProvider>
  );
}

export default App;
