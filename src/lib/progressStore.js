/**
 * Central, versioned store for PASALPINTAR player progress.
 *
 * - Uses the SAME LocalStorage key as v1 ('pasalpintar_progress') so existing
 *   saves are found and migrated in place.
 * - Never silently erases data: the original raw value is copied to a backup
 *   key before a migration or when a corrupted value is replaced.
 * - Survives unavailable/blocked LocalStorage by falling back to memory.
 *
 * Schema v2:
 * {
 *   version: 2,
 *   characterId: string | null,
 *   completedCases: string[],            // kept from v1 (achievements depend on it)
 *   cityIndicators: { socialStability, legalIntegrity, regionalDevelopment, publicTrust },
 *   indicatorBaseline: { ...same keys },  // starting point before per-case impacts
 *   legacyCases: string[],               // cases completed under v1 (impact already in baseline)
 *   inProgressCases: string[],           // briefing acknowledged, not finished yet (added in Stage B)
 *   caseResults: {
 *     [caseId]: { attempts, lastScore, lastDecisionId, lastPlayedAt,
 *                 best: { score, breakdown, decisionId, cityImpact, achievedAt } }
 *   }
 * }
 *
 * City indicators are always recomputed as: baseline + sum of the cityImpact of
 * each case's BEST result (clamped 0–100). Replaying a case therefore never
 * stacks impacts; the best attempt counts.
 */

export const STORAGE_KEY = 'pasalpintar_progress';
export const BACKUP_KEY_V1 = 'pasalpintar_progress_backup_v1';
export const BACKUP_KEY_CORRUPT = 'pasalpintar_progress_backup_corrupt';
export const SCHEMA_VERSION = 2;

export const INDICATOR_KEYS = ['socialStability', 'legalIntegrity', 'regionalDevelopment', 'publicTrust'];
export const DEFAULT_INDICATORS = Object.freeze({
  socialStability: 50,
  legalIntegrity: 50,
  regionalDevelopment: 50,
  publicTrust: 50,
});

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

export function createDefaultProgress() {
  return {
    version: SCHEMA_VERSION,
    characterId: null,
    completedCases: [],
    cityIndicators: { ...DEFAULT_INDICATORS },
    indicatorBaseline: { ...DEFAULT_INDICATORS },
    legacyCases: [],
    inProgressCases: [],
    caseResults: {},
  };
}

function sanitizeIndicators(value, fallback = DEFAULT_INDICATORS) {
  const out = {};
  for (const key of INDICATOR_KEYS) {
    const n = Number(value?.[key]);
    out[key] = Number.isFinite(n) ? clamp(n) : fallback[key];
  }
  return out;
}

function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((v) => typeof v === 'string' && v.length > 0))];
}

function sanitizeImpact(value) {
  const out = {};
  for (const key of INDICATOR_KEYS) {
    const n = Number(value?.[key]);
    out[key] = Number.isFinite(n) ? n : 0;
  }
  return out;
}

function sanitizeCaseResults(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out = {};
  for (const [caseId, r] of Object.entries(value)) {
    if (!r || typeof r !== 'object') continue;
    const best = r.best && typeof r.best === 'object' && Number.isFinite(Number(r.best.score))
      ? {
          ...r.best,
          score: Number(r.best.score),
          cityImpact: sanitizeImpact(r.best.cityImpact),
        }
      : null;
    out[caseId] = {
      ...r,
      attempts: Number.isFinite(Number(r.attempts)) ? Number(r.attempts) : best ? 1 : 0,
      lastScore: Number.isFinite(Number(r.lastScore)) ? Number(r.lastScore) : best?.score ?? null,
      best,
    };
  }
  return out;
}

/** Recompute city indicators from the baseline + best result of each case. */
export function computeIndicators(progress) {
  const totals = { ...progress.indicatorBaseline };
  const legacy = new Set(progress.legacyCases);
  for (const [caseId, result] of Object.entries(progress.caseResults)) {
    // A legacy (v1) completion's impact is already baked into the baseline.
    if (legacy.has(caseId) || !result.best) continue;
    for (const key of INDICATOR_KEYS) totals[key] += result.best.cityImpact[key] || 0;
  }
  return sanitizeIndicators(totals);
}

/**
 * Turn whatever is in storage into a valid v2 object.
 * Returns { progress, backup: { key, raw } | null, changed }.
 */
