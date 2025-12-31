
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface IntelCardProps {
  label: string;
  value: string;
  subValue?: string;
  fieldId: string;
  theme?: 'dark' | 'light';
}

const IntelCard: React.FC<IntelCardProps> = ({ label, value, subValue, fieldId, theme = 'dark' }) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className={`p-4 rounded-xl border relative group transition-all ${
      isDark 
        ? 'bg-slate-800/80 border-slate-700 hover:border-indigo-500/50' 
        : 'bg-slate-50 border-slate-200 hover:border-indigo-400 shadow-sm'
    }`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>{label}</p>
      <p className={`text-lg font-mono font-bold break-all ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
      {subValue && <p className={`text-[11px] mt-2 font-sans italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subValue}</p>}
      
      <button 
        onClick={copyToClipboard}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter shadow-sm
          ${copied 
            ? 'bg-emerald-500 text-white' 
            : (isDark ? 'bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600')}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default IntelCard;
