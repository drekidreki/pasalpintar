import { motion } from 'framer-motion';
import { Award, ArrowRight, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SCORING_WEIGHTS } from '../data/scoring';

const ROWS_LEFT = [
  ['problemIdentification', 'Problem Identification'],
  ['rightsDuties', 'Rights & Duties Analysis'],
  ['legalBasis', 'Legal Basis Accuracy'],
];
const ROWS_RIGHT = [
  ['solutionQuality', 'Solution Quality'],
  ['impactUnderstanding', 'Impact Understanding'],
];

function ScoreRows({ rows, breakdown }) {
  return (
    <dl className="space-y-3 bg-navy-primary/50 p-4 rounded-lg">
      {rows.map(([key, label]) => (
        <div key={key} className="flex justify-between gap-4">
          <dt className="text-gray-400">{label}</dt>
          <dd className="font-bold text-white">
            {breakdown[key]} / {SCORING_WEIGHTS[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Evaluation({ caseData, outcome, decision, onRestart }) {
  const navigate = useNavigate();
  if (!outcome) return null;
  const { breakdown, total, isNewBest, previousBest, bestScore, attempts } = outcome;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-dark p-6 md:p-12 mb-8">
        <div className="text-center mb-8 border-b border-white/10 pb-8">
          <div className="inline-flex p-4 bg-accent-blue/10 rounded-full text-accent-blue mb-4">
            <Award size={48} aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Case Evaluation Report</h1>
          <p className="text-gray-400">{caseData.title}</p>
          <div className="text-5xl font-extrabold text-accent-blue mt-6" data-testid="total-score">
            {total} <span className="text-xl font-normal text-gray-400">/ 100 Pts</span>
          </div>
          <p className="mt-4 text-sm text-gray-300 flex items-center justify-center gap-2" role="status">
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
            <span className="text-gray-500">· Percobaan ke-{attempts}</span>
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm">
          <ScoreRows rows={ROWS_LEFT} breakdown={breakdown} />
          <ScoreRows rows={ROWS_RIGHT} breakdown={breakdown} />
        </div>

        {/* Chosen Decision Summary */}
        <div className="mb-8 p-6 bg-navy-primary/80 rounded-xl border border-white/10">
          <h2 className="font-bold text-lg mb-2 text-accent-blue">Decision Outcome: {decision?.title}</h2>
          <p className="text-sm text-gray-300 mb-4">{decision?.benefits}</p>
          <div className="text-xs text-status-warning bg-status-warning/10 p-3 rounded-lg border border-status-warning/20">
            <strong>Impact Note:</strong> {decision?.consequences}
          </div>
        </div>

        {/* Real-World Action Takeaways */}
        <div className="light-interface p-6 rounded-xl mb-8">
          <h2 className="font-bold text-lg mb-4 text-navy-primary flex items-center gap-2">
            <CheckCircle2 className="text-accent-blue" size={20} aria-hidden="true" /> Real-World Action Steps
          </h2>
          <ul className="space-y-2 text-sm text-gray-800 list-disc pl-5">
            {caseData.realWorldAction?.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>

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
