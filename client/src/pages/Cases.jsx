import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FolderOpen, AlertTriangle, ChevronRight, X, Clock, User, Activity } from 'lucide-react';
import { mockCases } from '../data/mockData';

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Emergency': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Escalated': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Under Review': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      default: return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FolderOpen className="text-cyan-400" size={32} /> Case Management System
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCases.map((c) => (
          <motion.div 
            key={c.id}
            whileHover={{ y: -5 }}
            className="glass-panel p-6 border-t-2 border-t-cyan-500 cursor-pointer group"
            onClick={() => setSelectedCase(c)}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono px-2 py-1 bg-slate-800 rounded text-cyan-400 border border-cyan-900">{c.id}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(c.status)}`}>{c.status}</span>
            </div>
            <h3 className="text-lg font-bold mb-1 truncate">{c.category}</h3>
            <p className="text-sm text-slate-400 mb-4 flex items-center gap-2"><User size={14}/> {c.victim}</p>
            
            <div className="mb-4 bg-slate-900/50 p-3 rounded border border-slate-700 h-20 overflow-hidden relative">
              <p className="text-xs text-slate-300 line-clamp-3">{c.description}</p>
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            <div className="flex justify-between items-center mt-auto border-t border-slate-700/50 pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase">Threat Score</span>
                <span className={`font-mono font-bold ${c.threatScore > 90 ? 'text-red-400' : 'text-orange-400'}`}>{c.threatScore}/100</span>
              </div>
              <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-1 transition-all">
                Details <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Details Modal */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedCase(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar z-50 glass-panel border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] p-0 flex flex-col"
            >
              <div className="p-6 border-b border-slate-700/50 flex justify-between items-start bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{selectedCase.id}</h2>
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(selectedCase.status)}`}>{selectedCase.status}</span>
                  </div>
                  <p className="text-slate-400 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1"><User size={14}/> {selectedCase.victim}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {selectedCase.date}</span>
                    <span className="flex items-center gap-1 text-cyan-400"><Shield size={14}/> {selectedCase.officer}</span>
                  </p>
                </div>
                <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-lg border border-slate-700">{selectedCase.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Activity size={16} className="text-purple-400"/> AI Intelligence
                    </h4>
                    <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/30 h-full">
                      <p className="text-purple-200 text-sm leading-relaxed mb-3">{selectedCase.aiAnalysis}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-purple-400 font-bold uppercase">Confidence Score</span>
                        <span className="font-mono text-xl text-purple-300 font-bold">{selectedCase.threatScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-400"/> Safety Recommendation
                  </h4>
                  <p className="text-red-200 text-sm leading-relaxed bg-red-900/10 p-4 rounded-lg border border-red-500/30 border-dashed">
                    {selectedCase.recommendation}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Action History Timeline</h4>
                  <div className="flex flex-col gap-3 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-600 before:to-transparent">
                    {selectedCase.actionHistory.map((action, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-800 text-slate-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] glass-panel p-3 rounded border border-slate-700/50">
                          <time className="text-xs font-mono text-cyan-400 mb-1">{action.time}</time>
                          <p className="text-sm text-slate-300">{action.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cases;
