import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Building2 } from 'lucide-react';
import CommentaryPanel from '../components/CommentaryPanel';
import { getCommentary } from '../lib/commentary';

export default function DecisionRoom({ caseData, characterId, onDecisionChosen }) {
  const [selectedDecision, setSelectedDecision] = useState(null);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShieldAlert className="text-brass shrink-0" aria-hidden="true" /> Decision Room
          </h2>
          <p className="text-gray-400">Pilih strategi penanganan yang proporsional, berdasar hukum, dan efektif untuk jangka panjang.</p>
        </div>
      </div>

      <CommentaryPanel characterId={characterId} text={getCommentary(characterId, caseData.id, 'decision')} className="mb-8" />

      <div role="radiogroup" aria-label="Pilihan strategi penanganan" className="grid md:grid-cols-3 gap-6 mb-12">
        {caseData.decisions.map((dec) => {
          const isSelected = selectedDecision?.id === dec.id;
          return (
            <motion.button
              type="button"
              role="radio"
              aria-checked={isSelected}
              key={dec.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDecision(dec)}
              className={`card-dark text-left cursor-pointer flex flex-col justify-between border-2 transition-all ${
                isSelected ? 'border-brass bg-soot-raised/90' : 'border-white/10 hover:border-gray-500'
              }`}
            >
              <span className="block">
                <span className="block text-xl font-bold mb-3 text-white">{dec.title}</span>
                <span className="text-xs text-brass mb-4 flex items-center gap-1 font-semibold">
                  <Building2 size={14} aria-hidden="true" /> {dec.stakeholders}
                </span>
                <span className="block text-sm text-gray-300 mb-6 leading-relaxed">{dec.description}</span>

                <span className="block space-y-3 border-t border-white/10 pt-4 text-xs">
                  <span className="block">
                    <span className="font-bold text-status-success block mb-0.5">Potensi Manfaat:</span>
                    <span className="text-gray-400">{dec.benefits}</span>
                  </span>
                  <span className="block">
                    <span className="font-bold text-status-warning block mb-0.5">Konsekuensi:</span>
                    <span className="text-gray-400">{dec.consequences}</span>
                  </span>
                  <span className="block">
                    <span className="font-bold text-gray-300 block mb-0.5">Tingkat Kelayakan:</span>
                    <span className="text-gray-400">{dec.feasibility}</span>
                  </span>
                </span>
              </span>

              <span className="mt-6 pt-4 border-t border-white/10 flex justify-end" aria-hidden="true">
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-brass bg-brass' : 'border-gray-600'
                  }`}
                >
                  {isSelected && <CheckCircle2 size={16} className="text-ink" />}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onDecisionChosen(selectedDecision)}
          disabled={!selectedDecision}
          className={`btn-primary ${!selectedDecision ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Confirm Decision & View Evaluation
        </button>
      </div>
    </div>
  );
}
