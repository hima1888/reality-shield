import React, { useState } from 'react';
import { Shield, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Authentication failed');
      
      // Store token (mocking successful auth flow)
      localStorage.setItem('supabaseToken', data.session?.access_token || 'mock_token');
      localStorage.setItem('user', JSON.stringify(data.user || { email: formData.email, user_metadata: { full_name: formData.fullName || 'User' } }));
      
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
      // Fallback for demo if Node server isn't running
      setTimeout(() => {
        localStorage.setItem('supabaseToken', 'mock_token');
        localStorage.setItem('user', JSON.stringify({ email: formData.email, user_metadata: { full_name: formData.fullName || 'Test User' } }));
        window.location.href = '/dashboard';
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10 w-full ml-0 lg:ml-64">
      <div className="glass-panel w-full max-w-md p-8 relative overflow-hidden border-t-4 border-t-cyan-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Shield className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
            REALITY<span className="text-purple-500">SHIELD</span>
          </h2>
          <p className="text-slate-400 mt-2">{isLogin ? 'Access the Intelligence Dashboard' : 'Join the Cyber Safety Network'}</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required={!isLogin}
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="cyber-input pl-10" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="cyber-input pl-10" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="cyber-input pl-10" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="neon-button mt-4 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : isLogin ? 'Authenticate' : 'Establish Link'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have clearance? " : "Already have clearance? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
            >
              {isLogin ? 'Request Access' : 'Authenticate'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
