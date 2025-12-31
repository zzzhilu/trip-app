
import React, { useState } from 'react';
import { X, AlertTriangle, Smartphone, Users, Banknote, Target, Clock, MapPin, Copy, Check, ExternalLink, ShieldAlert, ConciergeBell, CalendarClock, Zap, Info } from 'lucide-react';

export type BackupPlanType = 'arrival' | 'evacuation';

interface BackupPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: BackupPlanType;
}

const BackupPlanModal: React.FC<BackupPlanModalProps> = ({ isOpen, onClose, type }) => {
  const [copied, setCopied] = useState(false);
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
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-red-500/50 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden animate-in fade-in zoom-in duration-300">
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
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-black uppercase tracking-widest">決策紅線 Decision Red Line</div>
              <div className="flex items-center gap-1 text-red-400 font-mono font-bold text-xl">
                <Clock size={20} /> {isArrival ? "06:55 AM" : "09:15 AM"}
              </div>
            </div>
            <p className="text-red-200 text-sm font-bold leading-relaxed mb-3">
              {isArrival 
                ? "若 06:55 巴士未抵達站牌、行李艙滿載或無法全員上車，立即啟動叫車。" 
                : "若 09:15 巴士未抵達雪場入口、山路封閉或接駁艙凍結，立即請求飯店協助。"}
            </p>
            {/* Risk Box for Evacuation */}
            {!isArrival && (
              <div className="mt-2 grid grid-cols-1 gap-1 text-[10px] text-red-400/80 italic">
                <p>● 連鎖反應：錯過 10:14 新幹線 → 錯過 17:08 機場線 → 延誤 19:40 航班</p>
                <p>● 滯留代價：6 人份住宿與改票成本極高，務必準時撤離</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Action Steps */}
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-sm mb-4">
                {isArrival ? <Smartphone size={18} /> : <ConciergeBell size={18} />}
                {isArrival ? "第一步：App 叫車與車資預估" : "第一步：飯店櫃檯介入 (Front Desk Liaison)"}
              </h3>
              
              {isArrival ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">推薦 App (GO / Uber)</p>
                    <p className="text-sm text-slate-300">
                      優先使用 <span className="text-white font-bold">GO App</span> 定位：<span className="text-white">北上駅東口</span>。
                    </p>
                  </div>
                  <a href="https://japantravel.navitime.com/zh-tw/area/jp/route/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] text-emerald-400 font-bold uppercase">NAVITIME 車資查詢</p>
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-white" />
                    </div>
                    <p className="text-sm text-slate-300 font-bold mt-1">即時路況與跳錶預估</p>
                  </a>
                </div>
              ) : (
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    深山叫車極難，請立即請 <span className="text-white font-bold underline decoration-indigo-500">飯店櫃檯</span> 代為聯繫車行。
                    強調任務：<span className="text-indigo-300">「Must catch the 10:14 Shinkansen.」</span>
                    飯店叫車有最高優先權且能即時回報山道積雪狀況。
                  </p>
                </div>
              )}
            </div>

            {/* Final Red Line for IT255 (Evacuation Only) */}
            {!isArrival && (
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="flex items-center gap-2 text-red-500 font-black uppercase tracking-widest text-sm mb-4">
                  <Zap size={18} className="animate-pulse" /> 趕上 IT255 的「最後紅線」
                </h3>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    若因交通延誤未能搭上預計的 14:00 接駁車，請務必守住以下新幹線班次：
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                    <div className="flex items-center gap-2 text-white font-bold mb-1 italic uppercase tracking-tighter">
                      <Clock size={14} className="text-red-500" /> 【最後呼喚】Yamabiko 70 號
                    </div>
                    <p className="text-lg font-mono font-bold text-red-400">16:14 北上發車 → 17:05 抵達仙台</p>
                    <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
                      <span className="text-[10px] bg-red-950/50 text-red-300 px-2 py-1 rounded whitespace-nowrap">接續 17:08 (快速)</span>
                      <span className="text-[10px] bg-red-950/50 text-red-300 px-2 py-1 rounded whitespace-nowrap">或 17:28 (普通) 機場線</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed italic border-t border-red-500/10 pt-3">
                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                    <p>代價：抵達機場約 18:00，距離 19:40 起飛僅剩 100 分鐘。6 人重裝托運將面臨極大壓力，此為「自殺式」時程，非萬不得已不可使用。</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pre-booking Strategy for Evacuation */}
            {!isArrival && (
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="flex items-center gap-2 text-amber-400 font-black uppercase tracking-widest text-sm mb-4">
                  <CalendarClock size={18} /> 前瞻行動：預約策略
                </h3>
                <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20">
                  <p className="text-sm text-amber-200/80 italic">
                    <span className="text-white font-bold">1/12 晚上</span> 請先行請飯店確認隔天早上計程車備援可能性。
                    若天候極差，建議直接預訂 09:00 兩部計程車作為「撤離保險」。
                  </p>
                </div>
              </div>
            )}

            {/* Destination Address Section */}
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-sm mb-4">
                <MapPin size={18} /> {isArrival ? "終點站地址 (貼上 App)" : "目的地地址 (提供櫃檯)"}
              </h3>
              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between group">
                <div className="flex-1 mr-4 overflow-hidden">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Destination Address</p>
                  <p className="text-sm md:text-base font-mono font-bold text-white truncate">{destAddress}</p>
                </div>
                <button 
                  onClick={copyAddress}
                  className={`shrink-0 p-3 rounded-lg transition-all flex items-center gap-2 font-bold text-xs uppercase ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white'}`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "已複製" : "複製"}
                </button>
              </div>
            </div>

            <div className="bg-indigo-900/20 p-5 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase mb-3"><Banknote size={14} /> 預算預案</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  單車預估 <span className="text-white font-mono font-bold">8,500 - 11,000 JPY</span>。
                  {isArrival ? "確認 App 綁定信用卡。" : "專案管理者需備妥至少 40,000 JPY 來回總備援金。"}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase mb-3"><Target size={14} /> 最終抵達目標</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isArrival 
                    ? "於 07:50 前抵達雪場 Center House。" 
                    : "於 10:00 前抵達北上站，確保搭上 10:14 新幹線。"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 px-6 py-3 border-t border-slate-700">
          <p className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
            Command: {isArrival ? "「Geto Kogen Ski Resort, Onegaishimasu.」" : "「Kitakami Station, Onegaishimasu.」"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackupPlanModal;
