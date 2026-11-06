import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FolderOpen, UserPlus, CheckCircle2 } from 'lucide-react';
import EvidenceCard from '../components/EvidenceCard';
import DialogueBox from '../components/DialogueBox';

export default function Investigation({ caseData, onStageComplete }) {
  const [collectedItems, setCollectedItems] = useState(new Set());
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [activeWitness, setActiveWitness] = useState(null);

  const totalItems = caseData.investigation.evidence.length + caseData.investigation.witnesses.length;
  const progressPercent = totalItems > 0 ? Math.round((collectedItems.size / totalItems) * 100) : 100;
  const isComplete = collectedItems.size === totalItems;

  const handleInspectEvidence = (ev) => {
    setActiveEvidence(ev);
    setCollectedItems((prev) => new Set([...prev, ev.id]));
  };

  const handleFinishDialogue = (witId) => {
    setActiveWitness(null);
    setCollectedItems((prev) => new Set([...prev, witId]));
  };

  const itemClass = (isCollected) =>
    `card-dark w-full text-left cursor-pointer flex justify-between items-center gap-3 p-4 transition-colors ${
      isCollected ? 'border-status-success/50 bg-status-success/5' : 'hover:border-brass'
    }`;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Search className="text-brass shrink-0" aria-hidden="true" /> Investigation Phase
          </h2>
          <p className="text-gray-400">Kumpulkan semua fakta dan dengarkan kesaksian sebelum membuat analisis hukum.</p>
        </div>
        <div className="text-right shrink-0" aria-live="polite">
          <div className="text-sm text-gray-400 mb-1">Progress</div>
          <div className="text-2xl font-bold text-brass">{progressPercent}%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Evidence Section */}
        <section aria-labelledby="evidence-heading">
          <h3 id="evidence-heading" className="text-xl font-bold mb-4 flex items-center gap-2">
            <FolderOpen size={20} className="text-gray-400" aria-hidden="true" /> Documents & Evidence
          </h3>
          <ul className="space-y-3">
            {caseData.investigation.evidence.map((ev) => {
              const isCollected = collectedItems.has(ev.id);
              return (
                <li key={ev.id}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleInspectEvidence(ev)}
                    className={itemClass(isCollected)}
                  >
                    <span className="font-medium">{ev.title}</span>
                    {isCollected ? (
                      <CheckCircle2 className="text-status-success shrink-0" size={20} aria-label="Sudah diperiksa" />
                    ) : (
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded shrink-0">Unread</span>
                    )}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Witnesses Section */}
        <section aria-labelledby="witness-heading">
          <h3 id="witness-heading" className="text-xl font-bold mb-4 flex items-center gap-2">
            <UserPlus size={20} className="text-gray-400" aria-hidden="true" /> Persons of Interest
          </h3>
          <ul className="space-y-3">
            {caseData.investigation.witnesses.map((wit) => {
              const isCollected = collectedItems.has(wit.id);
              return (
                <li key={wit.id}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveWitness(wit)}
                    className={itemClass(isCollected)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">{wit.avatar}</span>
                      <span className="font-medium">{wit.name}</span>
                    </span>
                    {isCollected ? (
                      <CheckCircle2 className="text-status-success shrink-0" size={20} aria-label="Sudah diwawancarai" />
                    ) : (
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded shrink-0">Interview</span>
                    )}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-12">
          <button type="button" onClick={onStageComplete} className="btn-primary flex items-center gap-2 text-lg px-8">
            Proceed to Legal Analysis <CheckCircle2 size={20} aria-hidden="true" />
          </button>
        </motion.div>
      )}

      {/* Modals & Overlays — mounted only while open so their state always starts fresh */}
      {activeEvidence && <EvidenceCard evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />}
      {activeWitness && (
        <DialogueBox
          key={activeWitness.id}
          witness={activeWitness}
          onComplete={() => handleFinishDialogue(activeWitness.id)}
          onClose={() => setActiveWitness(null)}
        />
      )}
    </div>
  );
}
