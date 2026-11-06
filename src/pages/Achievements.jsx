import { motion } from 'framer-motion';
import { Award, CheckCircle, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGameProgress } from '../hooks/useGameProgress';

export default function Achievements() {
  const { progress } = useGameProgress();
  const completedCount = progress.completedCases.length;

  const badgeList = [
    { id: 'b1', title: 'First Response', desc: 'Selesaikan kasus pertama kamu.', req: 1 },
    { id: 'b2', title: 'Legal Investigator', desc: 'Selesaikan 3 kasus penanganan hak warga.', req: 3 },
    { id: 'b3', title: 'Civic Guardian', desc: 'Selesaikan seluruh 5 kasus di Kota PasalPintar.', req: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Award className="text-brass" /> Badges & Achievements
          </h1>
          <p className="text-gray-400 mb-8">Pencapaian kamu selama bertugas sebagai Civic Response Officer.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {badgeList.map(b => {
              const unlocked = completedCount >= b.req;
              return (
                <div key={b.id} className={`card-dark p-6 flex flex-col items-center text-center ${!unlocked && 'opacity-50'}`}>
                  <div className={`p-4 rounded-full mb-4 ${unlocked ? 'bg-brass/20 text-brass' : 'bg-gray-800 text-gray-400'}`}>
                    {unlocked ? <CheckCircle size={32} /> : <Lock size={32} />}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                  <p className="text-xs text-gray-400">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}