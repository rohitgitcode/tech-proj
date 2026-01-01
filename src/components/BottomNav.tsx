import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, FileWarning, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import SOSButton from './SOSButton';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/map', icon: Map, label: 'Map' },
  { path: '/reports', icon: FileWarning, label: 'Reports' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show nav on certain screens
  const hideOnPaths = ['/', '/onboarding', '/login', '/sos', '/navigation'];
  if (hideOnPaths.some(path => location.pathname.startsWith(path) && location.pathname === path)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-card/95 backdrop-blur-lg border-t border-border" />
      
      {/* Safe area padding */}
      <div className="relative flex items-end justify-around px-4 pb-safe-bottom pt-2">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center py-2 px-4 transition-colors touch-feedback',
                isActive ? 'tab-active' : 'tab-inactive'
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xxs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
        
        {/* Center SOS Button */}
        <div className="relative -mt-6">
          <SOSButton />
        </div>
        
        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center py-2 px-4 transition-colors touch-feedback',
                isActive ? 'tab-active' : 'tab-inactive'
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xxs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Extra padding for safe area */}
      <div className="h-2 bg-card" />
    </nav>
  );
};

export default BottomNav;
