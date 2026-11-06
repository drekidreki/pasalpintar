import { useSyncExternalStore } from 'react';
import {
  getProgress,
  subscribe,
  selectCharacter,
  recordCaseResult,
  markCaseStarted,
} from '../lib/progressStore';

/**
 * Shared player progress. Every component reads the same store, so a write in
 * one place (e.g. finishing a case) is immediately visible everywhere and is
 * persisted to LocalStorage under the original 'pasalpintar_progress' key.
 */
export const useGameProgress = () => {
  const progress = useSyncExternalStore(subscribe, getProgress, getProgress);
  return { progress, selectCharacter, recordCaseResult, markCaseStarted };
};
