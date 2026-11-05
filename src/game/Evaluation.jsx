import { motion } from 'framer-motion';
import { Award, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Evaluation({ caseData, partialScores, decision, onRestart }) {
  const navigate = useNavigate();

  const problemIdent = partialScores?.problemIdentScore || 15;
  const rightsDuties = partialScores?.rightsDutiesScore || 0;
  const legalBasis = partialScores?.legalBasisScore || 0;
  const solutionQuality = decision?.solutionQualityScore || 0;
  const impactUnderstanding = decision?.isOptimal ? 10 : 5;

  const totalScore = problemIdent + rightsDuties + legalBasis + solutionQuality + impactUnderstanding;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-dark p-8 md:p-12 mb-8">
        <div className="text-center mb-8 border-b border-white/10 pb-8">
          <div className="inline-flex p-4 bg-accent-blue/10 rounded-full text-accent-blue mb-4">
            <Award size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Case Evaluation Report</h1>
          <p className="text-gray-400">{caseData.title}</p>
          <div className="text-5xl font-extrabold text-accent-blue mt-6">{totalScore} <span className="text-xl font-normal text-gray-400">/ 100 Pts</span></div>
        </div>

        {/* Score Breakdown Table */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm">
          <div className="space-y-3 bg-navy-primary/50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-400">Problem Identification</span>
              <span className="font-bold text-white">{problemIdent} / 15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rights & Duties Analysis</span>
              <span className="font-bold text-white">{rightsDuties} / 20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Legal Basis Accuracy</span>
              <span className="font-bold text-white">{legalBasis} / 25</span>
            </div>
          </div>
          <div className="space-y-3 bg-navy-primary/50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-400">Solution Quality</span>
              <span className="font-bold text-white">{solutionQuality} / 30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Impact Understanding</span>
              <span className="font-bold text-white">{impactUnderstanding} / 10</span>
            </div>
          </div>
        </div>

        {/* Chosen Decision Summary */}
        <div className="mb-8 p-6 bg-navy-primary/80 rounded-xl border border-white/10">
          <h3 className="font-bold text-lg mb-2 text-accent-blue">Decision Outcome: {decision?.title}</h3>
          <p className="text-sm text-gray-300 mb-4">{decision?.benefits}</p>
          <div className="text-xs text-status-warning bg-status-warning/10 p-3 rounded-lg border border-status-warning/20">
            <strong>Impact Note:</strong> {decision?.consequences}
          </div>
        </div>

        {/* Real-World Action Takeaways */}
        <div className="light-interface p-6 rounded-xl mb-8">
          <h3 className="font-bold text-lg mb-4 text-navy-primary flex items-center gap-2">
            <CheckCircle2 className="text-accent-blue" size={20} /> Real-World Action Steps
          </h3>
          <ul className="space-y-2 text-sm text-gray-800 list-disc pl-5">
            {caseData.realWorldAction?.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button onClick={onRestart} className="btn-secondary flex items-center justify-center gap-2">
            <RotateCcw size={18} /> Replay Case
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center justify-center gap-2">
            Return to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}