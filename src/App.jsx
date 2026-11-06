import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Landing from './pages/Landing';
import CharacterSelect from './pages/CharacterSelect';
import Dashboard from './pages/Dashboard';
import LawLibrary from './pages/LawLibrary';
import Achievements from './pages/Achievements';
import PlayerReport from './pages/PlayerReport';
import NotFound from './pages/NotFound';
import GameEngine from './game/GameEngine';

/**
 * A short cross-fade between pages, like turning from one desk to another.
 * Keyed by pathname so each route gets its own enter/exit.
 */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/character-select" element={<CharacterSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/law-library" element={<LawLibrary />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/report" element={<PlayerReport />} />

          {/* Game Engine Route with dynamic case ID */}
          <Route path="/case/:caseId" element={<GameEngine />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    // reducedMotion="user": Framer Motion skips transform/layout animations
    // when the OS "reduce motion" setting is on.
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen text-white flex flex-col">
          <AnimatedRoutes />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