export function migrate(raw) {
  if (raw === null || raw === undefined || raw === '') {
    return { progress: createDefaultProgress(), backup: null, changed: false };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { progress: createDefaultProgress(), backup: { key: BACKUP_KEY_CORRUPT, raw }, changed: true };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { progress: createDefaultProgress(), backup: { key: BACKUP_KEY_CORRUPT, raw }, changed: true };
  }

  const isV1 = parsed.version === undefined;
  const characterId = typeof parsed.characterId === 'string' ? parsed.characterId : null;
  const completedCases = sanitizeStringArray(parsed.completedCases);
  const cityIndicators = sanitizeIndicators(parsed.cityIndicators);

  if (isV1) {
    // v1 stored the already-accumulated indicators. Keep them exactly as the
    // player left them by treating them as the new baseline.
    const progress = {
      ...parsed, // keep any unknown fields the player may have
      version: SCHEMA_VERSION,
      characterId,
      completedCases,
      cityIndicators,
      indicatorBaseline: { ...cityIndicators },
      legacyCases: [...completedCases],
      inProgressCases: [],
      caseResults: {},
    };
    return { progress, backup: { key: BACKUP_KEY_V1, raw }, changed: true };
  }

  const progress = {
    ...parsed,
    version: Math.max(SCHEMA_VERSION, Number(parsed.version) || SCHEMA_VERSION),
    characterId,
    completedCases,
    indicatorBaseline: sanitizeIndicators(parsed.indicatorBaseline, DEFAULT_INDICATORS),
    legacyCases: sanitizeStringArray(parsed.legacyCases),
    inProgressCases: sanitizeStringArray(parsed.inProgressCases),
    caseResults: sanitizeCaseResults(parsed.caseResults),
  };
  progress.cityIndicators = computeIndicators(progress);
  const changed = JSON.stringify(progress) !== JSON.stringify(parsed);
  return { progress, backup: null, changed };
}

// ---------------------------------------------------------------------------
// Storage access (never throws)
// ---------------------------------------------------------------------------
function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Observable store (consumed with useSyncExternalStore)
// ---------------------------------------------------------------------------
let state = null;
const listeners = new Set();

function load() {
  const raw = storageGet(STORAGE_KEY);
  const { progress, backup, changed } = migrate(raw);
  if (backup && storageGet(backup.key) === null) storageSet(backup.key, backup.raw);
  if (changed) storageSet(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

function emit() {
  listeners.forEach((l) => l());
}

export function getProgress() {
  if (state === null) state = load();
  return state;
}

export function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function update(updater) {
  const next = updater(getProgress());
  state = next;
  storageSet(STORAGE_KEY, JSON.stringify(next));
  emit();
  return next;
}

export function selectCharacter(characterId) {
  update((prev) => ({ ...prev, characterId }));
}

/** Mark a case as being investigated (briefing acknowledged, not finished). */
export function markCaseStarted(caseId) {
  const current = getProgress();
  if (current.inProgressCases.includes(caseId)) return;
  update((prev) => ({ ...prev, inProgressCases: [...prev.inProgressCases, caseId] }));
}

/**
 * Record one finished playthrough of a case.
 * result: { score, breakdown, decisionId, cityImpact }
 * Returns { isNewBest, previousBest, attempts, indicatorsBefore, indicatorsAfter }.
 */
export function recordCaseResult(caseId, result) {
  const before = getProgress();
  const prevResult = before.caseResults[caseId];
  const previousBest = prevResult?.best?.score ?? null;
  const now = new Date().toISOString();
  const entry = {
    score: result.score,
    breakdown: result.breakdown,
    decisionId: result.decisionId,
    cityImpact: sanitizeImpact(result.cityImpact),
    achievedAt: now,
  };
  // Ties go to the latest attempt.
  const isNewBest = previousBest === null || result.score >= previousBest;

  const next = update((prev) => {
    const caseResults = {
      ...prev.caseResults,
      [caseId]: {
        attempts: (prevResult?.attempts || 0) + 1,
        lastScore: result.score,
        lastDecisionId: result.decisionId,
        lastPlayedAt: now,
        best: isNewBest ? entry : prevResult.best,
      },
    };
    const draft = {
      ...prev,
      completedCases: [...new Set([...prev.completedCases, caseId])],
      inProgressCases: prev.inProgressCases.filter((id) => id !== caseId),
      caseResults,
    };
    draft.cityIndicators = computeIndicators(draft);
    return draft;
  });

  return {
    isNewBest,
    previousBest,
    bestScore: next.caseResults[caseId].best.score,
    attempts: next.caseResults[caseId].attempts,
    indicatorsBefore: before.cityIndicators,
    indicatorsAfter: next.cityIndicators,
  };
}

/** Test helper: forget the in-memory cache so the next read reloads storage. */
export function __resetForTests() {
  state = null;
}
