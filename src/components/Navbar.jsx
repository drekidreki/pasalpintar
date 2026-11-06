import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Award, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutGrid, label: 'Papan kasus' },
    { path: '/law-library', icon: BookOpen, label: 'Law Library' },
    { path: '/achievements', icon: Award, label: 'Achievements' },
    { path: '/report', icon: User, label: 'Profile' },
  ];

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed bottom-0 w-full z-50 border-t border-black/40 md:relative md:border-t-0 md:border-b md:flex md:justify-between md:items-center px-4 md:px-8 py-2 md:py-3"
      style={{
        background: 'linear-gradient(180deg, #3B2817, #2A1C10)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06), 0 6px 18px rgba(0,0,0,.45)',
      }}
    >
      <Link to="/" className="hidden md:flex items-center gap-2 font-display font-extrabold text-2xl tracking-wide">
        <span className="pin !static !translate-x-0 shrink-0" aria-hidden="true" />
        PASALPINTAR
      </Link>
      <div className="flex justify-around md:justify-end md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-md transition-colors ${
                isActive ? 'text-brass bg-black/25' : 'text-[#D9CDB4] hover:text-white hover:bg-black/15'
              }`}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="text-xs md:text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
