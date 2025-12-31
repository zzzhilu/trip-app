
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MissionSectionProps {
  title: React.ReactNode;
  date?: string;
  icon: LucideIcon;
  colorClass: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  isCollapsed?: boolean;
  theme?: 'dark' | 'light';
}

const MissionSection: React.FC<MissionSectionProps> = ({ 
  title, 
  date, 
  icon: Icon, 
  colorClass, 
  children, 
  headerRight,
  isCollapsed = false,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`mb-10 rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-slate-900 border-slate-800 shadow-lg shadow-black/40' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
      <div className={`px-6 py-4 flex justify-between items-center border-b border-white/5 ${colorClass}`}>
        <div className="flex items-center gap-3">
          <Icon className="text-white" size={22} />
          <h2 className="font-extrabold text-white text-lg tracking-wide uppercase">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {date && (
            <span className="text-[10px] font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded border border-white/5 tracking-tighter">
              {date}
            </span>
          )}
          {headerRight}
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default MissionSection;
