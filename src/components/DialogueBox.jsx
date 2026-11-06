import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronRight, X, Check, FilePlus2 } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';

/**
 * Witness interview.
 * 1. Opening statement (the witness's own words, line by line).
 * 2. Questions chosen by the player. Each question reveals something
 *    different; some unlock a new piece of evidence. Answers are claims,
 *    not verified facts, and are labelled that way.
 * Returning to a witness skips straight to the questions (the opening can be
 * replayed), so earlier answers can be re-read.
 */
export default function DialogueBox({
  witness,
  investigator,
  intent,
  alreadyInterviewed = false,
  askedIds = [],
  evidenceTitles = {},
  onHeardOpening,
  onAsk,
  onClose,
}) {
  const [phase, setPhase] = useState(alreadyInterviewed ? 'questions' : 'opening');
  const [step, setStep] = useState(0);
  const [activeQ, setActiveQ] = useState(null);
  const dialogRef = useRef(null);
  const answerRef = useRef(null);
  const listRef = useRef(null);
  const nextRef = useRef(null);
  const replayed = useRef(false);
  useDialogA11y(dialogRef, { onClose, active: Boolean(witness) });

  useEffect(() => {
    if (activeQ) answerRef.current?.focus({ preventScroll: false });
  }, [activeQ]);

  // Keep focus inside the dialog when its view changes (the focused button disappears).
  useEffect(() => {
    if (phase === 'questions') listRef.current?.querySelector('button')?.focus({ preventScroll: true });
    if (phase === 'opening' && replayed.current) nextRef.current?.focus({ preventScroll: true });
  }, [phase]);

  if (!witness) return null;
  const lines = witness.dialogues;
  const questions = witness.questions || [];
  const isLastLine = step >= lines.length - 1;
  const nameId = `witness-name-${witness.id}`;
  const question = questions.find((q) => q.id === activeQ);

  const handleNext = () => {
    if (!isLastLine) {
      setStep((s) => Math.min(s + 1, lines.length - 1));
      return;
    }
    onHeardOpening?.();
    if (questions.length) setPhase('questions');
    else onClose();
  };

  const ask = (q) => {
    setActiveQ(q.id);
    onAsk?.(q.id);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-3 md:p-8 bg-black/50">
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={nameId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-soot-raised border border-white/20 rounded-xl shadow-2xl p-5 md:p-6"
      >
        <div className="flex gap-4 md:gap-5">
          <div
            className="w-14 h-14 md:w-16 md:h-16 bg-black/30 rounded-full flex items-center justify-center text-3xl border-2 border-brass shrink-0"
            aria-hidden="true"
          >
            {witness.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 id={nameId} className="text-brass font-bold text-base font-sans tracking-normal flex items-center gap-2">
                <MessageSquare size={14} aria-hidden="true" /> {witness.name}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup percakapan"
                className="p-1 -mt-1 -mr-1 text-gray-400 hover:text-white rounded-full"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {phase === 'opening' && (
              <>
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
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">
                    Keterangan awal {step + 1} / {lines.length}
                  </span>
                  <button
                    ref={nextRef}
                    type="button"
                    data-autofocus
                    onClick={handleNext}
                    className="flex items-center gap-1 text-sm font-semibold text-white bg-black/30 hover:bg-black/40 transition-colors px-3 py-2 rounded-md"
                  >
                    {!isLastLine ? 'Next' : questions.length ? 'Ajukan pertanyaan' : 'End Conversation'}
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}

            {phase === 'questions' && (
              <>
                {question ? (
                  <div
                    ref={answerRef}
                    tabIndex={-1}
                    aria-live="polite"
                    className="mb-4 focus:outline-none"
                  >
                    <p className="text-sm text-gray-400">Kamu bertanya: {question.ask}</p>
                    {question.answer.map((line) => (
                      <p key={line} className="text-white text-base md:text-lg leading-relaxed mt-1">
                        &ldquo;{line}&rdquo;
                      </p>
                    ))}
                    <p className="text-xs text-gray-400 mt-2">Klaim saksi. Cocokkan dengan bukti sebelum dijadikan fakta.</p>
                    {question.unlocks && evidenceTitles[question.unlocks] && (
                      <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brass-light">
                        <FilePlus2 size={16} aria-hidden="true" />
                        Bukti baru ditambahkan: {evidenceTitles[question.unlocks]}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 mb-4">Apa yang ingin kamu tanyakan?</p>
                )}

                <ul ref={listRef} className="space-y-2" aria-label="Pertanyaan untuk saksi">
                  {questions.map((q) => {
                    const asked = askedIds.includes(q.id);
                    return (
                      <li key={q.id}>
                        <button
                          type="button"
                          onClick={() => ask(q)}
                          aria-current={activeQ === q.id ? 'true' : undefined}
                          className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-md border transition-colors ${
                            activeQ === q.id
                              ? 'border-brass bg-black/30'
                              : 'border-soot-line hover:border-brass/60'
                          }`}
                        >
                          <span className="flex-1">{q.ask}</span>
                          {asked && (
                            <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0 mt-1">
                              <Check size={14} aria-hidden="true" /> sudah ditanyakan
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      replayed.current = true;
                      setActiveQ(null);
                      setStep(0);
                      setPhase('opening');
                    }}
                    className="text-sm text-gray-300 underline underline-offset-2 hover:text-white"
                  >
                    Dengar lagi keterangan awal
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1 text-sm font-semibold text-white bg-black/30 hover:bg-black/40 px-3 py-2 rounded-md"
                  >
                    End Conversation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
