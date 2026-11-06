import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Landing from './pages/Landing';
import CharacterSelect from './pages/CharacterSelect';
import Dashboard from './pages/Dashboard';
import LawLibrary from './pages/LawLibrary';
import Achievements from './pages/Achievements';
import PlayerReport from './pages/PlayerReport';
import NotFound from './pages/NotFound';
import GameEngine from './game/GameEngine';

function App() {
  return (
    // reducedMotion="user": Framer Motion skips transform/layout animations
    // when the OS "reduce motion" setting is on.
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen bg-navy-primary text-white flex flex-col">
          {/* Routing Configuration */}
          <Routes>
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
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
