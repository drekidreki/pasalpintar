import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STAMPS } from '../../lib/caseStatus';

/**
 * A case pinned to the board like a printed evidence photo.
 * The tilt rotates around the pin (transform-origin: top centre), so hovering
 * straightens the card without moving the pin the red strings are tied to.
 */
const CaseCard = forwardRef(function CaseCard(
  { chapter, pin, status, bestScore, links = [], showLinkLine = true, highlighted, dimmed, index, onActivate, onDeactivate, onLanded, className = '', style },
  pinRef
) {
  const stamp = STAMPS[status];
  const { Icon } = pin;
  const locked = status === 'locked';
  const connectedTo = links.map((l) => l.otherNumber).join(', ');

  const body = (
    <>
      <span ref={pinRef} className={`pin ${status === 'completed' ? 'pin-red' : ''}`} aria-hidden="true" />
      <span
        className="photo block rounded-[2px]"
        style={{ background: `radial-gradient(circle at 30% 25%, ${pin.tint[0]}, ${pin.tint[1]})` }}
        aria-hidden="true"
      >
        <Icon size={64} strokeWidth={1.25} className="text-[#EFE6D2]/80" />
        <span
          className="stamp right-2 bottom-3"
          style={{ color: stamp.color, transform: 'rotate(-9deg)' }}
        >
          {stamp.text}
        </span>
      </span>

      <span className="flex items-baseline justify-between gap-2 mt-3">
        <span className="font-display font-bold text-2xl leading-none text-ink whitespace-nowrap">No. {pin.number}</span>
        <span className="text-[11px] font-semibold text-ink/70 text-right leading-tight">{chapter.category}</span>
      </span>
      <span className="block font-display font-bold text-lg leading-snug text-ink mt-1">{chapter.title}</span>
      <span className="block text-[13px] leading-snug text-ink/80 mt-1 line-clamp-3">{chapter.description}</span>

      <span className="flex items-end justify-between gap-2 mt-3 pt-2 border-t border-dashed border-ink/25">
        <span className="font-hand text-[15px] leading-tight text-crimson">
          {Number.isFinite(bestScore) ? `Skor terbaik ${bestScore}` : status === 'completed' ? 'Sudah selesai' : ' '}
        </span>
        <span className="text-xs font-semibold text-ink underline decoration-crimson/60 underline-offset-2 shrink-0">
          {stamp.action}
        </span>
      </span>
      {showLinkLine && connectedTo && (
        <span className="block font-hand text-[13px] text-ink/70 mt-1">Benang merah ke No. {connectedTo}</span>
      )}
      <span id={`case-desc-${chapter.id}`} className="sr-only">
        {`Status: ${stamp.text.toLowerCase()}.`}
        {links.map((l) => ` Berbagi ${l.laws.map((x) => x.article).join(', ')} dengan berkas No. ${l.otherNumber}.`).join('')}
      </span>
    </>
  );

  const cardClass = `print relative block w-full text-left transition-[transform,box-shadow,opacity] duration-200 ease-out origin-top ${
    locked ? 'cursor-not-allowed grayscale' : 'hover:shadow-lifted focus-visible:shadow-lifted'
  } ${dimmed ? 'opacity-70' : ''} ${highlighted ? 'shadow-lifted' : ''}`;
  const tiltStyle = { transform: `rotate(${highlighted ? 0 : pin.tilt}deg)` };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: -28, rotate: pin.tilt * 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.08 * index, type: 'spring', stiffness: 260, damping: 22 }}
      onAnimationComplete={() => onLanded?.(chapter.id)}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      {locked ? (
        <div className={cardClass} style={tiltStyle} aria-disabled="true" aria-describedby={`case-desc-${chapter.id}`}>
          {body}
        </div>
      ) : (
        <Link
          to={`/case/${chapter.id}`}
          className={`${cardClass} on-paper active:scale-[0.985]`}
          style={tiltStyle}
          aria-label={`Berkas No. ${pin.number}: ${chapter.title}. ${stamp.action}`}
          aria-describedby={`case-desc-${chapter.id}`}
        >
          {body}
        </Link>
      )}
    </motion.div>
  );
});

export default CaseCard;
