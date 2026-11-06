/**
 * Display order of the strategies in the Decision Room.
 *
 * The data lists the most rights-protective strategy first, which players
 * quickly learn to exploit. The order is shuffled with a seed taken from the
 * case id, so it is the same on every visit (and in screenshots or class
 * discussions), and the optimal strategy is never shown first.
 * Ids and data are unchanged; only the order on screen differs.
 */
function seedFrom(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function random(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function orderDecisions(decisions, caseId) {
  const list = [...(decisions || [])];
  if (list.length < 2) return list;
  const rand = random(seedFrom(String(caseId)));
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  // Place the optimal strategy at a seeded position other than the first, so
  // its position differs between cases instead of drifting to one slot.
  const i = list.findIndex((d) => d.isOptimal);
  if (i === -1) return list;
  const [optimal] = list.splice(i, 1);
  const slot = 1 + (seedFrom(`${caseId}:slot`) % (list.length));
  list.splice(slot, 0, optimal);
  return list;
}
