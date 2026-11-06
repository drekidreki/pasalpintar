import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keyboard support for modal dialogs:
 * - moves focus into the dialog when it opens (preferring [data-autofocus]),
 * - keeps Tab / Shift+Tab inside the dialog,
 * - calls onClose on Escape,
 * - returns focus to the element that opened the dialog when it closes.
 */
export function useDialogA11y(ref, { onClose, active = true } = {}) {
  useEffect(() => {
    if (!active) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const previouslyFocused = document.activeElement;

    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE));
    const initial = node.querySelector('[data-autofocus]') || focusables()[0] || node;
    initial.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => {
      node.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
    // onClose is intentionally read once per open; dialogs pass stable handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ref]);
}
