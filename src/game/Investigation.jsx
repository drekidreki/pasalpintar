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
  const progressPercent = Math.round((collectedItems.size / totalItems) * 100);
  const isComplete = collectedItems.size === totalItems;

  const handleInspectEvidence = (ev) => {
    setActiveEvidence(ev);
    setCollectedItems(prev => new Set([...prev, ev.id]));
  };

  const handleTalkWitness = (wit) => {
    setActiveWitness(wit);
  };

  const handleFinishDialogue = (witId) => {
    setActiveWitness(null);
    setCollectedItems(prev => new Set([...prev, witId]));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Search className="text-accent-blue" /> Investigation Phase
          </h2>
          <p className="text-gray-400">Kumpulkan semua fakta dan dengarkan kesaksian sebelum membuat analisis hukum.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">Progress</div>
          <div className="text-2xl font-bold text-accent-blue">{progressPercent}%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Evidence Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FolderOpen size={20} className="text-gray-400" /> Documents & Evidence
          </h3>
          <div className="space-y-3">
            {caseData.investigation.evidence.map(ev => {
              const isCollected = collectedItems.has(ev.id);
              return (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={ev.id}
                  onClick={() => handleInspectEvidence(ev)}
                  className={`card-dark cursor-pointer flex justify-between items-center p-4 transition-colors ${isCollected ? 'border-status-success/50 bg-status-success/5' : 'hover:border-accent-blue'}`}
                >
                  <span className="font-medium">{ev.title}</span>
                  {isCollected ? <CheckCircle2 className="text-status-success" size={20} /> : <span className="text-xs bg-gray-800 px-2 py-1 rounded">Unread</span>}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Witnesses Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <UserPlus size={20} className="text-gray-400" /> Persons of Interest
          </h3>
          <div className="space-y-3">
            {caseData.investigation.witnesses.map(wit => {
              const isCollected = collectedItems.has(wit.id);
              return (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={wit.id}
                  onClick={() => handleTalkWitness(wit)}
                  className={`card-dark cursor-pointer flex justify-between items-center p-4 transition-colors ${isCollected ? 'border-status-success/50 bg-status-success/5' : 'hover:border-accent-blue'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wit.avatar}</span>
                    <span className="font-medium">{wit.name}</span>
                  </div>
                  {isCollected ? <CheckCircle2 className="text-status-success" size={20} /> : <span className="text-xs bg-gray-800 px-2 py-1 rounded">Interview</span>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-12">
          <button onClick={onStageComplete} className="btn-primary flex items-center gap-2 text-lg px-8">
            Proceed to Legal Analysis <CheckCircle2 size={20} />
          </button>
        </motion.div>
      )}

      {/* Modals & Overlays */}
      <EvidenceCard evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
      <DialogueBox witness={activeWitness} onComplete={() => handleFinishDialogue(activeWitness.id)} />
    </div>
  );
}