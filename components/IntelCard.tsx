
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface IntelCardProps {
  label: string;
  value: string;
  subValue?: string;
  fieldId: string;
}

const IntelCard: React.FC<IntelCardProps> = ({ label, value, subValue, fieldId }) => {
  const [copied, setCopied] = useState(false);

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
    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 relative group transition-all hover:border-indigo-500/50">
      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-mono font-bold text-white break-all">{value}</p>
      {subValue && <p className="text-[11px] text-slate-400 mt-2 font-sans italic">{subValue}</p>}
      
      <button 
        onClick={copyToClipboard}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter shadow-sm
          ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white'}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default IntelCard;
