import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Award, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/law-library', icon: BookOpen, label: 'Law Library' },
    { path: '/achievements', icon: Award, label: 'Achievements' },
    { path: '/report', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-navy-secondary border-t border-white/10 md:relative md:border-t-0 md:border-b md:flex md:justify-between md:items-center px-6 py-4 z-50">
      <div className="hidden md:block font-bold text-xl tracking-wider">PASALPINTAR</div>
      <div className="flex justify-around md:justify-end md:gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col md:flex-row items-center gap-2 transition-colors ${isActive ? 'text-accent-blue' : 'text-gray-400 hover:text-white'}`}
            >
              <Icon size={20} />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}