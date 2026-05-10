import React, { useState } from 'react';
import { Lock, EyeOff, ShieldCheck, HeartHandshake, X, ChevronRight, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const PasswordTool = () => {
  const [password, setPassword] = useState('');
  
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const score = getStrength(password);
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-400', 'bg-cyan-400'];
  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Unbreakable'];

  return (
    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mt-4">
      <h4 className="font-bold mb-4 flex items-center gap-2"><Lock size={18} className="text-cyan-400" /> Interactive Password Analyzer</h4>
      <input 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to test its strength..."
        className="cyber-input mb-4"
      />
      <div className="flex gap-2 h-2 mb-2">
        {[0, 1, 2, 3, 4].map(idx => (
          <div key={idx} className={`flex-1 rounded-full ${password.length > 0 && score > idx ? colors[score-1] : 'bg-slate-800'}`}></div>
        ))}
      </div>
      <p className={`text-sm font-bold ${password.length === 0 ? 'text-slate-500' : colors[score-1].replace('bg-', 'text-')}`}>
        {password.length === 0 ? 'Awaiting Input' : labels[score-1]}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-400">
        <li className="flex items-center gap-2">{/[A-Z]/.test(password) ? <CheckCircle size={14} className="text-emerald-400"/> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600"/>} Contains uppercase letter</li>
        <li className="flex items-center gap-2">{/[0-9]/.test(password) ? <CheckCircle size={14} className="text-emerald-400"/> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600"/>} Contains number</li>
        <li className="flex items-center gap-2">{/[^A-Za-z0-9]/.test(password) ? <CheckCircle size={14} className="text-emerald-400"/> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600"/>} Contains special character</li>
        <li className="flex items-center gap-2">{password.length > 12 ? <CheckCircle size={14} className="text-emerald-400"/> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600"/>} Over 12 characters</li>
      </ul>
    </div>
  );
};

const DeepfakeChecklist = () => (
  <div className="mt-4">
    <h4 className="font-bold mb-4 flex items-center gap-2"><EyeOff size={18} className="text-purple-400" /> Digital Footprint Reduction</h4>
    <div className="space-y-3">
      {[
        "Delete high-resolution, front-facing photos from public profiles.",
        "Disable facial recognition tagging on social platforms.",
        "Never share voice memos or audio clips on public forums.",
        "Use watermarks or filters if you must post personal photos.",
        "If you suspect a deepfake, do not contact the scammer. Report it immediately."
      ].map((item, i) => (
        <label key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 cursor-pointer hover:border-purple-500/50 transition-colors">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-600 text-purple-500 bg-slate-800" />
          <span className="text-sm text-slate-300">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

const PrivacyLinks = () => (
  <div className="mt-4">
    <h4 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-400" /> 1-Click Privacy Audits</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a href="https://accountcenter.instagram.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 glass-panel border border-slate-700 hover:border-emerald-500 transition-colors group">
        <span className="font-bold">Instagram Settings</span>
        <ExternalLink size={16} className="text-slate-500 group-hover:text-emerald-400" />
      </a>
      <a href="https://www.tiktok.com/setting" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 glass-panel border border-slate-700 hover:border-emerald-500 transition-colors group">
        <span className="font-bold">TikTok Privacy</span>
        <ExternalLink size={16} className="text-slate-500 group-hover:text-emerald-400" />
      </a>
      <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 glass-panel border border-slate-700 hover:border-emerald-500 transition-colors group">
        <span className="font-bold">Google Security</span>
        <ExternalLink size={16} className="text-slate-500 group-hover:text-emerald-400" />
      </a>
      <a href="https://www.snapchat.com/privacy" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 glass-panel border border-slate-700 hover:border-emerald-500 transition-colors group">
        <span className="font-bold">Snapchat Map & Privacy</span>
        <ExternalLink size={16} className="text-slate-500 group-hover:text-emerald-400" />
      </a>
    </div>
  </div>
);

const CrisisActionPlan = () => (
  <div className="mt-4">
    <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-3xl"></div>
      <h4 className="font-bold mb-4 flex items-center gap-2 text-red-400"><AlertTriangle size={20} /> Active Crisis Response</h4>
      
      <ol className="list-decimal list-inside space-y-4 text-sm text-slate-300 mb-6">
        <li><strong>DO NOT PANIC:</strong> Scammers rely on fear to make you act quickly.</li>
        <li><strong>DO NOT PAY:</strong> Paying a blackmailer guarantees they will ask for more. It does not delete the files.</li>
        <li><strong>DOCUMENT EVERYTHING:</strong> Take screenshots of the threats, URLs, and the scammer's username.</li>
        <li><strong>LOCK DOWN:</strong> Immediately make all your social media accounts private or deactivate them temporarily.</li>
      </ol>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/report" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">
          Submit Evidence Now
        </Link>
        <Link to="/emergency" className="flex-1 glass-panel text-white font-bold py-3 px-4 rounded-lg text-center border border-slate-600 hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
          Contact Live SOS Support <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

const TipCard = ({ icon: Icon, title, desc, colorClass, onClick }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="glass-panel p-6 flex flex-col items-start cursor-pointer border-t-2 border-slate-800 hover:border-t-current transition-all group"
    style={{ borderTopColor: 'transparent' }}
  >
    <div className={`p-4 rounded-xl mb-4 ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
      <Icon size={28} className={colorClass.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-slate-200">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
    <div className={`text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${colorClass.replace('bg-', 'text-')}`}>
      Access Tools <ChevronRight size={16} />
    </div>
  </motion.div>
);

const SafetyTips = () => {
  const [activeModal, setActiveModal] = useState(null);

  const tips = [
    {
      id: 'password', icon: Lock, title: "Password Safety", 
      desc: "Test your password strength and learn how to implement hardware-level 2FA protection.", 
      colorClass: "bg-cyan-400 text-cyan-400",
      content: <PasswordTool />
    },
    {
      id: 'deepfake', icon: EyeOff, title: "Avoid Deepfakes", 
      desc: "Interactive checklist to scrub your digital footprint and starve malicious AI models of training data.", 
      colorClass: "bg-purple-500 text-purple-500",
      content: <DeepfakeChecklist />
    },
    {
      id: 'privacy', icon: ShieldCheck, title: "Privacy Protection", 
      desc: "One-click access to security audits and privacy settings across all major social platforms.", 
      colorClass: "bg-emerald-500 text-emerald-500",
      content: <PrivacyLinks />
    },
    {
      id: 'cyberbully', icon: HeartHandshake, title: "Cyberbullying Help", 
      desc: "Immediate crisis response protocol for victims of sextortion, harassment, or targeted deepfakes.", 
      colorClass: "bg-pink-500 text-pink-500",
      content: <CrisisActionPlan />
    }
  ];

  return (
    <section id="safety" className="py-10 w-full max-w-6xl mx-auto">
      <div className="mb-10 flex items-center gap-4 border-b border-slate-700 pb-6">
        <ShieldCheck size={36} className="text-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold">Cyber Safety Guidelines</h2>
          <p className="text-slate-400">Interactive tools to protect your digital identity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map(tip => (
          <TipCard 
            key={tip.id}
            {...tip}
            onClick={() => setActiveModal(tip)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
              onClick={() => setActiveModal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 glass-panel border border-slate-600 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-0 overflow-hidden"
            >
              <div className={`p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/80`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeModal.colorClass} bg-opacity-20`}>
                    <activeModal.icon size={24} className={activeModal.colorClass.replace('bg-', 'text-')} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeModal.title}</h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <p className="text-slate-300 text-lg mb-6 leading-relaxed border-l-4 border-slate-600 pl-4">{activeModal.desc}</p>
                {activeModal.content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SafetyTips;
