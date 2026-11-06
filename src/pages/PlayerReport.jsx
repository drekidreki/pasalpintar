import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import InvestigatorAvatar from '../components/InvestigatorAvatar';
import { useGameProgress } from '../hooks/useGameProgress';
import { characters } from '../data/characters';
import { chapters } from '../data/chapters';

export default function PlayerReport() {
  const { progress } = useGameProgress();
  // No silent fallback to another character: show what is actually saved.
  const selectedChar = characters.find((c) => c.id === progress.characterId) || null;
  const total = chapters.length;
  const done = progress.completedCases.length;

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
        <h1 className="font-display font-extrabold text-4xl mb-6">Profil penyidik</h1>

        <div className="card-dark p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center mb-8">
          {selectedChar ? (
            <>
              <InvestigatorAvatar character={selectedChar} size={96} />
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedChar.name}</h2>
                <span className="text-brass font-medium text-sm block mb-3">{selectedChar.roleLabel}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedChar.description}</p>
                <Link to="/character-select" className="inline-block mt-3 text-sm underline decoration-brass underline-offset-4">
                  Ganti penyidik
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-300">
              Belum ada penyidik yang dipilih.{' '}
              <Link to="/character-select" className="underline decoration-brass underline-offset-4">
                Pilih penyidik
              </Link>
            </p>
          )}
        </div>

        <div className="card-dark p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <ShieldCheck className="text-status-success" size={20} aria-hidden="true" /> Kasus terbukti: {done} / {total}
          </h2>
          <div
            className="w-full bg-black/30 h-3 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-label="Kasus terbukti"
          >
            <div className="bg-status-success h-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
          </div>
        </div>
      </main>
    </div>
  );
}
