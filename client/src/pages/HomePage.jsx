import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Video, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-panel p-6 hover:bg-surface/80 transition-all border-t border-t-secondary/30 group"
  >
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(138,43,226,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]">
      <Icon className="text-secondary" />
    </div>
    <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{desc}</p>
    <Link to="/detector" className="text-secondary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
      Try Now <ChevronRight size={16} />
    </Link>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16 relative z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-32 h-32 mb-8 relative"
        >
          <div className="absolute inset-0 bg-secondary/30 blur-2xl rounded-full animate-pulse-glow"></div>
          <Shield className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          Protect Truth in the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">
            AI Era
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Empowering girls' safety and digital protection with advanced AI. 
          Detect deepfakes, manipulated media, and fake news instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/detector" className="neon-button flex items-center justify-center gap-2 text-lg">
            <Upload size={20} />
            Start Scanning
          </Link>
          <Link to="/safety" className="glass-panel px-8 py-3 rounded-full hover:bg-white/10 transition-colors border border-white/20 font-bold flex items-center justify-center gap-2">
            <Shield size={20} />
            Cyber Safety Guide
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl z-10">
        <FeatureCard 
          icon={Upload}
          title="Image Detection"
          desc="Upload images to detect GAN artifacts, face warping, and facial manipulation with high accuracy."
          delay={0.2}
        />
        <FeatureCard 
          icon={Video}
          title="Video Scanner"
          desc="Frame-by-frame analysis to spot deepfake videos, temporal artifacts, and lip-sync mismatch."
          delay={0.4}
        />
        <FeatureCard 
          icon={FileText}
          title="News Reality Check"
          desc="Analyze text and articles for AI-generated content, misinformation, and sentiment manipulation."
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default HomePage;
