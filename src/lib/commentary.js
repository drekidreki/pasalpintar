import { characters } from '../data/characters';
import { perspectives, RELEVANCE_LABELS } from '../data/perspectives';

export function getCharacter(characterId) {
  return characters.find((c) => c.id === characterId) || null;
}

function caseEntry(characterId, caseId) {
  return perspectives[characterId]?.cases?.[caseId] || null;
}

function generic(characterId) {
  return perspectives[characterId]?.generic || null;
}

/** 'utama' | 'pendukung' | 'luar' (defaults to 'luar' when unspecified). */
export function getRelevance(characterId, caseId) {
  return caseEntry(characterId, caseId)?.relevance || 'luar';
}

export function relevanceLabel(relevance) {
  return RELEVANCE_LABELS[relevance] || RELEVANCE_LABELS.luar;
}

/** Cases where this character's perspective is 'utama'. */
export function primaryCasesFor(characterId) {
  const cases = perspectives[characterId]?.cases || {};
  return Object.entries(cases)
    .filter(([, v]) => v.relevance === 'utama')
    .map(([id]) => id);
}

/**
 * Commentary line for an event, or null when the character has nothing
 * meaningful to add (the panel then keeps its previous line).
 *
 * events: 'briefing' | 'investigationStart' | 'evidence' | 'witnessBefore' | 'witnessAfter' |
 *         'investigationComplete' | 'legal' | 'legalResult' | 'decision'
 */
export function getCommentary(characterId, caseId, event, payload = {}) {
  const c = caseEntry(characterId, caseId);
  const g = generic(characterId);
  if (!g) return null;

  switch (event) {
    case 'briefing':
      if (c?.intro) return c.intro;
      return getRelevance(characterId, caseId) === 'luar' ? g.outsideIntro : null;
    case 'investigationStart':
      return g.investigationStart;
    case 'evidence':
      return c?.evidence?.[payload.evidenceId] || g.evidence;
    case 'witnessBefore':
      return c?.witness?.[payload.witnessId]?.before || g.witnessBefore;
    case 'witnessAfter':
      return c?.witness?.[payload.witnessId]?.after || g.witnessAfter;
    case 'investigationComplete':
      return g.investigationComplete;
    case 'legal':
      return c?.legal || g.legal;
    case 'legalResult':
      return g.legalResult?.[payload.outcome] || null;
    case 'decision':
      return c?.decision || g.decision;
    default:
      return null;
  }
}

/**
 * Classify a submitted legal analysis without revealing anything new:
 * the per-option explanations are already shown after submission.
 */
export function legalOutcome(legalAnalysis, { rights, duties, articles }) {
  const groups = [
    [legalAnalysis.rightsAffected, rights],
    [legalAnalysis.dutiesNeglected, duties],
    [legalAnalysis.legalArticles, articles],
  ];
  let wrong = 0;
  let missed = 0;
  for (const [options, picked] of groups) {
    const set = new Set(picked);
    for (const o of options) {
      if (!o.isCorrect && set.has(o.id)) wrong++;
      if (o.isCorrect && !set.has(o.id)) missed++;
    }
  }
  if (wrong > 0) return 'wrong';
  if (missed > 0) return 'missed';
  return 'perfect';
}
