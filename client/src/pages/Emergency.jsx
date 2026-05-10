import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, ShieldAlert, HeartHandshake, Send, Bot } from 'lucide-react';

const Emergency = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello. You have reached the RealityShield Emergency Response AI. Are you in immediate physical danger? If yes, please call 911 immediately.' }
  ]);
  const [input, setInput] = useState('');
  const [protectionLevel, setProtectionLevel] = useState('High Risk');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { sender: 'User', text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'AI', 
        text: 'I understand this is distressing. I have logged this incident. Would you like me to connect you to a human cyber safety advocate now?' 
      }]);
    }, 1000);
  };

  const getMeterColor = () => {
    switch(protectionLevel) {
      case 'Safe': return 'text-emerald-500 stroke-emerald-500';
      case 'Medium Risk': return 'text-yellow-500 stroke-yellow-500';
      case 'High Risk': return 'text-orange-500 stroke-orange-500';
      case 'Emergency': return 'text-red-500 stroke-red-500';
      default: return 'text-cyan-500 stroke-cyan-500';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[80vh]">
      {/* Left Column: Status & SOS */}
      <div className="flex flex-col gap-6 w-full lg:w-1/3">
        <div className="glass-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border-t-4 border-t-red-500">
          <div className="absolute top-0 left-0 w-full h-full bg-red-500/5 animate-pulse pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold mb-6">Emergency SOS</h2>
          <button className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-500 border-8 border-red-900/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:shadow-[0_0_80px_rgba(220,38,38,0.8)] transition-all transform hover:scale-105 active:scale-95 group">
            <PhoneCall size={48} className="mb-2 group-hover:animate-bounce" />
            <span className="font-bold text-xl uppercase tracking-widest">HELP NOW</span>
          </button>
          <p className="mt-6 text-slate-400 text-sm">Pressing this will instantly alert local authorities and our 24/7 cyber response team with your location.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <ShieldAlert className="text-orange-400"/> Personal Safety Tracker
          </h3>
          
          {/* Animated Meter */}
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full transform -rotate-180 drop-shadow-[0_0_10px_currentColor]">
              <circle cx="96" cy="96" r="80" className="stroke-slate-800" strokeWidth="12" fill="none" strokeDasharray="251 502" />
              <motion.circle 
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 350 }} // Example value for High Risk
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="96" cy="96" r="80" 
                className={getMeterColor()}
                strokeWidth="12" fill="none" strokeDasharray="502" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className={`text-2xl font-bold uppercase tracking-widest ${getMeterColor().split(' ')[0]}`}>
                {protectionLevel}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {['Safe', 'Medium Risk', 'High Risk', 'Emergency'].map(level => (
              <button 
                key={level}
                onClick={() => setProtectionLevel(level)}
                className={`text-xs px-3 py-1 rounded-full border ${protectionLevel === level ? 'bg-slate-700 border-white text-white' : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Live Chat */}
      <div className="flex flex-col w-full lg:w-2/3 glass-panel border border-cyan-500/20 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
              <Bot className="text-cyan-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Live Cyber Support</h3>
              <p className="text-xs text-cyan-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> AI Assistant Online
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            <HeartHandshake size={16} /> Request Human
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-[#020617]/50 min-h-[400px]">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.sender === 'User' 
                  ? 'bg-cyan-600 text-white rounded-tr-sm' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-slate-900/80 border-t border-slate-700 flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your situation... We are here to help."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-6 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button type="submit" className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center text-slate-900 transition-colors shrink-0">
            <Send size={20} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emergency;
