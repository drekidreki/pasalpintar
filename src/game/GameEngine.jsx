import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText, AlertCircle } from 'lucide-react';
import { chapters } from '../data/chapters';
import { computeCaseScore } from '../data/scoring';
import { useGameProgress } from '../hooks/useGameProgress';
import Investigation from './Investigation';
import LegalAnalysis from './LegalAnalysis';
import DecisionRoom from './DecisionRoom';
import Evaluation from './Evaluation';

const STAGE_LABELS = {
  briefing: 'Briefing',
  investigation: 'Investigation',
  legal: 'Legal Analysis',
  decision: 'Decision',
  evaluation: 'Evaluation',
};

export default function GameEngine() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { recordCaseResult } = useGameProgress();
  const [stage, setStage] = useState('briefing'); // 'briefing', 'investigation', 'legal', 'decision', 'evaluation'
  const [partialScores, setPartialScores] = useState({});
  const [chosenDecision, setChosenDecision] = useState(null);
  const [outcome, setOutcome] = useState(null);

  const caseData = chapters.find((c) => c.id === caseId);

  // Each stage starts at the top of the page, and keyboard/screen-reader focus
  // moves to the new stage instead of being lost on <body>.
  const mainRef = useRef(null);
  const isFirstStage = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstStage.current) {
      isFirstStage.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [stage]);

  if (!caseData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 text-center">
        <h1 className="text-2xl font-bold">Kasus tidak ditemukan</h1>
        <p className="text-gray-400">Kasus &ldquo;{caseId}&rdquo; tidak tersedia.</p>
        <Link to="/dashboard" className="btn-primary">Kembali ke Dashboard</Link>
      </main>
    );
  }

  const handleLegalComplete = (scores) => {
    setPartialScores(scores);
    setStage('decision');
  };

  const handleDecisionComplete = (decision) => {
    const { breakdown, total } = computeCaseScore(partialScores, decision);
    const saved = recordCaseResult(caseId, {
      score: total,
      breakdown,
      decisionId: decision.id,
      cityImpact: decision.cityImpact,
    });
    setChosenDecision(decision);
    setOutcome({ breakdown, total, ...saved });
    setStage('evaluation');
  };

  const handleRestart = () => {
    setPartialScores({});
    setChosenDecision(null);
    setOutcome(null);
    setStage('briefing');
  };

  return (
    <div className="min-h-screen bg-navy-primary flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-white/10 px-4 py-3 flex justify-between items-center gap-3 bg-navy-secondary sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          aria-label="Return to Dashboard"
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors shrink-0 p-1"
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span className="hidden sm:inline">Return to Dashboard</span>
        </button>
        <div className="font-bold text-accent-blue truncate min-w-0 text-center">{caseData.title}</div>
        <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest shrink-0" aria-live="polite">
          <span className="sr-only">Tahap saat ini: </span>
          {STAGE_LABELS[stage]}
        </div>
      </header>

      <main
        ref={mainRef}
        tabIndex={-1}
        aria-label={`Tahap ${STAGE_LABELS[stage]}`}
        className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full flex focus:outline-none"
      >
        
        {/* STAGE 1: BRIEFING */}
        {stage === 'briefing' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="light-interface p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-accent-blue" />
              <div className="flex items-center gap-3 text-accent-blue font-bold mb-6 uppercase tracking-wider text-sm">
                <AlertCircle size={18} /> Official Case Briefing
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-8">{caseData.title}</h1>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 mb-1 uppercase">Situation Report</h3>
                    <p className="text-lg leading-relaxed text-gray-800">{caseData.briefing.situation}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 mb-1 uppercase">Primary Objective</h3>
                    <p className="text-lg leading-relaxed text-gray-800 font-medium">{caseData.briefing.objective}</p>
                  </div>
                </div>
                <div className="bg-ui-lightBg p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase">Case Details</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="block text-gray-500">Location</span>
                      <span className="font-bold text-gray-800">{caseData.briefing.location}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Source</span>
                      <span className="font-bold text-gray-800">{caseData.briefing.report}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">Involved Parties</span>
                      <ul className="list-disc pl-4 text-gray-800 font-medium space-y-1">
                        {caseData.briefing.characters.map((char, i) => (
                          <li key={i}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button type="button" onClick={() => setStage('investigation')} className="btn-primary flex items-center gap-2">
                  <FileText size={18} aria-hidden="true" /> Acknowledge & Begin Investigation
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: INVESTIGATION */}
        {stage === 'investigation' && (
          <Investigation 
            caseData={caseData} 
            onStageComplete={() => setStage('legal')} 
          />
        )}

        {/* STAGE 3: LEGAL ANALYSIS */}
        {stage === 'legal' && (
          <LegalAnalysis
            caseData={caseData}
            onStageComplete={handleLegalComplete}
          />
        )}

        {/* STAGE 4: DECISION ROOM */}
        {stage === 'decision' && (
          <DecisionRoom
            caseData={caseData}
            onDecisionChosen={handleDecisionComplete}
          />
        )}

        {/* STAGE 5: CASE EVALUATION */}
        {stage === 'evaluation' && (
          <Evaluation
            caseData={caseData}
            outcome={outcome}
            decision={chosenDecision}
            onRestart={handleRestart}
          />
        )}

      </main>
    </div>
  );
}