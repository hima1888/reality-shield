import React from 'react';
import { Lock, EyeOff, ShieldCheck, HeartHandshake } from 'lucide-react';

const TipCard = ({ icon: Icon, title, desc, colorClass }) => (
  <div className="glass-panel p-6 flex flex-col items-start hover:bg-slate-800/60 transition-colors group">
    <div className={`p-4 rounded-xl mb-4 ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
      <Icon size={28} className={colorClass.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const SafetyTips = () => {
  return (
    <section id="safety" className="py-20 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cyber Safety Guidelines</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Protect your digital identity and stay safe from online manipulation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TipCard 
          icon={Lock}
          title="Password Safety"
          desc="Use strong, unique passwords for every account. Enable Two-Factor Authentication (2FA) immediately to prevent unauthorized access."
          colorClass="bg-cyan-400 text-cyan-400"
        />
        <TipCard 
          icon={EyeOff}
          title="Avoid Deepfakes"
          desc="Limit the number of public photos you share online. Scammers use publicly available images to train malicious AI models."
          colorClass="bg-purple-500 text-purple-500"
        />
        <TipCard 
          icon={ShieldCheck}
          title="Privacy Protection"
          desc="Keep your social media accounts private. Do not accept follow requests from unknown individuals or suspicious accounts."
          colorClass="bg-emerald-500 text-emerald-500"
        />
        <TipCard 
          icon={HeartHandshake}
          title="Cyberbullying Help"
          desc="If you are targeted by fake media or sextortion, do not panic and do not pay. Take screenshots, block the abuser, and report it."
          colorClass="bg-pink-500 text-pink-500"
        />
      </div>
    </section>
  );
};

export default SafetyTips;
