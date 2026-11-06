import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Lock, RotateCcw, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGameProgress } from '../hooks/useGameProgress';
import { chapters } from '../data/chapters';

export default function Dashboard() {
  const { progress } = useGameProgress();
  const navigate = useNavigate();

  const indicators = [
    { label: 'Social Stability', value: progress.cityIndicators.socialStability, color: 'bg-status-success' },
    { label: 'Legal Integrity', value: progress.cityIndicators.legalIntegrity, color: 'bg-accent-blue' },
    { label: 'Regional Dev.', value: progress.cityIndicators.regionalDevelopment, color: 'bg-status-warning' },
    { label: 'Public Trust', value: progress.cityIndicators.publicTrust, color: 'bg-status-danger' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header & City Indicators */}
          <section className="mb-12" aria-labelledby="city-heading">
            <h1 id="city-heading" className="text-3xl font-bold mb-2">City Overview</h1>
            <p className="text-xs text-gray-400 mb-6">
              Indikator skenario edukatif (skala 0–100), bukan data atau prediksi kota sungguhan. Setiap kasus dihitung dari hasil terbaikmu.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {indicators.map((ind) => (
                <div key={ind.label} className="card-dark !p-4">
                  <div className="text-xs text-gray-400 mb-2">{ind.label}</div>
                  <div className="text-2xl font-bold mb-2">
                    {ind.value}
                    <span className="text-sm font-normal text-gray-400"> / 100</span>
                  </div>
                  <div
                    className="w-full bg-gray-700 h-2 rounded-full overflow-hidden"
                    role="meter"
                    aria-label={ind.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={ind.value}
                  >
                    <div className={`h-full ${ind.color}`} style={{ width: `${ind.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cases List */}
          <section aria-labelledby="cases-heading">
            <h2 id="cases-heading" className="text-2xl font-bold mb-6">Active Cases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((chapter) => {
                const result = progress.caseResults[chapter.id];
                const isCompleted = progress.completedCases.includes(chapter.id);
                const bestScore = result?.best?.score;
                return (
                  <article
                    key={chapter.id}
                    className={`card-dark flex flex-col ${!chapter.isUnlocked ? 'opacity-60 grayscale' : ''}`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 bg-gray-800 rounded-full text-accent-blue border border-white/5">
                        {chapter.category}
                      </span>
                      {!chapter.isUnlocked && <Lock size={16} className="text-gray-500" aria-label="Terkunci" />}
                      {chapter.isUnlocked && isCompleted && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-status-success/15 text-status-success flex items-center gap-1">
                          <CheckCircle2 size={12} aria-hidden="true" />
                          Selesai{Number.isFinite(bestScore) ? ` · Terbaik ${bestScore}` : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
                    <p className="text-sm text-gray-400 mb-6 flex-1">{chapter.description}</p>

                    <button
                      type="button"
                      onClick={() => navigate(`/case/${chapter.id}`)}
                      disabled={!chapter.isUnlocked}
                      className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                        chapter.isUnlocked
                          ? 'bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!chapter.isUnlocked ? (
                        'Locked'
                      ) : isCompleted ? (
                        <>
                          <RotateCcw size={16} aria-hidden="true" /> Replay Investigation
                        </>
                      ) : (
                        <>
                          <Play size={16} aria-hidden="true" /> Start Investigation
                        </>
                      )}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
