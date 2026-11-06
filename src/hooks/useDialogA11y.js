import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Open dialogs, most recent last. Only the top one reacts to keys.
const stack = [];

/**
 * Keyboard support for modal dialogs:
 * - moves focus into the dialog when it opens (preferring [data-autofocus]),
 * - Escape closes the topmost dialog, even if focus has slipped outside it
 *   (e.g. the focused button was removed when the dialog changed view),
 * - Tab / Shift+Tab stay inside the dialog and pull stray focus back in,
 * - focus returns to the element that opened the dialog when it closes.
 */
export function useDialogA11y(ref, { onClose, active = true } = {}) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!active) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const previouslyFocused = document.activeElement;
    const token = {};
    stack.push(token);

    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE));
    const initial = node.querySelector('[data-autofocus]') || focusables()[0] || node;
    initial.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (stack[stack.length - 1] !== token) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const inside = node.contains(document.activeElement);
      if (!inside) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      const i = stack.indexOf(token);
      if (i !== -1) stack.splice(i, 1);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function' && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, ref]);
}
