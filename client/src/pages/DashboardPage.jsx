import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, ShieldAlert, CheckCircle, Users, MapPin } from 'lucide-react';
import { mockMapData, mockTimeline } from '../data/mockData';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="glass-panel p-6 relative overflow-hidden group">
    <div className={`absolute -right-6 -top-6 w-24 h-24 blur-xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${colorClass}`}></div>
    <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-bold relative z-10">{title}</p>
    <div className="flex justify-between items-end relative z-10">
      <p className="text-4xl font-bold font-mono text-white group-hover:scale-105 origin-left transition-transform">
        {value}
      </p>
      <Icon size={24} className={`${colorClass.replace('bg-', 'text-')} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
    {trend && (
      <p className={`text-xs mt-2 font-bold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend > 0 ? '+' : ''}{trend}% from last week
      </p>
    )}
  </div>
);

const DashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Activity className="text-cyan-400" size={32} /> Intelligence Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Cases" value="24,892" icon={Activity} trend={12} colorClass="bg-purple-500 text-purple-500" />
        <StatCard title="Active Threats" value="1,405" icon={ShieldAlert} trend={-5} colorClass="bg-red-500 text-red-500" />
        <StatCard title="Protected Users" value="8,942" icon={Users} trend={24} colorClass="bg-cyan-400 text-cyan-400" />
        <StatCard title="Resolved Cases" value="23,487" icon={CheckCircle} trend={8} colorClass="bg-emerald-500 text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Timeline */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="text-purple-400" size={20} /> Threat Activity Timeline (24h)
          </h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTimeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDeepfake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStalking" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="deepfakes" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDeepfake)" />
                <Area type="monotone" dataKey="stalking" stroke="#06b6d4" fillOpacity={1} fill="url(#colorStalking)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Threat Map Simulation */}
        <div className="glass-panel p-6 flex flex-col relative overflow-hidden">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="text-cyan-400" size={20} /> Live Threat Map
          </h3>
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[300px]">
            {/* Simulated Map Grid */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain opacity-20 filter invert"></div>
            
            {mockMapData.map(marker => (
              <div 
                key={marker.id}
                className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(marker.lng + 180) * (100 / 360)}%`,
                  top: `${(90 - marker.lat) * (100 / 180)}%`
                }}
              >
                <div className={`absolute inset-0 rounded-full animate-ping ${marker.intensity > 80 ? 'bg-red-500' : 'bg-cyan-500'} opacity-75`}></div>
                <div className={`relative rounded-full w-2 h-2 top-1 left-1 ${marker.intensity > 80 ? 'bg-red-400 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]'}`}></div>
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg flex justify-between text-xs font-mono">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> High Threat</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
