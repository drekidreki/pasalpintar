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

/**
 * Legal analysis stage. Same formula as the original LegalAnalysis.jsx:
 * (correct picks − incorrect picks) / correct options, floored at 0.
 */
export function computeLegalScores(legalAnalysis, { rights, duties, articles }) {
  const r = tally(legalAnalysis.rightsAffected, rights);
  const d = tally(legalAnalysis.dutiesNeglected, duties);
  const a = tally(legalAnalysis.legalArticles, articles);

  return {
    // The investigation stage can only be finished after every document and
    // witness has been examined, so problem identification is awarded in full.
    // (A graded investigation is planned for Stage D.)
    problemIdentScore: SCORING_WEIGHTS.problemIdentification,
    rightsDutiesScore: Math.round(
      ratio(r.correct + d.correct, r.incorrect + d.incorrect, r.total + d.total) * SCORING_WEIGHTS.rightsDuties
    ),
    legalBasisScore: Math.round(ratio(a.correct, a.incorrect, a.total) * SCORING_WEIGHTS.legalBasis),
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
