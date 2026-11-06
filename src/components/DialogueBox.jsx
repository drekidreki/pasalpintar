import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronRight, X } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';

/**
 * Witness conversation. The parent mounts this only while a witness is active
 * (keyed by witness id), so every conversation starts from the first line.
 * Closing early (Esc / X) does not mark the witness as interviewed.
 */
export default function DialogueBox({ witness, investigator, intent, onComplete, onClose }) {
  const [step, setStep] = useState(0);
  const dialogRef = useRef(null);
  useDialogA11y(dialogRef, { onClose, active: Boolean(witness) });

  if (!witness) return null;

  const lines = witness.dialogues;
  const isLast = step >= lines.length - 1;
  const nameId = `witness-name-${witness.id}`;

  const handleNext = () => {
    if (isLast) onComplete();
    else setStep((s) => Math.min(s + 1, lines.length - 1));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-4 md:p-8 bg-black/40">
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={nameId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-soot-raised border border-white/20 rounded-xl shadow-2xl p-5 md:p-6 flex gap-4 md:gap-6"
      >
        <div
          className="w-14 h-14 md:w-20 md:h-20 bg-black/30 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-brass shrink-0"
          aria-hidden="true"
        >
          {witness.avatar}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div id={nameId} className="text-brass font-bold text-sm flex items-center gap-2">
                <MessageSquare size={14} aria-hidden="true" /> {witness.name}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup percakapan"
                className="p-1 -mt-1 -mr-1 text-gray-400 hover:text-white rounded-full"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            {investigator && intent && step === 0 && (
              <p className="text-sm text-gray-300 border-l-2 border-brass/70 pl-3 mb-3">
                <span className="font-semibold text-brass-light">{investigator.name}:</span>{' '}
                <span className="font-hand text-base">{intent}</span>
              </p>
            )}
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                aria-live="polite"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-white text-base md:text-lg leading-relaxed"
              >
                &ldquo;{lines[step]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-400" aria-label={`Baris ${step + 1} dari ${lines.length}`}>
              {step + 1} / {lines.length}
            </span>
            <button
              type="button"
              data-autofocus
              onClick={handleNext}
              className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg"
            >
              {isLast ? 'End Conversation' : 'Next'} <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
