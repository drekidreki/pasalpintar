import { motion } from 'framer-motion';
import { Award, CheckCircle, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGameProgress } from '../hooks/useGameProgress';
import { chapters } from '../data/chapters';
import { ACHIEVEMENTS, makeContext, unlockedAchievements } from '../data/achievements';
import { formatCheckedAt } from '../lib/actionGuide';

const CONTEXT = makeContext(chapters);

export default function Achievements() {
  const { progress } = useGameProgress();
  const unlocked = new Set(unlockedAchievements(progress, CONTEXT));
  const dates = progress.achievements || {};

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Award className="text-brass" aria-hidden="true" /> Badges & Achievements
          </h1>
          <p className="text-gray-400 mb-2">
            Setiap lencana didapat dari cara kamu menyelidiki dan menalar kasus, bukan dari lamanya bermain. Lencana yang sudah terbuka tidak akan hilang.
          </p>
          <p className="text-sm text-gray-300 mb-8" aria-live="polite">
            {unlocked.size} dari {ACHIEVEMENTS.length} lencana terbuka
          </p>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((b) => {
              const isOpen = unlocked.has(b.id);
              const at = dates[b.id]?.slice(0, 10);
              return (
                <li
                  key={b.id}
                  className={`card-dark p-6 flex flex-col items-center text-center ${isOpen ? '' : 'opacity-60'}`}
                >
                  <div className={`p-4 rounded-full mb-4 ${isOpen ? 'bg-brass/20 text-brass' : 'bg-black/30 text-gray-400'}`}>
                    {isOpen ? <CheckCircle size={32} aria-hidden="true" /> : <Lock size={32} aria-hidden="true" />}
                  </div>
                  <h2 className="font-bold text-lg mb-1">{b.title}</h2>
                  <p className="text-xs text-gray-300">{b.desc}</p>
                  <p className="text-xs mt-3 font-semibold text-gray-400">
                    {isOpen ? (at ? `Terbuka · ${formatCheckedAt(at)}` : 'Terbuka') : 'Terkunci'}
                  </p>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
