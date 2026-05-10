import React from 'react';
import { Shield, AlertTriangle, Radio, PhoneCall } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 px-6 py-4 flex justify-between items-center rounded-2xl bg-slate-900/60 border border-slate-700/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer shrink-0">
        <div className="relative">
          <Shield className="text-cyan-400 w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-cyan-400/50 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 hidden lg:block">
          REALITY<span className="text-purple-500">SHIELD</span>
        </span>
      </Link>
      
      <div className="hidden lg:flex gap-6 items-center text-sm font-medium overflow-x-auto">
        <NavLink to="/" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>Home</NavLink>
        <NavLink to="/detector" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>AI Detector</NavLink>
        <NavLink to="/feed" className={({isActive}) => `flex items-center gap-1 transition-colors hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] ${isActive ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`}><Radio size={14} className="animate-pulse" /> Threat Feed</NavLink>
        <NavLink to="/cases" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>Cases</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>Dashboard</NavLink>
        <NavLink to="/safety" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>Safety Center</NavLink>
        <NavLink to="/admin" className={({isActive}) => `transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`}>Admin</NavLink>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        <Link to="/emergency" className="hidden md:flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-2 rounded-lg transition-all text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <PhoneCall size={14} /> SOS
        </Link>
        <Link to="/report" className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg transition-all text-sm font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] group relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <AlertTriangle size={16} className="group-hover:animate-pulse" />
          <span className="hidden sm:inline">Report Abuse</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
