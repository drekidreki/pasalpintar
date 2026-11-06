/**
 * Player statistics derived from saved progress (nothing new is stored).
 */
import { SCORING_WEIGHTS } from '../data/scoring';

export const SKILLS = [
  { key: 'problemIdentification', label: 'Mengklasifikasi bukti', tip: 'Baca sumber dan keandalan tiap bukti sebelum menggolongkannya. Klaim saksi perlu dicocokkan dengan bukti lain.' },
  { key: 'rightsDuties', label: 'Menautkan hak & kewajiban ke fakta', tip: 'Untuk setiap hak atau kewajiban yang kamu pilih, tautkan fakta yang membuktikannya. Pilihan tanpa tautan hanya bernilai setengah.' },
  { key: 'legalBasis', label: 'Memilih dasar hukum', tip: 'Buka "Lihat bunyi pasal" dan cocokkan isinya dengan fakta. Pasal yang keliru mengurangi nilai.' },
  { key: 'solutionQuality', label: 'Memilih strategi', tip: 'Bandingkan siapa yang menanggung beban tiap strategi. Strategi terbaik melindungi hak warga, bukan hanya yang paling cepat.' },
  { key: 'impactUnderstanding', label: 'Memprediksi dampak', tip: 'Baca konsekuensi tiap strategi sebelum menebak arah indikator kota.' },
];

/** Rows for every case, in board order. */
export function caseRows(chapters, progress, optimal = {}) {
  const legacy = new Set(progress.legacyCases || []);
  return chapters.map((c) => {
    const r = progress.caseResults?.[c.id];
    const best = r?.best || null;
    const decision = best ? (c.decisions || []).find((d) => d.id === best.decisionId) : null;
    let status = 'belum';
    if (best) status = 'selesai';
    else if (legacy.has(c.id) || progress.completedCases?.includes(c.id)) status = 'versi-lama';
    else if (progress.inProgressCases?.includes(c.id)) status = 'berjalan';
    return {
      id: c.id,
      title: c.title,
      status,
      bestScore: best?.score ?? null,
      attempts: r?.attempts ?? 0,
      decisionTitle: decision?.title ?? null,
      optimalChosen: Boolean(best && optimal[c.id] && best.decisionId === optimal[c.id]),
    };
  });
}

/** Average share (0–100) of each skill's weight across cases with a recorded best result. */
export function skillAverages(progress) {
  const breakdowns = Object.values(progress.caseResults || {})
    .map((r) => r?.best?.breakdown)
    .filter((b) => b && typeof b === 'object');
  if (!breakdowns.length) return null;
  return SKILLS.map((s) => {
    const values = breakdowns.map((b) => Number(b[s.key])).filter(Number.isFinite);
    const pct = values.length
      ? Math.round((values.reduce((a, v) => a + v, 0) / (values.length * SCORING_WEIGHTS[s.key])) * 100)
      : null;
    return { ...s, pct, cases: values.length };
  });
}

/** The weakest skill (lowest share), or null if every skill is at 100% or nothing is recorded. */
export function weakestSkill(averages) {
  if (!averages) return null;
  const scored = averages.filter((s) => s.pct !== null);
  if (!scored.length) return null;
  const min = scored.reduce((a, s) => (s.pct < a.pct ? s : a));
  return min.pct >= 100 ? null : min;
}
