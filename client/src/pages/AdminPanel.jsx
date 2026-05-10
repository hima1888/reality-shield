import React from 'react';
import { Shield, Users, AlertTriangle, FileCheck, CheckCircle, Clock } from 'lucide-react';
import { mockCases } from '../data/mockData';

const AdminPanel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="text-purple-500" size={32} /> Central Command System
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-300">SYSTEM SECURE</span>
          </div>
          <button className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-bold">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 border-l-4 border-l-cyan-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider">Pending Reviews</h3>
            <Clock className="text-cyan-500" size={20} />
          </div>
          <p className="text-3xl font-bold font-mono">124</p>
        </div>
        <div className="glass-panel p-6 border-l-4 border-l-red-500 bg-red-900/10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider">Emergency Escalations</h3>
            <AlertTriangle className="text-red-500 animate-pulse" size={20} />
          </div>
          <p className="text-3xl font-bold font-mono text-red-400">12</p>
        </div>
        <div className="glass-panel p-6 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider">Fake Accounts Flagged</h3>
            <Users className="text-purple-500" size={20} />
          </div>
          <p className="text-3xl font-bold font-mono text-purple-400">8,492</p>
        </div>
        <div className="glass-panel p-6 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider">Evidence Verified</h3>
            <FileCheck className="text-emerald-500" size={20} />
          </div>
          <p className="text-3xl font-bold font-mono text-emerald-400">45.2K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Escalation Queue */}
        <div className="lg:col-span-2 glass-panel p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-700/50 bg-slate-900/50 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="text-orange-500" /> Evidence Review Queue
            </h2>
            <button className="text-sm text-cyan-400 hover:text-cyan-300">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">Case ID</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Risk Level</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {mockCases.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-sm">{c.id}</td>
                    <td className="p-4 font-medium">{c.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${c.threatScore > 90 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {c.threatScore}% AI MATCH
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${c.status === 'Emergency' ? 'text-red-400' : 'text-slate-300'}`}>
                        {c.status === 'Resolved' ? <CheckCircle size={14} className="text-emerald-500"/> : <Clock size={14}/>} {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 rounded text-xs font-bold border border-cyan-500/30 transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Activity className="text-purple-400" /> System Logs
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { time: '10:45 AM', log: 'IP Blocked: Multiple failed logins (RU)', type: 'security' },
              { time: '10:42 AM', log: 'New Deepfake Model Signature Added', type: 'system' },
              { time: '10:30 AM', log: 'Emergency SOS Triggered: ID-4921', type: 'alert' },
              { time: '10:15 AM', log: 'Database backup completed securely', type: 'system' },
              { time: '09:50 AM', log: 'Threat Intelligence feed updated', type: 'system' },
            ].map((log, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.type === 'alert' ? 'bg-red-500 animate-pulse' : log.type === 'security' ? 'bg-orange-500' : 'bg-cyan-500'}`}></div>
                <div>
                  <p className="text-sm text-slate-200">{log.log}</p>
                  <span className="text-xs text-slate-500 font-mono">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
