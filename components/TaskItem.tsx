
import React from 'react';
import { ExternalLink, AlertTriangle, Info, Clock, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  theme?: 'dark' | 'light';
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isCompleted, onToggle, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex gap-4 p-5 rounded-xl border transition-all duration-300 ${
      isCompleted 
        ? (isDark ? 'bg-emerald-500/5 border-emerald-500/10 opacity-60 py-3' : 'bg-emerald-50/50 border-emerald-200 opacity-60 py-3') 
        : (isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100')
    }`}>
      <div className="pt-1">
        <button 
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            isCompleted 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' 
              : (isDark ? 'border-2 border-slate-600 hover:border-indigo-400' : 'border-2 border-slate-300 hover:border-indigo-500 bg-white')
          }`}
        >
          {isCompleted && <CheckCircle2 size={16} />}
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Clock size={14} className={isCompleted ? "text-slate-500" : (isDark ? "text-indigo-400" : "text-indigo-600")} />
            <span className={`font-mono font-bold text-sm tracking-widest ${isCompleted ? "text-slate-500" : (isDark ? "text-indigo-300" : "text-indigo-700")}`}>{task.time}</span>
          </div>
          {!isCompleted && task.link && (
            <a 
              href={task.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-xs px-2 py-1 rounded transition-colors flex items-center gap-1 ${isDark ? 'bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white' : 'bg-indigo-100 hover:bg-indigo-600 text-indigo-700 hover:text-white'}`}
            >
              <ExternalLink size={10} /> 傳送點
            </a>
          )}
        </div>
        
        <p className={`font-bold transition-all ${
          isCompleted 
            ? 'text-slate-400 line-through text-sm' 
            : (isDark ? 'text-slate-100 text-base' : 'text-slate-900 text-base')
        }`}>
          {task.label}
        </p>
        
        {!isCompleted && (
          <div className="mt-2 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
            {task.detail && <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{task.detail}</p>}
            
            {task.note && (
              <div className={`text-xs p-3 rounded-lg border-l-2 ${isDark ? 'bg-black/20 border-indigo-500 text-slate-300' : 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-sm'}`}>
                <div className={`flex items-center gap-2 mb-1 font-bold uppercase tracking-tighter ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                  <Info size={12} /> Briefing Note
                </div>
                {task.note}
              </div>
            )}
            
            {task.warning && (
              <div className={`text-xs p-3 rounded-lg border flex items-start gap-2 ${isDark ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-red-50 border-red-200 text-red-900 shadow-sm'}`}>
                <AlertTriangle size={14} className={`${isDark ? 'text-red-400' : 'text-red-600'} shrink-0 mt-0.5`} />
                <div>
                  <span className="font-bold uppercase tracking-tighter block mb-1">Tactical Warning</span>
                  {task.warning}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
