import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, Activity, Search, Video, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, link, color }) => (
  <Link to={link} className="glass-panel p-6 border-t-2 hover:-translate-y-2 transition-all group" style={{ borderTopColor: color }}>
    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ color: color, boxShadow: `0 0 15px ${color}40` }}>
      <Icon />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
    <div className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: color }}>
      Explore Module <ChevronRight size={16} />
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16 relative z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-32 h-32 mb-8 relative"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse"></div>
          <Shield className="w-full h-full text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        </motion.div>

        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-400 text-sm font-bold mb-6 tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          REAL-TIME CYBER INTELLIGENCE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Protect Truth in the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            AI Era
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
          An advanced AI-powered women safety ecosystem. Detect cyber crimes, track abuse reports, and stay protected with NASA-level threat intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/detector" className="neon-button flex items-center justify-center gap-2 text-lg">
            <Search size={20} />
            Launch AI Scanner
          </Link>
          <Link to="/emergency" className="glass-panel px-8 py-3 rounded-full hover:bg-red-500/20 hover:border-red-500/50 transition-colors border border-slate-700 font-bold flex items-center justify-center gap-2 hover:text-red-400 group">
            <AlertTriangle size={20} className="group-hover:animate-pulse" />
            Emergency SOS
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full z-10 mt-10">
        <FeatureCard 
          icon={Activity} title="Live Threat Feed" color="#a855f7" link="/feed"
          desc="Real-time scrolling feed of active cyber incidents and deepfake detections globally."
        />
        <FeatureCard 
          icon={Video} title="AI Detector" color="#06b6d4" link="/detector"
          desc="Upload images, videos, or news to detect GAN artifacts and AI manipulation instantly."
        />
        <FeatureCard 
          icon={Shield} title="Case Management" color="#10b981" link="/cases"
          desc="Detailed tracking of reported abuse cases, assigned officers, and AI risk scores."
        />
        <FeatureCard 
          icon={AlertTriangle} title="Report Abuse" color="#ef4444" link="/report"
          desc="Securely upload evidence and submit anonymous reports directly to cyber authorities."
        />
      </div>
    </div>
  );
};

export default Home;
