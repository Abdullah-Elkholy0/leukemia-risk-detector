import React from 'react';
import { Home, Activity, FileText, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { ScreenName, NavItem } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'welcome', label: 'Home', icon: Home },
  { id: 'liveScan', label: 'Scan', icon: Activity },
  { id: 'analysis', label: 'Analysis', icon: FileText },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'guidance', label: 'Tips', icon: BookOpen },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <div className="bg-white border-t border-slate-200 px-4 pb-6 pt-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
      {NAV_ITEMS.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
              isActive ? 'text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;