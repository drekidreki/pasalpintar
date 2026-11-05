import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Lock } from 'lucide-react';
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
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-6">City Overview</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {indicators.map((ind, idx) => (
                <div key={idx} className="card-dark !p-4">
                  <div className="text-xs text-gray-400 mb-2">{ind.label}</div>
                  <div className="text-2xl font-bold mb-2">{ind.value}%</div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${ind.color}`} style={{ width: `${ind.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cases List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Active Cases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((chapter) => (
                <div key={chapter.id} className={`card-dark flex flex-col ${!chapter.isUnlocked && 'opacity-60 grayscale'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-gray-800 rounded-full text-accent-blue border border-white/5">
                      {chapter.category}
                    </span>
                    {!chapter.isUnlocked && <Lock size={16} className="text-gray-500" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 flex-1">{chapter.description}</p>
                  
                  <button 
                    onClick={() => navigate(`/case/${chapter.id}`)}
                    disabled={!chapter.isUnlocked}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                      chapter.isUnlocked 
                        ? 'bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {chapter.isUnlocked ? <><Play size={16} /> Start Investigation</> : 'Locked'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}