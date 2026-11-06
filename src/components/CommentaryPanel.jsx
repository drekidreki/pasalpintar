import { AnimatePresence, motion } from 'framer-motion';
import { useGameProgress } from '../hooks/useGameProgress';
import { getCharacter } from '../lib/commentary';
import InvestigatorAvatar from './InvestigatorAvatar';

/**
 * The investigator's running notebook. Sits inline in the page (never covers
 * content), updates when the player acts, and can be hidden; the choice is
 * remembered in progress.preferences.showCommentary.
 */
export default function CommentaryPanel({ characterId, text, className = '' }) {
  const { progress, setShowCommentary } = useGameProgress();
  const character = getCharacter(characterId);
  if (!character || !text) return null;

  const visible = progress.preferences?.showCommentary !== false;

  if (!visible) {
    return (
      <div className={`flex justify-end ${className}`}>
        <button
          type="button"
          onClick={() => setShowCommentary(true)}
          className="text-sm text-gray-300 underline decoration-brass/70 underline-offset-4 hover:text-white"
        >
          Tampilkan catatan {character.name}
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label={`Catatan ${character.name}`}
      className={`relative flex gap-4 items-start bg-[#F1E9D6] text-ink px-4 py-4 sm:px-5 shadow-pinned rotate-[-0.4deg] ${className}`}
      style={{ backgroundImage: 'var(--grain-soft)' }}
    >
      <InvestigatorAvatar character={character} size={52} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display font-bold text-lg leading-tight">
            {character.name}
            <span className="block font-sans font-medium text-sm text-ink/70">{character.roleLabel}</span>
          </p>
          <button
            type="button"
            onClick={() => setShowCommentary(false)}
            className="text-xs font-semibold text-ink/70 underline underline-offset-2 hover:text-ink shrink-0"
          >
            Sembunyikan
          </button>
        </div>
        <div aria-live="polite" className="mt-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="font-hand text-[17px] leading-snug"
            >
              {text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
