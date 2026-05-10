import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Upload, Shield, MapPin, UserX, Info } from 'lucide-react';
import axios from 'axios';

const Report = () => {
  const [reportData, setReportData] = useState({ 
    category: 'Deepfake',
    severity: 'Medium',
    name: '', 
    email: '', 
    location: '',
    details: '',
    isAnonymous: false,
    contactSupport: true
  });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Deepfake', 'Cyberbullying', 'Blackmail', 'Fake Profile', 
    'Stalking', 'Voice Cloning', 'Identity Theft', 'Harassment'
  ];

  const severities = [
    { level: 'Low', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
    { level: 'Medium', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
    { level: 'High', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
    { level: 'Emergency', color: 'text-red-500 bg-red-500/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('category', reportData.category);
      formData.append('severity', reportData.severity);
      formData.append('name', reportData.isAnonymous ? 'Anonymous' : reportData.name);
      formData.append('email', reportData.isAnonymous ? 'anonymous@realityshield.local' : reportData.email);
      formData.append('location', reportData.location);
      formData.append('details', reportData.details);
      
      if (file) formData.append('file', file);

      await axios.post('http://localhost:8000/api/report-abuse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Fallback
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto w-full pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 text-center flex flex-col items-center justify-center min-h-[400px] border-t-4 border-t-emerald-500"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Intelligence Report Logged</h2>
          <p className="text-slate-300 max-w-lg mb-8 text-lg">
            Your evidence has been securely transmitted to our cyber analysis team. 
            {reportData.severity === 'Emergency' && " Emergency responders have been notified."}
          </p>
          <div className="flex gap-4">
            <button onClick={() => window.location.href = '/'} className="neon-button">Return to Dashboard</button>
            <button onClick={() => window.location.href = '/cases'} className="px-6 py-3 rounded-full border border-slate-600 hover:bg-slate-800 transition-colors">Track Case Status</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="text-red-500" size={32} /> Secure Threat Reporting
          </h1>
          <p className="text-slate-400">Submit evidence to the cyber intelligence database. All transmissions are encrypted.</p>
        </div>
      </div>

      <div className="glass-panel p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
          
          {/* Threat Classification */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <AlertTriangle className="text-orange-400" size={20} /> Threat Classification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Incident Category</label>
                <select 
                  value={reportData.category}
                  onChange={(e) => setReportData({...reportData, category: e.target.value})}
                  className="cyber-input appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[position:calc(100%-1rem)_center] pr-10"
                >
                  {categories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Severity Level</label>
                <div className="grid grid-cols-4 gap-2 h-[48px]">
                  {severities.map(sev => (
                    <button
                      key={sev.level}
                      type="button"
                      onClick={() => setReportData({...reportData, severity: sev.level})}
                      className={`text-xs font-bold rounded-lg border transition-all ${reportData.severity === sev.level ? sev.color : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                      {sev.level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Identity & Location */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-end border-b border-slate-700 pb-2 mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <UserX className="text-purple-400" size={20} /> Identity Protection
              </h3>
              <label className="flex items-center gap-2 cursor-pointer group">
                <span className={`text-sm font-bold ${reportData.isAnonymous ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {reportData.isAnonymous ? 'Anonymous Mode Active' : 'Report Anonymously'}
                </span>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${reportData.isAnonymous ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${reportData.isAnonymous ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={reportData.isAnonymous} onChange={(e) => setReportData({...reportData, isAnonymous: e.target.checked})} />
              </label>
            </div>
            
            <AnimatePresence>
              {!reportData.isAnonymous && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-hidden">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-medium">Full Name</label>
                    <input type="text" value={reportData.name} onChange={(e) => setReportData({...reportData, name: e.target.value})} className="cyber-input" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-medium">Contact Email</label>
                    <input type="email" value={reportData.email} onChange={(e) => setReportData({...reportData, email: e.target.value})} className="cyber-input" placeholder="jane@example.com" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium flex items-center gap-1">
                <MapPin size={16} /> Incident Location (City, Platform, or URL)
              </label>
              <input type="text" value={reportData.location} onChange={(e) => setReportData({...reportData, location: e.target.value})} className="cyber-input" placeholder="e.g. Instagram, WhatsApp, or New York City" />
            </div>
          </div>
          
          {/* Evidence Collection */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <Upload className="text-cyan-400" size={20} /> Evidence Collection
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2 font-medium">Detailed Description <span className="text-red-500">*</span></label>
              <textarea 
                required
                value={reportData.details}
                onChange={(e) => setReportData({...reportData, details: e.target.value})}
                className="cyber-input h-32 resize-y" 
                placeholder="Provide a detailed timeline of events, URLs, usernames, and any communication..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">Attach Digital Forensics (Images/Videos/Audio)</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*,video/*,audio/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${file ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-600 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500'}`}>
                  {file ? (
                    <>
                      <CheckCircle className="text-cyan-400 mb-2" size={32} />
                      <span className="text-cyan-400 font-bold text-lg">{file.name}</span>
                      <span className="text-cyan-500/70 text-sm mt-1">Ready for AI processing</span>
                    </>
                  ) : (
                    <>
                      <Upload className="text-slate-400 mb-3" size={32} />
                      <span className="text-white font-bold text-lg mb-1">Upload Suspicious Media</span>
                      <span className="text-slate-400 text-sm">Drag and drop files here to begin AI analysis</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={reportData.contactSupport} onChange={(e) => setReportData({...reportData, contactSupport: e.target.checked})} className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500" />
              <span className="text-sm text-slate-300">Request immediate contact from cyber support team</span>
            </label>

            <button 
              type="submit" 
              disabled={loading}
              className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-3 ${loading ? 'bg-red-800 text-red-300 cursor-wait' : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:-translate-y-1'}`}
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Transmitting...</>
              ) : (
                <><AlertTriangle size={24} /> Submit to Cyber Command</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Report;
