import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, CheckCircle, Users } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 w-full">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Activity className="text-cyan-400" size={36} /> Global Impact Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 border-t-4 border-t-purple-500 hover:-translate-y-1 transition-transform group">
          <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-bold">Total Reports Scanned</p>
          <div className="flex justify-between items-end">
            <p className="text-4xl font-bold font-mono text-white group-hover:text-purple-400 transition-colors">
              <AnimatedCounter end={14205} />
            </p>
            <Activity size={24} className="text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="glass-panel p-6 border-t-4 border-t-red-500 hover:-translate-y-1 transition-transform group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/10 blur-xl rounded-full"></div>
          <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-bold z-10 relative">Fake Content Detected</p>
          <div className="flex justify-between items-end z-10 relative">
            <p className="text-4xl font-bold font-mono text-white group-hover:text-red-400 transition-colors">
              <AnimatedCounter end={8943} />
            </p>
            <ShieldAlert size={24} className="text-red-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="glass-panel p-6 border-t-4 border-t-cyan-400 hover:-translate-y-1 transition-transform group">
          <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-bold">Protected Users</p>
          <div className="flex justify-between items-end">
            <p className="text-4xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
              <AnimatedCounter end={5262} />
            </p>
            <Users size={24} className="text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="glass-panel p-6 border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-transform group">
          <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-bold">Daily Threats Prevented</p>
          <div className="flex justify-between items-end">
            <p className="text-4xl font-bold font-mono text-white group-hover:text-emerald-400 transition-colors">
              <AnimatedCounter end={342} />
            </p>
            <CheckCircle size={24} className="text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
