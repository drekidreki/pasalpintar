/**
 * Central scoring for PASALPINTAR.
 * Weights are unchanged from the original game (total 100).
 */
export const SCORING_WEIGHTS = Object.freeze({
  problemIdentification: 15,
  rightsDuties: 20,
  legalBasis: 25,
  solutionQuality: 30,
  impactUnderstanding: 10,
});

const ratio = (correct, incorrect, total) =>
  total > 0 ? Math.max(0, (correct - incorrect) / total) : 0;

function tally(options, selectedIds) {
  const selected = new Set(selectedIds);
  return {
    total: options.filter((o) => o.isCorrect).length,
    correct: options.filter((o) => o.isCorrect && selected.has(o.id)).length,
    incorrect: options.filter((o) => !o.isCorrect && selected.has(o.id)).length,
  };
}

/** Share of the legal-basis weight earned by choosing the right conclusion. */
export const CONCLUSION_POINTS = 5;

/**
 * Is a chosen right/duty backed by evidence? True when the player linked it to
 * at least one fact that (a) the option really rests on and (b) the player
 * correctly marked as established.
 */
export function isLinkSupported(option, linkedFactIds = [], establishedByPlayer = [], facts = []) {
  if (!option.supportedBy?.length) return true; // options without fact data can't be linked
  const realFacts = new Set(facts.filter((f) => f.established).map((f) => f.id));
  const marked = new Set(establishedByPlayer);
  return linkedFactIds.some((id) => option.supportedBy.includes(id) && realFacts.has(id) && marked.has(id));
}

/**
 * Legal analysis stage (weights unchanged: rights & duties 20, legal basis 25).
 *
 * Rights & duties: (credit − wrong picks) / correct options, floored at 0.
 *   A correct pick earns 1 when linked to a supporting established fact, and
 *   0.5 when it is not; evidence-based reasoning beats guessing.
 * Legal basis: (correct − wrong articles) / correct articles × 20, plus 5 for
 *   the right legal conclusion. Cases without conclusions use the full 25 for
 *   articles (original formula).
 */
export function computeLegalScores(
  legalAnalysis,
  { rights = [], duties = [], articles = [], facts = [], links = {}, conclusion = null }
) {
  const factData = legalAnalysis.facts || [];
  let credit = 0;
  let wrong = 0;
  let total = 0;
  for (const [options, picked] of [
    [legalAnalysis.rightsAffected, rights],
    [legalAnalysis.dutiesNeglected, duties],
  ]) {
    const set = new Set(picked);
    for (const o of options) {
      if (o.isCorrect) total++;
      if (!set.has(o.id)) continue;
      if (!o.isCorrect) {
        wrong++;
        continue;
      }
      credit += factData.length === 0 || isLinkSupported(o, links[o.id], facts, factData) ? 1 : 0.5;
    }
  }

  const a = tally(legalAnalysis.legalArticles, articles);
  const hasConclusions = (legalAnalysis.conclusions || []).length > 0;
  const articleWeight = hasConclusions ? SCORING_WEIGHTS.legalBasis - CONCLUSION_POINTS : SCORING_WEIGHTS.legalBasis;
  const conclusionOk = hasConclusions && legalAnalysis.conclusions.some((c) => c.id === conclusion && c.isCorrect);

  return {
    // Problem identification is graded in the investigation stage
    // (lib/investigation.js → computeProblemIdentScore) and merged in GameEngine.
    rightsDutiesScore: Math.round(ratio(credit, wrong, total) * SCORING_WEIGHTS.rightsDuties),
    legalBasisScore:
      Math.round(ratio(a.correct, a.incorrect, a.total) * articleWeight) + (conclusionOk ? CONCLUSION_POINTS : 0),
  };
}

/**
 * Impact understanding. Uses an explicit `impactUnderstandingScore` from the
 * case data when present; otherwise the optimal decision earns the full 10 and
 * other decisions earn a share proportional to their solution quality.
 * (Previously every non-optimal decision received 5 — including "ignore the
 * problem", which has a solution quality of 0.)
 */
export function computeImpactScore(decision) {
  if (!decision) return 0;
  if (Number.isFinite(decision.impactUnderstandingScore)) return decision.impactUnderstandingScore;
  if (decision.isOptimal) return SCORING_WEIGHTS.impactUnderstanding;
  const quality = Number(decision.solutionQualityScore) || 0;
  return Math.round((quality / SCORING_WEIGHTS.solutionQuality) * SCORING_WEIGHTS.impactUnderstanding);
}

export function computeCaseScore(partialScores, decision) {
  const breakdown = {
    problemIdentification: partialScores?.problemIdentScore ?? SCORING_WEIGHTS.problemIdentification,
    rightsDuties: partialScores?.rightsDutiesScore ?? 0,
    legalBasis: partialScores?.legalBasisScore ?? 0,
    solutionQuality: decision?.solutionQualityScore ?? 0,
    impactUnderstanding: computeImpactScore(decision),
  };
  const total = Object.values(breakdown).reduce((sum, v) => sum + v, 0);
  return { breakdown, total };
}
