import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronRight } from 'lucide-react';

export default function DialogueBox({ witness, onComplete }) {
  const [step, setStep] = useState(0);

  if (!witness) return null;

  const isLast = step === witness.dialogues.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 md:p-8 z-40 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-navy-secondary border border-white/20 rounded-xl shadow-2xl p-6 pointer-events-auto flex gap-4 md:gap-6"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl border-2 border-accent-blue shrink-0">
          {witness.avatar}
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-accent-blue font-bold text-sm mb-1 flex items-center gap-2">
              <MessageSquare size={14} /> {witness.name}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-white text-lg leading-relaxed"
              >
                "{witness.dialogues[step]}"
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleNext}
              className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {isLast ? 'End Conversation' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}