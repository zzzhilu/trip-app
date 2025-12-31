
import React, { useState } from 'react';
import { X, AlertTriangle, Smartphone, Users, Banknote, Target, Clock, MapPin, Copy, Check, ExternalLink, ShieldAlert, ConciergeBell, CalendarClock, Zap, Info, BookOpen } from 'lucide-react';

export type BackupPlanType = 'arrival' | 'evacuation';

interface BackupPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: BackupPlanType;
  theme?: 'dark' | 'light';
}

const BackupPlanModal: React.FC<BackupPlanModalProps> = ({ isOpen, onClose, type, theme = 'dark' }) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';
  const isArrival = type === 'arrival';
  
  const destAddress = isArrival 
    ? "岩手県北上市和賀町岩崎新田 (夏油高原スキー場)"
    : "JR北上駅 (東口/西口)";

  if (!isOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(destAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${isDark ? 'bg-slate-950/90' : 'bg-slate-900/40'}`}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl border-2 rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-300 ${
        isDark 
          ? 'bg-slate-900 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]' 
          : 'bg-white border-red-500 shadow-2xl shadow-red-200'
      }`}>
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {isArrival ? <AlertTriangle className="text-white animate-pulse" size={24} /> : <ShieldAlert className="text-white animate-pulse" size={24} />}
            <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
              {isArrival ? "備援計劃：去程雙車突擊" : "備援計劃：回程撤離應變"}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-8 scrollbar-hide">
          {/* Decision Red Line */}
          <div className={`border rounded-xl p-5 ${isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-black uppercase tracking-widest">決策紅線 Decision Red Line</div>
              <div className={`flex items-center gap-1 font-mono font-bold text-xl ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                <Clock size={20} /> {isArrival ? "06:55 AM" : "09:15 AM"}
              </div>
            </div>
            <p className={`text-sm font-bold leading-relaxed mb-3 ${isDark ? 'text-red-200' : 'text-red-900'}`}>
              {isArrival 
                ? "若 06:55 巴士未抵達站牌、行李艙滿載或無法全員上車，立即啟動叫車。" 
                : "若 09:15 巴士未抵達雪場入口、山路封閉或接駁艙凍結，立即請求飯店協助。"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Action Steps */}
            <div className={`border-l-4 pl-4 ${isDark ? 'border-indigo-500' : 'border-indigo-600'}`}>
              <h3 className={`flex items-center gap-2 font-black uppercase tracking-widest text-sm mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                {isArrival ? <Smartphone size={18} /> : <ConciergeBell size={18} />}
                {isArrival ? "第一步：App 叫車與車資預估" : "第一步：飯店櫃檯介入 (Front Desk Liaison)"}
              </h3>
              
              {isArrival ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <p className={`text-[10px] font-bold uppercase mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>推薦 App (GO / Uber)</p>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      優先使用 <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>GO App</span> 定位：<span className={isDark ? 'text-white' : 'text-slate-900'}>北上駅東口</span>。
                    </p>
                  </div>
                  <a href="https://japantravel.navitime.com/zh-tw/area/jp/route/" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-xl border transition-all group ${isDark ? 'bg-slate-800 hover:bg-indigo-900/40 border-indigo-500/30' : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'}`}>
                    <div className="flex justify-between items-start">
                      <p className={`text-[10px] font-bold uppercase ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>NAVITIME 車資查詢</p>
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-indigo-600" />
                    </div>
                    <p className={`text-sm font-bold mt-1 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>即時路況與跳錶預估</p>
                  </a>

                  {/* New Blog Resource Link */}
                  <a href="https://otsukaka.pixnet.net/blog/posts/11406319181" target="_blank" rel="noopener noreferrer" className={`md:col-span-2 p-4 rounded-xl border transition-all group flex items-center justify-between ${isDark ? 'bg-slate-800 hover:bg-indigo-900/40 border-slate-700' : 'bg-slate-50 hover:bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <p className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tactical Intelligence</p>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>夏油高原交通攻略參考資料</p>
                      </div>
                    </div>
                    <ExternalLink size={16} className={`transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  </a>
                </div>
              ) : (
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    深山叫車極難，請立即請 <span className={`font-bold underline decoration-indigo-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>飯店櫃檯</span> 代為聯繫車行。
                    強調任務：<span className={isDark ? 'text-indigo-300' : 'text-indigo-700 font-bold'}>「Must catch the 10:14 Shinkansen.」</span>
                  </p>
                </div>
              )}
            </div>

            {/* Destination Address Section */}
            <div className={`border-l-4 pl-4 ${isDark ? 'border-emerald-500' : 'border-emerald-600'}`}>
              <h3 className={`flex items-center gap-2 font-black uppercase tracking-widest text-sm mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                <MapPin size={18} /> {isArrival ? "終點站地址 (貼上 App)" : "目的地地址 (提供櫃檯)"}
              </h3>
              <div className={`border p-4 rounded-xl flex items-center justify-between group ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <div className="flex-1 mr-4 overflow-hidden">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Destination Address</p>
                  <p className={`text-sm md:text-base font-mono font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{destAddress}</p>
                </div>
                <button 
                  onClick={copyAddress}
                  className={`shrink-0 p-3 rounded-lg transition-all flex items-center gap-2 font-bold text-xs uppercase ${copied ? 'bg-emerald-500 text-white' : (isDark ? 'bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600')}`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "已複製" : "複製"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`px-6 py-3 border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
            Command: {isArrival ? "「Geto Kogen Ski Resort, Onegaishimasu.」" : "「Kitakami Station, Onegaishimasu.」"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackupPlanModal;
