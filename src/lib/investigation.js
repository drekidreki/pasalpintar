/**
 * Pure investigation logic (no React). Works on a per-case "draft":
 * {
 *   opened: string[],                       // evidence ids the player has read
 *   classifications: { [evidenceId]: categoryId },
 *   interviewed: string[],                  // witness ids whose opening statement was heard
 *   asked: { [witnessId]: questionId[] },
 *   note: string                            // player's preliminary conclusion
 * }
 * Item references: evidence 'ev-1'; a witness answer 'wit-1:q2';
 * a witness opening statement 'wit-1:opening'.
 */
import { SCORING_WEIGHTS } from '../data/scoring';

export function createDraft() {
  return { opened: [], classifications: {}, interviewed: [], asked: {}, note: '' };
}

const uniq = (arr) => [...new Set(arr)];

export function askedRefs(draft) {
  return Object.entries(draft.asked || {}).flatMap(([w, qs]) => qs.map((q) => `${w}:${q}`));
}

/** Evidence the player can currently see (unlockable items appear once their question is asked). */
export function visibleEvidence(caseData, draft) {
  const asked = new Set(askedRefs(draft));
  return caseData.investigation.evidence.filter(
    (ev) => !ev.unlockedBy || asked.has(`${ev.unlockedBy.witness}:${ev.unlockedBy.question}`)
  );
}

export function isClassificationCorrect(evidence, categoryId) {
  return categoryId === evidence.category || (evidence.alsoAccepted || []).includes(categoryId);
}

export function investigationProgress(caseData, draft) {
  const visible = visibleEvidence(caseData, draft);
  const classified = visible.filter((ev) => draft.classifications[ev.id]).length;
  const witnesses = caseData.investigation.witnesses;
  const interviewed = witnesses.filter((w) => draft.interviewed.includes(w.id)).length;
  const total = visible.length + witnesses.length;
  const done = classified + interviewed;
  return {
    classified,
    evidenceTotal: visible.length,
    interviewed,
    witnessTotal: witnesses.length,
    percent: total ? Math.round((done / total) * 100) : 100,
    complete: classified === visible.length && interviewed === witnesses.length,
  };
}

/**
 * Problem identification (weight 15): share of the case's base evidence
 * classified correctly. Evidence unlocked through witness questions is
 * classified with feedback but not graded, so asking more questions can
 * never lower the score.
 */
export function computeProblemIdentScore(caseData, draft) {
  const base = caseData.investigation.evidence.filter((ev) => !ev.unlockedBy);
  if (base.length === 0) return SCORING_WEIGHTS.problemIdentification;
  const correct = base.filter((ev) => isClassificationCorrect(ev, draft.classifications[ev.id])).length;
  return Math.round((correct / base.length) * SCORING_WEIGHTS.problemIdentification);
}

export function classificationSummary(caseData, draft) {
  const base = caseData.investigation.evidence.filter((ev) => !ev.unlockedBy);
  const correct = base.filter((ev) => isClassificationCorrect(ev, draft.classifications[ev.id])).length;
  return { correct, total: base.length };
}

/** Everything the player has actually collected, as relation sources. */
function collectedSources(caseData, draft) {
  const sources = [];
  const opened = new Set(draft.opened);
  for (const ev of caseData.investigation.evidence) {
    if (!opened.has(ev.id)) continue;
    sources.push({ ref: ev.id, kind: 'bukti', label: ev.title, reliability: ev.reliability?.level, relations: ev.relations || [] });
  }
  for (const w of caseData.investigation.witnesses) {
    if (draft.interviewed.includes(w.id) && w.openingRelations?.length) {
      sources.push({ ref: `${w.id}:opening`, kind: 'kesaksian', label: `Keterangan awal ${w.name}`, relations: w.openingRelations });
    }
    for (const qId of draft.asked[w.id] || []) {
      const q = w.questions?.find((x) => x.id === qId);
      if (q) sources.push({ ref: `${w.id}:${q.id}`, kind: 'kesaksian', label: `${w.name}: "${q.ask}"`, relations: q.relations || [] });
    }
  }
  return sources;
}

function findingStatus(links) {
  const supports = links.filter((l) => l.type === 'mendukung');
  if (links.some((l) => l.type === 'membantah') && supports.length) return 'dipertentangkan';
  if (supports.some((l) => l.kind === 'bukti' && l.reliability !== 'rendah')) return 'didukung-bukti';
  if (supports.length) return 'baru-kesaksian';
  return 'konteks';
}

/**
 * The Investigation Journal. Built only from what the player has collected:
 * a finding appears once at least one collected item relates to it.
 */
export function buildJournal(caseData, draft) {
  const sources = collectedSources(caseData, draft);
  const refs = new Set([...sources.map((s) => s.ref), ...draft.opened]);

  const findings = (caseData.investigation.findings || [])
    .map((f) => {
      const links = sources.flatMap((s) =>
        s.relations.filter((r) => r.finding === f.id).map((r) => ({ ...s, type: r.type, relations: undefined }))
      );
      return { ...f, links, status: links.length ? findingStatus(links) : null };
    })
    .filter((f) => f.links.length > 0);

  const contradictions = findings
    .filter((f) => f.status === 'dipertentangkan')
    .map((f) => ({
      finding: f,
      against: f.links.filter((l) => l.type === 'membantah'),
      for: f.links.filter((l) => l.type === 'mendukung'),
    }));

  const openQuestions = (caseData.investigation.openQuestions || []).map((q) => ({
    ...q,
    resolved: (q.resolvedBy || []).some((r) => refs.has(r)),
  }));

  const testimonies = caseData.investigation.witnesses
    .filter((w) => draft.interviewed.includes(w.id) || (draft.asked[w.id] || []).length)
    .map((w) => ({
      witness: w,
      opening: draft.interviewed.includes(w.id) ? w.dialogues : [],
      answers: (draft.asked[w.id] || [])
        .map((qId) => w.questions?.find((q) => q.id === qId))
        .filter(Boolean),
    }));

  const evidence = caseData.investigation.evidence
    .filter((ev) => draft.opened.includes(ev.id))
    .map((ev) => ({
      evidence: ev,
      classifiedAs: draft.classifications[ev.id] || null,
      correct: draft.classifications[ev.id] ? isClassificationCorrect(ev, draft.classifications[ev.id]) : null,
    }));

  return { findings, contradictions, openQuestions, testimonies, evidence };
}

// ------------------------------------------------------------ draft updates (pure)
export const draftOps = {
  open: (d, id) => ({ ...d, opened: uniq([...d.opened, id]) }),
  classify: (d, id, cat) => (d.classifications[id] ? d : { ...d, classifications: { ...d.classifications, [id]: cat } }),
  interview: (d, witnessId) => ({ ...d, interviewed: uniq([...d.interviewed, witnessId]) }),
  ask: (d, witnessId, qId) => ({ ...d, asked: { ...d.asked, [witnessId]: uniq([...(d.asked[witnessId] || []), qId]) } }),
  note: (d, text) => ({ ...d, note: String(text).slice(0, 2000) }),
};
