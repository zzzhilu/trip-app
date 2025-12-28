
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MissionSectionProps {
  title: string;
  date?: string;
  icon: LucideIcon;
  colorClass: string;
  children: React.ReactNode;
}

const MissionSection: React.FC<MissionSectionProps> = ({ title, date, icon: Icon, colorClass, children }) => {
  return (
    <div className="mb-10 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg shadow-black/40">
      <div className={`px-6 py-4 flex justify-between items-center border-b border-white/5 ${colorClass}`}>
        <div className="flex items-center gap-3">
          <Icon className="text-white" size={22} />
          <h2 className="font-extrabold text-white text-lg tracking-wide uppercase">{title}</h2>
        </div>
        {date && <span className="text-xs font-mono text-white/60 bg-black/30 px-2 py-1 rounded">{date}</span>}
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default MissionSection;
