
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Terminal,
  Activity,
  Layers,
  ExternalLink,
  Info,
  Loader2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { MISSIONS, INTEL_RECORDS } from './constants';
import MissionSection from './components/MissionSection';
import TaskItem from './components/TaskItem';
import IntelCard from './components/IntelCard';
import { generateMissionVisual } from './services/geminiService';

const App: React.FC = () => {
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

  const [heroImage, setHeroImage] = useState<string | null>(localStorage.getItem('geto-hero-image'));
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isVjwCollapsed, setIsVjwCollapsed] = useState(false);

  useEffect(() => {
    const checkAndGenerateHero = async () => {
      if (!heroImage) {
        setIsGeneratingImage(true);
        const img = await generateMissionVisual();
        if (img) {
          localStorage.setItem('geto-hero-image', img);
          setHeroImage(img);
        }
        setIsGeneratingImage(false);
      }
    };
    checkAndGenerateHero();
  }, [heroImage]);

  useEffect(() => {
    localStorage.setItem('geto-mission-tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = useMemo(() => {
    const allTaskIds = MISSIONS.flatMap(m => m.tasks.map(t => t.id));
    const completedCount = allTaskIds.filter(id => completedTasks[id]).length;
    return Math.round((completedCount / allTaskIds.length) * 100);
  }, [completedTasks]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Expanded Hero Section */}
      <div className="relative w-full h-[550px] md:h-[650px] bg-slate-900 overflow-hidden flex items-center justify-center">
        {heroImage ? (
          <img 
            src={heroImage} 
            alt="夏油豪雪 Hero" 
            className="w-full h-full object-cover brightness-[0.55] contrast-[1.15] animate-in fade-in duration-1000"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">正在偵察夏油豪雪地形...</span>
          </div>
        )}
        {/* Gradients for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pb-12 md:px-8 -mt-64 md:-mt-80">
        {/* Header Section overlaid on image */}
        <header className="mb-12 space-y-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <ShieldCheck size={40} className="text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.6)]" />
            <div className="h-px w-12 bg-white/10" />
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-300 drop-shadow-sm">Classified Logistics</h2>
            <div className="h-px w-12 bg-white/10" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            GETO KOGEN <span className="text-indigo-500">2026</span>
          </h1>
          
          <p className="text-slate-200 font-medium italic text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">"夏油豪雪：在粉雪中執行物流作戰"</p>

          <div className="mt-8 flex justify-center">
            {/* Mission Progress Indicator - Overlaying the image area */}
            <div className="bg-slate-900/80 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 flex flex-col items-center w-full max-w-md shadow-2xl ring-1 ring-white/5">
              <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
                <span>Operational Readiness</span>
                <span className="text-indigo-400 font-mono">{progress}% READY</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Tactical Intel (VJW) */}
        <MissionSection 
          title={
            <span className="flex items-center gap-2">
              <a 
                href="https://services.digital.go.jp/zh-cmn-hant/visit-japan-web/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-indigo-400 hover:text-indigo-200 transition-colors inline-flex items-center gap-1"
              >
                VJW <ExternalLink size={14} className="opacity-70" />
              </a>
              <span>入境情報支援</span>
            </span>
          } 
          icon={Terminal} 
          colorClass="bg-indigo-600/90 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.5)]"
          isCollapsed={isVjwCollapsed}
          headerRight={
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">
                {isVjwCollapsed ? "展開" : "收合"}
              </span>
              <input 
                type="checkbox" 
                checked={isVjwCollapsed} 
                onChange={(e) => setIsVjwCollapsed(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black/30 checked:bg-indigo-400 focus:ring-0 transition-all cursor-pointer"
              />
            </label>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTEL_RECORDS.map((intel) => (
              <IntelCard key={intel.fieldId} {...intel} />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 text-center italic mt-4 flex items-center justify-center gap-2">
            <Info size={12} className="text-indigo-400" /> Click identifiers to copy for Visit Japan Web registration.
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
              colorClass="bg-slate-900/90 backdrop-blur-md"
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
          <div className="flex justify-center gap-6 text-slate-700">
            <Terminal size={18} />
            <Activity size={18} />
            <ShieldCheck size={18} />
          </div>
          <div className="text-slate-600 text-[10px] uppercase font-mono tracking-[0.3em]">
            © 2026 Geto Kogen Expedition Force | Mission Controller v4.2.0
            <br />
            Auth Level: Alpha-Priority-Logistics
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
