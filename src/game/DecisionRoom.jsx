import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';

export default function DecisionRoom({ caseData, onDecisionChosen }) {
  const [selectedDecision, setSelectedDecision] = useState(null);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShieldAlert className="text-accent-blue" /> Decision Room
          </h2>
          <p className="text-gray-400">Pilih strategi penanganan yang proporsional, berdasar hukum, dan efektif untuk jangka panjang.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {caseData.decisions.map((dec) => {
          const isSelected = selectedDecision?.id === dec.id;
          return (
            <motion.div
              key={dec.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDecision(dec)}
              className={`card-dark cursor-pointer flex flex-col justify-between border-2 transition-all ${
                isSelected ? 'border-accent-blue bg-navy-secondary/90' : 'border-white/10 hover:border-gray-500'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">{dec.title}</h3>
                <div className="text-xs text-accent-blue mb-4 flex items-center gap-1 font-semibold">
                  <Building2 size={14} /> {dec.stakeholders}
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">{dec.description}</p>
                
                <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="font-bold text-status-success block mb-0.5">Potensi Manfaat:</span>
                    <span className="text-gray-400">{dec.benefits}</span>
                  </div>
                  <div>
                    <span className="font-bold text-status-warning block mb-0.5">Konsekuensi:</span>
                    <span className="text-gray-400">{dec.consequences}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-300 block mb-0.5">Tingkat Kelayakan:</span>
                    <span className="text-gray-400">{dec.feasibility}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-accent-blue bg-accent-blue' : 'border-gray-600'
                }`}>
                  {isSelected && <CheckCircle2 size={16} className="text-white" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onDecisionChosen(selectedDecision)}
          disabled={!selectedDecision}
          className={`btn-primary ${!selectedDecision && 'opacity-50 cursor-not-allowed'}`}
        >
          Confirm Decision & View Evaluation
        </button>
      </div>
    </div>
  );
}