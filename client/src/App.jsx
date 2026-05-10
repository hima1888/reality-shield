import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MatrixRain from './components/MatrixRain';

// Pages
import Home from './pages/Home';
import DetectorPage from './pages/DetectorPage';
import ThreatFeed from './pages/ThreatFeed';
import Cases from './pages/Cases';
import DashboardPage from './pages/DashboardPage';
import SafetyCenter from './pages/SafetyCenter';
import Emergency from './pages/Emergency';
import Report from './pages/Report';
import AdminPanel from './pages/AdminPanel';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status
    const token = localStorage.getItem('supabaseToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen relative font-sans text-white selection:bg-cyan-500/30 bg-[#020617] flex">
        <MatrixRain />
        
        {/* Glow overlay */}
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-[#020617]/80 to-[#020617] opacity-100"></div>
        
        {/* Render Sidebar only if authenticated (or show always for demo purposes) */}
        <Sidebar />
        
        <main className="flex-1 min-h-screen lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 w-full max-w-[100vw] lg:max-w-[calc(100vw-16rem)] transition-all duration-300">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes (can add actual protection wrapper, currently accessible for demo) */}
            <Route path="/" element={<Home />} />
            <Route path="/detector" element={<DetectorPage />} />
            <Route path="/feed" element={<ThreatFeed />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/safety" element={<SafetyCenter />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/report" element={<Report />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
