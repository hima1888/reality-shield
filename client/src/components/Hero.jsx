import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center relative pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 w-full max-w-4xl"
      >
        {/* Glow behind shield */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-24 h-24 mb-6 relative"
        >
          <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full animate-pulse"></div>
          <Shield className="w-full h-full text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Protect Truth in the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-pulse">
            AI Era
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Empowering girls' safety and digital protection with advanced AI. 
          Detect deepfakes, manipulated media, and fake news instantly with our state-of-the-art neural network.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => document.getElementById('detector').scrollIntoView({ behavior: 'smooth' })}
            className="neon-button text-lg"
          >
            Start Scanning Free
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
        onClick={() => document.getElementById('detector').scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
