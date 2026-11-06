import { motion } from 'framer-motion';
import { User, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGameProgress } from '../hooks/useGameProgress';
import { characters } from '../data/characters';

export default function PlayerReport() {
  const { progress } = useGameProgress();
  const selectedChar = characters.find(c => c.id === progress.characterId) || characters[0];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <User className="text-brass" /> Officer Profile Report
          </h1>

          <div className="card-dark p-8 flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="text-6xl p-6 bg-soot rounded-full border border-brass/30">
              {selectedChar.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{selectedChar.name}</h2>
              <span className="text-brass font-medium text-sm block mb-4">{selectedChar.role}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{selectedChar.description}</p>
            </div>
          </div>

          <div className="card-dark p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldCheck className="text-status-success" size={20} /> Total Completed Cases: {progress.completedCases.length} / 5
            </h3>
            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
              <div className="bg-status-success h-full transition-all" style={{ width: `${(progress.completedCases.length / 5) * 100}%` }} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}