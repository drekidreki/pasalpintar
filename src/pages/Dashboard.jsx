import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InvestigationBoard from '../components/board/InvestigationBoard';
import { useGameProgress } from '../hooks/useGameProgress';
import { chapters } from '../data/chapters';
import { characters } from '../data/characters';
import { INDICATORS } from '../data/indicators';

function InvestigatorNote({ progress }) {
  const investigator = characters.find((c) => c.id === progress.characterId);
  const solved = progress.completedCases.length;
  const scores = Object.values(progress.caseResults)
    .map((r) => r?.best?.score)
    .filter(Number.isFinite);
  const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  return (
    <section className="sticky-note -rotate-2 w-full max-w-[280px]" aria-labelledby="note-heading">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
      <h2 id="note-heading" className="font-hand font-bold text-xl tracking-normal mb-2">Catatan penyidik</h2>
      {investigator ? (
        <p className="text-lg leading-snug">
          {investigator.name}, {investigator.roleLabel || investigator.role}
        </p>
      ) : (
        <p className="text-lg leading-snug">Belum ada penyidik yang dipilih.</p>
      )}
      <p className="text-lg leading-snug mt-1">
        {solved} dari {chapters.length} kasus terbukti
      </p>
      {average !== null && <p className="text-lg leading-snug">Rata-rata skor terbaik: {average}</p>}
      <Link
        to="/character-select"
        className="inline-block mt-3 text-base underline decoration-crimson decoration-2 underline-offset-4"
      >
        {investigator ? 'Ganti penyidik' : 'Pilih penyidik'}
      </Link>
      {solved > 0 && (
        <Link
          to="/report"
          className="block mt-1 text-base underline decoration-crimson decoration-2 underline-offset-4"
        >
          Lihat statistik
        </Link>
      )}
    </section>
  );
}

function CityCard({ indicators }) {
  return (
    <section className="index-card rotate-1 w-full max-w-[420px] pt-2" aria-labelledby="city-heading">
      <span className="tape -top-3 right-8 -rotate-6" aria-hidden="true" />
      <h2 id="city-heading" className="font-display font-bold text-2xl leading-[30px] mb-2">Kondisi kota</h2>
      <dl className="space-y-[7px]">
        {INDICATORS.map(({ key, label }) => {
          const value = indicators[key];
          return (
            <div key={key} className="grid grid-cols-[1fr_auto] items-center gap-x-3">
              <dt className="text-[15px] font-medium leading-[17px]">{label}</dt>
              <dd className="font-display font-bold text-lg leading-[17px] tabular-nums">{value}</dd>
              <dd className="col-span-2 h-[6px] bg-ink/10 rounded-full overflow-hidden" aria-hidden="true">
                <span className="block h-full bg-ink/75 rounded-full" style={{ width: `${value}%` }} />
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="text-xs leading-snug text-ink/75 mt-3">
        Skala 0–100. Indikator skenario edukatif, bukan data kota sungguhan. Setiap kasus dihitung dari hasil terbaikmu.
      </p>
    </section>
  );
}

function StringLegend() {
  return (
    <p className="bg-[#EFE6D2] text-ink text-sm leading-snug px-4 py-3 shadow-pinned rotate-1 max-w-[300px]">
      <span className="flex items-center gap-2 font-semibold mb-1">
        <span className="inline-block w-8 h-[3px] bg-crimson rounded-full" aria-hidden="true" />
        Benang merah
      </span>
      Menghubungkan kasus yang berbagi pasal yang sama. Arahkan kursor atau fokus ke berkas untuk melihat pasalnya.
    </p>
  );
}

export default function Dashboard() {
  const { progress } = useGameProgress();

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />

      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
        <header className="mb-5 max-w-2xl">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-none">Papan investigasi</h1>
          <p className="text-gray-300 mt-2">
            Lima berkas pelanggaran hak warga menunggu. Pilih satu foto di papan untuk membuka berkasnya.
          </p>
        </header>

        <div className="wood-frame">
          <div className="cork px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-8 mb-8 xl:mb-4">
              <InvestigatorNote progress={progress} />
              <div className="hidden xl:block self-end">
                <StringLegend />
              </div>
              <CityCard indicators={progress.cityIndicators} />
            </div>

            <InvestigationBoard chapters={chapters} progress={progress} />
          </div>
        </div>
      </main>
    </div>
  );
}
