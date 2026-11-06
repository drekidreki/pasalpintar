import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ArrowRight,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Copy,
  Printer,
  Scale,
  Lightbulb,
  Building,
  ClipboardList,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SCORING_WEIGHTS, directionOf } from '../data/scoring';
import { INDICATORS, DIRECTIONS } from '../data/indicators';
import { laws } from '../data/laws';
import { buildGuideText, copyText, formatCheckedAt, GUIDE_DISCLAIMER } from '../lib/actionGuide';

const ROWS = [
  ['problemIdentification', 'Problem Identification'],
  ['rightsDuties', 'Rights & Duties Analysis'],
  ['legalBasis', 'Legal Basis Accuracy'],
  ['solutionQuality', 'Solution Quality'],
  ['impactUnderstanding', 'Impact Understanding'],
];

const dirLabel = (id) => DIRECTIONS.find((d) => d.id === id)?.label ?? '—';
const signed = (n) => (n > 0 ? `+${n}` : `${n}`);

function LawChips({ ids }) {
  const items = (ids || []).map((id) => laws.find((l) => l.id === id)).filter(Boolean);
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-2 mt-3" aria-label="Dasar hukum">
      {items.map((l) => (
        <li key={l.id} className="text-xs px-2 py-1 rounded border border-white/15 text-gray-200 flex items-center gap-1">
          <Scale size={12} aria-hidden="true" /> {l.title}
        </li>
      ))}
    </ul>
  );
}

