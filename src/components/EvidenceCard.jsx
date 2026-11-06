import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';

export default function EvidenceCard({ evidence, onClose }) {
  const dialogRef = useRef(null);
  useDialogA11y(dialogRef, { onClose, active: Boolean(evidence) });

  if (!evidence) return null;
  const titleId = `evidence-title-${evidence.id}`;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="light-interface w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex justify-between items-center p-4 border-b border-ink/15 bg-paper">
          <div className="flex items-center gap-2 text-ink font-bold font-display tracking-wide">
            <FileText size={20} className="text-crimson" aria-hidden="true" />
            <span>Investigation Document</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dokumen"
            className="p-2 hover:bg-ink/10 rounded-full transition-colors"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <h2 id={titleId} className="text-2xl font-bold mb-4">{evidence.title}</h2>
          <div className="bg-[#F3EBD9] p-4 rounded-md border border-ink/15 mb-4 text-ink leading-relaxed">
            {evidence.description}
          </div>
          <div className="bg-paper-deep border-l-4 border-crimson p-4 rounded-r-md">
            <h3 className="text-sm font-bold text-crimson mb-1">🔍 Key Takeaway</h3>
            <p className="text-sm text-ink/85">{evidence.clue}</p>
          </div>
        </div>

        <div className="p-4 bg-paper border-t border-ink/15 flex justify-end">
          <button type="button" data-autofocus onClick={onClose} className="btn-primary py-2 px-6">
            Log Evidence
          </button>
        </div>
      </motion.div>
    </div>
  );
}
