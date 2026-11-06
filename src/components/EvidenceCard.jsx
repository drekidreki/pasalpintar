import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';
import InvestigatorAvatar from './InvestigatorAvatar';
import { EVIDENCE_CATEGORIES, categoryById, RELIABILITY_LABELS, RELATION_LABELS } from '../data/evidenceTypes';
import { isClassificationCorrect } from '../lib/investigation';

/**
 * One evidence document: what it says, where it comes from, how far it can be
 * trusted, and the player's classification. The category is chosen once;
 * feedback then explains the right answer and how the item relates to the
 * case findings.
 */
export default function EvidenceCard({ evidence, findings = [], classification, onClassify, investigator, perspectiveNote, onClose }) {
  const dialogRef = useRef(null);
  const [choice, setChoice] = useState(null);
  const doneRef = useRef(null);
  useDialogA11y(dialogRef, { onClose, active: Boolean(evidence) });
  // After saving, the save button disappears: move focus to the feedback's close button.
  const isClassified = Boolean(classification);
  useEffect(() => {
    if (isClassified) doneRef.current?.focus({ preventScroll: true });
  }, [isClassified]);

  if (!evidence) return null;
  const titleId = `evidence-title-${evidence.id}`;
  const classified = Boolean(classification);
  const correct = classified && isClassificationCorrect(evidence, classification);
  const findingText = (id) => findings.find((f) => f.id === id)?.text;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
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
        className="light-interface w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        <div className="flex justify-between items-center px-5 py-3 border-b border-ink/15 bg-paper">
          <div className="flex items-center gap-2 text-ink font-bold font-display tracking-wide">
            <FileText size={20} className="text-crimson" aria-hidden="true" />
            <span>Investigation Document</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup dokumen" className="p-2 hover:bg-ink/10 rounded-full transition-colors">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          <h2 id={titleId} className="text-2xl font-bold mb-3">{evidence.title}</h2>
          <div className="bg-[#F3EBD9] p-4 rounded-md border border-ink/15 mb-4 text-ink leading-relaxed">
            {evidence.description}
          </div>

          {/* Source card */}
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mb-4">
            <div>
              <dt className="font-semibold text-ink/70">Sumber</dt>
              <dd>{evidence.source}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/70">Waktu & konteks</dt>
              <dd>{evidence.context}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/70">{RELIABILITY_LABELS[evidence.reliability?.level] || 'Keandalan'}</dt>
              <dd>{evidence.reliability?.reason}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/70">Keterbatasan</dt>
              <dd>{evidence.limitations}</dd>
            </div>
          </dl>

          {investigator && perspectiveNote && (
            <div className="flex gap-3 items-start mb-4">
              <InvestigatorAvatar character={investigator} size={40} />
              <p className="text-ink">
                <span className="block text-xs font-semibold text-ink/70">Catatan {investigator.name}</span>
                <span className="font-hand text-[17px] leading-snug">{perspectiveNote}</span>
              </p>
            </div>
          )}

          {/* Classification */}
          {!classified ? (
            <fieldset className="border-t border-ink/15 pt-4">
              <legend className="font-display font-bold text-lg">Klasifikasikan bukti ini</legend>
              <p className="text-sm text-ink/75 mb-3">Pilih satu. Pilihanmu dinilai dan tidak bisa diubah.</p>
              <div className="space-y-2">
                {EVIDENCE_CATEGORIES.map((c) => (
                  <label
                    key={c.id}
                    className={`flex gap-3 items-start p-3 rounded-md border cursor-pointer ${
                      choice === c.id ? 'border-crimson bg-[#F3EBD9]' : 'border-ink/20 hover:border-ink/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`cat-${evidence.id}`}
                      value={c.id}
                      checked={choice === c.id}
                      onChange={() => setChoice(c.id)}
                      className="mt-1 accent-[#A8232D]"
                    />
                    <span>
                      <span className="block font-semibold">{c.label}</span>
                      <span className="block text-sm text-ink/75">{c.purpose}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <section aria-live="polite" className="border-t border-ink/15 pt-4 space-y-3">
              <p className={`flex items-start gap-2 font-semibold ${correct ? 'text-green-800' : 'text-crimson'}`}>
                {correct ? <CheckCircle2 size={20} aria-hidden="true" className="shrink-0 mt-0.5" /> : <XCircle size={20} aria-hidden="true" className="shrink-0 mt-0.5" />}
                <span>
                  {correct
                    ? `Tepat: ${categoryById[classification]?.label}.`
                    : `Kamu memilih ${categoryById[classification]?.label}. Kategori yang tepat: ${categoryById[evidence.category]?.label}.`}
                </span>
              </p>
              <p className="text-sm">{evidence.categoryReason}</p>
              <div className="bg-paper-deep border-l-4 border-crimson p-3 rounded-r-md">
                <h3 className="text-sm font-bold text-crimson mb-1">🔍 Key Takeaway</h3>
                <p className="text-sm text-ink/85">{evidence.clue}</p>
              </div>
              {evidence.relations?.length > 0 ? (
                <ul className="text-sm space-y-1">
                  {evidence.relations.map((r) => (
                    <li key={r.finding + r.type}>
                      Bukti ini <strong>{RELATION_LABELS[r.type]}</strong> temuan: {findingText(r.finding)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink/75">Bukti ini tidak berkaitan dengan temuan mana pun dalam kasus.</p>
              )}
            </section>
          )}
        </div>

        <div className="px-5 py-3 bg-paper border-t border-ink/15 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          {!classified ? (
            <>
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md font-semibold text-ink underline underline-offset-2">
                Klasifikasikan nanti
              </button>
              <button
                type="button"
                disabled={!choice}
                onClick={() => onClassify(choice)}
                className={`btn-primary py-2 ${!choice ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Simpan klasifikasi
              </button>
            </>
          ) : (
            <button ref={doneRef} type="button" data-autofocus onClick={onClose} className="btn-primary py-2 px-6">
              Log Evidence
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