function ImpactTable({ decision, prediction, before, after, isNewBest }) {
  const changed = INDICATORS.some(({ key }) => before?.[key] !== after?.[key]);
  const rows = INDICATORS.map(({ key, label }) => {
    const delta = decision.cityImpact?.[key] ?? 0;
    const actual = directionOf(delta);
    const guess = prediction?.[key];
    return { key, label, delta, actual, guess, right: guess === actual, b: before?.[key], a: after?.[key], reason: decision.impactReasons?.[key] };
  });
  const guessCell = (r) =>
    r.guess ? (
      <span className={`inline-flex items-center gap-1 ${r.right ? 'text-status-success' : 'text-status-danger'}`}>
        {r.right ? <CheckCircle2 size={14} aria-hidden="true" /> : <XCircle size={14} aria-hidden="true" />}
        {dirLabel(r.guess)}
        <span className="sr-only">{r.right ? '(tepat)' : '(kurang tepat)'}</span>
      </span>
    ) : (
      <span className="text-gray-400">—</span>
    );
  const cityCell = (r) =>
    Number.isFinite(r.b) && Number.isFinite(r.a) ? (
      <>
        {r.b} → <span className="font-semibold">{r.a}</span>
        {r.a !== r.b && <span className="text-gray-400"> ({signed(r.a - r.b)})</span>}
      </>
    ) : (
      '—'
    );
  return (
    <section aria-labelledby="impact-heading" className="mb-8">
      <h2 id="impact-heading" className="font-bold text-lg mb-1 flex items-center gap-2">
        <Building size={20} className="text-brass" aria-hidden="true" /> Dampak ke kota
      </h2>
      <p className="text-sm text-gray-300 mb-4">
        {isNewBest
          ? 'Hasil ini menjadi hasil terbaikmu untuk kasus ini, jadi indikator kota memakai dampak strategi ini.'
          : 'Indikator kota memakai hasil terbaikmu untuk kasus ini, jadi percobaan ini tidak mengubah kota.'}
      </p>
      {/* Phones: one card per indicator, so the result is never hidden off-screen. */}
      <ul className="sm:hidden space-y-3" aria-label="Prediksi dan dampak strategi terhadap indikator kota">
        {rows.map((r) => (
          <li key={r.key} className="border border-white/10 rounded-md p-3 text-sm">
            <p className="font-semibold text-white mb-2">{r.label}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              <dt className="text-gray-400">Prediksimu</dt>
              <dd>{guessCell(r)}</dd>
              <dt className="text-gray-400">Dampak</dt>
              <dd className="text-gray-200 font-semibold">
                {dirLabel(r.actual)} ({signed(r.delta)})
              </dd>
              <dt className="text-gray-400">Kota</dt>
              <dd className="text-gray-200">{cityCell(r)}</dd>
            </dl>
            {r.reason && <p className="text-xs text-gray-400 mt-2">{r.reason}</p>}
          </li>
        ))}
      </ul>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[560px]">
          <caption className="sr-only">Prediksi dan dampak strategi terhadap indikator kota</caption>
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th scope="col" className="py-2 pr-3 font-semibold">Indikator</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Prediksimu</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Dampak strategi</th>
              <th scope="col" className="py-2 font-semibold">Kota: sebelum → sesudah</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-white/5 align-top">
                <th scope="row" className="py-3 pr-3 font-semibold text-white">{r.label}</th>
                <td className="py-3 pr-3">{guessCell(r)}</td>
                <td className="py-3 pr-3 text-gray-200">
                  <span className="font-semibold">
                    {dirLabel(r.actual)} ({signed(r.delta)})
                  </span>
                  {r.reason && <span className="block text-xs text-gray-400 mt-0.5">{r.reason}</span>}
                </td>
                <td className="py-3 text-gray-200 whitespace-nowrap">{cityCell(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isNewBest && changed && (
        <p className="text-xs text-gray-400 mt-2">
          Jika kasus ini sudah pernah kamu selesaikan, perubahan kota dihitung dari hasil terbaik sebelumnya, jadi angkanya bisa
          berbeda dari dampak strategi. Nilai indikator dibatasi 0–100.
        </p>
      )}
    </section>
  );
}

function ActionGuide({ caseData }) {
  const [status, setStatus] = useState('');
  const g = caseData.actionGuide;
  if (!g && !caseData.realWorldAction?.length) return null;

  const handleCopy = async () => {
    const ok = await copyText(buildGuideText(caseData));
    setStatus(ok ? 'Panduan disalin.' : 'Gagal menyalin. Pilih teks panduan lalu salin secara manual.');
  };
  // Print only the guide: take everything else out of the layout (not just
  // hide it), so the printout has no blank pages, then restore afterwards.
  const handlePrint = () => {
    const guide = document.getElementById('action-guide');
    const marked = [];
    for (let node = guide; node && node !== document.body; node = node.parentElement) {
      if (node !== guide) {
        node.setAttribute('data-print-ancestor', '');
        marked.push(node);
      }
      for (const sib of node.parentElement?.children || []) {
        if (sib !== node) {
          sib.setAttribute('data-print-hide', '');
          marked.push(sib);
        }
      }
    }
    document.body.dataset.print = 'guide';
    const done = () => {
      delete document.body.dataset.print;
      for (const el of marked) {
        el.removeAttribute('data-print-hide');
        el.removeAttribute('data-print-ancestor');
      }
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  };

  return (
    <section id="action-guide" aria-labelledby="guide-heading" className="light-interface p-6 md:p-8 rounded-xl mb-8 text-ink">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-crimson">
            Panduan aksi dunia nyata · {caseData.title}
          </p>
          <h2 id="guide-heading" className="font-bold text-xl text-ink">
            {g?.title || 'Langkah yang bisa kamu lakukan'}
          </h2>
        </div>
        <div className="flex gap-2 guide-actions">
          <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md border border-ink/30 hover:bg-ink/5">
            <Copy size={16} aria-hidden="true" /> Salin
          </button>
          <button type="button" onClick={handlePrint} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md border border-ink/30 hover:bg-ink/5">
            <Printer size={16} aria-hidden="true" /> Cetak
          </button>
        </div>
      </div>
      <p aria-live="polite" className="text-sm text-crimson font-semibold min-h-[1.25rem] guide-actions">
        {status}
      </p>

      {g?.steps?.length > 0 && (
        <>
          <h3 className="font-bold mt-2 mb-2 flex items-center gap-2">
            <ClipboardList size={18} className="text-crimson" aria-hidden="true" /> Langkah
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm">
            {g.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </>
      )}

      {g?.contacts?.length > 0 && (
        <>
          <h3 className="font-bold mt-6 mb-2">Ke mana melapor</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            {g.contacts.map((c) => (
              <li key={c.name} className="border border-ink/15 rounded-md p-3 bg-white/40">
                <p className="font-bold">{c.name}</p>
                <p>{c.use}</p>
                <p className="mt-1">
                  <span className="font-semibold">Caranya: </span>
                  {c.how}
                </p>
                {c.source && <p className="text-xs text-ink/70 mt-1">Dicek dari: {c.source}</p>}
              </li>
            ))}
          </ul>
        </>
      )}

      {caseData.realWorldAction?.length > 0 && (
        <>
          <h3 className="font-bold mt-6 mb-2">Kebiasaan baik</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {caseData.realWorldAction.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </>
      )}

      <p className="text-xs text-ink/70 mt-6 border-t border-ink/15 pt-3">
        {GUIDE_DISCLAIMER}
        {g?.checkedAt && ` Dicek pada ${formatCheckedAt(g.checkedAt)}.`}
      </p>
    </section>
  );
}

export default function Evaluation({ caseData, outcome, decision, prediction, onRestart }) {
  const navigate = useNavigate();
  if (!outcome || !decision) return null;
  const { breakdown, total, isNewBest, previousBest, bestScore, attempts, indicatorsBefore, indicatorsAfter } = outcome;
  const best = caseData.decisions.find((d) => d.isOptimal);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-dark p-6 md:p-12 mb-8">
        <div className="text-center mb-8 border-b border-white/10 pb-8">
          <div className="inline-flex p-4 bg-brass/10 rounded-full text-brass mb-4">
            <Award size={48} aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Case Evaluation Report</h1>
          <p className="text-gray-400">{caseData.title}</p>
          <div className="text-5xl font-extrabold text-brass mt-6" data-testid="total-score">
            {total} <span className="text-xl font-normal text-gray-400">/ 100 Pts</span>
          </div>
          <p className="mt-4 text-sm text-gray-300 flex flex-wrap items-center justify-center gap-2" role="status">
            {previousBest !== null && total === previousBest ? (
              `Menyamai skor terbaikmu (${previousBest}).`
            ) : isNewBest && previousBest !== null ? (
              <>
                <Trophy size={16} className="text-status-warning" aria-hidden="true" />
                Rekor baru! Skor terbaik sebelumnya: {previousBest}.
              </>
            ) : isNewBest ? (
              'Hasil pertama untuk kasus ini tercatat.'
            ) : (
              `Skor terbaikmu tetap ${bestScore}. Indikator kota memakai hasil terbaik.`
            )}
            <span className="text-gray-400">· Percobaan ke-{attempts}</span>
          </p>
        </div>

        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 bg-soot/50 p-4 rounded-lg text-sm mb-8">
          {ROWS.map(([key, label]) => (
            <div key={key} className="flex justify-between gap-4">
              <dt className="text-gray-400">{label}</dt>
              <dd className="font-bold text-white">
                {breakdown[key]} / {SCORING_WEIGHTS[key]}
              </dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="decision-heading" className="mb-8 p-6 bg-soot/80 rounded-xl border border-white/10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Strategi yang kamu pilih</p>
          <h2 id="decision-heading" className="font-bold text-lg text-brass mb-3">
            {decision.title}
          </h2>
          <p className={`text-sm font-semibold mb-2 ${decision.isOptimal ? 'text-status-success' : 'text-status-warning'}`}>
            {decision.isOptimal
              ? 'Strategi paling tepat untuk kasus ini.'
              : `Belum optimal · Solution Quality ${decision.solutionQualityScore} / ${SCORING_WEIGHTS.solutionQuality}`}
          </p>
          {decision.explanation && <p className="text-sm text-gray-200">{decision.explanation}</p>}
          <LawChips ids={decision.lawIds} />
          <p className="text-xs text-status-warning bg-status-warning/10 p-3 rounded-lg border border-status-warning/20 mt-4">
            <strong>Konsekuensi:</strong> {decision.consequences}
          </p>
        </section>

        {!decision.isOptimal && best && (
          <section aria-labelledby="best-heading" className="mb-8 p-6 rounded-xl border border-status-success/30 bg-status-success/5">
            <h2 id="best-heading" className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lightbulb size={20} className="text-status-success" aria-hidden="true" /> Strategi yang lebih melindungi hak
            </h2>
            <p className="font-semibold text-white">{best.title}</p>
            <p className="text-sm text-gray-300 mt-1">{best.description}</p>
            {best.explanation && <p className="text-sm text-gray-200 mt-3">{best.explanation}</p>}
            <p className="text-xs text-gray-400 mt-3">
              Biayanya: {best.consequences}
            </p>
          </section>
        )}

        <ImpactTable
          decision={decision}
          prediction={prediction}
          before={indicatorsBefore}
          after={indicatorsAfter}
          isNewBest={isNewBest}
        />

        <ActionGuide caseData={caseData} />

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button type="button" onClick={onRestart} className="btn-secondary flex items-center justify-center gap-2">
            <RotateCcw size={18} aria-hidden="true" /> Replay Case
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn-primary flex items-center justify-center gap-2">
            Return to Dashboard <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
