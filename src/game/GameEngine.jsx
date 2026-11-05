import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText, AlertCircle } from 'lucide-react';
import { chapters } from '../data/chapters';
import Investigation from './Investigation';
import LegalAnalysis from './LegalAnalysis';
import DecisionRoom from './DecisionRoom';
import Evaluation from './Evaluation';

export default function GameEngine() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [stage, setStage] = useState('briefing'); // 'briefing', 'investigation', 'legal', 'decision', 'evaluation'
  const [partialScores, setPartialScores] = useState({});
  const [chosenDecision, setChosenDecision] = useState(null);
  
  const caseData = chapters.find(c => c.id === caseId);

  if (!caseData) {
    return <div className="p-10 text-center">Case Not Found</div>;
  }

  const handleLegalComplete = (scores) => {
    setPartialScores(scores);
    setStage('decision');
  };

  const handleDecisionComplete = (decision) => {
    setChosenDecision(decision);

    // Persist progress & city indicator updates to LocalStorage
    const saved = localStorage.getItem('pasalpintar_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      const newCompleted = [...new Set([...progress.completedCases, caseId])];
      
      const newIndicators = { ...progress.cityIndicators };
      if (decision.cityImpact) {
        Object.keys(decision.cityImpact).forEach(key => {
          newIndicators[key] = Math.max(0, Math.min(100, (newIndicators[key] || 50) + decision.cityImpact[key]));
        });
      }

      localStorage.setItem('pasalpintar_progress', JSON.stringify({
        ...progress,
        completedCases: newCompleted,
        cityIndicators: newIndicators
      }));
    }

    setStage('evaluation');
  };

  return (
    <div className="min-h-screen bg-navy-primary flex flex-col">
      {/* Top Navigation */}
      <div className="border-b border-white/10 p-4 flex justify-between items-center bg-navy-secondary sticky top-0 z-30">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> Return to Dashboard
        </button>
        <div className="font-bold text-accent-blue">{caseData.title}</div>
        <div className="text-sm text-gray-500 uppercase tracking-widest">{stage}</div>
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full flex">
        
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
                <button onClick={() => setStage('investigation')} className="btn-primary flex items-center gap-2">
                  <FileText size={18} /> Acknowledge & Begin Investigation
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
            partialScores={partialScores}
            decision={chosenDecision}
            onRestart={() => setStage('briefing')}
          />
        )}

      </main>
    </div>
  );
}