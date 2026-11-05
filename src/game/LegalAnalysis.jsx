import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, HelpCircle } from 'lucide-react';

export default function LegalAnalysis({ caseData, onStageComplete }) {
  const [selectedRights, setSelectedRights] = useState([]);
  const [selectedDuties, setSelectedDuties] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSelect = (id, list, setList) => {
    if (isSubmitted) return;
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  const calculateScore = () => {
    let problemIdentScore = 15; // Complete from investigation
    let rightsDutiesScore = 0;
    let legalBasisScore = 0;

    // Rights & Duties Scoring (Max 20)
    const totalCorrectRights = caseData.legalAnalysis.rightsAffected.filter(r => r.isCorrect).length;
    const selectedCorrectRights = caseData.legalAnalysis.rightsAffected.filter(r => r.isCorrect && selectedRights.includes(r.id)).length;
    const selectedIncorrectRights = caseData.legalAnalysis.rightsAffected.filter(r => !r.isCorrect && selectedRights.includes(r.id)).length;

    const totalCorrectDuties = caseData.legalAnalysis.dutiesNeglected.filter(d => d.isCorrect).length;
    const selectedCorrectDuties = caseData.legalAnalysis.dutiesNeglected.filter(d => d.isCorrect && selectedDuties.includes(d.id)).length;
    const selectedIncorrectDuties = caseData.legalAnalysis.dutiesNeglected.filter(d => !d.isCorrect && selectedDuties.includes(d.id)).length;

    const rightDutyRatio = Math.max(0, (selectedCorrectRights + selectedCorrectDuties - selectedIncorrectRights - selectedIncorrectDuties) / (totalCorrectRights + totalCorrectDuties));
    rightsDutiesScore = Math.round(rightDutyRatio * 20);

    // Legal Articles Scoring (Max 25)
    const totalCorrectArticles = caseData.legalAnalysis.legalArticles.filter(a => a.isCorrect).length;
    const selectedCorrectArticles = caseData.legalAnalysis.legalArticles.filter(a => a.isCorrect && selectedArticles.includes(a.id)).length;
    const selectedIncorrectArticles = caseData.legalAnalysis.legalArticles.filter(a => !a.isCorrect && selectedArticles.includes(a.id)).length;

    const articleRatio = Math.max(0, (selectedCorrectArticles - selectedIncorrectArticles) / totalCorrectArticles);
    legalBasisScore = Math.round(articleRatio * 25);

    return { problemIdentScore, rightsDutiesScore, legalBasisScore };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const canSubmit = selectedRights.length > 0 && selectedDuties.length > 0 && selectedArticles.length > 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Scale className="text-accent-blue" /> Legal Analysis Phase
          </h2>
          <p className="text-gray-400">Hubungkan fakta kasus dengan hak yang terdampak, kewajiban yang diabaikan, dan dasar hukum yang berlaku.</p>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        {/* 1. Affected Rights */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-4 text-accent-blue">1. Hak Warga Negara yang Terdampak</h3>
          <div className="space-y-3">
            {caseData.legalAnalysis.rightsAffected.map((item) => {
              const isSelected = selectedRights.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id, selectedRights, setSelectedRights)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected ? 'border-accent-blue bg-accent-blue/10' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{item.label}</span>
                    <input type="checkbox" checked={isSelected} readOnly className="accent-accent-blue" />
                  </div>
                  {isSubmitted && (
                    <p className={`mt-2 text-xs font-semibold ${item.isCorrect ? 'text-status-success' : 'text-status-danger'}`}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Neglected Duties */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-4 text-accent-blue">2. Kewajiban yang Diabaikan</h3>
          <div className="space-y-3">
            {caseData.legalAnalysis.dutiesNeglected.map((item) => {
              const isSelected = selectedDuties.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id, selectedDuties, setSelectedDuties)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected ? 'border-accent-blue bg-accent-blue/10' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{item.label}</span>
                    <input type="checkbox" checked={isSelected} readOnly className="accent-accent-blue" />
                  </div>
                  {isSubmitted && (
                    <p className={`mt-2 text-xs font-semibold ${item.isCorrect ? 'text-status-success' : 'text-status-danger'}`}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Legal Articles */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-4 text-accent-blue">3. Dasar Hukum yang Relevan</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {caseData.legalAnalysis.legalArticles.map((item) => {
              const isSelected = selectedArticles.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id, selectedArticles, setSelectedArticles)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected ? 'border-accent-blue bg-accent-blue/10' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white text-sm">{item.label}</span>
                    <input type="checkbox" checked={isSelected} readOnly className="accent-accent-blue" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`btn-primary ${!canSubmit && 'opacity-50 cursor-not-allowed'}`}
          >
            Submit Analysis
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onStageComplete(calculateScore())}
            className="btn-primary flex items-center gap-2"
          >
            Proceed to Decision Room <CheckCircle size={18} />
          </motion.button>
        )}
      </div>
    </div>
  );
}