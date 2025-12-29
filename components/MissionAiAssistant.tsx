
import React, { useState } from 'react';
import { Bot, Send, Loader2, Minimize2 } from 'lucide-react';
import { getMissionBriefing } from '../services/geminiService';

const MissionAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await getMissionBriefing(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: response || "Negative. No data received." }]);
    setLoading(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-80 md:w-96' : 'w-14 h-14'}`}>
      {isOpen ? (
        <div className="bg-slate-900 border border-indigo-500 rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden">
          <div className="bg-indigo-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-white" />
              <span className="font-bold text-white text-sm">Mission HQ Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <Minimize2 size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm font-sans scrollbar-hide">
            {messages.length === 0 && (
              <p className="text-slate-400 italic text-center py-8">Ask for tactical advice on packing, weather, or logistics.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-xl flex items-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query HQ..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-500 hover:scale-105 transition-all text-white border-2 border-indigo-400/30"
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
};

export default MissionAiAssistant;
