/**
 * Achievements.
 *
 * Every badge is earned by something the player actually did in a case, not
 * by time spent. A badge is checked in two ways:
 * - `fromProgress(progress, ctx)`: can be derived from saved progress (so
 *   players who finished cases before this feature still get it);
 * - `fromResult(result, ctx)`: checked on the playthrough that was just
 *   finished (so a badge earned in a non-best attempt still counts).
 * Once unlocked, a badge is stored in progress.achievements and never removed.
 *
 * ids b1–b3 are the original badges and keep their ids and thresholds.
 */
import { SCORING_WEIGHTS } from './scoring';

const W = SCORING_WEIGHTS;
const bests = (progress) =>
  Object.values(progress.caseResults || {})
    .map((r) => r?.best)
    .filter((b) => b && Number.isFinite(b.score));
const anyBest = (progress, test) => bests(progress).some(test);
const full = (key) => (bd) => bd?.[key] === W[key];

/** Decision ids that are the most rights-protective strategy of their case. */
export function optimalDecisionIds(chapters) {
  const out = {};
  for (const c of chapters) {
    const d = (c.decisions || []).find((x) => x.isOptimal);
    if (d) out[c.id] = d.id;
  }
  return out;
}

export const ACHIEVEMENTS = [
  {
    id: 'b1',
    title: 'First Response',
    desc: 'Selesaikan kasus pertamamu.',
    fromProgress: (p) => p.completedCases.length >= 1,
  },
  {
    id: 'b2',
    title: 'Legal Investigator',
    desc: 'Selesaikan 3 kasus penanganan hak warga.',
    fromProgress: (p) => p.completedCases.length >= 3,
  },
  {
    id: 'b3',
    title: 'Civic Guardian',
    desc: 'Selesaikan seluruh 5 kasus di Kota PasalPintar.',
    fromProgress: (p, ctx) => p.completedCases.length >= ctx.totalCases,
  },
  {
    id: 'sharp-eye',
    title: 'Mata Penyidik',
    desc: 'Klasifikasikan semua bukti utama satu kasus dengan tepat (Problem Identification 15/15).',
    fromProgress: (p) => anyBest(p, (b) => full('problemIdentification')(b.breakdown)),
    fromResult: (r) => full('problemIdentification')(r.breakdown),
  },
  {
    id: 'evidence-reasoning',
    title: 'Nalar Berbasis Bukti',
    desc: 'Pilih semua hak dan kewajiban yang tepat dan tautkan masing-masing ke fakta pendukungnya (20/20).',
    fromProgress: (p) => anyBest(p, (b) => full('rightsDuties')(b.breakdown)),
    fromResult: (r) => full('rightsDuties')(r.breakdown),
  },
  {
    id: 'solid-basis',
    title: 'Dasar Hukum Kokoh',
    desc: 'Pilih semua pasal yang tepat tanpa pasal keliru, dan kesimpulan yang benar (25/25).',
    fromProgress: (p) => anyBest(p, (b) => full('legalBasis')(b.breakdown)),
    fromResult: (r) => full('legalBasis')(r.breakdown),
  },
  {
    id: 'impact-reader',
    title: 'Pembaca Dampak',
    desc: 'Tebak dengan tepat arah keempat indikator kota sebelum memutuskan (10/10).',
    fromProgress: (p) => anyBest(p, (b) => full('impactUnderstanding')(b.breakdown)),
    fromResult: (r) => full('impactUnderstanding')(r.breakdown),
  },
  {
    id: 'rights-protector',
    title: 'Pelindung Hak',
    desc: 'Pilih strategi yang paling melindungi hak warga di 3 kasus berbeda.',
    fromProgress: (p, ctx) =>
      Object.entries(p.caseResults || {}).filter(([caseId, r]) => r?.best?.decisionId === ctx.optimal[caseId]).length >= 3,
  },
  {
    id: 'perfect-file',
    title: 'Berkas Sempurna',
    desc: 'Raih skor 100 dalam satu kasus.',
    fromProgress: (p) => anyBest(p, (b) => b.score >= 100),
    fromResult: (r) => r.score >= 100,
  },
  {
    id: 'learn-from-mistakes',
    title: 'Belajar dari Kesalahan',
    desc: 'Ulangi kasus yang sudah selesai dan perbaiki skor terbaikmu.',
    fromResult: (r) => r.previousBest !== null && r.previousBest !== undefined && r.score > r.previousBest,
  },
  {
    id: 'model-investigator',
    title: 'Penyidik Teladan',
    desc: 'Selesaikan semua kasus dengan rata-rata skor terbaik minimal 80.',
    fromProgress: (p, ctx) => {
      const scores = bests(p).map((b) => b.score);
      return scores.length >= ctx.totalCases && scores.reduce((a, b) => a + b, 0) / scores.length >= 80;
    },
  },
];

const IDS = new Set(ACHIEVEMENTS.map((a) => a.id));

export function makeContext(chapters) {
  return { totalCases: chapters.length, optimal: optimalDecisionIds(chapters) };
}

/** Ids unlocked by the current progress and (optionally) the playthrough just finished. */
export function evaluateAchievements(progress, ctx, result = null) {
  const out = [];
  for (const a of ACHIEVEMENTS) {
    const byProgress = a.fromProgress ? a.fromProgress(progress, ctx) : false;
    const byResult = result && a.fromResult ? a.fromResult(result, ctx) : false;
    if (byProgress || byResult) out.push(a.id);
  }
  return out;
}

/** Stored badges plus anything the saved progress already earns (for older saves). */
export function unlockedAchievements(progress, ctx) {
  const stored = Object.keys(progress.achievements || {}).filter((id) => IDS.has(id));
  return [...new Set([...stored, ...evaluateAchievements(progress, ctx)])];
}
