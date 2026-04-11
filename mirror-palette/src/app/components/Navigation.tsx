import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Grid, Star } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/closet', icon: Grid, label: 'Closet' },
    { path: '/review', icon: Star, label: 'Review' },
  ];

  return (
    <nav className="h-20 bg-white border-t-2 border-pink-200 flex justify-around items-center px-4 rounded-t-3xl shadow-[0_-5px_15px_rgba(255,182,193,0.3)]">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center p-2 rounded-xl transition-all ${
            location.pathname === item.path ? 'scale-110 text-pink-500' : 'text-gray-400'
          }`}
        >
          <item.icon size={28} strokeWidth={location.pathname === item.path ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
