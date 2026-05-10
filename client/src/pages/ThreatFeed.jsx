import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { mockIncidents } from '../data/mockData';

const ThreatFeed = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Simulate initial load
    setIncidents(mockIncidents);

    // Simulate incoming live threats
    const interval = setInterval(() => {
      const newIncident = {
        id: `INC-${Math.floor(Math.random() * 1000) + 100}`,
        title: ['Suspicious Phishing Link', 'AI Voice Clone Scam Detected', 'Deepfake Image Flagged', 'Anonymous Harassment Report'][Math.floor(Math.random() * 4)],
        type: ['Scam', 'Voice Cloning', 'Deepfake', 'Cyberbullying'][Math.floor(Math.random() * 4)],
        time: 'Just now',
        severity: ['High', 'Emergency', 'Medium'][Math.floor(Math.random() * 3)],
        aiRisk: Math.floor(Math.random() * 50) + 50,
        status: ['Active threat', 'Investigating'][Math.floor(Math.random() * 2)],
      };
      setIncidents(prev => [newIncident, ...prev].slice(0, 15)); // Keep top 15
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    if (severity === 'Emergency') return 'text-red-500 bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    if (severity === 'High') return 'text-orange-500 bg-orange-500/10 border-orange-500/50';
    return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/50';
  };

  const getStatusIcon = (status) => {
    if (status === 'Emergency' || status === 'Active threat') return <AlertTriangle size={16} className="animate-pulse" />;
    if (status === 'Resolved') return <CheckCircle size={16} />;
    return <Activity size={16} />;
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[80vh]">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Activity className="text-purple-500" size={32} /> Live Threat Activity
        </h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-bold animate-pulse">
          <div className="w-2 h-2 rounded-full bg-red-500"></div> LIVE
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-10">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {incidents.map((incident) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`glass-panel p-5 border ${getSeverityColor(incident.severity)} group relative overflow-hidden`}
              >
                {/* Scanning background line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_8px_#fff] animate-[scan_3s_ease-in-out_infinite] opacity-50"></div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 rounded border border-slate-600 text-slate-300">{incident.id}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><Clock size={12}/> {incident.time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{incident.title}</h3>
                    <p className="text-sm text-slate-400">Category: <span className="text-slate-300">{incident.type}</span></p>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">AI Risk</p>
                      <p className={`font-mono font-bold text-xl ${incident.aiRisk > 90 ? 'text-red-400' : 'text-orange-400'}`}>
                        {incident.aiRisk}%
                      </p>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-700 hidden md:block"></div>
                    
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <div className={`text-xs font-bold uppercase flex items-center gap-1.5 ${getSeverityColor(incident.severity).split(' ')[0]}`}>
                        <ShieldAlert size={14} /> {incident.severity}
                      </div>
                      <div className="text-xs font-bold uppercase flex items-center gap-1.5 text-slate-300">
                        {getStatusIcon(incident.status)} {incident.status}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ThreatFeed;
