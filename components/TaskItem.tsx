
import React from 'react';
import { ExternalLink, AlertTriangle, Info, Clock, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isCompleted, onToggle }) => {
  return (
    <div className={`flex gap-4 p-5 rounded-xl border transition-all duration-300 ${isCompleted ? 'bg-emerald-500/10 border-emerald-500/20 opacity-70' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}>
      <div className="pt-1">
        <button 
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'border-2 border-slate-600 hover:border-indigo-400'}`}
        >
          {isCompleted && <CheckCircle2 size={16} />}
        </button>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-indigo-400" />
            <span className="font-mono font-bold text-indigo-300 text-sm tracking-widest">{task.time}</span>
          </div>
          {task.link && (
            <a 
              href={task.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <ExternalLink size={10} /> 傳送點
            </a>
          )}
        </div>
        
        <p className={`font-bold text-base ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
          {task.label}
        </p>
        
        {task.detail && <p className="text-sm text-slate-400 mt-2 leading-relaxed">{task.detail}</p>}
        
        {task.note && (
          <div className="mt-3 text-xs bg-black/20 p-3 rounded-lg border-l-2 border-indigo-500 text-slate-300">
            <div className="flex items-center gap-2 mb-1 text-indigo-400 font-bold uppercase tracking-tighter">
              <Info size={12} /> Briefing Note
            </div>
            {task.note}
          </div>
        )}
        
        {task.warning && (
          <div className="mt-3 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/30 text-red-200 flex items-start gap-2">
            <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-tighter block mb-1">Tactical Warning</span>
              {task.warning}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
