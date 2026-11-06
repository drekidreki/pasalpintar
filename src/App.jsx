import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { lazyPage } from "./lib/lazyPage";

// Each page is downloaded when it is first opened, so the landing page loads fast.
const CharacterSelect = lazyPage(() => import("./pages/CharacterSelect"));
const Dashboard = lazyPage(() => import("./pages/Dashboard"));
const LawLibrary = lazyPage(() => import("./pages/LawLibrary"));
const Achievements = lazyPage(() => import("./pages/Achievements"));
const PlayerReport = lazyPage(() => import("./pages/PlayerReport"));
const GameEngine = lazyPage(() => import("./game/GameEngine"));

function PageLoading() {
  return (
    <div
      className="flex-1 flex items-center justify-center p-10 text-gray-300"
      role="status"
    >
      Membuka berkas…
    </div>
  );
}

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
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex-1 flex flex-col"
      >
        <Suspense fallback={<PageLoading />}>
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
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    // reducedMotion="user": Framer Motion skips transform/layout animations
    // when the OS "reduce motion" setting is on.
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen text-white flex flex-col">
            <AnimatedRoutes />
          </div>
        </Router>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
