import { Newspaper, Scale, Backpack, School, UserRound } from 'lucide-react';

const ICONS = { newspaper: Newspaper, scale: Scale, backpack: Backpack, school: School };

/**
 * A small ID-photo style avatar: the character's initial over a tinted print,
 * with an icon for their role. Replaces emoji, which render differently on
 * every device.
 */
export default function InvestigatorAvatar({ character, size = 56, className = '' }) {
  const Icon = (character && ICONS[character.iconKey]) || UserRound;
  const [a, b] = character?.tint || ['#5B5248', '#2A231C'];
  const initial = character?.name?.replace(/^Bu\s+/, '').charAt(0) || '?';
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center shrink-0 rounded-[3px] overflow-hidden shadow-pinned ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 25%, ${a}, ${b})`,
        border: `${Math.max(2, Math.round(size / 18))}px solid #F1E9D6`,
      }}
    >
      <span className="font-display font-extrabold text-[#F1E9D6]" style={{ fontSize: size * 0.5, lineHeight: 1 }}>
        {initial}
      </span>
      <Icon
        size={Math.round(size * 0.32)}
        strokeWidth={1.75}
        className="absolute bottom-[6%] right-[6%] text-brass-light"
      />
    </span>
  );
}
