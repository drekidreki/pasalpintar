import { lazy } from 'react';

const RELOAD_KEY = 'pasalpintar_chunk_reload';

/**
 * React.lazy with one recovery step for stale deployments.
 * After a new deploy, an open tab may ask for a JS file that no longer exists.
 * We then reload the page once (to fetch the new index.html). A session flag
 * prevents reload loops; if loading still fails, the error reaches the
 * error boundary instead. Player progress lives in LocalStorage and is not touched.
 */
export function lazyPage(load) {
  return lazy(async () => {
    try {
      const mod = await load();
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        // storage unavailable: nothing to clear
      }
      return mod;
    } catch (error) {
      let already = true;
      try {
        already = sessionStorage.getItem(RELOAD_KEY) === '1';
        if (!already) sessionStorage.setItem(RELOAD_KEY, '1');
      } catch {
        // without storage we cannot guard against loops, so do not reload
      }
      if (!already) {
        window.location.reload();
        return new Promise(() => {}); // wait for the reload
      }
      throw error;
    }
  });
}
