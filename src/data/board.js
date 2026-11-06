import { Smartphone, Waves, Footprints, School, Home } from 'lucide-react';
import { laws } from './laws';

/**
 * Presentation data for the investigation board (kept out of chapters.js so
 * case content stays separate from layout).
 *
 * Desktop positions are percentages of the board area. They are arranged so
 * the red strings (below) don't cross: 04 — 01 — 05 — 02 — 03.
 */
export const boardPins = {
  'case-04': { number: '04', Icon: School,     tint: ['#5B6B4E', '#2F3A2A'], x: 1,  y: 2,  tilt: -4 },
  'case-01': { number: '01', Icon: Smartphone, tint: ['#4E5D73', '#232B38'], x: 20, y: 47, tilt: 3 },
  'case-05': { number: '05', Icon: Home,       tint: ['#7A5A4A', '#3A2820'], x: 39, y: 4,  tilt: -2 },
  'case-02': { number: '02', Icon: Waves,      tint: ['#4F6B66', '#24332F'], x: 58, y: 45, tilt: 4 },
  'case-03': { number: '03', Icon: Footprints, tint: ['#6E6250', '#332C22'], x: 77, y: 3,  tilt: -3 },
};

/**
 * A provision linked to this many cases or more is too general to say the
 * cases are related (e.g. 28J ayat (1) applies to almost every case), so it
 * does not create a string.
 */
const GENERIC_THRESHOLD = 4;

/**
 * Red strings connect two cases only when they share at least one specific
 * legal provision in the Law Library. Derived from laws.js so the board can
 * never show a relationship the data doesn't support.
 * Returns [{ id, a, b, laws: [{ id, article }] }]
 */
export function computeCaseLinks(lawList = laws) {
  const pairs = new Map();
  for (const law of lawList) {
    const cases = [...new Set(law.relatedCases)].sort();
    if (cases.length < 2 || cases.length >= GENERIC_THRESHOLD) continue;
    for (let i = 0; i < cases.length; i++) {
      for (let j = i + 1; j < cases.length; j++) {
        const key = `${cases[i]}|${cases[j]}`;
        if (!pairs.has(key)) pairs.set(key, { id: key, a: cases[i], b: cases[j], laws: [] });
        pairs.get(key).laws.push({ id: law.id, article: law.article, title: law.title });
      }
    }
  }
  return [...pairs.values()];
}

export const caseLinks = computeCaseLinks();
