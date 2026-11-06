import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Lightbulb, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import InvestigatorAvatar from '../components/InvestigatorAvatar';
import { useGameProgress } from '../hooks/useGameProgress';
import { characters } from '../data/characters';
import { chapters } from '../data/chapters';
import { ACHIEVEMENTS, makeContext, unlockedAchievements } from '../data/achievements';
import { caseRows, skillAverages, weakestSkill } from '../lib/playerStats';

const CONTEXT = makeContext(chapters);
const STATUS = {
  selesai: 'Selesai',
  'versi-lama': 'Selesai (versi lama, skor tidak tercatat)',
  berjalan: 'Sedang diselidiki',
  belum: 'Belum dibuka',
};

function Stats({ progress }) {
  const rows = caseRows(chapters, progress, CONTEXT.optimal);
  const skills = skillAverages(progress);
  const weak = weakestSkill(skills);
  const badges = unlockedAchievements(progress, CONTEXT).length;
  const totalAttempts = rows.reduce((a, r) => a + r.attempts, 0);

  return (
    <>
      <div className="card-dark p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BarChart3 className="text-brass" size={20} aria-hidden="true" /> Rekap kasus
        </h2>
        <ul className="divide-y divide-white/10">
          {rows.map((r) => (
            <li key={r.id} className="py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="min-w-0">
                <p className="font-semibold">{r.title}</p>
                <p className="text-xs text-gray-400">
                  {STATUS[r.status]}
                  {r.attempts > 0 && ` · ${r.attempts} percobaan`}
                </p>
                {r.decisionTitle && (
                  <p className="text-xs text-gray-300 mt-0.5">
                    Strategi terbaikmu: {r.decisionTitle}
                    {r.optimalChosen ? ' (paling melindungi hak)' : ''}
                  </p>
                )}
              </div>
              <p className="font-display font-bold text-2xl tabular-nums">
                {r.bestScore !== null ? r.bestScore : '—'}
                {r.bestScore !== null && <span className="text-sm font-normal text-gray-400"> / 100</span>}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          Total {totalAttempts} percobaan. Skor yang ditampilkan adalah skor terbaik tiap kasus.
        </p>
      </div>

      <div className="card-dark p-6 mb-8">
        <h2 className="font-bold text-lg mb-1">Kemampuan penyidik</h2>
        {skills ? (
          <>
            <p className="text-xs text-gray-400 mb-4">
              Rata-rata dari hasil terbaik di {skills[0].cases} kasus, sebagai persentase nilai maksimal tiap tahap.
            </p>
            <dl className="space-y-3">
              {skills.map((s) => (
                <div key={s.key}>
                  <div className="flex justify-between text-sm">
                    <dt>{s.label}</dt>
                    <dd className="font-semibold tabular-nums">{s.pct}%</dd>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden mt-1" aria-hidden="true">
                    <span className="block h-full bg-brass rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </dl>
            {weak && (
              <p className="mt-5 text-sm text-gray-200 flex gap-2 border-l-2 border-brass pl-3">
                <Lightbulb size={18} className="text-brass shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="font-semibold">Paling perlu dilatih: {lowerFirst(weak.label)}.</span> {weak.tip}
                </span>
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-300">Selesaikan satu kasus untuk melihat kemampuanmu per tahap.</p>
        )}
      </div>

      <div className="card-dark p-6 mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold">
          <Award className="text-brass" size={20} aria-hidden="true" /> {badges} dari {ACHIEVEMENTS.length} lencana terbuka
        </p>
        <Link to="/achievements" className="text-sm underline decoration-brass underline-offset-4">
          Lihat lencana
        </Link>
      </div>
    </>
  );
}

const lowerFirst = (t) => t.charAt(0).toLowerCase() + t.slice(1);

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

        <div className="card-dark p-6 mb-8">
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
        <Stats progress={progress} />
      </main>
    </div>
  );
}
