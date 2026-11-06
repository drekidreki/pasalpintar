import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, Check } from 'lucide-react';
import { computeLegalScores } from '../data/scoring';

function OptionButton({ item, isSelected, isSubmitted, onToggle, compact = false, showExplanation = true }) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-disabled={isSubmitted}
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSubmitted ? 'cursor-default' : 'cursor-pointer'
      } ${isSelected ? 'border-accent-blue bg-accent-blue/10' : 'border-gray-700 hover:border-gray-500'}`}
    >
      <span className="flex justify-between items-center gap-3">
        <span className={`font-medium text-white ${compact ? 'text-sm' : ''}`}>{item.label}</span>
        <span
          aria-hidden="true"
          className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center ${
            isSelected ? 'bg-accent-blue border-accent-blue' : 'border-gray-500'
          }`}
        >
          {isSelected && <Check size={14} className="text-white" />}
        </span>
      </span>
      {isSubmitted && showExplanation && item.explanation && (
        <span className={`block mt-2 text-xs font-semibold ${item.isCorrect ? 'text-status-success' : 'text-status-danger'}`}>
          {item.explanation}
        </span>
      )}
    </button>
  );
}

export default function LegalAnalysis({ caseData, onStageComplete }) {
  const [selectedRights, setSelectedRights] = useState([]);
  const [selectedDuties, setSelectedDuties] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSelect = (id, list, setList) => {
    if (isSubmitted) return;
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  };

  const canSubmit = selectedRights.length > 0 && selectedDuties.length > 0 && selectedArticles.length > 0;
  const { rightsAffected, dutiesNeglected, legalArticles } = caseData.legalAnalysis;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Scale className="text-accent-blue shrink-0" aria-hidden="true" /> Legal Analysis Phase
          </h2>
          <p className="text-gray-400">Hubungkan fakta kasus dengan hak yang terdampak, kewajiban yang diabaikan, dan dasar hukum yang berlaku.</p>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        <fieldset className="card-dark">
          <legend className="sr-only">Hak Warga Negara yang Terdampak</legend>
          <h3 className="text-lg font-bold mb-4 text-accent-blue" aria-hidden="true">1. Hak Warga Negara yang Terdampak</h3>
          <div className="space-y-3">
            {rightsAffected.map((item) => (
              <OptionButton
                key={item.id}
                item={item}
                isSelected={selectedRights.includes(item.id)}
                isSubmitted={isSubmitted}
                onToggle={() => toggleSelect(item.id, selectedRights, setSelectedRights)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="card-dark">
          <legend className="sr-only">Kewajiban yang Diabaikan</legend>
          <h3 className="text-lg font-bold mb-4 text-accent-blue" aria-hidden="true">2. Kewajiban yang Diabaikan</h3>
          <div className="space-y-3">
            {dutiesNeglected.map((item) => (
              <OptionButton
                key={item.id}
                item={item}
                isSelected={selectedDuties.includes(item.id)}
                isSubmitted={isSubmitted}
                onToggle={() => toggleSelect(item.id, selectedDuties, setSelectedDuties)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="card-dark">
          <legend className="sr-only">Dasar Hukum yang Relevan</legend>
          <h3 className="text-lg font-bold mb-4 text-accent-blue" aria-hidden="true">3. Dasar Hukum yang Relevan</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {legalArticles.map((item) => (
              <OptionButton
                key={item.id}
                item={item}
                compact
                showExplanation={false}
                isSelected={selectedArticles.includes(item.id)}
                isSubmitted={isSubmitted}
                onToggle={() => toggleSelect(item.id, selectedArticles, setSelectedArticles)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex justify-end gap-4">
        {!isSubmitted ? (
          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            disabled={!canSubmit}
            className={`btn-primary ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit Analysis
          </button>
        ) : (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() =>
              onStageComplete(
                computeLegalScores(caseData.legalAnalysis, {
                  rights: selectedRights,
                  duties: selectedDuties,
                  articles: selectedArticles,
                })
              )
            }
            className="btn-primary flex items-center gap-2"
          >
            Proceed to Decision Room <CheckCircle size={18} aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
