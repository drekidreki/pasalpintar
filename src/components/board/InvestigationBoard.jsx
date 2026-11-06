import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CaseCard from './CaseCard';
import { caseStatus } from '../../lib/caseStatus';
import { boardPins, caseLinks } from '../../data/board';

// Free-form board only where photos stay ≥ ~230px wide; below that a grid.
const DESKTOP_QUERY = '(min-width: 1280px)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : true
  );
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** Quadratic "sagging string" between two pins + the point halfway along it. */
function stringPath(a, b) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const sag = 24 + dist * 0.12;
  const cx = (a.x + b.x) / 2;
  const cy = (a.y + b.y) / 2 + sag;
  return {
    d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`,
    mid: { x: (a.x + 2 * cx + b.x) / 4, y: (a.y + 2 * cy + b.y) / 4 },
  };
}

export default function InvestigationBoard({ chapters, progress }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const areaRef = useRef(null);
  const pinRefs = useRef({});
  const [pinPos, setPinPos] = useState({});
  const [landedIds, setLandedIds] = useState(() => new Set());
  const [timedOut, setTimedOut] = useState(false);
  // Strings are drawn once every card has landed on its pin. The timer is a
  // fallback in case an animation-complete event never arrives.
  const ready = landedIds.size === chapters.length || timedOut;
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 1400);
    return () => clearTimeout(t);
  }, []);
  const [activeCase, setActiveCase] = useState(null);

  // For each case: the strings it is part of, with the other case's number.
  const linksByCase = useMemo(() => {
    const map = {};
    for (const link of caseLinks) {
      for (const [self, other] of [[link.a, link.b], [link.b, link.a]]) {
        (map[self] ||= []).push({ ...link, other, otherNumber: boardPins[other]?.number });
      }
    }
    return map;
  }, []);

  const measure = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const base = area.getBoundingClientRect();
    const next = {};
    for (const [id, el] of Object.entries(pinRefs.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[id] = { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top };
    }
    setPinPos(next);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return undefined;
    measure();
    const ro = new ResizeObserver(measure);
    if (areaRef.current) ro.observe(areaRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [isDesktop, measure]);

  const handleLanded = useCallback((id) => {
    setLandedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  // Re-measure once the drop-in animation has finished (pins have moved).
  useLayoutEffect(() => {
    if (ready && isDesktop) measure();
  }, [ready, isDesktop, measure]);

  const cardProps = (chapter, i) => {
    const result = progress.caseResults[chapter.id];
    const linked = (linksByCase[activeCase] || []).some((l) => l.other === chapter.id);
    return {
      chapter,
      pin: boardPins[chapter.id],
      status: caseStatus(chapter, progress),
      bestScore: result?.best?.score,
      links: linksByCase[chapter.id] || [],
      index: i,
      highlighted: activeCase === chapter.id,
      dimmed: activeCase !== null && activeCase !== chapter.id && !linked,
      onActivate: () => setActiveCase(chapter.id),
      onDeactivate: () => setActiveCase((cur) => (cur === chapter.id ? null : cur)),
      onLanded: handleLanded,
    };
  };

  // ------------------------------------------------------------ small screens
  if (!isDesktop) {
    return (
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pt-4" aria-label="Berkas kasus">
        {chapters.map((chapter, i) => {
          const props = cardProps(chapter, i);
          return (
            <li key={chapter.id}>
              <CaseCard {...props} highlighted={false} dimmed={false} showLinkLine={false} />
              {props.links.length > 0 && (
                <p className="font-hand text-sm text-paper mt-3 bg-soot/80 rounded px-3 py-2">
                  {props.links.map((l) => (
                    <span key={l.id} className="block">
                      <span className="inline-block w-4 h-[2px] bg-crimson align-middle mr-2" aria-hidden="true" />
                      No. {l.otherNumber}: {l.laws.map((x) => x.article).join(', ')}
                    </span>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  // ------------------------------------------------------------ desktop board
  const activeLinks = new Set((linksByCase[activeCase] || []).map((l) => l.id));

  return (
    <div ref={areaRef} className="relative h-[790px]">
      <ul aria-label="Berkas kasus">
        {chapters.map((chapter, i) => {
          const pin = boardPins[chapter.id];
          return (
            <li key={chapter.id}>
              <CaseCard
                {...cardProps(chapter, i)}
                ref={(el) => (pinRefs.current[chapter.id] = el)}
                className="absolute w-[20.5%] max-w-[250px]"
                style={{ left: `${pin.x}%`, top: `${pin.y}%`, zIndex: activeCase === chapter.id ? 5 : 1 }}
              />
            </li>
          );
        })}
      </ul>

      {/* Red strings: drawn above the cards, below the pins */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
        <defs>
          <filter id="string-shadow" x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="1.5" floodColor="#000" floodOpacity=".45" />
          </filter>
        </defs>
        {ready &&
          caseLinks.map((link, i) => {
            const a = pinPos[link.a];
            const b = pinPos[link.b];
            if (!a || !b) return null;
            const { d } = stringPath(a, b);
            const on = activeLinks.has(link.id);
            const faded = activeCase !== null && !on;
            return (
              <motion.path
                key={link.id}
                data-link={link.id}
                d={d}
                fill="none"
                stroke="#B3262F"
                strokeLinecap="round"
                filter="url(#string-shadow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, strokeWidth: on ? 3.5 : 2.5, opacity: faded ? 0.35 : 1 }}
                transition={{ pathLength: { delay: 0.15 * i, duration: 0.7, ease: 'easeInOut' }, default: { duration: 0.2 } }}
              />
            );
          })}
      </svg>

      {/* Pin heads on top so each string looks tied around its pin */}
      {ready &&
        chapters.map((chapter) => {
          const p = pinPos[chapter.id];
          if (!p) return null;
          const red = progress.completedCases.includes(chapter.id);
          return (
            <span
              key={chapter.id}
              aria-hidden="true"
              className={`pin pin-head ${red ? 'pin-red' : ''}`}
              style={{ left: p.x, top: p.y }}
            />
          );
        })}

      {/* Tags naming the shared provisions, shown for the case in focus */}
      {ready &&
        caseLinks
          .filter((link) => activeLinks.has(link.id))
          .map((link) => {
            const a = pinPos[link.a];
            const b = pinPos[link.b];
            if (!a || !b) return null;
            const { mid } = stringPath(a, b);
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 max-w-[220px] bg-[#EFE6D2] text-ink font-hand text-[15px] leading-tight px-3 py-2 shadow-pinned rotate-[-2deg] pointer-events-none"
                style={{ left: mid.x, top: mid.y }}
                aria-hidden="true"
              >
                Sama-sama: {link.laws.map((x) => x.article).join('; ')}
              </motion.div>
            );
          })}
    </div>
  );
}
