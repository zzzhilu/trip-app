
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Plane, 
  Train, 
  Mountain, 
  Info, 
  Terminal,
  Activity,
  Calendar,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { MISSIONS, INTEL_RECORDS, MISSION_START_DATE } from './constants';
import MissionSection from './components/MissionSection';
import TaskItem from './components/TaskItem';
import IntelCard from './components/IntelCard';
import MissionAiAssistant from './components/MissionAiAssistant';

const App: React.FC = () => {
  // Persistence logic
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('geto-mission-tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number}>({days: 0, hours: 0, mins: 0});

  // Save on change
  useEffect(() => {
    localStorage.setItem('geto-mission-tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Countdown logic
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(MISSION_START_DATE).getTime();
      const now = new Date().getTime();
      const diff = start - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, mins });
      }
    };
    
    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = useMemo(() => {
    const allTaskIds = MISSIONS.flatMap(m => m.tasks.map(t => t.id));
    const completedCount = allTaskIds.filter(id => completedTasks[id]).length;
    return Math.round((completedCount / allTaskIds.length) * 100);
  }, [completedTasks]);

  const getIcon = (type?: string) => {
    switch(type) {
      case 'plane': return Plane;
      case 'train': return Train;
      case 'mountain': return Mountain;
      case 'cart': return ShoppingBag;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:px-8">
        {/* Header Section */}
        <header className="mb-12 space-y-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <ShieldCheck size={40} className="text-indigo-500" />
            <div className="h-px w-12 bg-slate-800" />
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-400">Classified Logistics</h2>
            <div className="h-px w-12 bg-slate-800" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            GETO KOGEN <span className="text-indigo-500">2026</span>
          </h1>
          
          <p className="text-slate-400 font-medium italic text-lg">"In powder snow we trust, in logistics we survive."</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Mission Progress Indicator */}
            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
              <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 px-1">
                <span>Operational Readiness</span>
                <span className="text-indigo-400">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-1">
                <span>T-Minus to Infiltration</span>
                <Calendar size={12} className="text-emerald-500" />
              </div>
              <div className="flex gap-4 font-mono">
                <div className="text-center">
                  <span className="text-2xl font-bold text-white leading-none">{timeLeft.days}</span>
                  <p className="text-[10px] text-slate-500 uppercase">Days</p>
                </div>
                <span className="text-2xl text-slate-700">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white leading-none">{timeLeft.hours}</span>
                  <p className="text-[10px] text-slate-500 uppercase">Hrs</p>
                </div>
                <span className="text-2xl text-slate-700">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white leading-none">{timeLeft.mins}</span>
                  <p className="text-[10px] text-slate-500 uppercase">Mins</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tactical Intel (VJW) */}
        <MissionSection 
          title="VJW 入境情報支援" 
          icon={Terminal} 
          colorClass="bg-indigo-600 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.5)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTEL_RECORDS.map((intel) => (
              <IntelCard key={intel.fieldId} {...intel} />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 text-center italic mt-4 flex items-center justify-center gap-2">
            <Info size={12} /> Click identifiers to copy for Visit Japan Web registration.
          </p>
        </MissionSection>

        {/* Missions Timeline */}
        <div className="space-y-4">
          {MISSIONS.map((mission) => (
            <MissionSection 
              key={mission.id} 
              title={mission.title} 
              date={mission.date} 
              icon={Layers}
              colorClass="bg-slate-800"
            >
              <div className="space-y-4">
                {mission.tasks.map((task) => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    isCompleted={!!completedTasks[task.id]}
                    onToggle={toggleTask}
                  />
                ))}
              </div>
            </MissionSection>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 py-12 border-t border-slate-900 text-center space-y-4">
          <div className="flex justify-center gap-6 text-slate-600">
            <Terminal size={18} />
            <Activity size={18} />
            <ShieldCheck size={18} />
          </div>
          <div className="text-slate-500 text-[10px] uppercase font-mono tracking-[0.2em]">
            © 2026 Geto Kogen Expedition Force | Mission Controller v4.0.2
            <br />
            Auth Level: Alpha-Priority-Logistics
          </div>
        </footer>

        {/* AI Mission Assistant */}
        <MissionAiAssistant />
      </div>
    </div>
  );
};

export default App;
