import React, { useState } from 'react';
import { Shield, AlertTriangle, Radio, PhoneCall, Home, Search, FolderOpen, Activity, User as UserIcon, Settings, Menu, X, Bell } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('supabaseToken');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const NavItem = ({ to, icon: Icon, label, alert }) => (
    <NavLink 
      to={to} 
      onClick={() => setIsOpen(false)}
      className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'}`}
    >
      <Icon size={20} className={alert ? "animate-pulse text-purple-400" : ""} />
      <span className="font-medium">{label}</span>
      {alert && <span className="ml-auto w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 glass-panel rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-screen w-64 glass-panel border-r border-slate-700/50 z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="relative shrink-0">
            <Shield className="text-cyan-400 w-8 h-8" />
            <div className="absolute inset-0 bg-cyan-400/50 blur-md rounded-full scale-150 animate-pulse"></div>
          </div>
          <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
            REALITY<span className="text-purple-500">SHIELD</span>
          </span>
        </div>

        {/* User Profile Snippet */}
        <div className="p-4 mx-4 mt-4 bg-slate-900/60 rounded-xl border border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-bold">
            RS
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Agent Terminal</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
            </p>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-2 mt-2">Core Systems</p>
          <NavItem to="/" icon={Home} label="Command Center" />
          <NavItem to="/detector" icon={Search} label="AI Scanner" />
          <NavItem to="/feed" icon={Radio} label="Live Threat Feed" alert />
          
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-2 mt-4">Database</p>
          <NavItem to="/cases" icon={FolderOpen} label="Case Management" />
          <NavItem to="/dashboard" icon={Activity} label="Analytics" />
          
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-2 mt-4">Response Unit</p>
          <NavItem to="/safety" icon={Shield} label="Safety Center" />
          <NavItem to="/emergency" icon={PhoneCall} label="Emergency SOS" />
          
          <div className="mt-4">
            <Link to="/report" onClick={() => setIsOpen(false)} className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/50 px-4 py-3 rounded-lg transition-all text-sm font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] group w-full justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <AlertTriangle size={16} className="group-hover:animate-pulse" />
              <span>Report Incident</span>
            </Link>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-700/50 flex flex-col gap-2">
          <NavItem to="/admin" icon={Settings} label="Admin Panel" />
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left font-medium">
            <UserIcon size={18} /> Logout
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
