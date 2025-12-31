
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Terminal,
  Activity,
  Layers,
  ExternalLink,
  Info,
  Loader2,
  AlertTriangle,
  ShieldAlert,
  FileSpreadsheet,
  Sun,
  Moon
} from 'lucide-react';
import { MISSIONS, INTEL_RECORDS } from './constants';
import MissionSection from './components/MissionSection';
import TaskItem from './components/TaskItem';
import IntelCard from './components/IntelCard';
import BackupPlanModal, { BackupPlanType } from './components/BackupPlanModal';
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

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('geto-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [heroImage, setHeroImage] = useState<string | null>(localStorage.getItem('geto-hero-image'));
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isVjwCollapsed, setIsVjwCollapsed] = useState(false);
  
  const [backupModalState, setBackupModalState] = useState<{isOpen: boolean, type: BackupPlanType}>({
    isOpen: false,
    type: 'arrival'
  });

  useEffect(() => {
    localStorage.setItem('geto-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('bg-slate-950');
      document.body.classList.remove('bg-slate-50');
    } else {
      document.body.classList.add('bg-slate-50');
      document.body.classList.remove('bg-slate-950');
    }
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const openBackupModal = (type: BackupPlanType) => {
    setBackupModalState({ isOpen: true, type });
  };

  const progress = useMemo(() => {
    const allTaskIds = MISSIONS.flatMap(m => m.tasks.map(t => t.id));
    const completedCount = allTaskIds.filter(id => completedTasks[id]).length;
    return Math.round((completedCount / allTaskIds.length) * 100);
  }, [completedTasks]);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-indigo-500/30 overflow-x-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-[60] p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 border ${isDark ? 'bg-slate-900 border-slate-700 text-yellow-400 shadow-black/40' : 'bg-white border-slate-200 text-indigo-600 shadow-slate-200'}`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Hero Section */}
      <div className="relative w-full h-[550px] md:h-[650px] bg-slate-900 overflow-hidden flex items-center justify-center">
        {heroImage ? (
          <img 
            src={heroImage} 
            alt="夏油豪雪 Hero" 
            className={`w-full h-full object-cover animate-in fade-in duration-1000 ${isDark ? 'brightness-[0.55] contrast-[1.15]' : 'brightness-[0.8] contrast-[1.1]'}`}
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">正在偵察夏油豪雪地形...</span>
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isDark ? 'from-slate-950' : 'from-slate-50'}`} />
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent to-transparent ${isDark ? 'from-slate-950/40' : 'from-slate-950/20'}`} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pb-12 md:px-8 -mt-64 md:-mt-80">
        {/* Header Section */}
        <header className="mb-12 space-y-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <ShieldCheck size={40} className={`${isDark ? 'text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.6)]' : 'text-indigo-600'}`} />
            <div className={`h-px w-12 ${isDark ? 'bg-white/10' : 'bg-slate-900/10'}`} />
            <h2 className={`font-mono text-xs tracking-[0.3em] uppercase drop-shadow-sm ${isDark ? 'text-indigo-300' : 'text-indigo-600 font-bold'}`}>Classified Logistics</h2>
            <div className={`h-px w-12 ${isDark ? 'bg-white/10' : 'bg-slate-900/10'}`} />
          </div>
          
          <h1 className={`text-4xl md:text-7xl font-black tracking-tighter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            GETO KOGEN <span className="text-indigo-500">2026</span>
          </h1>
          
          <p className={`font-medium italic text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>"夏油豪雪：在粉雪中執行物流作戰"</p>

          <div className="mt-8 flex justify-center">
            <div className={`${isDark ? 'bg-slate-900/80 border-white/10 shadow-2xl ring-white/5' : 'bg-white/90 border-slate-200 shadow-xl ring-slate-200/50'} backdrop-blur-2xl p-6 rounded-2xl border flex flex-col items-center w-full max-w-md ring-1`}>
              <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span>Operational Readiness</span>
                  <a 
                    href="https://docs.google.com/spreadsheets/d/16G_bvNqWk4HugdFl97TRtGUXvbSotFoj64TRC7sI4dI/edit?gid=785284068#gid=785284068"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center transition-colors border-l pl-2 ml-1 ${isDark ? 'text-indigo-400 hover:text-indigo-300 border-white/10' : 'text-indigo-600 hover:text-indigo-500 border-slate-200'}`}
                    title="查看物流資訊來源 (Google Sheet)"
                  >
                    <FileSpreadsheet size={14} />
                  </a>
                </div>
                <span className={`${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-mono`}>{progress}% READY</span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden border ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                <div 
                  className={`h-full transition-all duration-1000 ${isDark ? 'bg-gradient-to-r from-indigo-600 to-emerald-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-indigo-600'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Tactical Intel (VJW) */}
        <MissionSection 
          theme={theme}
          title={
            <span className="flex items-center gap-2">
              <a 
                href="https://services.digital.go.jp/zh-cmn-hant/visit-japan-web/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`underline transition-colors inline-flex items-center gap-1 ${isDark ? 'decoration-indigo-400 hover:text-indigo-200' : 'decoration-indigo-600 hover:text-indigo-800'}`}
              >
                VJW <ExternalLink size={14} className="opacity-70" />
              </a>
              <span>入境情報支援</span>
            </span>
          } 
          icon={Terminal} 
          colorClass={isDark ? "bg-indigo-600/90 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.5)]" : "bg-indigo-600 shadow-lg shadow-indigo-200"}
          isCollapsed={isVjwCollapsed}
          headerRight={
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className={`text-[10px] font-bold transition-colors uppercase tracking-widest ${isDark ? 'text-white/50 group-hover:text-white' : 'text-white/70 group-hover:text-white'}`}>
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
              <IntelCard key={intel.fieldId} {...intel} theme={theme} />
            ))}
          </div>
          <p className={`text-[10px] text-center italic mt-4 flex items-center justify-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <Info size={12} className="text-indigo-400" /> Click identifiers to copy for Visit Japan Web registration.
          </p>
        </MissionSection>

        {/* Missions Timeline */}
        <div className="space-y-4">
          {MISSIONS.map((mission) => (
            <MissionSection 
              key={mission.id} 
              theme={theme}
              title={mission.title} 
              date={mission.date} 
              icon={Layers}
              colorClass={isDark ? "bg-slate-900/90 backdrop-blur-md" : "bg-slate-800 text-white"}
              headerRight={
                mission.id === 'd2' ? (
                  <button 
                    onClick={() => openBackupModal('arrival')}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-md shadow-lg shadow-red-600/20 transition-all active:scale-95"
                    title="備援計畫"
                  >
                    <AlertTriangle size={14} />
                  </button>
                ) : mission.id === 'd6' ? (
                  <button 
                    onClick={() => openBackupModal('evacuation')}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-md shadow-lg shadow-red-600/20 transition-all active:scale-95"
                    title="備援計畫"
                  >
                    <ShieldAlert size={14} />
                  </button>
                ) : undefined
              }
            >
              <div className="space-y-4">
                {mission.tasks.map((task) => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    isCompleted={!!completedTasks[task.id]}
                    onToggle={toggleTask}
                    theme={theme}
                  />
                ))}
              </div>
            </MissionSection>
          ))}
        </div>

        {/* Footer */}
        <footer className={`mt-20 py-12 border-t text-center space-y-4 ${isDark ? 'border-slate-900' : 'border-slate-200'}`}>
          <div className={`flex justify-center gap-6 ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
            <Terminal size={18} />
            <Activity size={18} />
            <ShieldCheck size={18} />
          </div>
          <div className={`text-[10px] uppercase font-mono tracking-[0.3em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2026 Geto Kogen Expedition Force | Mission Controller v4.5.0
            <br />
            Auth Level: Alpha-Priority-Logistics
          </div>
        </footer>
      </div>

      {/* Modals */}
      <BackupPlanModal 
        isOpen={backupModalState.isOpen} 
        type={backupModalState.type}
        theme={theme}
        onClose={() => setBackupModalState(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
};

export default App;
