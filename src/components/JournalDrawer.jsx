import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, XCircle, CircleHelp, CircleCheck } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { buildJournal, investigationProgress } from '../lib/investigation';
import { categoryById, FINDING_STATUS, RELATION_LABELS } from '../data/evidenceTypes';

const TONE = {
  good: 'bg-green-100 text-green-900',
  warn: 'bg-amber-100 text-amber-900',
  alert: 'bg-red-100 text-red-900',
  neutral: 'bg-ink/10 text-ink',
};

function Section({ id, title, children, empty }) {
  return (
    <section aria-labelledby={id} className="py-4 border-t border-ink/15 first:border-t-0">
      <h3 id={id} className="font-display font-bold text-xl mb-2">{title}</h3>
      {children || <p className="text-sm text-ink/70">{empty}</p>}
    </section>
  );
}

/**
 * Investigation Journal. Everything shown comes from what the player has
 * actually collected; nothing uncollected is revealed here.
 */
export default function JournalDrawer({ caseData, draft, onNoteChange, onClose }) {
  const ref = useRef(null);
  useDialogA11y(ref, { onClose });
  const journal = buildJournal(caseData, draft);
  const progress = investigationProgress(caseData, draft);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="journal-title"
        tabIndex={-1}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="light-interface on-paper w-full max-w-xl h-full overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-paper border-b border-ink/15 px-5 py-3 flex items-center justify-between">
          <h2 id="journal-title" className="font-display font-extrabold text-2xl">Jurnal investigasi</h2>
          <button type="button" onClick={onClose} aria-label="Tutup jurnal" className="p-2 rounded-full hover:bg-ink/10">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pb-8">
          <Section id="j-progress" title={caseData.title}>
            <p className="text-sm">
              Bukti diklasifikasi {progress.classified} dari {progress.evidenceTotal}. Saksi diwawancarai {progress.interviewed} dari{' '}
              {progress.witnessTotal}.
            </p>
          </Section>

          <Section id="j-findings" title="Temuan" empty="Belum ada temuan. Periksa bukti atau wawancarai saksi.">
            {journal.findings.length > 0 && (
              <ul className="space-y-3">
                {journal.findings.map((f) => {
                  const st = FINDING_STATUS[f.status];
                  return (
                    <li key={f.id} className="bg-[#F3EBD9] border border-ink/15 rounded-md p-3">
                      <p className="font-semibold">{f.text}</p>
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${TONE[st.tone]}`}>{st.label}</span>
                      <ul className="mt-2 text-sm space-y-0.5">
                        {f.links.map((l) => (
                          <li key={l.ref + l.type}>
                            <span className="text-ink/70">{l.kind === 'bukti' ? 'Bukti' : 'Kesaksian'}</span> {l.label}{' '}
                            <span className="text-ink/70">{RELATION_LABELS[l.type]} temuan ini</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          <Section id="j-contra" title="Hal yang bertentangan" empty="Belum ada pertentangan di antara yang kamu kumpulkan.">
            {journal.contradictions.length > 0 && (
              <ul className="space-y-2 text-sm">
                {journal.contradictions.map((c) => (
                  <li key={c.finding.id}>
                    <strong>{c.finding.text}</strong> didukung oleh {c.for.map((x) => x.label).join(', ')}, tetapi bertentangan dengan{' '}
                    {c.against.map((x) => x.label).join(', ')}. Bandingkan sumber dan keandalannya; yang bertentangan belum tentu salah.
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="j-open" title="Pertanyaan terbuka">
            <ul className="space-y-2 text-sm">
              {journal.openQuestions.map((q) => (
                <li key={q.id} className="flex gap-2 items-start">
                  {q.resolved ? (
                    <CircleCheck size={18} className="text-green-800 shrink-0 mt-0.5" aria-label="Terjawab" />
                  ) : (
                    <CircleHelp size={18} className="text-amber-800 shrink-0 mt-0.5" aria-label="Belum terjawab" />
                  )}
                  <span>
                    <span className="font-semibold">{q.text}</span>
                    {!q.resolved && <span className="block text-ink/75">{q.unresolvedNote}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="j-testimony" title="Kesaksian" empty="Belum ada saksi yang diwawancarai.">
            {journal.testimonies.length > 0 && (
              <div className="space-y-3">
                {journal.testimonies.map((t) => (
                  <div key={t.witness.id}>
                    <p className="font-semibold">{t.witness.name}</p>
                    <ul className="text-sm space-y-1 mt-1">
                      {t.opening.map((line) => (
                        <li key={line}>&ldquo;{line}&rdquo;</li>
                      ))}
                      {t.answers.map((q) => (
                        <li key={q.id}>
                          <span className="text-ink/70">{q.ask}</span> &ldquo;{q.answer.join(' ')}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-xs text-ink/70">Kesaksian adalah klaim. Gunakan bersama bukti tertulis.</p>
              </div>
            )}
          </Section>

          <Section id="j-evidence" title="Bukti yang sudah diperiksa" empty="Belum ada bukti yang dibuka.">
            {journal.evidence.length > 0 && (
              <ul className="space-y-1 text-sm">
                {journal.evidence.map(({ evidence, classifiedAs, correct }) => (
                  <li key={evidence.id} className="flex gap-2 items-start">
                    {classifiedAs ? (
                      correct ? (
                        <CheckCircle2 size={16} className="text-green-800 shrink-0 mt-0.5" aria-label="Klasifikasi tepat" />
                      ) : (
                        <XCircle size={16} className="text-crimson shrink-0 mt-0.5" aria-label="Klasifikasi kurang tepat" />
                      )
                    ) : (
                      <CircleHelp size={16} className="text-amber-800 shrink-0 mt-0.5" aria-label="Belum diklasifikasi" />
                    )}
                    <span>
                      {evidence.title}
                      <span className="text-ink/70">
                        {classifiedAs ? `: ${categoryById[evidence.category]?.label}` : ': belum diklasifikasi'}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="j-note" title="Kesimpulan sementaramu">
            <label htmlFor="journal-note" className="block text-sm text-ink/75 mb-2">
              Tulis dengan kata-katamu sendiri: apa yang sudah terbukti, dan apa yang masih perlu dicek? Catatan ini tersimpan.
            </label>
            <textarea
              id="journal-note"
              value={draft.note}
              onChange={(e) => onNoteChange(e.target.value)}
              rows={5}
              maxLength={2000}
              className="w-full rounded-md border border-ink/25 bg-[#F8F2E4] p-3 text-ink"
            />
          </Section>
        </div>
      </motion.aside>
    </div>
  );
}
