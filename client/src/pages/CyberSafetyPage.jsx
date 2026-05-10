import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Phone, Mail, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import axios from 'axios';

const SafetyTip = ({ title, desc }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="mt-1 flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/50">
        <Info size={16} />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const CyberSafetyPage = () => {
  const [reportData, setReportData] = useState({ name: '', email: '', url: '', details: '' });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', reportData.name);
      formData.append('email', reportData.email);
      formData.append('url', reportData.url);
      formData.append('details', reportData.details);
      if (file) {
        formData.append('file', file);
      }

      await axios.post('http://localhost:8000/api/report-abuse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSubmitted(true);
      setReportData({ name: '', email: '', url: '', details: '' });
      setFile(null);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-4 rounded-full bg-danger/10 text-danger mb-4 border border-danger/20"
        >
          <ShieldAlert size={48} />
        </motion.div>
        <h1 className="text-4xl font-display font-bold mb-4">Cyber Safety & Awareness</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We are committed to providing tools and knowledge to protect individuals, especially women, from digital harassment, deepfakes, and online manipulation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Safety Tips */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-6 font-display flex items-center gap-2">
            <ShieldAlert className="text-secondary" /> How to Stay Safe Online
          </h2>
          
          <div className="mt-8">
            <SafetyTip 
              title="Verify Before Sharing"
              desc="Deepfakes and misinformation spread quickly. Always use our Detector tool to verify suspicious images or videos before forwarding them."
            />
            <SafetyTip 
              title="Lock Down Social Media Profiles"
              desc="Keep your social accounts private. Limit the audience who can view your photos, as public images are often harvested to train malicious AI models."
            />
            <SafetyTip 
              title="Recognize the Signs of Manipulation"
              desc="Look for unnatural eye blinking, distorted facial boundaries, robotic voice tones, and misaligned lip-sync in videos."
            />
            <SafetyTip 
              title="Do Not Engage with Extortionists"
              desc="If someone threatens you with fake media (sextortion), do not pay or engage. Take screenshots, block the user, and report them immediately to cyber authorities."
            />
          </div>

          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Phone size={16}/> Emergency Helplines</h3>
            <p className="text-sm text-gray-300 mb-1">National Cyber Crime Portal: <strong>1930</strong></p>
            <p className="text-sm text-gray-300">Women Helpline: <strong>1091</strong></p>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-secondary text-sm hover:underline mt-2 inline-block">Visit Cybercrime Portal →</a>
          </div>
        </div>

        {/* Report Abuse Form */}
        <div className="glass-panel p-8 relative overflow-hidden">
          {/* Animated red glow for danger area */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-danger/10 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-2xl font-bold mb-2 font-display flex items-center gap-2">
            <AlertTriangle className="text-danger" /> Report Abuse
          </h2>
          <p className="text-sm text-gray-400 mb-6">Found malicious deepfakes or fake news? Report it here so we can analyze and take action.</p>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-success/20 border border-success/50 p-6 rounded-xl text-center flex flex-col items-center justify-center h-64"
            >
              <CheckCircle size={48} className="text-success mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Report Submitted</h3>
              <p className="text-gray-300 text-sm">Thank you for helping make the internet safer. Our team will review the submitted content immediately.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Name (Optional)</label>
                <input 
                  type="text" 
                  value={reportData.name}
                  onChange={(e) => setReportData({...reportData, name: e.target.value})}
                  className="cyber-input" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={reportData.email}
                  onChange={(e) => setReportData({...reportData, email: e.target.value})}
                  className="cyber-input" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Suspicious URL / Link</label>
                <input 
                  type="url" 
                  required
                  value={reportData.url}
                  onChange={(e) => setReportData({...reportData, url: e.target.value})}
                  className="cyber-input" 
                  placeholder="https://example.com/fake-content" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Details</label>
                <textarea 
                  required
                  value={reportData.details}
                  onChange={(e) => setReportData({...reportData, details: e.target.value})}
                  className="cyber-input h-24 resize-none" 
                  placeholder="Please describe why this content is harmful or suspicious..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Attach Suspicious Media (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*,video/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="cyber-input py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30" 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="mt-2 bg-danger hover:bg-danger/80 text-white font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CyberSafetyPage;
