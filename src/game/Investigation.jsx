import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FolderOpen, UserPlus, CheckCircle2, XCircle, NotebookPen, FilePlus2 } from 'lucide-react';
import EvidenceCard from '../components/EvidenceCard';
import DialogueBox from '../components/DialogueBox';
import CommentaryPanel from '../components/CommentaryPanel';
import { getCharacter, getCommentary } from '../lib/commentary';
import { categoryById } from '../data/evidenceTypes';
import {
  visibleEvidence,
  investigationProgress,
  isClassificationCorrect,
  computeProblemIdentScore,
  draftOps,
} from '../lib/investigation';

/**
 * Investigation 2.0
 * - every document is read AND classified (graded, with feedback)
 * - witnesses give an opening statement, then answer chosen questions;
 *   some answers unlock new evidence
 * - progress is saved per case (draft), so a refresh does not lose work
 */
export default function Investigation({ caseData, characterId, draft, onDraftChange, onOpenJournal, onStageComplete }) {
  const [activeEvidenceId, setActiveEvidenceId] = useState(null);
  const [activeWitnessId, setActiveWitnessId] = useState(null);
  const character = getCharacter(characterId);
  const comment = (event, payload) => getCommentary(characterId, caseData.id, event, payload);
  const [note, setNote] = useState(() => comment('investigationStart'));

  const evidence = visibleEvidence(caseData, draft);
  const progress = investigationProgress(caseData, draft);
  const activeEvidence = caseData.investigation.evidence.find((e) => e.id === activeEvidenceId) || null;
  const activeWitness = caseData.investigation.witnesses.find((w) => w.id === activeWitnessId) || null;
  const evidenceTitles = Object.fromEntries(caseData.investigation.evidence.map((e) => [e.id, e.title]));
  const findings = caseData.investigation.findings || [];

  const openEvidence = (ev) => {
    setActiveEvidenceId(ev.id);
    onDraftChange(draftOps.open(draft, ev.id));
    const line = comment('evidence', { evidenceId: ev.id });
    if (line) setNote(line);
  };

  const evidenceStatus = (ev) => {
    const cat = draft.classifications[ev.id];
    if (cat) {
      const ok = isClassificationCorrect(ev, cat);
      return (
        <span className="flex items-center gap-1 text-xs shrink-0">
          {ok ? (
            <CheckCircle2 className="text-status-success" size={18} aria-label="Klasifikasi tepat" />
          ) : (
            <XCircle className="text-status-danger" size={18} aria-label="Klasifikasi kurang tepat" />
          )}
          <span className="text-gray-300">{categoryById[ev.category]?.label}</span>
        </span>
      );
    }
    if (draft.opened.includes(ev.id)) {
      return <span className="text-xs bg-status-warning/20 text-status-warning px-2 py-1 rounded shrink-0">Perlu diklasifikasi</span>;
    }
    return <span className="text-xs bg-black/30 px-2 py-1 rounded shrink-0">Unread</span>;
  };

  const witnessStatus = (w) => {
    const asked = (draft.asked[w.id] || []).length;
    const total = w.questions?.length || 0;
    if (!draft.interviewed.includes(w.id)) return <span className="text-xs bg-black/30 px-2 py-1 rounded shrink-0">Interview</span>;
    return (
      <span className="flex items-center gap-1 text-xs text-gray-300 shrink-0">
        <CheckCircle2 className="text-status-success" size={18} aria-label="Sudah diwawancarai" />
        {total > 0 && `${asked}/${total} pertanyaan`}
      </span>
    );
  };

  const itemClass = (done) =>
    `card-dark w-full text-left cursor-pointer flex justify-between items-center gap-3 p-4 transition-colors ${
      done ? 'border-status-success/50 bg-status-success/5' : 'hover:border-brass'
    }`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6 border-b border-white/10 pb-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Search className="text-brass shrink-0" aria-hidden="true" /> Investigation Phase
          </h2>
          <p className="text-gray-300">
            Baca setiap bukti, periksa sumber dan keandalannya, lalu klasifikasikan. Wawancarai saksi dan pilih pertanyaanmu
            sendiri.
          </p>
        </div>
        <div className="flex items-end gap-4">
          <button type="button" onClick={onOpenJournal} className="btn-secondary py-2 px-4 gap-2">
            <NotebookPen size={18} aria-hidden="true" /> Jurnal
          </button>
          <div className="text-right" aria-live="polite">
            <div className="text-sm text-gray-400 mb-1">Progress</div>
            <div className="text-2xl font-bold text-brass">{progress.percent}%</div>
          </div>
        </div>
      </div>

      <CommentaryPanel characterId={characterId} text={note} className="mb-8" />

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <section aria-labelledby="evidence-heading">
          <h3 id="evidence-heading" className="text-xl font-bold mb-1 flex items-center gap-2">
            <FolderOpen size={20} className="text-gray-400" aria-hidden="true" /> Documents & Evidence
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Diklasifikasi {progress.classified} dari {progress.evidenceTotal}
          </p>
          <ul className="space-y-3">
            {evidence.map((ev) => (
              <li key={ev.id}>
                <motion.button
                  type="button"
                  initial={ev.unlockedBy ? { opacity: 0, y: -6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => openEvidence(ev)}
                  className={itemClass(Boolean(draft.classifications[ev.id]))}
                >
                  <span className="min-w-0">
                    <span className="font-medium block">{ev.title}</span>
                    {ev.unlockedBy && (
                      <span className="flex items-center gap-1 text-xs text-brass-light mt-0.5">
                        <FilePlus2 size={12} aria-hidden="true" /> Didapat dari kesaksian
                      </span>
                    )}
                  </span>
                  {evidenceStatus(ev)}
                </motion.button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="witness-heading">
          <h3 id="witness-heading" className="text-xl font-bold mb-1 flex items-center gap-2">
            <UserPlus size={20} className="text-gray-400" aria-hidden="true" /> Persons of Interest
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Diwawancarai {progress.interviewed} dari {progress.witnessTotal}
          </p>
          <ul className="space-y-3">
            {caseData.investigation.witnesses.map((wit) => (
              <li key={wit.id}>
                <button type="button" onClick={() => setActiveWitnessId(wit.id)} className={itemClass(draft.interviewed.includes(wit.id))}>
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl" aria-hidden="true">{wit.avatar}</span>
                    <span className="font-medium">{wit.name}</span>
                  </span>
                  {witnessStatus(wit)}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {progress.complete ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 mt-10">
          {character && (
            <p className="font-hand text-lg text-paper text-center max-w-xl">
              {character.name}: &ldquo;{comment('investigationComplete')}&rdquo;
            </p>
          )}
          <button
            type="button"
            onClick={() => onStageComplete({ problemIdentScore: computeProblemIdentScore(caseData, draft) })}
            className="btn-primary flex items-center gap-2 text-lg px-8"
          >
            Proceed to Legal Analysis <CheckCircle2 size={20} aria-hidden="true" />
          </button>
        </motion.div>
      ) : (
        <p className="text-center text-sm text-gray-400 mt-10">
          Untuk lanjut ke analisis hukum: klasifikasikan semua bukti dan wawancarai semua saksi.
        </p>
      )}

      {activeEvidence && (
        <EvidenceCard
          key={activeEvidence.id}
          evidence={activeEvidence}
          findings={findings}
          classification={draft.classifications[activeEvidence.id]}
          onClassify={(cat) => onDraftChange(draftOps.classify(draft, activeEvidence.id, cat))}
          investigator={character}
          perspectiveNote={character ? comment('evidence', { evidenceId: activeEvidence.id }) : null}
          onClose={() => setActiveEvidenceId(null)}
        />
      )}
      {activeWitness && (
        <DialogueBox
          key={activeWitness.id}
          witness={activeWitness}
          investigator={character}
          intent={character ? comment('witnessBefore', { witnessId: activeWitness.id }) : null}
          alreadyInterviewed={draft.interviewed.includes(activeWitness.id)}
          askedIds={draft.asked[activeWitness.id] || []}
          evidenceTitles={evidenceTitles}
          onHeardOpening={() => {
            if (!draft.interviewed.includes(activeWitness.id)) {
              onDraftChange(draftOps.interview(draft, activeWitness.id));
              const line = comment('witnessAfter', { witnessId: activeWitness.id });
              if (line) setNote(line);
            }
          }}
          onAsk={(qId) => onDraftChange(draftOps.ask(draft, activeWitness.id, qId))}
          onClose={() => setActiveWitnessId(null)}
        />
      )}
    </div>
  );
}
